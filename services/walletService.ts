import { WalletType, ResponseType } from "@/types";
import { uploadFileToCloudinary } from "./imageService";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "@/config/firebase";

//partial so can pass only some of the fields
export const createOrUpdateWallet = async (
  walletData: Partial<WalletType>
): Promise<ResponseType> => {
  try {
    let walletToSave = { ...walletData };

    if (walletData.image) {
      const imageUploadRes = await uploadFileToCloudinary(
        walletData.image,
        "wallets"
      );

      if (!imageUploadRes.success) {
        return {
          success: false,
          msg: imageUploadRes.msg || "Failed to upload icon to wallet",
        };
      }
      walletToSave.image = imageUploadRes.data;
    }

    //no wallet id means a new one
    if (!walletData?.id) {
      walletToSave.amount = 0;
      walletToSave.created = new Date();
      walletToSave.totalExpenses = 0;
      walletToSave.totalIncome = 0;
    }
    //create document reference for wallet
    const walletRef = walletData?.id
      ? doc(firestore, "wallets", walletData?.id) //update
      : doc(collection(firestore, "wallets")); //new wallet

    await setDoc(walletRef, walletToSave, { merge: true }); //merge if updating
    return { success: true, data: { ...walletToSave, id: walletRef.id } };
  } catch (error: any) {
    console.log("Error Creating or Updating Wallet Icon: ", error);
    return { success: false, msg: error.message };
  }
};
//23.40
export const deleteWallet = async (walletId: string): Promise<ResponseType> => {
  try {
    const walletRef = doc(firestore, "wallets", walletId);
    await deleteDoc(walletRef);
    //TO DO - must delete all transcations associated with it too.
    //37.29
    deleteTransactionsByWalletId(walletId);

    return { success: true, msg: "Wallet Deleted Successfully" };
  } catch (error: any) {
    console.log("Error Deleting Wallet: ", error);
    return { success: false, msg: error.message };
  }
};

export const deleteTransactionsByWalletId = async (
  walletId: string
): Promise<ResponseType> => {
  try {
    let hasMoreTransactions = true;

    while (hasMoreTransactions) {
      const transactionsQuery = query(
        collection(firestore, "transactions"),
        where("walletId", "==", walletId)
      );
      const transactionsSnapshot = await getDocs(transactionsQuery);
      if (transactionsSnapshot.size == 0) {
        hasMoreTransactions = false;
        break;
      }
      const batch = writeBatch(firestore);

      transactionsSnapshot.forEach((transactionDoc) => {
        batch.delete(transactionDoc.ref);
      });

      await batch.commit();

      console.log(
        ` ${transactionsSnapshot.size} transactions deleted in this batch`
      );
    }

    return {
      success: true,
      msg: "All transactions deleted successfully",
    };
  } catch (err: any) {
    console.log("error deleting wallet: ", err);
    return { success: false, msg: err.message };
  }
};

//37.02 vid 13

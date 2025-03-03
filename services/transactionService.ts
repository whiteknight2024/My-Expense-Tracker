import { firestore } from "@/config/firebase";
import { TransactionType, WalletType, ResponseType } from "@/types";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { uploadFileToCloudinary } from "./imageService";

export const createOrUpdateTransaction = async (
  transactionData: Partial<TransactionType>
): Promise<ResponseType> => {
  try {
    const { id, type, walletId, amount, image } = transactionData;
    if (!amount || amount <= 0 || !walletId || !type) {
      return { success: false, msg: "Invalid Transaction Data" };
    }

    if (id) {
      //performing update to existing transaction
    } else {
      //update wallet for new transcation
      //update wallet
      let res = await updateWalletForNewTransaction(
        walletId!,
        Number(amount!),
        type
      );
      if (!res.success) return res;
    }

    //image upload pending
    if (image) {
      const imageUploadRes = await uploadFileToCloudinary(
        image,
        "transactions"
      );

      if (!imageUploadRes.success) {
        return {
          success: false,
          msg: imageUploadRes.msg || "Failed to upload receipt",
        };
      }
      transactionData.image = imageUploadRes.data;
    }

    //create a transaction reference
    //depending if have id its an update or new transaction
    const transactionRef = id
      ? doc(firestore, "transactions", id)
      : doc(collection(firestore, "transactions"));

    //perform the update
    await setDoc(transactionRef, transactionData, { merge: true });

    return {
      success: true,
      data: { ...transactionData, id: transactionRef.id },
    };
  } catch (error: any) {
    console.log("Error creating or updating Transaction: ", error);
    return { success: false, msg: error.message };
  }
};

const updateWalletForNewTransaction = async (
  walletId: string,
  amount: number,
  type: string
) => {
  try {
    const walletRef = doc(firestore, "wallets", walletId);
    const walletSnapshot = await getDoc(walletRef);
    if (!walletSnapshot.exists()) {
      console.log("Error updating Wallet for New Transaction");
      return { success: false, msg: "Wallet not found" };
    }
    const walletData = walletSnapshot.data() as WalletType;
    if (type == "expense" && walletData.amount! - amount < 0) {
      return {
        success: false,
        msg: "Selected Wallet Lacks Funds for Transaction",
      };
    }
    //enough funds for transaction
    const updateType = type == "income" ? "totalIncome" : "totalExpenses";
    const updatedWalletAmount =
      type == "income"
        ? Number(walletData.amount) + amount
        : Number(walletData.amount) - amount;

    const updatedTotals =
      type == "income"
        ? Number(walletData.totalIncome) + amount
        : Number(walletData.totalExpenses) + amount;

    //update wallet
    await updateDoc(walletRef, {
      amount: updatedWalletAmount,
      [updateType]: updatedTotals,
    });

    return {
      success: true,
    };
  } catch (error: any) {
    console.log("Error updating Wallet for New Transaction: ", error);
    return { success: false, msg: error.message };
  }
};

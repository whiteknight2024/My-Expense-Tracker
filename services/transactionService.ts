import { firestore } from "@/config/firebase";
import { TransactionType, WalletType } from "@/types";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const createOrUpdateTransaction = async (
  transactionData: Partial<TransactionType>
) => {
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
    }
    return {
      success: true,
    };
  } catch (error: any) {
    console.log("Error creating or updating Transaction: ", error);
    return { success: false, msg: error.message };
  }
};

//2.36
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

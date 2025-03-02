import { TransactionType } from "@/types";

export const createOrUpdateTransaction = async (
  transactionData: Partial<TransactionType>
) => {
  try {
    const { id, type, walletId, amount, image } = transactionData;
    if (!amount || amount <= 0 || !walletId || !type) {
      return { success: false, msg: "Invalid Transaction Data" };
    }

    if (id) {
      //performing update
    } else {
      //new transaction
    }
    return {
      success: true,
    };
  } catch (error: any) {
    console.log("Error creating or updating Transaction: ", error);
    return { success: false, msg: error.message };
  }
};

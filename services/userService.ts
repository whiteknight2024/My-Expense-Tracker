import { firestore } from "@/config/firebase";
import { ResponseType, UserDataType } from "@/types";
import { doc, updateDoc } from "firebase/firestore";


export const updateUser = async (
    uid: string,
    updatedData: UserDataType
): Promise<ResponseType> =>{
    try {
        //image upload pending
        const userRef = doc(firestore, "users", uid)
        await updateDoc(userRef, updatedData);
        //fetch the user & update the state
        return {success: true, msg: "Updated User Successfully"}
    } catch (error:any) {
        console.log("Error Updating User: ", error)
        return {success: false, msg: error?.message}
    }
}
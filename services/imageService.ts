import { ResponseType } from "@/types";

const CLOUDINARY_CLOUD_URL = "https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload";


export const uploadFileToCloudinary = async (
    file: {uri?: string} | string,
    folderName: string
    
): Promise<ResponseType>

export const getProfileImage = (file: any)=>{
    if(file && typeof file == 'string') return file;
    if(file && typeof file == 'object') return file.uri;

    //if neither above true
    return require('../assets/images/defaultAvatar.png')
}
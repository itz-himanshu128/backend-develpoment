import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,           // if api not working 'himanshu87701',
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary= async (localFilePath)=>{
    try {
        if (!localFilePath) return null 
        // upload file on cloudinary 
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        // upload msg 
        console.log("FIle has uploaded seccesfully on cloudinary",response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath)    // it remove locally saved file as the operation failed because it may cause malecious data to run on local device.   
        return null;
    }
}

export{uploadOnCloudinary}

// cloudinary.v2.uploader.uploader("")

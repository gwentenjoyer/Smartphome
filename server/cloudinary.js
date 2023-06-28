import { v2 as cloudinary } from "cloudinary";
import path from "path";
import 'dotenv/config.js';

const __dirname = path.resolve();
const destFolder = "smartphome/phones";

// Configuration 
cloudinary.config({
    cloud_name: process.env.CL_CLOUD_NAME,
    api_key: process.env.CL_API_KEY,
    api_secret: process.env.CL_API_SECRET,
    secure: true
});

const options = {
    use_filename: true,
    overwrite: false,
    folder: destFolder
};

// Upload

const uploadImage = async (imagePath) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath, options);
        return result.secure_url;
    } catch (error) {
        console.error(error);
    }
};

const deleteImage = async (imagePath) => {
    try {
        const result = await cloudinary.uploader.destroy(imagePath, {resource_type: "image"});
        return result;
    } catch (error) {
        console.error(error);
    }
};
export {uploadImage, deleteImage, destFolder}
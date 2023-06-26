import { v2 as cloudinary } from "cloudinary";
import path from "path";

const __dirname = path.resolve();
const destFolder = "smartphome/phones";
// Configuration 
cloudinary.config({
    cloud_name: "dxsbqj6z1",
    api_key: "126648962619959",
    api_secret: "xQreV9uE75MKIEG3HGz7ve0sP1Q",
    secure: true
});

const options = {
    use_filename: true,
    // unique_filename: true,
    overwrite: false,
    folder: destFolder
};

// Upload

/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (imagePath) => {

    //   // Use the uploaded file's name as the asset's public ID and 
    //   // allow overwriting the asset with new versions

    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, options);
        // console.log(result);
        return result.secure_url;
    } catch (error) {
        console.error(error);
    }
};

const deleteImage = async (imagePath) => {

    //   // Use the uploaded file's name as the asset's public ID and 
    //   // allow overwriting the asset with new versions

    try {
        // Upload the image
        const result = await cloudinary.uploader.destroy(imagePath, {resource_type: "image"});
        // console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
};
// uploadImage(__dirname + "/public/img/0000.jpg");

// export default uploadImage;
export {uploadImage, deleteImage, destFolder}
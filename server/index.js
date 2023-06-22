import express from "express";
import mongoose from "mongoose";
import path from "path";
import bodyParser from "body-parser";
import authRouter from "./routers/auth.js"
import homeRouter from "./routers/home.js"
import prodRouter from "./routers/products.js"
// const cloudinary = require('cloudinary').v2;
import {v2 as cloudinary} from "cloudinary";

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));
const PORT = 7777;
const __dirname = path.resolve();
console.log(__dirname);

// const ATLAS_DB = "mongodb+srv://db_user:dIwFUTTmvkTei4yK@cluster0.qbru6uc.mongodb.net/?retryWrites=true&w=majority";

// mongoose.connect(ATLAS_DB, 
//       {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//       }
// ).then(() => {
//     console.log("project folder " + __dirname);
// })
// .catch((e) => {console.error(e)});

app.use("/", homeRouter);
app.use("/auth", authRouter);
app.use("/products", prodRouter);


// Configuration 
// cloudinary.config({
//   cloud_name: "dxsbqj6z1",
//   api_key: "126648962619959",
//   api_secret: "xQreV9uE75MKIEG3HGz7ve0sP1Q",
//   secure: true
// });


// Upload

/////////////////////////
// Uploads an image file
/////////////////////////
// const uploadImage = async (imagePath) => {

//   // Use the uploaded file's name as the asset's public ID and 
//   // allow overwriting the asset with new versions
//   const options = {
//     use_filename: true,
//     unique_filename: true,
//     overwrite: false,
//     folder: "smartphome/phones"
//   };

//   try {
//     // Upload the image
//     const result = await cloudinary.uploader.upload(imagePath, options);
//     console.log(result);
//     return result.secure_url;
//   } catch (error) {
//     console.error(error);
//   }
// };


// uploadImage(__dirname + "/public/img/0000.jpg");


app.listen(PORT, () =>
  console.log(`Listening on http://127.0.0.1:${PORT}!`)
);
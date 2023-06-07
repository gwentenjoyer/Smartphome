import express from "express";
import mongoose from "mongoose";
import path from "path";
import bodyParser from "body-parser";
import authRouter from "./routers/auth.js"
import homeRouter from "./routers/home.js"
// const cloudinary = require('cloudinary').v2;
import cloudinary from "cloudinary";

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = 7777;
const __dirname = path.resolve();

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


// Configuration 
cloudinary.v2.config({
  cloud_name: "dxsbqj6z1",
  api_key: "126648962619959",
  api_secret: "xQreV9uE75MKIEG3HGz7ve0sP1Q"
});


// Upload

const res = cloudinary.v2.uploader.upload('https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg', {public_id: "olympic_flag"})

res.then((data) => {
  console.log(data);
  console.log(data.secure_url);
}).catch((err) => {
  console.log(err);
});


// Generate 
const url = cloudinary.v2.url("olympic_flag", {
  width: 100,
  height: 150,
  Crop: 'fill'
});



// The output url
console.log(url);


app.listen(PORT, () =>
  console.log(`Listening on http://127.0.0.1:${PORT}!`)
);
import { Router } from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import cl from "../cloudinary.js"
import SchemaProduct from "../bsSchemaProduct.js"
// import mongoose from "../mongo.js"

const _phone_blank_img = "https://res.cloudinary.com/dxsbqj6z1/image/upload/v1687559052/smartphome/phones/phone_blank.png";

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
const homeRouter = Router();

homeRouter.post('/add_new', upload.single('image'), async (req, res) => {
    console.log(req.body, req.file);
    let obj = req.body;
    if (!req.body) return res.sendStatus(400);
    else {
        let secUrl;
        if (!req.file) {
            console.log("Using blank image...");
            secUrl = _phone_blank_img;
        }
        else {
            console.log("Sending an image to Cloudinary...");
            secUrl = await cl(req.file.path);
        }
        let data = new SchemaProduct(req.body);
        data.clPublicLink = secUrl;
        try {
            await data.save();
            return res.send(data);
        } catch (error) {
            res.status(500).send(error);
        }
        // return res.send(req.body);
    }

});
homeRouter.get("/list", async (req, res) => {
    const data = await SchemaProduct.find();
    res.send(data);
})
// homeRouter.get("/", async (req, res) => {
//     console.log(req.query);
//     const data = await SchemaProduct.find();
//     res.send(data);
// })
homeRouter.delete("/deleteProduct", async (req, res) => {
    const data = await SchemaProduct.find();
    res.send(data);
})
export default homeRouter;
import { Router } from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import * as cl from "../cloudinary.js"
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
            secUrl = await cl.uploadImage(req.file.path);
            fs.unlink(req.file.path, (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
                console.log('File deleted successfully');
              });
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
    const id = req.body.delElementId;
    // const data = await SchemaProduct.find({_id: req.body.delElementId});
    try{
        const data = await SchemaProduct.findById(id);
        if(data === null){
            throw "no product with this id"
        }
        const imageLink = data.clPublicLink;
        if (imageLink === _phone_blank_img){
            console.log("blank image, skipping...")
        }
        else{
            const pattern = new RegExp(`${cl.destFolder}/[a-zA-Z_0-9]+`)
            const public_id = pattern.exec(imageLink)[0];
            console.log("deleting image with public_id: ", public_id);
            const delImageResponse = await cl.deleteImage(public_id);
            console.log("result of deleting the image:", delImageResponse);
        }
        // console.log(data)
        const delDataResponse = await SchemaProduct.findByIdAndDelete(id);
        console.log("deleted.")
        res.sendStatus(200);
    }
    catch(err){
        console.log("can't find product: ", err);
        res.sendStatus(404);
    }
    // if ()
    // console.log(data)
    // console.log(link)
    // const targetId = req.
    // console.log(JSON.parse(req.body));
    // we need public_id to delete a photo, but we have a link. but link consists of https://res.cloudinary.com/[cloud_name]/image/upload/something/[public_id].[extention]
    // const pattern = new RegExp(`${cl.destFolder}/[a-zA-Z_0-9]+`)
    // const public_id = pattern.exec(data.clPublicLink)[0];
    // console.log(public_id);
    // const delResponse = await cl.deleteImage(public_id);
    // // const data = {d:0};
    // // console.log(data);
    // res.send(data);
})
export default homeRouter;
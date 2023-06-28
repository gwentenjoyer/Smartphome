import { Router } from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import * as cl from "../cloudinary.js"
import SchemaProduct from "../bsSchemaProduct.js"

const _phone_blank_img = "https://res.cloudinary.com/dxsbqj6z1/image/upload/v1687559052/smartphome/phones/phone_blank.png";

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
const homeRouter = Router();

homeRouter.post('/addNew', upload.single('image'), async (req, res) => {
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
    }

});

homeRouter.put('/updateProduct', upload.single('image'), async (req, res) => {
    let newData = req.body;
    const currentId = newData.currentItem;
    delete newData.currentItem;
    if (!req.body) return res.sendStatus(400);
    else {
        let newSecUrl;
        if (!req.file) {
            console.log("Keeping old image.");
        }
        else {
            console.log("Sending new image to Cloudinary...");
            newSecUrl = await cl.uploadImage(req.file.path);
            fs.unlink(req.file.path, (err) => {
                if (err) {
                  console.error(err);
                }
                console.log('File deleted successfully');
              });
              newData.clPublicLink = newSecUrl;
              let oldLink = (await SchemaProduct.findById(currentId)).clPublicLink;
              console.log("oldLink", oldLink);
              if (oldLink === _phone_blank_img){
                  console.log("blank image, skipping...")
              }
              else{
                cl.deleteImage(getPublicIdFromLink(oldLink)).then((delOldImageResponse) =>{
                    console.log("result of deleting the image:", delOldImageResponse);  
                });    
              }     
        }

        try {
            const result = await SchemaProduct.findByIdAndUpdate(currentId, newData);
            return res.sendStatus(200);
        } catch (error) {
            console.log("error")
            res.status(404).send(error);
        }
    }

});

homeRouter.get("/list", async (req, res) => {
    const data = await SchemaProduct.find();
    res.send(data);
});

homeRouter.delete("/deleteProduct", async (req, res) => {
    const id = req.body.delElementId;
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
            const public_id = getPublicIdFromLink(imageLink);
            console.log("deleting image with public_id: ", public_id);
            const delImageResponse = await cl.deleteImage(public_id);
            console.log("result of deleting the image:", delImageResponse);
        }
        const delDataResponse = await SchemaProduct.findByIdAndDelete(id);
        console.log("deleted.")
        res.sendStatus(200);
    }
    catch(err){
        console.log("can't find product: ", err);
        res.sendStatus(404);
    }
})

function getPublicIdFromLink(link){
    const pattern = new RegExp(`${cl.destFolder}/[a-zA-Z_0-9]+`);
    const execRes = pattern.exec(link);
    let public_id ;
    if (execRes !== null){
        public_id = pattern.exec(link)[0];
        return public_id;
    }
    else{
        throw "can't extract public_id from link";
    }
}

export default homeRouter;
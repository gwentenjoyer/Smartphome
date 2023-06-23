import { Router } from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import cl from "../cloudinary.js"
import SchemaProduct from "../bsSchemaProduct.js"
// import mongoose from "../mongo.js"

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
const homeRouter = Router();

homeRouter.post('/add_new', upload.single('image'), async (req, res) => {
    console.log(req.body, path.resolve(), req.file);
    let obj = req.body;
    if (!req.body) return res.sendStatus(400);
    else {
        let json = JSON.stringify(obj); //convert it back to json

        fs.writeFile(path.resolve() + '/items.json', json, 'utf8', (err) => {
            if (err) console.log(err);
            else console.log("successfully writed", json);
        });
        console.log("Sending an image to Cloudinary...");
        // cl(req.file.path).then((secUrl) => {
        //     console.log("Success! Here's URL:", secUrl);
        // });
        let secUrl = await cl(req.file.path);
        console.log(secUrl);
        let data = new SchemaProduct(req.body);
        data.clPublicLink = secUrl;

        // let dataId = new mongoose.Types.ObjectId().toString();
        // console.log(dataId)
        // data._id = new mongoose.Types.ObjectId().toString();
        // data.clPublicId = dataId;

        // prod.save(data);
        
        let prod = new SchemaProduct(data);
        // console.log(prod)
        try {
            await prod.save();
            return res.send(data);
          } catch (error) {
            res.status(500).send(error);
          }
        // return res.send(req.body);
    }

});
homeRouter.get("/list", async (req, res) => {
    const data = await SchemaProduct.find();
    console.log(data);
    // if(!data){
    //     res.send(docs);
    //     res.status(222);
    // }
    // else{
    //     console.warn('Error in retrieving product list');
    //     res.status(555);
    // }
    res.send(data);
})
export default homeRouter;
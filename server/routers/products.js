import { Router } from "express";
import path from "path";
import fs from "fs";
import multer from "multer";

// const upload = multer({ dest: 'uploads/' }); // Specify the destination folder for uploaded files
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
const upload = multer({ storage: storage });

const homeRouter = Router();

homeRouter.post('/add_new', upload.single('image'), (req, res) => {
    console.log(req.body, path.resolve(), req.file);
    let obj = req.body;
    if (!req.body) return res.sendStatus(400);
    else{
        // fs.writeFile(path.resolve() + 'items.json', JSON.stringify(req.body), 'utf8', (e) => {console.log("json writed",e)});
        // fs.readFile('items.json', 'utf8', function readFileCallback(err, data){
        //     if (err){
        //         console.log(err);
        //     } else {
            let json = JSON.stringify(obj); //convert it back to json

            fs.writeFile('D:\\term_paper_2023\\items.json', json, 'utf8', (err) => {
            // fs.writeFile(path.resolve() + 'items.json', json, 'utf8', (err) => {
                if (err) console.log(err);
                else console.log("successfully writed", json);
            }); // write it back 
        // }});
        let str = "asdffd.png";
        let patt = /\.\w+$/; 
        console.log(str.match(patt)[0])
        return res.send(req.body);
    } 
        
  });

export default homeRouter;
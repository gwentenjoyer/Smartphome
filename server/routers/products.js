import { Router } from "express";
import path from "path";
import fs from "fs";
import multer from "multer";

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
const homeRouter = Router();

homeRouter.post('/add_new', upload.single('image'), (req, res) => {
    console.log(req.body, path.resolve(), req.file);
    let obj = req.body;
    if (!req.body) return res.sendStatus(400);
    else {
        let json = JSON.stringify(obj); //convert it back to json

        fs.writeFile(path.resolve() + '/items.json', json, 'utf8', (err) => {
            if (err) console.log(err);
            else console.log("successfully writed", json);
        });
        return res.send(req.body);
    }

});

export default homeRouter;
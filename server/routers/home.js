import { Router } from "express";
import path from "path";

const homeRouter = Router();

homeRouter.get('/', (req, res) => {
  // console.log(req.query, "root request");
    // res.set('Content-Type', 'text/html');
    // res.sendFile(path.resolve() + "/public/main.html");
    console.log("root req")
    res.render(path.resolve() + "/public/main");
    // res.send("hello");
  });

export default homeRouter;
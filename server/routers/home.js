import { Router } from "express";
import path from "path";

const homeRouter = Router();

homeRouter.get('/', (req, res) => {
    // console.log("res");
    res.set('Content-Type', 'text/html');
    // console.log(req.query);
    res.sendFile(path.resolve() + "/public/main.html");
  });

export default homeRouter;
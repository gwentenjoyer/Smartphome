import { Router } from "express";
import path from "path";

const homeRouter = Router();

homeRouter.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.sendFile(path.resolve() + "/public/main.html");
  });

export default homeRouter;
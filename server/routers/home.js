import { Router } from "express";
import path from "path";

const homeRouter = Router();

homeRouter.get('/', (req, res) => {
    res.render("main", {
      session: req.session
    });
  });

export default homeRouter;
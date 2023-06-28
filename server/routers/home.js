import { Router } from "express";
import path from "path";

const homeRouter = Router();

homeRouter.get('/', (req, res) => {
    res.render("main", {
      user: req.session.user
    });
  });

homeRouter.get("/adminpanel", (req, res) => {
  if(req.session.user){
    if(req.session.user.isAdmin){
      res.render("adminpanel", {
        user: req.session.user
      });
    }
    else{
    res.sendStatus(403);
    }
  }
  else{
    res.sendStatus(403);
  }
});

export default homeRouter;
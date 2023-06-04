import { Router } from "express";
import path from "path";
const authRouter = Router();

authRouter.post("/login", (request, response) => {
    console.log(request.body);
    if (!request.body) return response.sendStatus(400);
    request.body.boba = 45;
    response.json(request.body);
});

authRouter.post("/signup", (request, response) => {
    console.log(request.body);
    if (!request.body) return response.sendStatus(400);
    request.body.biba = 69;
    response.json(request.body);
});
authRouter.get("/", (req, res) => {
    console.log("hhaha loser");
    res.set('Content-Type', 'text/html');
    res.sendFile(path.resolve() + "/index.html");
    console.log(req.query);
  });
export default authRouter;
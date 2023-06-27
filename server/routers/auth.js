import { Router } from "express";
import path from "path";
import SchemaUser from "../bdSchemaUser.js"
const authRouter = Router();

authRouter.post("/login", async (request, response) => {
    // console.log(request.body);
    if (!request.body) return response.sendStatus(400);
    const account = request.body;
    const dbAnswer = await SchemaUser.findOne({
        user_email: account.user_email,
        user_password: account.user_password
    })
    // console.log(dbAnswer)
    if(!dbAnswer) {return response.sendStatus(404);}
    request.session.user = {
        user_email:account.user_email,
        user_password:account.user_password,
        isAdmin:account.isAdmin
    }
    response.sendStatus(204);
});

authRouter.post("/signup", async (request, response) => {
    if (!request.body) return response.sendStatus(400);
    try {
        // SchemaUser.createIndexes();
        let newAccount = request.body;
        // console.log({user_email:newAccount.user_email});
        // const dbAnswer = await SchemaUser.findOne({user_email:newAccount.user_email})
        // if(dbAnswer) {return response.sendStatus(403);}  // user with email already created
        // console.log(dbAnswer)
        newAccount.isAdmin = false;
        const toSave = SchemaUser(newAccount);
        await toSave.save(); //if error or already exists(11000), throws an error
        request.session.user = {
            user_email:newAccount.user_email,
            user_password:newAccount.user_password,
            isAdmin:newAccount.isAdmin
        }
        return response.sendStatus(201);
    } catch (error) {
        if (error.code === 11000) {
            return response.sendStatus(403);    // account already exists
          } else {
        console.log(error);
        return response.sendStatus(500);
    }
    }
});
// authRouter.get("/", (req, res) => {
//     console.log("hhaha loser");
//     res.set('Content-Type', 'text/html');
//     res.sendFile(path.resolve() + "/index.html");
//     console.log(req.query);
// });

authRouter.post('/logout', async(request, response) => {
    request.session.destroy();
    response.sendStatus(204);
})

export default authRouter;
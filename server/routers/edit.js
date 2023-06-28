import { Router } from "express";
import SchemaUser from "../bdSchemaUser.js"
const editRouter = Router();

editRouter.get('/showUsers', async (request, response) =>{
    try{
        const dbRes = await SchemaUser.find();
        response.send(dbRes);
    }catch (e){
        response.status(500);
    }
})

editRouter.post('/deleteUser', async (request, response) =>{
    try{
        await SchemaUser.deleteOne({
            user_email: request.body.user_email,
            user_password: request.body.user_password,
            isAdmin: request.body.isAdmin
        }, (err)=>{
            if(err){
                console.log("deleteUser error", err);
                throw err;
            }
        })
        response.sendStatus(200);
    }catch (e){
        response.sendStatus(200);
    }
})

editRouter.put('/updateUser', async (request, response) =>{
    try{
        let oldData = {
            user_email: request.body.old_user_email,
            user_password: request.body.old_user_password,
            isAdmin: request.body.old_isAdmin,
        }
        let updateData = {
            isAdmin: request.body.new_isAdmin
        }
        const dbResp = await SchemaUser.updateOne(oldData, updateData);
        if (!dbResp.acknowledged) return response.sendStatus(404);
        console.log(dbResp, oldData, updateData);
        response.sendStatus(200);
    }catch (e){
        response.sendStatus(500);
    }
})
export default editRouter;
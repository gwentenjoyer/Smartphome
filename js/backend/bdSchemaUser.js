import mongoose from "mongoose";

const schemaUser = new mongoose.Schema({
    user_email:{type:String, required:true},
    user_password:{type:String, required:true},
    role:{type:String, required:true}
})
export default mongoose.model("schemaUser", schemaUser);
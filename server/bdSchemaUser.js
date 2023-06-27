import mongoose from "mongoose";

const schemaUser = new mongoose.Schema({
    user_email:{type:String, required:true},
    // user_email:{type:String, required:true, unique:true},
    user_password:{type:String, required:true},
    isAdmin:{type:Boolean, required:true}
})
schemaUser.index({ user_email: 1, user_password: 1 }, { unique: true });
// schemaUser.pre('init', function () {
//     // this.createIndexes();
//     // createIndex( { "a.loc": 1, "a.qty": 1 }, { unique: true } )
//   });
export default mongoose.model("SchemaUser", schemaUser, "users");
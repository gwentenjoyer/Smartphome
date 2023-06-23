import mongoose from "mongoose";

const schemaProduct = new mongoose.Schema({
    manufacturer:{type:String, required:true},
    model:{type:String, required:true},
    diagonal:{type:String},
    cpu:{type:String},
    ram:{type:Number},
    rom:{type:Number},
    clPublicLink:{type:String, required:true}
})
export default mongoose.model("SchemaProduct", schemaProduct, 'products');
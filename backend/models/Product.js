import mongoose from "mongoose";

const ProductSchema=new mongoose.Schema(
    {
        title:{type:String,required:true,},
        desc:{type:String},
        img:{type:Array,required:true},
        category:{type:Array},
        color:{type:Array},
        size:{type:Array},
        shoeNumber:{type:Array},
        price:{type:Number},
        gender:{type:String,required:true},
        inStock:{type:Boolean,default:true}

    },{timestamps:true}
);

export default mongoose.model("Product", ProductSchema);
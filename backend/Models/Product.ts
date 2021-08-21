import mongoose from "mongoose";

export interface ProductDetail extends mongoose.Document{
    Name:String;
    Image:String;
    Description:String;
    Quantity:Number;
    Price:Number;
}

export const ProductSchema  = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        trim:true
    },
    Image:{
        type:String,
        required:true,
    },
    Description :{
        type:String,
        required:true,
    },
    Quantity :{
        type:Number,
        required:true,
    },
    Price:{
        type:Number,
        required:true,
        min:1
    }
},{timestamps:true})

export default  mongoose.model<ProductDetail>('Product',ProductSchema)

const express=require("express");
const mongoose=require("mongoose");

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categories"
    },
     description:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }

},{timestamps:true})
const blogCollection=new mongoose.model("blogs",blogSchema);
module.exports=blogCollection;
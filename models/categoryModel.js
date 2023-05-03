const express=require("express");
const mongoose=require("mongoose");

const categorySchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    }
})
const categoryCollection=new mongoose.model("categories",categorySchema);
module.exports=categoryCollection;
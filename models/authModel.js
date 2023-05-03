const express=require("express");
const mongoose=require("mongoose");

const authSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})
const authCollection=new mongoose.model("users",authSchema);
module.exports=authCollection;
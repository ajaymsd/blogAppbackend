const categoryModel=require("../models/categoryModel");
const getAllCategories=async(req,res)=>{
   try{
    const categories=await categoryModel.find({});
    return res.status(200).json(categories);
   }catch(err){
    console.log(err);
    res.status(400).json({"message":err.message});
   }
}
const addNewCategory=async(req,res)=>{
     const {title}=req.body;
     try{
     if(title){
        const category=new categoryModel({title});
        category.save();
        return res.status(200).json({"message":"Category Added Successfully"});
     }else{
        return res.status(404).json({"message":"Please Enter All the fields"});
     }
    }catch(err){
        console.log(err);
        res.status(400).json({"message":err.message});
    }
}
module.exports={getAllCategories,addNewCategory};
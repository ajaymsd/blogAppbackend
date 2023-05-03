const authModel=require("../models/authModel");
const bcryptjs=require("bcryptjs");
const jwt =require("jsonwebtoken");
const userRegistration=async(req,res)=>{
   const {username,email,password}=req.body;
   try{
    if(username && email && password){
        const user=await authModel.findOne({email:email});
        if(!user){
           const genSaltKey=await bcryptjs.genSalt(10);
           const hashedPassword=await bcryptjs.hash(password,genSaltKey);
           const user =await authModel.create({username,email,password:hashedPassword});
           user.save();
           return res.status(200).json({message:"Registration Successfully Done"});
        }else{
            return res.status(400).json({"message":"User Already Exists"});
        }
    }else{
        return res.status(400).json({"message":"Please Enter All the Fields"});
    }
   }catch(err){
    console.log(err);
    return res.status(400).json({"message":err.message});
   }
}


const userLogin=async(req,res)=>{
    const {email,password}=req.body;
    try{
        if(email && password){
            const user=await authModel.findOne({email:email});
            if(user){
                //checking if email is equal and comparing a password 
               if(user.email === email && await bcryptjs.compare(password,user.password)){
                 const token=jwt.sign({userID:user._id},"mynameisaj",{
                    expiresIn:"2d"
                 })
                 return res.status(200).json({
                    "message":"Login Successfull",
                    token,
                    name:user.username
                })
               }else{
                return res.status(400).json({"message":"Invalid Username or Password"});
               }
            }else{
                res.status(400).json({"message":"User Not Found"});
            }
        }else{
            res.status(400).json({"message":"Please Enter All the Fields"});
        }
    }catch(err){
        console.log(err);
        res.status(400).json({"message":err.message});
       }
}
module.exports= {userRegistration,userLogin}
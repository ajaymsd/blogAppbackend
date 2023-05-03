const authModel=require('../models/authModel');
const jwt=require("jsonwebtoken");

const checkIsUserAuthenticated=async(req,res,next)=>{
    let token;
    //getting the authorization part from req.headers
    const {authorization}=req.headers;
    
    //splitting the bearer word from the authorization
    if(authorization && authorization.startsWith("Bearer")){
        try{
        token=authorization.split(" ")[1];
        //verify token
        //UserID is the key which we have set in jwt token while login
        const {userID}=jwt.verify(token,"mynameisaj");
        //get user from token
        //assigning the value to req.user
        req.user=await authModel.findById(userID).select('--password');
        next();
        }catch(err){
            return res.status(401).json({"message":"unAuthorized User"});
        }
    }else{
        return res.status(401).json({"message":"unAuthorized User"});
    }
}

module.exports=checkIsUserAuthenticated;
const mongoose=require("mongoose");
require("dotenv").config();
const mongooseConnect=()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Mongo DB Connected");
    }).catch(err=>console.log(err));
}
module.exports=mongooseConnect;
const express=require("express");
const app=express();
require("dotenv").config;
const mongooseConnect=require("./config/db");
const authRoutes=require('./routes/blog');
const cors=require('cors');
const PORT_NO=process.env.PORT || 6010 

app.use(cors());
app.use(express.json());
app.use(express.static("public/upload"));

app.use("/api/v1",authRoutes);
mongooseConnect();
app.listen(PORT_NO,(req,res)=>{
    console.log(`App Listening on http://localhost:${process.env.PORT}`);
})
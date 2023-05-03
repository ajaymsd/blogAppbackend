const blogModel=require("../models/blogModel");
const getAllBlogs=async(req,res)=>{
    try{
        //getting the blogs of the user based on the request user parameter which we have stored in authMiddleware
        const blogs=await blogModel.find({user:req.user._id});
        return res.status(200).json(blogs);
       }catch(err){
        console.log(err);
        return res.status(400).json({"message":err.message});
       }
};
const addNewBlog=async(req,res)=>{
    const {title,category,description}=req.body;
    try{
    if(title && category && description){
        console.log(title,category,description);
        const newBlog=new blogModel({
            title:title,
            category:category,
            description:description,
            thumbnail:req.file.filename,
            user:req.user._id
        })
        console.log(newBlog);
        const savedBlog=await newBlog.save();
        
        if(savedBlog){
            return res.status(200).json({"message":"Blog Added Successfully"});
        }
        else{
            return res.status(400).json({"message":"There is an Error While Adding a Blog"})
        }
    }else{
        return res.status(400).json({"message":"Please Enter All the fields"});
    }
  }catch(err){
    console.log(err);
    res.status(400).json({"message":err.message});
  }
};


const getSingleBlog=async(req,res)=>{
    const {id}=req.params;
    try{
        if(id){
          const fetchBlogbyId=await blogModel.findById(id);
          return res.status(200).json(fetchBlogbyId);
        }else{
            return res.status(400).json({"message":"Invalid URL"});
        }
    }catch(err){
       console.log(err);
       return res.status(400).json({"message":err.message});
    }
};

const deleteBlog=async(req,res)=>{
    const {id}=req.params;
    console.log(id);
   try{
     const deleteBlog=await blogModel.deleteOne({_id:id});
     return res.status(200).json({"message":"Blog Deleted Successfully"});
   }catch(err){
    console.log(err);
    return res.status(400).json({"message":err.message});
   }
}
const getHomeBlogs=async(req,res)=>{
    try{
        //getting the blogs of the user based on the request user parameter which we have stored in authMiddleware
        const blogs=await blogModel.find({}).populate({path:"user",model:"users"});
        return res.status(200).json(blogs);
       }catch(err){
        console.log(err);
        return res.status(400).json({"message":err.message});
       }
}

module.exports={getAllBlogs,addNewBlog,getSingleBlog,deleteBlog,getHomeBlogs};
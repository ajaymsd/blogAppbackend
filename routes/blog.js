const express=require("express");
const router=express.Router();
const {userRegistration,userLogin} =require("../controllers/authController");
const {getAllBlogs,addNewBlog,getSingleBlog,deleteBlog,getHomeBlogs}=require("../controllers/blogController");
const {getAllCategories,addNewCategory}=require("../controllers/categoryController");
const multer=require("multer");
const checkIsUserAuthenticated=require('../middlewares/authMiddleware');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/upload/');
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`);
    }
})
const upload =multer({storage:storage});

router.post("/user/register",userRegistration);
router.post("/user/login",userLogin);

//Protected Routes

router.get("/get/allblogs",checkIsUserAuthenticated,getAllBlogs);
router.get("/get/homeblogs",getHomeBlogs);
router.post("/add/blog",upload.single("thumbnail"),checkIsUserAuthenticated,addNewBlog);
router.get("/get/blog/:id",getSingleBlog);
router.delete("/delete/blog/:id",checkIsUserAuthenticated,deleteBlog);
router.get("/get/categories",checkIsUserAuthenticated,getAllCategories);
router.post("/add/category",checkIsUserAuthenticated,addNewCategory);

module.exports=router;
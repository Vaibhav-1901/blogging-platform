import { Router } from "express";
import { getAllBlogs,getSingleBlog,createBlog,getUserBlogs,createComment,updateBlog,deleteBlog } from "../controllers/blog.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const blogRouter=Router();
blogRouter.route("/create").post(verifyJWT,createBlog)//for creating
blogRouter.route("/").get(getAllBlogs)//For Home page 
blogRouter.route("/my-blogs").get(verifyJWT,getUserBlogs)//For blog page (Users blogs only)
blogRouter.route("/:slug/comment").post(verifyJWT,createComment)
blogRouter.route("/:slug").get(getSingleBlog).put(updateBlog).delete(deleteBlog)//For Full blog



export default blogRouter
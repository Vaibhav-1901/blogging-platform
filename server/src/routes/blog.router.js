import { Router } from "express";
import { getAllBlogs,getSingleBlog,createBlog,getUserBlogs,createComment,updateBlog,deleteBlog } from "../controllers/blog.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const blogRouter=Router();
blogRouter.route("/create").post(verifyJWT,createBlog)
blogRouter.route("/").get(getAllBlogs) 
blogRouter.route("/my-blogs").get(verifyJWT,getUserBlogs)
blogRouter.route("/:slug/comment").post(verifyJWT,createComment)
blogRouter.route("/:slug").get(getSingleBlog).put(updateBlog).delete(deleteBlog)



export default blogRouter
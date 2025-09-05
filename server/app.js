import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors";

const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",                      // local dev
    "https://blogging-platform-swart.vercel.app"  // deployed frontend
  ],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import userRouter from "./src/routes/user.router.js";
import blogRouter from "./src/routes/blog.router.js";

app.use("/api/users", userRouter)
app.use("/api/blogs", blogRouter)

export { app }



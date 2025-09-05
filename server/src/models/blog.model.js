import mongoose from "mongoose";
import slugify from "slugify"

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: { type: String, required: true },
  },
  { timestamps: true } 
);

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true,
        unique:true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tags:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
       default: "https://picsum.photos/400/300"
    },
    comments: [
      commentSchema
    ],


}, { timestamps: true })

blogSchema.pre("save", function (next) {
    if (this.isModified("title")) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }
    next();

})

export const Blog = mongoose.model("Blog", blogSchema)

import { Blog } from "../models/blog.model.js";


const createBlog = async function (req, res) {
  //already know that the user is signed in 
  try {
    const { title, content } = req.body;
    let imageUrl = req.body.image;
    if (!imageUrl || imageUrl.trim() === "") {
      imageUrl = undefined;
    }
    const author = req.user._id;//not getting username as it can change
    const tags = req.body.tags ? req.body.tags : []
    const blog = await Blog.create({
      title,
      content,
      author,
      imageUrl,
      tags
    })
    return res.status(200).json({ message: "Blog Successfully Created" })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "A blog with this title/slug already exists" });
    }
    return res.status(400).json({ message: error.message })

  }
}

const getSingleBlog = async function (req, res) {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({
      slug
    })
      .populate("author", "username fullname")
      .populate("comments.user", "username")
    if (!blog) {
      return res.status(400).json({ message: "Blog not found" })
    }
    return res.status(200).json({
      status: 200,
      data: blog,
      message: "Blog Fetched Successfully"
    });

  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const getAllBlogs = async function (req, res) {
  try {
    const blogs = await Blog.find()
      .populate("author", "username fullname").sort({ createdAt: -1 })
    return res.status(200).json({
      status: 200,
      data: blogs,
      message: "Blog Fetched Successfully"
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id }).populate("author", "username fullname").sort({ createdAt: -1 });
    res.status(200).json({ data: blogs, message: "Blog fetched successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const createComment = async function (req, res) {
  try {
    const { slug } = req.params;
    const { comment } = req.body;
    const user = req.user

    if (!comment) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const blog = await Blog.findOneAndUpdate(
      { slug },
      {
        $push: {
          comments: {
            user: user._id,
            text: comment,
          },
        },
      },
      { new: true }
    ).populate("comments.user", "username");

    return res.status(200).json({ data: blog, message: "Comment succesfull" });

  } catch (error) {
    return res.status(500).json({ message: "Couldnt create comment" });

  }

}

const updateBlog = async function (req, res) {
  try {
    const { slug } = req.params;
    const { title, content,tags } = req.body;
    let image = req.body.image;
    const updateData = { title, content ,tags};

    if (image && image.trim() !== "") {
      updateData.imageUrl = image;
    }

    const updatedBlog = await Blog.findOneAndUpdate(
      { slug },
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ data: updatedBlog, message: "Changes Saved" });
  } catch (error) {
    return res.status(400).json({ message: error.message });

  }
}

const deleteBlog = async function (req, res) {
  const { slug } = req.params
  await Blog.deleteOne({
    slug
  })
  return res.status(200).json({ message: "Blog Successfully Deleted" })

}

export { getAllBlogs, getSingleBlog, createBlog, createComment, getUserBlogs, updateBlog, deleteBlog }
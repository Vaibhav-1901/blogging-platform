import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGetSingleBlog from "../hooks/UseGetSingleBlog";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import { useAuth } from "../context/AuthContext";
import { BASE_URL } from "../constants";
import { useBlog } from "../context/BlogContext";
import useGetUser from "../hooks/UserGetUser";
import fetchWithRefresh from "../utilities/fetchWithRefresh";
import { ToastContainer,toast } from "react-toastify";

function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { refresh, setRefresh } = useBlog();
  const { blog, error } = useGetSingleBlog(slug, refresh);
  const [comments, setComments] = useState([]);
  const { isLoggedIn } = useAuth();
  const user = useGetUser();

  // to get all comments
  useEffect(() => {
    if (blog?.comments) {
      setComments(blog.comments);
    }
  }, [blog, refresh]);

  if (error) {
    return (
      <div className="text-center mt-10 text-red-400">
        ⚠️ Error loading blogs: {error}
      </div>
    );
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Add comment
  const onSubmit = async (data) => {
    try {
      await fetchWithRefresh(`${BASE_URL}/api/blogs/${slug}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      reset();
      setRefresh((prev) => prev + 1);
      toast.success("Comment Added")
      toast
    } catch (error) {
      console.log("Comment error:", error);
    }
  };

  // DELETE BLOG
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await fetch(`${BASE_URL}/api/blogs/${slug}`, {
        method: "DELETE",
        credentials: "include",
      });
      toast.success("Blog successfully deleted")
      navigate("/blogs");
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {blog ? (
        <div className="max-w-3xl mx-auto my-6 rounded-2xl bg-purple-500/5 backdrop-blur-sm shadow-lg border border-purple-500/20 overflow-hidden p-6 relative">
          {/* Edit/Delete Buttons (top-right corner) */}
          {user && blog.author?._id === user._id && (
            <div className="absolute top-4 right-4 md:flex-row flex md:gap-2 flex-col gap-4">
              <button
                onClick={() => navigate(`/blogs/${slug}/edit`)}
                className="border border-purple-700 cursor-pointer px-2 py-1  hover:bg-purple-500/10 text-white md:px-3 md:py-1.5 rounded-md font-medium transition text-sm"
              >
                ✏️ Edit
              </button>

              <button
                onClick={handleDelete}
                className="border border-pink-700 px- py-1 hover:bg-pink-500/10 cursor-pointer text-white md:px-3 md:py-1.5 rounded-md text-sm shadow-md transition"
              >
                🗑️ Delete
              </button>
            </div>
          )}

          {/* Title + Author + Date */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-purple-400">{blog.title}</h1>
            <p className="text-gray-400 text-sm mt-2">
              By <span className="text-purple-300">{blog.author?.username}</span>{" "}
              • {new Date(blog.createdAt).toDateString()}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              🏷️ {blog.tags}
            </p>
          </div>

          {/* Blog Image */}
          {blog.imageUrl && (
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="md:w-[90%]  max-w-full mx-auto max-h-[400px]  rounded-lg mb-6"
            />
          )}

          {/* Blog Content */}
          <div className="max-w-none mb-10 text-gray-200 px-7">
            {blog.content}
          </div>

          {/* Comments Section */}
          <div className="bg-purple-500/8 p-4 rounded-lg shadow-md mt-8 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-3 text-white">💬 Comments</h3>

            {isLoggedIn ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mb-4">
                <InputField
                  label="Comment"
                  name="comment"
                  placeholder="Share your thoughts..."
                  register={register}
                  rules={{ required: "Comment cannot be empty" }}
                  errors={errors}
                />
                <button
                  type="submit"
                  className="border border-purple-700 cursor-pointer hover:bg-purple-500/10 text-white px-3 py-1.5 rounded-md font-medium transition text-sm"
                >
                  Submit Comment
                </button>
              </form>
            ) : (
              <p className="text-gray-400 text-sm">
                You must be logged in to comment.

              </p>
            )}
          </div>

          {/* DIsplayig  Comments */}
          <div className="space-y-3 mt-4 max-w-2xl mx-auto px-2">
            {comments.length > 0 ? (
              comments
                .slice()
                .reverse()
                .map((comment, index) => (
                  <div
                    key={index}
                    className="bg-black/50 border border-purple-500/20 rounded-lg p-3 text-sm"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-purple-300 font-medium">
                        {comment.user?.username || "Anonymous"}
                      </p>
                      <span className="text-xs text-gray-500">
                        {new Date(blog.createdAt).toLocaleString([], {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>
                    <p className="text-gray-200">{comment.text}</p>
                  </div>
                ))
            ) : (
              <p className="text-gray-500 text-sm">
                No comments yet. Be the first one!
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-red-400 text-center mt-10">Blog not found.</p>
      )}
    </div>
  );
}

export default BlogDetail;





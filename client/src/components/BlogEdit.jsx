import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useGetSingleBlog from "../hooks/UseGetSingleBlog";
import { BASE_URL } from "../../../server/constants";
import InputField from "./InputField";
import { useBlog } from "../context/BlogContext";

function BlogEdit() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { blog, error } = useGetSingleBlog(slug); // fetch blog by slug
    const { refresh, setRefresh } = useBlog();
    const [message, setMessage] = useState("");
    const tags = [
        "Technology",
        "Lifestyle",
        "Travel",
        "Education",
        "Food",
        "Health",
        "Finance",
        "Miscellaneous"
    ];
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (blog) {
            reset({
                title: blog.title,
                content: blog.content,
                imageUrl: blog.imageUrl || "",
                tags:blog.tags
            });
        }
    }, [blog, reset]);

    // Submit updated blog
    const onSubmit = async (data) => {
        try {
            const res = await fetch(`${BASE_URL}/api/blogs/${slug}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            });
            const updatedBlog = await res.json();

            if (res.ok) {
                setRefresh(prev => prev + 1)
                navigate(`/blogs`); // redirect to updated blog page

            } else {
                setMessage(`❌ ${updatedBlog.message || "Couldn't edit blog"}`)
                console.log("Update failed");
                setMessage()
            }
        } catch (error) {
            console.error("Error updating blog:", error);
            setMessage(`❌ ${error.message || "Couldn't edit blog"}`)
        }
    };

    if (error) {
        return <p className="text-red-400 text-center mt-10">Error: {error}</p>;
    }

    //SAme as create blog 

    return (
        <div className="min-h-screen bg-black flex justify-center items-start py-10">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-2xl bg-purple-500/5 border border-purple-500/20 rounded-xl p-6 space-y-4"
            >
                <h2 className="text-2xl font-bold text-purple-400 mb-4">✏️ Edit Blog</h2>

                {/* Title */}
                <div>
                    <InputField
                        labe="Title"
                        placeholder="Enter blog title"
                        name="title"
                        register={register}
                        rules={{ required: "Title is required" }}
                        errors={errors}
                    />
                </div>
                <div>
                    <select  {...register("tags", { required: "Please select a tag" })}
                        className={`w-full px-4 py-2 rounded-lg bg-neutral-900 text-gray-200 border border-purple-500/20 focus:outline-none focus:ring-2 ${errors.tag
                            ? "border-red-500 focus:ring-red-500"
                            : "focus:ring-purple-500 border-gray-300"
                            }`}>
                        <option value="">-- Select a tag --</option>
                        {tags.map((tag, index) => (
                            <option key={index} value={tag}>
                                {tag}
                            </option>
                        ))}


                    </select>
                </div>

                {/* Content */}
                <div>
                    <label className="block text-gray-300 mb-1">Content</label>
                    <textarea
                        rows="6"
                        placeholder="Write your blog content..."
                        {...register("content", { required: "Content is required" })}
                        className={`w-full px-4 py-2 rounded-lg bg-neutral-900 text-gray-200 border border-purple-500/20 focus:outline-none focus:ring-2 ${errors.content ? "border-red-500 focus:ring-red-500" : "focus:ring-purple-500 border-gray-300"}`}
                    />
                    {errors.content && (
                        <p className="text-red-500 text-sm mt-1 ">
                            {errors.content.message}
                        </p>
                    )}
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-gray-300 mb-1">Image URL (optional)</label>
                    <input
                        type="text"
                        placeholder="https://example.com/image.jpg"
                        {...register("image")}
                        className="w-full px-4 py-2 rounded-lg bg-neutral-900 text-gray-200 border border-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                {message && (
                    <p className="text-red-500 text-sm mt-1 ">
                        {message}
                    </p>
                )}

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700 text-white"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BlogEdit;

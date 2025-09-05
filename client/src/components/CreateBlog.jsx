import { useForm } from "react-hook-form";
import { useState } from "react";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import { BASE_URL } from "../constants";
import fetchWithRefresh from "../utilities/fetchWithRefresh";

function CreateBlog() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm();
    const navigate = useNavigate();
    const { refresh, setRefresh } = useBlog();
    const tags = [
        "Technology",
        "Lifestyle",
        "Travel",
        "Education",
        "Food",
        "Health",
        "Finance",
    ];

    const [message, setMessage] = useState("");

    const onSubmit = async (data) => {
        try {
            const res = await fetchWithRefresh(`${BASE_URL}/api/blogs/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),

            });

            const result = await res.json();

            if (res.ok) {
                setMessage("✅ Blog created successfully!");
                reset();
                navigate(`/blogs`);
                setRefresh(prev => prev + 1)//FOR RE RENDER OF THE BLOG ARRAY 
            }
            else {
                setMessage(`❌ ${result.message || "Couldn't create blog"}`)
            }
        } catch (error) {
            console.error("Blog creation error:", error);
            setMessage("❌ " + error.message);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
            <div className="max-w-2xl w-full bg-purple-500/5 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-500/20 p-8">
                <h1 className="text-3xl font-bold text-purple-400 mb-6 text-center">
                    ✍️ Create New Blog
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

                    {/* Tags */}

                    <div>
                        <select  {...register("tags", { required: "Please select a tag" })}
                            className={`w-full px-4 py-2 rounded-lg bg-neutral-900 text-gray-200 border border-purple-500/20 focus:outline-none focus:ring-2 ${errors.tag
                                ? "border-red-500 focus:ring-red-500"
                                : "focus:ring-purple-500 border-gray-300"
                                }`}>
                            <option value="">-- Select a tag --</option>
                            {tags.map((tag,index)=>(
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
                            className={` custom-scroll w-full px-4 py-2 rounded-lg bg-neutral-900 text-gray-200 border border-purple-500/20 focus:outline-none focus:ring-2 ${errors.content ? "border-red-500 focus:ring-red-500" : "focus:ring-purple-500 border-gray-300"}`}
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

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}//disabling submit 
                        className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition"
                    >
                        {isSubmitting ? "Creating..." : "Create Blog"}
                    </button>
                </form>

                {/* Message */}
                {message && (
                    <p className="mt-4 text-center text-gray-300">{message}</p>
                )}
            </div>
        </div>
    );
}

export default CreateBlog;

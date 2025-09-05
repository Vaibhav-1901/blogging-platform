import React, { useState } from "react";
import BlogCard from "../components/BlogCard";
import useGetAllBlogs from "../hooks/UseGetAllBlogs";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { blogs, error } = useGetAllBlogs();
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedTag, setSelectedTag] = useState("");
  const navigate = useNavigate();

  const tags = [
    "Technology",
    "Lifestyle",
    "Travel",
    "Education",
    "Food",
    "Health",
    "Finance",
  ];

  if (error) {
    return (
      <div className="text-center mt-10 text-red-400">
        ⚠️ Error loading blogs: {error}
      </div>
    );
  }

  if (!blogs) {
    return (
      <div className="text-center mt-10 text-gray-400">Loading blogs...</div>
    );
  }

  const filteredBlogs = selectedTag
    ? blogs.filter((blog) => blog.tags?.includes(selectedTag))//Everything included if empty
    : blogs;
  const blogsToShow = filteredBlogs.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-8 md:px-16">
      <section className="pt-12 sm:pt-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold border-b-2 border-purple-500 pb-2 inline-block">
            Latest Blogs
          </h1>

          <select
            value={selectedTag}
            onChange={(e) => {
              setSelectedTag(e.target.value);
              setVisibleCount(3);//Reseting back after filter 
            }}
            className="bg-black text-white px-3 py-2 rounded-lg border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 sm:w-auto w-full"
          >
            <option value="">All Tags</option>
            {tags.map((tag, idx) => (
              <option key={idx} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogsToShow.length > 0 ? (
            blogsToShow.map((blog, index) => (
              <BlogCard
                key={index}
                title={blog.title}
                image={blog.imageUrl}
                content={blog.content}
                onClick={() => navigate(`/blogs/${blog.slug}`)}
                blogs={blog}
              />
            ))
          ) : (
            <p className="text-gray-400 col-span-full text-center">
              No blogs found for this tag.
            </p>
          )}
        </div>

        {/* Show More Button */}
        {visibleCount < filteredBlogs.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-6 py-2 border cursor-pointer border-purple-700 rounded-lg shadow-sm shadow-purple-500 hover:shadow-purple-700 font-medium transition-transform duration-300 hover:scale-105"
            >
              Show More
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;

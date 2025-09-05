import React from 'react';

function BlogCard({ title, content, image, onClick, blogs }) {
  return (
    <div
      className="
        mt-7 border border-purple-400 rounded-2xl 
        w-full sm:w-[90%]
        min-h-[350px] text-white 
        shadow-lg hover:shadow-purple-500/30 
        hover:scale-[1.05] transition-all duration-300 
        overflow-hidden cursor-pointer
      "
      onClick={onClick}
    >
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-t-2xl"
      />

      {/* Divider */}
      <div className="border-t border-purple-400"></div>

      {/* Content Area */}
      <div className="p-3">
        <h2 className="text-xl font-bold text-purple-300 hover:text-purple-400 transition-colors duration-200">
          {title}
        </h2>

        <p className="text-xs text-gray-400 mt-1">
          By {blogs.author?.username || "Unknown"} •{" "}
          {new Date(blogs.createdAt).toLocaleDateString()}
        </p>

        <p className="line-clamp-3 text-gray-200 mt-2">
          {content}
        </p>
      </div>
    </div>
  );
}

export default BlogCard;

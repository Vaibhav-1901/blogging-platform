import React, { useState } from 'react'
import UseGetUserBlogs from '../hooks/UseGetUserBlogs.jsx';
import BlogCard from '../components/BlogCard.jsx';
function Blogs() {
    const [isLoggedIn, setisLoggedIn] = useState(true);
    const { blogs, error } = UseGetUserBlogs();
    if (!isLoggedIn) {
        return (
            <div className="text-center mt-10 text-xl">
                🚫 Please <span className="text-purple-400">Login</span> to view blogs.
            </div>
        )
    }
    if (error) {
        return (
            <div className="text-center mt-10 text-red-400">
                ⚠️ Error loading blogs: {error}
            </div>
        );
    }
    if (!blogs || blogs.length == 0) {
        return (
            <div className="text-center mt-10 text-gray-400">
               No blogs found. Be the first to create one!
            </div>
        )
    }
    return (
        <>
        <h1>Your Blogs</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((e) => (
                    <BlogCard
                        key={e.id}
                        title={e.title}
                        image={e.imageUrl}
                        content={e.content}
                    />
                ))}
            </div>
        </>
    )
}

export default Blogs
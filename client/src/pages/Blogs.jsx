import React, { useState } from 'react'
import useGetUserBlogs from '../hooks/UseGetUserBlogs.jsx';
import BlogCard from '../components/BlogCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
function Blogs() {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const { blogs, error } = useGetUserBlogs();
    const navigate=useNavigate();

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
              You haven’t created any blogs yet. Start writing your first one and share your ideas with the world!
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-black text-white px-6 md:px-16">
            <section className='pt-16'>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 border-b-2 border-purple-500 pb-2 inline-block">
                Your Blogs
            </h1>

            {blogs.length === 0 ? (
                <p className="text-gray-400 text-center mt-10">You haven’t written any blogs yet.</p>// check again if blogs length is 0 
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
                    {blogs.map((e) => (
                        <BlogCard
                            key={e._id}
                            title={e.title}
                            image={e.imageUrl??"https://picsum.photos/400/300"}
                            content={e.content}
                            onClick={()=>navigate(`/blogs/${e.slug}`)}
                            blogs={e}
                        />
                    ))}
                </div>
            )}
            </section>
        </div>
    );

}

export default Blogs
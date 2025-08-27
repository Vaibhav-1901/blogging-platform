import React from "react";
import BlogCard from "../components/BlogCard";
import UseGetUserBlogs from "../hooks/UseGetUserBlogs";

// const { blogs, error } = UseGetUserBlogs();

const Home = () => {
    // if (error) {
    //     return (
    //         <div className="text-center mt-10 text-red-400">
    //             ⚠️ Error loading blogs: {error}
    //         </div>
    //     )
    // }
    return (
        <div className="min-h-screen bg-black text-white px-6 md:px-16">
            <section className="pt-16">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 border-b-2 border-purple-500 pb-2 inline-block">
                    Latest Blogs
                </h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <BlogCard/>
                    {/* {blogs.map((blog) => (
                        <BlogCard
                            key={blog.id}
                            title={blog.title}
                            image={blog.imageUrl}
                            content={blog.content}
                        />
                    ))} */}
                </div>
            </section>
        </div>
    );
};

export default Home;

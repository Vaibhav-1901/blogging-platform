import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { useState } from 'react';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const currentPage = location.pathname;
    return (
        <>
        <nav className="bg-[#0d0d0d] text-white shadow-md  flex justify-between items-center px-8 py-4 ">
            <div className="text-xl font-bold tracking-wide hover:text-purple-400 transition">
                <Link to="/">Vaibhav Blogs</Link>
            </div>

            <div className="space-x-6 hidden md:flex">
                <Link to="/" className="hover:text-purple-400 transition">Home</Link>
                <Link to="/blogs" className="hover:text-purple-400 transition " >Blogs</Link>
                <Link to="/about" className="hover:text-purple-400 transition">About</Link>
                <Link to="/contact" className="hover:text-purple-400 transition">Contact</Link>
            </div>
            <div className="flex space-x-3">
                {!isLoggedIn ? (
                    <>
                        <button><Link to="/signup" className="px-4 py-1 rounded-full border border-purple-500 text-purple-400 
              hover:text-white transition duration-300
               shadow-sm shadow-purple-500/50 hover:shadow-md hover:shadow-purple-500/70">SignUp</Link></button>
                        <button><Link to="/signin" className="px-4 py-1 rounded-full border border-purple-500 text-purple-400 
               hover:text-white transition duration-300
               shadow-sm shadow-purple-500/50 hover:shadow-md hover:shadow-purple-500/70">LogIn</Link></button>
                    </>
                ) :
                    (
                        <>
                            {currentPage === "/" && (
                                <button className="px-4 py-2 rounded-lg border border-purple-500 text-purple-400 hover:bg-purple-600/20">
                                    Welcome User
                                </button>
                            )}
                            {currentPage === "/blogs" && (
                                <button className="px-4 py-2 rounded-lg border border-purple-500 text-purple-400 hover:bg-purple-600/20">
                                    Create Blog
                                </button>
                            )}
                            {currentPage === "/about" && (
                                <button className="px-4 py-2 rounded-lg border border-green-500 text-green-400 hover:bg-green-600/20">
                                    About Action
                                </button>
                            )}

                            {currentPage === "/contact" && (
                                <button className="px-4 py-2 rounded-lg border border-blue-500 text-blue-400 hover:bg-blue-600/20">
                                    Contact Action
                                </button>
                            )}
                            <button
                                className="px-4 py-2 rounded-lg border border-red-500 text-red-400 hover:bg-red-600/20"
                                onClick={() => setIsLoggedIn(false)}
                            >
                                Logout
                            </button>

                        </>
                    )
                }


            </div>
        </nav>
        <hr className='text-gray-600 mt-1 '/>
        </>
       
    )
}

export default Navbar
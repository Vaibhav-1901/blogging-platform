import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useGetUser from "../hooks/UserGetUser";
import { BASE_URL } from "../constants";
import fetchWithRefresh from "../utilities/fetchWithRefresh";
import { toast } from "react-toastify";

const Navbar = () => {
    const { isLoggedIn, setIsLoggedIn, user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const currentPage = location.pathname;


    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const Logout = async function () {
        
        try {
            const res = await fetch(`${BASE_URL}/api/users/logout`, {
                method: "POST",
                credentials: "include",
            });
            if (res.ok) {
                toast.success("User logged out")
                setIsLoggedIn(false);
                navigate("/");
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <>
            <nav className="bg-[#0d0111] text-white  flex justify-between items-center px-6 py-3 border-blue-950  border-b-[1px] shadow-md  shadow-blue-950">
           
                <div className="text-lg md:text-xl font-bold tracking-wide hover:text-purple-400 transition">
                    <Link to="/">WordSphere</Link>
                </div>

                {/* Large */}
                <div className="space-x-6 hidden ml-14 md:flex">
                    <Link to="/" className="hover:text-purple-400 transition">
                        Home
                    </Link>
                    <Link to="/blogs" className="hover:text-purple-400 transition">
                        My Blogs
                    </Link>
                    <Link to="/about" className="hover:text-purple-400 transition">
                        About
                    </Link>
                    <Link to="/contact" className="hover:text-purple-400 transition">
                        Contact
                    </Link>
                </div>

            
                <div className="hidden md:flex space-x-3">
                    {!isLoggedIn ? (
                        <>
                            <Link
                                to="/signup"
                                className="px-4 py-1 rounded-full border border-purple-500 text-purple-400 
                  hover:text-white transition duration-300
                  shadow-sm shadow-purple-500/50 hover:shadow-md hover:shadow-purple-500/70"
                            >
                                SignUp
                            </Link>
                            <Link
                                to="/signin"
                                className="px-4 py-1 rounded-full border border-purple-500 text-purple-400 
                  hover:text-white transition duration-300
                  shadow-sm shadow-purple-500/50 hover:shadow-md hover:shadow-purple-500/70"
                            >
                                LogIn
                            </Link>
                        </>
                    ) : (
                        <>
                            {currentPage === "/" && (
                                <span className="px-5 py-2 rounded-3xl border border-purple-500 text-white shadow-sm shadow-purple-500/50 transition-all duration-300">
                                    Welcome {user?.username}
                                </span>
                            )}
                            {currentPage === "/blogs" && (
                                <button
                                    onClick={() => navigate("/create-blog")}
                                    className="px-5 cursor-pointer py-2 rounded-xl border border-green-500 text-green-400  
                    hover:text-green-200 shadow-sm shadow-green-500/50 hover:shadow-md hover:shadow-green-500/70 
                    transition-all duration-300"
                                >
                                    Create Blog
                                </button>
                            )}

                            <button
                                onClick={Logout}
                                className="px-4 py-2 rounded-xl border border-red-500 text-red-400 cursor-pointer 
                  hover:bg-red-600/20 hover:text-red-300 shadow-sm shadow-red-500/50 
                  hover:shadow-md hover:shadow-red-500/70 transition-all duration-300"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>

                {/*  Hamburger for mobile */}
                <button
                    className="md:hidden text-2xl focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    ☰
                </button>
               
            </nav>
           

            {/* Mobile*/}
            {isMenuOpen && (


                <div className="md:hidden bg-[#0d0d0d] text-white px-6 py-3 space-y-4 shadow-lg transition ">
                    <Link to="/" className="block hover:text-purple-400 transition" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/blogs" className="block hover:text-purple-400 transition" onClick={() => setIsMenuOpen(false)}>Blogs</Link>
                    <Link to="/about" className="block hover:text-purple-400 transition" onClick={() => setIsMenuOpen(false)}>About</Link>
                    <Link to="/contact" className="block hover:text-purple-400 transition" onClick={() => setIsMenuOpen(false)}>Contact</Link>

                    {!isLoggedIn ? (
                        <>
                            <Link
                                to="/signup"
                                className=" block px-4 text-center  py-2 rounded-full border border-purple-500 text-purple-400 hover:text-white transition"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                SignUp
                            </Link>
                            <Link
                                to="/signin"
                                className=" block text-center  px-4 py-2 rounded-full border border-purple-500 text-purple-400 hover:text-white transition"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                LogIn
                            </Link>
                        </>
                    ) : (
                        <>
                            {currentPage === "/" && (
                                <span className="block px-5 py-2 rounded-3xl border border-purple-500 text-white">
                                    Welcome {user?.username}
                                </span>
                            )}
                            {currentPage === "/blogs" && (
                                <button
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        navigate("/create-blog");
                                    }}
                                    className="block w-full px-5 py-2 rounded-xl border border-green-500 text-green-400 hover:text-green-200"
                                >
                                    Create Blog
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    Logout();
                                }}
                                className="block w-full px-4 py-2 rounded-xl border border-red-500 text-red-400 hover:bg-red-600/20 hover:text-red-300"
                            >
                                Logout
                            </button>
                        </>
                    )}
                    
                </div>
            )}
           
        </>
    );
};

export default Navbar;

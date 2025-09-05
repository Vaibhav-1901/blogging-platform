import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../components/InputField";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import fetchWithRefresh from "../utilities/fetchWithRefresh";
import { ToastContainer,toast } from "react-toastify";

const SignIn = () => {
    const [message, setMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            const res = await fetchWithRefresh(`${BASE_URL}/api/users/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(data)
            })
            const result = await res.json();
            if (res.ok) {
                setMessage(" Signed In  successfully!");
               toast.success(" Signed In  successfully!")
                setIsLoggedIn(true)
                navigate("/")
            }
            else {
                setMessage(`❌ ${result.message || "Sign in failed"}`)
            }
        }
        catch (error) {
            console.log("Sign in error:", error);
            setMessage("❌ Something went wrong. Please try again.");
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center text-white mb-6">
                    Sign In
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-80">
                    <InputField
                        label="Username"
                        name="username"
                        placeholder="Enter Username"
                        register={register}
                        rules={{ required: "Username is required" }}
                        errors={errors} />

                    <InputField
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        register={register}
                        rules={{
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be at least 6 characters" },
                        }}
                        errors={errors}
                    />
                     {message && (
                     <p className="text-red-500 text-sm mt-1 ">
                            {message}
                        </p>
                )}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                    >
                        {isSubmitting ? "Loading" : "Sign In"}
                    </button>


                </form>
               
                <p className="mt-4 text-sm text-gray-400 text-center">
                    <a href="/" className="text-purple-400 hover:underline">← Back to Home</a>
                </p>
            </div>
        </div>
    )
}
export default SignIn
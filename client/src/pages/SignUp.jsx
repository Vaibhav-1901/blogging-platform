import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../components/InputField";
import { BASE_URL } from "../../../server/constants";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";

const SignUp = () => {
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            const res = await fetch(`${BASE_URL}/api/users/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const result = await res.json();
            if (res.ok) {
                setMessage("✅ Registered successfully!");
                toast.success(" Registered successfully!")
                setIsSuccess(true);
                navigate("/signin")
            }
            else {
                setMessage(`${result.message || "Sign in failed"}`);
                setIsSuccess(false);
            }
        }
        catch (error) {
            console.error("Register error:", error);
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
                        label="Full Name"
                        name="fullname"
                        type="text"
                        placeholder="Enter Full Name"
                        register={register}
                        rules={{
                            required: "Full Name is required"
                        }}
                        errors={errors}
                    />

                    <InputField
                        label="Username"
                        name="username"
                        type="text"
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
                        {isSubmitting ? "Loading" : "Sign Up"}
                    </button>


                </form>
                <p className="mt-4 text-sm text-gray-400 text-center">
                    <a href="/" className="text-purple-400 hover:underline">← Back to Home</a>
                </p>
               
            </div>
        </div>
    )
}
export default SignUp
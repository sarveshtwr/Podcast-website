"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import useAppContext from "@/context/AppContext";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ArtistLogin = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const { setLoggedIn } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/artist/authenticate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (!response.ok) {
          throw new Error("Invalid email or password");
        }

        const data = await response.json();
        localStorage.setItem("artist", data.token);
        setLoggedIn(true);
        toast.success("Login successful!");
        router.push("/artist/add-podcast");
      } catch (error) {
        setErrorMessage(error.message);
        toast.error("Login failed. Please check your credentials.");
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Artist Login
        </h1>
        <p className="text-sm text-center text-gray-600 mb-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-black hover:underline">
            Register Here
          </a>
        </p>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 text-sm text-red-600 text-center">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={loginForm.handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              value={loginForm.values.email}
              className={`w-full mt-1 px-4 py-2 border ${
                loginForm.touched.email && loginForm.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter your email"
              required
            />
            {loginForm.touched.email && loginForm.errors.email && (
              <p className="text-xs text-red-600 mt-1">
                {loginForm.errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                value={loginForm.values.password}
                className={`w-full mt-1 px-4 py-2 border ${
                  loginForm.touched.password && loginForm.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-12`}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none p-1 rounded-full hover:bg-gray-100 transition-all duration-200"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FaEyeSlash className="w-5 h-5" />
                ) : (
                  <FaEye className="w-5 h-5" />
                )}
              </button>
            </div>
            {loginForm.touched.password && loginForm.errors.password && (
              <p className="text-xs text-red-600 mt-1">
                {loginForm.errors.password}
              </p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-white bg-black rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        {/* Forgot Password */}
        <p className="text-center text-sm text-gray-600 mt-4">
          <a href="/recover-password" className="text-black hover:underline">
            Forgot your password?
          </a>
        </p>
      </div>
    </div>
  );
};

export default ArtistLogin;

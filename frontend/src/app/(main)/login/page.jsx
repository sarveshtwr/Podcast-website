"use client";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
const ISSERVER = typeof window === "undefined";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const router = useRouter();

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/user/authenticate`, values)
        .then((result) => {
          !ISSERVER &&
            localStorage.setItem("user", JSON.stringify(result.data.token));
          toast.success("Login Successfull");
          router.push("/browse-podcast");
        })
        .catch((err) => {
          toast.error("Invalid Credentials");
          console.log(err);
        });
    },
    validationSchema: LoginSchema,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Welcome Back
        </h1>
        <p className="text-sm text-center text-gray-600 mb-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-black hover:underline">
            Register Here
          </a>
        </p>

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
              onChange={loginForm.handleChange}
              value={loginForm.values.email}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={loginForm.handleChange}
              value={loginForm.values.password}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
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

export default Login;

"use client";

import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Enter your name"),
  email: Yup.string().email("Invalid email").required("Enter your email"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Enter your password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
});

const Signup = () => {
  const router = useRouter();

  const signupForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, values)
        .then((result) => {
          toast.success("Signup Successful");
          router.push("/login");
        })
        .catch((err) => {
          toast.error("Signup Failed");
          console.log(err);
        });
    },
    validationSchema: SignupSchema,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Create Your Account
        </h1>
        <p className="text-sm text-center text-gray-600 mb-6">
          Already have an account?{" "}
          <a href="/login" className="text-black hover:underline">
            Login here
          </a>
        </p>

        {/* Form */}
        <form onSubmit={signupForm.handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              onChange={signupForm.handleChange}
              value={signupForm.values.name}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
              required
            />
            {signupForm.errors.name && signupForm.touched.name && (
              <p className="text-xs text-red-500 mt-1">
                {signupForm.errors.name}
              </p>
            )}
          </div>

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
              onChange={signupForm.handleChange}
              value={signupForm.values.email}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
            {signupForm.errors.email && signupForm.touched.email && (
              <p className="text-xs text-red-500 mt-1">
                {signupForm.errors.email}
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
            <input
              type="password"
              id="password"
              onChange={signupForm.handleChange}
              value={signupForm.values.password}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
            {signupForm.errors.password && signupForm.touched.password && (
              <p className="text-xs text-red-500 mt-1">
                {signupForm.errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              onChange={signupForm.handleChange}
              value={signupForm.values.confirmPassword}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm your password"
              required
            />
            {signupForm.errors.confirmPassword &&
              signupForm.touched.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {signupForm.errors.confirmPassword}
                </p>
              )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-white bg-black rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

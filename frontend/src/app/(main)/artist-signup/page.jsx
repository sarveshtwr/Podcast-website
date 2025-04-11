"use client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useState } from "react";

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
  const [errorMessage, setErrorMessage] = useState("");

  const signupForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        // Simulate API call
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artist/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to register. Please try again.");
        }

        const data = await response.json();
        console.log("Signup successful:", data);
        alert("User registered successfully!");
        router.push("/login");
      } catch (error) {
        setErrorMessage(error.message);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Artist Register
        </h1>
        <p className="text-sm text-center text-gray-600 mb-6">
          Already have an account?{" "}
          <a href="/login" className="text-black hover:underline">
            Login here
          </a>
        </p>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 text-sm text-red-600 text-center">
            {errorMessage}
          </div>
        )}

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
              name="name"
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              value={signupForm.values.name}
              className={`w-full mt-1 px-4 py-2 border ${
                signupForm.touched.name && signupForm.errors.name
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter your name"
            />
            {signupForm.touched.name && signupForm.errors.name && (
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
              name="email"
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              value={signupForm.values.email}
              className={`w-full mt-1 px-4 py-2 border ${
                signupForm.touched.email && signupForm.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter your email"
            />
            {signupForm.touched.email && signupForm.errors.email && (
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
              name="password"
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              value={signupForm.values.password}
              className={`w-full mt-1 px-4 py-2 border ${
                signupForm.touched.password && signupForm.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter your password"
            />
            {signupForm.touched.password && signupForm.errors.password && (
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
              name="confirmPassword"
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              value={signupForm.values.confirmPassword}
              className={`w-full mt-1 px-4 py-2 border ${
                signupForm.touched.confirmPassword &&
                signupForm.errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Confirm your password"
            />
            {signupForm.touched.confirmPassword &&
              signupForm.errors.confirmPassword && (
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

"use client";
import React from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import toast from "react-hot-toast";
import useAppContext from "@/context/AppContext";

const AdminLogin = () => {
  const router = useRouter();
  const { setLoggedIn } = useAppContext();

  const loginForm = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          "http://localhost:5000/admin/authenticate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("admin", data.token);
          setLoggedIn(true);
          toast.success("Admin login successful");
          router.push("/admin/dashboard");
        } else {
          toast.error(data.message || "Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Login failed");
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h1>

        <form onSubmit={loginForm.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              {...loginForm.getFieldProps("username")}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
            {loginForm.touched.username && loginForm.errors.username && (
              <div className="text-red-500 text-sm mt-1">
                {loginForm.errors.username}
              </div>
            )}
          </div>

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
              {...loginForm.getFieldProps("password")}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
            {loginForm.touched.password && loginForm.errors.password && (
              <div className="text-red-500 text-sm mt-1">
                {loginForm.errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white bg-black rounded-lg shadow-md hover:bg-gray-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

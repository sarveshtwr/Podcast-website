"use client";

import React from "react";
import { useRouter } from "next/navigation";

const BookmarkPage = () => {
  const router = useRouter();

  // List of all pages with their paths
  const pages = [
    { name: "Home", path: "/" },
    { name: "Browse Podcasts", path: "/browse-podcast" },
    { name: "Add Podcast", path: "/artist/add-podcast" },
    { name: "Admin Dashboard", path: "/admin/dashboard" },
    { name: "Manage Podcasts", path: "/admin/manage-podcast" }, // Manage Podcasts
    { name: "Manage Users", path: "/admin/manage-user" }, // Manage Users
    { name: "Artist Login", path: "/artist/login" }, // Artist Login
    { name: "Artist Signup", path: "/artist/signup" }, // Artist Signup
    { name: "About", path: "/about" }, // About Page
    { name: "Contact", path: "/contact" }, // Contact Page
    { name: "Login", path: "/auth/login" },
    { name: "Register", path: "/auth/register" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-neutral-900 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Bookmark Page
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {pages.map((page) => (
          <button
            key={page.path}
            onClick={() => window.open(page.path, "_blank")} // Opens in a new tab
            className="w-full py-3 px-4 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {page.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookmarkPage;

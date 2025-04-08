import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm dark:bg-neutral-800 dark:border-neutral-700">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            PodStream
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            | Admin Dashboard
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-6">
          <Link
            href="/admin/dashboard"
            className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/manage-users"
            className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition"
          >
            Manage Users
          </Link>
          <Link
            href="/admin/manage-podcasts"
            className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition"
          >
            Manage Podcasts
          </Link>
          <Link
            href="/admin/analytics"
            className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition"
          >
            Analytics
          </Link>
        </nav>

        {/* Profile/Logout */}
        <div className="flex items-center gap-4">
          <Link
            href="/admin/profile"
            className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition"
          >
            Profile
          </Link>
          <button
            className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
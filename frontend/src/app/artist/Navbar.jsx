"use client"; // Add this directive to make the component a Client Component

import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">PodStream</span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            | Artist Dashboard
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-6">
          <Link
            href="/artist/dashboard"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            href="/artist/podcasts"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            My Podcasts
          </Link>
          <Link
            href="/artist/add-podcast"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Add Podcast
          </Link>
          <Link
            href="/artist/analytics"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Analytics
          </Link>
        </nav>

        {/* Profile/Logout */}
        <div className="flex items-center gap-4">
          <Link
            href="/artist/profile"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Profile
          </Link>
          <button className="text-sm font-medium text-red-600 hover:text-red-700 transition">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

"use client";

import React from "react";
import Link from "next/link";
import useAppContext from "@/context/AppContext";
import { FaPodcast } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { logout } = useAppContext();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 pl-4">
          <FaPodcast className="h-6 w-6 text-primary" />
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">PodStream</span>
            <span className="text-sm font-medium text-gray-500">
              | Admin Dashboard
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/browse-podcast"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Browse
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Contact
          </Link>
          <Link
            href="/admin/dashboard"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/manage-user"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Manage Users
          </Link>
          <Link
            href="/admin/manage-podcast"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Manage Podcasts
          </Link>
        </nav>

        {/* Logout Button */}
        <div className="flex items-center gap-4">
          <Button
            size="sm"
            variant="outline"
            className="text-sm font-medium transition-colors hover:text-primary bg-red-600 text-white cursor-pointer w-32"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

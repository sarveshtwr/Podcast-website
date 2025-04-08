"use client"; // Add this directive to make the component a Client Component

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaPodcast } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3 pl-4 ">
          <FaPodcast className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">PodStream</span>
        </div>
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
        </nav>
        <div className="flex items-center gap-4">
          <Button
            size="sm"
            className="text-sm font-medium transition-colors hover:text-primary border-black border-1 cursor-pointer w-32"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-sm font-medium transition-colors hover:text-primary bg-black text-white cursor-pointer w-32"
            onClick={() => (window.location.href = "/signup")}
          >
            Register
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

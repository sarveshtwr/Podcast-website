import React from "react";
import { FaPodcast } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <FaPodcast className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-white">PodStream</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex gap-6">
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-center md:text-left">
            © {new Date().getFullYear()} PodStream. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

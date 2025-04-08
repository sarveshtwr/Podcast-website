import React from "react";
import { FaPodcast } from "react-icons/fa"; // Import the same icon used in Navbar

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-400 py-8">
      {" "}
      {/* Updated styles */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <FaPodcast className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-white">PodStream</span>
          </div>

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

"use client"; // Add this directive to make the component a Client Component

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaPodcast } from "react-icons/fa";
import useAppContext from "@/context/AppContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { loggedIn, logout } = useAppContext();
  const router = useRouter();
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showRegisterMenu, setShowRegisterMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
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
          {!loggedIn ? (
            <>
              <div className="relative z-20">
                <Button
                  size="sm"
                  className="text-sm font-medium transition-colors hover:text-primary border-black border-1 cursor-pointer w-32"
                  onClick={() => {
                    setShowLoginMenu(!showLoginMenu);
                    setShowRegisterMenu(false);
                  }}
                >
                  Login
                </Button>
                {showLoginMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl overflow-hidden bg-white shadow-lg border border-gray-200">
                    <div className="py-2">
                      <button
                        onClick={() => {
                          router.push("/login");
                          setShowLoginMenu(false);
                        }}
                        className="w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900 flex items-center transition-all duration-150 ease-in-out"
                      >
                        Login as User
                      </button>
                      <button
                        onClick={() => {
                          router.push("/artist-login");
                          setShowLoginMenu(false);
                        }}
                        className="w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900 flex items-center transition-all duration-150 ease-in-out"
                      >
                        Login as Artist
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative z-10">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-sm font-medium transition-colors hover:text-primary bg-black text-white cursor-pointer w-32"
                  onClick={() => {
                    setShowRegisterMenu(!showRegisterMenu);
                    setShowLoginMenu(false);
                  }}
                >
                  Register
                </Button>
                {showRegisterMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl overflow-hidden bg-white shadow-lg border border-gray-200">
                    <div className="py-2">
                      <button
                        onClick={() => {
                          router.push("/signup");
                          setShowRegisterMenu(false);
                        }}
                        className="w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900 flex items-center transition-all duration-150 ease-in-out"
                      >
                        Register as User
                      </button>
                      <button
                        onClick={() => {
                          router.push("/artist-signup");
                          setShowRegisterMenu(false);
                        }}
                        className="w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900 flex items-center transition-all duration-150 ease-in-out"
                      >
                        Register as Artist
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="text-sm font-medium transition-colors hover:text-primary bg-red-600 text-white cursor-pointer w-32"
              onClick={logout}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

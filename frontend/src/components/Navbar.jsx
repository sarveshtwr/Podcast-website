import React from "react";

const Navbar = () => {
  return (
    <>
      {/* ========== HEADER ========== */}
      <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full bg-white shadow-md dark:bg-neutral-900">
        <nav className="relative max-w-[85rem] w-full mx-auto md:flex md:items-center md:justify-between py-4 px-6 lg:px-8">
          {/* Logo Section */}
          <div className="flex justify-between items-center">
            <a
              className="text-2xl font-bold text-blue-600 dark:text-blue-400"
              href="/"
              aria-label="Brand"
            >
              PodStream
            </a>
            {/* Collapse Button */}
            <button
              type="button"
              className="md:hidden flex items-center justify-center text-gray-800 dark:text-white"
              id="navbar-collapse"
              aria-expanded="false"
              aria-controls="navbar-menu"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          {/* End Logo Section */}

          {/* Navbar Links */}
          <div
            id="navbar-menu"
            className="hidden md:flex flex-col md:flex-row md:items-center md:gap-6 mt-4 md:mt-0"
          >
            <a
              href="/"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition"
            >
              Home
            </a>
            <a
              href="/browse-podcast"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition"
            >
              Browse
            </a>
            <a
              href="/about"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition"
            >
              About
            </a>

            <a
              href="/contact"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition"
            >
              Contact
            </a>
          </div>
          {/* End Navbar Links */}

          {/* Button Group */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/login"
              className="py-2 px-4 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              Login
            </a>
            <a
              href="/signup"
              className="py-2 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Register
            </a>
          </div>
          {/* End Button Group */}
        </nav>
      </header>
      {/* ========== END HEADER ========== */}
    </>
  );
};

export default Navbar;

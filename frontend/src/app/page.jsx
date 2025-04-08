import { WavyBackground } from "@/components/ui/wavy-background";
import React from "react";

const Home = () => {
  return (
    <div>
      <WavyBackground className="max-w-4xl mx-auto pb-40">
        <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
          Transform Your Voice Into Impact
        </p>
        <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
          Create, Share, and Listen to Podcasts with AI-Powered Tools
        </p>
      </WavyBackground>
      <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <header className="mb-8 flex items-center justify-between py-4 md:mb-12 md:py-8 xl:mb-16">
            {/* logo - start */}
            <a
              href="/"
              className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
              aria-label="logo"
            >
              <svg
                width={95}
                height={94}
                viewBox="0 0 95 94"
                className="h-auto w-6 text-indigo-500"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M96 0V47L48 94H0V47L48 0H96Z" />
              </svg>
              PodStream
            </a>
            {/* logo - end */}
            {/* nav - start */}
            <nav className="hidden gap-12 lg:flex">
              <a href="#" className="text-lg font-semibold text-indigo-500">
                Home
              </a>
              <a
                href="/login"
                className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
              >
                Login
              </a>
              <a
                href="/signup"
                className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
              >
                Register
              </a>
              <a
                href="/about"
                className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
              >
                About
              </a>
            </nav>
            {/* nav - end */}
            {/* buttons - start */}
            <a
              href="/contact"
              className="hidden rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:inline-block"
            >
              Contact Us
            </a>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Menu
            </button>
            {/* buttons - end */}
          </header>
          <section className="flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row">
            {/* content - start */}
            <div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24">
              <p className="mb-4 font-semibold text-indigo-500 md:mb-6 md:text-lg xl:text-xl">
                Welcome to PodStream
              </p>
              <h1 className="mb-8 text-4xl font-bold text-black sm:text-5xl md:mb-12 md:text-6xl">
                Your Voice, Amplified
              </h1>
              <p className="mb-8 leading-relaxed text-gray-500 md:mb-12 lg:w-4/5 xl:text-lg">
                Join the next generation of podcasting. Create professional-quality podcasts, 
                engage with your audience, and grow your influence - all with AI-powered tools 
                and seamless publishing features.
              </p>
              <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
                <form className="flex w-full gap-2 md:max-w-md">
                  <input
                    placeholder="Enter your email to get started"
                    className="w-full flex-1 rounded border bg-gray-50 px-3 py-2 text-gray-800 placeholder-gray-500 outline-none ring-indigo-300 transition duration-100 focus:ring"
                  />
                  <button className="inline-block rounded bg-indigo-500 px-8 py-2 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
                    Start Free
                  </button>
                </form>
              </div>
            </div>
            {/* content - end */}
            {/* image - start */}
            <div className="h-48 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:h-auto xl:w-5/12">
              <img
                src="https://images.unsplash.com/photo-1618004912476-29818d81ae2e?auto=format&q=75&fit=crop&w=1000"
                loading="lazy"
                alt="Photo by Fakurian Design"
                className="h-full w-full object-cover object-center"
              />
            </div>
            {/* image - end */}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;

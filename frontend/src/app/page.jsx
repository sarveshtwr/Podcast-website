"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaPodcast } from "react-icons/fa"; // Import FaPodcast from react-icons
import {
  Play,
  Headphones,
  Search,
  Volume2,
  FastForward,
  Rewind,
  Info,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3 pl-4">
            {" "}
            {/* Adjusted gap and added padding-left */}
            <FaPodcast className="h-6 w-6 text-primary" />{" "}
            {/* Replace Mic with FaPodcast */}
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

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              {/* Text Content */}
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl">
                  Your Gateway to the World of Podcasts
                </h1>
                <p className="text-lg text-gray-600">
                  Explore, listen, and create podcasts effortlessly with
                  PodStream. Whether you're a creator or a listener, our
                  platform is designed to make podcasting simple and enjoyable.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/browse-podcast" passHref>
                    <Button
                      size="lg"
                      className="gap-2 cursor-pointer border border-black rounded-md w-48"
                    >
                      Start Listening <Play className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/about" passHref>
                    <Button
                      size="lg"
                      variant="outline"
                      className="gap-2 cursor-pointer border border-black rounded-md w-48"
                    >
                      Learn More <Info className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Headphones className="h-5 w-5" />
                    <span>10M+ podcasts available</span>
                  </div>
                  <div className="h-1 w-1 rounded-full bg-gray-400"></div>
                  <div className="flex items-center gap-2">
                    <FaPodcast className="h-5 w-5" />
                    <span>5M+ creators worldwide</span>
                  </div>
                </div>
              </div>

              {/* Visual Content */}
              <div className="relative h-[450px] w-full max-w-md mx-auto lg:max-w-none">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/10 rounded-xl shadow-lg p-6">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center">
                        <FaPodcast className="h-12 w-12 text-primary animate-pulse" />
                      </div>
                      <p className="mt-4 text-center text-sm text-gray-300">
                        Listening for command...
                      </p>
                      <p className="mt-2 text-center text-lg font-medium text-white">
                        "Play the latest episode of Tech Talk"
                      </p>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow-md">
                      <div className="flex items-center gap-3">
                        <Image
                          src="/thumbnail.webp"
                          width={60}
                          height={60}
                          alt="Podcast cover"
                          className="rounded-md"
                        />
                        <div>
                          <h3 className="font-medium text-gray-800">
                            Tech Talk
                          </h3>
                          <p className="text-xs text-gray-500">
                            The Future of AI
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="h-1 w-full rounded-full bg-gray-200">
                          <div className="h-1 w-1/3 rounded-full bg-primary"></div>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                          <span>12:34</span>
                          <span>36:45</span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <Rewind className="h-5 w-5 text-gray-600" />
                        <Play className="h-8 w-8 text-primary" />
                        <FastForward className="h-5 w-5 text-gray-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2">
              <FaPodcast className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-white">PodStream</span>
            </div>
            <p className="text-sm text-center md:text-left">
              © {new Date().getFullYear()} PodStream. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

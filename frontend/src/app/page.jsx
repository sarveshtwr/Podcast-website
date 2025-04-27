"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaPodcast } from "react-icons/fa";
import { Play, Headphones, Info, Mic, Users } from "lucide-react";
import useAppContext from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { usePlayer } from "@/context/PlayerContext";

const LandingPage = () => {
  const { loggedIn, logout } = useAppContext();
  const router = useRouter();
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showRegisterMenu, setShowRegisterMenu] = useState(false);
  const [latestPodcast, setLatestPodcast] = useState(null);
  const { playTrack, currentTrack, isPlaying, togglePlay } = usePlayer();

  useEffect(() => {
    const fetchLatestPodcast = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/podcast/getall`
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        if (data && data.length > 0) {
          // Sort podcasts by creation date in descending order (newest first)
          const sortedPodcasts = data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setLatestPodcast(sortedPodcasts[0]);
        }
      } catch (error) {
        console.error("Error fetching latest podcast:", error);
      }
    };

    fetchLatestPodcast();
  }, []);

  const handlePlayLatest = () => {
    if (latestPodcast) {
      if (currentTrack?._id === latestPodcast._id) {
        togglePlay();
      } else {
        playTrack({
          _id: latestPodcast._id,
          title: latestPodcast.title,
          fileUrl: latestPodcast.fileurl,
          thumbnail: latestPodcast.thumbnail,
          host: latestPodcast.artist?.name,
        });
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Original Navbar */}
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
                        <button
                          onClick={() => {
                            router.push("/admin-login");
                            setShowLoginMenu(false);
                          }}
                          className="w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900 flex items-center transition-all duration-150 ease-in-out"
                        >
                          Login as Admin
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

      {/* Main content sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Text Content */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">
                    Share Your Story Through Podcasting
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Create, share, and discover amazing podcasts. Join our
                    growing community of passionate creators and engaged
                    listeners.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link href="/browse-podcast" passHref>
                    <Button
                      size="lg"
                      className="bg-black hover:bg-gray-900 text-white px-8"
                    >
                      Start Listening <Play className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/about" passHref>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-black text-black hover:bg-black hover:text-white px-8"
                    >
                      Learn More <Info className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Latest Podcast Player */}
              <div className="relative w-3/4 mx-auto">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  {latestPodcast && (
                    <div className="space-y-4">
                      <div className="aspect-square relative rounded-xl overflow-hidden max-w-[250px] mx-auto">
                        <Image
                          src={latestPodcast.thumbnail || "/thumbnail.webp"}
                          alt="Latest podcast thumbnail"
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {latestPodcast.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {latestPodcast.artist?.name}
                        </p>
                      </div>
                      <button
                        onClick={handlePlayLatest}
                        className="w-full py-2 bg-black text-white rounded-xl font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 text-sm"
                      >
                        {currentTrack?._id === latestPodcast._id &&
                        isPlaying ? (
                          <>Pause</>
                        ) : (
                          <>
                            Play Latest Episode <Play className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-xl text-gray-600">
                Discover powerful features designed to help you create and share
                your podcasts.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-gray-50 p-8 rounded-2xl">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
                  <Mic className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Create with Ease
                </h3>
                <p className="text-gray-600">
                  Record, edit, and publish your podcasts with our intuitive
                  tools.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-2xl">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Engage & Grow
                </h3>
                <p className="text-gray-600">
                  Connect with your audience and grow your listener base
                  organically.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-2xl">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
                  <Headphones className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Reach Listeners
                </h3>
                <p className="text-gray-600">
                  Share your content globally and track your podcast's
                  performance.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Original Footer */}
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
    </div>
  );
};

export default LandingPage;

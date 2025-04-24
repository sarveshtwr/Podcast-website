"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaPodcast } from "react-icons/fa";
import { Play, Headphones, Search, Info } from "lucide-react";
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
        const data = await response.json();
        // Sort by creation date and get the latest
        const latest = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[0];
        setLatestPodcast(latest);
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
        playTrack(
          {
            _id: latestPodcast._id,
            title: latestPodcast.title,
            fileUrl: latestPodcast.fileurl,
            thumbnail: latestPodcast.thumbnail,
            host: latestPodcast.artist?.name,
          },
          []
        );
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3 pl-4">
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

      <main className="flex-1">
        <section className="w-full py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              {/* Text Content - keep existing */}
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

              {/* Latest Podcast Player */}
              <div className="relative h-[450px] w-full max-w-md mx-auto lg:max-w-none">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/10 rounded-xl shadow-lg p-6">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center">
                        <FaPodcast className="h-12 w-12 text-primary animate-pulse" />
                      </div>
                      <p className="mt-4 text-center text-sm text-gray-300">
                        Latest Episode
                      </p>
                      {latestPodcast && (
                        <p className="mt-2 text-center text-lg font-medium text-white">
                          {latestPodcast.title}
                        </p>
                      )}
                    </div>
                    {latestPodcast && (
                      <div className="rounded-lg bg-white p-4 shadow-md">
                        <div className="flex items-center gap-3">
                          <Image
                            src={latestPodcast.thumbnail || "/thumbnail.webp"}
                            width={60}
                            height={60}
                            alt="Podcast cover"
                            className="rounded-md"
                          />
                          <div>
                            <h3 className="font-medium text-gray-800">
                              {latestPodcast.title}
                            </h3>
                            <p className="text-xs text-gray-500">
                              By {latestPodcast.artist?.name}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={handlePlayLatest}
                          className="mt-4 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                        >
                          {currentTrack?._id === latestPodcast._id &&
                          isPlaying ? (
                            <>
                              Pause
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="w-5 h-5 fill-current"
                              >
                                <rect x="6" y="4" width="4" height="16" />
                                <rect x="14" y="4" width="4" height="16" />
                              </svg>
                            </>
                          ) : (
                            <>
                              Play Now
                              <Play className="h-5 w-5" />
                            </>
                          )}
                        </button>
                      </div>
                    )}
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

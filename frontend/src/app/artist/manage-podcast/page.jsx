"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManagePodcast = () => {
  const [podcastList, setPodcastList] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("artist") : null;

  // Fetch artist's podcasts
  const fetchPodcastData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/podcast/getall", {
        headers: {
          "x-auth-token": token,
        },
      });
      // Filter podcasts to only show the current artist's podcasts
      const artistId = JSON.parse(atob(token.split(".")[1]))._id;
      const artistPodcasts = res.data.filter(
        (podcast) => podcast.artist?._id === artistId
      );
      setPodcastList(artistPodcasts);
    } catch (error) {
      console.error("Error fetching podcasts:", error);
      toast.error("Failed to fetch podcasts");
    }
  };

  useEffect(() => {
    if (token) {
      fetchPodcastData();
    }
  }, [token]);

  // Play/Pause podcast
  const togglePlayPause = (podcast) => {
    if (currentAudio && currentAudio.src === podcast.fileurl) {
      if (isPlaying) {
        currentAudio.pause();
        setIsPlaying(false);
      } else {
        currentAudio.play();
        setIsPlaying(true);
      }
    } else {
      if (currentAudio) {
        currentAudio.pause();
      }
      const audio = new Audio(podcast.fileurl);
      audio.play();
      setCurrentAudio(audio);
      setIsPlaying(true);
    }
  };

  // Delete a podcast
  const deletePodcast = (id) => {
    if (window.confirm("Are you sure you want to delete this podcast?")) {
      axios
        .delete(`http://localhost:5000/podcast/delete/${id}`, {
          headers: {
            "x-auth-token": token,
          },
        })
        .then(() => {
          toast.success("Podcast Deleted Successfully");
          fetchPodcastData(); // Refresh the list after deletion
        })
        .catch((err) => {
          console.error("Error deleting podcast:", err);
          toast.error("Failed to delete podcast");
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-10">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
            My Podcasts
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and listen to your podcast collection
          </p>
        </div>

        <div className="flex justify-end mb-6">
          <Link
            href="/artist/add-podcast"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-purple-600 px-8 py-3 text-white transition hover:bg-purple-700"
          >
            <span className="font-semibold transition-transform group-hover:translate-x-1">
              Add New Podcast
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {podcastList.map((podcast) => (
            <div
              key={podcast._id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={podcast.thumbnail}
                  alt={podcast.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-1">
                  {podcast.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                  {podcast.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {podcast.genre?.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => togglePlayPause(podcast)}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                    >
                      {currentAudio &&
                      currentAudio.src === podcast.fileurl &&
                      isPlaying ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {new Date(podcast.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/artist/edit-podcast?id=${podcast._id}`}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path
                          fillRule="evenodd"
                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                    <button
                      onClick={() => deletePodcast(podcast._id)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {podcastList.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 dark:text-gray-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No Podcasts Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Start by adding your first podcast to your collection
            </p>
            <Link
              href="/artist/add-podcast"
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors"
            >
              <span>Add Your First Podcast</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePodcast;

"use client";
import React, { useState, useEffect } from "react";
import { usePlayer } from "@/context/PlayerContext";

const BrowsePodcast = () => {
  const [podcastList, setPodcastList] = useState([]);
  const { playTrack, currentTrack, isPlaying, togglePlay } = usePlayer();

  const fetchPodcast = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/podcast/getall`
      );
      const data = await response.json();
      setPodcastList(data);
    } catch (error) {
      console.error("Error fetching podcasts:", error);
    }
  };

  useEffect(() => {
    fetchPodcast();
  }, []);

  const handlePlayClick = (podcast) => {
    console.log(podcast);

    if (currentTrack?._id === podcast._id) {
      togglePlay();
    } else {
      playTrack({
        _id: podcast._id,
        title: podcast.title,
        fileUrl: podcast.fileurl,
        thumbnail: podcast.thumbnail,
        host: podcast.host,
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 min-h-screen py-12">
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Browse Podcasts
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {podcastList.map((podcast) => (
            <div
              key={podcast._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200"
            >
              <div className="relative">
                <img
                  src={podcast.thumbnail || "/default-podcast.png"}
                  alt={podcast.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-20" />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2 line-clamp-1 text-gray-800">
                  {podcast.title}
                </h2>
                <p className="text-sm text-gray-600 mb-3 flex items-center">
                  <span className="inline-block w-4 h-4 mr-2">🎙️</span>
                  {podcast.host}
                </p>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                  {podcast.description}
                </p>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    {podcast.episodes?.length || 0} Episodes
                  </span>
                  <button
                    onClick={() => handlePlayClick(podcast)}
                    className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200 flex items-center gap-2"
                  >
                    {currentTrack?._id === podcast._id && isPlaying ? (
                      <>
                        <span>Pause</span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white" // Set the pause icon color to white
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                          >
                            <rect
                              x="6"
                              y="4"
                              width="4"
                              height="16"
                              fill="white"
                            />
                            <rect
                              x="14"
                              y="4"
                              width="4"
                              height="16"
                              fill="white"
                            />
                          </svg>
                        </span>
                      </>
                    ) : (
                      <>
                        <span>Listen Now</span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white" // Set the play icon color to white
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                          >
                            <path d="M5 3v18l15-9L5 3z" fill="white" />
                          </svg>
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowsePodcast;

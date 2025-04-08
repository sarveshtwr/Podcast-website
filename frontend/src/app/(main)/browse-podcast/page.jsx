'use client';
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
        host: podcast.host
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Browse Podcasts</h1>
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
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-20"/>
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
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm transition-colors duration-200 flex items-center gap-2"
                >
                  {currentTrack?._id === podcast._id && isPlaying ? (
                    <>
                      <span>Pause</span>
                      <span>⏸️</span>
                    </>
                  ) : (
                    <>
                      <span>Listen Now</span>
                      <span>▶️</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowsePodcast;

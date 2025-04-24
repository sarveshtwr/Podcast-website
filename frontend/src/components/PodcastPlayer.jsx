"use client";
import React from "react";
import { usePlayer } from "@/context/PlayerContext";
import {
  IconPlayerPause,
  IconPlayerPlay,
  IconMicrophone,
  IconVolume,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
  IconRepeat,
  IconRepeatOnce,
} from "@tabler/icons-react";

const PodcastPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    duration,
    currentTime,
    togglePlay,

    seekTo,
    formatTime,
    volume,
    setVolume,
    playNextTrack,
    playPreviousTrack,
    hasNext,
    hasPrevious,
    loopMode,
    cycleLoopMode,
  } = usePlayer();

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    seekTo(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handleRewind = () => {
    if (currentTime >= 10) {
      seekTo(currentTime - 10);
    } else {
      seekTo(0);
    }
  };

  const handleForward = () => {
    if (currentTime + 10 <= duration) {
      seekTo(currentTime + 10);
    } else {
      seekTo(duration);
    }
  };

  const handleNextTrack = async () => {
    if (hasNext) {
      await playNextTrack();
    }
  };

  const handlePreviousTrack = async () => {
    if (hasPrevious) {
      await playPreviousTrack();
    }
  };

  const getLoopIcon = () => {
    switch (loopMode) {
      case "single":
        return <IconRepeatOnce size={20} />;
      case "all":
        return <IconRepeat size={20} />;
      default:
        return <IconRepeat size={20} className="opacity-50" />;
    }
  };

  const getLoopTitle = () => {
    switch (loopMode) {
      case "none":
        return "No repeat";
      case "single":
        return "Repeat one";
      case "all":
        return "Repeat all";
    }
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg backdrop-blur-md bg-opacity-95">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Thumbnail and Info */}
          <div className="flex items-center gap-4 flex-1">
            <div className="w-16 h-16 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <img
                src={currentTrack.thumbnail || "/default-podcast.png"}
                alt={currentTrack.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 line-clamp-1 text-lg">
                {currentTrack.title}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <IconMicrophone size={16} className="text-purple-500" />
                {currentTrack.host}
              </p>
            </div>
          </div>

          {/* Controls and Progress */}
          <div className="flex-1 flex flex-col justify-center gap-2">
            <div className="flex items-center justify-center gap-6">
              {/* Loop Button */}
              <button
                onClick={cycleLoopMode}
                className={`text-gray-600 hover:text-purple-600 transition-all duration-300 p-2.5 hover:bg-purple-100 rounded-full transform hover:scale-105 active:scale-95 ${
                  loopMode !== "none"
                    ? "text-purple-600 bg-purple-100 shadow-inner"
                    : ""
                }`}
                title={getLoopTitle()}
              >
                {getLoopIcon()}
              </button>

              {/* Previous Track Button */}
              <button
                onClick={handlePreviousTrack}
                disabled={!hasPrevious}
                className={`text-gray-600 hover:text-purple-600 transition-all duration-300 p-2.5 hover:bg-purple-100 rounded-full transform hover:scale-105 active:scale-95 ${
                  !hasPrevious ? "opacity-50 cursor-not-allowed" : ""
                }`}
                title="Previous track"
              >
                <IconPlayerTrackPrev size={24} />
              </button>

              {/* Rewind 10s Button */}
              <button
                onClick={handleRewind}
                className="text-gray-600 hover:text-purple-600 transition-all duration-300 p-2.5 hover:bg-purple-100 rounded-full transform hover:scale-105 active:scale-95"
                title="Rewind 10 seconds"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M12 5v-2l-4 4 4 4v-2c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
                  <text x="9" y="15" fontSize="8" fill="currentColor">
                    10
                  </text>
                </svg>
              </button>

              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg hover:shadow-purple-400/50"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <IconPlayerPause size={30} />
                ) : (
                  <IconPlayerPlay size={30} className="ml-1" />
                )}
              </button>

              {/* Forward 10s Button */}
              <button
                onClick={handleForward}
                className="text-gray-600 hover:text-purple-600 transition-all duration-300 p-2.5 hover:bg-purple-100 rounded-full transform hover:scale-105 active:scale-95"
                title="Forward 10 seconds"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M12 5v-2l4 4-4 4v-2c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z" />
                  <text x="9" y="15" fontSize="8" fill="currentColor">
                    10
                  </text>
                </svg>
              </button>

              {/* Next Track Button */}
              <button
                onClick={handleNextTrack}
                disabled={!hasNext}
                className={`text-gray-600 hover:text-purple-600 transition-all duration-300 p-2.5 hover:bg-purple-100 rounded-full transform hover:scale-105 active:scale-95 ${
                  !hasNext ? "opacity-50 cursor-not-allowed" : ""
                }`}
                title="Next track"
              >
                <IconPlayerTrackNext size={24} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-2 px-4">
              <span className="text-xs text-gray-500 min-w-[45px] font-medium">
                {formatTime(currentTime)}
              </span>
              <div className="flex-1 relative">
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600 hover:accent-purple-700"
                  style={{
                    background: `linear-gradient(to right, #9333ea ${
                      (currentTime / duration) * 100
                    }%, #e5e7eb ${(currentTime / duration) * 100}%)`,
                  }}
                />
              </div>
              <span className="text-xs text-gray-500 min-w-[45px] font-medium">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 md:w-48 px-4">
            <IconVolume size={20} className="text-gray-500" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolumeChange}
              className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600 hover:accent-purple-700"
              style={{
                background: `linear-gradient(to right, #9333ea ${
                  volume * 100
                }%, #e5e7eb ${volume * 100}%)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastPlayer;

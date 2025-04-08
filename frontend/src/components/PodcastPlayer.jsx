'use client';
import React from 'react';
import { usePlayer } from '@/context/PlayerContext';
import { 
  IconPlayerPause, 
  IconPlayerPlay, 
  IconMicrophone, 
  IconVolume,
  IconPlayerTrackNext,
  IconPlayerTrackPrev
} from '@tabler/icons-react';

const PodcastPlayer = () => {
  const { 
    currentTrack, 
    isPlaying, 
    duration, 
    currentTime, 
    togglePlay, 
    seekTo, 
    formatTime 
  } = usePlayer();

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    seekTo(newTime);
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Thumbnail */}
          <div className="w-12 h-12 rounded-lg overflow-hidden">
            <img 
              src={currentTrack.thumbnail || "/default-podcast.png"} 
              alt={currentTrack.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Track Info */}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 line-clamp-1">
              {currentTrack.title}
            </h3>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <IconMicrophone size={16} className="text-gray-400" />
              {currentTrack.host}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-purple-600 transition-colors">
              <IconPlayerTrackPrev size={24} />
            </button>
            
            <button
              onClick={togglePlay}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
            >
              {isPlaying ? (
                <IconPlayerPause size={24} />
              ) : (
                <IconPlayerPlay size={24} />
              )}
            </button>

            <button className="text-gray-400 hover:text-purple-600 transition-colors">
              <IconPlayerTrackNext size={24} />
            </button>

            <button className="text-gray-400 hover:text-purple-600 transition-colors">
              <IconVolume size={24} />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs text-gray-500 min-w-[40px]">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm"
          />
          <span className="text-xs text-gray-500 min-w-[40px]">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PodcastPlayer;
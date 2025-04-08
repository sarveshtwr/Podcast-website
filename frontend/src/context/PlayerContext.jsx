"use client";
import PodcastPlayer from "@/components/PodcastPlayer";
import React, { createContext, useContext, useState, useRef } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5); // Default volume to 50%
  const audioRef = useRef(null);

  // Play/Pause controls
  const togglePlay = () => {
    console.log(currentTrack);

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Load and play a new track
  const playTrack = async (track) => {
    try {
      if (!track.fileUrl) {
        throw new Error("No audio source provided");
      }

      setCurrentTrack(track);

      if (audioRef.current) {
        audioRef.current.src = track.fileUrl;

        // Wait for the audio to be loaded
        await audioRef.current.load();

        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error("Playback failed:", error);
              setIsPlaying(false);
              setCurrentTrack(null);
            });
        }
      }
    } catch (error) {
      console.error("Error playing track:", error);
      setIsPlaying(false);
      setCurrentTrack(null);
    }
  };

  // Seek to a specific time
  const seekTo = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Handle time updates
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  // Format time in minutes:seconds
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const adjustVolume = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume; // Update the audio element's volume
    }
  };

  const value = {
    currentTrack,
    isPlaying,
    duration,
    currentTime,
    audioRef,
    togglePlay,
    playTrack,
    seekTo,
    formatTime,
    volume,
    setVolume: adjustVolume,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onLoadedMetadata={handleTimeUpdate}
      />
      <PodcastPlayer />
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};

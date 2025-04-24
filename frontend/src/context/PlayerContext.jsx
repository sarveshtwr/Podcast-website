"use client";
import PodcastPlayer from "@/components/PodcastPlayer";
import React, { createContext, useContext, useState, useRef } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);
  const [loopMode, setLoopMode] = useState("none"); // 'none' | 'single' | 'all'
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const cycleLoopMode = () => {
    setLoopMode((current) => {
      const modes = ["none", "single", "all"];
      const currentIndex = modes.indexOf(current);
      const nextMode = modes[(currentIndex + 1) % modes.length];

      // Update audio element loop property
      if (audioRef.current) {
        audioRef.current.loop = nextMode === "single";
      }

      return nextMode;
    });
  };

  const playTrack = async (track, newPlaylist = null) => {
    try {
      if (!track.fileUrl) {
        throw new Error("No audio source provided");
      }

      if (newPlaylist) {
        setPlaylist(newPlaylist);
        const newIndex = newPlaylist.findIndex((t) => t._id === track._id);
        setCurrentTrackIndex(newIndex);
      } else if (playlist.length > 0) {
        const existingIndex = playlist.findIndex((t) => t._id === track._id);
        if (existingIndex !== -1) {
          setCurrentTrackIndex(existingIndex);
        }
      }

      setCurrentTrack(track);

      if (audioRef.current) {
        audioRef.current.src = track.fileUrl;
        audioRef.current.loop = loopMode === "single";
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

  const handleTrackEnd = () => {
    if (loopMode === "single") return; // Single track loop is handled by audio element

    if (loopMode === "all" && currentTrackIndex === playlist.length - 1) {
      // If loop all is enabled and we're at the end, go back to first track
      const firstTrack = playlist[0];
      setCurrentTrackIndex(0);
      playTrack(firstTrack);
    } else if (currentTrackIndex < playlist.length - 1) {
      // Otherwise play next track if available
      playNextTrack();
    } else {
      setIsPlaying(false);
    }
  };

  const playNextTrack = async () => {
    if (currentTrackIndex < playlist.length - 1) {
      const nextTrack = playlist[currentTrackIndex + 1];
      setCurrentTrackIndex(currentTrackIndex + 1);
      await playTrack(nextTrack);
    } else if (loopMode === "all") {
      // If we're at the end and loop all is enabled, go back to first track
      const firstTrack = playlist[0];
      setCurrentTrackIndex(0);
      await playTrack(firstTrack);
    }
  };

  const playPreviousTrack = async () => {
    if (currentTrackIndex > 0) {
      const previousTrack = playlist[currentTrackIndex - 1];
      setCurrentTrackIndex(currentTrackIndex - 1);
      await playTrack(previousTrack);
    } else if (loopMode === "all") {
      // If we're at the start and loop all is enabled, go to last track
      const lastTrack = playlist[playlist.length - 1];
      setCurrentTrackIndex(playlist.length - 1);
      await playTrack(lastTrack);
    }
  };

  const seekTo = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const adjustVolume = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
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
    playNextTrack,
    playPreviousTrack,
    hasNext: currentTrackIndex < playlist.length - 1 || loopMode === "all",
    hasPrevious: currentTrackIndex > 0 || loopMode === "all",
    playlist,
    currentTrackIndex,
    loopMode,
    cycleLoopMode,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
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

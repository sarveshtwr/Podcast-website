"use client";
import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import { usePlayer } from "@/context/PlayerContext";
import { useRouter } from "next/navigation";
import useAppContext from "@/context/AppContext";
import Link from "next/link";

const genreOptions = [
  { value: "Technology", label: "Technology", icon: "💻" },
  { value: "Education", label: "Education", icon: "📚" },
  { value: "Health", label: "Health", icon: "🏥" },
  { value: "Business", label: "Business", icon: "💼" },
  { value: "Entertainment", label: "Entertainment", icon: "🎭" },
  { value: "Sports", label: "Sports", icon: "⚽" },
  { value: "Music", label: "Music", icon: "🎵" },
  { value: "Lifestyle", label: "Lifestyle", icon: "🌟" },
  { value: "Science", label: "Science", icon: "🔬" },
  { value: "History", label: "History", icon: "📜" },
  { value: "Comedy", label: "Comedy", icon: "😄" },
  { value: "News", label: "News", icon: "📰" },
  { value: "Fiction", label: "Fiction", icon: "📖" },
  { value: "Other", label: "Other", icon: "✨" },
].sort((a, b) => a.label.localeCompare(b.label));

const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "42px",
    borderRadius: "0.5rem",
    borderColor: state.isFocused ? "#6366F1" : "#D1D5DB",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(99, 102, 241, 0.2)" : "none",
    "&:hover": {
      borderColor: "#6366F1",
    },
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#EEF2FF",
    borderRadius: "0.375rem",
    padding: "2px 2px",
    margin: "2px",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#4F46E5",
    fontSize: "0.875rem",
    padding: "2px 4px",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#4F46E5",
    borderRadius: "0.25rem",
    "&:hover": {
      backgroundColor: "#E0E7FF",
      color: "#4338CA",
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "0.5rem",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    zIndex: 50,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#4F46E5"
      : state.isFocused
      ? "#EEF2FF"
      : "white",
    color: state.isSelected ? "white" : "#374151",
    padding: "8px 12px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    "&:active": {
      backgroundColor: state.isSelected ? "#4F46E5" : "#E0E7FF",
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: "#9CA3AF",
    fontSize: "0.875rem",
  }),
  noOptionsMessage: (base) => ({
    ...base,
    color: "#6B7280",
    fontSize: "0.875rem",
    padding: "8px 12px",
  }),
};

const CustomOption = ({ children, ...props }) => {
  const { data } = props;
  return (
    <components.Option {...props}>
      <span>{data.icon}</span>
      {children}
    </components.Option>
  );
};

const BrowsePodcast = () => {
  const router = useRouter();
  const { loggedIn } = useAppContext();
  const [podcastList, setPodcastList] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [genreFilter, setGenreFilter] = useState([]);
  const [artistFilter, setArtistFilter] = useState([]); // Changed to array for multiple selection
  const [artistOptions, setArtistOptions] = useState([]);
  const { playTrack, currentTrack, isPlaying, togglePlay } = usePlayer();

  const fetchPodcast = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/podcast/getall`
      );
      const data = await response.json();
      console.log(data);

      setPodcastList(data);
      setFilteredPodcasts(data);

      // Extract unique artists from podcasts
      const uniqueArtists = [
        ...new Set(data.map((podcast) => podcast.artist?.name).filter(Boolean)),
      ];
      setArtistOptions(
        uniqueArtists.map((artist) => ({
          value: artist,
          label: artist,
        }))
      );
    } catch (error) {
      console.error("Error fetching podcasts:", error);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      fetchPodcast();
    }
  }, [loggedIn]);

  const handlePlayClick = (podcast) => {
    const currentPodcasts = filteredPodcasts;
    const podcastIndex = currentPodcasts.findIndex(
      (p) => p._id === podcast._id
    );

    if (currentTrack?._id === podcast._id) {
      togglePlay();
    } else {
      const playlistTracks = currentPodcasts.map((p) => ({
        _id: p._id,
        title: p.title,
        fileUrl: p.fileurl,
        thumbnail: p.thumbnail,
        host: p.host,
        index: currentPodcasts.findIndex((fp) => fp._id === p._id),
      }));

      playTrack(playlistTracks[podcastIndex], playlistTracks);
    }
  };

  const handleFilterChange = () => {
    let filtered = podcastList;

    // Filter by genre
    if (genreFilter.length > 0) {
      filtered = filtered.filter((podcast) =>
        genreFilter.some((genre) =>
          podcast.genre
            ?.map((g) => g.toLowerCase())
            .includes(genre.value.toLowerCase())
        )
      );
    }

    // Filter by artist - updated to handle multiple artists
    if (artistFilter.length > 0) {
      filtered = filtered.filter((podcast) =>
        artistFilter.some((artist) => podcast.artist?.name === artist.value)
      );
    }

    setFilteredPodcasts(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [genreFilter, artistFilter, podcastList]);

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">
            Login Required
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Please login to browse and listen to podcasts
          </p>
          <div className="space-y-4">
            <Link href="/login">
              <button className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                Login as User
              </button>
            </Link>
            <Link href="/artist-login">
              <button className="w-full mt-2 border border-black text-black py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                Login as Artist
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Discover Amazing Podcasts
          </h1>

          {/* Filter Section */}
          <div className="relative z-[100] mb-8 bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Filter Podcasts
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 relative z-30">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-purple-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Browse by Genre
                </label>
                <Select
                  isMulti
                  options={genreOptions}
                  value={genreFilter}
                  onChange={(selectedOptions) =>
                    setGenreFilter(selectedOptions || [])
                  }
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Select genres..."
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 8,
                    colors: {
                      ...theme.colors,
                      primary: "#8b5cf6",
                      primary25: "#f5f3ff",
                      neutral0: "white",
                      neutral20: "#e5e7eb",
                    },
                  })}
                  styles={customSelectStyles}
                  components={{ Option: CustomOption }}
                  menuPortalTarget={
                    typeof document !== "undefined" ? document.body : null
                  }
                />
              </div>
              <div className="space-y-2 relative z-30">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-purple-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  Browse by Artist
                </label>
                <Select
                  isMulti
                  options={artistOptions}
                  value={artistFilter}
                  onChange={(selectedOptions) =>
                    setArtistFilter(selectedOptions || [])
                  }
                  className="basic-single-select"
                  classNamePrefix="select"
                  placeholder="Select artists..."
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 8,
                    colors: {
                      ...theme.colors,
                      primary: "#8b5cf6",
                      primary25: "#f5f3ff",
                      neutral0: "white",
                      neutral20: "#e5e7eb",
                    },
                  })}
                  styles={customSelectStyles}
                  menuPortalTarget={
                    typeof document !== "undefined" ? document.body : null
                  }
                />
              </div>
            </div>
          </div>

          {/* Podcast Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPodcasts.map((podcast) => (
              <div
                key={podcast._id}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl border border-gray-100"
              >
                <div className="relative aspect-[4/3]">
                  <img
                    src={podcast.thumbnail || "/default-podcast.png"}
                    alt={podcast.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6 space-y-3">
                  <h2 className="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-purple-600 transition-colors">
                    {podcast.title}
                  </h2>

                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="inline-block w-5 h-5">🎙️</span>
                    <span className="text-sm font-medium">
                      {podcast.artist?.name}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2 min-h-[2.5rem]">
                    {podcast.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="px-2 py-1 bg-gray-100 rounded-full">
                      {podcast.genre?.join(", ")}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {new Date(podcast.createdAt).toLocaleDateString()}
                    </span>

                    <button
                      onClick={() => handlePlayClick(podcast)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        currentTrack?._id === podcast._id && isPlaying
                          ? "bg-purple-600 text-white hover:bg-purple-700"
                          : "bg-black text-white hover:bg-gray-800"
                      }`}
                    >
                      {currentTrack?._id === podcast._id && isPlaying ? (
                        <>
                          <span>Pause</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-4 h-4 fill-current"
                          >
                            <rect x="6" y="4" width="4" height="16" />
                            <rect x="14" y="4" width="4" height="16" />
                          </svg>
                        </>
                      ) : (
                        <>
                          <span>Play Now</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-4 h-4 fill-current"
                          >
                            <path d="M5 3v18l15-9L5 3z" />
                          </svg>
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
    </div>
  );
};

export default BrowsePodcast;

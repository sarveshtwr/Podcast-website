"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Select, { components } from "react-select";

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

const ManagePodcast = () => {
  const [podcastList, setPodcastList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [artists, setArtists] = useState([]);
  const token = localStorage.getItem("admin");

  const fetchPodcastData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/podcast/getall");
      console.log(response.data);
      setPodcastList(response.data);
    } catch (error) {
      console.error("Error fetching podcasts:", error);
      toast.error("Failed to fetch podcasts");
    }
  };

  const fetchArtists = async () => {
    try {
      const response = await axios.get("http://localhost:5000/artist/getall");
      setArtists(response.data);
    } catch (error) {
      console.error("Error fetching artists:", error);
      toast.error("Failed to fetch artists");
    }
  };

  useEffect(() => {
    fetchPodcastData();
    fetchArtists();
  }, []);

  const startEditing = (podcast) => {
    setEditingId(podcast._id);
    setEditedData({
      ...podcast,
      artist: podcast.artist?._id,
    });
  };

  const handleInputChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedData({});
  };

  const saveChanges = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/podcast/update/${id}`,
        editedData,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      toast.success("Podcast updated successfully");
      fetchPodcastData();
      setEditingId(null);
      setEditedData({});
    } catch (error) {
      console.error("Error updating podcast:", error);
      toast.error("Failed to update podcast");
    }
  };

  const deletePodcast = async (id) => {
    if (window.confirm("Are you sure you want to delete this podcast?")) {
      try {
        await axios.delete(`http://localhost:5000/podcast/delete/${id}`, {
          headers: {
            "x-auth-token": token,
          },
        });
        toast.success("Podcast deleted successfully");
        fetchPodcastData();
      } catch (error) {
        console.error("Error deleting podcast:", error);
        toast.error("Failed to delete podcast");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="animate-fade-in">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
              Manage Podcasts
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage and update your podcast collection
            </p>
          </div>
          <button
            onClick={fetchPodcastData}
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-full shadow-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 animate-spin-slow"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh List
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-indigo-600 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-indigo-600 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-indigo-600 uppercase tracking-wider"
                  >
                    Genre
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-indigo-600 uppercase tracking-wider"
                  >
                    Artist
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-indigo-600 uppercase tracking-wider"
                  >
                    Thumbnail
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-indigo-600 uppercase tracking-wider"
                  >
                    Created At
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-indigo-600 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {podcastList.map((podcast) => (
                  <tr
                    key={podcast._id}
                    className="transition-colors duration-200 hover:bg-gradient-to-r hover:from-indigo-50/30 hover:to-purple-50/30"
                  >
                    <td className="px-6 py-5">
                      {editingId === podcast._id ? (
                        <input
                          type="text"
                          value={editedData.title || ""}
                          onChange={(e) =>
                            handleInputChange("title", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                          placeholder="Enter title"
                        />
                      ) : (
                        <div className="text-sm font-semibold text-gray-900">
                          {podcast.title}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === podcast._id ? (
                        <textarea
                          value={editedData.description || ""}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                          rows="3"
                          placeholder="Enter description"
                        />
                      ) : (
                        <div className="text-sm text-gray-500 max-w-xs">
                          {podcast.description.length > 100
                            ? `${podcast.description.substring(0, 100)}...`
                            : podcast.description}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === podcast._id ? (
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Genre
                          </label>
                          <Select
                            value={genreOptions.filter((option) =>
                              editedData.genre?.includes(option.value)
                            )}
                            onChange={(selectedOptions) =>
                              handleInputChange(
                                "genre",
                                selectedOptions.map((option) => option.value)
                              )
                            }
                            options={genreOptions}
                            isMulti
                            className="text-sm"
                            classNamePrefix="select"
                            styles={customSelectStyles}
                            components={{ Option: CustomOption }}
                            placeholder="Select genres..."
                            noOptionsMessage={() => "No genres found"}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                          />
                          {editedData.genre?.length === 0 && (
                            <p className="mt-1 text-xs text-rose-500">
                              Please select at least one genre
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">
                          {podcast.genre?.map((g, i) => (
                            <span
                              key={g}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mr-1 mb-1"
                            >
                              {g}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === podcast._id ? (
                        <select
                          value={editedData.artist || ""}
                          onChange={(e) =>
                            handleInputChange("artist", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                        >
                          <option value="">Select Artist</option>
                          {artists.map((artist) => (
                            <option key={artist._id} value={artist._id}>
                              {artist.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="text-sm text-gray-500">
                          {podcast.artist?.name}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === podcast._id ? (
                        <input
                          type="text"
                          value={editedData.thumbnail || ""}
                          onChange={(e) =>
                            handleInputChange("thumbnail", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                          placeholder="Enter thumbnail URL"
                        />
                      ) : (
                        <div className="relative group">
                          <img
                            src={podcast.thumbnail}
                            alt="Thumbnail"
                            className="w-16 h-16 object-cover rounded-lg shadow-sm group-hover:ring-2 group-hover:ring-indigo-500 transition-all duration-200"
                          />
                          <div className="invisible group-hover:visible absolute -top-2 -right-2 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center cursor-pointer">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {new Date(podcast.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex gap-2">
                        {editingId === podcast._id ? (
                          <>
                            <button
                              onClick={() => saveChanges(podcast._id)}
                              className="inline-flex items-center px-4 py-2 border border-transparent rounded-full text-xs font-medium text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105"
                            >
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              Save
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-full text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 transform hover:scale-105"
                            >
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEditing(podcast)}
                              className="inline-flex items-center px-4 py-2 border border-transparent rounded-full text-xs font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
                            >
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              Edit
                            </button>
                            <button
                              onClick={() => deletePodcast(podcast._id)}
                              className="inline-flex items-center px-4 py-2 border border-transparent rounded-full text-xs font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 transform hover:scale-105"
                            >
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePodcast;

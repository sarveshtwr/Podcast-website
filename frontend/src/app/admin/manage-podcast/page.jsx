"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import Select from "react-select";

const genreOptions = [
  { value: "Technology", label: "Technology" },
  { value: "Education", label: "Education" },
  { value: "Health", label: "Health" },
  { value: "Business", label: "Business" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Sports", label: "Sports" },
  { value: "Music", label: "Music" },
  { value: "Lifestyle", label: "Lifestyle" },
  { value: "Science", label: "Science" },
  { value: "History", label: "History" },
  { value: "Comedy", label: "Comedy" },
  { value: "News", label: "News" },
  { value: "Fiction", label: "Fiction" },
  { value: "Other", label: "Other" },
];

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Podcasts</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Title
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Description
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Genre
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Artist
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Thumbnail
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Created At
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {podcastList.map((podcast) => (
              <tr key={podcast._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {editingId === podcast._id ? (
                    <input
                      type="text"
                      value={editedData.title || ""}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    podcast.title
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingId === podcast._id ? (
                    <textarea
                      value={editedData.description || ""}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      className="w-full p-1 border rounded"
                      rows="3"
                    />
                  ) : (
                    <div className="max-w-xs overflow-hidden text-ellipsis">
                      {podcast.description}
                    </div>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingId === podcast._id ? (
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
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    podcast.genre?.join(", ")
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingId === podcast._id ? (
                    <select
                      value={editedData.artist || ""}
                      onChange={(e) =>
                        handleInputChange("artist", e.target.value)
                      }
                      className="w-full p-1 border rounded"
                    >
                      <option value="">Select Artist</option>
                      {artists.map((artist) => (
                        <option key={artist._id} value={artist._id}>
                          {artist.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    podcast.artist?.name
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingId === podcast._id ? (
                    <input
                      type="text"
                      value={editedData.thumbnail || ""}
                      onChange={(e) =>
                        handleInputChange("thumbnail", e.target.value)
                      }
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    <img
                      src={podcast.thumbnail}
                      alt="Thumbnail"
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(podcast.createdAt).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex gap-2">
                    {editingId === podcast._id ? (
                      <>
                        <button
                          onClick={() => saveChanges(podcast._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(podcast)}
                          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deletePodcast(podcast._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                        >
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
  );
};

export default ManagePodcast;

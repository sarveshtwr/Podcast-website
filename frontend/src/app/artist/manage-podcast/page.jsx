"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManagePodcast = () => {
  const [podcastList, setPodcastList] = useState([]);
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          My Podcasts
        </h2>
        <Link
          href="/artist/add-podcast"
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Add New Podcast
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Title
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Description
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Genre
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Thumbnail
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Created At
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {podcastList.map((podcast) => (
              <tr
                key={podcast._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  {podcast.title}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  {podcast.description}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  {podcast.genre?.join(", ")}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={podcast.thumbnail}
                    alt="Thumbnail"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  {new Date(podcast.createdAt).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex gap-2">
                  <Link
                    href={`/artist/edit-podcast?id=${podcast._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deletePodcast(podcast._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
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

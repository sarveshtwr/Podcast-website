"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManagePodcast = () => {
  const [podcastList, setPodcastList] = useState([]);

  // Fetch all podcasts
  const fetchPodcastData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/podcast/getall");
      console.table(res.data);
      setPodcastList(res.data);
    } catch (error) {
      console.error("Error fetching podcasts:", error);
      toast.error("Failed to fetch podcasts");
    }
  };

  useEffect(() => {
    fetchPodcastData();
  }, []);

  // Delete a podcast
  const deletePodcast = (id) => {
    axios
      .delete(`http://localhost:5000/podcast/delete/${id}`)
      .then(() => {
        toast.success("Podcast Deleted Successfully");
        fetchPodcastData(); // Refresh the list after deletion
      })
      .catch((err) => {
        console.error("Error deleting podcast:", err);
        toast.error("Failed to delete podcast");
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-center font-bold text-3xl text-gray-800 dark:text-white mb-6">
        Manage Podcasts
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Title
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Description
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Artist
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Genre
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Thumbnail
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                File URL
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
                  {podcast._id}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  {podcast.title}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  {podcast.description}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  {podcast.artist}
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
                <td className="border border-gray-300 px-4 py-2 text-sm">
                  <a
                    href={podcast.fileurl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    File Link
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  {new Date(podcast.createdAt).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex gap-2">
                  <button
                    onClick={() => deletePodcast(podcast._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <Link
                    href={`/update-podcast/${podcast._id}`}
                    className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600"
                  >
                    Update
                  </Link>
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

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

const ManagePodcast = () => {
  const [podcastList, setPodcastList] = useState([]);
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

  useEffect(() => {
    fetchPodcastData();
  }, []);

  const deletePodcast = async (id) => {
    if (window.confirm("Are you sure you want to delete this podcast?")) {
      try {
        await axios.delete(`http://localhost:5000/podcast/delete/${id}`, {
          headers: {
            "x-auth-token": token,
          },
        });
        toast.success("Podcast deleted successfully");
        fetchPodcastData(); // Refresh the list
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
                  {podcast.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="max-w-xs overflow-hidden text-ellipsis">
                    {podcast.description}
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {podcast.genre?.join(", ")}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {podcast.artist?.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={podcast.thumbnail}
                    alt="Thumbnail"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(podcast.createdAt).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex gap-2">
                    <Link
                      href={`/update-podcast/${podcast._id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => deletePodcast(podcast._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
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

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
    <div className="container mx-auto">
      <h2 className="text-center font-bold text-3xl my-6">Manage Podcasts</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="border-y-2 bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Host</th>
            <th className="border border-gray-300 px-4 py-2">Genre</th>
            <th className="border border-gray-300 px-4 py-2">Created At</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {podcastList.map((podcast) => (
            <tr key={podcast._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                {podcast._id}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {podcast.title}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {podcast.host}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {podcast.genre?.join(", ")}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(podcast.createdAt).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2 flex gap-2">
                <button
                  onClick={() => deletePodcast(podcast._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
                <Link
                  href={`/update-podcast/${podcast._id}`}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePodcast;

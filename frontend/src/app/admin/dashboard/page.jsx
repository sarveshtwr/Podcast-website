"use client";

import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [artistCount, setArtistCount] = useState(0);
  const [podcastCount, setPodcastCount] = useState(0);
  const [userGrowthData, setUserGrowthData] = useState([]);
  const [podcastCategoryData, setPodcastCategoryData] = useState([]);

  // Fetch data from APIs
  const fetchAnalyticsData = async () => {
    try {
      // Fetch total users
      const userRes = await axios.get("http://localhost:5000/user/getall");
      setUserCount(userRes.data.length);

      // Fetch total artists
      const artistRes = await axios.get("http://localhost:5000/artist/getall");
      setArtistCount(artistRes.data.length);

      // Fetch total podcasts and categories
      const podcastRes = await axios.get(
        "http://localhost:5000/podcast/getall"
      );
      setPodcastCount(podcastRes.data.length);

      // Generate mock user growth data (replace with real API if available)
      setUserGrowthData([
        { month: "Jan", count: 10 },
        { month: "Feb", count: 20 },
        { month: "Mar", count: 30 },
        { month: "Apr", count: 40 },
        { month: "May", count: 50 },
      ]);

      // Generate podcast category data dynamically
      const categories = {};
      podcastRes.data.forEach((podcast) => {
        const category = podcast.genre || "Other";
        categories[category] = (categories[category] || 0) + 1;
      });
      setPodcastCategoryData(
        Object.entries(categories).map(([category, count]) => ({
          category,
          count,
        }))
      );
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  // Bar chart data for user growth
  const userGrowthChartData = {
    labels: userGrowthData.map((data) => data.month),
    datasets: [
      {
        label: "User Growth",
        data: userGrowthData.map((data) => data.count),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Pie chart data for podcast categories
  const podcastCategoryChartData = {
    labels: podcastCategoryData.map((data) => data.category),
    datasets: [
      {
        label: "Podcast Categories",
        data: podcastCategoryData.map((data) => data.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Analytics
      </h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-neutral-800 dark:border-neutral-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Total Users
          </h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">
            {userCount}
          </p>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-neutral-800 dark:border-neutral-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Total Artists
          </h3>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-2">
            {artistCount}
          </p>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-neutral-800 dark:border-neutral-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Total Podcasts
          </h3>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">
            {podcastCount}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-neutral-800 dark:border-neutral-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            User Growth
          </h3>
          <Bar data={userGrowthChartData} />
        </div>

        {/* Podcast Categories Chart */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-neutral-800 dark:border-neutral-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Podcast Categories
          </h3>
          <Pie data={podcastCategoryChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

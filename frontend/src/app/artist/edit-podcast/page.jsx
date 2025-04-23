"use client";

import axios from "axios";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import toast from "react-hot-toast";
import * as Yup from "yup";

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

const EditPodcast = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [loading, setLoading] = useState(true);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("artist") : null;

  // Validation schema using Yup
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    genre: Yup.array().min(1, "At least one genre is required"),
    thumbnail: Yup.string().required("Thumbnail is required"),
    fileurl: Yup.string().required("Podcast file is required"),
  });

  const podcastForm = useFormik({
    initialValues: {
      title: "",
      description: "",
      genre: [],
      thumbnail: "",
      fileurl: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.put(`http://localhost:5000/podcast/update/${id}`, values, {
          headers: {
            "x-auth-token": token,
          },
        });
        toast.success("Podcast updated successfully!");
        router.push("/artist/manage-podcast");
      } catch (error) {
        console.error("Error updating podcast:", error);
        toast.error("Failed to update podcast");
      }
    },
  });

  // Fetch podcast data by ID
  const fetchPodcastData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/podcast/getbyid/${id}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      const data = response.data;

      // Verify that the podcast belongs to the current artist
      const artistId = JSON.parse(atob(token.split(".")[1]))._id;
      if (data.artist !== artistId) {
        toast.error("You are not authorized to edit this podcast");
        router.push("/artist/manage-podcast");
        return;
      }

      podcastForm.setValues({
        title: data.title,
        description: data.description,
        genre: data.genre,
        thumbnail: data.thumbnail,
        fileurl: data.fileurl,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching podcast data:", error);
      toast.error("Failed to fetch podcast data");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id && token) {
      fetchPodcastData();
    }
  }, [id, token]);

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mypreset");
    formData.append("cloud_name", "ddsnnqpbv");

    axios
      .post(`https://api.cloudinary.com/v1_1/ddsnnqpbv/image/upload`, formData)
      .then((result) => {
        toast.success("Thumbnail uploaded successfully");
        podcastForm.setFieldValue("thumbnail", result.data.url);
      })
      .catch((err) => {
        toast.error("Thumbnail upload failed");
      });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mypreset");
    formData.append("cloud_name", "ddsnnqpbv");

    axios
      .post(`https://api.cloudinary.com/v1_1/ddsnnqpbv/auto/upload`, formData)
      .then((result) => {
        toast.success("File uploaded successfully");
        podcastForm.setFieldValue("fileurl", result.data.url);
      })
      .catch((err) => {
        toast.error("File upload failed");
      });
  };

  if (loading) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-neutral-900">
      <div className="max-w-lg w-full bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-800 dark:border-neutral-700">
        <div className="text-center mt-5">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Edit Podcast
          </h1>
        </div>
        <div className="p-6">
          <form onSubmit={podcastForm.handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                onChange={podcastForm.handleChange}
                onBlur={podcastForm.handleBlur}
                value={podcastForm.values.title}
                className={`mt-1 block w-full px-4 py-2 border ${
                  podcastForm.touched.title && podcastForm.errors.title
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-300`}
                required
              />
              {podcastForm.touched.title && podcastForm.errors.title && (
                <p className="mt-2 text-sm text-red-600">
                  {podcastForm.errors.title}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Description
              </label>
              <textarea
                id="description"
                onChange={podcastForm.handleChange}
                onBlur={podcastForm.handleBlur}
                value={podcastForm.values.description}
                className={`mt-1 block w-full px-4 py-2 border ${
                  podcastForm.touched.description &&
                  podcastForm.errors.description
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-300`}
                rows="3"
                required
              ></textarea>
              {podcastForm.touched.description &&
                podcastForm.errors.description && (
                  <p className="mt-2 text-sm text-red-600">
                    {podcastForm.errors.description}
                  </p>
                )}
            </div>

            {/* Genre */}
            <div>
              <label
                htmlFor="genre"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Genre
              </label>
              <Select
                isMulti
                options={genreOptions}
                value={genreOptions.filter((option) =>
                  podcastForm.values.genre.includes(option.value)
                )}
                onChange={(selectedOptions) => {
                  const selectedValues = selectedOptions.map(
                    (option) => option.value
                  );
                  podcastForm.setFieldValue("genre", selectedValues);
                }}
                className="mt-1"
                classNamePrefix="react-select"
              />
              {podcastForm.touched.genre && podcastForm.errors.genre && (
                <p className="mt-2 text-sm text-red-600">
                  {podcastForm.errors.genre}
                </p>
              )}
            </div>

            {/* Thumbnail */}
            <div>
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Thumbnail
              </label>
              <input
                type="file"
                id="thumbnail"
                onChange={handleThumbnailUpload}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              />
              {podcastForm.values.thumbnail && (
                <img
                  src={podcastForm.values.thumbnail}
                  alt="Current thumbnail"
                  className="mt-2 w-32 h-32 object-cover rounded"
                />
              )}
              {podcastForm.touched.thumbnail &&
                podcastForm.errors.thumbnail && (
                  <p className="mt-2 text-sm text-red-600">
                    {podcastForm.errors.thumbnail}
                  </p>
                )}
            </div>

            {/* File */}
            <div>
              <label
                htmlFor="file"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                File
              </label>
              <input
                type="file"
                id="file"
                onChange={handleFileUpload}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              />
              {podcastForm.values.fileurl && (
                <audio controls className="mt-2 w-full">
                  <source src={podcastForm.values.fileurl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
              {podcastForm.touched.fileurl && podcastForm.errors.fileurl && (
                <p className="mt-2 text-sm text-red-600">
                  {podcastForm.errors.fileurl}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
            >
              Update Podcast
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPodcast;

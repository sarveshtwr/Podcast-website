"use client";

import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const AddPodcast = () => {
  const router = useRouter();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    genre: Yup.string().required("Genre is required"),
    artist: Yup.string().required("Artist name is required"),
    thumbnail: Yup.string().required("Thumbnail is required"),
    fileurl: Yup.string().required("Podcast file is required"),
  });

  const podcastForm = useFormik({
    initialValues: {
      title: "",
      description: "",
      genre: "",
      artist: "",
      thumbnail: "",
      fileurl: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Send values to backend
      axios
        .post("http://localhost:5000/podcast/add", values)
        .then((result) => {
          toast.success("Podcast added successfully.");
          router.push("/artist/podcasts");
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    },
  });

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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-neutral-900">
      <div className="max-w-lg w-full bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-800 dark:border-neutral-700">
        <div className="text-center mt-5">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Add Podcast
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
              <input
                type="text"
                id="genre"
                onChange={podcastForm.handleChange}
                onBlur={podcastForm.handleBlur}
                value={podcastForm.values.genre}
                className={`mt-1 block w-full px-4 py-2 border ${
                  podcastForm.touched.genre && podcastForm.errors.genre
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-300`}
                required
              />
              {podcastForm.touched.genre && podcastForm.errors.genre && (
                <p className="mt-2 text-sm text-red-600">
                  {podcastForm.errors.genre}
                </p>
              )}
            </div>

            {/* Artist */}
            <div>
              <label
                htmlFor="artist"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Artist
              </label>
              <input
                type="text"
                id="artist"
                onChange={podcastForm.handleChange}
                onBlur={podcastForm.handleBlur}
                value={podcastForm.values.artist}
                className={`mt-1 block w-full px-4 py-2 border ${
                  podcastForm.touched.artist && podcastForm.errors.artist
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-300`}
                required
              />
              {podcastForm.touched.artist && podcastForm.errors.artist && (
                <p className="mt-2 text-sm text-red-600">
                  {podcastForm.errors.artist}
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
              Add Podcast
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPodcast;

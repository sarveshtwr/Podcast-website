"use client";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const AddPodcast = () => {
  const router = useRouter();

  const podcastForm = useFormik({
    initialValues: {
      title: "",
      description: "",
      genre: "",
      artist: "",
      thumbnail: "",
      fileurl: "",
    },
    onSubmit: (values) => {
      console.log(values);
      //send values to backend
      axios
        .post("http://localhost:5000/podcast/add", values)
        .then((result) => {
          toast.success("User registered successfully.");
          // router.push("/add-podcast");
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    },
  });

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (!file) toast.error("No file selected");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mypreset");
    formData.append("cloud_name", "ddsnnqpbv");

    axios
      .post(`https://api.cloudinary.com/v1_1/ddsnnqpbv/${field === 'thumbnail' ? 'image' : 'auto'}/upload`, formData)
      .then((result) => {
        console.log(result.data);
        toast.success("File uploaded successfully");
        podcastForm.setFieldValue(field, result.data.url);
        // podcastForm.setFieldValue("fileurl", result.data.url);
      })
      .catch((err) => {
        toast.error("File upload failed");
      });
  };

  return (
    <div>
      <div className="max-w-md mx-auto my-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
        <div className="text-center mt-5">
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
            Add Podcast
          </h1>
        </div>
        <div className="p-4 sm:p-7">
          <div className="">
            {/* Form */}
            <form onSubmit={podcastForm.handleSubmit}>
              <div className="grid gap-y-4">
                {/* Form Group */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    Title
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="title"
                      onChange={podcastForm.handleChange}
                      value={podcastForm.values.title}
                      className="py-3 px-4 border w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      required=""
                    />
                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-red-500"
                        width={16}
                        height={16}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                  {podcastForm.errors.title && podcastForm.touched.title && (
                    <p className="text-xs text-red-600 mt-2" id="title-error">
                      {podcastForm.errors.title}
                    </p>
                  )}
                </div>
                {/* End Form Group */}
                {/* Form Group */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    Description
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="description"
                      onChange={podcastForm.handleChange}
                      value={podcastForm.values.description}
                      className="py-3 px-4 block border w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      required=""
                    />
                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-red-500"
                        width={16}
                        height={16}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                  {podcastForm.errors.description &&
                    podcastForm.touched.description && (
                      <p className="text-xs text-red-600 mt-2" id="title-error">
                        {podcastForm.errors.description}
                      </p>
                    )}
                </div>
                {/* End Form Group */}
                {/* Form Group */}
                <div>
                  <label
                    htmlFor="artist"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    Artist
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="artist"
                      onChange={podcastForm.handleChange}
                      value={podcastForm.values.artist}
                      className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      required=""
                    />
                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-red-500"
                        width={16}
                        height={16}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                  {podcastForm.errors.artist && podcastForm.touched.artist && (
                    <p className="text-xs text-red-600 mt-2" id="title-error">
                      {podcastForm.errors.artist}
                    </p>
                  )}
                </div>
                {/* End Form Group */}
                {/* Form Group */}
                <div>
                  <label
                    htmlFor="handleFileUpload"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    <input
                      type="file"
                      id="handleFileUpload"
                      onChange={e => handleFileUpload(e, 'thumbnail')}
                      
                    />
                    Thumbnail
                  </label>
                  {/* <div className="relative">
                    <input
                      type="text"
                      id="artist"
                      onChange={podcastForm.handleChange}
                      value={podcastForm.values.thumbnail}
                      className="py-3 px-4 block border w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      required=""
                    />

                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-red-500"
                        width={16}
                        height={16}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                  {podcastForm.errors.thumbnail &&
                    podcastForm.touched.thumbnail && (
                      <p className="text-xs text-red-600 mt-2" id="title-error">
                        {podcastForm.errors.thumbnail}
                      </p>
                    )} */}
                </div>
                {/* End Form Group */}
                {/* Form Group */}
                <div>
                  <label
                    htmlFor="handleFileUpload"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    <input
                      type="file"
                      id="handleFileUpload"
                      onChange={e => handleFileUpload(e, 'fileurl')}
                      // hidden
                    />
                    File
                  </label>
                  {/* <div className="relative">
                    <input
                      type="text"
                      id="fileurl"
                      onChange={podcastForm.handleChange}
                      value={podcastForm.values.fileurl}
                      className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      required=""
                    />
                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-red-500"
                        width={16}
                        height={16}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                  {podcastForm.errors.fileurl &&
                    podcastForm.touched.fileurl && (
                      <p className="text-xs text-red-600 mt-2" id="title-error">
                        {podcastForm.errors.fileurl}
                      </p>
                    )} */}
                </div>
                {/* End Form Group */}
                {/* Checkbox */}
                {/* <div className="flex items-center">
                  <div className="flex">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ms-3">
                    <label
                      htmlFor="remember-me"
                      className="text-sm dark:text-white"
                    >
                      I accept the{" "}
                      <a
                        className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div> */}
                {/* End Checkbox */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Add Podcast
                </button>
              </div>
            </form>
            {/* End Form */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPodcast;

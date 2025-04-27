"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast.error("Error sending message. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
          <p className="text-gray-600 mt-2">
            We'd love to hear from you! Fill out the form below to get in touch.
          </p>
        </div>

        {/* Form and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {/* Address Card */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                <HiOutlineLocationMarker className="w-6 h-6 text-gray-700" />
                <h4 className="text-lg font-semibold text-gray-800">
                  Our Address
                </h4>
              </div>
              <p className="text-gray-600 mt-2 ml-9">
                Barhaj CBSE Classes, <br />
                3/4, Patel Nagar, Near Durga Mandir, <br />
                Deoria District, Barhaj, Uttar Pradesh - 274601
              </p>
            </div>

            {/* Email Card */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                <HiOutlineMail className="w-6 h-6 text-gray-700" />
                <h4 className="text-lg font-semibold text-gray-800">
                  Email Us
                </h4>
              </div>
              <a
                href="mailto:mr.sarveshtiwari@gmail.com"
                className="text-black mt-2 block hover:underline ml-9"
              >
                mr.sarveshtiwari@gmail.com
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                <HiOutlinePhone className="w-6 h-6 text-gray-700" />
                <h4 className="text-lg font-semibold text-gray-800">Call Us</h4>
              </div>
              <p className="text-gray-600 mt-2 ml-9">+91 8922006441</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Message Input */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Your Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Write your message here"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

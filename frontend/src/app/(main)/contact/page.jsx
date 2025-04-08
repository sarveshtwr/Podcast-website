import React from "react";

const Contact = () => {
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
        {/* End Title */}

        {/* Form and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {/* Address Card */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-800">
                Our Address
              </h4>
              <p className="text-gray-600 mt-2">
                Barhaj CBSE Classes, <br />
                3/4, Patel Nagar, Near Durga Mandir, <br />
                Deoria District, Barhaj, Uttar Pradesh - 274601
              </p>
            </div>

            {/* Email Card */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-800">Email Us</h4>
              <a
                href="mailto:mr.sarveshtiwari@gmail.com"
                className="text-black mt-2 block hover:underline"
              >
                mr.sarveshtiwari@gmail.com
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-800">Call Us</h4>
              <p className="text-gray-600 mt-2">+91 8922006441</p>
            </div>
          </div>
          {/* End Contact Info */}

          {/* Contact Form */}
          <form className="space-y-6">
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
                className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your name"
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
                className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your email"
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
                rows="5"
                className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Write your message here"
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
          {/* End Contact Form */}
        </div>
        {/* End Form and Info */}
      </div>
    </div>
  );
};

export default Contact;

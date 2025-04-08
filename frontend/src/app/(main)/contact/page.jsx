import React from "react";

const Contact = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-5xl w-full bg-gray-800 rounded-lg shadow-lg p-10">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-white">Get in Touch</h2>
          <p className="text-gray-400 mt-3">
            Have questions or feedback? We'd love to hear from you!
          </p>
        </div>
        {/* End Title */}

        {/* Form and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            {/* Address Card */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-white">Our Address</h4>
              <p className="text-gray-400 mt-3">
                Barhaj CBSE Classes, <br />
                3/4, Patel Nagar, Near Durga Mandir, <br />
                Deoria District, Barhaj, Uttar Pradesh - 274601
              </p>
            </div>

            {/* Email Card */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-white">Email Us</h4>
              <a
                href="mailto:mr.sarveshtiwari@gmail.com"
                className="text-blue-400 mt-3 block hover:underline"
              >
                mr.sarveshtiwari@gmail.com
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-white">Call Us</h4>
              <p className="text-gray-400 mt-3">+91 8922006441</p>
            </div>
          </div>
          {/* End Contact Info */}

          {/* Contact Form */}
          <form className="space-y-8">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-400"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full mt-2 p-4 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your name"
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full mt-2 p-4 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            {/* Message Input */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-400"
              >
                Your Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full mt-2 p-4 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Write your message here"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
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

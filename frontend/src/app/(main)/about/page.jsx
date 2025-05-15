import React from "react";

const About = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 min-h-screen py-12">
      <div className="mx-auto max-w-5xl px-6 lg:px-8 bg-white rounded-lg shadow-lg p-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 sm:text-5xl">
            About PodStream
          </h1>
          <p className="mt-4 text-gray-600 sm:text-lg">
            Welcome to PodStream, the future of podcasting powered by voice!
            Whether you're a creator or a listener, PodStream offers a seamless,
            hands-free experience to record, share, and discover amazing
            podcasts.
          </p>
        </div>

        {/* Features Section */}
        <div className="space-y-12">
          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold text-gray-800">
                For Creators
              </h2>
              <p className="mt-3 text-gray-600">
                PodStream empowers creators with a simple, voice-driven
                workflow. Record, edit, and publish your episodes effortlessly.
                No technical skills required—just your voice and your story.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="/about2.jpg"
                alt="Podcast Creators"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Quote Section */}
          <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600">
            “PodStream is revolutionizing podcasting with voice automation. Join
            us and be part of the future!”
          </blockquote>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold text-gray-800">
                For Listeners
              </h2>
              <p className="mt-3 text-gray-600">
                Discover a world of captivating podcasts with just your voice.
                Explore genres, follow creators, and enjoy hands-free streaming
                anytime, anywhere. PodStream makes listening effortless and
                enjoyable.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="/about3.jpg"
                alt="Podcast Listeners"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

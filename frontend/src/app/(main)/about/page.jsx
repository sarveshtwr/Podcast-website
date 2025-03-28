import React from "react";

const About = () => {
  return (
    <div>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-md px-4 md:px-8">
          <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6">
            About PodStream
          </h1>
          <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">
            Welcome to PodStream, the ultimate destination for podcast creators
            and listeners! Whether you want to record, share, or discover
            amazing podcasts, PodStream has got you covered.
          </p>
          <h2 className="mb-2 text-xl font-semibold text-gray-800 sm:text-2xl md:mb-4">
            Fully Voice-Automated Experience
          </h2>
          <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">
            PodStream takes convenience to the next level with full voice
            automation! Navigate, record, and listen to your favorite podcasts
            hands-free using just your voice. Say commands, and let PodStream do
            the rest—seamless, smart, and effortless.
          </p>
          <h2 className="mb-2 text-xl font-semibold text-gray-800 sm:text-2xl md:mb-4">
            For Creators
          </h2>
          <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">
            PodStream makes podcasting effortless! Simply register, record, and
            publish your episodes—all from one platform. No complex setups, no
            hassle—just your voice and your story.
          </p>
          <blockquote className="mb-6 border-l-4 pl-4 italic text-gray-500 sm:text-lg md:mb-8 md:pl-6">
            “Join PodStream today and be part of the podcast revolution!.”
          </blockquote>
          <div className="relative mb-6 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:mb-8">
            <img
              src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&q=75&fit=crop&w=600&h=350"
              loading="lazy"
              alt="Photo by Minh Pham"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-gray-800 sm:text-2xl md:mb-4">
            For Listeners
          </h2>
          <p className="text-gray-500 sm:text-lg">
            Dive into a world of captivating conversations! By registering on
            PodStream, you can explore a vast collection of podcasts across
            various genres, follow your favorite creators, and enjoy seamless
            streaming anytime, anywhere.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

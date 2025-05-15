"use client";
import React from "react";

const AboutProject = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight mb-8">
            About PodStream Project
          </h1>

          {/* Project Overview */}
          <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Project Overview
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              PodStream is a comprehensive podcast platform that enables content
              creators and listeners to engage with audio content in a modern,
              accessible way. The platform supports voice commands, offers
              multiple user roles, and provides a seamless podcast management
              system.
            </p>
          </section>

          {/* Key Features */}
          <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Key Features
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-600">
                  User Management
                </h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Multi-role authentication (Admin, Artist, User)</li>
                  <li>Secure JWT-based authentication</li>
                  <li>User profile management</li>
                  <li>Role-specific dashboards</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-600">
                  Podcast Management
                </h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Upload and manage podcast episodes</li>
                  <li>Category-based organization</li>
                  <li>Advanced search and filtering</li>
                  <li>Podcast analytics and tracking</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Technical Stack */}
          <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Technical Stack
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-indigo-600 mb-4">
                  Frontend
                </h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Next.js 13+ with App Router</li>
                  <li>Tailwind CSS for styling</li>
                  <li>Context API for state management</li>
                  <li>React Hot Toast for notifications</li>
                  <li>Voice command integration</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-indigo-600 mb-4">
                  Backend
                </h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Express.js server</li>
                  <li>MongoDB database</li>
                  <li>JWT authentication</li>
                  <li>Multer for file uploads</li>
                  <li>RESTful API architecture</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Admin Features */}
          <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Admin Features
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-600">
                  Dashboard
                </h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>User statistics and growth tracking</li>
                  <li>Podcast category distribution</li>
                  <li>Artist management</li>
                  <li>Real-time analytics</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-600">
                  Content Management
                </h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Podcast moderation tools</li>
                  <li>User account management</li>
                  <li>Contact message handling</li>
                  <li>System-wide content control</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutProject;

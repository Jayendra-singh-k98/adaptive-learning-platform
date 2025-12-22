"use client";

import React from "react";
import Link from "next/link";


const Features = () => {

  return (
    <section className="w-full py-13 bg-linear-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-2">

        {/* Header */}
        <header className="text-center mb-14">
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full mb-4">
            ⚡ Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Powerful Features
          </h2>
          <p className="mt-3 text-gray-600 max-w-lg mx-auto">
            Everything you need to supercharge your learning journey.
          </p>
        </header>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* AI Recommendation */}
          <Link
            href={`/profile/student/select-course?next=ai-recommendation`}
            className="group relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-blue-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-purple-500 text-white text-2xl mb-5 shadow-lg">
              ✨
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              AI Recommendation
            </h3>

            <p className="text-gray-500 leading-relaxed">
              Your learning adjusts automatically based on your performance.
            </p>
          </Link>

          {/* Track Progress */}
          <Link
            href={`/profile/student/select-course?next=track-progress`}
            className="group relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-blue-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-500 text-white text-2xl mb-5 shadow-lg">
              📊
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              Track Progress
            </h3>

            <p className="text-gray-500 leading-relaxed">
              See your learning stats & analytics in real-time.
            </p>
          </Link>

          {/* Instant Doubt Solver */}
          <Link
            href="/profile/student/doubt-solver"
            className="group relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-blue-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-green-500 text-white text-2xl mb-5 shadow-lg">
              💬
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              Instant Doubt Solver
            </h3>

            <p className="text-gray-500 leading-relaxed">
              Get instant answers using our built-in AI chatbot.
            </p>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default Features;

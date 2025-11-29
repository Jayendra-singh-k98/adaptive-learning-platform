"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Hero = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  return (
    <section className="w-full min-h-screen bg-linear-to-b from-white via-blue-50/30 to-white pt-28 pb-5 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT TEXT */}
        <div className="order-2 md:order-1">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-full mb-6 border border-blue-100">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            AI-Powered Learning
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
            Learn Smarter with
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600"> AI-Powered </span>
            Education
          </h1>

          <p className="text-lg text-gray-600 mt-6 leading-relaxed max-w-lg">
            Personalized learning paths that adapt to your pace. Master new skills with intelligent recommendations and real-time progress tracking.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <Link 
              href={user ? "/profile" : "/signup"}
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all"
            >
              Get Started Free
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

          </div>
        </div>

        {/* RIGHT ILLUSTRATION */}
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative">
            {/* Decorative rings */}
            <div className="absolute inset-0 -m-8">
              <div className="absolute inset-0 border-2 border-dashed border-blue-200 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
            </div>
            <div className="absolute inset-0 -m-16">
              <div className="absolute inset-0 border border-blue-100 rounded-full" />
            </div>
            
            {/* Image container */}
            <div className="relative w-72 md:w-96 h-72 md:h-96 rounded-3xl bg-linear-to-br from-blue-100 to-purple-100 p-2 shadow-2xl shadow-blue-500/10">
              <img 
                src="./Ai-learning.jpg" 
                alt="AI Learning Illustration" 
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            {/* Floating cards */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">✓</div>
              <span className="text-sm font-medium text-gray-700 pr-2">Progress Saved</span>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">🎯</div>
              <span className="text-sm font-medium text-gray-700 pr-2">AI Recommended</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
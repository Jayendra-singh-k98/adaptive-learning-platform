"use client";

import React from "react";

const features = [
  {
    title: "AI Recommendation",
    desc: "Your learning adjusts automatically based on your performance.",
    icon: "✨",
    color: "bg-purple-500",
  },
  {
    title: "Track Progress",
    desc: "See your learning stats & analytics in real-time.",
    icon: "📊",
    color: "bg-blue-500",
  },
  {
    title: "Instant Doubt Solver",
    desc: "Get instant answers using our built-in AI chatbot.",
    icon: "💬",
    color: "bg-green-500",
  },
];

const Features = () => {
  return (
    <section className="w-full py-10 bg-linear-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-2">
        
        {/* Header */}
        <header className="text-center mb-14">
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full mb-4">
            ⚡ Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Powerful Features</h2>
          <p className="mt-3 text-gray-600 max-w-lg mx-auto">
            Everything you need to supercharge your learning journey.
          </p>
        </header>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-blue-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${feat.color} text-white text-2xl mb-5 shadow-lg`}>
                {feat.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {feat.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {feat.desc}
              </p>

              {/* Learn more link */}
              <div className="mt-6 flex items-center text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
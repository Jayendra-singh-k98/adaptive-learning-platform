"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Hero = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <>
      {/* ─── HERO SECTION ─── */}
      <section className="w-full pb-10 bg-linear-to-b from-white via-blue-50/30 to-white pt-28 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-40" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT TEXT */}
          <div className="order-2 md:order-1">
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
              <div className="absolute inset-0 -m-8">
                <div className="absolute inset-0 border-2 border-dashed border-blue-200 rounded-full animate-spin" style={{ animationDuration: "20s" }} />
              </div>
              <div className="absolute inset-0 -m-16">
                <div className="absolute inset-0 border border-blue-100 rounded-full" />
              </div>

              <div className="relative w-72 md:w-96 h-72 md:h-96 rounded-3xl bg-linear-to-br from-blue-100 to-purple-100 p-2 shadow-2xl shadow-blue-500/10">
                <img
                  src="./Ai-learning.jpg"
                  alt="AI Learning Illustration"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2 animate-bounce" style={{ animationDuration: "3s" }}>
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

      {/* ─── WHAT WE OFFER ─── */}
      <section className="w-full bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-linear-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              ✨ What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for Students & Teachers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A role-based platform designed to make every side of the classroom smarter.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Students */}
            <div className="group relative overflow-hidden rounded-2xl border-2 border-blue-100 bg-linear-to-br from-blue-50 to-blue-100/50 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-2xl mb-5 shadow-lg">
                  🎓
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">For Students</h3>
                <ul className="space-y-3 text-gray-700">
                  {[
                    "Access to structured courses, topics, and quizzes",
                    "Performance-based learning recommendations",
                    "AI-assisted doubt solving for academic support",
                    "Progress-oriented learning experience",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Teachers */}
            <div className="group relative overflow-hidden rounded-2xl border-2 border-green-100 bg-linear-to-br from-green-50 to-green-100/50 p-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center text-2xl mb-5 shadow-lg">
                  👨‍🏫
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">For Teachers</h3>
                <ul className="space-y-3 text-gray-700">
                  {[
                    "Create and manage courses, topics, and quizzes",
                    "Monitor student engagement and learning flow",
                    "Role-restricted teacher dashboard for content management",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── AI FEATURES ─── */}
      <section className="w-full bg-linear-to-b from-white to-blue-50/40 py-5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
              🤖 Intelligent Learning
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              AI That Works For You
            </h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Our AI is built to assist — not replace — human teaching. It keeps learners on track every step of the way.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "💬",
                color: "purple",
                title: "Doubt Solving",
                desc: "Ask questions anytime and get AI-powered academic support instantly.",
              },
              {
                icon: "📊",
                color: "blue",
                title: "Adaptive Learning",
                desc: "Quiz performance shapes your personal learning path automatically.",
              },
              {
                icon: "🔁",
                color: "pink",
                title: "Guided Feedback",
                desc: "Continuous engagement improvements through intelligent, real-time feedback.",
              },
            ].map(({ icon, color, title, desc }) => (
              <div
                key={title}
                className={`rounded-2xl border border-${color}-100 bg-${color}-50 p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
              >
                <div className={`w-12 h-12 rounded-xl bg-${color}-100 flex items-center justify-center text-2xl mb-4`}>
                  {icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-white/70 border border-purple-200 rounded-xl text-center text-sm text-gray-500">
            ℹ️ AI functionality is designed to assist learning, not replace human teaching.
          </div>
        </div>
      </section>

      {/* ─── SECURITY HIGHLIGHTS ─── */}
      <section className="w-full bg-white py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold mb-4">
              🔒 Secure & Trusted
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Data, Fully Protected
            </h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Industry-standard security practices with role-based access control at every level.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "📧", label: "Email & password signup with an assigned role" },
              { icon: "🔑", label: "Google Sign-In supported for login only" },
              { icon: "🛡️", label: "Authentication follows industry-standard practices" },
              { icon: "🚪", label: "Dashboard access is strictly role-based" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex flex-col items-start gap-3 p-6 rounded-2xl border border-gray-200 bg-gray-50 hover:shadow-md transition-all">
                <span className="text-2xl">{icon}</span>
                <p className="text-gray-700 text-sm leading-relaxed">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MISSION CTA ─── */}
      <section className="w-full pb-34 bg-linear-to-b from-white to-blue-50/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 to-purple-600 p-12 text-white shadow-2xl text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative">
              <span className="text-3xl mb-4 block">🎯</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
              <p className="text-blue-100 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                To make learning more accessible, adaptive, and engaging by combining structured educational content with intelligent assistance — while maintaining data security and user privacy.
              </p>
              <Link
                href={user ? "/profile" : "/signup"}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Join the Platform
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
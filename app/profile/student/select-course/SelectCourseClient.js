"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function SelectCoursePage() {
  const [courses, setCourses] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  const { data: session } = useSession();

  useEffect(() => {
    const loadCourses = async () => {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCourses(data.courses);
    };

    loadCourses();
  }, []);

  const handleSelect = (courseId) => {
    if (next === "ai-recommendation") {
      router.push(`/profile/student/ai-recommendation/${courseId}`);
    }
    else if (next === "track-progress") {
      router.push(`/profile/student/track-progress/${courseId}`);
    }
    else if (next === "doubt-solver") {
      // fallback (safe default)
      router.push(`/profile/student/doubt-solver/${courseId}`);
    }
  };


  
  
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🔒</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600">Please login to view your progress</p>
        </div>
      </div>
    );
  }
  
  const PAGE_CONFIG = {
    "ai-recommendation": {
      title: "Select Your Course",
      description:
        "Choose a course to receive personalized AI-powered learning recommendations",
      badge: "🤖 AI Recommendation",
    },
    "track-progress": {
      title: "Select Course to Track Progress",
      description:
        "Choose a course to view your learning progress and analytics",
      badge: "📊 Track Progress",
    },
    "doubt-solver": {
      title: "Select Course for Doubt Solver",
      description:
        "Choose a course to ask doubts and get instant AI assistance",
      badge: "💬 Doubt Solver",
    },
  };
  const config = PAGE_CONFIG[next] || PAGE_CONFIG["ai-recommendation"];
  return (
    <div className="min-h-screen bg-linaer-to-b from-gray-50 to-white pt-5">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-linear-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            {config.badge}
          </span>

          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {config.title}
          </h1>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {config.description}
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div
              key={course._id}
              onClick={() => handleSelect(course._id)}
              className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:border-transparent cursor-pointer transition-all duration-300 hover:-translate-y-1"
            >
              {/* Gradient Header */}
              <div className="h-24 bg-linear-to-br from-blue-500 to-purple-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all"></div>
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              </div>

              {/* Content */}
              <div className="p-6 relative -mt-6">
                {/* Icon Badge */}
                <div className="w-14 h-14 rounded-xl bg-white border-4 border-white shadow-lg flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  📚
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4">
                  {course.description}
                </p>

                {/* CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm font-semibold text-blue-600 group-hover:underline underline-offset-4 transition-all">
                    Get AI Recommendations
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 group-hover:bg-blue-600 flex items-center justify-center transition-all">
                    <svg className="w-4 h-4 text-blue-600 group-hover:text-white group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute -inset-0.5 bg-linaer-to-br from-blue-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-20 -z-10 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {courses.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📚</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Courses Available</h3>
            <p className="text-gray-600">Please check back later for available courses</p>
          </div>
        )}
      </div>
    </div>
  );
}
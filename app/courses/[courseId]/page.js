"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CourseDetail() {
  const { courseId } = useParams();
  const { data: session, status } = useSession();

  const [course, setCourse] = useState(null);
  const [topics, setTopics] = useState([]);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    if (!courseId) return;

    const loadCourse = async () => {
      const res = await fetch(`/api/courses/${courseId}`, { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        setCourse(data.course);
        setTopics(data.topics);
        setProgress(data.progressData);
      }
    };

    loadCourse();
  }, [courseId]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    if (typeof window !== "undefined") {
      alert("Please log in to continue");
      window.location.href = "/login";
    }
    return null;
  }

  if (!course) {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white pt-5">
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Back Button */}
        <Link 
          href="/courses" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Courses
        </Link>

        {/* Course Header Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden mb-8">

          {/* Content */}
          <div className="p-8 -mt-6 relative">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{course?.title}</h1>
              <p className="text-gray-600 leading-relaxed">{course.description}</p>
            </div>

            {/* Progress Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Progress: {progress.completedTopics} of {progress.totalTopics} topics
                </span>
                <span className="text-sm font-bold text-blue-600">{progress.progress}%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-linear-to-r from-blue-600 to-blue-500 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${progress.progress}%` }}
                />
              </div>
            </div>

            {/* Continue Button */}
            <Link
              href={`/courses/${courseId}/${progress.nextTopic}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all"
            >
              Continue Course
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Topics Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Topics</h2>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <Link
              key={topic._id}
              href={`/courses/${courseId}/${topic._id}`}
              className="block group"
            >
              <div
                className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  topic.completed
                    ? "bg-linear-to-br from-green-50 to-emerald-50 border-green-200 hover:border-green-300 hover:shadow-lg hover:shadow-green-100"
                    : "bg-white border-gray-100 hover:border-blue-200 hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Number Badge */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-md transition-all ${
                        topic.completed
                          ? "bg-green-500 text-white"
                          : "bg-linear-to-br from-gray-100 to-gray-50 text-gray-700 group-hover:from-blue-100 group-hover:to-blue-50 group-hover:text-blue-600 group-hover:shadow-lg"
                      }`}
                    >
                      {topic.completed ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>

                    {/* Topic Info */}
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                        {topic.title}
                      </h3>
                      {topic.completed && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 mt-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Completed
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-blue-600 transition-all">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
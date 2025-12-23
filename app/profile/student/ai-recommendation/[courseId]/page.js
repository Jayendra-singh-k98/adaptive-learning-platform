"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";


export default function AIRecommendationPage() {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const { data: session, status } = useSession();
  const { courseId } = useParams();

  useEffect(() => {
    if (!session || !courseId) return;

    const loadData = async () => {
      try {
        const [recRes, statsRes] = await Promise.all([
          fetch(`/api/ai/recommendation?courseId=${courseId}`),
          fetch(`/api/student/stats?courseId=${courseId}`)
        ]);

        setRecommendation(await recRes.json());
        setStats(await statsRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [session, courseId]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  


  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex items-center justify-center ">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            {/* Animated Brain Icon */}
            <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 rounded-full opacity-20 animate-ping"></div>
            <div className="relative w-24 h-24 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
              <span className="text-4xl">🧠</span>
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">AI is Analyzing...</h2>
          <p className="text-gray-600">Personalizing your learning path</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white pt-10">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Header with AI Badge */}
        <div className="mb-8">
          <span className="inline-block px-4 py-1.5 bg-linear-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
            ✨ AI-Powered Recommendations
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Your Personalized Learning Path
          </h1>
          <p className="text-gray-600 text-lg">
            Based on your progress and performance, here's what we recommend
          </p>
        </div>

        {/* Main Recommendation */}
        {recommendation ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Primary Recommendation */}
            <div className="lg:col-span-2">
              <AIRecommendationCard data={recommendation} courseId={courseId} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Learning Tips */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  Learning Tips
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Take breaks every 25 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Practice with real examples</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Review previous topics regularly</span>
                  </li>
                </ul>
              </div>

              {/* Study Goal */}
              <div className="bg-linear-to-br from-purple-600 to-blue-600 rounded-2xl pt-6 pl-6 pb-3 text-white shadow-xl">
                <h3 className="font-bold mb-1">Daily Goal 🎯</h3>
                <p className="text-purple-100 text-sm mb-4">Complete 2 topics Daily</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🤔</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Recommendations Yet</h3>
            <p className="text-gray-600 mb-6">Complete some topics to get personalized recommendations</p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Browse Courses
            </Link>
          </div>
        )}

        {/* Alternative Topics */}
        {recommendation?.alternatives?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Other Suggested Topics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendation.alternatives.map(topic => (
                <AlternativeTopic
                  key={topic._id}
                  title={topic.title}
                  difficulty={topic.difficulty || "Intermediate"}
                  duration="30 min"
                  courseId={courseId}
                  topicId={topic._id}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}


function AIRecommendationCard({ data, courseId }) {

  return (
    <div className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xl">
      {/* Gradient Header */}
      <div className="h-32 bg-linear-to-r from-purple-600 via-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

        {/* AI Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/20">
            🤖 AI Recommended
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center shrink-0">
            <span className="text-2xl">📖</span>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Next Topic: {data.topic?.title}
            </h2>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                20 min
              </span>
            </div>
          </div>
        </div>

        {/* Why This Topic */}
        <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-xl p-5 mb-6 border border-blue-100">
          <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span className="text-lg">🎯</span>
            Why This Topic?
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {data.reason || "This topic builds on your current knowledge and helps you progress effectively."}
          </p>
        </div>

        {/* What You'll Learn */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">What You'll Learn:</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-gray-600">
              <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>Core concepts and fundamentals</span>
            </li>
            <li className="flex items-start gap-2 text-gray-600">
              <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>Practical examples and exercises</span>
            </li>
            <li className="flex items-start gap-2 text-gray-600">
              <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>Real-world applications</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/courses/${courseId}/${data.topic?._id}`}
            className="flex-1 py-3.5 px-6 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-center hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all"
          >
            Start Learning →
          </Link>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-0 hover:opacity-10 -z-10 transition-all duration-500"></div>
    </div>
  );
}

function AlternativeTopic({ title, difficulty, duration, courseId, topicId }) {
  return (
    <Link
      href={`/courses/${courseId}/${topicId}`}
      className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xl text-white">
          📘
        </div>

        <div className="flex-1">
          <h3 className="font-bold text-gray-900 group-hover:text-blue-600">
            {title}
          </h3>
          <p className="text-xs text-gray-500">
            {difficulty} • {duration}
          </p>
        </div>

        <span className="text-gray-400 group-hover:text-blue-600">→</span>
      </div>
    </Link>
  );
}

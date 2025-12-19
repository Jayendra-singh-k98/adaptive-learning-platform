"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function TopicLearning() {
  const { courseId, topicId } = useParams(); // keep your folder names
  const router = useRouter();
  const { data: session, status } = useSession();

  const [topic, setTopic] = useState(null);
  const [course, setCourse] = useState(null); // will contain topics list + course meta + progress
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId || !topicId) return;

    const load = async () => {
      setLoading(true);
      try {
        // 1) load single topic content
        const tRes = await fetch(`/api/topics/${topicId}`);
        const tJson = await tRes.json();
        if (!tRes.ok) throw new Error(tJson?.message || "Failed to fetch topic");

        // 2) load course + topics + progress (student-specific)
        const cRes = await fetch(`/api/courses/${courseId}`);
        const cJson = await cRes.json();
        if (!cRes.ok) throw new Error(cJson?.message || "Failed to fetch course");

        setTopic(tJson.topic);
        setCourse(cJson); // cJson should contain: course, topics, progressData as we designed earlier

        // find completion state for this topic (server already sends topic.completed in course topics)
        const tStatusFromCourse = (cJson.topics || []).find(t => {
          // compare by _id or slug depending on what you return server-side
          return t._id === topicId || t._id === String(topicId) || t.slug === topicId;
        });
        setIsCompleted(Boolean(tStatusFromCourse?.completed || tJson.topic?.completed));
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [courseId, topicId, session]);

  if (status === "loading" || loading) {
    return <div className="p-20 text-center">Loading...</div>;
  }

  if (status !== "authenticated") {
    return (
      <div className="p-20 text-center">
        <p className="text-red-600">You must be logged in to view this page.</p>
        <Link href="/api/auth/signin" className="text-blue-600 underline">Sign in</Link>
      </div>
    );
  }

  if (error) {
    return <div className="p-20 text-center text-red-600">Error: {error}</div>;
  }

  if (!topic || !course?.course) {
    return <div className="p-20 text-center">Topic not found.</div>;
  }

  // compute prev and next using the topics array returned by course API
  const topicsList = course.topics || [];
  const currentIndex = topicsList.findIndex(t => t._id === topic._id);
  const prevTopic = topicsList[currentIndex - 1];
  const nextTopic = topicsList[currentIndex + 1];

  

  // safe content rendering: we keep simple parsing like you had, but we use topic.content from server
  const content = topic.content || "";

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white pt-5">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/courses" className="hover:text-blue-600 transition-colors">Courses</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>

          <Link href={`/courses/${courseId}`} className="hover:text-blue-600 transition-colors">
            {course.course.title}
          </Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>

          <span className="text-gray-900 font-medium">{topic.title}</span>
        </div>

        {/* Topic Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{topic.title}</h1>
          {isCompleted && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              ✓ Completed
            </span>
          )}
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
          <div className="prose prose-gray max-w-none">
            {content.split("\n").map((paragraph, i) => {
              const p = paragraph.trim();
              if (!p) return null;
              if (p.startsWith("**") && p.endsWith("**")) {
                return <h3 key={i} className="text-lg font-semibold text-gray-900 mt-6 mb-3">{p.replace(/\*\*/g, "")}</h3>;
              }
              return <p key={i} className="text-gray-700 leading-relaxed mb-4">{p}</p>;
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">

          <Link
            href={`/quiz/${topicId}?courseId=${course.course._id}`}
            className=" py-3 px-6 bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold text-center"
          >
            Start Quiz →
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
          <div>
            {prevTopic ? (
              <Link href={`/courses/${courseId}/${prevTopic._id}`} className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                Previous Topic
              </Link>
            ) : (
              <Link
                href={`/courses/${courseId}`}
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
              >
                ← Back to Course
              </Link>
              )
            }
          </div>

          <div>
            {nextTopic ? (
              <Link href={`/courses/${courseId}/${nextTopic._id}`} className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600">
                Next Topic
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </Link>
            ) : (
              <Link
                href={`/courses/${courseId}`}
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
              >
                Back to Course →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

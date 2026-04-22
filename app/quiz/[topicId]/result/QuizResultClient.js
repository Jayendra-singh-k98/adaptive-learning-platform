"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useRef } from "react";



const QuizResult = () => {
  const { topicId } = useParams();
  const search = useSearchParams();
  const courseId = search.get("courseId");   // ✅ Correct
  const [topicTitle, setTopicTitle] = useState("");


  const [result, setResult] = useState(null);
  const [questions, setQuestions] = useState([]);
  const hasSubmitted = useRef(false);

  const timeSpent = search.get("time"); // ✅


  useEffect(() => {
    const key = `quiz_result_${topicId}`;
    const saved = sessionStorage.getItem(key);

    // ⛔ first validate data
    if (!saved || !courseId) return;

    // ⛔ prevent double execution (React Strict Mode)
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;

    const json = JSON.parse(saved);

    const computedResult = {
      score: json.score,
      total: json.total,
      percentage: Math.round((json.score / json.total) * 100),
      predicted: null,
      level: null,
      completed : null
    };

    // 1️⃣ UI state
    setResult(computedResult);
    setQuestions(json.details);

    // 2️⃣ DB update (single time only)
    fetch("/api/topics/sumbit-quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId,
        topicId,
        score: json.score,
        total: json.total,
        time_spent: timeSpent
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("API RESPONSE:", data);

        setResult(prev => ({
          ...prev,
          predicted: data.predicted,
          level: data.level
        }));
      })
      .catch(console.error);

    // 3️⃣ Topic title
    fetch(`/api/quizs/${topicId}`)
      .then(res => res.json())
      .then(data => setTopicTitle(data.title))
      .catch(console.error);

  }, [topicId, courseId]);



  if (!result) {
    return <div className="p-10 text-center text-gray-600">No quiz data found.</div>;
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white pt-5 pb-10">
      <div className="max-w-4xl mx-auto px-6 py-12">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Quiz Results</h1>
          <p className="text-gray-600 mt-2">Topic: {topicTitle || topicId}</p>
        </div>

        {/* Score Card */}
        <div className={`bg-linear-to-r ${result.level === "Strong" ? "from-green-600 to-green-500" : result.level === "Improving" ? "from-yellow-500 to-yellow-400" : "from-red-500 to-red-400"
          } rounded-2xl p-8 mb-8 text-white text-center shadow-xl`}>

          <div className="mb-4">
            <div className="w-24 h-24 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4">
              <span className="text-4xl font-bold">
                {result.score}/{result.total}
              </span>
            </div>

            <h2 className="text-2xl font-bold mb-2">
              {result.completed ? "Great Job! 🎉" : "Keep Practicing! 💪"}
            </h2>

            <p className="text-lg opacity-90">
              You scored {result.percentage}%
            </p>

            {result.predicted !== null && (
              <p className="text-lg mt-2 opacity-90">
                Expected: {result.predicted.toFixed(1)}%
              </p>
            )}

            {result.level && (
              <p className="text-xl mt-3 font-semibold">
                Status: {result.level === "Strong" ? "🚀 Strong" :
                  result.level === "Improving" ? "⚠️ Improving" :
                    "📚 Weak"}
              </p>
            )}

            {result.level === "Strong" && (
              <p className="mt-2">You can move to next topic 🚀</p>
            )}

            {result.level === "Improving" && (
              <p className="mt-2">You're improving! Try once more 🔁</p>
            )}

            {result.level === "Weak" && (
              <p className="mt-2">Revise this topic again 📚</p>
            )}
          </div>
        </div>

        {/* Answers List */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Review Your Answers</h2>

          <div className="space-y-4">
            {questions.map((q, index) => (
              <div key={index} className={`bg-white rounded-xl border-2 p-6 ${q.isCorrect ? "border-green-200" : "border-red-200"
                }`}>
                <h3 className="font-semibold text-gray-900 mb-3">{q.question}</h3>

                <div className="space-y-2">
                  <div className={`p-3 rounded-lg ${q.isCorrect ? "bg-green-50" : "bg-red-50"
                    }`}>
                    <span className="font-medium text-gray-600">Your Answer: </span>
                    <span className={q.isCorrect ? "text-green-700" : "text-red-700"}>
                      {q.userAnswer}
                    </span>
                  </div>

                  {!q.isCorrect && (
                    <div className="p-3 rounded-lg bg-green-50">
                      <span className="font-medium text-gray-600">Correct Answer: </span>
                      <span className="text-green-700">{q.correctAnswer}</span>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">

          {result.score !== result.total && (
            <Link
              href={`/quiz/${topicId}?courseId=${courseId}`}
              className="flex-1 py-3 px-6 border-2 border-gray-200 text-gray-700 rounded-xl text-center"
            >
              Retake Quiz
            </Link>
          )}

          <Link
            href={`/courses/${courseId}`}
            className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-xl text-center"
          >
            Back to Course
          </Link>

        </div>

      </div>
    </div>
  );
};

export default QuizResult;

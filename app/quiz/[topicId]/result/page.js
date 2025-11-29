"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

const QuizResult = () => {
  const { topicId } = useParams();
  const search = useSearchParams();
  const courseId = search.get("courseId");   // ✅ Correct

  const [result, setResult] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const key = `quiz_result_${topicId}`;
    const saved = sessionStorage.getItem(key);

    if (saved) {
      const json = JSON.parse(saved);
      setResult({
        score: json.score,
        total: json.total,
        percentage: Math.round((json.score / json.total) * 100),
        passed: json.score >= Math.ceil(json.total / 2)
      });
      setQuestions(json.details);
    }
  }, [topicId]);

  if (!result) {
    return <div className="p-10 text-center text-gray-600">No quiz data found.</div>;
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white pt-5">
      <div className="max-w-4xl mx-auto px-6 py-12">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Quiz Results</h1>
          <p className="text-gray-600 mt-2">Topic {topicId}</p>
        </div>

        {/* Score Card */}
        <div className={`bg-linear-to-r ${
          result.passed ? "from-green-600 to-green-500" : "from-red-600 to-red-500"
        } rounded-2xl p-8 mb-8 text-white text-center shadow-xl`}>

          <div className="mb-4">
            <div className="w-24 h-24 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4">
              <span className="text-4xl font-bold">
                {result.score}/{result.total}
              </span>
            </div>

            <h2 className="text-2xl font-bold mb-2">
              {result.passed ? "Great Job! 🎉" : "Keep Practicing! 💪"}
            </h2>

            <p className="text-lg opacity-90">
              You scored {result.percentage}%
            </p>
          </div>
        </div>

        {/* Answers List */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Review Your Answers</h2>

          <div className="space-y-4">
            {questions.map((q, index) => (
              <div key={index} className={`bg-white rounded-xl border-2 p-6 ${
                q.isCorrect ? "border-green-200" : "border-red-200"
              }`}>
                <h3 className="font-semibold text-gray-900 mb-3">{q.question}</h3>

                <div className="space-y-2">
                  <div className={`p-3 rounded-lg ${
                    q.isCorrect ? "bg-green-50" : "bg-red-50"
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

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";

const Quiz = () => {
  const { topicId } = useParams();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");   // ✅ Correct way
  const router = useRouter();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!topicId) return;

    const loadQuiz = async () => {
      const res = await fetch(`/api/quizs/${topicId}`, { cache: "no-store" });
      const data = await res.json();

      if (data.success) {
        setQuestions(data.quiz);
      }

      setLoading(false);
    };

    loadQuiz();
  }, [topicId]);

  const handleAnswerChange = (qIndex, optIndex) => {
    setAnswers({ ...answers, [qIndex]: optIndex });
  };

  const handleSubmit = () => {
    let score = 0;

    const details = questions.map((q, i) => {
      const correct = q.correctAnswer;
      const selected = answers[i];

      if (selected === correct) score++;

      return {
        question: q.question,
        correctAnswer: q.options[correct],
        userAnswer: q.options[selected],
        isCorrect: selected === correct
      };
    });

    sessionStorage.setItem(
      `quiz_result_${topicId}`,
      JSON.stringify({ score, total: questions.length, details })
    );

    // 🚀 Redirect with courseId
    router.push(`/quiz/${topicId}/result?courseId=${courseId}`);
  };

  /* LOADING UI */
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 to-white">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading quiz...</p>
      </div>
    </div>
  );

  /* MAIN QUIZ UI */
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white pt-5">
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Back Button */}
        <Link 
          href={`/courses/${courseId}/${topicId}`} 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor">
            <path strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Topic
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Time! 📝</h1>
          <p className="text-gray-600">
            <span className="font-semibold text-blue-600">{questions.length}</span> questions • 
            <span className="ml-2">Answer all to submit</span>
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex gap-3 mb-5">
                <span className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <h3 className="font-bold text-gray-900 text-lg flex-1">{q.question}</h3>
              </div>

              <div className="space-y-3 ml-12">
                {q.options.map((opt, optIndex) => (
                  <label
                    key={optIndex}
                    className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      answers[index] === optIndex
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q-${index}`}
                      checked={answers[index] === optIndex}
                      onChange={() => handleAnswerChange(index, optIndex)}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className={answers[index] === optIndex ? "font-medium text-gray-900" : "text-gray-700"}>
                      {opt}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="mt-8 sticky bottom-6">
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length !== questions.length}
            className={`w-full py-4 rounded-xl font-bold text-lg ${
              Object.keys(answers).length === questions.length
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Submit Quiz ✓
          </button>
        </div>

      </div>
    </div>
  );
};

export default Quiz;

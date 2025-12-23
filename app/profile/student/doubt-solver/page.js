"use client";
import { useEffect, useState } from "react";

export default function DoubtSolver() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Send message (ChatGPT style)
  const askDoubt = async () => {
    if (!question.trim() || loading) return;

    const userMessage = {
      role: "user",
      content: question,
    };

    // 1️⃣ Show user message instantly
    setMessages(prev => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/doubt/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await res.json();

      // 2️⃣ Replace messages with server truth (important)
      setMessages(data.messages || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Load chat history
  useEffect(() => {
    fetch("/api/ai/doubt/history")
      .then(res => res.json())
      .then(data => setMessages(data.messages || []));
  }, []);

  const deleteMessage = async (index) => {
    const res = await fetch("/api/ai/doubt/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index }),
    });

    const data = await res.json();

    if (data.success) {
      setMessages(data.messages);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-indigo-50 via-white to-purple-50">
      <div className="w-[80%] mx-auto px-4 py-18">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-3xl">💬</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Doubt Solver
          </h1>
          <p className="text-gray-600">
            Ask anything — follow up like ChatGPT
          </p>
        </div>

        {/* Chat Box */}
        <div className="flex-1 overflow-y-auto space-y-6 px-2 pb-32">
          {messages.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🤔</div>
              <p className="text-gray-500 text-lg">
                Ask your first question
              </p>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 shadow-md ${m.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 border"
                  }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">
                  {m.content}
                </p>
                {/* Delete Button - Shows on hover */}
                {m.role === "user" && (
                  <button
                    onClick={() => deleteMessage(i)}
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                    title="Delete message"
                  >
                    ✕
                  </button>

                )}

              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border rounded-2xl px-5 py-3 text-gray-500">
                AI is thinking…
              </div>
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask your doubt… (Ctrl + Enter)"
            className="w-full border-2 border-gray-200 p-4 rounded-xl mb-4 focus:outline-none focus:border-blue-500 resize-none h-20"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.ctrlKey) {
                askDoubt();
              }
            }}
          />
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Ctrl + Enter to send
            </p>
            <button
              onClick={askDoubt}
              disabled={!question.trim() || loading}
              className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-all disabled:opacity-50"
            >
              {loading ? "Thinking..." : "Ask AI ✨"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

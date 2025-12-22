"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const TeacherDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);

  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    difficulty: "beginner"
  });
  const [topicForm, setTopicForm] = useState({
    courseId: "",
    title: "",
    content: "",
    order: 1
  });
  const [quizForm, setQuizForm] = useState({
    courseId: "",
    topicId: "",
    questions: [{ question: "", options: ["", "", "", ""], correctAnswer: 0 }]
  });

  const [filteredTopics, setFilteredTopics] = useState([]);
  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  const [stats, setStats] = useState([
    { label: "Total Courses", value: "—", icon: "📚", color: "bg-blue-500" },
    { label: "Total Topics", value: "—", icon: "📖", color: "bg-purple-500" },
    { label: "Active Students", value: "—", icon: "👨‍🎓", color: "bg-green-500" },
    { label: "Quizzes Created", value: "—", icon: "❓", color: "bg-orange-500" }
  ]);

  // Redirect non-teachers
  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "teacher") {
      router.push("/profile");
    }
  }, [session, status, router]);

  // Helper: try fetch quizzes from both possible endpoints
  const fetchAllQuizzes = async () => {
  try {
    const res = await fetch("/api/quizs");  // your correct API path
    const json = await res.json();

    if (!json.success) return [];

    // If API returns array → return it
    if (Array.isArray(json.quizzes)) return json.quizzes;

    // If API returns single object → wrap in array
    if (json.quiz) return [json.quiz];

    return [];
  } catch (e) {
    console.error("fetchAllQuizzes error:", e);
    return [];
  }
};


  // Load courses (simple) and then enrich via loadTopicsAndQuizzes
  const fetchCourses = useCallback(async () => {
    try {
      const res = await fetch("/api/courses");
      const json = await res.json();
      if (json.success) {
        const allCourses = json.courses || [];
        // if you want teacher-only, filter by createdBy
        const my = session?.user?.email ? allCourses.filter(c => c.createdBy === session.user.email) : allCourses;
        // temporarily set (we will enrich soon)
        setCourses(my.length ? my : allCourses);
        return allCourses;
      }
    } catch (err) {
      console.error("fetchCourses error", err);
    }
    return [];
  }, [session]);

  // fetch all topics & quizzes, compute counts and enrich courses
  const loadTopicsAndQuizzes = useCallback(async (providedCourses = null) => {
    try {
      // fetch topics
      const tRes = await fetch("/api/topics");
      const tJson = await tRes.json();
      const allTopics = tJson.success ? (tJson.topics || []) : (Array.isArray(tJson) ? tJson : []);

      // fetch quizzes (robust)
      const allQuizzes = await fetchAllQuizzes();

      setTopics(allTopics);
      setQuizzes(allQuizzes);

      // ensure we have courses
      const coursesFromServer = providedCourses || (await fetchCourses()) || [];

      // Totals
      const totalTopics = allTopics.length;
      const totalQuizzes = allQuizzes.length;
      const activeStudents = coursesFromServer.reduce((acc, c) => acc + (c.students || 0), 0);

      setStats(prev => [
        { ...prev[0], value: String(coursesFromServer.length) },
        { ...prev[1], value: String(totalTopics) },
        { ...prev[2], value: String(activeStudents) },
        { ...prev[3], value: String(totalQuizzes) }
      ]);

      // counts per course
      const topicsByCourse = allTopics.reduce((map, t) => {
        const cid = String(t.courseId || t.course || t.course_id || "");
        if (!cid) return map;
        map[cid] = (map[cid] || 0) + 1;
        return map;
      }, {});

      // map topicId -> courseId
      const topicCourseMap = allTopics.reduce((m, t) => {
        m[String(t._id || t.id)] = String(t.courseId || t.course || "");
        return m;
      }, {});

      const quizzesByCourse = allQuizzes.reduce((map, q) => {
        const topicId = String(q.topicId || q.topic || "");
        const courseId = topicCourseMap[topicId];
        if (courseId) map[courseId] = (map[courseId] || 0) + 1;
        return map;
      }, {});

      const enriched = (coursesFromServer || []).map(c => ({
        ...c,
        topicCount: topicsByCourse[String(c._id || c.id)] || 0,
        quizCount: quizzesByCourse[String(c._id || c.id)] || 0
      }));

      const my = session?.user?.email ? enriched.filter(c => c.createdBy === session.user.email) : enriched;
      setCourses(my.length ? my : enriched);
    } catch (err) {
      console.error("loadTopicsAndQuizzes error", err);
    }
  }, [fetchCourses, session]);

  // initial load: courses -> topics/quizzes
  useEffect(() => {
    (async () => {
      const allCourses = await fetchCourses();
      await loadTopicsAndQuizzes(allCourses);
    })();
  }, [fetchCourses, loadTopicsAndQuizzes]);

  // Filter topics when quizForm.courseId changes
  useEffect(() => {
    if (!quizForm.courseId) {
      setFilteredTopics([]);
      return;
    }
    (async () => {
      try {
        const res = await fetch(`/api/topics?courseId=${quizForm.courseId}`);
        const json = await res.json();
        if (json.success) setFilteredTopics(json.topics || []);
        else setFilteredTopics([]);
      } catch (err) {
        console.error("Failed to load topics for course", err);
        setFilteredTopics([]);
      }
    })();
  }, [quizForm.courseId]);

  // ---------- Submit handlers (send role + data) ----------
  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    if (!session) return alert("Login required");
    setLoading(true);
    try {
      const payload = {
        role: session.user.role,
        course: {
          ...courseForm,
          slug: courseForm.title.toLowerCase().replace(/\s+/g, "-"),
          createdBy: session.user.email
        }
      };

      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to create course");

      // refresh everything (best to ensure counts are correct)
      await loadTopicsAndQuizzes([json.course, ...courses]);

      alert("Course created successfully!");
      setCourseForm({ title: "", description: "", difficulty: "beginner" });
      setActiveTab("overview");
    } catch (err) {
      console.error(err);
      alert("Error creating course: " + (err.message || ""));
    } finally {
      setLoading(false);
    }
  };

  const handleTopicSubmit = async (e) => {
    e.preventDefault();
    if (!session) return alert("You must be logged in as teacher.");
    if (!topicForm.courseId) return alert("Choose a course first.");
    setLoading(true);
    try {
      const payload = {
        role: session.user.role,
        topic: { ...topicForm, slug: topicForm.title.toLowerCase().replace(/\s+/g, "-") }
      };

      const res = await fetch("/api/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to add topic");

      // refresh counts & courses
      await loadTopicsAndQuizzes();
      alert("Topic added successfully!");
      setTopicForm({ courseId: "", title: "", content: "", order: 1 });
      setActiveTab("overview");
    } catch (err) {
      console.error(err);
      alert("Error adding topic: " + (err.message || ""));
    } finally {
      setLoading(false);
    }
  };

  const handleQuizSubmit = async (e) => {
    e.preventDefault();

    if (!session) return alert("Login required");
    if (session.user.role !== "teacher") return alert("Only teachers can add quiz");
    if (!quizForm.topicId) return alert("Select a topic");

    setLoading(true);

    try {
      const res = await fetch("/api/quizs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: session.user.role,
          quiz: quizForm
        }),
      });

      const json = await res.json();

      if (!json.success) {
        throw new Error(json.message || "Failed to create quiz");
      }

      // Refresh all stats and course/topic/quiz counts
      await loadTopicsAndQuizzes();

      alert("Quiz created successfully!");

      // Reset quiz form
      setQuizForm({
        courseId: "",
        topicId: "",
        questions: [
          { question: "", options: ["", "", "", ""], correctAnswer: 0 }
        ]
      });

      // Go back to overview tab
      setActiveTab("overview");

    } catch (err) {
      console.error(err);
      alert("Error creating quiz: " + (err.message || ""));
    } finally {
      setLoading(false);
    }
  };


  // question helpers
  const addQuestion = () => {
    setQuizForm({
      ...quizForm,
      questions: [...quizForm.questions, { question: "", options: ["", "", "", ""], correctAnswer: 0 }]
    });
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...quizForm.questions];
    updatedQuestions[index][field] = value;
    setQuizForm({ ...quizForm, questions: updatedQuestions });
  };

  const updateOption = (qIndex, oIndex, value) => {
    const updatedQuestions = [...quizForm.questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuizForm({ ...quizForm, questions: updatedQuestions });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = quizForm.questions.filter((_, i) => i !== index);
    setQuizForm({ ...quizForm, questions: updatedQuestions });
  };

  // ---------- Render (kept the UI unchanged) ----------
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your courses, topics, and quizzes</p>
        </div>

        <div className="flex gap-2 mb-8 border-b border-gray-200 overflow-x-auto">
          {["overview", "add-course", "add-topic", "add-quiz"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium whitespace-nowrap transition-colors ${activeTab === tab ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900"
                }`}
            >
              {tab === "overview" && "📊 Overview"}
              {tab === "add-course" && "➕ Add Course"}
              {tab === "add-topic" && "📝 Add Topic"}
              {tab === "add-quiz" && "❓ Add Quiz"}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                    {stat.icon}
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">My Courses</h2>
              <div className="space-y-3">
                {courses.length === 0 ? (
                  <p className="text-gray-500">No courses yet — create your first course from "Add Course" tab.</p>
                ) : (
                  courses.map((c) => (
                    <div key={c._id || c.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all">
                      <div>
                        <h3 className="font-semibold text-gray-900">{c.title}</h3>
                        <p className="text-sm text-gray-500">
                          {c.topicCount ?? c.totalTopics ?? 0} topics • {c.students ?? 0} students • {c.quizCount ?? 0} quizzes
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>
                        <Link href={`/teacher/course/${c._id || c.id}`} className="text-blue-600 hover:text-blue-700">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "add-course" && (
          <div className="max-w-2xl">
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Course</h2>
              <form onSubmit={handleCourseSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Title *</label>
                  <input
                    type="text"
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                    placeholder="e.g., Advanced Python Programming"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    value={courseForm.description}
                    onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                    placeholder="Describe what students will learn..."
                    rows="4"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none
                    bg-neutral-secondary-medium border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block p-3.5 shadow-xs placeholder:text-body"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
                  <div className="grid grid-cols-3 gap-3">
                    {["beginner", "intermediate", "advanced"].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setCourseForm({ ...courseForm, difficulty: level })}
                        className={`py-3 rounded-xl border-2 font-medium transition-all capitalize ${courseForm.difficulty === level
                          ? "border-blue-500 bg-blue-50 text-blue-600"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                          }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-60"
                >
                  {loading ? "Creating..." : "Create Course"}
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === "add-topic" && (
          <div className="max-w-2xl">
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Topic</h2>
              <form onSubmit={handleTopicSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Course *</label>
                  <select
                    value={topicForm.courseId}
                    onChange={(e) => setTopicForm({ ...topicForm, courseId: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  >
                    <option value="">Choose a course</option>
                    {courses.map((course) => (
                      <option key={course._id || course.id} value={course._id || course.id}>{course.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Topic Title *</label>
                  <input
                    type="text"
                    value={topicForm.title}
                    onChange={(e) => setTopicForm({ ...topicForm, title: e.target.value })}
                    placeholder="e.g., Variables and Data Types"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Topic Content *</label>
                  <textarea
                    value={topicForm.content}
                    onChange={(e) => setTopicForm({ ...topicForm, content: e.target.value })}
                    placeholder="Write the lesson content here..."
                    rows="8"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none
                    bg-neutral-secondary-medium border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block p-3.5 shadow-xs placeholder:text-body"
                  />
                  <p className="text-xs text-gray-400 mt-2">Tip: You can use **bold** for headings</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Topic Order</label>
                  <input
                    type="number"
                    value={topicForm.order}
                    onChange={(e) => setTopicForm({ ...topicForm, order: parseInt(e.target.value) })}
                    min="1"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-60"
                >
                  {loading ? "Adding..." : "Add Topic"}
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === "add-quiz" && (
          <div className="max-w-3xl">
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Quiz</h2>
              <form onSubmit={handleQuizSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Course *</label>
                  <select
                    value={quizForm.courseId}
                    onChange={(e) => setQuizForm({ ...quizForm, courseId: e.target.value, topicId: "" })}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  >
                    <option value="">Choose a course</option>
                    {courses.map((course) => (
                      <option key={course._id || course.id} value={course._id || course.id}>{course.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Topic *</label>
                  <select
                    value={quizForm.topicId}
                    onChange={(e) => setQuizForm({ ...quizForm, topicId: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                    disabled={!quizForm.courseId}
                  >
                    <option value="">Choose a topic</option>
                    {filteredTopics.length === 0 && quizForm.courseId && (
                      <option disabled>No topics added for this course</option>
                    )}
                    {filteredTopics.map((t) => (
                      <option key={t._id || t.id} value={t._id || t.id}>{t.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-6">
                  {quizForm.questions.map((q, qIndex) => (
                    <div key={qIndex} className="p-6 rounded-xl border-2 border-gray-200 relative">
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium">
                          Question {qIndex + 1}
                        </span>
                        {quizForm.questions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeQuestion(qIndex)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>

                      <div className="space-y-4">
                        <input
                          type="text"
                          value={q.question}
                          onChange={(e) => updateQuestion(qIndex, "question", e.target.value)}
                          placeholder="Enter question"
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                        />

                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-700">Options:</p>
                          {q.options.map((option, oIndex) => (
                            <div key={oIndex} className="flex items-center gap-3">
                              <input
                                type="radio"
                                name={`correct-${qIndex}`}
                                checked={q.correctAnswer === oIndex}
                                onChange={() => updateQuestion(qIndex, "correctAnswer", oIndex)}
                                className="w-5 h-5 text-blue-600"
                              />
                              <input
                                type="text"
                                value={option}
                                onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                                placeholder={`Option ${oIndex + 1}`}
                                required
                                className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 outline-none transition-all"
                              />
                            </div>
                          ))}
                          <p className="text-xs text-gray-400 mt-2">Select the radio button for the correct answer</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addQuestion}
                  className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-xl font-medium hover:border-blue-500 hover:text-blue-600 transition-all"
                >
                  + Add Another Question
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-60"
                >
                  {loading ? "Creating..." : "Create Quiz"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;

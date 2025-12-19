"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function TrackProgressPage() {
    const { courseId } = useParams();
    const { data: session, status } = useSession();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!courseId || !session) return;

        const load = async () => {
            try {
                const res = await fetch(`/api/student/progress?courseId=${courseId}`);

                if (!res.ok) {
                    throw new Error("Failed to fetch progress");
                }

                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error(err);
                setError("Unable to load progress");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [courseId, session]);


    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 to-white">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Checking authentication...</p>
                </div>
            </div>
        );
    }

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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 to-white">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading your progress...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 to-white">
                <div className="text-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl">⚠️</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Progress</h2>
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white pt-5">
            <div className="max-w-6xl mx-auto px-6 py-12">

                {/* Header */}
                <div className="mb-10">
                    <span className="inline-block px-4 py-1.5 bg-linear-to-r from-green-100 to-blue-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                        📊 Your Analytics
                    </span>
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">Learning Progress</h1>
                    <p className="text-gray-600 text-lg">Track your journey and celebrate your achievements</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                    <Stat
                        icon="📈"
                        label="Progress"
                        value={`${data.progressPercent}%`}
                        color="from-blue-500 to-cyan-400"
                    />
                    <Stat
                        icon="✅"
                        label="Completed"
                        value={`${data.completed}/${data.totalTopics}`}
                        color="from-green-500 to-emerald-400"
                    />
                    <Stat
                        icon="🎯"
                        label="Attempts"
                        value={data.attempts}
                        color="from-purple-500 to-pink-400"
                    />
                    <Stat
                        icon="⏱️"
                        label="Study Time"
                        value={data.studyTime}
                        color="from-orange-500 to-yellow-400"
                    />
                </div>

                {/* Accuracy Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden mb-8">
                    <div className="bg-linear-to-r from-blue-600 to-purple-600 px-6 py-4">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <span>🎯</span>
                            Average Accuracy
                        </h2>
                    </div>
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                                    {data.avgAccuracy}%
                                </p>
                                <p className="text-gray-600 mt-2">Overall quiz performance</p>
                            </div>
                            <div className="w-32 h-32 rounded-full border-8 border-blue-100 flex items-center justify-center">
                                <span className="text-4xl">
                                    {data.avgAccuracy >= 80 ? "🌟" : data.avgAccuracy >= 60 ? "👍" : "💪"}
                                </span>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-linear-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-1000"
                                style={{ width: `${data.avgAccuracy}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Topic-wise Performance */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
                    <div className="bg-linear-to-r from-purple-600 to-blue-600 px-6 py-4">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <span>📚</span>
                            Topic-wise Performance
                        </h2>
                    </div>
                    <div className="p-6">
                        {data?.chartData && data.chartData.length > 0 ? (
                            <div className="space-y-4">
                                {data.chartData.map((topic, index) => (
                                    <TopicPerformanceCard key={index} topic={topic} index={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">📊</span>
                                </div>
                                <p className="text-gray-600">No performance data available yet</p>
                                <p className="text-sm text-gray-400 mt-1">Complete some quizzes to see your stats here</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Motivational Message */}
                <div className="mt-8 bg-linear-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center shadow-xl">
                    <h3 className="text-2xl font-bold mb-2">
                        {data.progressPercent >= 80 ? "Amazing Progress! 🎉" :
                            data.progressPercent >= 50 ? "Keep Going! 💪" :
                                "You're Just Getting Started! 🚀"}
                    </h3>
                    <p className="text-green-100">
                        {data.progressPercent >= 80 ? "You're almost there! Keep up the excellent work." :
                            data.progressPercent >= 50 ? "You're halfway through. Stay consistent!" :
                                "Every expert was once a beginner. Keep learning!"}
                    </p>
                </div>
            </div>
        </div>
    );
}

function Stat({ icon, label, value, color }) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-lg transition-all">
            <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${color} flex items-center justify-center text-2xl mb-3 shadow-md`}>
                {icon}
            </div>
            <p className="text-sm text-gray-500 mb-1">{label}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    );
}

function TopicPerformanceCard({ topic, index }) {
    // Calculate performance color
    const getPerformanceColor = (accuracy) => {
        if (accuracy >= 80) return { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", gradient: "from-green-500 to-emerald-400" };
        if (accuracy >= 60) return { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", gradient: "from-blue-500 to-cyan-400" };
        if (accuracy >= 40) return { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", gradient: "from-orange-500 to-yellow-400" };
        return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", gradient: "from-red-500 to-rose-400" };
    };

    const colors = getPerformanceColor(topic.accuracy || 0);

    return (
        <div className={`p-5 rounded-xl border-2 ${colors.border} ${colors.bg} hover:shadow-md transition-all`}>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-linear-to-br ${colors.gradient} text-white font-bold flex items-center justify-center shadow-sm`}>
                        {index + 1}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">{topic.title}</h3>
                        <p className="text-xs text-gray-500">
                            {topic.attempts} {topic.attempts === 1 ? "attempt" : "attempts"}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <p className={`text-lg font-semibold ${colors.text}`}>
                        Last Attempt Accuracy: <span className="text-2xl font-bold">{topic.accuracy}%</span>
                    </p>
                    <p className="text-xs text-gray-500">
                        {topic.score}/{topic.total}
                    </p>
                </div>
            </div>

            {/* Mini Progress Bar */}
            <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                <div
                    className={`h-full bg-linear-to-r ${colors.gradient} rounded-full transition-all duration-500`}
                    style={{ width: `${topic.accuracy || 0}%` }}
                ></div>
            </div>
        </div>
    );
}
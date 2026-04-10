import connectDB from "@/db/connectdb";
import StudentTopicProgress from "@/db/models/StudentTopicProgress";
import Topic from "@/db/models/Topic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function GET(req) {
  try {
    // 1️⃣ Connect DB
    await connectDB();

    // 2️⃣ Auth check
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 3️⃣ Read courseId
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return Response.json({ error: "courseId missing" }, { status: 400 });
    }

    // 4️⃣ Total topics in course
    const totalTopics = await Topic.countDocuments({ courseId });

    // 5️⃣ Student progress docs
    const progress = await StudentTopicProgress.find({
      studentId: session.user.id,
      courseId,
    });

    // 6️⃣ Completed topics
    const completed = progress.filter(p => p.completed).length;

    // 7️⃣ Attempts
    const attempts = progress.reduce(
      (sum, p) => sum + (p.attempts || 0),
      0
    );

    // 8️⃣ Average accuracy (based on score/total)
    const scored = progress.filter(
      p => typeof p.score === "number" && typeof p.total === "number"
    );

    const avgAccuracy = scored.length
      ? Math.round(
        scored.reduce(
          (sum, p) => sum + (p.score / p.total) * 100,
          0
        ) / scored.length
      )
      : 0;

    // ✅ REAL TIME CALCULATION
    const totalSeconds = progress.reduce(
      (sum, p) => sum + (p.time_spent || 0),
      0
    );

    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = Math.floor(totalSeconds % 60);

    // 🔟 Progress %
    const progressPercent = totalTopics
      ? Math.round((completed / totalTopics) * 100)
      : 0;

    // 1️⃣1️⃣ Fetch topic titles
    const topicIds = progress.map(p => p.topicId);

    const topics = await Topic.find(
      { _id: { $in: topicIds } },
      { title: 1 }
    );

    const topicMap = {};
    topics.forEach(t => {
      topicMap[t._id.toString()] = t.title;
    });

    // 1️⃣2️⃣ Build chartData (NORMALIZED)
    const chartData = progress.map(p => {
      const score = p.score || 0;
      const total = p.total || 0;
      const accuracy =
        total > 0 ? Math.round((score / total) * 100) : 0;

      return {
        topicId: p.topicId,
        title: topicMap[p.topicId.toString()] || "Topic",
        score,
        total,
        attempts: p.attempts || 0,
        accuracy,
      };
    });

    // 1️⃣3️⃣ Final response
    return Response.json({
      totalTopics,
      completed,
      attempts,
      avgAccuracy,
      progressPercent,
      studyTime: `${hours}h ${mins}m ${secs}s`,
      chartData,
    });
  } catch (error) {
    console.error("Progress API Error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import Course from "@/db/models/Course";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ parse body ONCE
    const body = await req.json();
    const { topicId, courseId, time_spent } = body;

    if (!topicId || !courseId || time_spent === undefined) {
      return Response.json({ error: "Missing data" }, { status: 400 });
    }

    let realCourseId = courseId;

    // 🔥 convert slug → ObjectId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      const course = await Course.findOne({ slug: courseId });

      if (!course) {
        return Response.json({ error: "Course not found" }, { status: 404 });
      }

      realCourseId = course._id;
    }

    // ✅ USE realCourseId
    await StudentTopicProgress.updateOne(
      {
        studentId: session.user.id,
        topicId,
        courseId: realCourseId,
      },
      {
        $inc: { time_spent: Number(time_spent) },
      },
      { upsert: true }
    );

    return Response.json({ success: true });

  } catch (error) {
    console.error("Time API Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
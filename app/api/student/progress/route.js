import connectDB from "@/db/connectdb";
import StudentTopicProgress from "@/db/models/StudentTopicProgress";
import Topic from "@/db/models/Topic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function GET(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return Response.json({ error: "courseId missing" }, { status: 400 });
    }

    const totalTopics = await Topic.countDocuments({ courseId });

    const progress = await StudentTopicProgress.find({
      studentId: session.user.id,
      courseId,
    });

    // ✅ GET LATEST ATTEMPT PER TOPIC
    const latestMap = {};

    progress.forEach(p => {
      const key = p.topicId.toString();

      if (!latestMap[key] || latestMap[key].attempts < p.attempts) {
        latestMap[key] = p;
      }
    });

    const latestProgress = Object.values(latestMap);

    // ✅ Completed topics (correct)
    const completed = latestProgress.filter(p => p.completed).length;

    // ✅ Attempts (max attempts per topic, not sum of all rows)
    const attempts = latestProgress.reduce(
      (sum, p) => sum + (p.attempts || 0),
      0
    );

    // ✅ Avg accuracy (use latest only)
    const avgAccuracy = latestProgress.length
      ? Math.round(
        latestProgress.reduce(
          (sum, p) => sum + (p.accuracy || 0),
          0
        ) / latestProgress.length
      )
      : 0;

    // ✅ Total time (ALL attempts → correct)
    const totalSeconds = progress.reduce(
      (sum, p) => sum + (p.time_spent || 0),
      0
    );

    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = Math.floor(totalSeconds % 60);

    const progressPercent = totalTopics
      ? Math.round((completed / totalTopics) * 100)
      : 0;

    // ✅ Topic titles
    const topicIds = latestProgress.map(p => p.topicId);

    const topics = await Topic.find(
      { _id: { $in: topicIds } },
      { title: 1 }
    );

    const topicMap = {};
    topics.forEach(t => {
      topicMap[t._id.toString()] = t.title;
    });

    // ✅ Chart uses ONLY latest attempts
    const chartData = latestProgress.map(p => ({
      topicId: p.topicId,
      title: topicMap[p.topicId.toString()] || "Topic",
      score: p.score || 0,
      total: p.total || 0,
      attempts: p.attempts || 0,
      accuracy: p.accuracy || 0,
    }));

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

    const body = await req.json();
    console.log("Received progress data:", body);
    const { courseId, topicId, score, total, time_spent } = body;

    let realCourseId = courseId;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      const course = await Course.findOne({ slug: courseId });

      if (!course) {
        return Response.json({ error: "Course not found" }, { status: 404 });
      }

      realCourseId = course._id;
    }

    const studentObjectId = new mongoose.Types.ObjectId(session.user.id);
    const topicObjectId = new mongoose.Types.ObjectId(topicId);

    // 🔥 Find last attempt
    const last = await StudentTopicProgress.findOne({
      studentId: studentObjectId,
      topicId: topicObjectId,
      courseId: realCourseId,
    }).sort({ attempts: -1 });

    // 🟢 CASE 1: QUIZ SUBMIT → CREATE NEW
    if (typeof score === "number" && total > 0) {
      const attempts = last ? last.attempts + 1 : 1;

      const accuracy = total > 0 ? (score / total) * 100 : 0;
      const completed = accuracy >= 60;

      await StudentTopicProgress.create({
        studentId: studentObjectId,
        topicId: topicObjectId,
        courseId: realCourseId,
        attempts,
        score,
        total,
        accuracy,
        completed,
        time_spent: Number(time_spent),
      });
    }
    // 🟡 CASE 2: ONLY TIME UPDATE
    else {
      if (last) {
        await StudentTopicProgress.updateOne(
          { _id: last._id },
          { $inc: { time_spent: Number(time_spent) } }
        );
      } 
    }

    return Response.json({ success: true });

  } catch (error) {
    console.error("POST API Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
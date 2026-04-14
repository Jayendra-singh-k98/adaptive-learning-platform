import connectDB from "@/db/connectdb";
import StudentTopicProgress from "@/db/models/StudentTopicProgress";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { courseId, topicId, score, total, time_spent } = body;

    if (!courseId || !topicId) {
      return Response.json({ message: "Missing quiz data" }, { status: 400 });
    }

    const studentObjectId = new mongoose.Types.ObjectId(session.user.id);

    // ✅ Always convert to ObjectId before querying or saving
    const topicObjectId = new mongoose.Types.ObjectId(topicId);
    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    const last = await StudentTopicProgress.findOne({
      studentId: studentObjectId,
      courseId: courseObjectId,   // ✅ ObjectId
      topicId: topicObjectId,     // ✅ ObjectId
    }).sort({ attempts: -1 });

    const attempts = last ? last.attempts + 1 : 1;
    const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;
    const completed = accuracy >= 60;

    await StudentTopicProgress.create({
      studentId: studentObjectId,
      courseId: courseObjectId,
      topicId: topicObjectId,
      attempts,
      score,
      total,
      accuracy,
      completed,
      time_spent: time_spent,
    });

    return Response.json({ success: true, message: "Quiz submitted" });

  } catch (err) {
    console.error("QUIZ SUBMIT ERROR:", err);
    return Response.json({ message: err.message }, { status: 500 });
  }
}
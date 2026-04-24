import connectDB from "@/db/connectdb";
import StudentTopicProgress from "@/db/models/StudentTopicProgress";
import Topic from "@/db/models/Topic";
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

    // Fetch the topic to get its name
    const topic = await Topic.findById(topicObjectId);
    if (!topic) {
      return Response.json({ message: "Topic not found" }, { status: 404 });
    }

    const last = await StudentTopicProgress.findOne({
      studentId: studentObjectId,
      courseId: courseObjectId,   // ✅ ObjectId
      topicId: topicObjectId,     // ✅ ObjectId
    }).sort({ attempts: -1 });

    const attempts = last ? last.attempts + 1 : 1;
    const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;

    // 🔥 Call ML model
    let predicted = 0;

    try {
      const mlRes = await fetch(`${process.env.ML_API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attempts: Number(attempts),
          time_spent: Number(time_spent),
        }),
      });

      const mlData = await mlRes.json();
      predicted = mlData.predicted_accuracy;

    } catch (err) {
      console.error("ML API Error:", err);
    }

    let level;

    let completed = false;
    if (accuracy >= 80) {
      completed = true;
      level = "Strong";
    } else if (accuracy > predicted) {
      level = "Improving";
    } else {
      level = "Weak";
    }



    await StudentTopicProgress.create({
      studentId: studentObjectId,
      courseId: courseObjectId,
      topicId: topicObjectId,
      topicName: topic.title,
      attempts,
      score,
      total,
      accuracy,
      completed,
      time_spent: time_spent,
      predicted: predicted,
      level,
    });


    return Response.json({
      success: true,
      message: "Quiz submitted",
      accuracy,
      predicted,
      level,
      completed
    });

  } catch (err) {
    console.error("QUIZ SUBMIT ERROR:", err);
    return Response.json({ message: err.message }, { status: 500 });
  }
}
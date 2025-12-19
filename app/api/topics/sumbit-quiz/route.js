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

    const { courseId, topicId, score = 0, total = 0 } = await req.json();

    if (!courseId || !topicId) {
      return Response.json(
        { message: "Missing quiz data" },
        { status: 400 }
      );
    }
    const studentObjectId = new mongoose.Types.ObjectId(session.user.id);
    await StudentTopicProgress.findOneAndUpdate(
      {
        studentId: studentObjectId,
        courseId,
        topicId,
      },
      {
        $set: {
          completed: true,
          score,
          total,
          accuracy: total > 0 ? Math.round((score / total) * 100) : 0,
          updatedAt: new Date(),
        },
        $inc: {
          attempts: 1, 
        },
      },
      { upsert: true, new: true }
    );

    return Response.json({
      success: true,
      message: "Quiz submitted",
    });
  } catch (err) {
    console.error("QUIZ SUBMIT ERROR:", err);
    return Response.json(
      { message: err.message },
      { status: 500 }
    );
  }
}

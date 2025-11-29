import connectDB from "@/db/connectdb";
import StudentTopicProgress from "@/db/models/StudentTopicProgress";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { courseId, topicId } = await req.json();

    if (!courseId || !topicId) {
      return Response.json(
        { success: false, message: "Missing courseId or topicId" },
        { status: 400 }
      );
    }

    // ❗ STORE AS STRING ALWAYS
    await StudentTopicProgress.findOneAndUpdate(
      {
        studentId: session.user.id,
        courseId: String(courseId),
        topicId: String(topicId),
      },
      {
        studentId: session.user.id,
        courseId: String(courseId),
        topicId: String(topicId),
        completed: true,
      },
      { upsert: true, new: true }
    );

    return Response.json({ success: true, message: "Topic marked complete" });
  } catch (err) {
    console.error("🔥 COMPLETE API ERROR:", err);
    return Response.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

import connectDB from "@/db/connectdb";
import Topic from "@/db/models/Topic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");

  let topics;

  if (courseId) {
    topics = await Topic.find({ courseId }).sort({ order: 1 });
  } else {
    topics = await Topic.find().sort({ order: 1 });  // return all topics
  }

  return Response.json({ success: true, topics });
}

export async function POST(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "teacher") {
    return Response.json(
      { success: false, message: "Only teachers can add topics" },
      { status: 403 }
    );
  }

  const data = await req.json();

  try {
    const topic = await Topic.create({
      ...data.topic,
      createdBy: session.user.email
    });
    return Response.json({ success: true, topic });
  } catch (err) {
    return Response.json({ success: false, error: err.message });
  }
}

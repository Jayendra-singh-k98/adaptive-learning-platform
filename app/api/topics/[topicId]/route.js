// app/api/topics/[topicId]/route.js
import connectDB from "@/db/connectdb";
import Topic from "@/db/models/Topic";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { topicId } = await params;
    const topic = await Topic.findById(topicId);
    if (!topic) return Response.json({ success: false, message: "Topic not found" }, { status: 404 });
    return Response.json({ success: true, topic: topic.toObject() });
  } catch (err) {
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}
  
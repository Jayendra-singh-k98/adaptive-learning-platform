import connectDB from "@/db/connectdb";
import Topic from "@/db/models/Topic";
import StudentTopicProgress from "@/db/models/StudentTopicProgress";
import { getRecommendations } from "@/lib/ai/recommendationEngine";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");

  const topics = await Topic.find({ courseId }).sort({ order: 1 });
  const progress = await StudentTopicProgress.find({
    studentId: session.user.id,
    courseId,
  });

  const rec = getRecommendations({ topics, progress });

  if (!rec) {
    return Response.json({ topic: null });
  }

  const [mainTopic, alternatives] = await Promise.all([
    Topic.findById(rec.mainTopicId),
    Topic.find({ _id: { $in: rec.alternativeTopicIds } }),
  ]);

  return Response.json({
    topic: mainTopic,
    alternatives,
    reason: rec.reason,
  });
}

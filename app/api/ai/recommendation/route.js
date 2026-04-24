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

  const allProgress = await StudentTopicProgress.find({
    studentId: session.user.id,
    courseId,
  }).sort({ createdAt: -1 });


  // 🔥 keep only latest per topic
  const latestMap = new Map();

  allProgress.forEach(p => {
    const key = p.topicId.toString();

    if (!latestMap.has(key)) {
      latestMap.set(key, p);
    }
  });

  const progress = Array.from(latestMap.values());

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
    level: rec.level,
    accuracy: rec.accuracy,
    predicted: rec.predicted,
  });
}

import connectDB from "@/db/connectdb";
import Course from "@/db/models/Course";
import Topic from "@/db/models/Topic";
import StudentTopicProgress from "@/db/models/StudentTopicProgress";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req, { params }) {

  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { courseId } = await params;

    // 1. Find course by slug
    const course = await Course.findOne({ slug: courseId });

    if (!course) {
      return Response.json({
        success: false,
        message: "Course not found",
      }, { status: 404 });
    }

    // 2. Fetch topics using course._id
    const topics = await Topic.find({ courseId: course._id }).sort({ order: 1 });

    // 3. Completed topics for this student (IMPORTANT FIX)
    const completedProgress = await StudentTopicProgress.find({
      studentId: session.user.id,
      courseId: String(course._id),
      completed: true
    });


    const completedTopicIds = completedProgress.map(p => String(p.topicId));

    // 4. Add completed flag
    const topicsWithStatus = topics.map(t => ({
      ...t.toObject(),
      completed: completedTopicIds.includes(String(t._id))
    }));

    // 5. Progress calculation
    const totalTopics = topics.length;
    const completedTopics = completedTopicIds.length;
    const progress = totalTopics === 0 ? 0 : ((completedTopics / totalTopics) * 100).toFixed(1);

    // 6. Next topic
    const nextTopic = topicsWithStatus.find(t => !t.completed)?._id || topicsWithStatus[0]?._id;

    //previos topic

    // Find index of first incomplete topic (same logic as your nextTopic)
    const currentIndex = topicsWithStatus.findIndex(t => !t.completed);

    // If all topics completed, currentIndex = -1 → set to last topic
    const safeIndex = currentIndex === -1 ? topicsWithStatus.length - 1 : currentIndex;

    // Calculate previous topic
    const previousTopic =
      safeIndex > 0 ? topicsWithStatus[safeIndex - 1]._id : null;


    return Response.json({
      success: true,
      course: course.toObject(),
      topics: topicsWithStatus,
      progressData: {
        totalTopics,
        completedTopics,
        progress,
        nextTopic,
        previousTopic,
      },
    });

  } catch (err) {
    console.log("🔥 API ERROR:", err);
    return Response.json({ success: false, error: err.message });
  }
}

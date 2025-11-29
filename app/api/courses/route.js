import connectDB from "@/db/connectdb";
import Course from "@/db/models/Course";
import Topic from "@/db/models/Topic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  await connectDB();
  const courses = await Course.find();

  const results = await Promise.all(
      courses.map(async (course) => {
        const topicCount = await Topic.countDocuments({ courseId: course._id });
        return {
          ...course.toObject(),
          totalTopics: topicCount,
        };
      })
    );

  return Response.json({ success: true, courses: results });
}

export async function POST(req) {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "teacher") {
    return Response.json(
      { success: false, message: "Only teachers can add courses" },
      { status: 403 }
    );
  }

  const body = await req.json();

  try {
    const course = await Course.create({
      ...body.course,
      totalTopics: 0,
      createdBy: body.course.createdBy
    });
    return Response.json({ success: true, course });
  } catch (err) {
    return Response.json({ success: false, error: err.message });
  }
}

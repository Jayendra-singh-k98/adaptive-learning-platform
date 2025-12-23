import connectDB from "@/db/connectdb";
import StudentTopicProgress from "@/db/models/StudentTopicProgress";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "teacher") {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const progress = await StudentTopicProgress.find(
    {},
    { studentId: 1, courseId: 1 }
  );

  return Response.json({
    success: true,
    progress
  });
}

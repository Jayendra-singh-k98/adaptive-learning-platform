import connectDB from "@/db/connectdb";
import Quiz from "@/db/models/Quiz";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const topicId = searchParams.get("topicId");

  if (topicId) {
    const quiz = await Quiz.findOne({ topicId });
    return Response.json({ success: true, quiz });
  }
  
  // return ALL quizzes
  const quizzes = await Quiz.find();
  return Response.json({ success: true, quizzes });

}

export async function POST(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "teacher") {
    return Response.json(
      { success: false, message: "Only teachers can add quiz" },
      { status: 403 }
    );
  }

  const body = await req.json();

  try {
    const quiz = await Quiz.create({
      topicId: body.quiz.topicId,     // MUST be ObjectId
      questions: body.quiz.questions
    });

    return Response.json({ success: true, quiz });

  } catch (err) {
    return Response.json({ success: false, error: err.message });
  }
}

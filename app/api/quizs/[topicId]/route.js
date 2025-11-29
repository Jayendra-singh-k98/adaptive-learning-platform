import connectDB from "@/db/connectdb";
import Quiz from "@/db/models/Quiz";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { topicId } = await params;

    const quiz = await Quiz.findOne({ topicId });

    if (!quiz) {
      return Response.json({
        success: false,
        message: "No quiz found for this topic"
      }, { status: 404 });
    }

    return Response.json({
      success: true,
      quiz: quiz.questions
    });

  } catch (err) {
    console.error("QUIZ API ERROR:", err);
    return Response.json({
      success: false,
      message: err.message
    }, { status: 500 });
  }
}

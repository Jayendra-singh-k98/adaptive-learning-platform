import connectDB from "@/db/connectdb";
import Quiz from "@/db/models/Quiz";
import Topic from "@/db/models/Topic";

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

    const topic = await Topic.findById(topicId).select("title");
    if (!topic) {
      return Response.json({ error: "Topic not found" }, { status: 404 });
    }

    return Response.json({
      success: true,
      quiz: quiz.questions,
      title: topic.title
    });

  } catch (err) {
    console.error("QUIZ API ERROR:", err);
    return Response.json({
      success: false,
      message: err.message
    }, { status: 500 });
  }
}

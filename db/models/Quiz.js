import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
  topicId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Topic", 
    required: true 
  },

  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String }],
      correctAnswer: { type: Number, required: true }  // renamed
    }
  ],
  createdBy: String 
}, { timestamps: true });

export default mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema);

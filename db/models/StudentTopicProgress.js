import mongoose from "mongoose";

const StudentTopicProgressSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
  completed: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.StudentTopicProgress ||
  mongoose.model("StudentTopicProgress", StudentTopicProgressSchema);

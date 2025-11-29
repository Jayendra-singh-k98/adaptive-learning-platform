import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },

  difficulty: { type: String, default: "beginner" }, // added

  totalTopics: { type: Number, default: 0 },  // auto-count later
  slug: { type: String, unique: true },

  createdBy: { type: String }, 
}, { timestamps: true });

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);
  
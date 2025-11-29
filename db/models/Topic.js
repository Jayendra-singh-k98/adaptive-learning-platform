import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
  courseId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Course", 
    required: true 
  },

  title: { type: String, required: true },
  slug: String,
  content: { type: String, required: true },

  order: { type: Number, default: 1 },
  createdBy: String,
}, { timestamps: true });

export default mongoose.models.Topic || mongoose.model("Topic", TopicSchema);

import mongoose from "mongoose";

const DoubtChatSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one chat per student (v1)
    },
    messages: [
      {
        role: { type: String, enum: ["user", "assistant"], required: true },
        content: { type: String, required: true },
      }
    ],
  },
  { timestamps: true }
);


export default mongoose.models.DoubtChat ||
  mongoose.model("DoubtChat", DoubtChatSchema);

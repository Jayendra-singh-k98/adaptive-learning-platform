import mongoose from "mongoose";
const {Schema, model} = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    role: { type: String, enum: ["student", "teacher"],required: true},
    provider: { type: String, default: "credentials" }
});

export default mongoose.models.User || model("User", userSchema);


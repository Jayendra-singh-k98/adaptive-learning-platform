import mongoose from "mongoose";
const {Schema, model} = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    role: { type: String, required: true}
});

export default mongoose.models.User || model("User", userSchema);


import User from "@/db/models/User";
import connectDB from "@/db/connectdb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();

  const { email, currentPassword, newPassword } = await req.json();

  // 1. Find user
  const user = await User.findOne({ email });
  if (!user) {
    return Response.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  // 2. Validate current password
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return Response.json(
      { success: false, message: "Incorrect current password" },
      { status: 400 }
    );
  }

  // 3. New password length check
  if (newPassword.length < 8) {
    return Response.json(
      { success: false, message: "Password must be at least 8 characters" },
      { status: 400 }
    );
  }

  // 4. Hash and update
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate({ email }, { password: hashedPassword });

  return Response.json({
    success: true,
    message: "Password updated successfully",
  });
}

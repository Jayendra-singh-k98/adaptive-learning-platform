import User from "@/db/models/User";
import connectDB from "@/db/connectdb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password, role } = await req.json();

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return Response.json(
        { success: false, message: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role : role.toLowerCase(),
    });

    return Response.json(
      {
        success: true,
        message: "Account created successfully",
        user,
      },
      { status: 201 }
    );

  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

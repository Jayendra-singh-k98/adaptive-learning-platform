import connectDB from "@/db/connectdb";
import DoubtChat from "@/db/models/DoubtChat";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { index } = await req.json();

  const chat = await DoubtChat.findOne({ studentId: session.user.id });
  if (!chat) {
    return Response.json({ success: false });
  }

  // Remove user + assistant reply
  chat.messages.splice(index, 2);

  await chat.save();

  return Response.json({
    success: true,
    messages: chat.messages,
  });
}

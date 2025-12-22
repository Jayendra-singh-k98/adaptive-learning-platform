import connectDB from "@/db/connectdb";
import DoubtChat from "@/db/models/DoubtChat";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const chat = await DoubtChat.findOne({ studentId: session.user.id });

  return Response.json({
    messages: chat?.messages || [],
  });
}

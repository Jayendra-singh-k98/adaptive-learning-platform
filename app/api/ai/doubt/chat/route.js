import connectDB from "@/db/connectdb";
import DoubtChat from "@/db/models/DoubtChat";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import openai from "@/lib/ai/openai";
import openai from "@/lib/ai/openrouter";

export async function POST(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { message } = await req.json();
  if (!message?.trim()) {
    return Response.json({ message: "Message required" }, { status: 400 });
  }

  let chat = await DoubtChat.findOne({ studentId: session.user.id });

  if (!chat) {
    chat = await DoubtChat.create({
      studentId: session.user.id,
      messages: [],
    });
  }

  // Add user message
  chat.messages.push({ role: "user", content: message });
  const messages = chat.messages;

  let reply;

  try {
    const completion = await openai.chat.completions.create({
      model: "xiaomi/mimo-v2-flash:free",
      messages,
    });

    reply = completion.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI Error:", error);
   reply = "Hi! 👋 I’m currently unable to access my full AI capabilities. However, I’m still here to help you learn. Please continue asking your questions, and I’ll guide you step by step based on the available context.";
  }


  // Add AI reply
  chat.messages.push({ role: "assistant", content: reply });
  await chat.save();

  return Response.json({
    success: true,
    reply,
    messages: chat.messages,
  });
}

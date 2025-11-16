import { NextResponse } from "next/server";
import { redisManager } from "@/libs/cache/redis/redis";

const userId = "user";

export async function GET() {
  try {
    const data = await redisManager.getData(`resume:contact:${userId}`);
    return NextResponse.json(data || { email: "", linkedin: "", github: "" });
  } catch (error) {
    console.error("Error fetching contact:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    await redisManager.setData(`resume:contact:${userId}`, body);
    const response = NextResponse.json({ success: true });
    response.cookies.set(`resume_refresh_contact`, "1", {
      path: "/",
      httpOnly: false,
    });

    return response;
  } catch (error) {
    console.error("Error saving contact:", error);
    return NextResponse.json(
      { error: "Failed to save contact" },
      { status: 500 }
    );
  }
}

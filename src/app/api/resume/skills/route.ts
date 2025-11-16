import { NextResponse } from "next/server";
import { redisManager } from "@/libs/cache/redis/redis";

const userId = "user";

export async function GET() {
  try {
    const data = await redisManager.getData(`resume:skills:${userId}`);
    return NextResponse.json(data || { skills: [] });
  } catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    await redisManager.setData(`resume:skills:${userId}`, body);

    const response = NextResponse.json({ success: true });
    response.cookies.set(`resume_refresh_skills`, "1", {
      path: "/",
      httpOnly: false,
    });

    return response;
  } catch (error) {
    console.error("Error saving skills:", error);
    return NextResponse.json(
      { error: "Failed to save skills" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { redisManager } from "@/libs/cache/redis/redis";

const userId = "user";

export async function GET() {
  try {
    const data = await redisManager.getData(`resume:languages:${userId}`);
    return NextResponse.json(data || { languages: [] });
  } catch (error) {
    console.error("Error fetching languages:", error);
    return NextResponse.json(
      { error: "Failed to fetch languages" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    await redisManager.setData(`resume:languages:${userId}`, body);
    
    const response = NextResponse.json({ success: true });
    response.cookies.set(`resume_refresh_languages`, "1", {
      path: "/",
      httpOnly: false,
    });

    return response;
  } catch (error) {
    console.error("Error saving languages:", error);
    return NextResponse.json(
      { error: "Failed to save languages" },
      { status: 500 }
    );
  }
}

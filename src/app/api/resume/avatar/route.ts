import { NextResponse } from "next/server";

// Functions

import { redisManager } from "@/libs/cache/redis/redis";

// Constants

const DEFAULT_AVATAR = { url: "", updatedAt: "" };

export async function GET() {
  try {
    const data = await redisManager.getData("resume:avatar:user");
    return NextResponse.json(data || DEFAULT_AVATAR);
  } catch (error) {
    console.error("Error getting avatar:", error);
    return NextResponse.json(DEFAULT_AVATAR);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await redisManager.setData("resume:avatar:user", {
      url: body.url,
      updatedAt: new Date().toISOString(),
    }as any);

    const response = NextResponse.json({ success: true });
    response.cookies.set("resume_refresh_avatar", "1", {
      path: "/",
      httpOnly: false,
    });

    return response;
  } catch (error) {
    console.error("Error saving avatar:", error);
    return NextResponse.json({ error: "Error in sava Avatar" }, { status: 500 });
  }
}

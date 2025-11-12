import { NextRequest, NextResponse } from "next/server";
import { redisManager } from "@/libs/cache/redis/redis";

const certifications = { certifications: [] };
const userId = "user";

export async function GET(req: NextRequest) {
  const data = await redisManager.getData(`resume:certifications:${userId}`);
  return NextResponse.json(data || certifications);
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    await redisManager.setData(`resume:certifications:${userId}`, body);

    const response = NextResponse.json({ success: true });
    response.cookies.set("resume_refresh_certifications", "1", {
      path: "/",
      httpOnly: false,
    });

    return response;
  } catch (error) {
    console.error("Error saving certifications:", error);
    return NextResponse.json(
      { error: "Failed to save certifications" },
      { status: 500 }
    );
  }
}

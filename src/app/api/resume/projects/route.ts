import { NextResponse } from "next/server";

// Functions

import { redisManager } from "@/libs/cache/redis/redis";

const userId = "user";

const DEFAULT_PROJECTS = { projects: [] };

export async function GET(req: Request) {
  try {
    const data = await redisManager.getData(`resume:projects:${userId}`);
    return NextResponse.json(data || DEFAULT_PROJECTS);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    await redisManager.setData(`resume:projects:${userId}`, body);
    const response = NextResponse.json({ success: true });
    response.cookies.set(`resume_refresh_projects`, "1", {
      path: "/",
      httpOnly: false,
    });

    return response;
  } catch (error) {
    console.error("Error saving projects:", error);
    return NextResponse.json(
      { error: "Failed to save projects" },
      { status: 500 }
    );
  }
}

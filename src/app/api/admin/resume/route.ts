import { NextResponse } from "next/server";

// Functions

import { getData, setData } from "@/libs/cache/redis/redis";

// Interfaces

import { UpdateResumeRequest } from "@/Interfaces/portfolio";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type");
    let body;

    if (contentType?.includes("application/json")) {
      body = await request.json().catch(() => null);
    }

    const resumeData = await getData(body?.table);

    return NextResponse.json(resumeData);
  } catch (error) {
    console.error("Error in resume API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function PUT(request: Request) {
  try {
    const body: UpdateResumeRequest = await request.json();
   
    const success = await setData(body.table, body.data);

    if (!success) {
      return NextResponse.json(
        { error: "Failed to update resume" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Resume updated successfully",
    });
  } catch (error) {
    console.error("Error updating resume:", error);
    return NextResponse.json(
      { error: "Failed to update resume" },
      { status: 500 }
    );
  }
}

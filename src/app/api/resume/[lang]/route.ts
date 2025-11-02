import { NextResponse } from "next/server";
import { getResumeByLanguage } from "@/libs/cache/redis/redis";

import { languages, type Lang } from "@/configs/language";

export async function POST(
  request: Request,
  { params }: { params: { lang: string } }
) {
  const resolvedParams = await params;
  const lang =
    resolvedParams.lang in languages ? (resolvedParams.lang as Lang) : "en";
  try {
    const resume = await getResumeByLanguage(lang, "user");

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    return NextResponse.json(resume);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch resume" },
      { status: 500 }
    );
  }
}

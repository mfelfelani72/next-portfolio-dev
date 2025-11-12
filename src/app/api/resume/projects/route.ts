import { NextResponse } from "next/server";

// Functions

import { redisManager } from "@/libs/cache/redis/redis";

// Interfaces

import { languages, type Lang } from "@/configs/language";

const DEFAULT_PROJECTS = { projects: [] };

export async function GET(
  req: Request,
  { params }: { params: { lang: string } }
) {
 const resolvedParams = await params;
  const lang =
    resolvedParams.lang in languages ? (resolvedParams.lang as Lang) : "en";
  const data = await redisManager.getResumeByLanguage(
    lang,
    `resume:projects:${lang}:user`
  );
  return NextResponse.json(data || DEFAULT_PROJECTS);
}

export async function PUT(
  req: Request,
  { params }: { params: { lang: string } }
) {
  const resolvedParams = await params;
  const lang =
    resolvedParams.lang in languages ? (resolvedParams.lang as Lang) : "en";
  const body = await req.json();
  await redisManager.setData(`resume:projects:${lang}:user`, { [lang]: body });
  return NextResponse.json({ success: true });
}

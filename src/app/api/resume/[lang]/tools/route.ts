import { NextResponse } from "next/server";

// Functions

import { redisManager } from "@/libs/cache/redis/redis";

// Interfaces

import { languages, type Lang } from "@/configs/language";

const DEFAULT_TOOLS = { tools: [], certifications: [] };

export async function GET(
  req: Request,
  { params }: { params: { lang: string } }
) {
  const resolvedParams = await params;
  const lang =
    resolvedParams.lang in languages ? (resolvedParams.lang as Lang) : "en";
  const data = await redisManager.getDataByLanguage(
    lang,
    `resume:tools:${lang}:user`
  );
  return NextResponse.json(data || DEFAULT_TOOLS);
}

export async function PUT(
  req: Request,
  { params }: { params: { lang: string } }
) {
  const resolvedParams = await params;
  const lang =
    resolvedParams.lang in languages ? (resolvedParams.lang as Lang) : "en";
  const body = await req.json();
  await redisManager.setData(`resume:tools:${lang}:user`, { [lang]: body });
  return NextResponse.json({ success: true });
}

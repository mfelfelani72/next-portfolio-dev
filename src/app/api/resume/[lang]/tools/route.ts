import { NextResponse } from "next/server";
import { redisManager } from "@/libs/cache/redis/redis";

const DEFAULT_TOOLS = { tools: [], certifications: [] };

export async function GET(req: Request, { params }: { params: { lang: string } }) {
  const lang = params.lang || "en";
  const data = await redisManager.getResumeByLanguage(lang, `resume:tools:${lang}:user`);
  return NextResponse.json(data || DEFAULT_TOOLS);
}

export async function PUT(req: Request, { params }: { params: { lang: string } }) {
  const lang = params.lang || "en";
  const body = await req.json();
  await redisManager.setData(`resume:tools:${lang}:user`, { [lang]: body });
  return NextResponse.json({ success: true });
}

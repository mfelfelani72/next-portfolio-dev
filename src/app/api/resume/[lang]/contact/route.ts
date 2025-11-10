import { NextResponse } from "next/server";
import { redisManager } from "@/libs/cache/redis/redis";

const DEFAULT_CONTACT = { email: "", linkedin: "", github: "" };

export async function GET(req: Request, { params }: { params: { lang: string } }) {
  const lang = params.lang || "en";
  const data = await redisManager.getResumeByLanguage(lang, `resume:contact:${lang}:user`);
  return NextResponse.json(data || DEFAULT_CONTACT);
}

export async function PUT(req: Request, { params }: { params: { lang: string } }) {
  const lang = params.lang || "en";
  const body = await req.json();
  await redisManager.setData(`resume:contact:${lang}:user`, { [lang]: body });
  return NextResponse.json({ success: true });
}

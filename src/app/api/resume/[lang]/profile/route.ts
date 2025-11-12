import { NextRequest, NextResponse } from "next/server";
import { redisManager } from "@/libs/cache/redis/redis";
import { languages, type Lang } from "@/configs/language";

const DEFAULT_PROFILE = { name: "", title: "", summary: "", avatar: "" };

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ lang: string }> }
) {
  const { lang } = await context.params;
  const resolvedLang = lang in languages ? (lang as Lang) : "en";

  const data = await redisManager.getDataByLanguage(
    resolvedLang,
    `resume:profile:${resolvedLang}:user`
  );

  return NextResponse.json(data || DEFAULT_PROFILE);
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ lang: string }> }
) {
  const { lang } = await context.params;
  const resolvedLang = lang in languages ? (lang as Lang) : "en";

  const body = await req.json();
  await redisManager.setData(`resume:profile:${resolvedLang}:user`, {
    [resolvedLang]: body,
  });

  const response = NextResponse.json({ success: true });
  response.cookies.set(`resume_refresh_${resolvedLang}`, "1", {
    path: "/",
    httpOnly: false,
  });

  return response;
}

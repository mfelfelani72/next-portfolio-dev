import { NextResponse } from 'next/server';
import { getResumeByLanguage } from '@/libs/cache/redis/redis';

export async function POST(
  request: Request,
  { params }: { params: { lang: string } }
) {
  try {
    const { lang } = params;
    const resume = await getResumeByLanguage(lang);
    
    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }
    
    return NextResponse.json(resume);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch resume' }, { status: 500 });
  }
}
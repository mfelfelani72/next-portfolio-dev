import { NextResponse } from 'next/server';
import { getResumeByLanguage, initializeDefaultData } from '@/libs/redis/redis';

export async function GET(
  request: Request,
  { params }: { params: { lang: string } }
) {
  try {
    const { lang } = params;
    
    await initializeDefaultData();
    
    const resume = await getResumeByLanguage(lang);
    
    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }
    
    return NextResponse.json(resume);
  } catch (error) {
    console.error('Error in resume API:', error);
    return NextResponse.json({ error: 'Failed to fetch resume' }, { status: 500 });
  }
}
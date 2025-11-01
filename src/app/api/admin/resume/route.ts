import { NextResponse } from 'next/server';
import { getResumeData, setResumeData } from '@/libs/cache/redis/redis';
import { MultiLanguageResume } from '@/Interfaces/portfolio';

export async function GET() {
  try {
    const resumeData = await getResumeData();
    
    if (!resumeData) {
      return NextResponse.json({ error: 'Data not found' }, { status: 404 });
    }
    
    return NextResponse.json(resumeData);
  } catch (error) {
    console.error('Error in admin resume API:', error);
    return NextResponse.json({ error: 'Failed to fetch resume data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body: MultiLanguageResume = await request.json();
    console.log(body)
    
    const success = await setResumeData(body);
    
    if (!success) {
      return NextResponse.json({ error: 'Failed to update resume' }, { status: 500 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Resume updated successfully' 
    });
  } catch (error) {
    console.error('Error updating resume:', error);
    return NextResponse.json({ error: 'Failed to update resume' }, { status: 500 });
  }
}
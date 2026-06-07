import { NextRequest, NextResponse } from 'next/server';
import { generateImage } from '@/lib/replicate';

export async function POST(request: NextRequest) {
  try {
    const { prompt, style } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const imageUrl = await generateImage(
      { prompt, style },
      (status) => console.log('Generation status:', status)
    );

    return NextResponse.json({
      success: true,
      imageUrl,
    });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed' },
      { status: 500 }
    );
  }
}

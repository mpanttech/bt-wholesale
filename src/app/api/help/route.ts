import { NextResponse } from 'next/server';
import helpContent from '@/content/help-content.json';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json(helpContent);
}

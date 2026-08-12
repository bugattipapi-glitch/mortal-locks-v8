import { NextResponse } from 'next/server';
import { demoScores } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  // This route is intentionally the seam for the future score provider.
  // The public ticker never needs to know which provider is behind it.
  return NextResponse.json({
    mode: 'demo',
    updatedAt: new Date().toISOString(),
    scores: demoScores
  });
}

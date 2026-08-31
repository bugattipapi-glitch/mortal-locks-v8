import { NextResponse } from 'next/server';
import { buildDisplayFeed } from '../../../lib/display-feed';
import { getRuntimeSnapshot } from '../../../lib/runtime-data';

export const dynamic = 'force-dynamic';

export async function GET() {
  const feed = buildDisplayFeed(await getRuntimeSnapshot());
  return NextResponse.json(feed, {
    headers: {
      'Cache-Control': 'public, max-age=30, s-maxage=30, stale-while-revalidate=30',
    },
  });
}

import { NextResponse } from 'next/server';
import { buildDisplayFeed } from '../../../lib/display-feed';
import { getPublicRuntimeSnapshot } from '../../../lib/runtime-cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  const feed = buildDisplayFeed(await getPublicRuntimeSnapshot());
  return NextResponse.json(feed, {
    headers: {
      'Cache-Control': 'public, max-age=30, s-maxage=30, stale-while-revalidate=30',
    },
  });
}

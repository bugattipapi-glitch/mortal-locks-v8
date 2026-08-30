import { NextResponse } from 'next/server';
import { isCommissioner } from '../../../../lib/auth';
import { getRuntimeSnapshot } from '../../../../lib/runtime-data';
import { searchScheduleCandidates, weekDateRange } from '../../../../lib/score-feed';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  if (!(await isCommissioner())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const url = new URL(request.url);
  const query = (url.searchParams.get('q') ?? '').trim().slice(0, 60);
  const week = Number(url.searchParams.get('week'));
  if (query.length < 2 || !Number.isInteger(week) || week < 1 || week > 18) {
    return NextResponse.json({ candidates: [] });
  }
  const snapshot = await getRuntimeSnapshot();
  try {
    const candidates = await searchScheduleCandidates(query, snapshot.season.startDate, week);
    return NextResponse.json({ candidates, range: weekDateRange(snapshot.season.startDate, week) });
  } catch (error) {
    console.error('Mortal Locks game search failed:', error);
    return NextResponse.json({ error: 'The schedule feed did not respond.' }, { status: 502 });
  }
}

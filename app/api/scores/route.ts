import { NextResponse } from 'next/server';
import { getRuntimeSnapshot } from '../../../lib/runtime-data';
import { getPickedGameScores } from '../../../lib/score-feed';

export const dynamic = 'force-dynamic';

export async function GET() {
  const updatedAt = new Date().toISOString();
  const snapshot = await getRuntimeSnapshot();
  const currentPicks = snapshot.picks.filter((pick) => pick.week === snapshot.season.currentWeek);
  if (!currentPicks.length) return NextResponse.json({ mode: 'awaiting-picks', updatedAt, scores: [] });
  try {
    const scores = await getPickedGameScores(currentPicks, snapshot.season.startDate, snapshot.season.currentWeek);
    return NextResponse.json({ mode: scores.length ? 'live' : 'awaiting-match', updatedAt, scores });
  } catch (error) {
    console.error('Mortal Locks score feed unavailable:', error);
    return NextResponse.json({ mode: 'provider-error', updatedAt, scores: [] }, { status: 503 });
  }
}

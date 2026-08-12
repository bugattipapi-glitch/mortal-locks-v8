import { NextResponse } from 'next/server';
import { demoScores } from '../../../lib/data';
import { getRuntimeSnapshot } from '../../../lib/runtime-data';
import { getPickedGameScores } from '../../../lib/score-feed';

export const dynamic = 'force-dynamic';

export async function GET() {
  const updatedAt = new Date().toISOString();
  const snapshot = await getRuntimeSnapshot();
  const currentPicks = snapshot.picks.filter((pick) => pick.week === snapshot.season.currentWeek);
  if (!currentPicks.length) return NextResponse.json({ mode: 'demo', updatedAt, scores: demoScores });
  try {
    const scores = await getPickedGameScores(currentPicks);
    return NextResponse.json({ mode: scores.length ? 'live' : 'awaiting-match', updatedAt, scores });
  } catch (error) {
    console.error('Mortal Locks score feed fallback:', error);
    return NextResponse.json({ mode: 'provider-fallback', updatedAt, scores: demoScores });
  }
}

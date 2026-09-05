import { NextResponse } from 'next/server';
import { getWatchedTeamGames } from '../../../../lib/score-feed';

export const dynamic = 'force-dynamic';

function phoenixDate() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Phoenix',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? '';
  return `${value('year')}-${value('month')}-${value('day')}`;
}

export async function GET(request: Request) {
  const requestedDate = new URL(request.url).searchParams.get('date');
  const date = requestedDate && /^\d{4}-\d{2}-\d{2}$/.test(requestedDate) ? requestedDate : phoenixDate();
  try {
    const games = await getWatchedTeamGames(date);
    return NextResponse.json(
      { schemaVersion: 1, date, timeZone: 'America/Phoenix', updatedAt: new Date().toISOString(), games },
      { headers: { 'Cache-Control': 'public, max-age=5, s-maxage=15, stale-while-revalidate=15' } },
    );
  } catch (error) {
    console.error('Watched-team score feed unavailable:', error);
    return NextResponse.json(
      { schemaVersion: 1, date, timeZone: 'America/Phoenix', updatedAt: new Date().toISOString(), games: [] },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}

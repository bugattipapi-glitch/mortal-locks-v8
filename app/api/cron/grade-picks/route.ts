import { syncCompletedPicks } from '../../../../lib/score-sync';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return Response.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const sync = await syncCompletedPicks();
    return Response.json({ ok: true, ...sync });
  } catch (error) {
    console.error('Automatic Mortal Locks grading failed:', error);
    return Response.json({ ok: false, error: 'Score sync failed.' }, { status: 500 });
  }
}

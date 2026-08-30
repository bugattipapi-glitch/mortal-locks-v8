import { revalidatePath } from 'next/cache';
import { applyRuntimePickGrades, getRuntimeSnapshot } from './runtime-data';
import { getCompletedPickGrades } from './score-feed';

export type ScoreSyncResult = {
  checked: number;
  matched: number;
  updated: number;
  unsupported: number;
  grades: Array<{ player: string; week: number; slot: number; result: 'W' | 'L' | 'P'; finalScore: string }>;
};

export async function syncCompletedPicks(now = new Date()): Promise<ScoreSyncResult> {
  const snapshot = await getRuntimeSnapshot();
  if (snapshot.dataMode !== 'database') throw new Error('The live database is unavailable.');
  const pending = snapshot.picks.filter((pick) => pick.result === 'PENDING' || pick.result === 'LIVE');
  const grades = await getCompletedPickGrades(pending, snapshot.season.startDate);
  const updated = await applyRuntimePickGrades(grades.map(({ pick, result }) => ({
    seasonNumber: pick.seasonNumber,
    week: pick.week,
    playerSlug: pick.playerSlug,
    slot: pick.slot,
    result,
  })));
  if (updated) {
    revalidatePath('/');
    revalidatePath('/season');
    revalidatePath('/admin');
  }
  return {
    checked: pending.length,
    matched: grades.length,
    updated,
    unsupported: pending.filter((pick) => !pick.eventId && pick.period !== 'FULL').length,
    grades: grades.map(({ pick, result, finalScore }) => ({
      player: pick.playerName,
      week: pick.week,
      slot: pick.slot,
      result,
      finalScore,
    })),
  };
}

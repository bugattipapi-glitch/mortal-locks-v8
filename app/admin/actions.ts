'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { closeCommissionerSession, openCommissionerSession, requireCommissioner } from '../../lib/auth';
import {
  addRuntimeDeadTeam,
  addRuntimeLockOff,
  addRuntimePlayer,
  deleteRuntimeDeadTeam,
  deleteRuntimeLockOff,
  deleteRuntimePick,
  overrideRuntimeResult,
  resetRuntimeSeason,
  setRuntimePlayerActive,
  updateSeason,
  upsertRuntimePick,
  upsertRuntimePicks,
} from '../../lib/runtime-data';
import { type Period, type Result, type Sport } from '../../lib/data';
import { syncCompletedPicks } from '../../lib/score-sync';

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? '').trim();
}

function integer(formData: FormData, key: string, min: number, max: number) {
  const number = Number(value(formData, key));
  if (!Number.isInteger(number) || number < min || number > max) throw new Error(`Invalid ${key}.`);
  return number;
}

function refreshPublicPages() {
  revalidatePath('/');
  revalidatePath('/season');
  revalidatePath('/admin');
}

export async function loginAction(formData: FormData) {
  const accepted = await openCommissionerSession(value(formData, 'password'));
  if (!accepted) redirect('/admin/login?error=1');
  redirect('/admin');
}

export async function logoutAction() {
  await closeCommissionerSession();
  redirect('/admin/login');
}

export async function saveSeasonAction(formData: FormData) {
  await requireCommissioner();
  const title = value(formData, 'title');
  const startDate = value(formData, 'startDate');
  const status = value(formData, 'status').toUpperCase();
  if (!title || !/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !status) throw new Error('Season setup is incomplete.');
  await updateSeason({
    number: integer(formData, 'number', 1, 99),
    title: title.slice(0, 80),
    startDate,
    currentWeek: integer(formData, 'currentWeek', 1, 18),
    status: status.slice(0, 30),
  });
  refreshPublicPages();
  redirect('/admin?notice=season-saved');
}

export async function resetSeasonAction(formData: FormData) {
  await requireCommissioner();
  await resetRuntimeSeason(integer(formData, 'seasonNumber', 1, 99));
  refreshPublicPages();
  redirect('/admin?notice=season-reset');
}

export async function addPlayerAction(formData: FormData) {
  await requireCommissioner();
  const name = value(formData, 'name').replace(/\s+/g, ' ');
  if (name.length < 2 || name.length > 40) throw new Error('Player name must be 2–40 characters.');
  await addRuntimePlayer(name);
  refreshPublicPages();
  redirect('/admin?notice=player-added');
}

export async function setPlayerActiveAction(formData: FormData) {
  await requireCommissioner();
  const slug = value(formData, 'slug');
  if (!/^[a-z0-9-]+$/.test(slug)) throw new Error('Invalid player.');
  await setRuntimePlayerActive(slug, value(formData, 'active') === 'true');
  refreshPublicPages();
  redirect('/admin?notice=roster-updated');
}

export async function savePickAction(formData: FormData) {
  await requireCommissioner();
  const playerSlug = value(formData, 'playerSlug');
  const sport = value(formData, 'sport') as Sport;
  const period = value(formData, 'period') as Period;
  const game = value(formData, 'game').replace(/\s+/g, ' ');
  const bet = value(formData, 'bet').replace(/\s+/g, ' ');
  if (!/^[a-z0-9-]+$/.test(playerSlug)) throw new Error('Invalid player.');
  if (!['CFB', 'NFL'].includes(sport)) throw new Error('Invalid sport.');
  if (!['FULL', '1H', '1Q'].includes(period)) throw new Error('Invalid period.');
  if (game.length < 3 || game.length > 120 || bet.length < 2 || bet.length > 120) throw new Error('Game and pick text are required.');
  if (/\b(OSU|USC|MSU)\b/i.test(`${game} ${bet}`)) throw new Error('Spell out ambiguous team abbreviations before saving.');
  await upsertRuntimePick({
    seasonNumber: integer(formData, 'seasonNumber', 1, 99),
    week: integer(formData, 'week', 1, 18),
    playerSlug,
    slot: integer(formData, 'slot', 1, 2) as 1 | 2,
    sport,
    game,
    bet,
    period,
    force: value(formData, 'force') === 'on',
    commentary: value(formData, 'commentary').slice(0, 80).toUpperCase(),
  });
  refreshPublicPages();
  redirect('/admin?notice=pick-saved');
}

export async function saveParsedPicksAction(formData: FormData) {
  await requireCommissioner();
  const payload = value(formData, 'payload');
  const seasonNumber = integer(formData, 'seasonNumber', 1, 99);
  const week = integer(formData, 'week', 1, 18);
  let picks: Array<{
    playerSlug: string;
    slot: 1 | 2;
    sport: Sport;
    period: Period;
    game: string;
    bet: string;
    commentary?: string;
  }>;
  try {
    picks = JSON.parse(payload) as typeof picks;
  } catch {
    throw new Error('The text-pick batch could not be read.');
  }
  if (!Array.isArray(picks) || !picks.length || picks.length > 36) throw new Error('The text-pick batch is empty or too large.');
  const seen = new Set<string>();
  const validated = [];
  for (const pick of picks) {
    const key = `${pick.playerSlug}:${pick.slot}`;
    if (seen.has(key)) throw new Error(`Duplicate player/slot in the batch: ${key}.`);
    seen.add(key);
    if (!/^[a-z0-9-]+$/.test(pick.playerSlug)) throw new Error('Invalid player in parsed picks.');
    if (![1, 2].includes(pick.slot) || !['CFB', 'NFL'].includes(pick.sport) || !['FULL', '1H', '1Q'].includes(pick.period)) throw new Error('Invalid parsed pick fields.');
    const game = String(pick.game ?? '').trim().replace(/\s+/g, ' ');
    const bet = String(pick.bet ?? '').trim().replace(/\s+/g, ' ');
    if (game.length < 3 || game.length > 120 || bet.length < 2 || bet.length > 120) throw new Error('Each parsed row needs a valid game and pick.');
    if (/\b(OSU|USC|MSU)\b/i.test(`${game} ${bet}`)) throw new Error('Spell out ambiguous team abbreviations before saving.');
    validated.push({
      seasonNumber,
      week,
      playerSlug: pick.playerSlug,
      slot: pick.slot,
      sport: pick.sport,
      period: pick.period,
      game,
      bet,
      force: false,
      commentary: String(pick.commentary ?? '').slice(0, 80).toUpperCase(),
    });
  }
  await upsertRuntimePicks(validated);
  refreshPublicPages();
  redirect('/admin?notice=text-picks-saved');
}

export async function overrideResultAction(formData: FormData) {
  await requireCommissioner();
  const resultChoice = value(formData, 'result');
  const seasonNumber = integer(formData, 'seasonNumber', 1, 99);
  const week = integer(formData, 'week', 1, 18);
  const playerSlug = value(formData, 'playerSlug');
  const slot = integer(formData, 'slot', 1, 2);
  if (!/^[a-z0-9-]+$/.test(playerSlug)) throw new Error('Invalid player.');
  if (resultChoice === 'DELETE') {
    await deleteRuntimePick({ seasonNumber, week, playerSlug, slot });
    refreshPublicPages();
    redirect('/admin?notice=pick-deleted');
  }
  const result = resultChoice as Result;
  if (!['W', 'L', 'P', 'PENDING', 'LIVE'].includes(result)) throw new Error('Invalid result.');
  const commentary = value(formData, 'commentary').slice(0, 80).toUpperCase();
  await overrideRuntimeResult({
    seasonNumber,
    week,
    playerSlug,
    slot,
    result,
    commentary,
  });
  refreshPublicPages();
  redirect('/admin?notice=result-saved');
}

export async function syncScoresAction() {
  await requireCommissioner();
  let result: Awaited<ReturnType<typeof syncCompletedPicks>>;
  try {
    result = await syncCompletedPicks();
  } catch (error) {
    console.error('Manual score sync failed.', error);
    redirect('/admin?notice=scores-sync-failed');
  }
  refreshPublicPages();
  redirect(`/admin?notice=scores-synced-${result.updated}-${result.matched}`);
}

export async function addDeadTeamAction(formData: FormData) {
  await requireCommissioner();
  const teamName = value(formData, 'teamName').replace(/\s+/g, ' ').slice(0, 28).toUpperCase();
  const reason = value(formData, 'reason').replace(/\s+/g, ' ').slice(0, 54).toUpperCase();
  if (teamName.length < 2 || reason.length < 2) throw new Error('Dead team name and reason are required.');
  await addRuntimeDeadTeam({ seasonNumber: integer(formData, 'seasonNumber', 1, 99), teamName, reason });
  refreshPublicPages();
  redirect('/admin?notice=dead-team-added');
}

export async function deleteDeadTeamAction(formData: FormData) {
  await requireCommissioner();
  await deleteRuntimeDeadTeam({
    id: integer(formData, 'id', 1, 2147483647),
    seasonNumber: integer(formData, 'seasonNumber', 1, 99),
  });
  refreshPublicPages();
  redirect('/admin?notice=dead-team-removed');
}

export async function addLockOffAction(formData: FormData) {
  await requireCommissioner();
  const sideA = value(formData, 'sideA').replace(/\s+/g, ' ').slice(0, 48).toUpperCase();
  const sideB = value(formData, 'sideB').replace(/\s+/g, ' ').slice(0, 48).toUpperCase();
  const note = value(formData, 'note').replace(/\s+/g, ' ').slice(0, 60).toUpperCase();
  if (sideA.length < 2 || sideB.length < 2 || note.length < 2) throw new Error('Both lock-off sides and a call are required.');
  await addRuntimeLockOff({
    seasonNumber: integer(formData, 'seasonNumber', 1, 99),
    week: integer(formData, 'week', 1, 18),
    sideA,
    sideB,
    note,
  });
  refreshPublicPages();
  redirect('/admin?notice=lock-off-added');
}

export async function deleteLockOffAction(formData: FormData) {
  await requireCommissioner();
  await deleteRuntimeLockOff({
    id: integer(formData, 'id', 1, 2147483647),
    seasonNumber: integer(formData, 'seasonNumber', 1, 99),
  });
  refreshPublicPages();
  redirect('/admin?notice=lock-off-removed');
}

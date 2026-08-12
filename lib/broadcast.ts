import type { RuntimePick, RuntimeSnapshot } from './runtime-data';

export type BroadcastRecap = {
  id: string;
  eyebrow: string;
  lines: string[];
};

const decided = new Set(['W', 'L', 'P']);

function preseasonRecap(snapshot: RuntimeSnapshot): BroadcastRecap {
  return {
    id: `season-${snapshot.season.number}-preseason`,
    eyebrow: 'ML8-TV · PRESEASON SPECIAL',
    lines: [
      'WELCOME TO THIS WEEK IN MORTAL LOCKS.',
      'LAST SEASON ENDED WITH AJ CROWNED LEAGUE CHAMPION.',
      'IT WAS A STUNNING TURNAROUND FROM THE YEARS BEFORE.',
      'THE TROPHY IS HIS. THE NEW BOARD IS CLEAN.',
      "THIS YEAR, IT'S ANYONE'S LOCKS TO WIN.",
    ],
  };
}

function joinNames(names: string[]) {
  if (names.length < 2) return names[0] ?? '';
  if (names.length === 2) return `${names[0]} AND ${names[1]}`;
  return `${names.slice(0, -1).join(', ')}, AND ${names.at(-1)}`;
}

function weeklyRecord(picks: RuntimePick[]) {
  return picks.reduce(
    (record, pick) => {
      if (pick.result === 'W') record.wins += 1;
      if (pick.result === 'L') record.losses += 1;
      if (pick.result === 'P') record.pushes += 1;
      return record;
    },
    { wins: 0, losses: 0, pushes: 0 },
  );
}

function featuredCalls(picks: RuntimePick[]) {
  const calls = new Map<string, string[]>();
  for (const pick of picks) {
    if (!pick.commentary) continue;
    const label = pick.commentary.trim().toUpperCase();
    calls.set(label, [...(calls.get(label) ?? []), pick.playerName]);
  }
  return [...calls].slice(0, 2).map(([label, names]) => `${joinNames([...new Set(names)])} GOT THE BOOTH CALL: ${label}.`);
}

export function buildBroadcastRecap(snapshot: RuntimeSnapshot): BroadcastRecap {
  const currentWeek = snapshot.season.currentWeek;
  const preseason = snapshot.season.status.toUpperCase() === 'PRESEASON';

  if (preseason) return preseasonRecap(snapshot);

  const lastCompletedWeek = snapshot.season.status.toUpperCase() === 'FINAL' ? currentWeek : currentWeek - 1;
  const completedWeeks = Array.from({ length: Math.max(0, lastCompletedWeek) }, (_, index) => lastCompletedWeek - index);
  const recapWeek = completedWeeks.find((week) => {
    const picks = snapshot.picks.filter((pick) => pick.week === week);
    return picks.length > 0 && picks.some((pick) => decided.has(pick.result));
  });
  if (!recapWeek) return preseasonRecap(snapshot);
  const picks = snapshot.picks.filter((pick) => pick.week === recapWeek);
  const record = weeklyRecord(picks);
  const playerResults = snapshot.players
    .map((player) => ({ player: player.name, picks: picks.filter((pick) => pick.playerSlug === player.slug) }))
    .map(({ player, picks: playerPicks }) => ({ player, ...weeklyRecord(playerPicks) }));
  const perfect = playerResults.filter((row) => row.wins === 2 && row.losses === 0).map((row) => row.player);
  const winless = playerResults.filter((row) => row.losses === 2 && row.wins === 0).map((row) => row.player);
  const calls = featuredCalls(picks);
  const lines = [`WELCOME TO THIS WEEK IN MORTAL LOCKS. WEEK ${recapWeek} WAS WILD...`];

  if (perfect.length) lines.push(`${joinNames(perfect)} SWEPT THE BOARD AT 2-0.`);
  if (winless.length) lines.push(`${joinNames(winless)} TOOK THE FULL 0-2 BROADCAST BEATING.`);
  lines.push(...calls);
  if (record.pushes) lines.push(`${record.pushes} PUSH${record.pushes === 1 ? '' : 'ES'} LEFT THE BOOTH WITH NOTHING BUT STATIC.`);
  lines.push(`FINAL TAPE: ${record.wins} WINS, ${record.losses} LOSSES${record.pushes ? `, ${record.pushes} PUSH${record.pushes === 1 ? '' : 'ES'}` : ''}.`);

  return {
    id: `season-${snapshot.season.number}-week-${recapWeek}`,
    eyebrow: `ML8-TV · WEEK ${recapWeek} RECAP`,
    lines: lines.slice(0, 6),
  };
}

export type Streak = { direction: 'hot' | 'cold'; length: number };

export function calculatePlayerStreaks(snapshot: RuntimeSnapshot) {
  const byPlayer = new Map<string, Streak>();
  for (const player of snapshot.players) {
    const results = snapshot.picks
      .filter((pick) => pick.playerSlug === player.slug && (pick.result === 'W' || pick.result === 'L'))
      .sort((a, b) => b.week - a.week || b.slot - a.slot)
      .map((pick) => pick.result);
    if (!results.length) continue;
    const target = results[0];
    let length = 0;
    for (const result of results) {
      if (result !== target) break;
      length += 1;
    }
    if (length >= 3) byPlayer.set(player.name, { direction: target === 'W' ? 'hot' : 'cold', length });
  }
  return byPlayer;
}

import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

let source = await readFile(new URL('../lib/score-feed.ts', import.meta.url), 'utf8');
source = source
  .replace("import type { Period, Result, Sport } from './data';", "type Result = 'W' | 'L' | 'P' | 'PENDING' | 'LIVE'; type Period = 'FULL' | '1H' | '1Q'; type Sport = 'CFB' | 'NFL';")
  .replace("import type { RuntimePick } from './runtime-data';", 'type RuntimePick = any;')
  .replaceAll(/next: \{ revalidate(?:: [0-9_]+)? \},/g, '');
const checkDir = await mkdtemp(join(tmpdir(), 'ml8-score-feed-'));
const sourcePath = join(checkDir, 'score-feed.ts');
await writeFile(sourcePath, source);
const compile = spawnSync(process.execPath, [
  new URL('../node_modules/typescript/lib/tsc.js', import.meta.url).pathname,
  sourcePath,
  '--ignoreConfig',
  '--target',
  'ES2022',
  '--module',
  'ESNext',
  '--skipLibCheck',
  '--outDir',
  checkDir,
], { encoding: 'utf8' });
if (compile.status !== 0) throw new Error(compile.stderr || compile.stdout || 'Score-feed test compile failed.');
const { scoreFeedInternals } = await import(`file://${join(checkDir, 'score-feed.js')}?${Date.now()}`);

function pick(bet, game = 'Green Bay Packers at Pittsburgh Steelers') {
  return {
    seasonNumber: 8,
    week: 1,
    playerSlug: 'jay',
    playerName: 'Jay',
    slot: 2,
    sport: 'NFL',
    game,
    bet,
    result: 'PENDING',
    period: 'FULL',
    force: false,
    manualOverride: false,
    commentary: '',
    updatedAt: '',
  };
}

function event(awayScore, homeScore, completed = true, options = {}) {
  const away = options.away ?? { displayName: 'Green Bay Packers', shortDisplayName: 'Packers', abbreviation: 'GB' };
  const home = options.home ?? { displayName: 'Pittsburgh Steelers', shortDisplayName: 'Steelers', abbreviation: 'PIT' };
  return {
    id: options.id ?? '401999999',
    name: options.name ?? `${away.displayName} at ${home.displayName}`,
    competitions: [{
      status: { type: { state: completed ? 'post' : 'in', completed } },
      competitors: [
        { homeAway: 'away', score: String(awayScore), linescores: options.awayLinescores, team: away },
        { homeAway: 'home', score: String(homeScore), linescores: options.homeLinescores, team: home },
      ],
    }],
  };
}

const bearsTitans = event(21, 20, false, {
  id: '401874394',
  away: { displayName: 'Chicago Bears', shortDisplayName: 'Bears', abbreviation: 'CHI' },
  home: { displayName: 'Tennessee Titans', shortDisplayName: 'Titans', abbreviation: 'TEN' },
});
const hawaiiStanford = event(28, 21, true, {
  id: '401858201',
  away: { displayName: "Hawai'i Rainbow Warriors", shortDisplayName: "Hawai'i", abbreviation: 'HAW' },
  home: { displayName: 'Stanford Cardinal', shortDisplayName: 'Stanford', abbreviation: 'STAN' },
});
const uncTcu = event(24, 31, true, {
  id: '401856766',
  away: { displayName: 'North Carolina Tar Heels', shortDisplayName: 'North Carolina', abbreviation: 'UNC' },
  home: { displayName: 'TCU Horned Frogs', shortDisplayName: 'TCU', abbreviation: 'TCU' },
});

assert.equal(scoreFeedInternals.matchesPick(event(20, 20), pick('Over 37.5')), true);
assert.equal(scoreFeedInternals.gradeCompletedEvent(event(20, 20), pick('Over 37.5')).result, 'W');
assert.equal(scoreFeedInternals.gradeCompletedEvent(event(17, 20), pick('O37.5')).result, 'L');
assert.equal(scoreFeedInternals.gradeCompletedEvent(event(17, 20), pick('Under 37')).result, 'P');
assert.equal(scoreFeedInternals.gradeCompletedEvent(event(21, 17), pick('Packers -3.5')).result, 'W');
assert.equal(scoreFeedInternals.gradeCompletedEvent(event(20, 24), pick('Steelers -3.5')).result, 'W');
assert.equal(scoreFeedInternals.gradeCompletedEvent(event(20, 20, false), pick('Over 37.5')), null);
assert.equal(scoreFeedInternals.matchesPick(event(20, 20), pick('Over 37.5', 'Detroit Lions at Cincinnati Bengals')), false);
assert.equal(scoreFeedInternals.matchesPick(bearsTitans, pick('Titans U36.5', 'Bears')), true);
assert.equal(scoreFeedInternals.matchesPick(hawaiiStanford, pick('Stanford Hawaii +4', 'Hawaii')), true);
assert.equal(scoreFeedInternals.matchesPick(uncTcu, pick('UNC TCU -8.5', 'TCU')), true);
assert.equal(scoreFeedInternals.gradeCompletedEvent(hawaiiStanford, pick('Stanford Hawaii +4', 'Hawaii')).result, 'W');
assert.equal(scoreFeedInternals.gradeCompletedEvent(uncTcu, pick('UNC TCU -8.5', 'TCU')).result, 'L');

const virginiaNcState = event(8, 34, true, {
  id: '401858202',
  away: { id: '152', displayName: 'NC State Wolfpack', shortDisplayName: 'NC State', abbreviation: 'NCSU' },
  home: { id: '258', displayName: 'Virginia Cavaliers', shortDisplayName: 'Virginia', abbreviation: 'UVA' },
});
assert.equal(scoreFeedInternals.gradeCompletedEvent(virginiaNcState, pick('NC State, Virginia -4', 'Virginia')).result, 'W');

const nmsuFsu = event(17, 34, true, {
  id: '401864570',
  away: { id: '166', displayName: 'New Mexico State Aggies', shortDisplayName: 'New Mexico State', abbreviation: 'NMSU' },
  home: { id: '52', displayName: 'Florida State Seminoles', shortDisplayName: 'Florida State', abbreviation: 'FSU' },
});
const jacksonvilleNdsu = event(7, 33, true, {
  id: '401864577',
  away: { id: '55', displayName: 'Jacksonville State Gamecocks', shortDisplayName: 'Jacksonville State', abbreviation: 'JVST' },
  home: { id: '2449', displayName: 'North Dakota State Bison', shortDisplayName: 'North Dakota State', abbreviation: 'NDSU' },
});
const jayPick = pick('Florida State, NM State +31', 'NM State');
assert.deepEqual(scoreFeedInternals.matchingEventsForPick([jacksonvilleNdsu, nmsuFsu], jayPick).map(({ id }) => id), ['401864570']);
assert.equal(scoreFeedInternals.gradeCompletedEvent(nmsuFsu, jayPick).result, 'W');

const periodGame = event(17, 34, true, {
  id: 'period-test',
  awayLinescores: [{ period: 1, value: 3 }, { period: 2, value: 7 }, { period: 3, value: 7 }, { period: 4, value: 0 }],
  homeLinescores: [{ period: 1, value: 10 }, { period: 2, value: 7 }, { period: 3, value: 7 }, { period: 4, value: 10 }],
});
assert.equal(scoreFeedInternals.gradeCompletedEvent(periodGame, { ...pick('Packers +10'), period: '1Q' }).result, 'W');
assert.equal(scoreFeedInternals.gradeCompletedEvent(periodGame, { ...pick('Under 28'), period: '1H' }).result, 'W');

const structuredPick = {
  ...pick('Steelers ML'),
  eventId: '401999999',
  market: 'MONEYLINE',
  selectionSide: 'HOME',
  line: null,
};
assert.equal(scoreFeedInternals.gradeCompletedEvent(event(17, 20), structuredPick).result, 'W');
assert.deepEqual(scoreFeedInternals.weekDateRange('2026-08-29', 1), { startDate: '2026-08-25', endDate: '2026-08-31', query: '20260825-20260831' });

const texasSaturday = event(0, 0, false, {
  id: '401856667',
  away: { id: '326', displayName: 'Texas State Bobcats', shortDisplayName: 'Texas State', abbreviation: 'TXST' },
  home: { id: '251', displayName: 'Texas Longhorns', shortDisplayName: 'Texas', abbreviation: 'TEX' },
});
texasSaturday.date = '2026-09-05T19:30:00Z';
texasSaturday.competitions[0].status.type.state = 'pre';
texasSaturday.competitions[0].status.type.shortDetail = '9/5 - 12:30 PM MST';
const watchedSaturday = scoreFeedInternals.watchedGamesFromEvents('2026-09-05', [texasSaturday], []);
assert.deepEqual(watchedSaturday.map(({ key }) => key), ['texas']);
assert.equal(watchedSaturday[0].opponentAbbreviation, 'TXST');
assert.equal(watchedSaturday[0].startsAt, '2026-09-05T19:30:00Z');
assert.deepEqual(scoreFeedInternals.watchedGamesFromEvents('2026-09-07', [texasSaturday], []), []);

const singleTeamPick = pick('Under 40', 'Bears');
assert.deepEqual(scoreFeedInternals.matchingEventsForPick([bearsTitans, event(10, 10, false)], singleTeamPick).map(({ id }) => id), ['401874394']);
assert.deepEqual(scoreFeedInternals.matchingEventsForPick([
  bearsTitans,
  event(10, 10, false, {
    id: '401874395',
    away: { displayName: 'Chicago Bears', shortDisplayName: 'Bears', abbreviation: 'CHI' },
    home: { displayName: 'Detroit Lions', shortDisplayName: 'Lions', abbreviation: 'DET' },
  }),
], singleTeamPick), []);

console.log('Score feed checks passed: imported-pick matching, aliases, totals, spreads, pushes, uniqueness, and final-state gating.');
await rm(checkDir, { recursive: true, force: true });

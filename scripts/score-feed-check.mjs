import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

let source = await readFile(new URL('../lib/score-feed.ts', import.meta.url), 'utf8');
source = source
  .replace("import type { Result } from './data';", "type Result = 'W' | 'L' | 'P' | 'PENDING' | 'LIVE';")
  .replace("import type { RuntimePick } from './runtime-data';", 'type RuntimePick = any;')
  .replace("next: { revalidate: 30 },", '');
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
        { homeAway: 'away', score: String(awayScore), team: away },
        { homeAway: 'home', score: String(homeScore), team: home },
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

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
const compile = spawnSync(new URL('../node_modules/.bin/tsc', import.meta.url).pathname, [sourcePath, '--ignoreConfig', '--target', 'ES2022', '--module', 'ESNext', '--skipLibCheck', '--outDir', checkDir], { encoding: 'utf8' });
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

function event(awayScore, homeScore, completed = true) {
  return {
    id: '401999999',
    name: 'Green Bay Packers at Pittsburgh Steelers',
    competitions: [{
      status: { type: { state: completed ? 'post' : 'in', completed } },
      competitors: [
        { homeAway: 'away', score: String(awayScore), team: { displayName: 'Green Bay Packers', shortDisplayName: 'Packers', abbreviation: 'GB' } },
        { homeAway: 'home', score: String(homeScore), team: { displayName: 'Pittsburgh Steelers', shortDisplayName: 'Steelers', abbreviation: 'PIT' } },
      ],
    }],
  };
}

assert.equal(scoreFeedInternals.matchesPick(event(20, 20), pick('Over 37.5')), true);
assert.equal(scoreFeedInternals.gradeCompletedEvent(event(20, 20), pick('Over 37.5')).result, 'W');
assert.equal(scoreFeedInternals.gradeCompletedEvent(event(17, 20), pick('O37.5')).result, 'L');
assert.equal(scoreFeedInternals.gradeCompletedEvent(event(17, 20), pick('Under 37')).result, 'P');
assert.equal(scoreFeedInternals.gradeCompletedEvent(event(21, 17), pick('Packers -3.5')).result, 'W');
assert.equal(scoreFeedInternals.gradeCompletedEvent(event(20, 24), pick('Steelers -3.5')).result, 'W');
assert.equal(scoreFeedInternals.gradeCompletedEvent(event(20, 20, false), pick('Over 37.5')), null);
assert.equal(scoreFeedInternals.matchesPick(event(20, 20), pick('Over 37.5', 'Detroit Lions at Cincinnati Bengals')), false);

console.log('Score feed checks passed: matching, totals, spreads, pushes, and final-state gating.');
await rm(checkDir, { recursive: true, force: true });

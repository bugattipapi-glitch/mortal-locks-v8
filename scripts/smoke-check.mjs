import { existsSync, readFileSync } from 'node:fs';
import { dirname, extname, resolve } from 'node:path';

const required = [
  'app/layout.tsx',
  'app/page.tsx',
  'app/admin/page.tsx',
  'app/admin/actions.ts',
  'app/admin/login/page.tsx',
  'app/season/page.tsx',
  'app/archives/page.tsx',
  'app/hall-of-fame/page.tsx',
  'app/hall-of-fame/all-time/page.tsx',
  'app/hall-of-fame/trophy-room/page.tsx',
  'app/hall-of-fame/tape-vault/page.tsx',
  'app/api/scores/route.ts',
  'app/api/display/route.ts',
  'app/api/display/picks/route.tsx',
  'app/api/display/ticker/route.ts',
  'app/api/admin/games/route.ts',
  'app/api/cron/grade-picks/route.ts',
  'components/SiteShell.tsx',
  'components/BroadcastLauncher.tsx',
  'components/BroadcastRecap.tsx',
  'components/HallTheme.tsx',
  'components/ScoreTicker.tsx',
  'components/StatusPill.tsx',
  'components/AdminDashboard.tsx',
  'components/GamePickEntry.tsx',
  'components/PlayerAvatar.tsx',
  'components/SeasonResetControl.tsx',
  'components/HallNav.tsx',
  'components/SeasonExplorer.tsx',
  'components/StandingsNavLink.tsx',
  'components/TapeVault.tsx',
  'lib/auth.ts',
  'lib/broadcast.ts',
  'lib/data.ts',
  'lib/hall-of-fame.ts',
  'lib/history.ts',
  'lib/runtime-data.ts',
  'lib/score-feed.ts',
  'lib/score-sync.ts',
  'lib/pick-text-parser.ts',
  'lib/pick-display.ts',
  'lib/display-feed.ts',
  'lib/pixel-gif.ts',
  'scripts/score-feed-check.mjs',
  'public/assets/booth-recap-a.jpg',
  'public/assets/booth-recap-b.jpg',
  'public/assets/booth-recap-gesture.jpg',
  'public/assets/mortal-locks-logo.png',
  'tsconfig.json',
  'package.json',
  'vercel.json'
];

let failed = false;
for (const file of required) {
  if (!existsSync(file)) {
    console.error(`MISSING: ${file}`);
    failed = true;
  }
}

const sourceFiles = required.filter((f) => ['.ts', '.tsx'].includes(extname(f)));
const importPattern = /from\s+['"](\.{1,2}\/[^'"]+)['"]/g;
const extensions = ['', '.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.tsx'];

for (const file of sourceFiles) {
  if (!existsSync(file)) continue;
  const source = readFileSync(file, 'utf8');
  for (const match of source.matchAll(importPattern)) {
    const targetBase = resolve(dirname(file), match[1]);
    if (!extensions.some((suffix) => existsSync(`${targetBase}${suffix}`))) {
      console.error(`BROKEN IMPORT: ${file} -> ${match[1]}`);
      failed = true;
    }
  }
  if (source.includes("@/")) {
    console.error(`UNRESOLVED ALIAS LEFT IN: ${file}`);
    failed = true;
  }
}

const tsconfig = JSON.parse(readFileSync('tsconfig.json', 'utf8'));
if ('baseUrl' in (tsconfig.compilerOptions || {})) {
  console.error('TSCONFIG: baseUrl must not be present for TypeScript 6.');
  failed = true;
}

if (failed) process.exit(1);
console.log('Mortal Locks smoke check passed: required files, relative imports, and TS6-safe tsconfig are intact.');

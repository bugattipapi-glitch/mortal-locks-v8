# Mortal Locks VIII: The Ocho

Operating Season VIII site for the Mortal Locks football picking league.

## Implemented in this local build
- Responsive public-access-TV / NBA Jam inspired homepage
- Dense mobile weekly picks view for all 9 Season VII players
- Generic Pick 1 / Pick 2 model so Week 1 can be two college picks and late-season weeks can be two NFL picks
- Picked-games-only score ticker component that polls `/api/scores` every 60 seconds and supports manual refresh
- Live NFL/NCAAF score lookup that matches the current week's pending picks, with a demo preseason board when no picks exist
- Current-season history page with By Week / By Player views
- Official final records for Mortal Locks I–III plus 1,116 restored picks from Mortal Locks IV–VII
- Archive views by season/week/player plus raw all-time W-L-P board
- Password-protected commissioner controls for season settings, text/structured pick entry, roster management, manual grading and guarded test-season reset
- Conservative pick-entry preview that deliberately flags ambiguous aliases such as OSU, USC and MSU
- Expanded commentary library including SOME SPREAD, THE MIDDLE IS ALIVE, BACKDOOR COVER, BAD BEAT and more

## Commissioner operating guide

1. Open **COMMISSIONER** in the mobile footer, or **COMMISSIONER LOGIN** in the desktop footer, and enter the shared password.
2. Keep Broadcast Status on `PRESEASON` during testing. It controls the header/recap presentation; score lookup works in every status.
3. Enter two picks per player with full team names. The ticker checks current-week pending picks against NFL and college scoreboards every 60 seconds.
4. Grade completed picks in **Result Override**. Scores are automatic, but grading stays manual because free-form picks may contain spreads, totals, first-half/quarter lines and pushes.
5. Advance Current Week only after the prior week is graded. That unlocks the new weekly recap generated from results and Booth Calls.
6. After the preseason test, use **Reset Season 8 Test Data**. Its second confirmation deletes only Season 8 picks/results and restores Week 1 + PRESEASON; the roster and Hall of Fame remain intact.

Changing Broadcast Status back to `PRESEASON` does not alter any picks, so the current dummy or test board stays in place. The guarded reset is different: it intentionally clears the lock board for a clean Week 1, while the score ticker keeps its built-in demo fallback.

The Hall of Fame includes official Seasons 1–3 final records. Those seasons are marked **VAULT TAPE DAMAGED** because their week-by-week pick detail is unavailable.

## Ongoing maintenance

- Enter full, consistent matchup names (`Green Bay Packers vs Pittsburgh Steelers`) so automatic score matching is reliable.
- The score source is a keyless, unofficial ESPN site feed. It needs no secret, but it is not a supported public API and could require maintenance if its response format changes.
- Manual grading remains the authoritative record.
- Vercel deploys automatically from GitHub `main`; check the production build and runtime-error scan after substantive changes.

## Historical rule question to resolve
The historical spreadsheets calculate Win Rate as wins divided by all picks, including pushes in the denominator. That conflicts with the current stated rule that a push should not hurt winning percentage. The archive currently preserves the spreadsheet percentage as `sheetPct` rather than treating it as the future official formula.

## Scoring rule

Win percentage is push-neutral: `wins / (wins + losses)`. Pushes are tracked but excluded from the percentage denominator.

## Build-hardening note (v0.5)

- All internal imports now use relative paths instead of a TypeScript `@/` alias.
- `baseUrl` has been removed because TypeScript 6 rejects it.
- `npm run check` runs a dependency-free smoke check for missing project files and broken internal imports before deployment.
- Push-neutral winning percentage remains the current league rule: `wins / (wins + losses)`.

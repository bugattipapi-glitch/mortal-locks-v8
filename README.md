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
- Password-protected commissioner controls for season settings, text/structured pick entry, roster management, automatic/manual grading, lock deletion, Booth Calls, Dead Teams, Lock Offs and guarded test-season reset
- Conservative pick-entry preview that deliberately flags ambiguous aliases such as OSU, USC and MSU
- Expanded commentary library including SOME SPREAD, THE MIDDLE IS ALIVE, BACKDOOR COVER, BAD BEAT and more

## Commissioner operating guide

1. Open **COMMISSIONER** in the mobile footer, or **COMMISSIONER LOGIN** in the desktop footer, and enter the shared password.
2. Keep Broadcast Status on `PRESEASON` during testing. It controls the header/recap presentation; score lookup works in every status.
3. Enter two picks per player with full team names. The ticker checks current-week pending picks against NFL and college scoreboards every 60 seconds.
4. A secured Vercel job checks final scores every day at 15:00 UTC (8 AM Arizona, with up to an hour of scheduling variance on Hobby) and automatically grades supported full-game spreads, totals, and straight-up picks. **Run Score Sync Now** performs the same check on demand.
5. Use **Result Override** for first-half/quarter, unmatched, unusual, or corrected results. The same row can assign/remove a Booth Call or delete a fat-fingered lock so its slot can be resubmitted.
6. Advance Current Week only after the prior week is graded. That unlocks the new weekly recap generated from results and commissioner-assigned Booth Calls.
7. Add/remove Dead Teams and Lock Offs in their commissioner sections. Both public sections grow into scrollable collections rather than overlapping the page.
8. After the preseason test, use **Reset Season 8 Test Data**. Its second confirmation deletes only Season 8 picks/results, Dead Teams, and Lock Offs, then restores Week 1 + PRESEASON; the roster and Hall of Fame remain intact.

Changing Broadcast Status back to `PRESEASON` does not alter any picks, so the current dummy or test board stays in place. The guarded reset is different: it intentionally clears the Season VIII operating data for a clean Week 1, while the score ticker keeps its built-in demo fallback.

The Hall of Fame includes official Seasons 1–3 final records. Those seasons are marked **VAULT TAPE DAMAGED** because their week-by-week pick detail is unavailable.

## Ongoing maintenance

- Enter full, consistent matchup names (`Green Bay Packers vs Pittsburgh Steelers`) so automatic score matching is reliable.
- The score source is a keyless, unofficial ESPN site feed. It needs no secret, but it is not a supported public API and could require maintenance if its response format changes.
- Automatic grading intentionally leaves first-half, first-quarter, unsupported, and ambiguous picks pending; use Result Override for those cases.
- Booth Calls are intentionally commissioner-assigned. The score feed never invents a narrative call from final scores alone.
- The all-time board is frozen to completed Seasons I–VII. Season VIII should be imported only after the season is final.
- The cron endpoint requires the server-only `CRON_SECRET` environment variable in Vercel production.
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

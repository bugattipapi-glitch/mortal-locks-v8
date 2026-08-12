# Mortal Locks VIII: The Ocho

Local v0.2 prototype for the Mortal Locks football picking league.

## Implemented in this local build
- Responsive public-access-TV / NBA Jam inspired homepage
- Dense mobile weekly picks view for all 9 Season VII players
- Generic Pick 1 / Pick 2 model so Week 1 can be two college picks and late-season weeks can be two NFL picks
- Picked-games-only score ticker component that polls `/api/scores` every 60 seconds and supports manual refresh
- Score API seam with demo data, ready to swap to a live sports provider later
- Current-season history page with By Week / By Player views
- Historical archive import from Mortal Locks IV, V, VI and VII (1,116 picks total)
- Archive views by season/week/player plus raw all-time W-L-P board
- Commissioner/admin shell with configurable start date, player/avatar controls, pick slot/sport/period controls, force-pick flag and manual result override concept
- Conservative pick-entry preview that deliberately flags ambiguous aliases such as OSU, USC and MSU
- Expanded commentary library including SOME SPREAD, THE MIDDLE IS ALIVE, BACKDOOR COVER, BAD BEAT and more

## Still intentionally not wired
- Persistent database
- Shared admin password/authentication
- Live NFL/NCAAF score provider
- Automatic pick-to-game matching and grading
- Real avatar uploads/storage
- Automatic lock-off detection
- Automated commentary selection

## Historical rule question to resolve
The historical spreadsheets calculate Win Rate as wins divided by all picks, including pushes in the denominator. That conflicts with the current stated rule that a push should not hurt winning percentage. The archive currently preserves the spreadsheet percentage as `sheetPct` rather than treating it as the future official formula.

## Scoring rule

Win percentage is push-neutral: `wins / (wins + losses)`. Pushes are tracked but excluded from the percentage denominator.

## Build-hardening note (v0.5)

- All internal imports now use relative paths instead of a TypeScript `@/` alias.
- `baseUrl` has been removed because TypeScript 6 rejects it.
- `npm run check` runs a dependency-free smoke check for missing project files and broken internal imports before deployment.
- Push-neutral winning percentage remains the current league rule: `wins / (wins + losses)`.

# Mortal Locks VIII - Codex handoff

Repository: `bugattipapi-glitch/mortal-locks-v8`

## Goal
Replace/fix the current repository so this Next.js app builds successfully on Vercel and preserves the existing Mortal Locks prototype functionality.

## Required workflow
1. Treat the files in this handoff as the intended repository root. Do not nest them inside another `mortal-locks-v8-v0.5` directory.
2. Inspect the existing repository and merge/replace files as needed so the repository root contains `app/`, `components/`, `lib/`, `scripts/`, `package.json`, `tsconfig.json`, etc.
3. Run dependency install.
4. Run `npm run check`.
5. Run `npm run build`.
6. Fix every build/type error until both commands pass cleanly.
7. Do not add a database, authentication provider, or live sports API yet. This checkpoint is for a working front-end prototype plus demo score endpoint.
8. Commit/push the working result to `main` so the connected Vercel project redeploys.

## Important product requirements already reflected in the prototype
- Season VIII branding: Mortal Locks 8: The Ocho.
- Public-access-TV + NBA Jam visual direction.
- Mobile-first usage is important.
- Weekly board supports two picks per player, with each pick independently marked CFB or NFL. This supports two CFB picks early, one CFB + one NFL midseason, and two NFL picks late.
- Season VIII initial start date: 2026-08-29, but admin should eventually be able to change it.
- Admin-only pick entry. Players do not submit their own picks.
- Push-neutral winning percentage: wins / (wins + losses). Pushes are excluded from the denominator.
- Admin result overrides are a required future feature.
- Historical Seasons IV-VII data is included in `lib/history.ts` for archives/all-time stats.
- `Cici` and `Ceci` are the same player; canonical display name is `Ceci`.
- Live score ticker should eventually show only games relevant to current Mortal Locks picks. The current endpoint is demo data only.
- Do not overengineer duplicate-pick enforcement.

## Build context
Previous Vercel failures came from:
1. Missing `@/` path resolution in the initially uploaded version.
2. Adding `baseUrl`, which TypeScript 6 rejected because that option was removed.

This handoff removes the alias approach and uses relative imports. Keep the build compatible with current Vercel/Next.js.

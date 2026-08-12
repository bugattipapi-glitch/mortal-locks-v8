import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import { demoPicks, players as previewPlayers, season as previewSeason, type Period, type Result, type Sport } from './data';

export type RuntimeSeason = {
  number: number;
  title: string;
  startDate: string;
  currentWeek: number;
  status: string;
};

export type RuntimePlayer = {
  slug: string;
  name: string;
  short: string;
  avatar: string;
  active: boolean;
  sortOrder: number;
};

export type RuntimePick = {
  seasonNumber: number;
  week: number;
  playerSlug: string;
  playerName: string;
  slot: 1 | 2;
  sport: Sport;
  game: string;
  bet: string;
  result: Result;
  period: Period;
  force: boolean;
  manualOverride: boolean;
  commentary: string;
  updatedAt: string;
};

export type RuntimeStanding = {
  name: string;
  wins: number;
  losses: number;
  pushes: number;
  pct: number;
};

export type RuntimeSnapshot = {
  season: RuntimeSeason;
  players: RuntimePlayer[];
  picks: RuntimePick[];
  standings: RuntimeStanding[];
  dataMode: 'database' | 'preview-fallback';
};

type Sql = NeonQueryFunction<false, false>;

let sqlClient: Sql | null = null;
let initializationPromise: Promise<void> | null = null;

export function playerSlug(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function getSql(): Sql | null {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;
  sqlClient ??= neon(connectionString);
  return sqlClient;
}

function requireSql() {
  const sql = getSql();
  if (!sql) throw new Error('DATABASE_URL is not configured.');
  return sql;
}

function seedPlayerRows() {
  return previewPlayers.map((player, index) => ({
    slug: playerSlug(player.name),
    name: player.name,
    short: player.short,
    avatar: player.avatar,
    active: true,
    sort_order: index + 1,
  }));
}

function seedPickRows() {
  return demoPicks.flatMap((row) =>
    row.picks.map((pick, index) => ({
      season_number: previewSeason.number,
      week: previewSeason.currentWeek,
      player_slug: playerSlug(row.player),
      slot: index + 1,
      sport: pick.sport,
      game: pick.game,
      bet: pick.bet,
      result: pick.result,
      period: pick.period ?? 'FULL',
      force: pick.force ?? false,
      manual_override: pick.manualOverride ?? false,
      commentary: index === 0 ? row.note ?? '' : '',
    })),
  );
}

async function initializeDatabase(sql: Sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS ml_settings (
      key text PRIMARY KEY,
      value text NOT NULL,
      updated_at timestamptz NOT NULL DEFAULT now()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS ml_players (
      slug text PRIMARY KEY,
      name text NOT NULL,
      short text NOT NULL,
      avatar text NOT NULL,
      active boolean NOT NULL DEFAULT true,
      sort_order integer NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS ml_picks (
      season_number integer NOT NULL,
      week integer NOT NULL CHECK (week BETWEEN 1 AND 18),
      player_slug text NOT NULL REFERENCES ml_players(slug),
      slot integer NOT NULL CHECK (slot IN (1, 2)),
      sport text NOT NULL CHECK (sport IN ('CFB', 'NFL')),
      game text NOT NULL,
      bet text NOT NULL,
      result text NOT NULL DEFAULT 'PENDING' CHECK (result IN ('W', 'L', 'P', 'PENDING', 'LIVE')),
      period text NOT NULL DEFAULT 'FULL' CHECK (period IN ('FULL', '1H', '1Q')),
      force boolean NOT NULL DEFAULT false,
      manual_override boolean NOT NULL DEFAULT false,
      commentary text NOT NULL DEFAULT '',
      updated_at timestamptz NOT NULL DEFAULT now(),
      PRIMARY KEY (season_number, week, player_slug, slot)
    )
  `;

  await sql`
    INSERT INTO ml_settings (key, value)
    VALUES
      ('season_number', '8'),
      ('season_title', 'The Ocho'),
      ('start_date', '2026-08-29'),
      ('current_week', '1'),
      ('status', 'PRESEASON')
    ON CONFLICT (key) DO NOTHING
  `;

  const playersJson = JSON.stringify(seedPlayerRows());
  await sql`
    INSERT INTO ml_players (slug, name, short, avatar, active, sort_order)
    SELECT slug, name, short, avatar, active, sort_order
    FROM jsonb_to_recordset(${playersJson}::jsonb)
      AS incoming(slug text, name text, short text, avatar text, active boolean, sort_order integer)
    ON CONFLICT (slug) DO NOTHING
  `;

  const picksJson = JSON.stringify(seedPickRows());
  await sql`
    INSERT INTO ml_picks (
      season_number, week, player_slug, slot, sport, game, bet, result,
      period, force, manual_override, commentary
    )
    SELECT
      season_number, week, player_slug, slot, sport, game, bet, result,
      period, force, manual_override, commentary
    FROM jsonb_to_recordset(${picksJson}::jsonb)
      AS incoming(
        season_number integer, week integer, player_slug text, slot integer,
        sport text, game text, bet text, result text, period text, force boolean,
        manual_override boolean, commentary text
      )
    ON CONFLICT (season_number, week, player_slug, slot) DO NOTHING
  `;
}

async function ensureDatabase() {
  const sql = requireSql();
  initializationPromise ??= initializeDatabase(sql);
  await initializationPromise;
  return sql;
}

function calculateStandings(players: RuntimePlayer[], picks: RuntimePick[]) {
  return players
    .filter((player) => player.active)
    .map((player) => {
      const results = picks.filter((pick) => pick.playerSlug === player.slug).map((pick) => pick.result);
      const wins = results.filter((result) => result === 'W').length;
      const losses = results.filter((result) => result === 'L').length;
      const pushes = results.filter((result) => result === 'P').length;
      return {
        name: player.name,
        wins,
        losses,
        pushes,
        pct: wins + losses ? wins / (wins + losses) : 0,
      };
    })
    .sort((a, b) => b.pct - a.pct || b.wins - a.wins || a.losses - b.losses || a.name.localeCompare(b.name));
}

function previewSnapshot(): RuntimeSnapshot {
  const players: RuntimePlayer[] = previewPlayers.map((player, index) => ({
    slug: playerSlug(player.name),
    name: player.name,
    short: player.short,
    avatar: player.avatar,
    active: true,
    sortOrder: index + 1,
  }));
  const picks: RuntimePick[] = demoPicks.flatMap((row) =>
    row.picks.map((pick, index) => ({
      seasonNumber: previewSeason.number,
      week: previewSeason.currentWeek,
      playerSlug: playerSlug(row.player),
      playerName: row.player,
      slot: (index + 1) as 1 | 2,
      sport: pick.sport,
      game: pick.game,
      bet: pick.bet,
      result: pick.result,
      period: pick.period ?? 'FULL',
      force: pick.force ?? false,
      manualOverride: pick.manualOverride ?? false,
      commentary: index === 0 ? row.note ?? '' : '',
      updatedAt: '',
    })),
  );
  return {
    season: { ...previewSeason },
    players,
    picks,
    standings: calculateStandings(players, picks),
    dataMode: 'preview-fallback',
  };
}

type SettingRow = { key: string; value: string };
type PlayerRow = {
  slug: string;
  name: string;
  short: string;
  avatar: string;
  active: boolean;
  sort_order: number;
};
type PickRow = {
  season_number: number;
  week: number;
  player_slug: string;
  player_name: string;
  slot: number;
  sport: Sport;
  game: string;
  bet: string;
  result: Result;
  period: Period;
  force: boolean;
  manual_override: boolean;
  commentary: string;
  updated_at: string | Date;
};

export async function getRuntimeSnapshot(): Promise<RuntimeSnapshot> {
  if (!getSql()) return previewSnapshot();

  try {
    const sql = await ensureDatabase();
    const [settingRows, playerRows, pickRows] = await Promise.all([
      sql`SELECT key, value FROM ml_settings`,
      sql`SELECT slug, name, short, avatar, active, sort_order FROM ml_players ORDER BY sort_order, name`,
      sql`
        SELECT p.*, players.name AS player_name
        FROM ml_picks p
        JOIN ml_players players ON players.slug = p.player_slug
        ORDER BY p.week, players.sort_order, p.slot
      `,
    ]);
    const settings = Object.fromEntries((settingRows as unknown as SettingRow[]).map((row) => [row.key, row.value]));
    const season: RuntimeSeason = {
      number: Number(settings.season_number ?? 8),
      title: settings.season_title ?? 'The Ocho',
      startDate: settings.start_date ?? '2026-08-29',
      currentWeek: Number(settings.current_week ?? 1),
      status: settings.status ?? 'PRESEASON',
    };
    const players: RuntimePlayer[] = (playerRows as unknown as PlayerRow[]).map((row) => ({
      slug: row.slug,
      name: row.name,
      short: row.short,
      avatar: row.avatar,
      active: row.active,
      sortOrder: row.sort_order,
    }));
    const picks: RuntimePick[] = (pickRows as unknown as PickRow[])
      .filter((row) => row.season_number === season.number)
      .map((row) => ({
        seasonNumber: row.season_number,
        week: row.week,
        playerSlug: row.player_slug,
        playerName: row.player_name,
        slot: row.slot as 1 | 2,
        sport: row.sport,
        game: row.game,
        bet: row.bet,
        result: row.result,
        period: row.period,
        force: row.force,
        manualOverride: row.manual_override,
        commentary: row.commentary,
        updatedAt: String(row.updated_at),
      }));
    return { season, players, picks, standings: calculateStandings(players, picks), dataMode: 'database' };
  } catch (error) {
    console.error('Mortal Locks database fallback:', error);
    return previewSnapshot();
  }
}

export async function updateSeason(input: RuntimeSeason) {
  const sql = await ensureDatabase();
  const rows = JSON.stringify([
    { key: 'season_number', value: String(input.number) },
    { key: 'season_title', value: input.title },
    { key: 'start_date', value: input.startDate },
    { key: 'current_week', value: String(input.currentWeek) },
    { key: 'status', value: input.status },
  ]);
  await sql`
    INSERT INTO ml_settings (key, value)
    SELECT key, value
    FROM jsonb_to_recordset(${rows}::jsonb) AS incoming(key text, value text)
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()
  `;
}

export async function addRuntimePlayer(name: string) {
  const sql = await ensureDatabase();
  const slug = playerSlug(name);
  const initials = name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  const rows = await sql`
    INSERT INTO ml_players (slug, name, short, avatar, active, sort_order)
    VALUES (${slug}, ${name}, ${initials}, ${initials}, true, (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM ml_players))
    ON CONFLICT (slug) DO NOTHING
    RETURNING slug
  `;
  if (!(rows as unknown as Array<{ slug: string }>).length) throw new Error('A player with that name already exists.');
}

export async function setRuntimePlayerActive(slug: string, active: boolean) {
  const sql = await ensureDatabase();
  await sql`UPDATE ml_players SET active = ${active} WHERE slug = ${slug}`;
}

export async function upsertRuntimePick(input: Omit<RuntimePick, 'playerName' | 'result' | 'manualOverride' | 'updatedAt'>) {
  const sql = await ensureDatabase();
  await sql`
    INSERT INTO ml_picks (
      season_number, week, player_slug, slot, sport, game, bet, result,
      period, force, manual_override, commentary
    )
    VALUES (
      ${input.seasonNumber}, ${input.week}, ${input.playerSlug}, ${input.slot}, ${input.sport},
      ${input.game}, ${input.bet}, 'PENDING', ${input.period}, ${input.force}, false, ${input.commentary}
    )
    ON CONFLICT (season_number, week, player_slug, slot) DO UPDATE SET
      sport = EXCLUDED.sport,
      game = EXCLUDED.game,
      bet = EXCLUDED.bet,
      period = EXCLUDED.period,
      force = EXCLUDED.force,
      commentary = EXCLUDED.commentary,
      updated_at = now()
  `;
}

export async function overrideRuntimeResult(input: {
  seasonNumber: number;
  week: number;
  playerSlug: string;
  slot: number;
  result: Result;
}) {
  const sql = await ensureDatabase();
  await sql`
    UPDATE ml_picks
    SET result = ${input.result}, manual_override = true, updated_at = now()
    WHERE season_number = ${input.seasonNumber}
      AND week = ${input.week}
      AND player_slug = ${input.playerSlug}
      AND slot = ${input.slot}
  `;
}

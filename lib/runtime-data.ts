import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import {
  demoPicks,
  players as previewPlayers,
  season as previewSeason,
  type BetSide,
  type Market,
  type Period,
  type Result,
  type Sport,
} from './data';

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
  eventId: string | null;
  eventDate: string | null;
  awayTeamId: string | null;
  awayTeamName: string | null;
  awayTeamAbbreviation: string | null;
  homeTeamId: string | null;
  homeTeamName: string | null;
  homeTeamAbbreviation: string | null;
  market: Market | null;
  selectionSide: BetSide | null;
  line: number | null;
  updatedAt: string;
};

export type RuntimePickInput = Omit<RuntimePick, 'playerName' | 'result' | 'manualOverride' | 'updatedAt'>;

export type RuntimeDeadTeam = {
  id: number;
  seasonNumber: number;
  teamName: string;
  reason: string;
  createdAt: string;
};

export type RuntimeLockOff = {
  id: number;
  seasonNumber: number;
  week: number;
  sideA: string;
  sideB: string;
  note: string;
  createdAt: string;
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
  deadTeams: RuntimeDeadTeam[];
  lockOffs: RuntimeLockOff[];
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
  await sql`ALTER TABLE ml_picks ADD COLUMN IF NOT EXISTS event_id text`;
  await sql`ALTER TABLE ml_picks ADD COLUMN IF NOT EXISTS event_date timestamptz`;
  await sql`ALTER TABLE ml_picks ADD COLUMN IF NOT EXISTS away_team_id text`;
  await sql`ALTER TABLE ml_picks ADD COLUMN IF NOT EXISTS away_team_name text`;
  await sql`ALTER TABLE ml_picks ADD COLUMN IF NOT EXISTS away_team_abbreviation text`;
  await sql`ALTER TABLE ml_picks ADD COLUMN IF NOT EXISTS home_team_id text`;
  await sql`ALTER TABLE ml_picks ADD COLUMN IF NOT EXISTS home_team_name text`;
  await sql`ALTER TABLE ml_picks ADD COLUMN IF NOT EXISTS home_team_abbreviation text`;
  await sql`ALTER TABLE ml_picks ADD COLUMN IF NOT EXISTS market text`;
  await sql`ALTER TABLE ml_picks ADD COLUMN IF NOT EXISTS selection_side text`;
  await sql`ALTER TABLE ml_picks ADD COLUMN IF NOT EXISTS line numeric`;
  await sql`
    CREATE TABLE IF NOT EXISTS ml_dead_teams (
      id bigserial PRIMARY KEY,
      season_number integer NOT NULL,
      team_name text NOT NULL,
      reason text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS ml_lock_offs (
      id bigserial PRIMARY KEY,
      season_number integer NOT NULL,
      week integer NOT NULL CHECK (week BETWEEN 1 AND 18),
      side_a text NOT NULL,
      side_b text NOT NULL,
      note text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
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

  const correctionRows = await sql`
    SELECT value
    FROM ml_settings
    WHERE key = 'migration_2026_week1_score_corrections'
  `;
  if (!(correctionRows as unknown as Array<{ value: string }>).length) {
    await sql`
      UPDATE ml_picks
      SET result = 'W', manual_override = true, updated_at = now()
      WHERE season_number = 8
        AND week = 1
        AND player_slug = 'joe'
        AND slot = 2
        AND lower(bet) LIKE '%virginia%'
    `;
    await sql`
      UPDATE ml_picks
      SET result = 'W', manual_override = true, updated_at = now()
      WHERE season_number = 8
        AND week = 1
        AND player_slug = 'jay'
        AND slot = 1
        AND (lower(bet) LIKE '%nm state%' OR lower(bet) LIKE '%new mexico state%')
    `;
    await sql`
      INSERT INTO ml_settings (key, value)
      VALUES ('migration_2026_week1_score_corrections', 'applied')
      ON CONFLICT (key) DO NOTHING
    `;
  }

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
      eventId: null,
      eventDate: null,
      awayTeamId: null,
      awayTeamName: null,
      awayTeamAbbreviation: null,
      homeTeamId: null,
      homeTeamName: null,
      homeTeamAbbreviation: null,
      market: null,
      selectionSide: null,
      line: null,
      updatedAt: '',
    })),
  );
  return {
    season: { ...previewSeason },
    players,
    picks,
    deadTeams: [
      { id: 1, seasonNumber: previewSeason.number, teamName: 'NYJ', reason: 'HOPE DIED', createdAt: '' },
      { id: 2, seasonNumber: previewSeason.number, teamName: 'ATL', reason: 'BLEW IT', createdAt: '' },
      { id: 3, seasonNumber: previewSeason.number, teamName: 'WAS', reason: 'NO COMMENT', createdAt: '' },
    ],
    lockOffs: [
      { id: 1, seasonNumber: previewSeason.number, week: previewSeason.currentWeek, sideA: 'BLAINE O43', sideB: 'AJ U44.5', note: 'THE MIDDLE IS ALIVE', createdAt: '' },
    ],
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
  event_id: string | null;
  event_date: string | Date | null;
  away_team_id: string | null;
  away_team_name: string | null;
  away_team_abbreviation: string | null;
  home_team_id: string | null;
  home_team_name: string | null;
  home_team_abbreviation: string | null;
  market: Market | null;
  selection_side: BetSide | null;
  line: string | number | null;
  updated_at: string | Date;
};
type DeadTeamRow = {
  id: number;
  season_number: number;
  team_name: string;
  reason: string;
  created_at: string | Date;
};
type LockOffRow = {
  id: number;
  season_number: number;
  week: number;
  side_a: string;
  side_b: string;
  note: string;
  created_at: string | Date;
};

export async function getRuntimeSnapshot(): Promise<RuntimeSnapshot> {
  if (!getSql()) return previewSnapshot();

  try {
    const sql = await ensureDatabase();
    const [settingRows, playerRows, pickRows, deadTeamRows, lockOffRows] = await Promise.all([
      sql`SELECT key, value FROM ml_settings`,
      sql`SELECT slug, name, short, avatar, active, sort_order FROM ml_players ORDER BY sort_order, name`,
      sql`
        SELECT p.*, players.name AS player_name
        FROM ml_picks p
        JOIN ml_players players ON players.slug = p.player_slug
        ORDER BY p.week, players.sort_order, p.slot
      `,
      sql`SELECT id, season_number, team_name, reason, created_at FROM ml_dead_teams ORDER BY created_at, id`,
      sql`SELECT id, season_number, week, side_a, side_b, note, created_at FROM ml_lock_offs ORDER BY week, created_at, id`,
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
        eventId: row.event_id,
        eventDate: row.event_date ? String(row.event_date) : null,
        awayTeamId: row.away_team_id,
        awayTeamName: row.away_team_name,
        awayTeamAbbreviation: row.away_team_abbreviation,
        homeTeamId: row.home_team_id,
        homeTeamName: row.home_team_name,
        homeTeamAbbreviation: row.home_team_abbreviation,
        market: row.market,
        selectionSide: row.selection_side,
        line: row.line === null ? null : Number(row.line),
        updatedAt: String(row.updated_at),
      }));
    const deadTeams: RuntimeDeadTeam[] = (deadTeamRows as unknown as DeadTeamRow[])
      .filter((row) => row.season_number === season.number)
      .map((row) => ({
        id: Number(row.id),
        seasonNumber: row.season_number,
        teamName: row.team_name,
        reason: row.reason,
        createdAt: String(row.created_at),
      }));
    const lockOffs: RuntimeLockOff[] = (lockOffRows as unknown as LockOffRow[])
      .filter((row) => row.season_number === season.number)
      .map((row) => ({
        id: Number(row.id),
        seasonNumber: row.season_number,
        week: row.week,
        sideA: row.side_a,
        sideB: row.side_b,
        note: row.note,
        createdAt: String(row.created_at),
      }));
    return { season, players, picks, deadTeams, lockOffs, standings: calculateStandings(players, picks), dataMode: 'database' };
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

export async function resetRuntimeSeason(seasonNumber: number) {
  const sql = await ensureDatabase();
  const settingRows = await sql`SELECT value FROM ml_settings WHERE key = 'season_number'`;
  const activeSeason = Number((settingRows as unknown as Array<{ value: string }>)[0]?.value ?? previewSeason.number);
  if (seasonNumber !== activeSeason) throw new Error('Only the active season can be reset.');
  await sql`DELETE FROM ml_picks WHERE season_number = ${seasonNumber}`;
  await sql`DELETE FROM ml_dead_teams WHERE season_number = ${seasonNumber}`;
  await sql`DELETE FROM ml_lock_offs WHERE season_number = ${seasonNumber}`;
  const rows = JSON.stringify([
    { key: 'current_week', value: '1' },
    { key: 'status', value: 'PRESEASON' },
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

export async function upsertRuntimePick(input: RuntimePickInput) {
  const sql = await ensureDatabase();
  await sql`
    INSERT INTO ml_picks (
      season_number, week, player_slug, slot, sport, game, bet, result,
      period, force, manual_override, commentary, event_id, event_date,
      away_team_id, away_team_name, away_team_abbreviation,
      home_team_id, home_team_name, home_team_abbreviation,
      market, selection_side, line
    )
    VALUES (
      ${input.seasonNumber}, ${input.week}, ${input.playerSlug}, ${input.slot}, ${input.sport},
      ${input.game}, ${input.bet}, 'PENDING', ${input.period}, ${input.force}, false, ${input.commentary},
      ${input.eventId}, ${input.eventDate}, ${input.awayTeamId}, ${input.awayTeamName}, ${input.awayTeamAbbreviation},
      ${input.homeTeamId}, ${input.homeTeamName}, ${input.homeTeamAbbreviation},
      ${input.market}, ${input.selectionSide}, ${input.line}
    )
    ON CONFLICT (season_number, week, player_slug, slot) DO UPDATE SET
      sport = EXCLUDED.sport,
      game = EXCLUDED.game,
      bet = EXCLUDED.bet,
      period = EXCLUDED.period,
      force = EXCLUDED.force,
      commentary = EXCLUDED.commentary,
      event_id = EXCLUDED.event_id,
      event_date = EXCLUDED.event_date,
      away_team_id = EXCLUDED.away_team_id,
      away_team_name = EXCLUDED.away_team_name,
      away_team_abbreviation = EXCLUDED.away_team_abbreviation,
      home_team_id = EXCLUDED.home_team_id,
      home_team_name = EXCLUDED.home_team_name,
      home_team_abbreviation = EXCLUDED.home_team_abbreviation,
      market = EXCLUDED.market,
      selection_side = EXCLUDED.selection_side,
      line = EXCLUDED.line,
      result = 'PENDING',
      manual_override = false,
      updated_at = now()
  `;
}

export async function upsertRuntimePicks(inputs: RuntimePickInput[]) {
  const sql = await ensureDatabase();
  const rows = JSON.stringify(inputs.map((input) => ({
    season_number: input.seasonNumber,
    week: input.week,
    player_slug: input.playerSlug,
    slot: input.slot,
    sport: input.sport,
    game: input.game,
    bet: input.bet,
    period: input.period,
    force: input.force,
    commentary: input.commentary,
    event_id: input.eventId,
    event_date: input.eventDate,
    away_team_id: input.awayTeamId,
    away_team_name: input.awayTeamName,
    away_team_abbreviation: input.awayTeamAbbreviation,
    home_team_id: input.homeTeamId,
    home_team_name: input.homeTeamName,
    home_team_abbreviation: input.homeTeamAbbreviation,
    market: input.market,
    selection_side: input.selectionSide,
    line: input.line,
  })));
  await sql`
    INSERT INTO ml_picks (
      season_number, week, player_slug, slot, sport, game, bet, result,
      period, force, manual_override, commentary, event_id, event_date,
      away_team_id, away_team_name, away_team_abbreviation,
      home_team_id, home_team_name, home_team_abbreviation,
      market, selection_side, line
    )
    SELECT season_number, week, player_slug, slot, sport, game, bet, 'PENDING', period, force, false, commentary,
      event_id, event_date, away_team_id, away_team_name, away_team_abbreviation,
      home_team_id, home_team_name, home_team_abbreviation, market, selection_side, line
    FROM jsonb_to_recordset(${rows}::jsonb)
      AS incoming(
        season_number integer, week integer, player_slug text, slot integer,
        sport text, game text, bet text, period text, force boolean, commentary text,
        event_id text, event_date timestamptz,
        away_team_id text, away_team_name text, away_team_abbreviation text,
        home_team_id text, home_team_name text, home_team_abbreviation text,
        market text, selection_side text, line numeric
      )
    ON CONFLICT (season_number, week, player_slug, slot) DO UPDATE SET
      sport = EXCLUDED.sport,
      game = EXCLUDED.game,
      bet = EXCLUDED.bet,
      period = EXCLUDED.period,
      force = EXCLUDED.force,
      commentary = EXCLUDED.commentary,
      event_id = EXCLUDED.event_id,
      event_date = EXCLUDED.event_date,
      away_team_id = EXCLUDED.away_team_id,
      away_team_name = EXCLUDED.away_team_name,
      away_team_abbreviation = EXCLUDED.away_team_abbreviation,
      home_team_id = EXCLUDED.home_team_id,
      home_team_name = EXCLUDED.home_team_name,
      home_team_abbreviation = EXCLUDED.home_team_abbreviation,
      market = EXCLUDED.market,
      selection_side = EXCLUDED.selection_side,
      line = EXCLUDED.line,
      result = 'PENDING',
      manual_override = false,
      updated_at = now()
  `;
}

export async function overrideRuntimeResult(input: {
  seasonNumber: number;
  week: number;
  playerSlug: string;
  slot: number;
  result: Result;
  commentary: string;
}) {
  const sql = await ensureDatabase();
  await sql`
    UPDATE ml_picks
    SET result = ${input.result},
        commentary = ${input.commentary},
        manual_override = ${input.result !== 'PENDING'},
        updated_at = now()
    WHERE season_number = ${input.seasonNumber}
      AND week = ${input.week}
      AND player_slug = ${input.playerSlug}
      AND slot = ${input.slot}
  `;
}

export async function deleteRuntimePick(input: {
  seasonNumber: number;
  week: number;
  playerSlug: string;
  slot: number;
}) {
  const sql = await ensureDatabase();
  await sql`
    DELETE FROM ml_picks
    WHERE season_number = ${input.seasonNumber}
      AND week = ${input.week}
      AND player_slug = ${input.playerSlug}
      AND slot = ${input.slot}
  `;
}

export async function applyRuntimePickGrades(grades: Array<{
  seasonNumber: number;
  week: number;
  playerSlug: string;
  slot: number;
  result: 'W' | 'L' | 'P';
}>) {
  if (!grades.length) return 0;
  const sql = await ensureDatabase();
  const rows = JSON.stringify(grades.map((grade) => ({
    season_number: grade.seasonNumber,
    week: grade.week,
    player_slug: grade.playerSlug,
    slot: grade.slot,
    result: grade.result,
  })));
  const updated = await sql`
    UPDATE ml_picks AS picks
    SET result = incoming.result,
        manual_override = false,
        updated_at = now()
    FROM jsonb_to_recordset(${rows}::jsonb)
      AS incoming(season_number integer, week integer, player_slug text, slot integer, result text)
    WHERE picks.season_number = incoming.season_number
      AND picks.week = incoming.week
      AND picks.player_slug = incoming.player_slug
      AND picks.slot = incoming.slot
      AND picks.result IN ('PENDING', 'LIVE')
    RETURNING picks.player_slug
  `;
  return (updated as unknown as Array<{ player_slug: string }>).length;
}

export async function addRuntimeDeadTeam(input: { seasonNumber: number; teamName: string; reason: string }) {
  const sql = await ensureDatabase();
  await sql`
    INSERT INTO ml_dead_teams (season_number, team_name, reason)
    VALUES (${input.seasonNumber}, ${input.teamName}, ${input.reason})
  `;
}

export async function deleteRuntimeDeadTeam(input: { id: number; seasonNumber: number }) {
  const sql = await ensureDatabase();
  await sql`DELETE FROM ml_dead_teams WHERE id = ${input.id} AND season_number = ${input.seasonNumber}`;
}

export async function addRuntimeLockOff(input: {
  seasonNumber: number;
  week: number;
  sideA: string;
  sideB: string;
  note: string;
}) {
  const sql = await ensureDatabase();
  await sql`
    INSERT INTO ml_lock_offs (season_number, week, side_a, side_b, note)
    VALUES (${input.seasonNumber}, ${input.week}, ${input.sideA}, ${input.sideB}, ${input.note})
  `;
}

export async function deleteRuntimeLockOff(input: { id: number; seasonNumber: number }) {
  const sql = await ensureDatabase();
  await sql`DELETE FROM ml_lock_offs WHERE id = ${input.id} AND season_number = ${input.seasonNumber}`;
}

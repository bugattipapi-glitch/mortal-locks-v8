import type { RuntimePick } from './runtime-data';

export type TickerScore = {
  id: string;
  away: string;
  home: string;
  awayScore: number;
  homeScore: number;
  state: string;
  live: boolean;
};

type EspnCompetitor = {
  homeAway?: 'home' | 'away';
  score?: string;
  team?: { displayName?: string; shortDisplayName?: string; abbreviation?: string };
};

type EspnEvent = {
  id?: string;
  name?: string;
  date?: string;
  competitions?: Array<{
    competitors?: EspnCompetitor[];
    status?: { type?: { state?: string; shortDetail?: string; detail?: string; completed?: boolean } };
  }>;
};

type EspnScoreboard = { events?: EspnEvent[] };

const SCOREBOARD = 'https://site.api.espn.com/apis/site/v2/sports/football';

const teamAliases: Record<string, string[]> = {
  '49ers': ['san francisco', 'sf'],
  cardinals: ['arizona'],
  chargers: ['los angeles chargers', 'la chargers'],
  chiefs: ['kansas city'],
  colts: ['indianapolis'],
  lions: ['detroit'],
  packers: ['green bay'],
  patriots: ['new england'],
  raiders: ['las vegas'],
  steelers: ['pittsburgh'],
  texans: ['houston'],
  titans: ['tennessee'],
};

function normalized(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function pickTokens(pick: RuntimePick) {
  const value = normalized(pick.game);
  const tokens = new Set(value.split(' ').filter((token) => token.length > 2));
  for (const [nickname, aliases] of Object.entries(teamAliases)) {
    if (value.includes(nickname) || aliases.some((alias) => value.includes(alias))) {
      tokens.add(nickname);
      aliases.forEach((alias) => alias.split(' ').forEach((token) => tokens.add(token)));
    }
  }
  return tokens;
}

function eventTeamText(event: EspnEvent) {
  const competitors = event.competitions?.[0]?.competitors ?? [];
  return normalized(competitors.map(({ team }) => [team?.displayName, team?.shortDisplayName, team?.abbreviation].filter(Boolean).join(' ')).join(' '));
}

function matchesPick(event: EspnEvent, pick: RuntimePick) {
  const tokens = pickTokens(pick);
  const eventText = eventTeamText(event);
  return [...tokens].filter((token) => eventText.split(' ').includes(token)).length >= 2;
}

function scoreFromEvent(event: EspnEvent): TickerScore | null {
  const competition = event.competitions?.[0];
  const away = competition?.competitors?.find((team) => team.homeAway === 'away');
  const home = competition?.competitors?.find((team) => team.homeAway === 'home');
  if (!away?.team || !home?.team) return null;
  const type = competition?.status?.type;
  const state = type?.state === 'pre'
    ? (type.shortDetail ?? type.detail ?? 'SCHEDULED').toUpperCase()
    : (type?.shortDetail ?? type?.detail ?? 'LIVE').toUpperCase();
  return {
    id: event.id ?? `${away.team.abbreviation}-${home.team.abbreviation}`,
    away: away.team.abbreviation ?? away.team.shortDisplayName ?? 'AWAY',
    home: home.team.abbreviation ?? home.team.shortDisplayName ?? 'HOME',
    awayScore: Number(away.score ?? 0),
    homeScore: Number(home.score ?? 0),
    state,
    live: type?.state === 'in' && !type.completed,
  };
}

function dateWindow(now = new Date()) {
  const dates = [];
  for (let offset = -1; offset <= 7; offset += 1) {
    const date = new Date(now);
    date.setUTCDate(date.getUTCDate() + offset);
    dates.push(date.toISOString().slice(0, 10).replaceAll('-', ''));
  }
  return `${dates[0]}-${dates.at(-1)}`;
}

async function fetchLeague(league: 'nfl' | 'college-football', dates: string) {
  const response = await fetch(`${SCOREBOARD}/${league}/scoreboard?dates=${dates}&limit=100`, {
    headers: { accept: 'application/json' },
    next: { revalidate: 30 },
  });
  if (!response.ok) throw new Error(`Score provider returned ${response.status} for ${league}.`);
  return response.json() as Promise<EspnScoreboard>;
}

export async function getPickedGameScores(picks: RuntimePick[], now = new Date()) {
  const relevant = picks.filter((pick) => pick.result === 'PENDING' || pick.result === 'LIVE');
  if (!relevant.length) return [];
  const sports = new Set(relevant.map((pick) => pick.sport));
  const dates = dateWindow(now);
  const feeds = await Promise.all([
    sports.has('NFL') ? fetchLeague('nfl', dates) : Promise.resolve({ events: [] }),
    sports.has('CFB') ? fetchLeague('college-football', dates) : Promise.resolve({ events: [] }),
  ]);
  const events = feeds.flatMap((feed) => feed.events ?? []);
  const matched = events.filter((event) => relevant.some((pick) => matchesPick(event, pick)));
  return [...new Map(matched.map((event) => [event.id, event])).values()]
    .sort((left, right) => String(left.date).localeCompare(String(right.date)))
    .map(scoreFromEvent)
    .filter((score): score is TickerScore => score !== null);
}

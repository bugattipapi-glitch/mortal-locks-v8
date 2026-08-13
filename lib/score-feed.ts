import type { Result } from './data';
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

export type CompletedPickGrade = {
  pick: RuntimePick;
  result: Extract<Result, 'W' | 'L' | 'P'>;
  eventId: string;
  finalScore: string;
};

type EspnCompetitor = {
  homeAway?: 'home' | 'away';
  score?: string;
  winner?: boolean;
  team?: { displayName?: string; shortDisplayName?: string; abbreviation?: string; name?: string; location?: string };
};

type EspnCompetition = {
  competitors?: EspnCompetitor[];
  status?: { type?: { state?: string; shortDetail?: string; detail?: string; completed?: boolean } };
};

type EspnEvent = {
  id?: string;
  name?: string;
  shortName?: string;
  date?: string;
  competitions?: EspnCompetition[];
};

type EspnScoreboard = { events?: EspnEvent[] };

const SCOREBOARD = 'https://site.api.espn.com/apis/site/v2/sports/football';
const ignoredTokens = new Set(['at', 'the', 'vs', 'versus', 'university', 'college', 'football']);

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

function tokens(value: string) {
  return normalized(value).split(' ').filter((token) => token.length > 1 && !ignoredTokens.has(token));
}

function expandedTokens(value: string) {
  const normalizedValue = normalized(value);
  const result = new Set(tokens(value));
  for (const [nickname, aliases] of Object.entries(teamAliases)) {
    if (normalizedValue.includes(nickname) || aliases.some((alias) => normalizedValue.includes(alias))) {
      result.add(nickname);
      aliases.flatMap(tokens).forEach((token) => result.add(token));
    }
  }
  return result;
}

function competitorText(competitor: EspnCompetitor) {
  const team = competitor.team;
  return [team?.displayName, team?.shortDisplayName, team?.abbreviation, team?.name, team?.location]
    .filter(Boolean)
    .join(' ');
}

function competitorMatchScore(value: string, competitor: EspnCompetitor) {
  const source = expandedTokens(value);
  const target = expandedTokens(competitorText(competitor));
  return [...source].filter((token) => target.has(token)).length;
}

function gameSides(game: string) {
  return game
    .split(/\s+(?:vs\.?|versus|at)\s+|\s*@\s*|\s*\/\s*/i)
    .map((side) => side.trim())
    .filter(Boolean);
}

function matchesPick(event: EspnEvent, pick: RuntimePick) {
  const competitors = event.competitions?.[0]?.competitors ?? [];
  if (competitors.length < 2) return false;
  const sides = gameSides(pick.game);
  if (sides.length >= 2) {
    const firstScores = competitors.map((competitor) => competitorMatchScore(sides[0], competitor));
    const secondScores = competitors.map((competitor) => competitorMatchScore(sides[1], competitor));
    return firstScores.some((first, firstIndex) => first > 0 && secondScores.some((second, secondIndex) => second > 0 && firstIndex !== secondIndex));
  }
  const eventText = competitors.map(competitorText).join(' ');
  const eventTokens = expandedTokens(eventText);
  return [...expandedTokens(pick.game)].filter((token) => eventTokens.has(token)).length >= 2;
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

function dateWindow(now: Date, daysBack: number, daysForward: number) {
  const dates = [];
  for (let offset = -daysBack; offset <= daysForward; offset += 1) {
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

async function fetchRelevantEvents(picks: RuntimePick[], now: Date, daysBack: number, daysForward: number) {
  const sports = new Set(picks.map((pick) => pick.sport));
  const dates = dateWindow(now, daysBack, daysForward);
  const feeds = await Promise.all([
    sports.has('NFL') ? fetchLeague('nfl', dates) : Promise.resolve({ events: [] }),
    sports.has('CFB') ? fetchLeague('college-football', dates) : Promise.resolve({ events: [] }),
  ]);
  return feeds.flatMap((feed) => feed.events ?? []);
}

function compare(value: number): Extract<Result, 'W' | 'L' | 'P'> {
  if (value > 0) return 'W';
  if (value < 0) return 'L';
  return 'P';
}

function selectedCompetitor(selection: string, competitors: EspnCompetitor[]) {
  const ranked = competitors
    .map((competitor) => ({ competitor, score: competitorMatchScore(selection, competitor) }))
    .sort((left, right) => right.score - left.score);
  if (!ranked[0] || ranked[0].score === 0 || ranked[0].score === ranked[1]?.score) return null;
  return ranked[0].competitor;
}

function gradeCompletedEvent(event: EspnEvent, pick: RuntimePick): CompletedPickGrade | null {
  if (pick.period !== 'FULL') return null;
  const competition = event.competitions?.[0];
  if (!competition?.status?.type?.completed) return null;
  const competitors = competition.competitors ?? [];
  if (competitors.length !== 2) return null;
  const scores = competitors.map((competitor) => Number(competitor.score));
  if (scores.some((score) => !Number.isFinite(score))) return null;

  const totalMatch = pick.bet.match(/(?:^|\b)(over|under|o|u)\s*([0-9]+(?:\.[0-9]+)?)/i);
  let result: Extract<Result, 'W' | 'L' | 'P'> | null = null;
  if (totalMatch) {
    const total = scores[0] + scores[1];
    const line = Number(totalMatch[2]);
    const over = totalMatch[1].toLowerCase().startsWith('o');
    result = compare(over ? total - line : line - total);
  } else {
    const spreadMatch = pick.bet.match(/^(.*?)\s*([+-]\s*[0-9]+(?:\.[0-9]+)?)\s*$/i);
    const selection = (spreadMatch?.[1] ?? pick.bet).replace(/\b(?:moneyline|money line|ml)\b/gi, '').trim();
    const selected = selectedCompetitor(selection, competitors);
    if (!selected) return null;
    const opponent = competitors.find((competitor) => competitor !== selected);
    if (!opponent) return null;
    const selectedScore = Number(selected.score);
    const opponentScore = Number(opponent.score);
    const line = spreadMatch ? Number(spreadMatch[2].replace(/\s/g, '')) : 0;
    result = compare(selectedScore + line - opponentScore);
  }

  const ticker = scoreFromEvent(event);
  return result && ticker ? {
    pick,
    result,
    eventId: ticker.id,
    finalScore: `${ticker.away} ${ticker.awayScore} · ${ticker.home} ${ticker.homeScore}`,
  } : null;
}

export async function getPickedGameScores(picks: RuntimePick[], now = new Date()) {
  const relevant = picks.filter((pick) => pick.result === 'PENDING' || pick.result === 'LIVE');
  if (!relevant.length) return [];
  const events = await fetchRelevantEvents(relevant, now, 1, 7);
  const matched = events.filter((event) => relevant.some((pick) => matchesPick(event, pick)));
  return [...new Map(matched.map((event) => [event.id, event])).values()]
    .sort((left, right) => String(left.date).localeCompare(String(right.date)))
    .map(scoreFromEvent)
    .filter((score): score is TickerScore => score !== null);
}

export async function getCompletedPickGrades(picks: RuntimePick[], now = new Date()) {
  const relevant = picks.filter((pick) => (pick.result === 'PENDING' || pick.result === 'LIVE') && pick.period === 'FULL');
  if (!relevant.length) return [];
  const events = await fetchRelevantEvents(relevant, now, 8, 1);
  return relevant.flatMap((pick) => {
    const event = events.find((candidate) => matchesPick(candidate, pick));
    const grade = event ? gradeCompletedEvent(event, pick) : null;
    return grade ? [grade] : [];
  });
}

export const scoreFeedInternals = { matchesPick, gradeCompletedEvent };

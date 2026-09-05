import type { Period, Result, Sport } from './data';
import type { RuntimePick } from './runtime-data';

export type TickerScore = {
  id: string;
  away: string;
  home: string;
  awayScore: number;
  homeScore: number;
  state: string;
  live: boolean;
  startsAt: string | null;
};

export type WatchedTeamKey = 'texas' | 'arizona' | 'packers';

export type WatchedTeamGame = {
  key: WatchedTeamKey;
  eventId: string;
  startsAt: string;
  team: string;
  abbreviation: string;
  opponent: string;
  opponentAbbreviation: string;
  homeAway: 'home' | 'away';
  score: number;
  opponentScore: number;
  state: 'pre' | 'in' | 'post';
  detail: string;
  live: boolean;
  completed: boolean;
};

export type ScheduleTeam = {
  id: string;
  name: string;
  shortName: string;
  abbreviation: string;
};

export type ScheduledGame = {
  eventId: string;
  sport: Sport;
  startsAt: string;
  away: ScheduleTeam;
  home: ScheduleTeam;
};

export type ScheduledGameCandidate = {
  available: true;
  eventId: string;
  sport: Sport;
  startsAt: string;
  matchedTeamSide: 'HOME' | 'AWAY';
  matchedTeam: ScheduleTeam;
  opponent: ScheduleTeam;
  away: ScheduleTeam;
  home: ScheduleTeam;
};

export type UnavailableTeamCandidate = {
  available: false;
  eventId: null;
  sport: Sport;
  startsAt: null;
  matchedTeamSide: null;
  matchedTeam: ScheduleTeam;
  opponent: null;
  away: null;
  home: null;
};

export type ScheduleCandidate = ScheduledGameCandidate | UnavailableTeamCandidate;

export type CompletedPickGrade = {
  pick: RuntimePick;
  result: Extract<Result, 'W' | 'L' | 'P'>;
  eventId: string;
  finalScore: string;
};

type EspnLineScore = { value?: number; displayValue?: string; period?: number };
type EspnTeam = {
  id?: string;
  displayName?: string;
  shortDisplayName?: string;
  abbreviation?: string;
  name?: string;
  location?: string;
};
type EspnCompetitor = {
  id?: string;
  homeAway?: 'home' | 'away';
  score?: string;
  winner?: boolean;
  linescores?: EspnLineScore[];
  team?: EspnTeam;
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
type EspnTeamsFeed = { sports?: Array<{ leagues?: Array<{ teams?: Array<{ team?: EspnTeam }> }> }> };

const SCOREBOARD = 'https://site.api.espn.com/apis/site/v2/sports/football';
const watchedTeams = {
  texas: { id: '251', league: 'college-football', label: 'TEXAS' },
  arizona: { id: '12', league: 'college-football', label: 'ARIZONA' },
  packers: { id: '9', league: 'nfl', label: 'PACKERS' },
} as const satisfies Record<WatchedTeamKey, { id: string; league: 'nfl' | 'college-football'; label: string }>;
const ignoredTokens = new Set(['at', 'the', 'vs', 'versus', 'university', 'college', 'football', 'state']);
const teamAliases: Record<string, string[]> = {
  '49ers': ['san francisco', 'sf'],
  cardinals: ['arizona'],
  chargers: ['los angeles chargers', 'la chargers'],
  chiefs: ['kansas city'],
  colts: ['indianapolis'],
  lions: ['detroit'],
  'new mexico state': ['nm state', 'nmsu'],
  packers: ['green bay'],
  patriots: ['new england'],
  raiders: ['las vegas'],
  steelers: ['pittsburgh'],
  texans: ['houston'],
  titans: ['tennessee'],
};

function normalized(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’ʻʼ`]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function tokens(value: string) {
  return normalized(value).split(' ').filter((token) => token.length > 1 && !ignoredTokens.has(token));
}

function expandedTokens(value: string) {
  const normalizedValue = normalized(value);
  const result = new Set(tokens(value));
  for (const [nickname, aliases] of Object.entries(teamAliases)) {
    if (normalizedValue.includes(nickname) || aliases.some((alias) => normalizedValue.includes(alias))) {
      tokens(nickname).forEach((token) => result.add(token));
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

function eventMatchQuality(event: EspnEvent, pick: RuntimePick) {
  if (pick.eventId) return event.id === pick.eventId ? 10 : 0;
  const competitors = event.competitions?.[0]?.competitors ?? [];
  if (competitors.length < 2) return 0;
  const sides = gameSides(pick.game);
  if (sides.length >= 2) {
    const firstScores = competitors.map((competitor) => competitorMatchScore(sides[0], competitor));
    const secondScores = competitors.map((competitor) => competitorMatchScore(sides[1], competitor));
    return firstScores.some((first, firstIndex) => first > 0 && secondScores.some((second, secondIndex) => second > 0 && firstIndex !== secondIndex)) ? 3 : 0;
  }

  const combinedScores = competitors.map((competitor) => competitorMatchScore(`${pick.game} ${pick.bet}`, competitor));
  if (combinedScores.every((score) => score > 0)) return 2;
  const gameScores = competitors.map((competitor) => competitorMatchScore(pick.game, competitor));
  return gameScores.filter((score) => score > 0).length === 1 ? 1 : 0;
}

function matchesPick(event: EspnEvent, pick: RuntimePick) {
  return eventMatchQuality(event, pick) >= 2;
}

function matchingEventsForPick(events: EspnEvent[], pick: RuntimePick) {
  if (pick.eventId) return events.filter((event) => event.id === pick.eventId);
  const strongMatches = events.filter((event) => matchesPick(event, pick));
  if (strongMatches.length) return strongMatches;
  const singleTeamMatches = events.filter((event) => eventMatchQuality(event, pick) === 1);
  return singleTeamMatches.length === 1 ? singleTeamMatches : [];
}

function scoreFromEvent(event: EspnEvent): TickerScore | null {
  const competition = event.competitions?.[0];
  const away = competition?.competitors?.find((team) => team.homeAway === 'away');
  const home = competition?.competitors?.find((team) => team.homeAway === 'home');
  if (!away?.team || !home?.team) return null;
  const type = competition?.status?.type;
  const state = type?.state === 'pre'
    ? 'SCHEDULED'
    : (type?.shortDetail ?? type?.detail ?? 'LIVE').toUpperCase();
  return {
    id: event.id ?? `${away.team.abbreviation}-${home.team.abbreviation}`,
    away: away.team.abbreviation ?? away.team.shortDisplayName ?? 'AWAY',
    home: home.team.abbreviation ?? home.team.shortDisplayName ?? 'HOME',
    awayScore: Number(away.score ?? 0),
    homeScore: Number(home.score ?? 0),
    state,
    live: type?.state === 'in' && !type.completed,
    startsAt: event.date ?? null,
  };
}

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function weekDateRange(startDate: string, week: number) {
  const anchor = new Date(`${startDate}T12:00:00.000Z`);
  if (!Number.isFinite(anchor.getTime())) throw new Error('Invalid season start date.');
  const daysSinceTuesday = (anchor.getUTCDay() - 2 + 7) % 7;
  const start = new Date(anchor);
  start.setUTCDate(start.getUTCDate() - daysSinceTuesday + ((week - 1) * 7));
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 6);
  const startDateKey = dateKey(start);
  const endDateKey = dateKey(end);
  return {
    startDate: startDateKey,
    endDate: endDateKey,
    query: `${startDateKey.replaceAll('-', '')}-${endDateKey.replaceAll('-', '')}`,
  };
}

async function fetchLeague(league: 'nfl' | 'college-football', dates: string, revalidate = 60) {
  let failure: unknown;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(`${SCOREBOARD}/${league}/scoreboard?dates=${dates}&limit=100`, {
        headers: { accept: 'application/json' },
        next: { revalidate },
        signal: AbortSignal.timeout(8_000),
      });
      if (!response.ok) throw new Error(`Score provider returned ${response.status} for ${league}.`);
      return await response.json() as EspnScoreboard;
    } catch (error) {
      failure = error;
    }
  }
  throw failure instanceof Error ? failure : new Error(`Score provider failed for ${league}.`);
}

function watchedGameFromEvent(event: EspnEvent, key: WatchedTeamKey): WatchedTeamGame | null {
  const watched = watchedTeams[key];
  const competition = event.competitions?.[0];
  const competitors = competition?.competitors ?? [];
  const team = competitors.find((competitor) => competitor.team?.id === watched.id);
  const opponent = competitors.find((competitor) => competitor !== team);
  const type = competition?.status?.type;
  if (!event.id || !event.date || !team?.team || !opponent?.team || !type?.state) return null;
  const teamName = team.team.shortDisplayName ?? team.team.displayName ?? watched.label;
  const opponentName = opponent.team.shortDisplayName ?? opponent.team.displayName ?? 'OPPONENT';
  return {
    key,
    eventId: event.id,
    startsAt: event.date,
    team: watched.label,
    abbreviation: team.team.abbreviation ?? teamName.slice(0, 5).toUpperCase(),
    opponent: opponentName,
    opponentAbbreviation: opponent.team.abbreviation ?? opponentName.slice(0, 5).toUpperCase(),
    homeAway: team.homeAway ?? 'home',
    score: Number(team.score ?? 0),
    opponentScore: Number(opponent.score ?? 0),
    state: type.state === 'in' ? 'in' : type.state === 'post' ? 'post' : 'pre',
    detail: type.shortDetail ?? type.detail ?? (type.state === 'pre' ? 'SCHEDULED' : 'LIVE'),
    live: type.state === 'in' && !type.completed,
    completed: Boolean(type.completed),
  };
}

function watchedGamesFromEvents(date: string, collegeEvents: EspnEvent[], nflEvents: EspnEvent[]) {
  const weekday = new Date(`${date}T12:00:00.000Z`).getUTCDay();
  const keys: WatchedTeamKey[] = weekday === 6
    ? ['texas', 'arizona']
    : weekday === 0
      ? ['packers']
      : [];
  return keys.flatMap((key) => {
    const events = watchedTeams[key].league === 'nfl' ? nflEvents : collegeEvents;
    const event = events.find((candidate) => candidate.competitions?.[0]?.competitors?.some(
      (competitor) => competitor.team?.id === watchedTeams[key].id,
    ));
    const game = event ? watchedGameFromEvent(event, key) : null;
    return game ? [game] : [];
  });
}

export async function getWatchedTeamGames(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('Invalid watched-team date.');
  const dates = date.replaceAll('-', '');
  const [collegeFeed, nflFeed] = await Promise.all([
    fetchLeague('college-football', dates, 15),
    fetchLeague('nfl', dates, 15),
  ]);
  return watchedGamesFromEvents(date, collegeFeed.events ?? [], nflFeed.events ?? []);
}

async function fetchTeamDirectory(sport: Sport) {
  const league = sport === 'NFL' ? 'nfl' : 'college-football';
  const response = await fetch(`${SCOREBOARD}/${league}/teams?limit=500`, {
    headers: { accept: 'application/json' },
    next: { revalidate: 86_400 },
    signal: AbortSignal.timeout(8_000),
  });
  if (!response.ok) throw new Error(`Team directory returned ${response.status} for ${league}.`);
  const feed = await response.json() as EspnTeamsFeed;
  return feed.sports?.flatMap((sportEntry) => sportEntry.leagues ?? []).flatMap((leagueEntry) => leagueEntry.teams ?? []).flatMap((entry) => entry.team ? [entry.team] : []) ?? [];
}

async function fetchWeekEvents(sport: Sport, seasonStartDate: string, week: number) {
  const league = sport === 'NFL' ? 'nfl' : 'college-football';
  const feed = await fetchLeague(league, weekDateRange(seasonStartDate, week).query);
  return feed.events ?? [];
}

function scheduledGameFromEvent(event: EspnEvent, sport: Sport): ScheduledGame | null {
  const competitors = event.competitions?.[0]?.competitors ?? [];
  const awayCompetitor = competitors.find((team) => team.homeAway === 'away');
  const homeCompetitor = competitors.find((team) => team.homeAway === 'home');
  const away = awayCompetitor ? teamFromCompetitor(awayCompetitor) : null;
  const home = homeCompetitor ? teamFromCompetitor(homeCompetitor) : null;
  return event.id && event.date && away && home ? { eventId: event.id, sport, startsAt: event.date, away, home } : null;
}

export async function getScheduledGameById(sport: Sport, seasonStartDate: string, week: number, eventId: string) {
  const events = await fetchWeekEvents(sport, seasonStartDate, week);
  const event = events.find((candidate) => candidate.id === eventId);
  return event ? scheduledGameFromEvent(event, sport) : null;
}

function teamFromCompetitor(competitor: EspnCompetitor): ScheduleTeam | null {
  return teamFromEspnTeam(competitor.team);
}

function teamFromEspnTeam(team?: EspnTeam): ScheduleTeam | null {
  if (!team?.id) return null;
  const shortName = team.shortDisplayName ?? team.location ?? team.displayName ?? team.abbreviation ?? 'TEAM';
  const hurricanes = normalized(team.location ?? '') === 'miami' && normalized(team.name ?? '') === 'hurricanes';
  const miamiOhio = team.id === '193';
  return {
    id: team.id,
    name: hurricanes ? 'University of Miami' : miamiOhio ? 'Miami (Ohio)' : (team.displayName ?? shortName),
    shortName: hurricanes ? 'Miami' : miamiOhio ? 'Miami (Ohio)' : shortName,
    abbreviation: team.abbreviation ?? shortName.slice(0, 5).toUpperCase(),
  };
}

export async function searchScheduleCandidates(query: string, seasonStartDate: string, week: number) {
  const needle = normalized(query);
  if (needle.length < 2) return [];
  const [nflEvents, cfbEvents, nflTeams, cfbTeams] = await Promise.all([
    fetchWeekEvents('NFL', seasonStartDate, week),
    fetchWeekEvents('CFB', seasonStartDate, week),
    fetchTeamDirectory('NFL'),
    fetchTeamDirectory('CFB'),
  ]);
  const candidates: ScheduleCandidate[] = [];
  for (const [sport, events, teams] of [['NFL', nflEvents, nflTeams], ['CFB', cfbEvents, cfbTeams]] as const) {
    for (const rawTeam of teams) {
      const matchedTeam = teamFromEspnTeam(rawTeam);
      if (!matchedTeam) continue;
      const searchable = normalized(`${matchedTeam.name} ${matchedTeam.shortName} ${matchedTeam.abbreviation} ${rawTeam.location ?? ''}`);
      if (!searchable.includes(needle)) continue;
      const event = events.find((scheduled) => scheduled.competitions?.[0]?.competitors?.some((competitor) => competitor.team?.id === matchedTeam.id));
      const scheduledGame = event ? scheduledGameFromEvent(event, sport) : null;
      if (!scheduledGame) {
        candidates.push({ available: false, eventId: null, sport, startsAt: null, matchedTeamSide: null, matchedTeam, opponent: null, away: null, home: null });
        continue;
      }
      const { away, home } = scheduledGame;
      const matchedTeamSide = away.id === matchedTeam.id ? 'AWAY' : 'HOME';
      candidates.push({
        available: true,
        eventId: scheduledGame.eventId,
        sport,
        startsAt: scheduledGame.startsAt,
        matchedTeamSide,
        matchedTeam,
        opponent: matchedTeamSide === 'AWAY' ? home : away,
        away,
        home,
      });
    }
  }
  return candidates
    .sort((left, right) => left.matchedTeam.name.localeCompare(right.matchedTeam.name) || String(left.startsAt).localeCompare(String(right.startsAt)))
    .slice(0, 16);
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

function competitorPeriodScore(competitor: EspnCompetitor, period: Period) {
  if (period === 'FULL') {
    const score = Number(competitor.score);
    return Number.isFinite(score) ? score : null;
  }
  const wanted = period === '1Q' ? [1] : [1, 2];
  const scores = wanted.map((quarter) => competitor.linescores?.find((line) => line.period === quarter)?.value);
  return scores.every((score): score is number => typeof score === 'number')
    ? scores.reduce((total, score) => total + score, 0)
    : null;
}

function structuredSelectedCompetitor(pick: RuntimePick, competitors: EspnCompetitor[]) {
  if (pick.selectionSide === 'HOME') return competitors.find((competitor) => competitor.homeAway === 'home') ?? null;
  if (pick.selectionSide === 'AWAY') return competitors.find((competitor) => competitor.homeAway === 'away') ?? null;
  return null;
}

function legacySelection(bet: string) {
  const spreadMatch = bet.match(/^(.*?)\s*([+-]\s*[0-9]+(?:\.[0-9]+)?)\s*$/i);
  const raw = (spreadMatch?.[1] ?? bet).replace(/\b(?:moneyline|money line|ml)\b/gi, '').trim();
  return { spreadMatch, selection: raw.split(/[,|]/).at(-1)?.trim() ?? raw };
}

function gradeCompletedEvent(event: EspnEvent, pick: RuntimePick): CompletedPickGrade | null {
  const competition = event.competitions?.[0];
  if (!competition?.status?.type?.completed) return null;
  const competitors = competition.competitors ?? [];
  if (competitors.length !== 2) return null;
  const scores = competitors.map((competitor) => competitorPeriodScore(competitor, pick.period));
  if (scores.some((score) => score === null)) return null;
  const numericScores = scores as number[];
  let result: Extract<Result, 'W' | 'L' | 'P'> | null = null;

  if (pick.market && pick.selectionSide) {
    if (pick.market === 'TOTAL') {
      if (pick.line === null || !['OVER', 'UNDER'].includes(pick.selectionSide)) return null;
      const total = numericScores[0] + numericScores[1];
      result = compare(pick.selectionSide === 'OVER' ? total - pick.line : pick.line - total);
    } else {
      const selected = structuredSelectedCompetitor(pick, competitors);
      const opponent = competitors.find((competitor) => competitor !== selected);
      if (!selected || !opponent) return null;
      const selectedScore = competitorPeriodScore(selected, pick.period);
      const opponentScore = competitorPeriodScore(opponent, pick.period);
      if (selectedScore === null || opponentScore === null) return null;
      const line = pick.market === 'SPREAD' ? (pick.line ?? 0) : 0;
      result = compare(selectedScore + line - opponentScore);
    }
  } else {
    const totalMatch = pick.bet.match(/(?:^|\b)(over|under|o|u)\s*([0-9]+(?:\.[0-9]+)?)/i);
    if (totalMatch) {
      const total = numericScores[0] + numericScores[1];
      const line = Number(totalMatch[2]);
      result = compare(totalMatch[1].toLowerCase().startsWith('o') ? total - line : line - total);
    } else {
      const { spreadMatch, selection } = legacySelection(pick.bet);
      const selected = selectedCompetitor(selection, competitors) ?? selectedCompetitor(pick.game, competitors);
      const opponent = competitors.find((competitor) => competitor !== selected);
      if (!selected || !opponent) return null;
      const selectedScore = competitorPeriodScore(selected, pick.period);
      const opponentScore = competitorPeriodScore(opponent, pick.period);
      if (selectedScore === null || opponentScore === null) return null;
      const line = spreadMatch ? Number(spreadMatch[2].replace(/\s/g, '')) : 0;
      result = compare(selectedScore + line - opponentScore);
    }
  }

  const ticker = scoreFromEvent(event);
  const periodLabel = pick.period === 'FULL' ? '' : `${pick.period} · `;
  return result && ticker ? {
    pick,
    result,
    eventId: ticker.id,
    finalScore: `${periodLabel}${ticker.away} ${numericScores[0]} · ${ticker.home} ${numericScores[1]}`,
  } : null;
}

async function eventsForPicks(picks: RuntimePick[], seasonStartDate: string) {
  const keys = [...new Set(picks.map((pick) => `${pick.sport}:${pick.week}`))];
  const batches = await Promise.all(keys.map(async (key) => {
    const [sport, week] = key.split(':') as [Sport, string];
    return [key, await fetchWeekEvents(sport, seasonStartDate, Number(week))] as const;
  }));
  return new Map(batches);
}

export async function getPickedGameScores(picks: RuntimePick[], seasonStartDate: string, week: number) {
  const relevant = picks.filter((pick) => pick.week === week);
  if (!relevant.length) return [];
  const eventsBySportWeek = await eventsForPicks(relevant, seasonStartDate);
  const matched = relevant.flatMap((pick) => matchingEventsForPick(eventsBySportWeek.get(`${pick.sport}:${pick.week}`) ?? [], pick));
  return [...new Map(matched.map((event) => [event.id, event])).values()]
    .map(scoreFromEvent)
    .filter((score): score is TickerScore => score !== null)
    .sort((left, right) => Number(right.live) - Number(left.live) || String(left.startsAt).localeCompare(String(right.startsAt)));
}

export async function getCompletedPickGrades(picks: RuntimePick[], seasonStartDate: string) {
  const relevant = picks.filter((pick) => pick.result === 'PENDING' || pick.result === 'LIVE');
  if (!relevant.length) return [];
  const eventsBySportWeek = await eventsForPicks(relevant, seasonStartDate);
  return relevant.flatMap((pick) => {
    const events = eventsBySportWeek.get(`${pick.sport}:${pick.week}`) ?? [];
    const event = matchingEventsForPick(events, pick)[0];
    const grade = event ? gradeCompletedEvent(event, pick) : null;
    return grade ? [grade] : [];
  });
}

export const scoreFeedInternals = {
  matchesPick,
  matchingEventsForPick,
  gradeCompletedEvent,
  weekDateRange,
  watchedGameFromEvent,
  watchedGamesFromEvents,
};

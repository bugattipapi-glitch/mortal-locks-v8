import { historicalSeasons, lifetimeRecords, type HistoricalPick } from './history';

export function pushNeutralPct(wins: number, losses: number) {
  return wins + losses ? wins / (wins + losses) : 0;
}

export function displayPct(value: number) {
  return value.toFixed(3).replace(/^0/, '');
}

export const allTimeStandings = Object.entries(lifetimeRecords)
  .map(([name, record]) => ({
    name,
    ...record,
    pct: pushNeutralPct(record.wins, record.losses),
  }))
  .sort((a, b) => b.pct - a.pct || b.wins - a.wins || a.losses - b.losses || a.name.localeCompare(b.name));

type PickWithSeason = HistoricalPick & { season: number };

const allPicks: PickWithSeason[] = Object.values(historicalSeasons).flatMap((season) =>
  season.picks.map((pick) => ({ ...pick, season: season.number })),
);

export const archivedPickCount = allPicks.length;

function normalizedTeam(bet: string) {
  if (/^points\s+(over|under)/i.test(bet)) return null;
  const team = bet.replace(/\s+[+-]\d+(?:\.\d+)?\s*$/i, '').trim();
  const aliases: Record<string, string> = {
    Flacons: 'Falcons',
    TXAM: 'Texas A&M',
    'Penn St.': 'Penn State',
    'Penn St': 'Penn State',
    'Ohio St.': 'Ohio State',
  };
  return aliases[team] ?? team;
}

export const mostPickedTeams = allTimeStandings.map(({ name }) => {
  const counts = new Map<string, number>();
  for (const pick of allPicks.filter((item) => item.player === name)) {
    const team = normalizedTeam(pick.bet);
    if (team) counts.set(team, (counts.get(team) ?? 0) + 1);
  }
  const max = Math.max(0, ...counts.values());
  const teams = [...counts.entries()]
    .filter(([, count]) => count === max)
    .map(([team]) => team)
    .sort();
  return { name, teams, count: max };
});

type TeamRecord = {
  team: string;
  wins: number;
  losses: number;
  pushes: number;
  picks: number;
  pct: number;
};

const teamRecords = (() => {
  const records = new Map<string, Omit<TeamRecord, 'team' | 'pct'>>();
  for (const pick of allPicks) {
    const team = normalizedTeam(pick.bet);
    if (!team) continue;
    const record = records.get(team) ?? { wins: 0, losses: 0, pushes: 0, picks: 0 };
    record.picks += 1;
    if (pick.result === 'W') record.wins += 1;
    if (pick.result === 'L') record.losses += 1;
    if (pick.result === 'P') record.pushes += 1;
    records.set(team, record);
  }
  return [...records.entries()].map(([team, record]) => ({
    team,
    ...record,
    pct: pushNeutralPct(record.wins, record.losses),
  }));
})();

// Eight picks keeps the team awards meaningful without rewarding a one-off flier.
const qualifiedTeamRecords = teamRecords.filter((record) => record.picks >= 8);
const bestTeam = [...qualifiedTeamRecords].sort((a, b) => b.pct - a.pct || b.picks - a.picks)[0];
const worstTeam = [...qualifiedTeamRecords].sort((a, b) => a.pct - b.pct || b.picks - a.picks)[0];
const zombieTeam = [...qualifiedTeamRecords]
  .filter((record) => record.pct < 0.5)
  .sort((a, b) => b.picks - a.picks || a.pct - b.pct)[0];

function longestRun(player: string, result: 'W' | 'L') {
  let current = 0;
  let longest = 0;
  let activeSeason = 0;
  for (const pick of allPicks.filter((item) => item.player === player).sort((a, b) => a.season - b.season || a.week - b.week || a.slot - b.slot)) {
    if (pick.season !== activeSeason) {
      current = 0;
      activeSeason = pick.season;
    }
    if (pick.result === result) {
      current += 1;
      longest = Math.max(longest, current);
    } else {
      current = 0;
    }
  }
  return longest;
}

function twoWinWeeks(player: string) {
  const buckets = new Map<string, number>();
  for (const pick of allPicks.filter((item) => item.player === player && item.result === 'W')) {
    const key = `${pick.season}-${pick.week}`;
    buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }
  return [...buckets.values()].filter((wins) => wins >= 2).length;
}

const seasonRecords = Object.values(historicalSeasons).flatMap((season) =>
  Object.entries(season.records).map(([name, record]) => ({
    name,
    season: season.number,
    ...record,
    pct: pushNeutralPct(record.wins, record.losses),
  })),
);

const bestSeason = [...seasonRecords].sort((a, b) => b.pct - a.pct)[0];
const worstSeason = [...seasonRecords].sort((a, b) => a.pct - b.pct)[0];
const longestWinners = allTimeStandings
  .map(({ name }) => ({ name, streak: longestRun(name, 'W') }))
  .sort((a, b) => b.streak - a.streak);
const longestLoser = allTimeStandings
  .map(({ name }) => ({ name, streak: longestRun(name, 'L') }))
  .sort((a, b) => b.streak - a.streak)[0];
const biggestDog = allPicks
  .filter((pick) => /\+\d/.test(pick.bet) && pick.result === 'W')
  .map((pick) => ({ ...pick, line: Number(pick.bet.match(/\+(\d+(?:\.\d+)?)/)?.[1] ?? 0) }))
  .sort((a, b) => b.line - a.line)[0];
const biggestFavoriteLoss = allPicks
  .filter((pick) => /-\d/.test(pick.bet) && pick.result === 'L')
  .map((pick) => ({ ...pick, line: Number(pick.bet.match(/-(\d+(?:\.\d+)?)/)?.[1] ?? 0) }))
  .sort((a, b) => b.line - a.line)[0];
const underCounts = allTimeStandings
  .map(({ name }) => ({ name, count: allPicks.filter((pick) => pick.player === name && /^points under/i.test(pick.bet)).length }))
  .sort((a, b) => b.count - a.count);
const ceciFavoriteRecord = allPicks.filter((pick) => pick.player === 'Ceci' && /-\d/.test(pick.bet));
const ceciFavoriteWins = ceciFavoriteRecord.filter((pick) => pick.result === 'W').length;
const ceciFavoriteLosses = ceciFavoriteRecord.filter((pick) => pick.result === 'L').length;
const ceciFavoritePushes = ceciFavoriteRecord.filter((pick) => pick.result === 'P').length;
const joe = lifetimeRecords.Joe;
const brad = lifetimeRecords.Brad;
const ironLock = [...allTimeStandings].sort((a, b) => b.wins - a.wins)[0];

export type Accolade = {
  title: string;
  player: string;
  stat: string;
  detail: string;
  tone: 'gold' | 'red' | 'cyan' | 'purple';
};

export const accolades: Accolade[] = [
  {
    title: 'UNDER TAKER',
    player: underCounts[0].name,
    stat: `${underCounts[0].count} UNDERS`,
    detail: 'Most lifetime trips to the dark side of the total.',
    tone: 'purple',
  },
  {
    title: 'ON A HEATER',
    player: longestWinners.filter((row) => row.streak === longestWinners[0].streak).map((row) => row.name).join(' + '),
    stat: `${longestWinners[0].streak} STRAIGHT WINS`,
    detail: 'The longest verified winning streak in the tape vault.',
    tone: 'red',
  },
  {
    title: 'DAVID-ING THE GOLIATH',
    player: biggestDog.player,
    stat: `${biggestDog.bet} · CASHED`,
    detail: `ML ${biggestDog.season}, Week ${biggestDog.week}: the biggest underdog to survive.`,
    tone: 'cyan',
  },
  {
    title: 'THE ABYSS',
    player: worstSeason.name,
    stat: `${worstSeason.wins}-${worstSeason.losses}-${worstSeason.pushes} · ${displayPct(worstSeason.pct)}`,
    detail: `The lowest season win rate on record, Mortal Locks ${worstSeason.season}.`,
    tone: 'purple',
  },
  {
    title: 'TILT MODE',
    player: longestLoser.name,
    stat: `${longestLoser.streak} STRAIGHT LOSSES`,
    detail: 'A controller-through-the-TV losing streak.',
    tone: 'red',
  },
  {
    title: 'CHALK GRAVEYARD',
    player: biggestFavoriteLoss.player,
    stat: `${biggestFavoriteLoss.bet} · LOST`,
    detail: `The largest favorite to become a headstone, ML ${biggestFavoriteLoss.season} Week ${biggestFavoriteLoss.week}.`,
    tone: 'red',
  },
  {
    title: 'HIGH SCORE',
    player: bestSeason.name,
    stat: `${bestSeason.wins}-${bestSeason.losses}-${bestSeason.pushes} · ${displayPct(bestSeason.pct)}`,
    detail: `Best single-season win rate, Mortal Locks ${bestSeason.season}.`,
    tone: 'gold',
  },
  {
    title: 'CHALK QUEEN',
    player: 'Ceci',
    stat: `${ceciFavoriteWins}-${ceciFavoriteLosses}-${ceciFavoritePushes} ON FAVORITES`,
    detail: `${ceciFavoriteRecord.length} favorites and ${twoWinWeeks('Ceci')} perfect 2–0 weeks: Ceci wins by making the favorite prove it.`,
    tone: 'gold',
  },
  {
    title: 'THE .500 MACHINE',
    player: 'Joe',
    stat: `${joe.wins}-${joe.losses}-${joe.pushes}`,
    detail: 'After 144 recorded picks: exactly as many wins as losses. Factory calibrated.',
    tone: 'cyan',
  },
  {
    title: 'BY A NOSE',
    player: 'Brad',
    stat: `${brad.wins}-${brad.losses}-${brad.pushes}`,
    detail: 'One win above the break-even line after 144 recorded picks. Every pixel counts.',
    tone: 'gold',
  },
  {
    title: 'IRON LOCK',
    player: ironLock.name,
    stat: `${ironLock.wins} ALL-TIME WINS`,
    detail: `No one has cashed more recorded Mortal Locks picks across Seasons ${ironLock.seasons.join(', ')}.`,
    tone: 'gold',
  },
];

export const teamAccolades: Accolade[] = [
  {
    title: 'GOLDEN FRANCHISE',
    player: bestTeam.team,
    stat: `${bestTeam.wins}-${bestTeam.losses}-${bestTeam.pushes} · ${displayPct(bestTeam.pct)}`,
    detail: `Best record among teams picked at least eight times (${bestTeam.picks} total picks).`,
    tone: 'gold',
  },
  {
    title: 'TEAM OF DOOM',
    player: worstTeam.team,
    stat: `${worstTeam.wins}-${worstTeam.losses}-${worstTeam.pushes} · ${displayPct(worstTeam.pct)}`,
    detail: `Worst record among teams picked at least eight times (${worstTeam.picks} total picks).`,
    tone: 'red',
  },
  {
    title: 'ZOMBIE TEAM',
    player: zombieTeam.team,
    stat: `${zombieTeam.picks} PICKS · ${zombieTeam.wins}-${zombieTeam.losses}-${zombieTeam.pushes}`,
    detail: 'The most-picked team with a losing record. It keeps coming back, and so do the bettors.',
    tone: 'purple',
  },
];

export const provisionalChampions = [
  { season: 1, title: 'The First Lock', champion: 'Brad' },
  { season: 2, title: 'The Sequel', champion: 'Joe' },
  { season: 3, title: 'Third Time Is Mortal', champion: 'Ceci' },
  { season: 4, title: 'Burn The Boats', champion: 'Jay' },
  { season: 5, title: 'Become Death', champion: 'AJ' },
  { season: 6, title: 'KEV-olutionary War', champion: 'Kohler' },
  { season: 7, title: 'All In', champion: 'Kev' },
] as const;

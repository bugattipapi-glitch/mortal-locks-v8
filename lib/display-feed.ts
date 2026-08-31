import { pickDisplay } from './pick-display';
import type { Result } from './data';
import type { RuntimePick, RuntimeSnapshot } from './runtime-data';

export type DisplayPick = {
  slot: 1 | 2;
  text: string;
  ticker_text: string;
  result: Result;
  color: string;
  status: string;
};

export type DisplayPage = {
  id: string;
  player: string;
  picks: DisplayPick[];
};

export type DisplayFeed = {
  schema_version: 1;
  available: boolean;
  season: number;
  week: number;
  updated_at: string;
  pages: DisplayPage[];
};

const RESULT_COLORS: Record<Result, string> = {
  W: '#45ff72',
  L: '#ff405c',
  P: '#82dcff',
  LIVE: '#ffd84a',
  PENDING: '#ffd84a',
};

const RESULT_LABELS: Record<Result, string> = {
  W: 'W',
  L: 'L',
  P: 'P',
  LIVE: 'LIVE',
  PENDING: '·',
};

const TEAM_REPLACEMENTS: Array<[RegExp, string]> = [
  [/New Mexico State/gi, 'NMSU'],
  [/North Carolina State/gi, 'NCST'],
  [/South Carolina/gi, 'SC'],
  [/Florida State/gi, 'FSU'],
  [/Arizona State/gi, 'ASU'],
  [/Michigan State/gi, 'MSU'],
  [/Penn State/gi, 'PSU'],
  [/Texas A&M/gi, 'TX A&M'],
  [/Notre Dame/gi, 'ND'],
  [/Ohio State/gi, 'OSU'],
  [/Tennessee/gi, 'TENN'],
  [/Cincinnati/gi, 'CINCY'],
  [/Louisiana State/gi, 'LSU'],
  [/University/gi, 'U'],
  [/State/gi, 'ST'],
  [/Points?/gi, 'PTS'],
  [/Over/gi, 'O'],
  [/Under/gi, 'U'],
  [/NM ST/gi, 'NMSU'],
  [/NC ST/gi, 'NCST'],
  [/MICH ST/gi, 'MSU'],
  [/PENN ST/gi, 'PSU'],
  [/OHIO ST/gi, 'OSU'],
];

function lineValue(value: number | null) {
  if (value === null) return '';
  return `${value >= 0 ? '+' : ''}${Number.isInteger(value) ? value : value}`;
}

function compact(value: string, max = 12) {
  let result = value.toUpperCase();
  for (const [pattern, replacement] of TEAM_REPLACEMENTS) {
    result = result.replace(pattern, replacement);
  }
  result = result.replace(/\s+/g, ' ').trim();
  return result.length > max ? result.slice(0, max).trimEnd() : result;
}

function structuredPickText(pick: RuntimePick, selectedTeamMax = 7, matchupTeamMax = 4) {
  if (!pick.market || !pick.selectionSide) return null;
  const away = pick.awayTeamAbbreviation ?? pick.awayTeamName;
  const home = pick.homeTeamAbbreviation ?? pick.homeTeamName;
  if (pick.market === 'TOTAL') {
    const side = pick.selectionSide === 'OVER' ? 'O' : 'U';
    const matchup = [away, home]
      .filter(Boolean)
      .map((team) => compact(String(team), matchupTeamMax))
      .join('/');
    return `${matchup} ${side}${pick.line ?? ''}`.trim();
  }
  const selected = pick.selectionSide === 'HOME' ? home : away;
  if (!selected) return null;
  return `${compact(selected, selectedTeamMax)} ${pick.market === 'MONEYLINE' ? 'ML' : lineValue(pick.line)}`.trim();
}

export function compactPickText(pick: RuntimePick) {
  return compact(structuredPickText(pick) ?? pickDisplay(pick).primary);
}

export function tickerPickText(pick: RuntimePick) {
  return compact(structuredPickText(pick, 12, 6) ?? pickDisplay(pick).primary, 24);
}

export function buildDisplayFeed(snapshot: RuntimeSnapshot, now = new Date()): DisplayFeed {
  const season = snapshot.season.number;
  const week = snapshot.season.currentWeek;
  const pages = snapshot.players
    .filter((player) => player.active)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name))
    .map((player) => {
      const picks = snapshot.picks
        .filter((pick) => pick.week === week && pick.playerSlug === player.slug)
        .sort((a, b) => a.slot - b.slot)
        .map((pick) => ({
          slot: pick.slot,
          text: compactPickText(pick),
          ticker_text: tickerPickText(pick),
          result: pick.result,
          color: RESULT_COLORS[pick.result],
          status: RESULT_LABELS[pick.result],
        }));
      return {
        id: `s${season}-w${week}-${player.slug}`,
        player: player.name.toUpperCase().slice(0, 8),
        picks,
      };
    })
    .filter((page) => page.picks.length > 0);

  return {
    schema_version: 1,
    available: snapshot.dataMode === 'database',
    season,
    week,
    updated_at: now.toISOString(),
    pages: snapshot.dataMode === 'database' ? pages : [],
  };
}

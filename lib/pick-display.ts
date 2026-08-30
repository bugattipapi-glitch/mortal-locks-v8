import type { RuntimePick } from './runtime-data';

function compactLine(value: number) {
  return `${value >= 0 ? '+' : ''}${Number.isInteger(value) ? value : value}`;
}

function relation(pick: RuntimePick, selected: string, opponent: string) {
  if (!pick.eventId || !pick.selectionSide) return `vs ${opponent}`;
  return `${pick.selectionSide === 'AWAY' ? 'at' : 'vs'} ${opponent}`;
}

export function pickDisplay(pick: RuntimePick) {
  const period = pick.period === 'FULL' ? '' : `${pick.period} · `;
  if (pick.eventId && pick.market && pick.selectionSide) {
    const away = pick.awayTeamName ?? pick.awayTeamAbbreviation ?? 'Away';
    const home = pick.homeTeamName ?? pick.homeTeamAbbreviation ?? 'Home';
    if (pick.market === 'TOTAL') {
      return { primary: `${away} / ${home} ${pick.selectionSide === 'OVER' ? 'O' : 'U'}${pick.line}`, secondary: `${period}game total`.trim() };
    }
    const selected = pick.selectionSide === 'HOME' ? home : away;
    const opponent = pick.selectionSide === 'HOME' ? away : home;
    const wager = pick.market === 'MONEYLINE' ? 'ML' : compactLine(pick.line ?? 0);
    return { primary: `${selected} ${wager}`, secondary: `${period}${relation(pick, selected, opponent)}` };
  }

  const total = pick.bet.match(/^(.*?)\s+(O|U|OVER|UNDER)\s*([0-9]+(?:\.[0-9]+)?)$/i);
  if (total) {
    const firstTeam = total[1].split(/[,|]/).at(-1)?.trim() || total[1].trim();
    const gameTeams = pick.game.split(/\s+(?:vs\.?|versus|at)\s+|\s*@\s*/i).map((team) => team.trim()).filter(Boolean);
    const genericPrefix = /^(?:points?|total|game)$/i.test(firstTeam);
    const teams = genericPrefix && gameTeams.length >= 2
      ? `${gameTeams[0]} / ${gameTeams[1]}`
      : firstTeam.toLowerCase() === pick.game.trim().toLowerCase() ? firstTeam : `${firstTeam} / ${pick.game.trim()}`;
    return { primary: `${teams} ${total[2].toUpperCase().startsWith('O') ? 'O' : 'U'}${total[3]}`, secondary: period ? `${period}game total` : 'game total' };
  }
  const spread = pick.bet.match(/^(.*?)\s*([+-]\s*[0-9]+(?:\.[0-9]+)?)\s*$/);
  if (spread) {
    const names = spread[1].split(/[,|]/).map((name) => name.trim()).filter(Boolean);
    const gameTeams = pick.game.split(/\s+(?:vs\.?|versus|at)\s+|\s*@\s*/i).map((team) => team.trim()).filter(Boolean);
    const legacySelected = gameTeams.length === 1 && spread[1].trim().toLowerCase().endsWith(gameTeams[0].toLowerCase())
      ? gameTeams[0]
      : null;
    const selected = names.length > 1 ? names.at(-1)! : legacySelected ?? spread[1].trim();
    const legacyOpponent = legacySelected
      ? spread[1].trim().slice(0, -legacySelected.length).replace(/[,|]+$/, '').trim()
      : '';
    const opponent = names.length > 1
      ? names.at(-2)!
      : legacyOpponent || gameTeams.find((team) => team.toLowerCase() !== selected.toLowerCase()) || pick.game;
    return { primary: `${selected} ${spread[2].replace(/\s/g, '')}`, secondary: `${period}vs ${opponent}` };
  }
  return { primary: pick.bet, secondary: `${period}${pick.game}` };
}

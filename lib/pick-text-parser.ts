import type { Period, Sport } from './data';

export type ParsedTextPick = {
  id: string;
  line: string;
  playerSlug?: string;
  playerName?: string;
  slot?: 1 | 2;
  sport?: Sport;
  period: Period;
  game?: string;
  bet?: string;
  commentary: string;
  warnings: string[];
  ready: boolean;
};

type ParserPlayer = { slug: string; name: string; short: string };

const ambiguousAliases = new Set(['OSU', 'USC', 'MSU']);
const sportPattern = /\b(CFB|NCAAF|COLLEGE|NFL)\b/i;
const slotPattern = /(?:^|\s)(?:P(?:ICK)?\s*)?([12])(?:\s|$|[:|-])/i;

function compact(value: string) {
  return value.trim().replace(/\s+/g, ' ');
}

function playerForLine(line: string, players: ParserPlayer[]) {
  const normalized = line.toUpperCase();
  return players
    .slice()
    .sort((a, b) => b.name.length - a.name.length)
    .find((player) => new RegExp(`(?:^|[^A-Z0-9])(?:${player.name}|${player.short})(?=$|[^A-Z0-9])`, 'i').test(normalized));
}

function inferGameAndBet(raw: string) {
  const separators = [/[|;]/, /\s+-\s+/, /\s+=>\s+/, /\s+LOCKS?\s+/i];
  for (const separator of separators) {
    const parts = raw.split(separator).map(compact).filter(Boolean);
    if (parts.length >= 2) return { game: parts[0], bet: parts.slice(1).join(' ') };
  }
  const vs = raw.match(/^(.+?\b(?:VS\.?|V\.)\b.+?)(?:\s{2,}|\s+PICK:\s*)(.+)$/i);
  return vs ? { game: compact(vs[1]), bet: compact(vs[2]) } : {};
}

export function parseTextPicks(text: string, players: ParserPlayer[], defaultSport: Sport): ParsedTextPick[] {
  const nextSlot = new Map<string, 1 | 2>();
  return text
    .split(/\r?\n/)
    .map(compact)
    .filter(Boolean)
    .slice(0, 36)
    .map((line, index) => {
      const player = playerForLine(line, players);
      const explicitSlot = line.match(slotPattern)?.[1];
      const slot = explicitSlot ? Number(explicitSlot) as 1 | 2 : player ? nextSlot.get(player.slug) ?? 1 : undefined;
      if (player && slot) nextSlot.set(player.slug, slot === 1 ? 2 : 2);
      const sportMatch = line.match(sportPattern)?.[1]?.toUpperCase();
      const sport = sportMatch ? (sportMatch === 'NFL' ? 'NFL' : 'CFB') : defaultSport;
      const period: Period = /\b(?:1H|FIRST HALF)\b/i.test(line) ? '1H' : /\b(?:1Q|FIRST QUARTER)\b/i.test(line) ? '1Q' : 'FULL';
      const commentaryMatch = line.match(/(?:BOOTH|CALL|NOTE)\s*:\s*([^|;]+)/i);
      const commentary = compact(commentaryMatch?.[1] ?? '').toUpperCase();
      let remainder = line
        .replace(player ? new RegExp(`(?:^|[^A-Z0-9])(?:${player.name}|${player.short})(?=$|[^A-Z0-9])`, 'i') : /$^/, ' ')
        .replace(slotPattern, ' ')
        .replace(sportPattern, ' ')
        .replace(/\b(?:1H|FIRST HALF|1Q|FIRST QUARTER|FULL GAME)\b/i, ' ')
        .replace(/(?:BOOTH|CALL|NOTE)\s*:\s*.+$/i, ' ');
      remainder = remainder.replace(/^[\s·:|;-]+|[\s·:|;-]+$/g, '');
      remainder = compact(remainder.replace(/^[:|;-]+|[:|;-]+$/g, ''));
      const { game, bet } = inferGameAndBet(remainder);
      const warnings: string[] = [];
      if (!player) warnings.push('PLAYER NOT RECOGNIZED');
      if (!slot) warnings.push('PICK SLOT NOT FOUND');
      if (!game || !bet) warnings.push('USE “GAME | PICK” TO SEPARATE THE MATCHUP AND BET');
      if (ambiguousAliases.has((`${game ?? ''} ${bet ?? ''}`.match(/\b(OSU|USC|MSU)\b/i)?.[1] ?? '').toUpperCase())) warnings.push('SPELL OUT OSU, USC, OR MSU');
      return {
        id: `${index}-${line}`,
        line,
        playerSlug: player?.slug,
        playerName: player?.name,
        slot,
        sport,
        period,
        game,
        bet,
        commentary,
        warnings,
        ready: warnings.length === 0,
      };
    });
}

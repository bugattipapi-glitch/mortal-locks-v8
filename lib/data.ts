export type Result = 'W' | 'L' | 'P' | 'PENDING' | 'LIVE';
export type Sport = 'CFB' | 'NFL';
export type Period = 'FULL' | '1H' | '1Q';
export type Market = 'SPREAD' | 'TOTAL' | 'MONEYLINE';
export type BetSide = 'HOME' | 'AWAY' | 'OVER' | 'UNDER';

export type PickSelection = {
  sport: Sport;
  game: string;
  bet: string;
  result: Result;
  period?: Period;
  force?: boolean;
  manualOverride?: boolean;
};

export type PlayerWeek = {
  player: string;
  picks: [PickSelection, PickSelection];
  note?: string;
};

export const season = {
  number: 8,
  title: 'The Ocho',
  startDate: '2026-08-29',
  currentWeek: 1,
  status: 'PRESEASON'
};

export const players = [
  { name: 'AJ', short: 'AJ', avatar: 'AJ' },
  { name: 'Joe', short: 'JO', avatar: 'JO' },
  { name: 'Ceci', short: 'CE', avatar: 'CE' },
  { name: 'Kev', short: 'KV', avatar: 'KV' },
  { name: 'Brad', short: 'BR', avatar: 'BR' },
  { name: 'Kohler', short: 'KO', avatar: 'KO' },
  { name: 'Blaine', short: 'BL', avatar: 'BL' },
  { name: 'Steve', short: 'ST', avatar: 'ST' },
  { name: 'Jay', short: 'JY', avatar: 'JY' }
];

// Preview-only picks so we can judge the visual hierarchy before the database is connected.
// Week 1 correctly supports two college picks. The data model also supports two NFL picks later in the season.
export const demoPicks: PlayerWeek[] = [
  {
    player: 'AJ',
    picks: [
      { sport: 'CFB', game: 'Ohio State vs Michigan', bet: 'Ohio State -6.5', result: 'W' },
      { sport: 'CFB', game: 'Texas vs Oklahoma', bet: 'Texas -3', result: 'LIVE' }
    ],
    note: 'SOME SPREAD'
  },
  {
    player: 'Joe',
    picks: [
      { sport: 'CFB', game: 'Penn State vs WVU', bet: 'Penn State +5.5', result: 'L' },
      { sport: 'CFB', game: 'LSU vs Clemson', bet: 'Points Over 51', result: 'LIVE' }
    ]
  },
  {
    player: 'Ceci',
    picks: [
      { sport: 'CFB', game: 'Notre Dame vs Miami', bet: 'Notre Dame -3', result: 'W' },
      { sport: 'CFB', game: 'USC vs UCLA', bet: 'USC -2.5', result: 'PENDING' }
    ]
  },
  {
    player: 'Kev',
    picks: [
      { sport: 'CFB', game: 'Alabama vs FSU', bet: 'Points Over 54', result: 'P' },
      { sport: 'CFB', game: 'Oregon vs Boise State', bet: 'Oregon -8', result: 'PENDING' }
    ],
    note: 'PUSH JOB'
  },
  {
    player: 'Brad',
    picks: [
      { sport: 'CFB', game: 'Miami vs Florida', bet: 'Miami -2.5', result: 'L' },
      { sport: 'CFB', game: 'Georgia vs Clemson', bet: 'Georgia -7.5', result: 'PENDING' }
    ]
  },
  {
    player: 'Kohler',
    picks: [
      { sport: 'CFB', game: 'Clemson vs Georgia', bet: 'Clemson +7', result: 'W' },
      { sport: 'CFB', game: 'Nebraska vs Cincinnati', bet: 'Nebraska -6.5', result: 'PENDING' }
    ]
  },
  {
    player: 'Blaine',
    picks: [
      { sport: 'CFB', game: 'Michigan vs Ohio State', bet: 'Points Over 43', result: 'W' },
      { sport: 'CFB', game: 'Michigan vs Ohio State', bet: 'Points Under 44.5', result: 'PENDING' }
    ],
    note: 'THE MIDDLE IS ALIVE'
  },
  {
    player: 'Steve',
    picks: [
      { sport: 'CFB', game: 'Maryland vs FAU', bet: 'Maryland -14', result: 'L' },
      { sport: 'CFB', game: 'Tennessee vs Syracuse', bet: 'Tennessee -13.5', result: 'PENDING' }
    ]
  },
  {
    player: 'Jay',
    picks: [
      { sport: 'CFB', game: 'Oregon vs Montana State', bet: 'Oregon -28.5', result: 'PENDING', force: true },
      { sport: 'CFB', game: 'Texas A&M vs Arkansas', bet: 'Texas A&M -6', result: 'PENDING' }
    ]
  }
];

export const demoStandings = [
  { name: 'AJ', wins: 1, losses: 0, pushes: 0 },
  { name: 'Ceci', wins: 1, losses: 0, pushes: 0 },
  { name: 'Kohler', wins: 1, losses: 0, pushes: 0 },
  { name: 'Blaine', wins: 1, losses: 0, pushes: 0 },
  { name: 'Kev', wins: 0, losses: 0, pushes: 1 },
  { name: 'Joe', wins: 0, losses: 1, pushes: 0 },
  { name: 'Brad', wins: 0, losses: 1, pushes: 0 },
  { name: 'Steve', wins: 0, losses: 1, pushes: 0 },
  { name: 'Jay', wins: 0, losses: 0, pushes: 0 }
].map((row) => ({
  ...row,
  pct: row.wins + row.losses ? row.wins / (row.wins + row.losses) : 0
}));

export const demoScores = [
  { id: 'osu-mich', away: 'OSU', home: 'MICH', awayScore: 21, homeScore: 17, state: '2Q 7:45', live: true },
  { id: 'tex-ou', away: 'TEX', home: 'OU', awayScore: 30, homeScore: 27, state: '4Q 1:32', live: true },
  { id: 'lsu-clem', away: 'LSU', home: 'CLEM', awayScore: 14, homeScore: 10, state: '3Q 2:10', live: true },
  { id: 'mia-fla', away: 'MIA', home: 'FLA', awayScore: 17, homeScore: 20, state: 'FINAL', live: false }
];

export const commentaryRules = [
  { label: 'SOME SPREAD', detail: 'A win or loss lands within 1 point of the number.' },
  { label: 'THE MIDDLE IS ALIVE', detail: 'Opposing bets leave a gap where both players can cash.' },
  { label: 'HOOKED', detail: 'The half-point hook decides the pick.' },
  { label: 'BACKDOOR COVER', detail: 'A late, mostly meaningless score flips the result against the spread.' },
  { label: 'BAD BEAT', detail: 'A pick that looked dead-certain gets flipped in the final moments.' },
  { label: 'PUSH JOB', detail: 'Exactly on the number. Nobody gets to feel good.' },
  { label: 'MORTAL LOCK OF THE WEEK', detail: 'Largest clean win of the week.' },
  { label: 'TOTAL DISASTER', detail: 'Largest loss against the number.' },
  { label: 'UNDER TAKER', detail: 'Occasionally awarded to the league member most committed to betting unders.' },
  { label: 'CHALK EATER', detail: 'A truly irresponsible favorite, usually -20 or worse.' },
  { label: 'SICKO PICK', detail: 'Ugly game, ugly number, beautiful commitment.' },
  { label: 'NEVER IN DOUBT*', detail: 'For a pick that was absolutely in doubt. The asterisk is mandatory.' },
  { label: 'GARBAGE TIME HERO', detail: 'A late score rescues a ticket that deserved to die.' },
  { label: 'NUMBER NEVER HAD A CHANCE', detail: 'The result clears the spread by an absurd margin.' }
];

// Seasons I-III contain official final records; their weekly tapes are unavailable.
// Seasons IV-VII were generated from the source spreadsheets with raw picks bundled locally.

export type HistoricalResult = 'W' | 'L' | 'P';

export type HistoricalPick = {
  week: number;
  slot: number;
  player: string;
  game: string;
  bet: string;
  result: HistoricalResult;
};

export type HistoricalRecord = {
  wins: number;
  losses: number;
  pushes: number;
  sheetPct: number;
};

export type HistoricalSeason = {
  number: number;
  title: string;
  roster: string[];
  records: Record<string, HistoricalRecord>;
  picks: HistoricalPick[];
  tapeDamaged?: boolean;
};

export const historicalSeasons: Record<number, HistoricalSeason> = {
  "1": {
    "number": 1,
    "title": "Vault Tape Damaged",
    "roster": [
      "Joe",
      "Jay",
      "Kev"
    ],
    "records": {
      "Joe": {
        "wins": 11,
        "losses": 14,
        "pushes": 3,
        "sheetPct": 0.3929
      },
      "Jay": {
        "wins": 18,
        "losses": 12,
        "pushes": 0,
        "sheetPct": 0.6
      },
      "Kev": {
        "wins": 16,
        "losses": 12,
        "pushes": 1,
        "sheetPct": 0.5517
      }
    },
    "picks": [],
    "tapeDamaged": true
  },
  "2": {
    "number": 2,
    "title": "Vault Tape Damaged",
    "roster": [
      "Joe",
      "Brad",
      "Jay",
      "Kev"
    ],
    "records": {
      "Joe": {
        "wins": 22,
        "losses": 11,
        "pushes": 0,
        "sheetPct": 0.6667
      },
      "Brad": {
        "wins": 18,
        "losses": 14,
        "pushes": 1,
        "sheetPct": 0.5455
      },
      "Jay": {
        "wins": 13,
        "losses": 20,
        "pushes": 0,
        "sheetPct": 0.3939
      },
      "Kev": {
        "wins": 12,
        "losses": 21,
        "pushes": 0,
        "sheetPct": 0.3636
      }
    },
    "picks": [],
    "tapeDamaged": true
  },
  "3": {
    "number": 3,
    "title": "Miami Nights",
    "roster": [
      "Jay",
      "Blaine",
      "Kev",
      "Ceci",
      "Joe",
      "Brad"
    ],
    "records": {
      "Jay": {
        "wins": 22,
        "losses": 11,
        "pushes": 1,
        "sheetPct": 0.6471
      },
      "Blaine": {
        "wins": 19,
        "losses": 13,
        "pushes": 2,
        "sheetPct": 0.5588
      },
      "Kev": {
        "wins": 19,
        "losses": 14,
        "pushes": 1,
        "sheetPct": 0.5588
      },
      "Ceci": {
        "wins": 19,
        "losses": 15,
        "pushes": 0,
        "sheetPct": 0.5588
      },
      "Joe": {
        "wins": 16,
        "losses": 17,
        "pushes": 1,
        "sheetPct": 0.4706
      },
      "Brad": {
        "wins": 15,
        "losses": 18,
        "pushes": 1,
        "sheetPct": 0.4412
      }
    },
    "picks": [],
    "tapeDamaged": true
  },
  "4": {
    "number": 4,
    "title": "Burn The Boats",
    "roster": [
      "Joe",
      "Ceci",
      "Kev",
      "Brad",
      "Blaine",
      "Jay"
    ],
    "records": {
      "Joe": {
        "wins": 15,
        "losses": 21,
        "pushes": 0,
        "sheetPct": 0.4167
      },
      "Ceci": {
        "wins": 19,
        "losses": 17,
        "pushes": 0,
        "sheetPct": 0.5278
      },
      "Kev": {
        "wins": 19,
        "losses": 17,
        "pushes": 0,
        "sheetPct": 0.5278
      },
      "Brad": {
        "wins": 19,
        "losses": 17,
        "pushes": 0,
        "sheetPct": 0.5278
      },
      "Blaine": {
        "wins": 17,
        "losses": 19,
        "pushes": 0,
        "sheetPct": 0.4722
      },
      "Jay": {
        "wins": 19,
        "losses": 15,
        "pushes": 2,
        "sheetPct": 0.5278
      }
    },
    "picks": [
      {
        "week": 1,
        "slot": 1,
        "player": "Joe",
        "game": "Liberty vs Southern Miss",
        "bet": "Liberty -3.5",
        "result": "L"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Brad",
        "game": "Penn St. vs Purdue",
        "bet": "Penn St. -3.5",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Jay",
        "game": "UCLA vs Bowling Green",
        "bet": "UCLA -24",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Kev",
        "game": "Washington vs Kent St.",
        "bet": "Washington -22.5",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Ceci",
        "game": "Arkansas vs Cinci",
        "bet": "Points Over 53.5",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Blaine",
        "game": "Ball St. vs Tennessee",
        "bet": "Ball St. +35",
        "result": "L"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Joe",
        "game": "Coastal vs Army",
        "bet": "Coastal Carolina -2",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Brad",
        "game": "Arkansas vs Cinci",
        "bet": "Arkansas -6.5",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Jay",
        "game": "TXAM vs Sam Houston",
        "bet": "TXAM -35",
        "result": "L"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Kev",
        "game": "Georgia vs Oregon",
        "bet": "Points Over 54",
        "result": "L"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Ceci",
        "game": "USC vs Rice",
        "bet": "USC -33",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Blaine",
        "game": "Clemson vs Georgia Tech",
        "bet": "Georgia Tech +24.5",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Joe",
        "game": "Florida vs UK",
        "bet": "Florida -6",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Brad",
        "game": "Alabama vs Texas",
        "bet": "Alabama -21.5",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Jay",
        "game": "Central Michigan vs Southern Alabama",
        "bet": "Central Michigan -6",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Kev",
        "game": "Pittsburgh vs Tennessee",
        "bet": "Pittsburgh +6",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Ceci",
        "game": "Penn St vs Ohio",
        "bet": "Penn St -28",
        "result": "W"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Blaine",
        "game": "Hawaii vs Michigan",
        "bet": "Hawaii +52",
        "result": "W"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Joe",
        "game": "Packer vs Vikings",
        "bet": "Points Over 46.5",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Brad",
        "game": "Bills vs Rams",
        "bet": "Points Under 52",
        "result": "W"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Jay",
        "game": "Ravens vs Jets",
        "bet": "Ravens -6.5",
        "result": "W"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Kev",
        "game": "Bills vs Rams",
        "bet": "Points Over 52",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Ceci",
        "game": "Chargers vs Raiders",
        "bet": "Chargers -3.5",
        "result": "W"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Blaine",
        "game": "Cowboys vs Bucs",
        "bet": "Cowboys +2.5",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Joe",
        "game": "Texas Tech vs NC St.",
        "bet": "Texas Tech +10.5",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Brad",
        "game": "BYU vs Oregon",
        "bet": "Oregon -3.5",
        "result": "W"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Jay",
        "game": "Miss St. vs LSU",
        "bet": "Points Over 53",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Kev",
        "game": "Miami vs TXAM",
        "bet": "Miami +6",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Ceci",
        "game": "UConn vs Michagan",
        "bet": "Points Over 59.5",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Blaine",
        "game": "BYU vs Oregon",
        "bet": "BYU +3.5",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Joe",
        "game": "Vikings vs Eagles",
        "bet": "Vikings +2",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Brad",
        "game": "Chiefs vs Chargers",
        "bet": "Chiefs -4",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Jay",
        "game": "Ravens vs Dolphins",
        "bet": "Points Over 43.5",
        "result": "W"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Kev",
        "game": "Seahawks vs 49ers",
        "bet": "Points Over 39.5",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Ceci",
        "game": "Ravens vs Dolphins",
        "bet": "Ravens -3.5",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Blaine",
        "game": "Bengals vs Cowboys",
        "bet": "Bengals -7.5",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Joe",
        "game": "Baylor vs Iowa St.",
        "bet": "Baylor +2.5",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Brad",
        "game": "Georgia vs Kent St.",
        "bet": "Points Under 62",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Jay",
        "game": "Iowa vs Rutgers",
        "bet": "Points Under 34",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Kev",
        "game": "Florida vs Tennesse",
        "bet": "Points Over 62.5",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Ceci",
        "game": "Auburn vs Missouri",
        "bet": "Auburn -7.5",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Blaine",
        "game": "Georgia vs Kent St.",
        "bet": "Georgia -45.5",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Joe",
        "game": "Bills vs Dolphins",
        "bet": "Bills -4.5",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Brad",
        "game": "Chiefs vs Colts",
        "bet": "Chiefs -4.5",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Jay",
        "game": "Packers vs Bucs",
        "bet": "Points Over 41.5",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Kev",
        "game": "Packers vs Bucs",
        "bet": "Packers +1.5",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Ceci",
        "game": "49ers vs Broncos",
        "bet": "49ers -1.5",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Blaine",
        "game": "Cowboys vs Giants",
        "bet": "Cowboys +1",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Joe",
        "game": "Baylor vs OKST",
        "bet": "Baylor -2.5",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Brad",
        "game": "LUS vs Auburn",
        "bet": "LSU -8",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Jay",
        "game": "UNC vs V-Tech",
        "bet": "UNC -9",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Kev",
        "game": "Kentucky vs Ole Miss",
        "bet": "Kentucky +6",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Ceci",
        "game": "Oklahoma vs TCU",
        "bet": "Oklahoma -5",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Blaine",
        "game": "Miami Ohio vs Buffalo",
        "bet": "Miami Ohio +2.5",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Joe",
        "game": "Rams vs 49ers",
        "bet": "Rams +1.5",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Brad",
        "game": "Steelers vs Jets",
        "bet": "Steelers -3",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Jay",
        "game": "Vikings vs Saints",
        "bet": "Points Under 42.5",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Kev",
        "game": "Packers vs Patriots",
        "bet": "Points Over 40",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Ceci",
        "game": "Chargers vs Texans",
        "bet": "Chargers -6",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Blaine",
        "game": "Cowboys vs Commanders",
        "bet": "Commanders +3",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Joe",
        "game": "OKST vs Texas Tech",
        "bet": "OKST -9.5",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Brad",
        "game": "Georgia vs Auburn",
        "bet": "Points Over 49.5",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Jay",
        "game": "Tulane vs ECU",
        "bet": "ECU +3",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Kev",
        "game": "JMU vs Arkansas St.",
        "bet": "JMU -11",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Ceci",
        "game": "Tulane vs ECU",
        "bet": "Tulane -3",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Blaine",
        "game": "Hawaii vs San Diego St.",
        "bet": "Hawaii +23.5",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Joe",
        "game": "Titans vs Commanders",
        "bet": "Titans -1",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Brad",
        "game": "Seahawks vs Saints",
        "bet": "Seattle +5",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Jay",
        "game": "Lions vs Patriots",
        "bet": "Points Over 46.5",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Kev",
        "game": "Ravens vs Bengals",
        "bet": "Points Over 47.5",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Ceci",
        "game": "Chargers vs Browns",
        "bet": "Chargers -1",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Blaine",
        "game": "Rams vs Cowboys",
        "bet": "Rams -5",
        "result": "L"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Joe",
        "game": "USC vs Utah",
        "bet": "USC +3.5",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Brad",
        "game": "Florida vs LSU",
        "bet": "Florida -2",
        "result": "L"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Jay",
        "game": "Buffalo vs UMass",
        "bet": "Buffalo -16.5",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Kev",
        "game": "Kansas vs Oklahoma",
        "bet": "Kansas +8.5",
        "result": "L"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Ceci",
        "game": "Syracuse vs NC State",
        "bet": "Syracuse -3",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Blaine",
        "game": "Hawaii vs Nevada",
        "bet": "Hawaii +6",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Joe",
        "game": "Bengals vs Saints",
        "bet": "Bengals -3",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Brad",
        "game": "Jets vs Packers",
        "bet": "Points Under 45.5",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Jay",
        "game": "Bucs vs Steelers",
        "bet": "Points Under 46.5",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Kev",
        "game": "Jaguars vs Colts",
        "bet": "Jaguars +1.5",
        "result": "L"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Ceci",
        "game": "Cowboys vs Eagles",
        "bet": "Eagles -6.5",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Blaine",
        "game": "Cowboys vs Eagles",
        "bet": "Cowboys +6.5",
        "result": "L"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Joe",
        "game": "UCLA vs Oregon",
        "bet": "UCLA +6",
        "result": "L"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Brad",
        "game": "Ohio St. vs Iowa",
        "bet": "Points Over 50",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Jay",
        "game": "Penn St. vs Minnasota",
        "bet": "Penn St. -5",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Kev",
        "game": "Syracuse vs Clemson",
        "bet": "Syracuse +14",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Ceci",
        "game": "Cinicinnati vs SMU",
        "bet": "Cincinnati -4",
        "result": "L"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Blaine",
        "game": "Hawaii vs Colorado St.",
        "bet": "Hawaii +5.5",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Joe",
        "game": "Giants vs Jaguars",
        "bet": "Giants +3",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Brad",
        "game": "Jets vs Broncos",
        "bet": "Jets -1.5",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Jay",
        "game": "Packers vs Commanders",
        "bet": "Points Over 41.5",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Kev",
        "game": "Packers vs Commanders",
        "bet": "Packers -5",
        "result": "L"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Ceci",
        "game": "Chiefs vs 49ers",
        "bet": "Chiefs -1",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Blaine",
        "game": "Cowboys vs Lions",
        "bet": "Cowboys -7",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Joe",
        "game": "OKST vs Kansas St.",
        "bet": "Points Over 56",
        "result": "L"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Brad",
        "game": "ND vs Syacuse",
        "bet": "Points Over 48",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Jay",
        "game": "Oregon vs Cal",
        "bet": "Points Over 56.5",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Kev",
        "game": "Tennessee vs UK",
        "bet": "Points Over 62",
        "result": "L"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Ceci",
        "game": "ND vs Syacuse",
        "bet": "Syracuse -1.5",
        "result": "L"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Blaine",
        "game": "Sam Houston vs Tralton",
        "bet": "Sam Houston -7",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Joe",
        "game": "Giants vs Seahawks",
        "bet": "Giants +3",
        "result": "L"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Brad",
        "game": "Jets vs Patriots",
        "bet": "Jets +3",
        "result": "L"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Jay",
        "game": "Falcons vs Panthers",
        "bet": "Points Over 41",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Kev",
        "game": "Raider vs Saints",
        "bet": "Raiders -1.5",
        "result": "L"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Ceci",
        "game": "Dolphins vs Lions",
        "bet": "Dolphins -3.5",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Blaine",
        "game": "Bengals vs Browns",
        "bet": "Browns +3",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Joe",
        "game": "Tennessee vs Georgia",
        "bet": "Tennessee +8.8",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Brad",
        "game": "Norte Dame vs Clemson",
        "bet": "Clemson -3.5",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Jay",
        "game": "Syracuse vs Pitt",
        "bet": "Points Over 48",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Kev",
        "game": "Norte Dame vs Clemson",
        "bet": "Notre Dame +4",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Ceci",
        "game": "SMU vs Houston",
        "bet": "SMU -3.5",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Blaine",
        "game": "Hawaii vs Fresno St",
        "bet": "Hawaii +27.5",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Joe",
        "game": "Chiefs vs Titans",
        "bet": "Points Over 45.5",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Brad",
        "game": "Rams vs Bucs",
        "bet": "Points Over 42.5",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Jay",
        "game": "Packers vs Lions",
        "bet": "Packers -4",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Kev",
        "game": "Bears vs Dolphins",
        "bet": "Points Over 46.5",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Ceci",
        "game": "Cardinals vs Seahawks",
        "bet": "Cardinals -1.5",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Blaine",
        "game": "Jaguars vs Raiders",
        "bet": "Jaguars +3",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Joe",
        "game": "Coastal vs So Miss",
        "bet": "Coastal Carolina -4.5",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Brad",
        "game": "Michigan vs Nebraska",
        "bet": "Michigan -30.5",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Jay",
        "game": "UCF vs Tulane",
        "bet": "Points Over 54.5",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Kev",
        "game": "LSU vs Arkansas",
        "bet": "LSU -3.5",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Ceci",
        "game": "Baylor vs K State",
        "bet": "Baylor -2.5",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Blaine",
        "game": "UCF vs Tulane",
        "bet": "UCF +1",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Joe",
        "game": "Packers vs Cowboys",
        "bet": "Packers +4",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Brad",
        "game": "Giants vs Houston",
        "bet": "Giants -5",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Jay",
        "game": "Chargers vs 49ers",
        "bet": "Points Over 45",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Kev",
        "game": "Seahawks vs Bucs",
        "bet": "Points Over 45",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Ceci",
        "game": "Seahawks vs Bucs",
        "bet": "Buc -2.5",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Blaine",
        "game": "Packers vs Cowboys",
        "bet": "Cowboys -4",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Joe",
        "game": "TCU vs Baylor",
        "bet": "TCU -2",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Brad",
        "game": "Michigan vs Illinois",
        "bet": "Points Over 41.5",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Jay",
        "game": "UAB vs LSU",
        "bet": "Points Over 50.5",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Kev",
        "game": "WSU vs Arizona",
        "bet": "WSU -4.5",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Ceci",
        "game": "Louisville vs NC State",
        "bet": "Louisville -3",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Blaine",
        "game": "Portland St. vs Cal Poly",
        "bet": "Portland St. +7.5",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Joe",
        "game": "Vikings vs Cowboys",
        "bet": "Vikings +1.5",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Brad",
        "game": "Saints vs Rams",
        "bet": "Points Under 39",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Jay",
        "game": "Bills vs Browns",
        "bet": "Bills -8",
        "result": "P"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Kev",
        "game": "Bills vs Browns",
        "bet": "Points Over 50.5",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Ceci",
        "game": "Bengals -3.5",
        "bet": "Bengals vs Steelers",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Blaine",
        "game": "Vikings vs Cowboys",
        "bet": "Cowboys +2",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Joe",
        "game": "Coastal Carolina vs JMU",
        "bet": "Coastal Carolina +14.5",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Brad",
        "game": "Oregon vs Oregon St.",
        "bet": "Oregon -2.5",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Jay",
        "game": "UTSA vs UTEP",
        "bet": "Points Over 56.5",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Kev",
        "game": "Michigan vs Ohio St.",
        "bet": "Michigan +8",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Ceci",
        "game": "Louisville vs UK",
        "bet": "Louisville +3",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Blaine",
        "game": "Temple vs ECU",
        "bet": "Points Under 52",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Joe",
        "game": "Bills vs Lions",
        "bet": "Bills -9.5",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Brad",
        "game": "Patriots vs Vikings",
        "bet": "Points Over 42.5",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Jay",
        "game": "Commanders vs Falcons",
        "bet": "Points Over 40.5",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Kev",
        "game": "Saints vs 49ers",
        "bet": "Points Over 43.5",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Ceci",
        "game": "Chargers vs Cardinals",
        "bet": "Charger -2.5",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Blaine",
        "game": "Giants vs Cowboys",
        "bet": "Points Over 45.5",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Joe",
        "game": "TCU vs K State",
        "bet": "TCU -2",
        "result": "L"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Brad",
        "game": "Purdue vs Michigan",
        "bet": "Points Over 52",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Jay",
        "game": "Tulane vs UCF",
        "bet": "Points Over 57",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Kev",
        "game": "LSU vs Georgia",
        "bet": "Points Over 52",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Ceci",
        "game": "Tulane vs UCF",
        "bet": "Tulane -4",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Blaine",
        "game": "Toledo vs Ohio",
        "bet": "Toledo -3",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Joe",
        "game": "Vikings vs Jets",
        "bet": "Vikings +3",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Brad",
        "game": "Vikings vs Jets",
        "bet": "Jets +3",
        "result": "L"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Jay",
        "game": "Texans vs Browns",
        "bet": "Points Under 46.5",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Kev",
        "game": "Broncos vs Ravens",
        "bet": "Points Under 40",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Ceci",
        "game": "Chiefs vs Bengals",
        "bet": "Chiefs -2.5",
        "result": "L"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Blaine",
        "game": "Cowboys vs Colts",
        "bet": "Cowboys -10.5",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Joe",
        "game": "Army vs Navy",
        "bet": "Army +3",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Brad",
        "game": "Steelers vs Ravens",
        "bet": "Ravens +1.5",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Jay",
        "game": "Eagles vs Giants",
        "bet": "Points Over 44",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Kev",
        "game": "Bengals vs Browns",
        "bet": "Bengals -4",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Ceci",
        "game": "Sehawks vs Panthers",
        "bet": "Seahawks -4",
        "result": "L"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Blaine",
        "game": "Lions vs Vikings",
        "bet": "Lions -2",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Joe",
        "game": "Bucs vs 49ers",
        "bet": "Bucs +3",
        "result": "L"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Brad",
        "game": "Chiefs vs Broncos",
        "bet": "Chiefs -8.5",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Jay",
        "game": "Bills vs Jets",
        "bet": "Points Over 43",
        "result": "L"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Kev",
        "game": "Vikings vs Lions",
        "bet": "Points Over 52",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Ceci",
        "game": "Bucs vs 49ers",
        "bet": "49ers -3.5",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Blaine",
        "game": "Cowboys vs Texans",
        "bet": "Points Under 44",
        "result": "L"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Joe",
        "game": "Vikings vs Colts",
        "bet": "Vikings -4",
        "result": "L"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Brad",
        "game": "Bills vs Dolphins",
        "bet": "Points Under 43.5",
        "result": "L"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Jay",
        "game": "Bills vs Dolphins",
        "bet": "Points Over 44",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Kev",
        "game": "Broncos vs Cardinals",
        "bet": "Points Under 37",
        "result": "L"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Ceci",
        "game": "Louisville vs Cincinnati",
        "bet": "Louisville -2",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Blaine",
        "game": "Jackson St vs NC Central",
        "bet": "Points Over 55",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Joe",
        "game": "Jaguars vs Cowboys",
        "bet": "Points Over 48",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Brad",
        "game": "Giants vs Commanders",
        "bet": "Giants +4",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Jay",
        "game": "Packers vs Rams",
        "bet": "Packers -7",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Kev",
        "game": "Bengals vs Bucs",
        "bet": "Points Over 47",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Ceci",
        "game": "Browns vs Ravens",
        "bet": "Browns -3",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Blaine",
        "game": "Giants vs Commanders",
        "bet": "Commanders -4.5",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Joe",
        "game": "Wake Forest vs Missouri",
        "bet": "Wake Forest -2.5",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Brad",
        "game": "Bills vs Bears",
        "bet": "Bills -8",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Jay",
        "game": "Texans vs Titans",
        "bet": "Texans +3",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Kev",
        "game": "Pathers vs Lions",
        "bet": "Panthers +2",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Ceci",
        "game": "Browns vs Saints",
        "bet": "Browns -3",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Blaine",
        "game": "Wake Forest vs Missouri",
        "bet": "Missouri +2.5",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Joe",
        "game": "Bengals vs Patriots",
        "bet": "Bengals -3",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Brad",
        "game": "Texans vs Titans",
        "bet": "Points Over 35.5",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Jay",
        "game": "Saints vs Browns",
        "bet": "Points Over 32",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Kev",
        "game": "Packers vs Dolphins",
        "bet": "Packers +3.5",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Ceci",
        "game": "Bowling Green vs NMST",
        "bet": "Bowling Green -3.5",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Blaine",
        "game": "Bengals vs Patriots",
        "bet": "Patriots +3",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Joe",
        "game": "Alabama vs Kansas St.",
        "bet": "Alabama -7",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Brad",
        "game": "Clemson vs Tennessee",
        "bet": "Points Under 61",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Jay",
        "game": "Chargers vs Rams",
        "bet": "Points Over 41",
        "result": "P"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Kev",
        "game": "Bears vs Lions",
        "bet": "Points Over 53",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Ceci",
        "game": "USC vs Tulane",
        "bet": "Points Under 63.5",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Blaine",
        "game": "Alabama vs Kansas St.",
        "bet": "Kansas St. +7.5",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Joe",
        "game": "Giants vs Colts",
        "bet": "Giants -5.5",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Brad",
        "game": "Jets",
        "bet": "Jets -2",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Jay",
        "game": "Packers vs Vikings",
        "bet": "Vikings +3",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Kev",
        "game": "Panthers vs Bucs",
        "bet": "Panthers +3.5",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Ceci",
        "game": "Steelers vs Ravens",
        "bet": "Points Over 35",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Blaine",
        "game": "Giants vs Colts",
        "bet": "Colts +5.5",
        "result": "L"
      }
    ]
  },
  "5": {
    "number": 5,
    "title": "Become Death",
    "roster": [
      "AJ",
      "Joe",
      "Ceci",
      "Kev",
      "Brad",
      "Steve",
      "Jay"
    ],
    "records": {
      "AJ": {
        "wins": 12,
        "losses": 22,
        "pushes": 2,
        "sheetPct": 0.3333
      },
      "Joe": {
        "wins": 17,
        "losses": 17,
        "pushes": 2,
        "sheetPct": 0.4722
      },
      "Ceci": {
        "wins": 20,
        "losses": 13,
        "pushes": 3,
        "sheetPct": 0.5556
      },
      "Kev": {
        "wins": 16,
        "losses": 17,
        "pushes": 3,
        "sheetPct": 0.4444
      },
      "Brad": {
        "wins": 17,
        "losses": 17,
        "pushes": 2,
        "sheetPct": 0.4722
      },
      "Steve": {
        "wins": 16,
        "losses": 18,
        "pushes": 2,
        "sheetPct": 0.4444
      },
      "Jay": {
        "wins": 22,
        "losses": 14,
        "pushes": 0,
        "sheetPct": 0.6111
      }
    },
    "picks": [
      {
        "week": 1,
        "slot": 1,
        "player": "Joe",
        "game": "Texas vs Rice",
        "bet": "Texas -35.5",
        "result": "L"
      },
      {
        "week": 1,
        "slot": 2,
        "player": "Joe",
        "game": "Coastal Carolina vs UCLA",
        "bet": "Coastal +16",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Brad",
        "game": "Florida vs Utah",
        "bet": "Utah -5",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 2,
        "player": "Brad",
        "game": "Penn St vs WVU",
        "bet": "Penn St -21",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Jay",
        "game": "TTU vs Wyoming",
        "bet": "Points Over 50.5",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 2,
        "player": "Jay",
        "game": "Purdue vs Fresno St",
        "bet": "Purdue -4",
        "result": "L"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Kev",
        "game": "TTU vs Wyoming",
        "bet": "TTU -13.5",
        "result": "L"
      },
      {
        "week": 1,
        "slot": 2,
        "player": "Kev",
        "game": "LSU vs FSU",
        "bet": "LSU -2",
        "result": "L"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Ceci",
        "game": "Michigan vs ECU",
        "bet": "Points Over 53.5",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 2,
        "player": "Ceci",
        "game": "LSU vs FSU",
        "bet": "Points Over 56.5",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "AJ",
        "game": "NMST vs Western Illinois",
        "bet": "NMST -20.5",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 2,
        "player": "AJ",
        "game": "Idaho St. vs SDSU",
        "bet": "Idaho St. +34.5",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Steve",
        "game": "Clemson vs Duke",
        "bet": "Clemson -13.5",
        "result": "L"
      },
      {
        "week": 1,
        "slot": 2,
        "player": "Steve",
        "game": "Coastal Carolina vs UCLA",
        "bet": "UCLA -16",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Joe",
        "game": "Tulane vs Ole Miss",
        "bet": "Tulane +7",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 2,
        "player": "Joe",
        "game": "Vikings vs Bucs",
        "bet": "Vikings -4.5",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Brad",
        "game": "Utah vs Baylor",
        "bet": "Utah -7",
        "result": "P"
      },
      {
        "week": 2,
        "slot": 2,
        "player": "Brad",
        "game": "Chiefs vs Lions",
        "bet": "Chiefs -4",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Jay",
        "game": "FSU vs So Miss",
        "bet": "Points Over 53.5",
        "result": "W"
      },
      {
        "week": 2,
        "slot": 2,
        "player": "Jay",
        "game": "Falcons vs Panthers",
        "bet": "Falcon's -3.5",
        "result": "W"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Kev",
        "game": "Wisonsin vs Wash St",
        "bet": "Points Over 58.5",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 2,
        "player": "Kev",
        "game": "Jaguars vs Colts",
        "bet": "Jaguars -4.5",
        "result": "W"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Ceci",
        "game": "Notre Dame vs NCST",
        "bet": "Notre Dame -7",
        "result": "W"
      },
      {
        "week": 2,
        "slot": 2,
        "player": "Ceci",
        "game": "Chargers vs Dolphin's",
        "bet": "Chargers -3",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "AJ",
        "game": "NMST vs Liberty",
        "bet": "NMST +9.5",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 2,
        "player": "AJ",
        "game": "Bengals vs Browns",
        "bet": "Points Over 47",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Steve",
        "game": "UTSA vs TXST",
        "bet": "UTSA -13.5",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 2,
        "player": "Steve",
        "game": "Bengals vs Browns",
        "bet": "Bengals -2.5",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Joe",
        "game": "Penn St. vs Illinois",
        "bet": "Penn St. -14",
        "result": "W"
      },
      {
        "week": 3,
        "slot": 2,
        "player": "Joe",
        "game": "Eagles vs Vikings",
        "bet": "Points Under 49",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Brad",
        "game": "UTSA vs Army",
        "bet": "Army +7",
        "result": "W"
      },
      {
        "week": 3,
        "slot": 2,
        "player": "Brad",
        "game": "Chiefs vs Jaguars",
        "bet": "Chiefs -3.5",
        "result": "W"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Jay",
        "game": "BC vs FSU",
        "bet": "Points Over 46.5",
        "result": "W"
      },
      {
        "week": 3,
        "slot": 2,
        "player": "Jay",
        "game": "Dolphions vs Patriots",
        "bet": "Points Over 46",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Kev",
        "game": "Clemson vs FAU",
        "bet": "Points Under 52",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 2,
        "player": "Kev",
        "game": "Packers vs Falcons",
        "bet": "Packers +3",
        "result": "W"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Ceci",
        "game": "LSU vs Miss St.",
        "bet": "Points Over 54",
        "result": "W"
      },
      {
        "week": 3,
        "slot": 2,
        "player": "Ceci",
        "game": "Saints vs Panthers",
        "bet": "Saints -3",
        "result": "P"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "AJ",
        "game": "NMST vs UNM",
        "bet": "Points Over 54",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 2,
        "player": "AJ",
        "game": "Chargers vs Titans",
        "bet": "Chargers -2.5",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Steve",
        "game": "UTSA VS Army",
        "bet": "UTSA -9",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 2,
        "player": "Steve",
        "game": "Eagles vs Vikings",
        "bet": "Eagles -6",
        "result": "P"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Joe",
        "game": "Notre Dame vs Ohio St.",
        "bet": "Notre Dame +3",
        "result": "P"
      },
      {
        "week": 4,
        "slot": 2,
        "player": "Joe",
        "game": "Lions vs Falcons",
        "bet": "Lions -3",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Brad",
        "game": "Miami vs Temple",
        "bet": "Miami -23",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 2,
        "player": "Brad",
        "game": "49ers vs Giants",
        "bet": "49ers -10.5",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Jay",
        "game": "Whyoming vs App St.",
        "bet": "Points Over 43.5",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 2,
        "player": "Jay",
        "game": "Broncos vs Dolphins",
        "bet": "Points Over 47",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Kev",
        "game": "Colorado vs Ogon",
        "bet": "Points Over 70",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 2,
        "player": "Kev",
        "game": "Lions vs Falcons",
        "bet": "Points over 46.5",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Ceci",
        "game": "FSU vs Clemson",
        "bet": "FSU -2",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 2,
        "player": "Ceci",
        "game": "Patriots vs Jets",
        "bet": "Patriots -2.5",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "AJ",
        "game": "NMST vs Hawaii",
        "bet": "Points Over 57.5",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 2,
        "player": "AJ",
        "game": "Cardinals vs Cowboys",
        "bet": "Points Over 42.5",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Steve",
        "game": "Michigan vs Rutgers",
        "bet": "Points Over 43.5",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 2,
        "player": "Steve",
        "game": "Seattle vs Panthers",
        "bet": "Seattle -4.5",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Joe",
        "game": "Georgia vs Aubrun",
        "bet": "Georgia -14.5",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 2,
        "player": "Joe",
        "game": "Rams vs Colts",
        "bet": "Rams -1",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Brad",
        "game": "Alabama vs Miss St.",
        "bet": "Alabama -14.5",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 2,
        "player": "Brad",
        "game": "Chiefs vs Jets",
        "bet": "Chiefs -8.5",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Jay",
        "game": "Clemson vs Syracuse",
        "bet": "Points Over 52",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 2,
        "player": "Jay",
        "game": "Ravens vs Browns",
        "bet": "Ravens -2",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Kev",
        "game": "Utah vs Oregon St.",
        "bet": "Utah +4",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 2,
        "player": "Kev",
        "game": "Dolphins vs Bills",
        "bet": "Points Over 52.5",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Ceci",
        "game": "Akron vs Buffalo",
        "bet": "Akron -3",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 2,
        "player": "Ceci",
        "game": "Broncos vs Bears",
        "bet": "Broncos -3",
        "result": "P"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "AJ",
        "game": "Michigan vs Nebraska",
        "bet": "Michigan -17",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 2,
        "player": "AJ",
        "game": "Chargers vs Raiders",
        "bet": "Chargers -4.5",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Steve",
        "game": "Norte Dame vs Duke",
        "bet": "Points Over 52.5",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 2,
        "player": "Steve",
        "game": "Lions vs Packers",
        "bet": "Points Over 45",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Joe",
        "game": "Texas vs Oklahoma",
        "bet": "Points Over 60.5",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 2,
        "player": "Joe",
        "game": "Bengals vs Cardinals",
        "bet": "Points Over 45",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Brad",
        "game": "Texas vs Oklahoma",
        "bet": "Texas -4",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 2,
        "player": "Brad",
        "game": "Broncos vs Jets",
        "bet": "Broncos -2",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Jay",
        "game": "Maryland vs Ohio St.",
        "bet": "Points Over 56",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 2,
        "player": "Jay",
        "game": "Texans vs Falcons",
        "bet": "Texans +2.5",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Kev",
        "game": "Missouri vs LSU",
        "bet": "Missouri +6",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 2,
        "player": "Kev",
        "game": "Eagles vs Rams",
        "bet": "Eagles -3.5",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Ceci",
        "game": "Texas Tech vs Baylor",
        "bet": "Texas Tech -2",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 2,
        "player": "Ceci",
        "game": "Chiefs vs Vikings",
        "bet": "Chiefs -3.5",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "AJ",
        "game": "Colorado vs ASU",
        "bet": "Colorado -3.5",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 2,
        "player": "AJ",
        "game": "Bills vs Jaguars",
        "bet": "Bills -5.5",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Steve",
        "game": "Georgia Tech vs Miami U",
        "bet": "Points Over 57",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 2,
        "player": "Steve",
        "game": "Broncos vs Jets",
        "bet": "Jets +2",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Joe",
        "game": "Arkansas vs Alabama",
        "bet": "Points Over 45",
        "result": "P"
      },
      {
        "week": 7,
        "slot": 2,
        "player": "Joe",
        "game": "Bengals vs Seahawks",
        "bet": "Bengals -3",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Brad",
        "game": "Oregon vs Washington",
        "bet": "Points Over 67",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 2,
        "player": "Brad",
        "game": "Panthers vs Miami",
        "bet": "Points Over 47.5",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Jay",
        "game": "Ohio St. vs Purdue",
        "bet": "Ohio St. -16.5",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 2,
        "player": "Jay",
        "game": "Chiefs vs Broncos",
        "bet": "Chiefs -10.5",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Kev",
        "game": "Arkansas vs Alabama",
        "bet": "Points Under 45",
        "result": "P"
      },
      {
        "week": 7,
        "slot": 2,
        "player": "Kev",
        "game": "Lions vs Bucs",
        "bet": "Points Over 43.5",
        "result": "L"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Ceci",
        "game": "Kansas vs OKST",
        "bet": "Kansas -3",
        "result": "L"
      },
      {
        "week": 7,
        "slot": 2,
        "player": "Ceci",
        "game": "Jaguars vs Colts",
        "bet": "Jaguars -4",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "AJ",
        "game": "Indiana vs Michigan",
        "bet": "Points Over 45.5",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 2,
        "player": "AJ",
        "game": "49ers vs Browns",
        "bet": "49ers -9.5",
        "result": "L"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Steve",
        "game": "UTSA vs UAB",
        "bet": "UTSA -9",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 2,
        "player": "Steve",
        "game": "49ers vs Browns",
        "bet": "Cleveland +9.5",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Joe",
        "game": "Central Michigan vs Ball St.",
        "bet": "Central Michigan - 5.5",
        "result": "L"
      },
      {
        "week": 8,
        "slot": 2,
        "player": "Joe",
        "game": "Lions vs Ravens",
        "bet": "Points Over 43",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Brad",
        "game": "Tennessee vs Alabama",
        "bet": "Points Over 47.5",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 2,
        "player": "Brad",
        "game": "Giants vs Commanders",
        "bet": "Points Over 37",
        "result": "L"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Jay",
        "game": "Ohio St. vs Penn St.",
        "bet": "Points Over 46.5",
        "result": "L"
      },
      {
        "week": 8,
        "slot": 2,
        "player": "Jay",
        "game": "Lions vs Ravens",
        "bet": "Lions +3",
        "result": "L"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Kev",
        "game": "Tennessee vs Alabama",
        "bet": "Tennessee +9",
        "result": "L"
      },
      {
        "week": 8,
        "slot": 2,
        "player": "Kev",
        "game": "Chargers vs Chiefs",
        "bet": "Points Over 47.5",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Ceci",
        "game": "Texas Tech vs BYU",
        "bet": "Texas Tech -3",
        "result": "L"
      },
      {
        "week": 8,
        "slot": 2,
        "player": "Ceci",
        "game": "Browns vs Colts",
        "bet": "Browns -3.5",
        "result": "L"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "AJ",
        "game": "Air Force vs Navy",
        "bet": "Air Force -11",
        "result": "P"
      },
      {
        "week": 8,
        "slot": 2,
        "player": "AJ",
        "game": "Packers vs Broncos",
        "bet": "Points Under 45",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Steve",
        "game": "Ohio St. vs Penn St.",
        "bet": "Ohio St. -4",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 2,
        "player": "Steve",
        "game": "Dolphins vs Eagles",
        "bet": "Points Over 52",
        "result": "L"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Joe",
        "game": "Wyoming vs Boise St.",
        "bet": "Wyoming +5",
        "result": "L"
      },
      {
        "week": 9,
        "slot": 2,
        "player": "Joe",
        "game": "Vikings vs Packers",
        "bet": "Vikings -1",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Brad",
        "game": "Utah vs Oregon",
        "bet": "Points Over 47",
        "result": "L"
      },
      {
        "week": 9,
        "slot": 2,
        "player": "Brad",
        "game": "Broncos vs Chiefs",
        "bet": "Chiefs -7",
        "result": "L"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Jay",
        "game": "Penn St. Vs Indiana",
        "bet": "Points Over 44.5",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 2,
        "player": "Jay",
        "game": "Eagles vs Commanders",
        "bet": "Points Over 42",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Kev",
        "game": "JMU vs Old Dominion",
        "bet": "JMU -20",
        "result": "L"
      },
      {
        "week": 9,
        "slot": 2,
        "player": "Kev",
        "game": "Bears vs Chargers",
        "bet": "Points Under 46",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Ceci",
        "game": "Western Michigan vs Eastern Michigan",
        "bet": "Western Michigan -3",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 2,
        "player": "Ceci",
        "game": "Saints vs Colts",
        "bet": "Saints -2.5",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "AJ",
        "game": "JMU vs Old Dominion",
        "bet": "Old Dominion +20.5",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 2,
        "player": "AJ",
        "game": "Eagles vs Commanders",
        "bet": "Eagles -7",
        "result": "P"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Steve",
        "game": "Army vs UMASS",
        "bet": "Army -10",
        "result": "L"
      },
      {
        "week": 9,
        "slot": 2,
        "player": "Steve",
        "game": "Jets vs Giants",
        "bet": "Jets -3",
        "result": "P"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Joe",
        "game": "Coastal Carolina vs ODU",
        "bet": "Coastal Carolina +1",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 2,
        "player": "Joe",
        "game": "Eagles vs Cowboys",
        "bet": "Eagles -3",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Brad",
        "game": "Alabama vs LSU",
        "bet": "Alabama -3",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 2,
        "player": "Brad",
        "game": "Eagles vs Cowboys",
        "bet": "Points Over 47",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Jay",
        "game": "Texas vs Kansas St.",
        "bet": "Kansas St. +3.5",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 2,
        "player": "Jay",
        "game": "Giants vs Raiders",
        "bet": "Giants +1.5",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Kev",
        "game": "Alabama vs LSU",
        "bet": "Points Over 60.5",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 2,
        "player": "Kev",
        "game": "Bills vs Bengals",
        "bet": "Bills +2",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Ceci",
        "game": "Minnesota vs Illinois",
        "bet": "Minnesota -2.5",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 2,
        "player": "Ceci",
        "game": "Colts vs Panthers",
        "bet": "Colts -2",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "AJ",
        "game": "Penn St. vs Maryland",
        "bet": "Penn St. -8",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 2,
        "player": "AJ",
        "game": "Packers vs Rams",
        "bet": "Rams +4",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Steve",
        "game": "Purdue vs Michigan",
        "bet": "Purdue +32",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 2,
        "player": "Steve",
        "game": "Bills vs Bengals",
        "bet": "Points Over 50.5",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Joe",
        "game": "Michigan vs Penn St",
        "bet": "Michigan -4.5",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 2,
        "player": "Joe",
        "game": "Bengals vs Texans",
        "bet": "Bengals -6",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Brad",
        "game": "Washington vs Utah",
        "bet": "Points Over 49.5",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 2,
        "player": "Brad",
        "game": "Saints vs Vikings",
        "bet": "Points Over 41",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Jay",
        "game": "Alabama vs Kentucky",
        "bet": "Alabama -11",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 2,
        "player": "Jay",
        "game": "Steelers vs Packers",
        "bet": "Steelers -3",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Kev",
        "game": "LSU vs Florida",
        "bet": "LSU -16",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 2,
        "player": "Kev",
        "game": "Jets vs Raiders",
        "bet": "Points Under 35.5",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Ceci",
        "game": "Virginia Tech vs Boston College",
        "bet": "Virginia Tech -2.5",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 2,
        "player": "Ceci",
        "game": "Colts vs Patriots",
        "bet": "Colts -2",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "AJ",
        "game": "OKST vs UCF",
        "bet": "OKST -2.0",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 2,
        "player": "AJ",
        "game": "Seahawks vs Commanders",
        "bet": "Seahawks -6",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Steve",
        "game": "Ole Miss vs Georgia",
        "bet": "Ole Miss +11",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 2,
        "player": "Steve",
        "game": "Seahawks vs Commanders",
        "bet": "Points Over 44",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Joe",
        "game": "Washington vs Oregon St.",
        "bet": "Washington -1",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 2,
        "player": "Joe",
        "game": "Lions vs Bears",
        "bet": "Lions -8",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Brad",
        "game": "Georgia vs Tennessee",
        "bet": "Points Over 59",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 2,
        "player": "Brad",
        "game": "Bengals vs Ravens",
        "bet": "Points Over 46.5",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Jay",
        "game": "Michigan vs Maryland",
        "bet": "Points Over 49.5",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 2,
        "player": "Jay",
        "game": "Steelers vs Browns",
        "bet": "Steelers +2.5",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Kev",
        "game": "Iowa vs Illinois",
        "bet": "Points Under 33.5",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 2,
        "player": "Kev",
        "game": "Broncos vs Vikings",
        "bet": "Broncos -2.5",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Ceci",
        "game": "Purdue vs North Western",
        "bet": "Purdue -2.5",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 2,
        "player": "Ceci",
        "game": "Chargers vs Packers",
        "bet": "Chargers -3",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "AJ",
        "game": "Iowa vs Illinois",
        "bet": "Iowa -3",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 2,
        "player": "AJ",
        "game": "Commanders vs Giants",
        "bet": "Commanders -8",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Steve",
        "game": "Missouri vs Florida",
        "bet": "Missouri -12.5",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 2,
        "player": "Steve",
        "game": "Bucs vs 49ers",
        "bet": "Bucs +13.5",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Joe",
        "game": "JMU vs Coastal Carolina",
        "bet": "Points Over 49.5",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 2,
        "player": "Joe",
        "game": "Jaguars vs Texans",
        "bet": "Points Over 47.5",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Brad",
        "game": "Oregon vs Oregon St.",
        "bet": "Points Over 62",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 2,
        "player": "Brad",
        "game": "Steelers vs Bengals",
        "bet": "Steelers -2",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Jay",
        "game": "Ohio St. vs Michigan",
        "bet": "Points Over 46",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 2,
        "player": "Jay",
        "game": "Steelers vs Bengals",
        "bet": "Points Under 36",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Kev",
        "game": "Ohio St. vs Michigan",
        "bet": "Ohio St. +3.5",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 2,
        "player": "Kev",
        "game": "Bills vs Eagles",
        "bet": "Eagles -3",
        "result": "P"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Ceci",
        "game": "Ohio St. vs Michigan",
        "bet": "Michigan -3.5",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 2,
        "player": "Ceci",
        "game": "Broncos vs Browns",
        "bet": "Broncos -1.5",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "AJ",
        "game": "Alabama vs Auburn",
        "bet": "Alabama -13",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 2,
        "player": "AJ",
        "game": "Ravens vs Chargers",
        "bet": "Points Over 48.5",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Steve",
        "game": "Florida St. vs Florida",
        "bet": "Flordia St. -6.5",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 2,
        "player": "Steve",
        "game": "Bills vs Eagles",
        "bet": "Points Over 49",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Joe",
        "game": "Tulane vs SMU",
        "bet": "o46.5",
        "result": "L"
      },
      {
        "week": 14,
        "slot": 2,
        "player": "Joe",
        "game": "Chargers vs Patriots",
        "bet": "Chargers -5",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Brad",
        "game": "Oregon vs Wash",
        "bet": "o65",
        "result": "P"
      },
      {
        "week": 14,
        "slot": 2,
        "player": "Brad",
        "game": "Pittsburgh vs Cardinals",
        "bet": "Steelers -6.5",
        "result": "L"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Jay",
        "game": "Liberty vs NM State",
        "bet": "Liberty -9.5",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 2,
        "player": "Jay",
        "game": "Rams vs Browns",
        "bet": "Rams -4",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Kev",
        "game": "Bama vs Georgia",
        "bet": "Bama +5",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 2,
        "player": "Kev",
        "game": "Browns vs Rams",
        "bet": "u39.5",
        "result": "L"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Ceci",
        "game": "FSU vs Louisville",
        "bet": "FSU -1",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 2,
        "player": "Ceci",
        "game": "49ers vs Eagles",
        "bet": "49ers -6",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "AJ",
        "game": "Tulane vs SMU",
        "bet": "Tulane -3",
        "result": "L"
      },
      {
        "week": 14,
        "slot": 2,
        "player": "AJ",
        "game": "Packers vs Chiefs",
        "bet": "Chiefs -6",
        "result": "L"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Steve",
        "game": "FSU vs Louisville",
        "bet": "o46.5",
        "result": "L"
      },
      {
        "week": 14,
        "slot": 2,
        "player": "Steve",
        "game": "Eagles vs 49ers",
        "bet": "o47",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Joe",
        "game": "Lions vs Bears",
        "bet": "Lions -3",
        "result": "L"
      },
      {
        "week": 15,
        "slot": 2,
        "player": "Joe",
        "game": "Chiefs vs Bills",
        "bet": "Chiefs -1.5",
        "result": "L"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Brad",
        "game": "Texans vs Jets",
        "bet": "Texans -3",
        "result": "L"
      },
      {
        "week": 15,
        "slot": 2,
        "player": "Brad",
        "game": "Bucs vs Falcons",
        "bet": "u41.5",
        "result": "L"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Jay",
        "game": "Eagles vs Cowboys",
        "bet": "Eagles +3.5",
        "result": "L"
      },
      {
        "week": 15,
        "slot": 2,
        "player": "Jay",
        "game": "Titans vs Dolphins",
        "bet": "u46.5",
        "result": "L"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Kev",
        "game": "Colts vs Bengals",
        "bet": "o44.5",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 2,
        "player": "Kev",
        "game": "Chiefs vs Bills",
        "bet": "Bills +2",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Ceci",
        "game": "Vikings vs Raiders",
        "bet": "Vikings -3",
        "result": "P"
      },
      {
        "week": 15,
        "slot": 2,
        "player": "Ceci",
        "game": "Falcons vs Bucaneers",
        "bet": "Falcons -1.5",
        "result": "L"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "AJ",
        "game": "Pats vs Steelers",
        "bet": "u31",
        "result": "L"
      },
      {
        "week": 15,
        "slot": 2,
        "player": "AJ",
        "game": "Chargers vs Broncos",
        "bet": "u45.5",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Steve",
        "game": "Cowboys vs Eagles",
        "bet": "o52",
        "result": "L"
      },
      {
        "week": 15,
        "slot": 2,
        "player": "Steve",
        "game": "Chiefs vs Bills",
        "bet": "o49",
        "result": "L"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Joe",
        "game": "Lions vs Broncos",
        "bet": "Broncos +5",
        "result": "L"
      },
      {
        "week": 16,
        "slot": 2,
        "player": "Joe",
        "game": "Browns vs Bears",
        "bet": "-2.5",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Brad",
        "game": "Texans vs Titans",
        "bet": "o38",
        "result": "L"
      },
      {
        "week": 16,
        "slot": 2,
        "player": "Brad",
        "game": "Jets vs Dolphins",
        "bet": "35.5",
        "result": "L"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Jay",
        "game": "Ravens vs Jags",
        "bet": "o40.5",
        "result": "L"
      },
      {
        "week": 16,
        "slot": 2,
        "player": "Jay",
        "game": "UCLA vs Boise State",
        "bet": "o47",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Kev",
        "game": "Packers vs Bucs",
        "bet": "Packers -3.5",
        "result": "L"
      },
      {
        "week": 16,
        "slot": 2,
        "player": "Kev",
        "game": "Cowboys vs Bills",
        "bet": "o49.5",
        "result": "L"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Ceci",
        "game": "Ravens vs Jags",
        "bet": "Ravens -3.5",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 2,
        "player": "Ceci",
        "game": "Cowboys vs Bills",
        "bet": "Bills -2",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "AJ",
        "game": "Chiefs vs Pats",
        "bet": "o37.5",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 2,
        "player": "AJ",
        "game": "NM State vs Fresno State",
        "bet": "NM State -3",
        "result": "L"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Steve",
        "game": "Colts vs Steelers",
        "bet": "Colts -1.5",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 2,
        "player": "Steve",
        "game": "Lions vs Broncos",
        "bet": "Lions -5",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Joe",
        "game": "Cowboys vs Dolphins",
        "bet": "Cowboys +1",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 2,
        "player": "Joe",
        "game": "Jaguars vs Bucs",
        "bet": "Jags +1.5",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Brad",
        "game": "Raiders vs Chiefs",
        "bet": "Chiefs -11",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 2,
        "player": "Brad",
        "game": "Eagles vs Giants",
        "bet": "o43.5",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Jay",
        "game": "Texans vs Browns",
        "bet": "u40",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 2,
        "player": "Jay",
        "game": "Bears vs Cardinals",
        "bet": "o42.5",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Kev",
        "game": "Patriots vs Broncos",
        "bet": "o37",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 2,
        "player": "Kev",
        "game": "Ravens vs 49ers",
        "bet": "Ravens +6.5",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Ceci",
        "game": "Raiders vs Chiefs",
        "bet": "o40.5",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 2,
        "player": "Ceci",
        "game": "Ravens vs 49ers",
        "bet": "49ers -6",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "AJ",
        "game": "Cowboys vs Dolphins",
        "bet": "o48",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 2,
        "player": "AJ",
        "game": "Bears vs Cardinals",
        "bet": "u42",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Steve",
        "game": "Eagles vs Giants",
        "bet": "Eagles -13.5",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 2,
        "player": "Steve",
        "game": "Ravens vs 49ers",
        "bet": "o46.5",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Joe",
        "game": "Miss vs Penn State",
        "bet": "Ole Miss -5",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 2,
        "player": "Joe",
        "game": "Saints vs Bucs",
        "bet": "Bucs -2.5",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Brad",
        "game": "Lions vs Cowboys",
        "bet": "o52",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 2,
        "player": "Brad",
        "game": "Missouri vs Ohio State",
        "bet": "o50.5",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Jay",
        "game": "Packers vs Vikings",
        "bet": "Packers +1",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 2,
        "player": "Jay",
        "game": "Bama vs Michigian",
        "bet": "Bama +1.5",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Kev",
        "game": "Steelers vs Seahawks",
        "bet": "Steelers +3.5",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 2,
        "player": "Kev",
        "game": "Packers vs Vikings",
        "bet": "o43",
        "result": "P"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Ceci",
        "game": "Toledo vs Wyoming",
        "bet": "o44.5",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 2,
        "player": "Ceci",
        "game": "Colts vs Raiders",
        "bet": "Colts -3.5",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "AJ",
        "game": "Saints vs Bucs",
        "bet": "o42.5",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 2,
        "player": "AJ",
        "game": "Missouri vs Ohio State",
        "bet": "Mizzou +5",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Steve",
        "game": "Eagles vs Cardinals",
        "bet": "Eagles -12",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 2,
        "player": "Steve",
        "game": "Chiefs vs Bengals",
        "bet": "Chiefs -7",
        "result": "W"
      }
    ]
  },
  "6": {
    "number": 6,
    "title": "KEV-olutionary War",
    "roster": [
      "AJ",
      "Joe",
      "Ceci",
      "Kev",
      "Brad",
      "Kohler",
      "Blaine",
      "Steve",
      "Jay"
    ],
    "records": {
      "AJ": {
        "wins": 20,
        "losses": 16,
        "pushes": 0,
        "sheetPct": 0.5556
      },
      "Joe": {
        "wins": 20,
        "losses": 14,
        "pushes": 2,
        "sheetPct": 0.5556
      },
      "Ceci": {
        "wins": 16,
        "losses": 19,
        "pushes": 1,
        "sheetPct": 0.4444
      },
      "Kev": {
        "wins": 19,
        "losses": 17,
        "pushes": 0,
        "sheetPct": 0.5278
      },
      "Brad": {
        "wins": 18,
        "losses": 17,
        "pushes": 1,
        "sheetPct": 0.5
      },
      "Kohler": {
        "wins": 22,
        "losses": 13,
        "pushes": 1,
        "sheetPct": 0.6111
      },
      "Blaine": {
        "wins": 20,
        "losses": 16,
        "pushes": 0,
        "sheetPct": 0.5556
      },
      "Steve": {
        "wins": 18,
        "losses": 18,
        "pushes": 0,
        "sheetPct": 0.5
      },
      "Jay": {
        "wins": 22,
        "losses": 14,
        "pushes": 0,
        "sheetPct": 0.6111
      }
    },
    "picks": [
      {
        "week": 1,
        "slot": 1,
        "player": "Joe",
        "game": "TXAM vs ND",
        "bet": "TXAM -3",
        "result": "L"
      },
      {
        "week": 1,
        "slot": 2,
        "player": "Joe",
        "game": "USC vs LSU",
        "bet": "USC +4",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Brad",
        "game": "Penn St vs WVU",
        "bet": "Penn St -7.5",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 2,
        "player": "Brad",
        "game": "Georgia vs Clemson",
        "bet": "Points Over 48.5",
        "result": "L"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Jay",
        "game": "Wisconsin vs WMU",
        "bet": "Wisconsin -23.5",
        "result": "L"
      },
      {
        "week": 1,
        "slot": 2,
        "player": "Jay",
        "game": "JMU vs Charlotte",
        "bet": "JMU -8",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Kev",
        "game": "Tenn vs Chattanooga",
        "bet": "Tennessee -38.5",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 2,
        "player": "Kev",
        "game": "Penn St. vs WVU",
        "bet": "WVU +8",
        "result": "L"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Ceci",
        "game": "Northwestern vs Miami Ohio",
        "bet": "Northwestern -3",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 2,
        "player": "Ceci",
        "game": "USC vs LSU",
        "bet": "LSU -4",
        "result": "L"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "AJ",
        "game": "Colorado vs NDSU",
        "bet": "Colorado -9.5",
        "result": "L"
      },
      {
        "week": 1,
        "slot": 2,
        "player": "AJ",
        "game": "Missouri vs Murray St.",
        "bet": "Murray St. +47.5",
        "result": "L"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Kohler",
        "game": "Georgia vs Clemson",
        "bet": "Georgia -13.5",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 2,
        "player": "Kohler",
        "game": "TXAM vs ND",
        "bet": "Notre Dame +3",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Blaine",
        "game": "Oklahoma vs Temple",
        "bet": "Oklahoma -42",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 2,
        "player": "Blaine",
        "game": "Ohio St. vs Akron",
        "bet": "Akron +48.5",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Steve",
        "game": "Michigan vs Fresno St.",
        "bet": "Michigan -21",
        "result": "L"
      },
      {
        "week": 1,
        "slot": 2,
        "player": "Steve",
        "game": "Alabama vs Western Kentucky",
        "bet": "Alabama -31",
        "result": "W"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Joe",
        "game": "App St. vs Clemson",
        "bet": "App St. +16.5",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 2,
        "player": "Joe",
        "game": "Jets vs 49ers",
        "bet": "Points Over 43",
        "result": "W"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Brad",
        "game": "Syracuse vs Georgia Tech",
        "bet": "Georgia Tech -3",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 2,
        "player": "Brad",
        "game": "Chiefs vs Ravens",
        "bet": "Chiefs -2.5",
        "result": "W"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Jay",
        "game": "Texas vs Michigan",
        "bet": "Points Over 41",
        "result": "W"
      },
      {
        "week": 2,
        "slot": 2,
        "player": "Jay",
        "game": "Steelers vs Falcons",
        "bet": "Points Under 42",
        "result": "W"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Kev",
        "game": "Ohio St. vs Western Michigan",
        "bet": "Ohio St. -37",
        "result": "W"
      },
      {
        "week": 2,
        "slot": 2,
        "player": "Kev",
        "game": "Lions vs Rams",
        "bet": "Lions -4.5",
        "result": "W"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Ceci",
        "game": "Air Force vs San Jose St.",
        "bet": "Air Force -3",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 2,
        "player": "Ceci",
        "game": "Vikings vs Giants",
        "bet": "Vikings -1.5",
        "result": "W"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "AJ",
        "game": "Oklahoma vs Houston",
        "bet": "Oklahoma -29",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 2,
        "player": "AJ",
        "game": "Texans vs Colts",
        "bet": "Texans -3",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Kohler",
        "game": "Iowa vs Iowa St.",
        "bet": "Iowa -3",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 2,
        "player": "Kohler",
        "game": "Panthers vs Saints",
        "bet": "Panthers +3.5",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Blaine",
        "game": "Toledo vs UMass",
        "bet": "Toledo -17.5",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 2,
        "player": "Blaine",
        "game": "Chiefs vs Ravens",
        "bet": "Ravens +2.5",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Steve",
        "game": "Alabama vs South Florida",
        "bet": "Alabama -30.5",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 2,
        "player": "Steve",
        "game": "Panthers vs Saints",
        "bet": "Saints -3.5",
        "result": "W"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Joe",
        "game": "Houston vs Rice",
        "bet": "Houston -4.5",
        "result": "W"
      },
      {
        "week": 3,
        "slot": 2,
        "player": "Joe",
        "game": "Jaguars vs Browns",
        "bet": "Jaguars -3",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Brad",
        "game": "Georgia vs Kentucky",
        "bet": "Georgia -22",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 2,
        "player": "Brad",
        "game": "Steelers vs Broncos",
        "bet": "Steelers -2.5",
        "result": "W"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Jay",
        "game": "Alabama vs Wisconsin",
        "bet": "Points Over 47",
        "result": "W"
      },
      {
        "week": 3,
        "slot": 2,
        "player": "Jay",
        "game": "Colts vs Packers",
        "bet": "Colts -2",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Kev",
        "game": "Texas vs UTSA",
        "bet": "Texas -35",
        "result": "W"
      },
      {
        "week": 3,
        "slot": 2,
        "player": "Kev",
        "game": "Jets vs Titans",
        "bet": "Jets -4",
        "result": "W"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Ceci",
        "game": "Indiana vs UCLA",
        "bet": "Indiana -3.5",
        "result": "W"
      },
      {
        "week": 3,
        "slot": 2,
        "player": "Ceci",
        "game": "Rams vs Cardinals",
        "bet": "Rams -1",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "AJ",
        "game": "Georgia vs Kentucky",
        "bet": "Points Over 45",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 2,
        "player": "AJ",
        "game": "Steelers vs Broncos",
        "bet": "Broncos +2.5",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Kohler",
        "game": "Alabama vs Wisconsin",
        "bet": "Alabama -15.5",
        "result": "W"
      },
      {
        "week": 3,
        "slot": 2,
        "player": "Kohler",
        "game": "Eagles vs Falcons",
        "bet": "Eagles -6.5",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Blaine",
        "game": "Jacksonville vs Eastern Michigan",
        "bet": "Points Under 54",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 2,
        "player": "Blaine",
        "game": "Jaguars vs Browns",
        "bet": "Browns +3",
        "result": "W"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Steve",
        "game": "Michigan vs Ark St.",
        "bet": "Michigan -22",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 2,
        "player": "Steve",
        "game": "Ravens vs Raiders",
        "bet": "Ravens -8.5",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Joe",
        "game": "Tennessee vs OU",
        "bet": "Tennessee -7",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 2,
        "player": "Joe",
        "game": "Saints vs Eagles",
        "bet": "Points Under 49.5",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Brad",
        "game": "USC vs Michigan",
        "bet": "Points Over 44",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 2,
        "player": "Brad",
        "game": "Steelers vs Chargers",
        "bet": "Points Over 34.5",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Jay",
        "game": "NC State vs Clemson",
        "bet": "Points Over 43.5",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 2,
        "player": "Jay",
        "game": "Chiefs vs Falcons",
        "bet": "Chiefs -3",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Kev",
        "game": "ASU vs TTU",
        "bet": "Points Over 58.5",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 2,
        "player": "Kev",
        "game": "Bucs vs Broncos",
        "bet": "Bucs -5.5",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Ceci",
        "game": "Virginia Tech vs Rutgers",
        "bet": "Virginia Tech -3",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 2,
        "player": "Ceci",
        "game": "Saints vs Eagles",
        "bet": "Saints -2.5",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "AJ",
        "game": "Virginia Tech vs Rutgers",
        "bet": "Rutgers +3",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 2,
        "player": "AJ",
        "game": "Ravens vs Cowboys",
        "bet": "Points Over 47.5",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Kohler",
        "game": "Ohio St. vs Marshall",
        "bet": "Ohio St. -40",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 2,
        "player": "Kohler",
        "game": "Seahawks vs Dolphins",
        "bet": "Seahawks -4",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Blaine",
        "game": "Illinois vs Nebraska",
        "bet": "Illinois +8",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 2,
        "player": "Blaine",
        "game": "Jets vs Patriots",
        "bet": "Patriots +6.5",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Steve",
        "game": "USC vs Michigan",
        "bet": "Michigan +4.5",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 2,
        "player": "Steve",
        "game": "Jets vs Patriots",
        "bet": "Jets -7",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Joe",
        "game": "Illinois vs Penn St.",
        "bet": "Illinois +18",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 2,
        "player": "Joe",
        "game": "Bengals vs Panthers",
        "bet": "Points Under 47",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Brad",
        "game": "Alabama vs Georgia",
        "bet": "Points Under 49.5",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 2,
        "player": "Brad",
        "game": "Steelrs vs Colts",
        "bet": "Steelers -2.5",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Jay",
        "game": "Texas St. vs Sam Houston",
        "bet": "Texas St. -10",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 2,
        "player": "Jay",
        "game": "Saints vs Falcons",
        "bet": "Points Over 41.5",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Kev",
        "game": "Michigan vs Minnesota",
        "bet": "Points Under 34.5",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 2,
        "player": "Kev",
        "game": "Commanders vs Cardinals",
        "bet": "Points Over 48.5",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Ceci",
        "game": "Baylor vs BYU",
        "bet": "Baylor -3",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 2,
        "player": "Ceci",
        "game": "Lions vs Seahawks",
        "bet": "Lions -4.5",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "AJ",
        "game": "Norte Dame vs Louisville",
        "bet": "Norte Dame -6.5",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 2,
        "player": "AJ",
        "game": "Eagles vs Bucs",
        "bet": "Points Over 42",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Kohler",
        "game": "Alabama vs Georgia",
        "bet": "Alabama +2.5",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 2,
        "player": "Kohler",
        "game": "Bills vs Ravens",
        "bet": "Bills +2.5",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Blaine",
        "game": "Baylor vs BYU",
        "bet": "BYU +3.5",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 2,
        "player": "Blaine",
        "game": "Eagles vs Bucs",
        "bet": "Eagles -1.5",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Steve",
        "game": "Alabama vs Georgia",
        "bet": "Georgia +1",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 2,
        "player": "Steve",
        "game": "Cowboys vs Giants",
        "bet": "Cowboys -5.5",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Joe",
        "game": "Ole Miss vs South Carolina",
        "bet": "South Carolina +8",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 2,
        "player": "Joe",
        "game": "Commanders vs Browns",
        "bet": "Commanders -3",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Brad",
        "game": "Nebraska vs Rutgers",
        "bet": "Nebraska -7",
        "result": "P"
      },
      {
        "week": 6,
        "slot": 2,
        "player": "Brad",
        "game": "Colts vs Jaguars",
        "bet": "Colts +3.5",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Jay",
        "game": "Indiana vs Northwestern",
        "bet": "Indiana -13",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 2,
        "player": "Jay",
        "game": "Bears vs Panthers",
        "bet": "Points Over 40",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Kev",
        "game": "Washington vs Michigan",
        "bet": "Washington -1",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 2,
        "player": "Kev",
        "game": "Bears vs Panthers",
        "bet": "Points Under 40",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Ceci",
        "game": "Oklahoma St. vs WVU",
        "bet": "OKST -3",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 2,
        "player": "Ceci",
        "game": "Chiefs vs Saints",
        "bet": "Chiefs -5",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "AJ",
        "game": "Indiana vs Northwestern",
        "bet": "Points Over 40",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 2,
        "player": "AJ",
        "game": "Packers",
        "bet": "Packers -3",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Kohler",
        "game": "Ohio St. vs Iowa",
        "bet": "Ohio St. -19.5",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 2,
        "player": "Kohler",
        "game": "Texans vs Bills",
        "bet": "Texans +1",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Blaine",
        "game": "Jack St. vs Kennesaw St.",
        "bet": "Points Over 49.5",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 2,
        "player": "Blaine",
        "game": "Chiefs vs Saints",
        "bet": "Saints +5",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Steve",
        "game": "USC vs Minnesota",
        "bet": "USC -9",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 2,
        "player": "Steve",
        "game": "Falcons vs Bucs",
        "bet": "Falcons -2",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Joe",
        "game": "LSU vs Ole Miss",
        "bet": "Ole Miss -3.5",
        "result": "L"
      },
      {
        "week": 7,
        "slot": 2,
        "player": "Joe",
        "game": "Buccaneers vs Saints",
        "bet": "Buccaneers -3.5",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Brad",
        "game": "Penn St. vs USC",
        "bet": "Penn St. -3.5",
        "result": "L"
      },
      {
        "week": 7,
        "slot": 2,
        "player": "Brad",
        "game": "Steelers vs Raiders",
        "bet": "Steelers -3",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Jay",
        "game": "UNLV vs Utah St.",
        "bet": "Points Over 66.5",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 2,
        "player": "Jay",
        "game": "Cardinals vs Packers",
        "bet": "Cardinals +5.5",
        "result": "L"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Kev",
        "game": "Oregon vs Ohio St.",
        "bet": "Points Over 54.5",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 2,
        "player": "Kev",
        "game": "Texans vs Patriots",
        "bet": "Texans -6.5",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Ceci",
        "game": "Oregon vs Ohio St.",
        "bet": "Ohio St. -3",
        "result": "L"
      },
      {
        "week": 7,
        "slot": 2,
        "player": "Ceci",
        "game": "Bills vs Jets",
        "bet": "Jets +1.5",
        "result": "L"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "AJ",
        "game": "Pittsburgh vs California",
        "bet": "Pittsburgh -3",
        "result": "L"
      },
      {
        "week": 7,
        "slot": 2,
        "player": "AJ",
        "game": "Bengals vs Giants",
        "bet": "Points Over 46.5",
        "result": "L"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Kohler",
        "game": "Penn St. vs USC",
        "bet": "USC +3.5",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 2,
        "player": "Kohler",
        "game": "Lions vs Cowboys",
        "bet": "Lions -3",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Blaine",
        "game": "Maryland vs Northwestern",
        "bet": "1st Q Points Over 10",
        "result": "L"
      },
      {
        "week": 7,
        "slot": 2,
        "player": "Blaine",
        "game": "Lions vs Cowboys",
        "bet": "Points Under 52",
        "result": "L"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Steve",
        "game": "LSU vs Ole Miss",
        "bet": "LSU +3.5",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 2,
        "player": "Steve",
        "game": "Bengals vs Giants",
        "bet": "Bengals -3",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Joe",
        "game": "New Mexico vs Utah St.",
        "bet": "New Mexico -1.5",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 2,
        "player": "Joe",
        "game": "Bengals vs Browns",
        "bet": "Bengals -4.5",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Brad",
        "game": "Miami vs Lousiville",
        "bet": "Miami -4.5",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 2,
        "player": "Brad",
        "game": "Steelers vs Jets",
        "bet": "Steelers +2.5",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Jay",
        "game": "JMU vs Georgia Southern",
        "bet": "JMU -9.5",
        "result": "L"
      },
      {
        "week": 8,
        "slot": 2,
        "player": "Jay",
        "game": "Bills vs Titans",
        "bet": "Bills -9.5",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Kev",
        "game": "Nebraska vs Indiana",
        "bet": "Points Under 49.5",
        "result": "L"
      },
      {
        "week": 8,
        "slot": 2,
        "player": "Kev",
        "game": "Packer vs Texans",
        "bet": "Points Over 47.5",
        "result": "L"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Ceci",
        "game": "UTSA vs Flordia Atlantic",
        "bet": "UTSA -4.5",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 2,
        "player": "Ceci",
        "game": "Charger vs Cardianls",
        "bet": "Chargers -1",
        "result": "L"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "AJ",
        "game": "Texas Tech vs Baylor",
        "bet": "Points Over 55",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 2,
        "player": "AJ",
        "game": "Lions vs Vikings",
        "bet": "Points Over 49",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Kohler",
        "game": "Georgia vs Texas",
        "bet": "Georgia +5",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 2,
        "player": "Kohler",
        "game": "Lions vs Vikings",
        "bet": "Lions +1.5",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Blaine",
        "game": "Cincinnati vs ASU",
        "bet": "Cincinnati -5.5",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 2,
        "player": "Blaine",
        "game": "Broncos vs Saints",
        "bet": "Broncos -2.5",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Steve",
        "game": "Michigan vs Illinois",
        "bet": "Michigan -4",
        "result": "L"
      },
      {
        "week": 8,
        "slot": 2,
        "player": "Steve",
        "game": "Giants vs Eagles",
        "bet": "Points over 42",
        "result": "L"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Joe",
        "game": "Miami vs FSU",
        "bet": "Miami -21",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 2,
        "player": "Joe",
        "game": "Seahawks vs Bills",
        "bet": "Bills -3",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Brad",
        "game": "Boise St. vs UNLV",
        "bet": "Boise St. -4",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 2,
        "player": "Brad",
        "game": "Steelers vs Giants",
        "bet": "Steelers -6",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Jay",
        "game": "Eastern Michigan vs Akron",
        "bet": "Eastern Michigan -2.5",
        "result": "L"
      },
      {
        "week": 9,
        "slot": 2,
        "player": "Jay",
        "game": "Cardinals vs Dolphins",
        "bet": "Points Over 45.5",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Kev",
        "game": "WSU vs SDSU",
        "bet": "Washington St -17",
        "result": "L"
      },
      {
        "week": 9,
        "slot": 2,
        "player": "Kev",
        "game": "Browns vs Ravens",
        "bet": "Points Over 44.5",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Ceci",
        "game": "Hawaii vs Nevada",
        "bet": "Hawaii -2",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 2,
        "player": "Ceci",
        "game": "Steelers vs Giants",
        "bet": "Points Over 37",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "AJ",
        "game": "Washington vs Indiana",
        "bet": "Points Over 54.5",
        "result": "L"
      },
      {
        "week": 9,
        "slot": 2,
        "player": "AJ",
        "game": "Falcons vs Bucs",
        "bet": "Points Over 46.5",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Kohler",
        "game": "Oregon vs Illinois",
        "bet": "Oregon -21.5",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 2,
        "player": "Kohler",
        "game": "Seahawks vs Bills",
        "bet": "Seahawks +3",
        "result": "L"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Blaine",
        "game": "Ohio vs Buffalo",
        "bet": "Ohio -4",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 2,
        "player": "Blaine",
        "game": "Rams vs Vikings",
        "bet": "Rams +2.5",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Steve",
        "game": "Penn St. vs Wisconsin",
        "bet": "Penn St. -6.5",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 2,
        "player": "Steve",
        "game": "Rams vs Vikings",
        "bet": "Vikings -2.5",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Joe",
        "game": "Army vs Air Force",
        "bet": "Army -18",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 2,
        "player": "Joe",
        "game": "Bills vs Dolphins",
        "bet": "Bills -6.5",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Brad",
        "game": "Clemson vs Louisville",
        "bet": "Clemson -10",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 2,
        "player": "Brad",
        "game": "Giants vs Commanders",
        "bet": "Commanders -4",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Jay",
        "game": "Army vs Air Force",
        "bet": "Points Over 41",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 2,
        "player": "Jay",
        "game": "Saints vs Panthers",
        "bet": "Saints -7",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Kev",
        "game": "Oregon vs Michigan",
        "bet": "Oregon -14.5",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 2,
        "player": "Kev",
        "game": "Packers vs Lions",
        "bet": "Points Over 47.5",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Ceci",
        "game": "Liberty vs Jacksoville State",
        "bet": "Liberty -2.5",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 2,
        "player": "Ceci",
        "game": "Chiefs vs Bucs",
        "bet": "Points Over 46",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "AJ",
        "game": "Indiana vs Michigan St.",
        "bet": "Indiana -7",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 2,
        "player": "AJ",
        "game": "Chargers vs Browns",
        "bet": "Points Under 42.5",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Kohler",
        "game": "Ohio St. vs Penn St.",
        "bet": "Ohio St. -3.5",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 2,
        "player": "Kohler",
        "game": "Packers vs Lions",
        "bet": "Lions -3",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Blaine",
        "game": "Tulane vs Charlotte",
        "bet": "Charlotte 1Q +5.5",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 2,
        "player": "Blaine",
        "game": "Chiefs vs Bucs",
        "bet": "Bucs +8.5",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Steve",
        "game": "Texas A&M vs South Carolina",
        "bet": "Texas A&M -2.5",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 2,
        "player": "Steve",
        "game": "Jets vs Texans",
        "bet": "Jets -2.5",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Joe",
        "game": "BYU vs Utah",
        "bet": "BYU -3",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 2,
        "player": "Joe",
        "game": "49ers vs Bucs",
        "bet": "Points Over 50",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Brad",
        "game": "Army vs UNT",
        "bet": "Army -4",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 2,
        "player": "Brad",
        "game": "Bengals vs Ravens",
        "bet": "Points Over 53",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Jay",
        "game": "Florida vs Texas",
        "bet": "Florida +21.5",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 2,
        "player": "Jay",
        "game": "Eagles vs Cowboys",
        "bet": "Eagles -7",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Kev",
        "game": "Indiana vs Michigan",
        "bet": "Indiana -14.5",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 2,
        "player": "Kev",
        "game": "Cardinals vs Jets",
        "bet": "Cardinals +1.5",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Ceci",
        "game": "Air Force vs Fresno St.",
        "bet": "Air Force +9.5",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 2,
        "player": "Ceci",
        "game": "Rams vs Dolphons",
        "bet": "Points Over 48",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "AJ",
        "game": "Miami vs Georgia Tech",
        "bet": "Miami -10",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 2,
        "player": "AJ",
        "game": "Steelers vs Commanders",
        "bet": "Points Under 45.5",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Kohler",
        "game": "Oregon vs Maryland",
        "bet": "Oregon -24.5",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 2,
        "player": "Kohler",
        "game": "Lions vs Texans",
        "bet": "Lions -3.5",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Blaine",
        "game": "Purdue vs Ohio St.",
        "bet": "1st Q Points Under 13",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 2,
        "player": "Blaine",
        "game": "Bengals vs Ravens",
        "bet": "1st Q Points Over 10",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Steve",
        "game": "Georgia vs Ole Miss",
        "bet": "Georgia -2",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 2,
        "player": "Steve",
        "game": "Bengals vs Ravens",
        "bet": "Points Under 53",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Joe",
        "game": "Illinois vs Michigan St.",
        "bet": "Illinois -2.5",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 2,
        "player": "Joe",
        "game": "Saints vs Browns",
        "bet": "Saints +1",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Brad",
        "game": "Oregon vs Wisconsin",
        "bet": "Oregon -13.5",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 2,
        "player": "Brad",
        "game": "Steelers vs Ravens",
        "bet": "Points Over 48.5",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Jay",
        "game": "SMU vs BC",
        "bet": "Points Over 53.5",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 2,
        "player": "Jay",
        "game": "49ers vs Seahawks",
        "bet": "49ers -5.5",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Kev",
        "game": "WVU vs Baylor",
        "bet": "WVU +1",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 2,
        "player": "Kev",
        "game": "Colts vs Jets",
        "bet": "Colts +4.5",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Ceci",
        "game": "LSU vs Florida",
        "bet": "LSU -3.5",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 2,
        "player": "Ceci",
        "game": "Chargers vs Benagls",
        "bet": "Chargers -1",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "AJ",
        "game": "ND vs Virginia",
        "bet": "Points Over 51",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 2,
        "player": "AJ",
        "game": "Vikings vs Titans",
        "bet": "Vikings -5.5",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Kohler",
        "game": "Ohio St. vs NW",
        "bet": "Ohio St. -28",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 2,
        "player": "Kohler",
        "game": "Lions vs Jaguars",
        "bet": "Lions -13.5",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Blaine",
        "game": "Auburn vs UL Monroe",
        "bet": "Auburn -24.5",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 2,
        "player": "Blaine",
        "game": "Lions vs Jaguars",
        "bet": "Jaguars +13.5",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Steve",
        "game": "Rutgers vs Maryland",
        "bet": "Rutgers +5.5",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 2,
        "player": "Steve",
        "game": "Steelers vs Ravens",
        "bet": "Steelers +3",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Joe",
        "game": "Illinois vs Rutgers",
        "bet": "Illinois +1",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 2,
        "player": "Joe",
        "game": "Lions vs Colts",
        "bet": "Lions -7",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Brad",
        "game": "Colorado vs Kansas",
        "bet": "Colorado -3",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 2,
        "player": "Brad",
        "game": "Steelers vs Browns",
        "bet": "Steelers -3.5",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Jay",
        "game": "UGA vs UMASS",
        "bet": "Georgia -41",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 2,
        "player": "Jay",
        "game": "Packers vs 49ers",
        "bet": "Packers -5",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Kev",
        "game": "Washington St vs Oregon St.",
        "bet": "Washington St. -11",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 2,
        "player": "Kev",
        "game": "Eagles vs Rams",
        "bet": "Points Under 48.5",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Ceci",
        "game": "BYU vs ASU",
        "bet": "BYU +3.5",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 2,
        "player": "Ceci",
        "game": "Ravens vs Chargers",
        "bet": "Chargers +2.5",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "AJ",
        "game": "Notre Dame vs Army",
        "bet": "Notre Dame -14",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 2,
        "player": "AJ",
        "game": "Broncos vs Raiders",
        "bet": "Broncos -5.5",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Kohler",
        "game": "Ohio St. vs Indiana",
        "bet": "Ohio St. -13",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 2,
        "player": "Kohler",
        "game": "Eagles vs Rams",
        "bet": "Eagles -3",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Blaine",
        "game": "Arkansas St. vs UL Monroe",
        "bet": "Arkansas St.  -3",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 2,
        "player": "Blaine",
        "game": "Commanders vs Cowboys",
        "bet": "Commanders -10.5",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Steve",
        "game": "Texas vs UK",
        "bet": "Texas -18.5",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 2,
        "player": "Steve",
        "game": "Steelers vs Browns",
        "bet": "Points Under 36.5",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Joe",
        "game": "Army vs UTSA",
        "bet": "Army -6.5",
        "result": "L"
      },
      {
        "week": 14,
        "slot": 2,
        "player": "Joe",
        "game": "Cardinals vs Vikings",
        "bet": "Points Over 45",
        "result": "P"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Brad",
        "game": "Clemson vs South Carolina",
        "bet": "Points over 49.5",
        "result": "L"
      },
      {
        "week": 14,
        "slot": 2,
        "player": "Brad",
        "game": "Lions vs Bears",
        "bet": "Lions -9.5",
        "result": "L"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Jay",
        "game": "Illinois vs Northwestern",
        "bet": "Illinois -7",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 2,
        "player": "Jay",
        "game": "Bengals vs Steelers",
        "bet": "Points Under 47.5",
        "result": "L"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Kev",
        "game": "Alabama vs Auburn",
        "bet": "Points over 51.5",
        "result": "L"
      },
      {
        "week": 14,
        "slot": 2,
        "player": "Kev",
        "game": "Packers vs Dolphins",
        "bet": "Points over 47.5",
        "result": "L"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Ceci",
        "game": "Kansas St. vs Iowa St.",
        "bet": "Points Over 51.5",
        "result": "L"
      },
      {
        "week": 14,
        "slot": 2,
        "player": "Ceci",
        "game": "Broncos vs Browns",
        "bet": "Broncos -6",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "AJ",
        "game": "Memphis vs Tulane",
        "bet": "Points over 54",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 2,
        "player": "AJ",
        "game": "Cowboys vs Giants",
        "bet": "Cowboys -3.5",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Kohler",
        "game": "Georgia vs Geogia tech",
        "bet": "Georgia -19.5",
        "result": "L"
      },
      {
        "week": 14,
        "slot": 2,
        "player": "Kohler",
        "game": "Lions vs Bears",
        "bet": "Points Over 49",
        "result": "L"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Blaine",
        "game": "Wake Forest vs Duke",
        "bet": "Wake Forest +3",
        "result": "L"
      },
      {
        "week": 14,
        "slot": 2,
        "player": "Blaine",
        "game": "Ravens vs Eagles",
        "bet": "Eagles +3",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Steve",
        "game": "Kansas St. vs Iowa St.",
        "bet": "Iowa St. -1",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 2,
        "player": "Steve",
        "game": "Ravens vs Eagles",
        "bet": "Ravens -3",
        "result": "L"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Joe",
        "game": "Georgia vs Texas",
        "bet": "Georgia +3",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 2,
        "player": "Joe",
        "game": "Lions vs Packers",
        "bet": "Lions -3",
        "result": "P"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Brad",
        "game": "Boise St. vs UNLV",
        "bet": "Boise St -4.5",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 2,
        "player": "Brad",
        "game": "Steelers vs Browns",
        "bet": "Points Over 42.5",
        "result": "L"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Jay",
        "game": "Bears vs 49ers",
        "bet": "Points Over 44",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 2,
        "player": "Jay",
        "game": "Bucs vs Raiders",
        "bet": "Bucs -6.5",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Kev",
        "game": "Bengals vs Cowboys",
        "bet": "Bengals -5.5",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 2,
        "player": "Kev",
        "game": "Chargers vs Chiefs",
        "bet": "Chargers +4",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Ceci",
        "game": "Titans vs Jaguars",
        "bet": "Titans -3",
        "result": "L"
      },
      {
        "week": 15,
        "slot": 2,
        "player": "Ceci",
        "game": "Bengals vs Cowboys",
        "bet": "Points Under 49.5",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "AJ",
        "game": "Georgia vs Texas",
        "bet": "Points Under 51",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 2,
        "player": "AJ",
        "game": "Bills vs Rams",
        "bet": "Bills -3.5",
        "result": "L"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Kohler",
        "game": "Oregon vs Penn St.",
        "bet": "Oregon -3.5",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 2,
        "player": "Kohler",
        "game": "Dolphins vs Jets",
        "bet": "Dolphins -6",
        "result": "P"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Blaine",
        "game": "Bengals vs Cowboys",
        "bet": "Cowboys +5",
        "result": "L"
      },
      {
        "week": 15,
        "slot": 2,
        "player": "Blaine",
        "game": "Bengals vs Cowboys",
        "bet": "Points Over 49.5",
        "result": "L"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Steve",
        "game": "Bills vs Rams",
        "bet": "Points Over 50.5",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 2,
        "player": "Steve",
        "game": "49ers vs Bears",
        "bet": "49ers -3",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Joe",
        "game": "Army vs Navy",
        "bet": "Army -6.5",
        "result": "L"
      },
      {
        "week": 16,
        "slot": 2,
        "player": "Joe",
        "game": "Bengals vs Titans",
        "bet": "Bengals -5.5",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Brad",
        "game": "Army vs Navy",
        "bet": "Points Under 39",
        "result": "L"
      },
      {
        "week": 16,
        "slot": 2,
        "player": "Brad",
        "game": "Colts vs Broncos",
        "bet": "Points Over 43.5",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Jay",
        "game": "Commanders vs Saints",
        "bet": "1H points Under 22",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 2,
        "player": "Jay",
        "game": "Steelers vs Eagles",
        "bet": "Points Over 43",
        "result": "L"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Kev",
        "game": "Lions vs Bills",
        "bet": "Points Over 55.5",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 2,
        "player": "Kev",
        "game": "Steelers vs Eagles",
        "bet": "Points Under 43",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Ceci",
        "game": "Falcons vs Raiders",
        "bet": "Falcons -6",
        "result": "P"
      },
      {
        "week": 16,
        "slot": 2,
        "player": "Ceci",
        "game": "Packers vs Seahawks",
        "bet": "Packers -2.5",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "AJ",
        "game": "Dolphins vs Texans",
        "bet": "Points Over 46.5",
        "result": "L"
      },
      {
        "week": 16,
        "slot": 2,
        "player": "AJ",
        "game": "Colts vs Broncos",
        "bet": "Broncos -4.5",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Kohler",
        "game": "Western Michigan vs South Alabama",
        "bet": "WMU +9",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 2,
        "player": "Kohler",
        "game": "Lions vs Bills",
        "bet": "Lions -2.5",
        "result": "L"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Blaine",
        "game": "Patriots vs Cardinals",
        "bet": "Points Over 46",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 2,
        "player": "Blaine",
        "game": "Bears vs Vikings",
        "bet": "Bears +6.5",
        "result": "L"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Steve",
        "game": "Commanders vs Saints",
        "bet": "Commanders -7.5",
        "result": "L"
      },
      {
        "week": 16,
        "slot": 2,
        "player": "Steve",
        "game": "Commanders vs Saints",
        "bet": "Points Over 44",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Joe",
        "game": "Vikings vs Seahawks",
        "bet": "Vikings -2.5",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 2,
        "player": "Joe",
        "game": "Eagles vs Commanders",
        "bet": "Eagles -4",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Brad",
        "game": "Penn St. vs SMU",
        "bet": "Penn St. -8",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 2,
        "player": "Brad",
        "game": "Bucs vs Cowboys",
        "bet": "Points Over 47.5",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Jay",
        "game": "UNLV vs Cal",
        "bet": "UNLV -3",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 2,
        "player": "Jay",
        "game": "Lions vs Bears",
        "bet": "1st Half Lions -3.5",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Kev",
        "game": "Rams vs Jets",
        "bet": "Rams -3",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 2,
        "player": "Kev",
        "game": "Vikings vs Seahawks",
        "bet": "Points Over 42.5",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Ceci",
        "game": "Bucs vs Cowboys",
        "bet": "Bucs -3.5",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 2,
        "player": "Ceci",
        "game": "Packers vs Saints",
        "bet": "Packers -14",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "AJ",
        "game": "Cardinals vs Panthers",
        "bet": "Cardinals -4.5",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 2,
        "player": "AJ",
        "game": "Texas vs Clemson",
        "bet": "Points Under 51.5",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Kohler",
        "game": "Lions vs Bears",
        "bet": "Lions -6",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 2,
        "player": "Kohler",
        "game": "Tennessee vs Ohio St.",
        "bet": "Tennessee +7.5",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Blaine",
        "game": "Saints vs Packers",
        "bet": "Saints ML (no force Pick remaining)",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 2,
        "player": "Blaine",
        "game": "Bucs vs Cowboys",
        "bet": "Cowboys +3.5",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Steve",
        "game": "Eagles vs Commanders",
        "bet": "Points Over 42.5",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 2,
        "player": "Steve",
        "game": "Eagles vs Commanders",
        "bet": "Commanders +4",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Joe",
        "game": "Steelers vs Chiefs",
        "bet": "Points Under 44",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 2,
        "player": "Joe",
        "game": "Steelers vs Chiefs",
        "bet": "Steelers +2.5",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Brad",
        "game": "USC vs TXAM",
        "bet": "Texas AM -3.5",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 2,
        "player": "Brad",
        "game": "Dolphins vs Browns",
        "bet": "Dolphins -3",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Jay",
        "game": "Steelers vs Chiefs",
        "bet": "1st Half Under 23",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 2,
        "player": "Jay",
        "game": "BC vs Nebraska",
        "bet": "Points Over 46.5",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Kev",
        "game": "Steelers vs Chiefs",
        "bet": "Points Over 46.5",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 2,
        "player": "Kev",
        "game": "Bengals vs Broncos",
        "bet": "Bengals -3.5",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Ceci",
        "game": "Ravens vs Texans",
        "bet": "Ravens -5.5",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 2,
        "player": "Ceci",
        "game": "Packers vs Vikings",
        "bet": "Packers +1",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "AJ",
        "game": "Teaxas Tech vs Arkansas",
        "bet": "Points Over 52",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 2,
        "player": "AJ",
        "game": "Packers vs Vikings",
        "bet": "Points Over 48.5",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Kohler",
        "game": "Nebraska vs BC",
        "bet": "Nebraska -3.5",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 2,
        "player": "Kohler",
        "game": "Lions vs 49ers",
        "bet": "Lions -3.5",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Blaine",
        "game": "Lions vs 49ers",
        "bet": "Points Over 50.5",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 2,
        "player": "Blaine",
        "game": "Lions vs 49ers",
        "bet": "1st Quarter Over 10",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Steve",
        "game": "Lions vs 49ers",
        "bet": "Points Under 50.5",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 2,
        "player": "Steve",
        "game": "Lions vs 49ers",
        "bet": "1st Quarter Under 10",
        "result": "L"
      }
    ]
  },
  "7": {
    "number": 7,
    "title": "All In",
    "roster": [
      "AJ",
      "Joe",
      "Ceci",
      "Kev",
      "Brad",
      "Kohler",
      "Blaine",
      "Steve",
      "Jay"
    ],
    "records": {
      "AJ": {
        "wins": 20,
        "losses": 15,
        "pushes": 1,
        "sheetPct": 0.5556
      },
      "Joe": {
        "wins": 18,
        "losses": 18,
        "pushes": 0,
        "sheetPct": 0.5
      },
      "Ceci": {
        "wins": 19,
        "losses": 17,
        "pushes": 0,
        "sheetPct": 0.5278
      },
      "Kev": {
        "wins": 18,
        "losses": 18,
        "pushes": 0,
        "sheetPct": 0.5
      },
      "Brad": {
        "wins": 17,
        "losses": 19,
        "pushes": 0,
        "sheetPct": 0.4722
      },
      "Kohler": {
        "wins": 17,
        "losses": 19,
        "pushes": 0,
        "sheetPct": 0.4722
      },
      "Blaine": {
        "wins": 17,
        "losses": 18,
        "pushes": 1,
        "sheetPct": 0.4722
      },
      "Steve": {
        "wins": 16,
        "losses": 19,
        "pushes": 1,
        "sheetPct": 0.4444
      },
      "Jay": {
        "wins": 14,
        "losses": 21,
        "pushes": 1,
        "sheetPct": 0.3889
      }
    },
    "picks": [
      {
        "week": 1,
        "slot": 1,
        "player": "Joe",
        "game": "Tulane vs Northwestern",
        "bet": "Tulane -4.5",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 2,
        "player": "Joe",
        "game": "Iowa St. vs Albany",
        "bet": "Iowa St. -16.5",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Brad",
        "game": "Oregon vs Montana St.",
        "bet": "Oregon -28.5",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 2,
        "player": "Brad",
        "game": "Alabama vs FSU",
        "bet": "Alabama -13.5",
        "result": "L"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Jay",
        "game": "LSU vs Clemson",
        "bet": "Points Over 57.5",
        "result": "L"
      },
      {
        "week": 1,
        "slot": 2,
        "player": "Jay",
        "game": "Syracuse vs Tennessee",
        "bet": "Points Over 51",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Kev",
        "game": "Penn St. vs Nevada",
        "bet": "Penn St. -43.5",
        "result": "L"
      },
      {
        "week": 1,
        "slot": 2,
        "player": "Kev",
        "game": "UGA vs Marshall",
        "bet": "UGA -38.5",
        "result": "L"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Ceci",
        "game": "California vs Oregon St.",
        "bet": "California -1",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 2,
        "player": "Ceci",
        "game": "Georgia Southern vs Fresno St.",
        "bet": "Georgia Southern -2",
        "result": "L"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "AJ",
        "game": "Indiana vs ODU",
        "bet": "Indiana -23",
        "result": "L"
      },
      {
        "week": 1,
        "slot": 2,
        "player": "AJ",
        "game": "Oregon vs Montana St.",
        "bet": "Points Over 55.5",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Kohler",
        "game": "Baylor vs Auburn",
        "bet": "Baylor +2.5",
        "result": "L"
      },
      {
        "week": 1,
        "slot": 2,
        "player": "Kohler",
        "game": "Nebraska vs Cincinnati",
        "bet": "Nebraska -6.5",
        "result": "L"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Blaine",
        "game": "Texas vs Ohio St.",
        "bet": "Texas +2",
        "result": "L"
      },
      {
        "week": 1,
        "slot": 2,
        "player": "Blaine",
        "game": "Texas vs Ohio St.",
        "bet": "Points Over 46.5",
        "result": "L"
      },
      {
        "week": 1,
        "slot": 1,
        "player": "Steve",
        "game": "Maryland vs FAU",
        "bet": "Maryland -14",
        "result": "W"
      },
      {
        "week": 1,
        "slot": 2,
        "player": "Steve",
        "game": "Tennessee vs Syracuse",
        "bet": "Tennessee -13.5",
        "result": "W"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Joe",
        "game": "SMU vs Baylor",
        "bet": "SMU -2.5",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 2,
        "player": "Joe",
        "game": "Steelers vs Jets",
        "bet": "Steelers -3",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Brad",
        "game": "Michigan vs Oklahoma",
        "bet": "Points Over 43.5",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 2,
        "player": "Brad",
        "game": "Eagles vs Cowboys",
        "bet": "Eagles -8",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Jay",
        "game": "Texas vs San Jose St.",
        "bet": "Texas -37",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 2,
        "player": "Jay",
        "game": "Bengals vs Browns",
        "bet": "Bengals -4",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Kev",
        "game": "Ole Miss vs Kentucky",
        "bet": "Ole Miss - 9.5",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 2,
        "player": "Kev",
        "game": "Dolphins vs Colts",
        "bet": "Points Under 46.5",
        "result": "W"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Ceci",
        "game": "Vanderbilt vs Vtech",
        "bet": "VTech -2",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 2,
        "player": "Ceci",
        "game": "49ers vs Seahawks",
        "bet": "49ers -2",
        "result": "W"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "AJ",
        "game": "Oregon vs OK St.",
        "bet": "Points Over 55.5",
        "result": "W"
      },
      {
        "week": 2,
        "slot": 2,
        "player": "AJ",
        "game": "Falcons vs Bucs",
        "bet": "Points Over 47",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Kohler",
        "game": "Michigan vs Oklahoma",
        "bet": "Michigan +5",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 2,
        "player": "Kohler",
        "game": "Lions vs Packers",
        "bet": "Lions +2",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Blaine",
        "game": "Iowa vs Iowa St.",
        "bet": "Iowa St. -3",
        "result": "P"
      },
      {
        "week": 2,
        "slot": 2,
        "player": "Blaine",
        "game": "Rams vs Texans",
        "bet": "Rams -3",
        "result": "W"
      },
      {
        "week": 2,
        "slot": 1,
        "player": "Steve",
        "game": "Ohio St. vs Grambling",
        "bet": "Points Under 62.5",
        "result": "L"
      },
      {
        "week": 2,
        "slot": 2,
        "player": "Steve",
        "game": "Ravens vs Bills",
        "bet": "Ravens -1.5",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Joe",
        "game": "Oregon vs Northwestern",
        "bet": "Oregon -26.5",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 2,
        "player": "Joe",
        "game": "Lions vs Bears",
        "bet": "Points Over 46",
        "result": "W"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Brad",
        "game": "Georgia vs Tennessee",
        "bet": "Points Over 50.5",
        "result": "W"
      },
      {
        "week": 3,
        "slot": 2,
        "player": "Brad",
        "game": "Eagles vs Chiefs",
        "bet": "Points Over 46.5",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Jay",
        "game": "Arizona vs Kansas St.",
        "bet": "Points Over 54.5",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 2,
        "player": "Jay",
        "game": "Bills vs Jets",
        "bet": "Bills -5.5",
        "result": "W"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Kev",
        "game": "Clemson vs Georgia Tech",
        "bet": "Georiga Tech +3",
        "result": "W"
      },
      {
        "week": 3,
        "slot": 2,
        "player": "Kev",
        "game": "Packers vs Commanders",
        "bet": "Points Over 48.5",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Ceci",
        "game": "Clemson vs Georgia Tech",
        "bet": "Clemson -3",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 2,
        "player": "Ceci",
        "game": "Dolphins vs Patriots",
        "bet": "Dolphins -2.5",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "AJ",
        "game": "Oregon vs Northwestern",
        "bet": "Points Over 48.5",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 2,
        "player": "AJ",
        "game": "Cowboys vs Giants",
        "bet": "Cowboys -5.5",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Kohler",
        "game": "Ohio vs Ohio St.",
        "bet": "Ohio St. -28.5",
        "result": "L"
      },
      {
        "week": 3,
        "slot": 2,
        "player": "Kohler",
        "game": "Bengals vs Jaguars",
        "bet": "Points Over 49.5",
        "result": "W"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Blaine",
        "game": "Kent St. vs Buffalo",
        "bet": "Kent St. +23",
        "result": "W"
      },
      {
        "week": 3,
        "slot": 2,
        "player": "Blaine",
        "game": "Packers vs Commanders",
        "bet": "Packers -3",
        "result": "W"
      },
      {
        "week": 3,
        "slot": 1,
        "player": "Steve",
        "game": "Miami vs USF",
        "bet": "Miami -17.5",
        "result": "W"
      },
      {
        "week": 3,
        "slot": 2,
        "player": "Steve",
        "game": "Bills vs Jets",
        "bet": "Jets -6",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Joe",
        "game": "Tulane vs Ole Miss",
        "bet": "Tulane +13",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 2,
        "player": "Joe",
        "game": "Bears vs Cowboys",
        "bet": "Points Over 50",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Brad",
        "game": "Miami vs Florida",
        "bet": "Miami -7.5",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 2,
        "player": "Brad",
        "game": "Steelers vs Patriots",
        "bet": "Steelers -1.5",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Jay",
        "game": "FSU vs",
        "bet": "-12.5 1st Qrt",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 2,
        "player": "Jay",
        "game": "Cardinals vs 49ers",
        "bet": "Points over 45",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Kev",
        "game": "Texas Tech vs Utah",
        "bet": "Points Over 58.5",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 2,
        "player": "Kev",
        "game": "Bucs vs Jets",
        "bet": "Bucs - 6.5",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Ceci",
        "game": "Texas Tech vs Utah",
        "bet": "Texas Tech +3.5",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 2,
        "player": "Ceci",
        "game": "Ravens vs Lions",
        "bet": "Ravens - 4.5",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "AJ",
        "game": "FSU vs Kent St.",
        "bet": "Points Over 56",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 2,
        "player": "AJ",
        "game": "Commanders vs Raiders",
        "bet": "Commanders -3",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Kohler",
        "game": "Syracuse vs Clemson",
        "bet": "Syracuse +17",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 2,
        "player": "Kohler",
        "game": "Colts vs Titans",
        "bet": "Titans +5.5",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Blaine",
        "game": "Ohio vs Gader Webb",
        "bet": "Garder Webb +30.5",
        "result": "W"
      },
      {
        "week": 4,
        "slot": 2,
        "player": "Blaine",
        "game": "Cowboys vs Bears",
        "bet": "Cowboys -1",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 1,
        "player": "Steve",
        "game": "UNC vs UCF",
        "bet": "UNC +6.5",
        "result": "L"
      },
      {
        "week": 4,
        "slot": 2,
        "player": "Steve",
        "game": "Packers vs Bears",
        "bet": "Packers -7",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Joe",
        "game": "Central Michigan vs EMU",
        "bet": "Central Michigan -3",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 2,
        "player": "Joe",
        "game": "Bucs vs Eagles",
        "bet": "Eagles -3.5",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Brad",
        "game": "Georgia vs Alabama",
        "bet": "Georgia -2.5",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 2,
        "player": "Brad",
        "game": "49ers vs Jaguars",
        "bet": "49ers -3.5",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Jay",
        "game": "Auburn vs TXAM",
        "bet": "Ponts Over 51",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 2,
        "player": "Jay",
        "game": "Packers vs Cowboys",
        "bet": "Packers 1st H -3.5",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Kev",
        "game": "Penn St vs Oregon",
        "bet": "Penn St. -3.5",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 2,
        "player": "Kev",
        "game": "Colts vs Rams",
        "bet": "Colts +3.5",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Ceci",
        "game": "Duke vs Syracuse",
        "bet": "Duke -4.5",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 2,
        "player": "Ceci",
        "game": "Chiefs vs Ravens",
        "bet": "Chiefs +2.5",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "AJ",
        "game": "FSU vs Virginia",
        "bet": "FSU -7",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 2,
        "player": "AJ",
        "game": "Bucs vs Eagles",
        "bet": "Points Over 44",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Kohler",
        "game": "Penn St vs Oregon",
        "bet": "Oregon +3.5",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 2,
        "player": "Kohler",
        "game": "Lions vs Browns",
        "bet": "Lions -10",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Blaine",
        "game": "UL Monroe vs Arkansas St.",
        "bet": "UL Monroe -1.5",
        "result": "W"
      },
      {
        "week": 5,
        "slot": 2,
        "player": "Blaine",
        "game": "Packers vs Cowboys",
        "bet": "Packers -6.5",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 1,
        "player": "Steve",
        "game": "Missori St. vs WKU",
        "bet": "Missouri St. +3.5",
        "result": "L"
      },
      {
        "week": 5,
        "slot": 2,
        "player": "Steve",
        "game": "Jets vs Dolphins",
        "bet": "Jets +2.5",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Joe",
        "game": "Iowa st. vs Cinnci",
        "bet": "Iowa St. +1.5",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 2,
        "player": "Joe",
        "game": "Giants vs Saints",
        "bet": "Giants +2",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Brad",
        "game": "Miami vs Florida St.",
        "bet": "Points Over 54.5",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 2,
        "player": "Brad",
        "game": "Eagles vs Broncos",
        "bet": "Eagles -4.5",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Jay",
        "game": "Purdue vs Illinois",
        "bet": "Points Over 54.5",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 2,
        "player": "Jay",
        "game": "Eagles vs Broncos",
        "bet": "Broncos 1st Half +3",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Kev",
        "game": "Alabama vs Vanderbilt",
        "bet": "Vanderbilt +12.5",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 2,
        "player": "Kev",
        "game": "Panthers vs Dolphins",
        "bet": "Panthers +1.5",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Ceci",
        "game": "Virginia vs Louisville",
        "bet": "Lousiville -6.5",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 2,
        "player": "Ceci",
        "game": "Rams vs 49ers",
        "bet": "Points Under 44",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "AJ",
        "game": "Texas vs Florida",
        "bet": "Texas -5.5",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 2,
        "player": "AJ",
        "game": "Bills vs Patriots",
        "bet": "Bills 1st Half -4.5",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Kohler",
        "game": "Alabama vs Vanderbilt",
        "bet": "Alabama -12",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 2,
        "player": "Kohler",
        "game": "Lions vs Bengals",
        "bet": "Lions -10",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Blaine",
        "game": "UL Monroe vs North Western",
        "bet": "UL Monroe +11.5",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 2,
        "player": "Blaine",
        "game": "Jets vs Cowboys",
        "bet": "Jets +1",
        "result": "L"
      },
      {
        "week": 6,
        "slot": 1,
        "player": "Steve",
        "game": "Boise St. vs Notre Dame",
        "bet": "Boise St +21.5",
        "result": "W"
      },
      {
        "week": 6,
        "slot": 2,
        "player": "Steve",
        "game": "Bucs vs Seahawks",
        "bet": "Bucs +4",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Joe",
        "game": "TCU vs K State",
        "bet": "TCU -2.5",
        "result": "L"
      },
      {
        "week": 7,
        "slot": 2,
        "player": "Joe",
        "game": "Lions vs Chiefs",
        "bet": "Lions +2",
        "result": "L"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Brad",
        "game": "Alabama vs Mizzou",
        "bet": "Points Over 51.5",
        "result": "L"
      },
      {
        "week": 7,
        "slot": 2,
        "player": "Brad",
        "game": "Bucs vs 49ers",
        "bet": "Bucs -3.5",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Jay",
        "game": "Miami Ohio vs Akron",
        "bet": "Points Over 47.5",
        "result": "L"
      },
      {
        "week": 7,
        "slot": 2,
        "player": "Jay",
        "game": "49ers vs Bucs",
        "bet": "Points Over 46.5",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Kev",
        "game": "Ohio St. vs Illinois",
        "bet": "Points Under 50.5",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 2,
        "player": "Kev",
        "game": "Panthers vs Cowboys",
        "bet": "Points Over 48.5",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Ceci",
        "game": "Alabama vs Mizzou",
        "bet": "Alabama -3.5",
        "result": "L"
      },
      {
        "week": 7,
        "slot": 2,
        "player": "Ceci",
        "game": "Falcons vs Bills",
        "bet": "Falcons +3.5",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "AJ",
        "game": "Texas Tech vs Kansas",
        "bet": "Points Over 59",
        "result": "P"
      },
      {
        "week": 7,
        "slot": 2,
        "player": "AJ",
        "game": "Falcons vs Bills",
        "bet": "Bills -4",
        "result": "L"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Kohler",
        "game": "Michigan vs USC",
        "bet": "Michigan +2.5",
        "result": "L"
      },
      {
        "week": 7,
        "slot": 2,
        "player": "Kohler",
        "game": "Jaguars vs Seahawks",
        "bet": "Jaguars +1",
        "result": "L"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Blaine",
        "game": "UL Monroe vs Coastal Carolina",
        "bet": "UL Monroe -2.5",
        "result": "L"
      },
      {
        "week": 7,
        "slot": 2,
        "player": "Blaine",
        "game": "Raiders vs Titans",
        "bet": "Points Under 41.5",
        "result": "W"
      },
      {
        "week": 7,
        "slot": 1,
        "player": "Steve",
        "game": "Tennessee vs Arkansas",
        "bet": "Tennessee -10",
        "result": "L"
      },
      {
        "week": 7,
        "slot": 2,
        "player": "Steve",
        "game": "Cowboys vs Panthers",
        "bet": "Cowboys -3",
        "result": "L"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Joe",
        "game": "JMU vs Old Dominion",
        "bet": "JMU -2.5",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 2,
        "player": "Joe",
        "game": "Patriots vs Titans",
        "bet": "Patriots -6.5",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Brad",
        "game": "Texas A&M vs Arkansas",
        "bet": "Texas A&M -7.5",
        "result": "L"
      },
      {
        "week": 8,
        "slot": 2,
        "player": "Brad",
        "game": "Texans vs Seahawks",
        "bet": "Points Over 41.5",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Jay",
        "game": "Ohio st vs Wisconsin",
        "bet": "Points Over 41",
        "result": "L"
      },
      {
        "week": 8,
        "slot": 2,
        "player": "Jay",
        "game": "Packers vs Cardinals",
        "bet": "1st Q Points Over 7.5",
        "result": "L"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Kev",
        "game": "Vanderbilt vs LSU",
        "bet": "Vanderbit -1.5",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 2,
        "player": "Kev",
        "game": "Packers vs Cardinals",
        "bet": "Packers -7",
        "result": "L"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Ceci",
        "game": "Norte Dame vs USC",
        "bet": "Norte Dame -10.5",
        "result": "L"
      },
      {
        "week": 8,
        "slot": 2,
        "player": "Ceci",
        "game": "Broncos vs Giants",
        "bet": "Broncos -8",
        "result": "L"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "AJ",
        "game": "UTSA vs UNT",
        "bet": "Points Over 65",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 2,
        "player": "AJ",
        "game": "Rams vs Jaguars",
        "bet": "Rams -3",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Kohler",
        "game": "Ohio st. vs Wisconsin",
        "bet": "Ohio St -25",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 2,
        "player": "Kohler",
        "game": "Chiefs vs Raiders",
        "bet": "Chiefs -13",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Blaine",
        "game": "Oklahoma vs South Carolina",
        "bet": "Oklahoma -4",
        "result": "W"
      },
      {
        "week": 8,
        "slot": 2,
        "player": "Blaine",
        "game": "Chiefs vs Raiders",
        "bet": "Raiders +13",
        "result": "L"
      },
      {
        "week": 8,
        "slot": 1,
        "player": "Steve",
        "game": "Ole Miss vs UGA",
        "bet": "Ole Miss +7.5",
        "result": "L"
      },
      {
        "week": 8,
        "slot": 2,
        "player": "Steve",
        "game": "Bucs vs Lions",
        "bet": "Bucs +5.5",
        "result": "L"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Joe",
        "game": "Missouri vs Vanderbit",
        "bet": "Vanderbilt -3",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 2,
        "player": "Joe",
        "game": "Patriots vs Browns",
        "bet": "Patriots -7",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Brad",
        "game": "Missouri vs Vanderbit",
        "bet": "Points Over 51.5",
        "result": "L"
      },
      {
        "week": 9,
        "slot": 2,
        "player": "Brad",
        "game": "Bengals vs Jets",
        "bet": "Bengals -5.5",
        "result": "L"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Jay",
        "game": "WMU vs Miami Ohio",
        "bet": "Points Over 40.5",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 2,
        "player": "Jay",
        "game": "Eagles vs Giants",
        "bet": "Eagles TT Over 24.5",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Kev",
        "game": "UVA vs UNC",
        "bet": "UVA -10.5",
        "result": "L"
      },
      {
        "week": 9,
        "slot": 2,
        "player": "Kev",
        "game": "Bengals vs Jets",
        "bet": "Jets +5.5",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Ceci",
        "game": "BYU vs Iowa St.",
        "bet": "BYU +2.5",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 2,
        "player": "Ceci",
        "game": "Bills vs Panthers",
        "bet": "Bills -7",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "AJ",
        "game": "Ole Miss vs Oklahoma",
        "bet": "Points Over 52.5",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 2,
        "player": "AJ",
        "game": "Bucs vs Saints",
        "bet": "Bucs -3.5",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Kohler",
        "game": "Alabama vs South Carolina",
        "bet": "Alabama -11",
        "result": "L"
      },
      {
        "week": 9,
        "slot": 2,
        "player": "Kohler",
        "game": "Chiefs vs Commanders",
        "bet": "Chiefs -12",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Blaine",
        "game": "Southern Miss",
        "bet": "Southern Miss -13",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 2,
        "player": "Blaine",
        "game": "Cowboys vs Broncos",
        "bet": "Cowboys +3",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 1,
        "player": "Steve",
        "game": "Ole Miss vs Oklahoma",
        "bet": "Ole Miss +5.5",
        "result": "W"
      },
      {
        "week": 9,
        "slot": 2,
        "player": "Steve",
        "game": "Chargers vs Vikings",
        "bet": "Chargers -3",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Joe",
        "game": "Georgia vs Florida",
        "bet": "Georiga -7",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 2,
        "player": "Joe",
        "game": "Patriots vs Falcons",
        "bet": "Patriots -4.5",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Brad",
        "game": "Hawaii vs San Jose St.",
        "bet": "Points Over 54.5",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 2,
        "player": "Brad",
        "game": "Seahawks vs Commanders",
        "bet": "Seahawks -2.5",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Jay",
        "game": "Texas vs Vanderbilt",
        "bet": "1H Points Under 23.5",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 2,
        "player": "Jay",
        "game": "Lions vs Vikings",
        "bet": "Lions 1st H -4.5",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Kev",
        "game": "Texas vs Vanderbilt",
        "bet": "Vanderbit +3.5",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 2,
        "player": "Kev",
        "game": "Colts vs Steelers",
        "bet": "Points Over 51.5",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Ceci",
        "game": "Virginia vs Cal",
        "bet": "Virginia -6",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 2,
        "player": "Ceci",
        "game": "Chargers vs Titans",
        "bet": "Chargers -9.5",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "AJ",
        "game": "Texas Tech vs K State",
        "bet": "Texas Tech -7",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 2,
        "player": "AJ",
        "game": "Broncos vs Texans",
        "bet": "Broncos +2",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Kohler",
        "game": "Ohio St. vs Penn St.",
        "bet": "Ohio St. -18.5",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 2,
        "player": "Kohler",
        "game": "Lions vs Vikings",
        "bet": "Lions -8.5",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Blaine",
        "game": "ODU vs UL Monroe",
        "bet": "Old Dominion -17",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 2,
        "player": "Blaine",
        "game": "Raiders vs Jaguars",
        "bet": "Raiders +1.5",
        "result": "W"
      },
      {
        "week": 10,
        "slot": 1,
        "player": "Steve",
        "game": "Vtech vs Loiusville",
        "bet": "Vtech +10.5",
        "result": "L"
      },
      {
        "week": 10,
        "slot": 2,
        "player": "Steve",
        "game": "Titans vs Chargers",
        "bet": "Titans +9.5",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Joe",
        "game": "Texas A&M vs Missouri",
        "bet": "Texas A&M -6.5",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 2,
        "player": "Joe",
        "game": "Rams vs 49ers",
        "bet": "Points Over 49.5",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Brad",
        "game": "San Diego St. vs Hawii",
        "bet": "Points Over 48.5",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 2,
        "player": "Brad",
        "game": "Lions vs Commanders",
        "bet": "Lions -5.5 1st Half",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Jay",
        "game": "San Diego St. vs Hawii",
        "bet": "San Diego St. -6.5",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 2,
        "player": "Jay",
        "game": "Bills vs Dolphins",
        "bet": "Bills -4.5 1st Half",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Kev",
        "game": "LSU vs Alabama",
        "bet": "Points Under 49.5",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 2,
        "player": "Kev",
        "game": "Jets vs Browns",
        "bet": "Points Under 37.5",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Ceci",
        "game": "Liberty vs Missou St.",
        "bet": "Liberty -7.5",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 2,
        "player": "Ceci",
        "game": "Seahawks vs Cardinals",
        "bet": "Seahawks -6.5",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "AJ",
        "game": "Oregon Vs Iowa",
        "bet": "Points Under 42",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 2,
        "player": "AJ",
        "game": "Bills vs Dolphins",
        "bet": "Points Under 50",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Kohler",
        "game": "Ohio St. vs Purdue",
        "bet": "Ohio St. -28.5",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 2,
        "player": "Kohler",
        "game": "Lions vs Commanders",
        "bet": "Lions -7.5",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Blaine",
        "game": "UTep vs Jack St.",
        "bet": "UTEP - 1",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 2,
        "player": "Blaine",
        "game": "Bills vs Dolphins",
        "bet": "Dolphins +4.5 1st Half",
        "result": "W"
      },
      {
        "week": 11,
        "slot": 1,
        "player": "Steve",
        "game": "LSU vs Alabama",
        "bet": "LSU +10.5",
        "result": "L"
      },
      {
        "week": 11,
        "slot": 2,
        "player": "Steve",
        "game": "Rams vs 49ers",
        "bet": "49ers +6",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Joe",
        "game": "Texas A&M vs South Carolina",
        "bet": "Texas A&M -17.5",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 2,
        "player": "Joe",
        "game": "Bears vs Vikings",
        "bet": "Bears +2.5",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Brad",
        "game": "Georgia vs Texas",
        "bet": "Georgia -6.5",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 2,
        "player": "Brad",
        "game": "Chiefs vs Broncos",
        "bet": "Points Over 44.5",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Jay",
        "game": "WVU vs ASU",
        "bet": "Points Over 47",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 2,
        "player": "Jay",
        "game": "Giants vs Packers",
        "bet": "Points Over 41.5",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Kev",
        "game": "Florida vs Ole Miss",
        "bet": "Points Over 53.5",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 2,
        "player": "Kev",
        "game": "Seahawks vs Rams",
        "bet": "Seahawks +3",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Ceci",
        "game": "UTEP vs Missou St.",
        "bet": "Points Under 48.5",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 2,
        "player": "Ceci",
        "game": "Cowboys vs Raiders",
        "bet": "Cowboys -3.5",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "AJ",
        "game": "TTU vs UCF",
        "bet": "Points Over 48",
        "result": "W"
      },
      {
        "week": 12,
        "slot": 2,
        "player": "AJ",
        "game": "Chargers vs Jaguars",
        "bet": "Chargers -3",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Kohler",
        "game": "Alabama vs OU",
        "bet": "Alabama -6.5",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 2,
        "player": "Kohler",
        "game": "Lions vs Eagles",
        "bet": "Lions +2.5",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Blaine",
        "game": "WVU vs ASU",
        "bet": "Points Under 47",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 2,
        "player": "Blaine",
        "game": "Cowboys vs Raiders",
        "bet": "Raiders +3.5",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 1,
        "player": "Steve",
        "game": "Georgia vs Texas",
        "bet": "Texas +4.5",
        "result": "L"
      },
      {
        "week": 12,
        "slot": 2,
        "player": "Steve",
        "game": "Packers vs Giants",
        "bet": "Packers -7",
        "result": "P"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Joe",
        "game": "JMU vs Washington St.",
        "bet": "JMU -14",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 2,
        "player": "Joe",
        "game": "Falcons vs Saints",
        "bet": "Falcons +1",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Brad",
        "game": "San Diego St. vs San St.",
        "bet": "San Diego St. -1.5",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 2,
        "player": "Brad",
        "game": "Eagles vs Cowboys",
        "bet": "Points Over 47.5",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Jay",
        "game": "Georgia vs Charlotte",
        "bet": "Georgia -42.5",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 2,
        "player": "Jay",
        "game": "Giants vs Lions",
        "bet": "Points Over 50.5",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Kev",
        "game": "JMU vs Washington St.",
        "bet": "Points Over 43.5",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 2,
        "player": "Kev",
        "game": "Eagles vs Cowboys",
        "bet": "Eagles -3",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Ceci",
        "game": "BYU vs Cincinnati",
        "bet": "BYU -3",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 2,
        "player": "Ceci",
        "game": "49ers vs Panthers",
        "bet": "49ers -7.5",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "AJ",
        "game": "Syracuse vs ND",
        "bet": "Syracuse +37",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 2,
        "player": "AJ",
        "game": "Rams vs Bucs",
        "bet": "Points Over 49.5",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Kohler",
        "game": "USC vs Oregon",
        "bet": "USC +10.5",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 2,
        "player": "Kohler",
        "game": "Giants vs Lions",
        "bet": "Lions -13.5",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Blaine",
        "game": "Tennessee vs Florida",
        "bet": "Tennessee -3",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 2,
        "player": "Blaine",
        "game": "Falcons vs Saints",
        "bet": "Saints -1",
        "result": "L"
      },
      {
        "week": 13,
        "slot": 1,
        "player": "Steve",
        "game": "Virginia Tech vs Miami",
        "bet": "Vtech +18.5",
        "result": "W"
      },
      {
        "week": 13,
        "slot": 2,
        "player": "Steve",
        "game": "Titans vs Seahawks",
        "bet": "Titans +12.5",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Joe",
        "game": "Alabama vs Auburn",
        "bet": "Alabama -5.5",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 2,
        "player": "Joe",
        "game": "Falcons vs Jets",
        "bet": "Falcons -3",
        "result": "L"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Brad",
        "game": "Oregon vs Washington",
        "bet": "Oregon -6.5",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 2,
        "player": "Brad",
        "game": "Chiefs vs Cowboys",
        "bet": "Chiefs -3",
        "result": "L"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Jay",
        "game": "Utah vs Kansas",
        "bet": "Utah -10",
        "result": "P"
      },
      {
        "week": 14,
        "slot": 2,
        "player": "Jay",
        "game": "Bills vs Steelers",
        "bet": "Points Over 44.5",
        "result": "L"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Kev",
        "game": "Indiana vs Purdue",
        "bet": "Indiana -28.5",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 2,
        "player": "Kev",
        "game": "Packers vs Lions",
        "bet": "Points Over 48.5",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Ceci",
        "game": "Missouri vs Arkansas",
        "bet": "Missouri -4",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 2,
        "player": "Ceci",
        "game": "Patriots vs Giants",
        "bet": "Patriots -7",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "AJ",
        "game": "Texas Tech vs WVU",
        "bet": "Points Over 52",
        "result": "L"
      },
      {
        "week": 14,
        "slot": 2,
        "player": "AJ",
        "game": "Chiefs vs Cowboys",
        "bet": "Points Under 53.5",
        "result": "L"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Kohler",
        "game": "Ohio St. vs Michigan",
        "bet": "Michigan +9.5",
        "result": "L"
      },
      {
        "week": 14,
        "slot": 2,
        "player": "Kohler",
        "game": "Lions vs Packers",
        "bet": "Lions -3",
        "result": "L"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Blaine",
        "game": "Ball St. vs Miami Ohio",
        "bet": "Ball St. +17.5",
        "result": "L"
      },
      {
        "week": 14,
        "slot": 2,
        "player": "Blaine",
        "game": "Chiefs vs Cowboys",
        "bet": "Cowboys +3",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 1,
        "player": "Steve",
        "game": "LSU vs Oklahoma",
        "bet": "LSU +10.5",
        "result": "W"
      },
      {
        "week": 14,
        "slot": 2,
        "player": "Steve",
        "game": "Vikings vs Seahawks",
        "bet": "Vikings + 11.5",
        "result": "L"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Joe",
        "game": "Bills vs Bengals",
        "bet": "Bengals +6",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 2,
        "player": "Joe",
        "game": "Seahawks vs Falcons",
        "bet": "Seahawks -6.5",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Brad",
        "game": "Georgia vs Alabama",
        "bet": "Georgia -1.5",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 2,
        "player": "Brad",
        "game": "Colts vs Jaguars",
        "bet": "Points Over 45.5",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Jay",
        "game": "WMU vs Miami Ohio",
        "bet": "Points Over 43",
        "result": "L"
      },
      {
        "week": 15,
        "slot": 2,
        "player": "Jay",
        "game": "Dolphins vs Jets",
        "bet": "Dolphins -2.5",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Kev",
        "game": "Steelers vs Ravens",
        "bet": "Steelers +5.5",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 2,
        "player": "Kev",
        "game": "Eagles vs Chargers",
        "bet": "Points Over 41.5",
        "result": "L"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Ceci",
        "game": "Indiana vs Ohio St.",
        "bet": "Ohio St. -4",
        "result": "L"
      },
      {
        "week": 15,
        "slot": 2,
        "player": "Ceci",
        "game": "Eagles vs Chargers",
        "bet": "Chargers +2",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "AJ",
        "game": "Texas Tech",
        "bet": "Texas Tech -12",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 2,
        "player": "AJ",
        "game": "Bears vs Packers",
        "bet": "Points Over 44",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Kohler",
        "game": "WMU vs Miami Ohio",
        "bet": "Western Michigan -2",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 2,
        "player": "Kohler",
        "game": "Rams vs Cardinals",
        "bet": "Rams -9.5",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Blaine",
        "game": "Colts vs Jaguars",
        "bet": "Points Under 44.5",
        "result": "L"
      },
      {
        "week": 15,
        "slot": 2,
        "player": "Blaine",
        "game": "Steelers vs Ravens",
        "bet": "Points Under 44",
        "result": "L"
      },
      {
        "week": 15,
        "slot": 1,
        "player": "Steve",
        "game": "Texans vs Chiefs",
        "bet": "Texans +4",
        "result": "W"
      },
      {
        "week": 15,
        "slot": 2,
        "player": "Steve",
        "game": "Eagles vs Chargers",
        "bet": "Eagles -2",
        "result": "L"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Joe",
        "game": "Bills vs Patriots",
        "bet": "Bills -1.5",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 2,
        "player": "Joe",
        "game": "Bengals vs Ravens",
        "bet": "Bengals +3",
        "result": "L"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Brad",
        "game": "Packers vs Broncos",
        "bet": "Points Over 42.5",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 2,
        "player": "Brad",
        "game": "Cowboys vs Vikings",
        "bet": "Cowboys -5.5",
        "result": "L"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Jay",
        "game": "Army vs Navy",
        "bet": "Points Over 38",
        "result": "L"
      },
      {
        "week": 16,
        "slot": 2,
        "player": "Jay",
        "game": "Cowboys vs Vikings",
        "bet": "Points Under 47.5",
        "result": "L"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Kev",
        "game": "Bills vs Patriots",
        "bet": "Points Over 49.5",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 2,
        "player": "Kev",
        "game": "Browns vs Patriots",
        "bet": "Browns +7.5",
        "result": "L"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Ceci",
        "game": "Browns vs Bears",
        "bet": "Points Under 38.5",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 2,
        "player": "Ceci",
        "game": "Packers vs Broncos",
        "bet": "Packers -1",
        "result": "L"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "AJ",
        "game": "Cowboys vs Vikings",
        "bet": "Points Over 47.5",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 2,
        "player": "AJ",
        "game": "Rams vs Lions",
        "bet": "Rams -5.5",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Kohler",
        "game": "Army vs Navy",
        "bet": "Points Under 38",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 2,
        "player": "Kohler",
        "game": "Rams vs Lions",
        "bet": "Points Over 54.5",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Blaine",
        "game": "Dolphins vs Steelers",
        "bet": "Dolphins +3.5",
        "result": "L"
      },
      {
        "week": 16,
        "slot": 2,
        "player": "Blaine",
        "game": "Dolphins vs Steelers",
        "bet": "Points Over 42.5",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 1,
        "player": "Steve",
        "game": "Chiefs vs Chargers",
        "bet": "Points Under 41",
        "result": "W"
      },
      {
        "week": 16,
        "slot": 2,
        "player": "Steve",
        "game": "Titns vs 49ers",
        "bet": "Points Over 44",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Joe",
        "game": "Bills vs Browns",
        "bet": "Bills -10.5",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 2,
        "player": "Joe",
        "game": "Jaguars vs Broncos",
        "bet": "Jaguars +3.5",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Brad",
        "game": "Texas A&M vs Miami",
        "bet": "Texas A&M -3.5",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 2,
        "player": "Brad",
        "game": "Vikings vs Giants",
        "bet": "Vikings -2.5",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Jay",
        "game": "Bears vs Packers",
        "bet": "Bears -1",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 2,
        "player": "Jay",
        "game": "Colts vs 49ers",
        "bet": "49ers -5.5",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Kev",
        "game": "Oregon vs JMU",
        "bet": "JMU +20.5",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 2,
        "player": "Kev",
        "game": "Colts vs 49ers",
        "bet": "Colts +4.5",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Ceci",
        "game": "Patriots vs Ravens",
        "bet": "Points Under 48.5",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 2,
        "player": "Ceci",
        "game": "Falcons vs Cardinals",
        "bet": "Falcons -2.5",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "AJ",
        "game": "Bengals vs Dolphins",
        "bet": "Bengals -4",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 2,
        "player": "AJ",
        "game": "Jaguars vs Broncos",
        "bet": "Points Under 47",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Kohler",
        "game": "Oregon vs JMU",
        "bet": "Oregon -20.5",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 2,
        "player": "Kohler",
        "game": "Titans vs Chiefs",
        "bet": "Titans +3",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Blaine",
        "game": "Oklahoma vs Alabama",
        "bet": "Oklahoma -1.5",
        "result": "L"
      },
      {
        "week": 17,
        "slot": 2,
        "player": "Blaine",
        "game": "Oklahoma vs Alabama",
        "bet": "Points Over 41",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 1,
        "player": "Steve",
        "game": "Steeles vs Lions",
        "bet": "Steelers +7.5",
        "result": "W"
      },
      {
        "week": 17,
        "slot": 2,
        "player": "Steve",
        "game": "Bills vs Browns",
        "bet": "Browns +10.5",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Joe",
        "game": "Chargers vs Texans",
        "bet": "Chargers -1.5",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 2,
        "player": "Joe",
        "game": "Jaguars vs Colts",
        "bet": "Jaguars -5.5",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Brad",
        "game": "49ers vs Bears",
        "bet": "Points Over 51.5",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 2,
        "player": "Brad",
        "game": "Rams vs Falcons",
        "bet": "Rams -7",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Jay",
        "game": "Lions vs Vikings",
        "bet": "Loins -7.5",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 2,
        "player": "Jay",
        "game": "UNLV vs Ohio",
        "bet": "Points Under 64.5",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Kev",
        "game": "Bengals vs Cardinals",
        "bet": "Bengals -7",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 2,
        "player": "Kev",
        "game": "Titans vs Saints",
        "bet": "Titans +1.5",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Ceci",
        "game": "Steelers vs Browns",
        "bet": "Steelers -3.5",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 2,
        "player": "Ceci",
        "game": "Army vs UConn",
        "bet": "Army -7.5",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "AJ",
        "game": "Bengals vs Cardinals",
        "bet": "Points over 53.5",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 2,
        "player": "AJ",
        "game": "Giants vs Raiders",
        "bet": "Giants -2.5",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Kohler",
        "game": "Saints vs Titans",
        "bet": "Saints -1.5",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 2,
        "player": "Kohler",
        "game": "Panthers vs Seahawks",
        "bet": "Panthers +6.5",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Blaine",
        "game": "Falcons vs Rams",
        "bet": "Flacons",
        "result": "W"
      },
      {
        "week": 18,
        "slot": 2,
        "player": "Blaine",
        "game": "Falcons vs Rams",
        "bet": "Points Under 48.5",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 1,
        "player": "Steve",
        "game": "Bills vs Eagles",
        "bet": "Bills -3",
        "result": "L"
      },
      {
        "week": 18,
        "slot": 2,
        "player": "Steve",
        "game": "Bills vs Eagles",
        "bet": "Points Over 45",
        "result": "L"
      }
    ]
  }
} as Record<number, HistoricalSeason>;

export const lifetimeRecords: Record<string, HistoricalRecord & { seasons: number[] }> = Object.values(historicalSeasons).reduce((careerRecords, season) => {
  for (const [name, record] of Object.entries(season.records)) {
    const career = careerRecords[name] ?? { wins: 0, losses: 0, pushes: 0, sheetPct: 0, seasons: [] };
    career.wins += record.wins;
    career.losses += record.losses;
    career.pushes += record.pushes;
    career.seasons.push(season.number);
    career.sheetPct = career.wins / (career.wins + career.losses + career.pushes);
    careerRecords[name] = career;
  }
  return careerRecords;
}, {} as Record<string, HistoricalRecord & { seasons: number[] }>);

/* Legacy generated totals retained below for source-tape auditing.
const generatedLifetimeRecords: Record<string, HistoricalRecord & { seasons: number[] }> = {
  "AJ": {
    "wins": 52,
    "losses": 53,
    "pushes": 3,
    "sheetPct": 0.4815,
    "seasons": [
      5,
      6,
      7
    ]
  },
  "Joe": {
    "wins": 70,
    "losses": 70,
    "pushes": 4,
    "sheetPct": 0.4861,
    "seasons": [
      4,
      5,
      6,
      7
    ]
  },
  "Ceci": {
    "wins": 74,
    "losses": 66,
    "pushes": 4,
    "sheetPct": 0.5139,
    "seasons": [
      4,
      5,
      6,
      7
    ]
  },
  "Kev": {
    "wins": 72,
    "losses": 69,
    "pushes": 3,
    "sheetPct": 0.5,
    "seasons": [
      4,
      5,
      6,
      7
    ]
  },
  "Brad": {
    "wins": 71,
    "losses": 70,
    "pushes": 3,
    "sheetPct": 0.4931,
    "seasons": [
      4,
      5,
      6,
      7
    ]
  },
  "Kohler": {
    "wins": 39,
    "losses": 32,
    "pushes": 1,
    "sheetPct": 0.5417,
    "seasons": [
      6,
      7
    ]
  },
  "Blaine": {
    "wins": 54,
    "losses": 53,
    "pushes": 1,
    "sheetPct": 0.5,
    "seasons": [
      4,
      6,
      7
    ]
  },
  "Steve": {
    "wins": 50,
    "losses": 55,
    "pushes": 3,
    "sheetPct": 0.463,
    "seasons": [
      5,
      6,
      7
    ]
  },
  "Jay": {
    "wins": 77,
    "losses": 64,
    "pushes": 3,
    "sheetPct": 0.5347,
    "seasons": [
      4,
      5,
      6,
      7
    ]
  }
} as Record<string, HistoricalRecord & { seasons: number[] }>;
*/

export const historicalSeasonNumbers = [7, 6, 5, 4, 3, 2, 1] as const;

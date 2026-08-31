type PixelGlyph = readonly string[];

export type TickerStatus = 'W' | 'L' | 'P' | 'LIVE' | 'PENDING';

export type TickerCard = {
  player: string;
  text: string;
  status: TickerStatus;
};

const WIDTH = 32;
const HEIGHT = 32;
const FRAME_COUNT = 32;
const FRAME_DELAY_CENTISECONDS = 20;

const PALETTE: ReadonlyArray<readonly [number, number, number]> = [
  [2, 6, 30],
  [130, 244, 255],
  [255, 79, 216],
  [255, 216, 74],
  [69, 255, 114],
  [255, 64, 92],
  [93, 102, 140],
  [119, 60, 255],
  [8, 13, 46],
  [238, 247, 255],
  [0, 0, 0],
  [24, 32, 78],
  [255, 176, 64],
  [120, 220, 255],
  [255, 255, 255],
  [0, 0, 0],
];

const FONT_3X5: Record<string, PixelGlyph> = {
  A: ['010', '101', '111', '101', '101'],
  B: ['110', '101', '110', '101', '110'],
  C: ['011', '100', '100', '100', '011'],
  D: ['110', '101', '101', '101', '110'],
  E: ['111', '100', '110', '100', '111'],
  F: ['111', '100', '110', '100', '100'],
  G: ['011', '100', '101', '101', '011'],
  H: ['101', '101', '111', '101', '101'],
  I: ['111', '010', '010', '010', '111'],
  J: ['001', '001', '001', '101', '010'],
  K: ['101', '101', '110', '101', '101'],
  L: ['100', '100', '100', '100', '111'],
  M: ['101', '111', '111', '101', '101'],
  N: ['101', '111', '111', '111', '101'],
  O: ['010', '101', '101', '101', '010'],
  P: ['110', '101', '110', '100', '100'],
  Q: ['010', '101', '101', '111', '011'],
  R: ['110', '101', '110', '101', '101'],
  S: ['011', '100', '010', '001', '110'],
  T: ['111', '010', '010', '010', '010'],
  U: ['101', '101', '101', '101', '111'],
  V: ['101', '101', '101', '101', '010'],
  W: ['101', '101', '111', '111', '101'],
  X: ['101', '101', '010', '101', '101'],
  Y: ['101', '101', '010', '010', '010'],
  Z: ['111', '001', '010', '100', '111'],
  '0': ['111', '101', '101', '101', '111'],
  '1': ['010', '110', '010', '010', '111'],
  '2': ['110', '001', '010', '100', '111'],
  '3': ['110', '001', '010', '001', '110'],
  '4': ['101', '101', '111', '001', '001'],
  '5': ['111', '100', '110', '001', '110'],
  '6': ['011', '100', '110', '101', '010'],
  '7': ['111', '001', '010', '010', '010'],
  '8': ['010', '101', '010', '101', '010'],
  '9': ['010', '101', '011', '001', '110'],
  ' ': ['000', '000', '000', '000', '000'],
};

const FONT_5X7: Record<string, PixelGlyph> = {
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  B: ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
  C: ['01111', '10000', '10000', '10000', '10000', '10000', '01111'],
  D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  F: ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
  G: ['01111', '10000', '10000', '10111', '10001', '10001', '01111'],
  H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
  J: ['00111', '00010', '00010', '00010', '10010', '10010', '01100'],
  K: ['10001', '10010', '10100', '11000', '10100', '10010', '10001'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001'],
  N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
  Q: ['01110', '10001', '10001', '10001', '10101', '10010', '01101'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
  V: ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
  W: ['10001', '10001', '10001', '10101', '10101', '10101', '01010'],
  X: ['10001', '10001', '01010', '00100', '01010', '10001', '10001'],
  Y: ['10001', '10001', '01010', '00100', '00100', '00100', '00100'],
  Z: ['11111', '00001', '00010', '00100', '01000', '10000', '11111'],
  '0': ['01110', '10001', '10011', '10101', '11001', '10001', '01110'],
  '1': ['00100', '01100', '00100', '00100', '00100', '00100', '01110'],
  '2': ['01110', '10001', '00001', '00010', '00100', '01000', '11111'],
  '3': ['11110', '00001', '00001', '01110', '00001', '00001', '11110'],
  '4': ['00010', '00110', '01010', '10010', '11111', '00010', '00010'],
  '5': ['11111', '10000', '10000', '11110', '00001', '00001', '11110'],
  '6': ['01110', '10000', '10000', '11110', '10001', '10001', '01110'],
  '7': ['11111', '00001', '00010', '00100', '01000', '01000', '01000'],
  '8': ['01110', '10001', '10001', '01110', '10001', '10001', '01110'],
  '9': ['01110', '10001', '10001', '01111', '00001', '00001', '01110'],
  '+': ['00000', '00100', '00100', '11111', '00100', '00100', '00000'],
  '-': ['00000', '00000', '00000', '11111', '00000', '00000', '00000'],
  '/': ['00001', '00010', '00010', '00100', '01000', '01000', '10000'],
  '.': ['00000', '00000', '00000', '00000', '00000', '00110', '00110'],
  '&': ['01100', '10010', '10100', '01000', '10101', '10010', '01101'],
  ' ': ['00000', '00000', '00000', '00000', '00000', '00000', '00000'],
};

function statusColor(status: TickerStatus) {
  if (status === 'W') return 4;
  if (status === 'L') return 5;
  if (status === 'P') return 13;
  return 3;
}

function setPixel(frame: Uint8Array, x: number, y: number, color: number) {
  if (x < 0 || y < 0 || x >= WIDTH || y >= HEIGHT) return;
  frame[y * WIDTH + x] = color;
}

function fillRect(frame: Uint8Array, x: number, y: number, width: number, height: number, color: number) {
  for (let py = y; py < y + height; py += 1) {
    for (let px = x; px < x + width; px += 1) setPixel(frame, px, py, color);
  }
}

function drawGlyph(frame: Uint8Array, glyph: PixelGlyph, x: number, y: number, color: number) {
  glyph.forEach((row, rowIndex) => {
    for (let column = 0; column < row.length; column += 1) {
      if (row[column] === '1') setPixel(frame, x + column, y + rowIndex, color);
    }
  });
}

function drawText(
  frame: Uint8Array,
  text: string,
  font: Record<string, PixelGlyph>,
  glyphWidth: number,
  x: number,
  y: number,
  color: number,
) {
  [...text.toUpperCase()].forEach((character, index) => {
    drawGlyph(frame, font[character] ?? font[' '], x + index * (glyphWidth + 1), y, color);
  });
}

function headerTextWidth(value: string) {
  return Math.max(0, value.length * 4 - 1);
}

function tickerTextWidth(value: string) {
  return Math.max(0, value.length * 6 - 1);
}

function renderFrame(card: TickerCard, frameIndex: number) {
  const frame = new Uint8Array(WIDTH * HEIGHT);
  const color = statusColor(card.status);
  const player = card.player.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
  const pick = card.text.toUpperCase().replace(/[^A-Z0-9+\-/.& ]/g, '').trim();

  fillRect(frame, 0, 0, WIDTH, HEIGHT, 0);
  fillRect(frame, 0, 0, WIDTH, 1, color);
  fillRect(frame, 0, 11, WIDTH, 1, color);
  fillRect(frame, 0, 12, WIDTH, 20, 8);
  setPixel(frame, 0, 31, color);
  setPixel(frame, 31, 31, color);

  drawText(frame, player, FONT_3X5, 3, 2, 4, 1);
  if (card.status === 'W' || card.status === 'L' || card.status === 'P') {
    drawText(frame, card.status, FONT_3X5, 3, 28, 4, color);
  }

  const travel = WIDTH + tickerTextWidth(pick);
  const offset = Math.round((frameIndex * travel) / (FRAME_COUNT - 1));
  drawText(frame, pick, FONT_5X7, 5, WIDTH - offset, 19, color);
  return frame;
}

function littleEndian(value: number) {
  return [value & 0xff, (value >> 8) & 0xff];
}

function ascii(value: string) {
  return [...value].map((character) => character.charCodeAt(0));
}

function literalLzw(indices: Uint8Array) {
  const clearCode = 16;
  const endCode = 17;
  const bytes: number[] = [];
  let accumulator = 0;
  let bitCount = 0;

  const writeFiveBitCode = (code: number) => {
    accumulator |= code << bitCount;
    bitCount += 5;
    while (bitCount >= 8) {
      bytes.push(accumulator & 0xff);
      accumulator >>= 8;
      bitCount -= 8;
    }
  };

  for (let start = 0; start < indices.length; start += 14) {
    writeFiveBitCode(clearCode);
    for (let index = start; index < Math.min(start + 14, indices.length); index += 1) {
      writeFiveBitCode(indices[index]);
    }
  }
  writeFiveBitCode(endCode);
  if (bitCount > 0) bytes.push(accumulator & 0xff);

  const blocks: number[] = [];
  for (let start = 0; start < bytes.length; start += 255) {
    const block = bytes.slice(start, start + 255);
    blocks.push(block.length, ...block);
  }
  blocks.push(0);
  return blocks;
}

export function renderTickerGif(card: TickerCard) {
  const bytes: number[] = [
    ...ascii('GIF89a'),
    ...littleEndian(WIDTH),
    ...littleEndian(HEIGHT),
    0xf3,
    0,
    0,
    ...PALETTE.flatMap((color) => color),
    0x21,
    0xff,
    0x0b,
    ...ascii('NETSCAPE2.0'),
    0x03,
    0x01,
    0x00,
    0x00,
    0x00,
  ];

  for (let frameIndex = 0; frameIndex < FRAME_COUNT; frameIndex += 1) {
    bytes.push(
      0x21,
      0xf9,
      0x04,
      0x00,
      ...littleEndian(FRAME_DELAY_CENTISECONDS),
      0x00,
      0x00,
      0x2c,
      0x00,
      0x00,
      0x00,
      0x00,
      ...littleEndian(WIDTH),
      ...littleEndian(HEIGHT),
      0x00,
      0x04,
      ...literalLzw(renderFrame(card, frameIndex)),
    );
  }
  bytes.push(0x3b);
  return Uint8Array.from(bytes);
}

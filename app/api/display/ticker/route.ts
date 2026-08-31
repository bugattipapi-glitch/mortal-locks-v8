import { buildDisplayFeed } from '../../../../lib/display-feed';
import { renderTickerGif, type TickerCard } from '../../../../lib/pixel-gif';
import { getRuntimeSnapshot } from '../../../../lib/runtime-data';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const feed = buildDisplayFeed(await getRuntimeSnapshot());
  const cards: TickerCard[] = feed.pages.flatMap((page) =>
    page.picks.map((pick) => ({
      player: page.player,
      text: pick.ticker_text,
      status: pick.result,
    })),
  );
  const requestedPick = Number.parseInt(new URL(request.url).searchParams.get('pick') ?? '0', 10);
  const pickIndex = Number.isFinite(requestedPick) && requestedPick >= 0 ? requestedPick : 0;
  const card = feed.available
    ? cards[pickIndex] ?? { player: 'MORTAL', text: 'NO PICKS', status: 'PENDING' as const }
    : { player: 'MORTAL', text: 'FEED OFF', status: 'PENDING' as const };
  const gif = renderTickerGif(card);

  return new Response(gif, {
    headers: {
      'Cache-Control': 'public, max-age=30, s-maxage=30, stale-while-revalidate=30',
      'Content-Disposition': 'inline; filename="mortal-locks-ticker.gif"',
      'Content-Type': 'image/gif',
      'X-Display-Ticker-Count': String(cards.length),
    },
  });
}

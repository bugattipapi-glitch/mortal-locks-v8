import { ImageResponse } from 'next/og';
import { buildDisplayFeed, type DisplayPage } from '../../../../lib/display-feed';
import { getRuntimeSnapshot } from '../../../../lib/runtime-data';

export const dynamic = 'force-dynamic';

const imageHeaders = {
  'Cache-Control': 'public, max-age=30, s-maxage=30, stale-while-revalidate=30',
  'Content-Disposition': 'inline; filename="mortal-locks-picks.png"',
};

function PickPage({ page, week }: { page: DisplayPage; week: number }) {
  const rows = [1, 2].map((slot) => page.picks.find((pick) => pick.slot === slot));
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#02061e',
        color: '#82f4ff',
        padding: '2px',
        border: '1px solid #773cff',
        fontFamily: 'monospace',
        textTransform: 'uppercase',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '6px', lineHeight: 1 }}>
        <span>{page.player}</span>
        <span style={{ color: '#ff4fd8' }}>W{week}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2px', gap: '2px' }}>
        {rows.map((pick, index) => (
          <div
            key={index}
            style={{
              height: '9px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 1px',
              background: '#080d2e',
              color: pick?.color ?? '#5d668c',
              fontSize: '5px',
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}
          >
            <span>{pick?.text ?? 'WAITING'}</span>
            <span>{pick?.status ?? '·'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyPage({ message }: { message: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#02061e',
        color: '#ffd84a',
        fontFamily: 'monospace',
        fontSize: '7px',
        lineHeight: 1.1,
        textAlign: 'center',
      }}
    >
      <span>MORTAL</span>
      <span>LOCKS</span>
      <span style={{ color: '#82f4ff', fontSize: '5px', marginTop: '2px' }}>{message}</span>
    </div>
  );
}

export async function GET(request: Request) {
  const feed = buildDisplayFeed(await getRuntimeSnapshot());
  const requestedPage = Number.parseInt(new URL(request.url).searchParams.get('page') ?? '0', 10);
  const pageIndex = Number.isFinite(requestedPage) && requestedPage >= 0 ? requestedPage : 0;
  const page = feed.pages[pageIndex];
  const content = !feed.available
    ? <EmptyPage message="FEED OFF" />
    : page
      ? <PickPage page={page} week={feed.week} />
      : <EmptyPage message="NO PICKS" />;

  return new ImageResponse(content, {
    width: 32,
    height: 32,
    headers: {
      ...imageHeaders,
      'X-Display-Page-Count': String(feed.pages.length),
    },
  });
}

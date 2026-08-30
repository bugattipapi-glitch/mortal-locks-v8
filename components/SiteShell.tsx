import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { connection } from 'next/server';
import { season } from '../lib/data';
import { getRuntimeSnapshot, type RuntimeSeason } from '../lib/runtime-data';
import { buildBroadcastRecap, type BroadcastRecap as BroadcastRecapData } from '../lib/broadcast';
import { ScoreTicker } from './ScoreTicker';
import { StandingsNavLink } from './StandingsNavLink';
import { BroadcastLauncher } from './BroadcastLauncher';
import { BroadcastRecap } from './BroadcastRecap';
import { HallTheme } from './HallTheme';
import { HallNavLink } from './HallNavLink';

type ActiveSection = 'picks' | 'standings' | 'season' | 'hall' | 'admin';

function displayDate(value: string) {
  const [year, month, day] = value.split('-');
  return month && day && year ? `${month}/${day}/${year.slice(-2)}` : '08/29/26';
}

export async function SiteShell({
  children,
  active = 'picks',
  seasonInfo,
  recap,
}: {
  children: ReactNode;
  active?: ActiveSection;
  seasonInfo?: Pick<RuntimeSeason, 'currentWeek' | 'status' | 'startDate'>;
  recap?: BroadcastRecapData;
}) {
  let resolvedSeason = seasonInfo;
  let resolvedRecap = recap;
  if (!resolvedSeason || !resolvedRecap) {
    await connection();
    const snapshot = await getRuntimeSnapshot();
    resolvedSeason ??= snapshot.season;
    resolvedRecap ??= buildBroadcastRecap(snapshot);
  }
  resolvedSeason ??= season;
  const week = String(resolvedSeason.currentWeek).padStart(2, '0');
  return (
    <div className="site-shell">
      <header className="broadcast-header">
        <BroadcastLauncher />
        <div className="brand-wrap">
          <div className="brand-signal brand-signal-left" aria-hidden="true">
            <span>WEEK</span>
            <b>{week}</b>
            <small>{resolvedSeason.status}</small>
          </div>
          <Link className="brand-logo" href="/" aria-label="Mortal Locks homepage">
            <Image src="/assets/mortal-locks-logo.png" alt="Mortal Locks 8 The Ocho" fill priority sizes="(max-width: 700px) 72vw, (max-width: 1000px) 54vw, 520px" />
          </Link>
          <div className="brand-signal brand-signal-right" aria-hidden="true">
            <span>SIGNAL</span>
            <b>88</b>
            <div className="signal-meter"><i /><i /><i /><i /><i /></div>
          </div>
          <div className="brand-crawl" aria-hidden="true">
            <span>MORTAL LOCKS SPORTS NETWORK</span>
            <span>9 PLAYERS · 18 WEEKS · 1 CHAMPION</span>
          </div>
        </div>
        <div className="station-card">
          <div className="station-kicker">PUBLIC ACCESS SPORTS</div>
          <strong className="station-slogan">In Locks We Trust</strong>
          <div className="station-date" aria-label={`Season starts ${resolvedSeason.startDate}`}>SEASON START · {displayDate(resolvedSeason.startDate)}</div>
        </div>
      </header>

      <ScoreTicker />

      {active === 'hall' && <HallTheme />}
      <main>{children}</main>

      <nav className="bottom-nav">
        <Link className={active === 'picks' ? 'active' : ''} href="/">PICKS</Link>
        <StandingsNavLink active={active === 'standings'} />
        <Link className={active === 'season' ? 'active' : ''} href="/season">SEASON</Link>
        <HallNavLink active={active === 'hall'} />
      </nav>
      <div className="footer-signoff">
        <span>CHANNEL 8 · PUBLIC ACCESS SPORTS · {resolvedSeason.status}</span>
        <span className="audio-credit">“THE GAMES” BY ERIC MATYAS · SOUNDIMAGE.ORG</span>
        <Link className="desktop-commissioner-link" href="/admin">COMMISSIONER LOGIN</Link>
        <Link className="mobile-commissioner-link" href="/admin">COMMISSIONER</Link>
      </div>
      {resolvedRecap && <BroadcastRecap recap={resolvedRecap} />}
    </div>
  );
}

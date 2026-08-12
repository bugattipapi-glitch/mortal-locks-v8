import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { season } from '../lib/data';
import type { RuntimeSeason } from '../lib/runtime-data';
import { ScoreTicker } from './ScoreTicker';
import { StandingsNavLink } from './StandingsNavLink';
import { BroadcastLauncher } from './BroadcastLauncher';
import { BroadcastRecap } from './BroadcastRecap';
import type { BroadcastRecap as BroadcastRecapData } from '../lib/broadcast';
import { HallTheme } from './HallTheme';

type ActiveSection = 'picks' | 'standings' | 'season' | 'hall' | 'admin';

function displayDate(value: string) {
  const [year, month, day] = value.split('-');
  return month && day && year ? `${month}/${day}/${year.slice(-2)}` : '08/29/26';
}

export function SiteShell({
  children,
  active = 'picks',
  seasonInfo = season,
  recap,
}: {
  children: ReactNode;
  active?: ActiveSection;
  seasonInfo?: Pick<RuntimeSeason, 'currentWeek' | 'status' | 'startDate'>;
  recap?: BroadcastRecapData;
}) {
  const week = String(seasonInfo.currentWeek).padStart(2, '0');
  return (
    <div className="site-shell">
      <header className="broadcast-header">
        {recap ? <BroadcastLauncher /> : <div className="tv-window"><div className="on-air"><span /> ON AIR</div><div className="tv-copy">ML8-TV<br/><b>CHANNEL 8</b></div><div className="signal-bug" aria-hidden="true">UHF · 08</div><div className="scanlines" /></div>}
        <div className="brand-wrap">
          <div className="brand-signal brand-signal-left" aria-hidden="true">
            <span>WEEK</span>
            <b>{week}</b>
            <small>{seasonInfo.status}</small>
          </div>
          <div className="brand-logo">
            <Image src="/assets/mortal-locks-logo.png" alt="Mortal Locks 8 The Ocho" fill priority sizes="(max-width: 700px) 72vw, (max-width: 1000px) 54vw, 520px" />
          </div>
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
          <div className="station-date" aria-label={`Season starts ${seasonInfo.startDate}`}>SEASON START · {displayDate(seasonInfo.startDate)}</div>
        </div>
      </header>

      <ScoreTicker />

      <main>{children}</main>
      {active === 'hall' && <HallTheme />}

      <nav className="bottom-nav">
        <Link className={active === 'picks' ? 'active' : ''} href="/">PICKS</Link>
        <StandingsNavLink active={active === 'standings'} />
        <Link className={active === 'season' ? 'active' : ''} href="/season">SEASON</Link>
        <Link className={active === 'hall' ? 'active' : ''} href="/hall-of-fame">HALL OF FAME</Link>
      </nav>
      <div className="footer-signoff">
        <span>CHANNEL 8 · PUBLIC ACCESS SPORTS · {seasonInfo.status}</span>
        <Link href="/admin">COMMISSIONER LOGIN</Link>
      </div>
      {recap && <BroadcastRecap recap={recap} />}
    </div>
  );
}

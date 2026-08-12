import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { season } from '../lib/data';
import { ScoreTicker } from './ScoreTicker';

export function SiteShell({ children, active = 'picks' }: { children: ReactNode; active?: 'picks' | 'standings' | 'season' | 'archives' | 'admin' }) {
  return (
    <div className="site-shell">
      <header className="broadcast-header">
        <div className="tv-window">
          <div className="on-air"><span /> ON AIR</div>
          <div className="tv-copy">ML8-TV<br/><b>CHANNEL 8</b></div>
          <div className="signal-bug" aria-hidden="true">UHF · 08</div>
          <div className="scanlines" />
        </div>
        <div className="brand-wrap">
          <div className="brand-signal brand-signal-left" aria-hidden="true">
            <span>WEEK</span>
            <b>01</b>
            <small>PRESEASON</small>
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
          <div className="station-date" aria-label="Season starts August 29, 2026">SEASON START · 08/29/26</div>
        </div>
      </header>

      <ScoreTicker />

      <main>{children}</main>

      <nav className="bottom-nav">
        <Link className={active === 'picks' ? 'active' : ''} href="/">PICKS</Link>
        <a href="/#standings" className={active === 'standings' ? 'active' : ''}>STANDINGS</a>
        <Link className={active === 'season' ? 'active' : ''} href="/season">SEASON</Link>
        <Link className={active === 'archives' ? 'active' : ''} href="/archives">ARCHIVES</Link>
      </nav>
      <div className="footer-signoff">
        <span>CHANNEL 8 · PUBLIC ACCESS SPORTS · {season.status}</span>
        <Link href="/admin">COMMISSIONER LOGIN</Link>
      </div>
    </div>
  );
}

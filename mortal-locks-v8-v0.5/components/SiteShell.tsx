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
          <div className="scanlines" />
        </div>
        <div className="brand-wrap">
          <Image src="/assets/mortal-locks-logo.png" alt="Mortal Locks 8 The Ocho" fill priority sizes="(max-width: 700px) 64vw, 480px" />
        </div>
        <div className="station-card">
          <div className="station-kicker">PUBLIC ACCESS SPORTS</div>
          <strong>WE NEVER LIE.</strong>
          <strong>WE JUST PICK.</strong>
          <div className="station-date">SEASON START · 08/29/26</div>
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

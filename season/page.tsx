'use client';

import { useMemo, useState } from 'react';
import { SiteShell } from '@/components/SiteShell';
import { StatusPill } from '@/components/StatusPill';
import { demoPicks, players } from '@/lib/data';

const weeks = Array.from({ length: 18 }, (_, i) => i + 1);

export default function SeasonPage() {
  const [mode, setMode] = useState<'week' | 'player'>('week');
  const [week, setWeek] = useState(1);
  const [player, setPlayer] = useState('AJ');
  const playerPick = useMemo(() => demoPicks.find((p) => p.player === player), [player]);
  const weekRows = week === 1 ? demoPicks : [];

  return (
    <SiteShell active="season">
      <section className="panel season-panel">
        <div className="panel-title red-title"><span>SEASON PICKS</span><small>MORTAL LOCKS VIII · THE OCHO</small></div>
        <div className="mode-tabs">
          <button className={mode === 'week' ? 'selected' : ''} onClick={() => setMode('week')}>BY WEEK</button>
          <button className={mode === 'player' ? 'selected' : ''} onClick={() => setMode('player')}>BY PLAYER</button>
        </div>

        {mode === 'week' ? (
          <>
            <div className="week-strip">
              {weeks.map((w) => <button key={w} className={w === week ? 'selected' : ''} onClick={() => setWeek(w)}>W{w}</button>)}
            </div>
            <div className="archive-note">Week {week} · This page becomes the permanent weekly record as picks are entered.</div>
            {weekRows.length ? (
              <div className="season-cards">
                {weekRows.map((row) => (
                  <article className="season-pick-card" key={row.player}>
                    <div className="season-player"><span className="avatar">{row.player.slice(0,2).toUpperCase()}</span><strong>{row.player}</strong></div>
                    {row.picks.map((pick, index) => (
                      <div key={`${row.player}-${index}`}><small>PICK {index + 1} · {pick.sport}</small><b>{pick.bet}</b><StatusPill result={pick.result}/><em>{pick.game}</em></div>
                    ))}
                    {row.note && <div className="season-note">{row.note}</div>}
                  </article>
                ))}
              </div>
            ) : <div className="empty-broadcast"><b>NO TAPE FOUND</b><span>No picks have been entered for Week {week} yet.</span></div>}
          </>
        ) : (
          <>
            <div className="player-strip">
              {players.map((p) => <button key={p.name} className={p.name === player ? 'selected' : ''} onClick={() => setPlayer(p.name)}>{p.name}</button>)}
            </div>
            <div className="player-profile">
              <div className="profile-head"><span className="avatar xl">{player.slice(0,2).toUpperCase()}</span><div><small>PLAYER FILE</small><h2>{player}</h2><p>Every week stays visible here throughout the season.</p></div></div>
              <div className="player-week-list">
                {weeks.map((w) => (
                  <article key={w} className={w > 1 ? 'future-week' : ''}>
                    <span className="week-badge">W{w}</span>
                    <div><small>PICK 1</small><b>{w === 1 && playerPick ? playerPick.picks[0].bet : '—'}</b></div>
                    <div><small>PICK 2</small><b>{w === 1 && playerPick ? playerPick.picks[1].bet : '—'}</b></div>
                    <span className="week-record">{w === 1 && playerPick ? 'OPEN' : '—'}</span>
                  </article>
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </SiteShell>
  );
}

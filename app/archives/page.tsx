'use client';

import { useMemo, useState } from 'react';
import { SiteShell } from '@/components/SiteShell';
import { historicalSeasons, historicalSeasonNumbers, lifetimeRecords } from '@/lib/history';

function pct(n: number) {
  return n.toFixed(3).replace(/^0/, '');
}

function pushNeutralPct(wins: number, losses: number) {
  return wins + losses ? wins / (wins + losses) : 0;
}

export default function ArchivesPage() {
  const [seasonNumber, setSeasonNumber] = useState<number>(7);
  const [week, setWeek] = useState(1);
  const [player, setPlayer] = useState<string>('AJ');
  const [view, setView] = useState<'week' | 'player' | 'alltime'>('week');
  const season = historicalSeasons[seasonNumber];

  const weekPicks = useMemo(() => season.picks.filter((p) => p.week === week), [season, week]);
  const availablePlayer = season.roster.includes(player) ? player : season.roster[0];
  const playerPicks = useMemo(() => season.picks.filter((p) => p.player === availablePlayer), [season, availablePlayer]);

  return (
    <SiteShell active="archives">
      <section className="panel archive-panel">
        <div className="panel-title purple-title"><span>THE TAPE ARCHIVES</span><small>SEASONS IV–VII IMPORTED</small></div>
        <div className="archive-controls">
          <div className="season-selector">
            {historicalSeasonNumbers.map((number) => (
              <button key={number} className={seasonNumber === number ? 'selected' : ''} onClick={() => { setSeasonNumber(number); setWeek(1); setPlayer(historicalSeasons[number].roster[0]); }}>ML {number}</button>
            ))}
          </div>
          <div className="mode-tabs compact-tabs">
            <button className={view === 'week' ? 'selected' : ''} onClick={() => setView('week')}>BY WEEK</button>
            <button className={view === 'player' ? 'selected' : ''} onClick={() => setView('player')}>BY PLAYER</button>
            <button className={view === 'alltime' ? 'selected' : ''} onClick={() => setView('alltime')}>ALL-TIME</button>
          </div>
        </div>

        <div className="archive-season-head">
          <div><small>MORTAL LOCKS {season.number}</small><h1>{season.title}</h1></div>
          <div className="archive-roster-count">{season.roster.length} PLAYERS · {season.picks.length} PICKS</div>
        </div>

        {view === 'week' && (
          <>
            <div className="week-strip">
              {Array.from({ length: 18 }, (_, i) => i + 1).map((w) => <button key={w} className={week === w ? 'selected' : ''} onClick={() => setWeek(w)}>W{w}</button>)}
            </div>
            <div className="historical-week-grid">
              {season.roster.map((name) => {
                const picks = weekPicks.filter((p) => p.player === name);
                return (
                  <article className="history-player-row" key={name}>
                    <div className="history-name"><span className="avatar">{name.slice(0,2).toUpperCase()}</span><b>{name}</b></div>
                    {[0,1].map((i) => {
                      const pick = picks[i];
                      return <div className="history-pick" key={i}>{pick ? <><small>{pick.game}</small><b>{pick.bet}</b><span className={`history-result result-${pick.result.toLowerCase()}`}>{pick.result}</span></> : <span className="history-missing">—</span>}</div>;
                    })}
                  </article>
                );
              })}
            </div>
          </>
        )}

        {view === 'player' && (
          <>
            <div className="player-strip">
              {season.roster.map((name) => <button key={name} className={availablePlayer === name ? 'selected' : ''} onClick={() => setPlayer(name)}>{name}</button>)}
            </div>
            <div className="historical-player-summary">
              <div><span className="avatar xl">{availablePlayer.slice(0,2).toUpperCase()}</span><div><small>MORTAL LOCKS {season.number}</small><h2>{availablePlayer}</h2></div></div>
              {season.records[availablePlayer] && <strong>{season.records[availablePlayer].wins}-{season.records[availablePlayer].losses}-{season.records[availablePlayer].pushes} · {pct(pushNeutralPct(season.records[availablePlayer].wins, season.records[availablePlayer].losses))}</strong>}
            </div>
            <div className="player-week-list historical-player-weeks">
              {Array.from({ length: 18 }, (_, i) => i + 1).map((w) => {
                const picks = playerPicks.filter((p) => p.week === w);
                return (
                  <article key={w}>
                    <span className="week-badge">W{w}</span>
                    <div><small>PICK 1</small><b>{picks[0]?.bet || '—'}</b></div>
                    <div><small>PICK 2</small><b>{picks[1]?.bet || '—'}</b></div>
                    <span className="week-record">{picks.map((p) => p.result).join(' / ') || '—'}</span>
                  </article>
                );
              })}
            </div>
          </>
        )}

        {view === 'alltime' && (
          <div className="alltime-board">
            <div className="archive-note">Seasons IV–VII are imported. Win percentage now uses the Mortal Locks VIII rule: wins ÷ (wins + losses), with pushes excluded from the denominator.</div>
            {(Object.entries(lifetimeRecords) as Array<[string, (typeof lifetimeRecords)[string]]>).sort((a,b) => b[1].wins - a[1].wins).map(([name, record], index) => (
              <div className="alltime-row" key={name}>
                <span>{index + 1}</span><span className="avatar tiny">{name.slice(0,2).toUpperCase()}</span><b>{name}</b>
                <span>{record.wins}-{record.losses}-{record.pushes}</span><span>{pct(pushNeutralPct(record.wins, record.losses))}</span><small>ML {record.seasons.join(', ')}</small>
              </div>
            ))}
          </div>
        )}
      </section>
    </SiteShell>
  );
}

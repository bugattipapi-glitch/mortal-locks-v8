'use client';

import { useMemo, useState } from 'react';
import { historicalSeasons, historicalSeasonNumbers } from '../lib/history';
import { PlayerAvatar } from './PlayerAvatar';

function pushNeutralPct(wins: number, losses: number) {
  return wins + losses ? wins / (wins + losses) : 0;
}

function displayPct(value: number) {
  return value.toFixed(3).replace(/^0/, '');
}

export function TapeVault() {
  const [seasonNumber, setSeasonNumber] = useState<number>(7);
  const [week, setWeek] = useState(1);
  const [player, setPlayer] = useState<string>('AJ');
  const [view, setView] = useState<'week' | 'player'>('week');
  const season = historicalSeasons[seasonNumber];
  const weekPicks = useMemo(() => season.picks.filter((pick) => pick.week === week), [season, week]);
  const availablePlayer = season.roster.includes(player) ? player : season.roster[0];
  const playerPicks = useMemo(() => season.picks.filter((pick) => pick.player === availablePlayer), [season, availablePlayer]);

  return (
    <>
      <div className="archive-controls">
        <div className="season-selector">
          {historicalSeasonNumbers.map((number) => (
            <button key={number} className={seasonNumber === number ? 'selected' : ''} onClick={() => {
              setSeasonNumber(number);
              setWeek(1);
              setPlayer(historicalSeasons[number].roster[0]);
            }}>ML {number}</button>
          ))}
        </div>
        <div className={`mode-tabs compact-tabs ${season.tapeDamaged ? 'tape-controls-disabled' : ''}`}>
          <button className={view === 'week' ? 'selected' : ''} onClick={() => setView('week')}>BY WEEK</button>
          <button className={view === 'player' ? 'selected' : ''} onClick={() => setView('player')}>BY PLAYER</button>
        </div>
      </div>

      <div className="archive-season-head">
        <div><small>MORTAL LOCKS {season.number}</small><h1>{season.title}</h1></div>
        <div className="archive-roster-count">{season.roster.length} PLAYERS · {season.tapeDamaged ? 'FINAL RECORDS ONLY' : `${season.picks.length} PICKS`}</div>
      </div>

      {season.tapeDamaged ? (
        <section className="damaged-tape-panel">
          <div className="damaged-tape-icon" aria-hidden="true">VHS</div>
          <small>ARCHIVE STATUS</small>
          <h2>VAULT TAPE DAMAGED</h2>
          <p>The week-by-week footage did not survive. The official final records remain intact.</p>
          <div className="damaged-record-grid">
            {season.roster.map((name) => {
              const record = season.records[name];
              return (
                <article key={name}>
                  <PlayerAvatar name={name} />
                  <b>{name}</b>
                  <strong>{record.wins}-{record.losses}-{record.pushes}</strong>
                  <span>{displayPct(pushNeutralPct(record.wins, record.losses))}</span>
                </article>
              );
            })}
          </div>
        </section>
      ) : view === 'week' ? (
        <>
          <div className="week-strip">
            {Array.from({ length: 18 }, (_, index) => index + 1).map((number) => (
              <button key={number} className={week === number ? 'selected' : ''} onClick={() => setWeek(number)}>W{number}</button>
            ))}
          </div>
          <div className="historical-week-grid">
            {season.roster.map((name) => {
              const picks = weekPicks.filter((pick) => pick.player === name).sort((a, b) => a.slot - b.slot);
              return (
                <article className="history-player-row" key={name}>
                  <div className="history-name"><PlayerAvatar name={name} /><b>{name}</b></div>
                  {[0, 1].map((index) => {
                    const pick = picks[index];
                    return (
                      <div className="history-pick" key={index}>
                        {pick ? <><small>{pick.game}</small><b>{pick.bet}</b><span className={`history-result result-${pick.result.toLowerCase()}`}>{pick.result}</span></> : <span className="history-missing">—</span>}
                      </div>
                    );
                  })}
                </article>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="player-strip">
            {season.roster.map((name) => <button key={name} className={availablePlayer === name ? 'selected' : ''} onClick={() => setPlayer(name)}>{name}</button>)}
          </div>
          <div className="historical-player-summary">
            <div><PlayerAvatar name={availablePlayer} size="xl" /><div><small>MORTAL LOCKS {season.number}</small><h2>{availablePlayer}</h2></div></div>
            {season.records[availablePlayer] && (
              <strong>{season.records[availablePlayer].wins}-{season.records[availablePlayer].losses}-{season.records[availablePlayer].pushes} · {displayPct(pushNeutralPct(season.records[availablePlayer].wins, season.records[availablePlayer].losses))}</strong>
            )}
          </div>
          <div className="player-week-list historical-player-weeks">
            {Array.from({ length: 18 }, (_, index) => index + 1).map((number) => {
              const picks = playerPicks.filter((pick) => pick.week === number).sort((a, b) => a.slot - b.slot);
              return (
                <article key={number}>
                  <span className="week-badge">W{number}</span>
                  <div><small>PICK 1</small><b>{picks[0]?.bet || '—'}</b></div>
                  <div><small>PICK 2</small><b>{picks[1]?.bet || '—'}</b></div>
                  <span className="week-record">{picks.map((pick) => pick.result).join(' / ') || '—'}</span>
                </article>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

'use client';

import { useMemo, useState } from 'react';
import type { RuntimeSnapshot } from '../lib/runtime-data';
import { StatusPill } from './StatusPill';
import { PlayerAvatar } from './PlayerAvatar';
import { pickDisplay } from '../lib/pick-display';

const weeks = Array.from({ length: 18 }, (_, index) => index + 1);

export function SeasonExplorer({ snapshot }: { snapshot: RuntimeSnapshot }) {
  const players = snapshot.players.filter((player) => player.active);
  const [mode, setMode] = useState<'week' | 'player'>('week');
  const [week, setWeek] = useState(snapshot.season.currentWeek);
  const [playerSlug, setPlayerSlug] = useState(players[0]?.slug ?? '');
  const selectedPlayer = players.find((player) => player.slug === playerSlug) ?? players[0];
  const playerPicks = useMemo(
    () => snapshot.picks.filter((pick) => pick.playerSlug === selectedPlayer?.slug),
    [selectedPlayer?.slug, snapshot.picks],
  );

  return (
    <section className="panel season-panel">
      <div className="panel-title red-title"><span>SEASON PICKS</span><small>MORTAL LOCKS {snapshot.season.number} · {snapshot.season.title}</small></div>
      <div className="mode-tabs">
        <button className={mode === 'week' ? 'selected' : ''} onClick={() => setMode('week')}>BY WEEK</button>
        <button className={mode === 'player' ? 'selected' : ''} onClick={() => setMode('player')}>BY PLAYER</button>
      </div>

      {mode === 'week' ? (
        <>
          <div className="week-strip">
            {weeks.map((number) => <button key={number} className={number === week ? 'selected' : ''} onClick={() => setWeek(number)}>W{number}</button>)}
          </div>
          <div className="archive-note">Week {week} · {snapshot.dataMode === 'database' ? 'Live commissioner record.' : 'Local preview data; production uses the live database.'}</div>
          <div className="season-cards">
            {players.map((player) => {
              const picks = snapshot.picks.filter((pick) => pick.week === week && pick.playerSlug === player.slug).sort((a, b) => a.slot - b.slot);
              return (
                <article className={`season-pick-card ${picks.length ? '' : 'empty-season-card'}`} key={player.slug}>
                  <div className="season-player"><PlayerAvatar name={player.name} /><strong>{player.name}</strong></div>
                  {[1, 2].map((slot) => {
                    const pick = picks.find((item) => item.slot === slot);
                    const display = pick ? pickDisplay(pick) : null;
                    return (
                      <div key={`${player.slug}-${slot}`}>
                        <small>PICK {slot}{pick ? ` · ${pick.sport}` : ''}</small>
                        <b>{display?.primary ?? '—'}</b>
                        <StatusPill result={pick?.result ?? 'PENDING'} />
                        <em>{display?.secondary ?? 'No pick entered'}</em>
                        {pick?.commentary && <em className="season-pick-call">BOOTH · {pick.commentary}</em>}
                      </div>
                    );
                  })}
                </article>
              );
            })}
          </div>
        </>
      ) : selectedPlayer ? (
        <>
          <div className="player-strip">
            {players.map((player) => <button key={player.slug} className={player.slug === selectedPlayer.slug ? 'selected' : ''} onClick={() => setPlayerSlug(player.slug)}>{player.name}</button>)}
          </div>
          <div className="player-profile">
            <div className="profile-head"><PlayerAvatar name={selectedPlayer.name} size="xl" /><div><small>PLAYER FILE</small><h2>{selectedPlayer.name}</h2><p>Every pick and result stays visible here throughout the season.</p></div></div>
            <div className="player-week-list">
              {weeks.map((number) => {
                const picks = playerPicks.filter((pick) => pick.week === number).sort((a, b) => a.slot - b.slot);
                const pickOne = picks.find((pick) => pick.slot === 1);
                const pickTwo = picks.find((pick) => pick.slot === 2);
                const wins = picks.filter((pick) => pick.result === 'W').length;
                const losses = picks.filter((pick) => pick.result === 'L').length;
                const pushes = picks.filter((pick) => pick.result === 'P').length;
                return (
                  <article key={number} className={picks.length ? '' : 'future-week'}>
                    <span className="week-badge">W{number}</span>
                    <div><small>PICK 1</small><b>{pickOne ? pickDisplay(pickOne).primary : '—'}</b></div>
                    <div><small>PICK 2</small><b>{pickTwo ? pickDisplay(pickTwo).primary : '—'}</b></div>
                    <span className="week-record">{picks.length ? `${wins}-${losses}${pushes ? `-${pushes}` : ''}` : '—'}</span>
                  </article>
                );
              })}
            </div>
          </div>
        </>
      ) : <div className="empty-broadcast"><b>NO ROSTER FOUND</b><span>Add a player in Commissioner Control.</span></div>}
    </section>
  );
}

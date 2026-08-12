import Link from 'next/link';
import { SiteShell } from '../components/SiteShell';
import { StatusPill } from '../components/StatusPill';
import { commentaryRules } from '../lib/data';
import { getRuntimeSnapshot, type RuntimePick } from '../lib/runtime-data';

export const dynamic = 'force-dynamic';

const featuredCalls = commentaryRules.filter(({ label }) =>
  ['SOME SPREAD', 'PUSH JOB', 'THE MIDDLE IS ALIVE'].includes(label),
);

function pickCell(pick: RuntimePick | undefined, key: string) {
  return (
    <div className={`pick-cell ${pick ? '' : 'pick-empty'}`} key={key} title={pick ? `${pick.game} · ${pick.bet}` : 'Awaiting commissioner entry'}>
      <span className="sport-tag">{pick ? `${pick.sport}${pick.period !== 'FULL' ? ` · ${pick.period}` : ''}` : 'NO SIGNAL'}</span>
      {pick?.force && <span className="force-tag">FORCE</span>}
      <b>{pick?.bet ?? 'PICK NOT ENTERED'}</b><small>{pick?.game ?? 'Awaiting commissioner'}</small>
    </div>
  );
}

export default async function HomePage() {
  const snapshot = await getRuntimeSnapshot();
  const activePlayers = snapshot.players.filter((player) => player.active);
  const weekRows = activePlayers.map((player) => ({
    player,
    picks: snapshot.picks
      .filter((pick) => pick.week === snapshot.season.currentWeek && pick.playerSlug === player.slug)
      .sort((a, b) => a.slot - b.slot),
  }));

  return (
    <SiteShell seasonInfo={snapshot.season}>
      <div className="dashboard-grid">
        <section className="panel picks-panel">
          <div className="panel-title red-title">
            <span>THIS WEEK&apos;S PICKS</span>
            <small>WEEK {snapshot.season.currentWeek} · {snapshot.dataMode === 'database' ? 'LIVE DATABASE' : 'LOCAL PREVIEW'}</small>
          </div>
          <div className="picks-table desktop-table">
            <div className="pick-row pick-head">
              <div>PLAYER</div><div>PICK 1</div><div>PICK 2</div><div>RESULTS</div><div>BOOTH CALL</div>
            </div>
            {weekRows.map(({ player, picks }) => (
              <div className="pick-row" key={player.slug}>
                <div className="player-cell"><span className="avatar">{player.avatar}</span><b>{player.name}</b></div>
                {pickCell(picks.find((pick) => pick.slot === 1), `${player.slug}-1`)}
                {pickCell(picks.find((pick) => pick.slot === 2), `${player.slug}-2`)}
                <div className="results-cell">
                  <StatusPill result={picks.find((pick) => pick.slot === 1)?.result ?? 'PENDING'} />
                  <StatusPill result={picks.find((pick) => pick.slot === 2)?.result ?? 'PENDING'} />
                </div>
                <div className="commentary-cell">{picks.find((pick) => pick.commentary)?.commentary || '—'}</div>
              </div>
            ))}
          </div>

          <div className="mobile-picks">
            {weekRows.map(({ player, picks }) => (
              <article className="mobile-pick-card" key={player.slug}>
                <div className="mobile-player">
                  <span className="avatar">{player.avatar}</span><strong>{player.name}</strong>
                  {picks.find((pick) => pick.commentary) && <em>{picks.find((pick) => pick.commentary)?.commentary}</em>}
                </div>
                {[1, 2].map((slot) => {
                  const pick = picks.find((item) => item.slot === slot);
                  return (
                    <div className="mobile-pick-line" key={`${player.slug}-${slot}`}>
                      <span>{pick?.sport ?? '—'}</span>
                      <div><b>{pick?.bet ?? 'PICK NOT ENTERED'}</b><small>{pick?.game ?? 'Awaiting commissioner'}</small></div>
                      <StatusPill result={pick?.result ?? 'PENDING'} />
                    </div>
                  );
                })}
              </article>
            ))}
          </div>
          <Link className="panel-link" href="/season">VIEW ALL 18 WEEKS →</Link>
        </section>

        <aside className="sidebar-stack">
          <section className="panel alert-panel">
            <div className="panel-title purple-title">LOCK-OFF ALERT</div>
            <div className="alert-copy">BLAINE O43 <span>VS</span> AJ U44.5</div>
            <div className="neon-note">THE MIDDLE IS ALIVE</div>
          </section>

          <section className="panel standings-panel" id="standings">
            <div className="standings-lock-bug" aria-hidden="true">STANDINGS FEED LOCKED</div>
            <div className="panel-title cyan-title">STANDINGS</div>
            <div className="standings-list">
              {snapshot.standings.map((player, index) => (
                <div className="standing-row" key={player.name}>
                  <span className="rank">{index + 1}</span>
                  <span className="avatar tiny">{player.name.slice(0, 2).toUpperCase()}</span>
                  <b>{player.name}</b>
                  <span>{player.wins}-{player.losses}{player.pushes ? `-${player.pushes}` : ''}</span>
                  <span className="pct">{player.pct.toFixed(3).replace(/^0/, '')}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="panel dead-panel">
            <div className="panel-title red-title">DEAD TEAMS</div>
            <div className="graveyard">
              <div className="grave"><span>RIP</span><b>NYJ</b><small>HOPE DIED</small></div>
              <div className="grave"><span>RIP</span><b>ATL</b><small>BLEW IT</small></div>
              <div className="grave"><span>RIP</span><b>WAS</b><small>NO COMMENT</small></div>
            </div>
          </section>

          <section className="panel booth-panel">
            <div className="panel-title cyan-title">FROM THE BOOTH</div>
            <p className="booth-explainer">Commissioner-assigned postgame callouts. When a pick earns one, it appears in that player&apos;s <b>Booth Call</b> column.</p>
            <div className="booth-calls">
              {featuredCalls.map((call) => (
                <div className="booth-call" key={call.label}><span>{call.label}</span><small>{call.detail}</small></div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </SiteShell>
  );
}

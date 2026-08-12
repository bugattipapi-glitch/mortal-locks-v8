import Link from 'next/link';
import { SiteShell } from '../components/SiteShell';
import { StatusPill } from '../components/StatusPill';
import { commentaryRules, demoPicks, demoStandings } from '../lib/data';

const featuredCalls = commentaryRules.filter(({ label }) =>
  ['SOME SPREAD', 'PUSH JOB', 'THE MIDDLE IS ALIVE'].includes(label)
);

export default function HomePage() {
  return (
    <SiteShell>
      <div className="dashboard-grid">
        <section className="panel picks-panel">
          <div className="panel-title red-title"><span>THIS WEEK'S PICKS</span><small>WEEK 1 · PREVIEW DATA</small></div>
          <div className="picks-table desktop-table">
            <div className="pick-row pick-head">
              <div>PLAYER</div><div>PICK 1</div><div>PICK 2</div><div>RESULTS</div><div>BOOTH CALL</div>
            </div>
            {demoPicks.map((row) => (
              <div className="pick-row" key={row.player}>
                <div className="player-cell"><span className="avatar">{row.player.slice(0,2).toUpperCase()}</span><b>{row.player}</b></div>
                {row.picks.map((pick, index) => (
                  <div className="pick-cell" key={`${row.player}-${index}`} title={`${pick.game} · ${pick.bet}`}>
                    <span className="sport-tag">{pick.sport}{pick.period && pick.period !== 'FULL' ? ` · ${pick.period}` : ''}</span>
                    {pick.force && <span className="force-tag">FORCE</span>}
                    <b>{pick.bet}</b><small>{pick.game}</small>
                  </div>
                ))}
                <div className="results-cell"><StatusPill result={row.picks[0].result}/><StatusPill result={row.picks[1].result}/></div>
                <div className="commentary-cell">{row.note || '—'}</div>
              </div>
            ))}
          </div>

          <div className="mobile-picks">
            {demoPicks.map((row) => (
              <article className="mobile-pick-card" key={row.player}>
                <div className="mobile-player"><span className="avatar">{row.player.slice(0,2).toUpperCase()}</span><strong>{row.player}</strong>{row.note && <em>{row.note}</em>}</div>
                {row.picks.map((pick, index) => (
                  <div className="mobile-pick-line" key={`${row.player}-${index}`}>
                    <span>{pick.sport}</span>
                    <div><b>{pick.bet}</b><small>{pick.game}</small></div>
                    <StatusPill result={pick.result}/>
                  </div>
                ))}
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

          <section className="panel" id="standings">
            <div className="panel-title cyan-title">STANDINGS</div>
            <div className="standings-list">
              {demoStandings.map((player, i) => (
                <div className="standing-row" key={player.name}>
                  <span className="rank">{i + 1}</span>
                  <span className="avatar tiny">{player.name.slice(0,2).toUpperCase()}</span>
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
                <div className="booth-call" key={call.label}>
                  <span>{call.label}</span>
                  <small>{call.detail}</small>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </SiteShell>
  );
}

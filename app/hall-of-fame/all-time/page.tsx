import { HallNav } from '../../../components/HallNav';
import { SiteShell } from '../../../components/SiteShell';
import { allTimeStandings, displayPct, mostPickedTeams } from '../../../lib/hall-of-fame';

export default function AllTimeBoardPage() {
  return (
    <SiteShell active="hall">
      <section className="panel hall-panel">
        <div className="panel-title gold-title"><span>HALL OF FAME</span><small>CAREER MODE · SEASONS IV–VII</small></div>
        <HallNav active="records" />
        <div className="hall-hero">
          <div className="pixel-trophy" aria-hidden="true"><span>★</span></div>
          <div><small>SELECT PLAYER // VIEW LEGACY</small><h1>ALL-TIME LEADERBOARD</h1></div>
        </div>
        <div className="alltime-board hall-board">
          <div className="alltime-row alltime-head"><span>RK</span><span></span><b>PLAYER</b><span>RECORD</span><span>WIN %</span><small>SEASONS</small></div>
          {allTimeStandings.map((record, index) => (
            <div className={`alltime-row ${index < 3 ? `podium podium-${index + 1}` : ''}`} key={record.name}>
              <span>{index + 1}</span><span className="avatar tiny">{record.name.slice(0, 2).toUpperCase()}</span><b>{record.name}</b>
              <span>{record.wins}-{record.losses}-{record.pushes}</span><span>{displayPct(record.pct)}</span><small>ML {record.seasons.join(', ')}</small>
            </div>
          ))}
        </div>
        <section className="team-frequency">
          <div className="subsection-heading"><span>MOST PICKED TEAM</span><small>THE CREST THEY KEPT COMING BACK TO</small></div>
          <div className="team-frequency-grid">
            {mostPickedTeams.map((row) => (
              <article key={row.name}><span className="pixel-shield">8</span><div><b>{row.name}</b><strong>{row.teams.join(' + ')}</strong><small>{row.count} PICKS</small></div></article>
            ))}
          </div>
        </section>
      </section>
    </SiteShell>
  );
}

import { HallNav } from '../../components/HallNav';
import { SiteShell } from '../../components/SiteShell';
import { accolades, archivedPickCount, champions, teamAccolades } from '../../lib/hall-of-fame';

export default function HallOfFamePage() {
  return (
    <SiteShell active="hall">
      <section className="panel hall-panel">
        <div className="panel-title gold-title"><span>THE TROPHY ROOM</span><small>UNLOCKED ACHIEVEMENTS</small></div>
        <HallNav active="trophies" />
        <div className="trophy-scene" aria-label="Pixel art trophy room">
          <div className="trophy-case">
            {champions.map((champion) => (
              <article className="champion-cup" key={champion.season}>
                <div className="cup" aria-hidden="true"><i /><b>★</b><i /></div>
                <div className="champion-plaque"><small>MORTAL LOCKS {champion.season}</small><strong>{champion.champion}</strong><span>{champion.title}</span></div>
              </article>
            ))}
          </div>
          <p className="champion-record"><b>OFFICIAL RECORD:</b> Seven seasons. Five champions. One three-time king.</p>
        </div>
        <div className="subsection-heading"><span>LEGACY ACHIEVEMENTS</span><small>{archivedPickCount.toLocaleString()} RESTORED PICKS + OFFICIAL SEASON RECORDS</small></div>
        <div className="accolade-grid">
          {accolades.map((award) => (
            <article className={`accolade-card accolade-${award.tone} ${award.title === 'IRON LOCK' ? 'iron-lock-card' : ''}`} key={award.title}>
              <span className="achievement-icon" aria-hidden="true">★</span><small>ACHIEVEMENT UNLOCKED</small><h2>{award.title}</h2><strong>{award.player}</strong><b>{award.stat}</b><p>{award.detail}</p>
            </article>
          ))}
        </div>
        <div className="subsection-heading"><span>TEAM TROPHIES</span></div>
        <div className="accolade-grid team-accolade-grid">
          {teamAccolades.map((award) => (
            <article className={`accolade-card accolade-${award.tone}`} key={award.title}>
              <span className="achievement-icon team-achievement-icon" aria-hidden="true">8</span><small>FRANCHISE FILE</small><h2>{award.title}</h2><strong>{award.player}</strong><b>{award.stat}</b><p>{award.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}

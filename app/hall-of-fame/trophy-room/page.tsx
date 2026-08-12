import { HallNav } from '../../../components/HallNav';
import { SiteShell } from '../../../components/SiteShell';
import { accolades, archivedPickCount, provisionalChampions } from '../../../lib/hall-of-fame';

export default function TrophyRoomPage() {
  return (
    <SiteShell active="hall">
      <section className="panel hall-panel trophy-room">
        <div className="panel-title gold-title"><span>THE TROPHY ROOM</span><small>UNLOCKED ACHIEVEMENTS</small></div>
        <HallNav active="trophies" />
        <div className="trophy-scene" aria-label="Pixel art trophy room">
          <div className="trophy-case">
            {provisionalChampions.map((champion) => (
              <article className="champion-cup" key={champion.season}>
                <div className="cup" aria-hidden="true"><i /><b>★</b><i /></div>
                <small>MORTAL LOCKS {champion.season}</small>
                <strong>{champion.champion}</strong>
                <span>{champion.title}</span>
              </article>
            ))}
          </div>
          <p className="provisional-record"><b>COMMISSIONER&apos;S NOTE:</b> The seven champion names are temporary placeholders until the official title history is recovered.</p>
        </div>
        <div className="subsection-heading"><span>LEGACY ACHIEVEMENTS</span><small>DERIVED FROM {archivedPickCount.toLocaleString()} ARCHIVED PICKS</small></div>
        <div className="accolade-grid">
          {accolades.map((award) => (
            <article className={`accolade-card accolade-${award.tone}`} key={award.title}>
              <span className="achievement-icon" aria-hidden="true">★</span>
              <small>ACHIEVEMENT UNLOCKED</small>
              <h2>{award.title}</h2>
              <strong>{award.player}</strong>
              <b>{award.stat}</b>
              <p>{award.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}

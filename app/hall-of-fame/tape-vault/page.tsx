import { HallNav } from '../../../components/HallNav';
import { SiteShell } from '../../../components/SiteShell';
import { TapeVault } from '../../../components/TapeVault';

export default function TapeVaultPage() {
  return (
    <SiteShell active="hall">
      <section className="panel archive-panel hall-panel">
        <div className="panel-title purple-title"><span>THE TAPE VAULT</span><small>SEASONS IV–VII · RESTORED FOOTAGE</small></div>
        <HallNav active="vault" />
        <TapeVault />
      </section>
    </SiteShell>
  );
}

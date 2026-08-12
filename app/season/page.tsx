import { SeasonExplorer } from '../../components/SeasonExplorer';
import { SiteShell } from '../../components/SiteShell';
import { getRuntimeSnapshot } from '../../lib/runtime-data';

export const dynamic = 'force-dynamic';

export default async function SeasonPage() {
  const snapshot = await getRuntimeSnapshot();
  return <SiteShell active="season" seasonInfo={snapshot.season}><SeasonExplorer snapshot={snapshot} /></SiteShell>;
}

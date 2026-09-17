import { SeasonExplorer } from '../../components/SeasonExplorer';
import { SiteShell } from '../../components/SiteShell';
import { buildBroadcastRecap } from '../../lib/broadcast';
import { getPublicRuntimeSnapshot } from '../../lib/runtime-cache';

export const revalidate = 21_600;

export default async function SeasonPage() {
  const snapshot = await getPublicRuntimeSnapshot();
  return <SiteShell active="season" seasonInfo={snapshot.season} recap={buildBroadcastRecap(snapshot)}><SeasonExplorer snapshot={snapshot} /></SiteShell>;
}

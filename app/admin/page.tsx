import { AdminDashboard } from '../../components/AdminDashboard';
import { SiteShell } from '../../components/SiteShell';
import { requireCommissioner } from '../../lib/auth';
import { getRuntimeSnapshot } from '../../lib/runtime-data';

export const dynamic = 'force-dynamic';

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ notice?: string }> }) {
  await requireCommissioner();
  const [snapshot, query] = await Promise.all([getRuntimeSnapshot(), searchParams]);
  return <SiteShell active="admin" seasonInfo={snapshot.season}><AdminDashboard snapshot={snapshot} notice={query.notice} /></SiteShell>;
}

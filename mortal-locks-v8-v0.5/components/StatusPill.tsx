import type { Result } from '../lib/data';

export function StatusPill({ result }: { result: Result }) {
  const labels: Record<Result, string> = { W: 'WIN', L: 'LOSS', P: 'PUSH', PENDING: 'PENDING', LIVE: 'LIVE' };
  return <span className={`status-pill status-${result.toLowerCase()}`}>{labels[result]}</span>;
}

import Link from 'next/link';

export function HallNav({ active }: { active: 'records' | 'trophies' | 'vault' }) {
  return (
    <nav className="hall-nav" aria-label="Hall of Fame sections">
      <Link className={active === 'trophies' ? 'selected' : ''} href="/hall-of-fame">TROPHY ROOM</Link>
      <Link className={active === 'records' ? 'selected' : ''} href="/hall-of-fame/all-time">ALL-TIME BOARD</Link>
      <Link className={active === 'vault' ? 'selected' : ''} href="/hall-of-fame/tape-vault">TAPE VAULT</Link>
    </nav>
  );
}

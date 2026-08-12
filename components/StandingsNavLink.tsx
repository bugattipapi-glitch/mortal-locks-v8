'use client';

import Link from 'next/link';

export function StandingsNavLink({ active = false }: { active?: boolean }) {
  function spotlight(event: React.MouseEvent<HTMLAnchorElement>) {
    const standings = document.getElementById('standings');
    if (!standings) return;
    event.preventDefault();
    window.history.replaceState(null, '', '/#standings');
    standings.classList.remove('standings-locked');
    void standings.offsetWidth;
    standings.classList.add('standings-locked');
    standings.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.setTimeout(() => standings.classList.remove('standings-locked'), 1800);
  }

  return <Link href="/#standings" onClick={spotlight} className={active ? 'active' : ''}>STANDINGS</Link>;
}

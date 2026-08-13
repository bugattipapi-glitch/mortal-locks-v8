'use client';

import Link from 'next/link';

const HALL_TRACK = '/assets/audio/hall-fanfare.m4a';
let primedSoundtrack: HTMLAudioElement | null = null;
let cleanupTimer: number | null = null;

export function HallNavLink({ active }: { active: boolean }) {
  const primeHallAudio = () => {
    if (window.sessionStorage.getItem('ml8-hall-audio-muted') === '1') return;
    window.sessionStorage.setItem('ml8-hall-audio-primed', '1');
    const soundtrack = new Audio(HALL_TRACK);
    primedSoundtrack = soundtrack;
    soundtrack.volume = 0.3;
    void soundtrack.play().catch(() => undefined);
    const handoff = () => {
      soundtrack.pause();
      if (primedSoundtrack === soundtrack) primedSoundtrack = null;
      if (cleanupTimer !== null) window.clearTimeout(cleanupTimer);
      window.removeEventListener('ml8:hall-audio-mounted', handoff);
    };
    window.addEventListener('ml8:hall-audio-mounted', handoff, { once: true });
    cleanupTimer = window.setTimeout(handoff, 5000);
  };

  return <Link className={active ? 'active' : ''} href="/hall-of-fame" onClick={primeHallAudio}>HALL OF FAME</Link>;
}

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const HALL_TRACK = '/assets/audio/hall-fanfare.m4a';

export function HallTheme() {
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const audio = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(() => {
    if (!audio.current) return;
    audio.current.muted = false;
    audio.current.volume = 0.3;
    void audio.current.play()
      .then(() => { setPlaying(true); setBlocked(false); })
      .catch(() => { setPlaying(false); setBlocked(true); });
  }, []);

  const toggle = () => {
    if (!audio.current) return;
    if (playing) {
      audio.current.pause();
      setPlaying(false);
    } else {
      play();
    }
  };

  useEffect(() => {
    const soundtrack = new Audio(HALL_TRACK);
    soundtrack.loop = true;
    soundtrack.preload = 'auto';
    audio.current = soundtrack;
    const primed = window.sessionStorage.getItem('ml8-hall-audio-primed') === '1';
    window.sessionStorage.removeItem('ml8-hall-audio-primed');
    window.dispatchEvent(new Event('ml8:hall-audio-mounted'));
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    soundtrack.addEventListener('play', onPlay);
    soundtrack.addEventListener('pause', onPause);
    if (primed) {
      soundtrack.volume = 0.3;
      void soundtrack.play()
        .then(() => { setPlaying(true); setBlocked(false); })
        .catch(() => { setPlaying(false); setBlocked(true); });
    } else {
      play();
    }
    return () => {
      soundtrack.pause();
      soundtrack.removeEventListener('play', onPlay);
      soundtrack.removeEventListener('pause', onPause);
    };
  }, [play]);

  return <button className="hall-theme-button" onClick={toggle}>{playing ? '■ HALL FANFARE ON' : blocked ? '▶ TAP FOR HALL FANFARE' : '▶ PLAY HALL FANFARE'}</button>;
}

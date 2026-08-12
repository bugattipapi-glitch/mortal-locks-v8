'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { BroadcastRecap as BroadcastRecapData } from '../lib/broadcast';

const BOOTH_TRACK = '/assets/audio/booth-sports-loop.m4a';
const BLIPS = ['/assets/audio/dialogue-blip-a.ogg', '/assets/audio/dialogue-blip-b.ogg'] as const;
const ADVANCE_SOUND = '/assets/audio/dialogue-advance.ogg';

function resetMedia(media: HTMLAudioElement | null) {
  if (!media) return;
  media.pause();
  media.currentTime = 0;
}

export function BroadcastRecap({ recap }: { recap: BroadcastRecapData }) {
  const [open, setOpen] = useState(false);
  const [line, setLine] = useState(0);
  const [characters, setCharacters] = useState(0);
  const [muted, setMuted] = useState(false);
  const [frame, setFrame] = useState(0);
  const [gesture, setGesture] = useState(false);
  const [soundStarted, setSoundStarted] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const music = useRef<HTMLAudioElement | null>(null);
  const blips = useRef<HTMLAudioElement[]>([]);
  const blipCursor = useRef(0);
  const advanceSound = useRef<HTMLAudioElement | null>(null);

  const startAudio = useCallback(() => {
    if (!music.current) return false;
    setMuted(false);
    setSoundStarted(true);
    music.current.muted = false;
    music.current.volume = 0.24;
    void music.current.play().catch(() => setSoundStarted(false));
    return true;
  }, []);

  const stopAudio = useCallback(() => {
    resetMedia(music.current);
    setSoundStarted(false);
  }, []);

  const closeBroadcast = useCallback(() => {
    stopAudio();
    setOpen(false);
  }, [stopAudio]);

  const launch = useCallback((withAudio = true) => {
    setOpen(true);
    setLine(0);
    setCharacters(0);
    if (withAudio && !startAudio()) setSoundStarted(true);
  }, [startAudio]);

  const playDialogueBlip = useCallback(() => {
    if (!soundStarted || muted || !blips.current.length) return;
    const sound = blips.current[blipCursor.current % blips.current.length];
    blipCursor.current += 1;
    sound.currentTime = 0;
    sound.volume = 0.38;
    sound.playbackRate = 0.88 + Math.random() * 0.25;
    void sound.play().catch(() => undefined);
  }, [muted, soundStarted]);

  useEffect(() => {
    music.current = new Audio(BOOTH_TRACK);
    music.current.loop = true;
    music.current.preload = 'auto';
    blips.current = BLIPS.map((src) => {
      const sound = new Audio(src);
      sound.preload = 'auto';
      return sound;
    });
    advanceSound.current = new Audio(ADVANCE_SOUND);
    advanceSound.current.preload = 'auto';
    setAudioReady(true);
    return () => {
      resetMedia(music.current);
      blips.current.forEach(resetMedia);
      resetMedia(advanceSound.current);
    };
  }, []);

  useEffect(() => {
    if (open && soundStarted && audioReady && music.current?.paused) startAudio();
  }, [audioReady, open, soundStarted, startAudio]);

  useEffect(() => {
    const replay = () => launch(true);
    window.addEventListener('ml8:recap', replay);
    const seen = window.localStorage.getItem('ml8-last-recap');
    if (seen !== recap.id) {
      const timer = window.setTimeout(() => launch(false), 850);
      window.localStorage.setItem('ml8-last-recap', recap.id);
      return () => { window.clearTimeout(timer); window.removeEventListener('ml8:recap', replay); };
    }
    return () => window.removeEventListener('ml8:recap', replay);
  }, [launch, recap.id]);

  useEffect(() => {
    if (!open) return;
    const message = recap.lines[line] ?? '';
    if (characters >= message.length) return;
    const character = message[characters] ?? '';
    const timer = window.setTimeout(() => {
      setCharacters((count) => count + 1);
      setFrame((value) => value ? 0 : 1);
      if (character.trim() && characters % 2 === 0) playDialogueBlip();
    }, /[.,!?]/.test(character) ? 240 : 72);
    return () => window.clearTimeout(timer);
  }, [characters, line, open, playDialogueBlip, recap.lines]);

  useEffect(() => {
    if (!open) return;
    const flicker = window.setInterval(() => {
      setGesture(true);
      window.setTimeout(() => setGesture(false), 520);
    }, 4200 + Math.random() * 1500);
    return () => window.clearInterval(flicker);
  }, [open]);

  if (!open) return null;
  const current = recap.lines[line] ?? '';
  const lineTyped = characters >= current.length;
  const finished = line === recap.lines.length - 1 && lineTyped;

  const advance = () => {
    if (!lineTyped) {
      setCharacters(current.length);
      return;
    }
    if (line < recap.lines.length - 1) {
      setLine((value) => value + 1);
      setCharacters(0);
      if (soundStarted && !muted && advanceSound.current) {
        advanceSound.current.currentTime = 0;
        advanceSound.current.volume = 0.32;
        void advanceSound.current.play().catch(() => undefined);
      }
    }
  };

  const toggleSound = () => {
    if (soundStarted && !muted) {
      setMuted(true);
      if (music.current) music.current.muted = true;
    } else {
      startAudio();
    }
  };

  return (
    <div className="recap-overlay" role="dialog" aria-modal="true" aria-label="This Week in Mortal Locks">
      <button className="recap-backdrop" aria-label="Close weekly recap" onClick={closeBroadcast} />
      <section className="recap-console">
        <button className="recap-close" type="button" aria-label="Close weekly recap" onClick={closeBroadcast}>×</button>
        <div className="recap-toolbar"><span>{recap.eyebrow}</span><button onClick={toggleSound}>{soundStarted && !muted ? '♪ SOUND ON' : 'SOUND OFF'}</button></div>
        <button className={`recap-screen recap-frame-${frame} ${gesture ? 'recap-gesture' : ''}`} type="button" aria-label={finished ? 'Recap complete' : lineTyped ? 'Continue recap' : 'Show the rest of this line'} onClick={advance}>
          <Image className="recap-frame recap-frame-a" src="/assets/booth-recap-a.jpg" alt="Pixel-art Mortal Locks announcer in the booth" fill priority sizes="(max-width: 820px) 96vw, 940px" />
          <Image className="recap-frame recap-frame-b" src="/assets/booth-recap-b.jpg" alt="" fill priority sizes="(max-width: 820px) 96vw, 940px" aria-hidden="true" />
          <Image className="recap-frame recap-frame-gesture" src="/assets/booth-recap-gesture.jpg" alt="" fill priority sizes="(max-width: 820px) 96vw, 940px" aria-hidden="true" />
          <span className="recap-copy"><span>{current.slice(0, characters)}</span><i aria-hidden="true" /></span>
          {lineTyped && !finished ? <span className="recap-continue">CLICK / TAP TO CONTINUE ▶</span> : null}
          <span className="recap-scanlines" aria-hidden="true" />
        </button>
        <div className="recap-controls">
          <span>LINE {line + 1}/{recap.lines.length}</span>
          <span className="recap-progress">{recap.lines.map((_, index) => <i className={index <= line ? 'active' : ''} key={index} />)}</span>
          {!soundStarted || muted ? <button onClick={() => startAudio()}>TAP FOR SOUND</button> : null}
          {finished ? <button onClick={closeBroadcast}>BACK TO THE BOARD →</button> : null}
        </div>
      </section>
    </div>
  );
}

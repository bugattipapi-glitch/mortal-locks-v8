'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { BroadcastRecap as BroadcastRecapData } from '../lib/broadcast';

function tone(context: AudioContext, frequency: number, start: number, duration: number, volume: number, type: OscillatorType = 'square') {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration);
}

function startTheme(context: AudioContext) {
  const melody = [196, 247, 294, 392, 330, 294, 247, 392];
  const started = context.currentTime + 0.03;
  melody.forEach((frequency, index) => {
    tone(context, frequency, started + index * 0.19, 0.16, 0.025, 'square');
    if (index % 2 === 0) tone(context, frequency / 2, started + index * 0.19, 0.3, 0.018, 'triangle');
  });
}

function scheduleBroadcastBed(context: AudioContext) {
  const bass = [98, 98, 123.47, 146.83, 98, 130.81, 146.83, 123.47];
  const started = context.currentTime + 0.03;
  bass.forEach((frequency, index) => {
    tone(context, frequency, started + index * 0.24, 0.19, 0.006, 'triangle');
    if (index % 2 === 0) tone(context, frequency * 2, started + index * 0.24, 0.08, 0.0035, 'square');
  });
}

function chatter(context: AudioContext) {
  const now = context.currentTime;
  tone(context, 105 + Math.random() * 45, now, 0.045, 0.012, 'square');
  tone(context, 205 + Math.random() * 80, now + 0.018, 0.035, 0.008, 'triangle');
}

export function BroadcastRecap({ recap }: { recap: BroadcastRecapData }) {
  const [open, setOpen] = useState(false);
  const [line, setLine] = useState(0);
  const [characters, setCharacters] = useState(0);
  const [muted, setMuted] = useState(false);
  const [frame, setFrame] = useState(0);
  const [gesture, setGesture] = useState(false);
  const [soundStarted, setSoundStarted] = useState(false);
  const audio = useRef<AudioContext | null>(null);
  const musicTimer = useRef<number | null>(null);

  const ensureAudio = useCallback(() => {
    audio.current ??= new AudioContext();
    void audio.current.resume();
    return audio.current;
  }, []);

  const stopMusic = useCallback(() => {
    if (musicTimer.current !== null) window.clearInterval(musicTimer.current);
    musicTimer.current = null;
  }, []);

  const startAudio = useCallback(() => {
    const context = ensureAudio();
    stopMusic();
    setMuted(false);
    setSoundStarted(true);
    startTheme(context);
    scheduleBroadcastBed(context);
    musicTimer.current = window.setInterval(() => scheduleBroadcastBed(context), 1920);
  }, [ensureAudio, stopMusic]);

  const closeBroadcast = useCallback(() => {
    stopMusic();
    setOpen(false);
  }, [stopMusic]);

  const launch = useCallback((withAudio = true) => {
    setOpen(true);
    setLine(0);
    setCharacters(0);
    setSoundStarted(withAudio);
    if (withAudio) startAudio();
  }, [startAudio]);

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
    if (characters < message.length) {
      const timer = window.setTimeout(() => {
        setCharacters((count) => count + 1);
        setFrame((value) => value ? 0 : 1);
        if (characters % 2 === 0 && audio.current && soundStarted && !muted) chatter(audio.current);
      }, /[.,!]/.test(message[characters] ?? '') ? 115 : 34);
      return () => window.clearTimeout(timer);
    }
    if (line < recap.lines.length - 1) {
      const timer = window.setTimeout(() => { setLine((value) => value + 1); setCharacters(0); }, 1250);
      return () => window.clearTimeout(timer);
    }
  }, [characters, line, muted, open, recap.lines, soundStarted]);

  useEffect(() => {
    if (!open) return;
    const flicker = window.setInterval(() => {
      setGesture(true);
      window.setTimeout(() => setGesture(false), 520);
    }, 4200 + Math.random() * 1500);
    return () => window.clearInterval(flicker);
  }, [open]);

  useEffect(() => () => { stopMusic(); void audio.current?.close(); }, [stopMusic]);

  if (!open) return null;
  const current = recap.lines[line] ?? '';
  const finished = line === recap.lines.length - 1 && characters >= current.length;

  return (
    <div className="recap-overlay" role="dialog" aria-modal="true" aria-label="This Week in Mortal Locks">
      <button className="recap-backdrop" aria-label="Close weekly recap" onClick={closeBroadcast} />
      <section className="recap-console">
        <div className="recap-toolbar"><span>{recap.eyebrow}</span><div><button onClick={() => { if (soundStarted && !muted) { stopMusic(); setMuted(true); void audio.current?.suspend(); } else { startAudio(); } }}>{soundStarted && !muted ? 'SOUND ON' : 'SOUND OFF'}</button><button onClick={closeBroadcast}>END BROADCAST ×</button></div></div>
        <div className={`recap-screen recap-frame-${frame} ${gesture ? 'recap-gesture' : ''}`}>
          <Image className="recap-frame recap-frame-a" src="/assets/booth-recap-a.jpg" alt="Pixel-art Mortal Locks announcer in the booth" fill priority sizes="(max-width: 820px) 96vw, 940px" />
          <Image className="recap-frame recap-frame-b" src="/assets/booth-recap-b.jpg" alt="" fill priority sizes="(max-width: 820px) 96vw, 940px" aria-hidden="true" />
          <Image className="recap-frame recap-frame-gesture" src="/assets/booth-recap-gesture.jpg" alt="" fill priority sizes="(max-width: 820px) 96vw, 940px" aria-hidden="true" />
          <div className="recap-copy"><span>{current.slice(0, characters)}</span><i aria-hidden="true" /></div>
          <div className="recap-scanlines" aria-hidden="true" />
        </div>
        <div className="recap-controls">
          <span>LINE {line + 1}/{recap.lines.length}</span>
          <div className="recap-progress">{recap.lines.map((_, index) => <i className={index <= line ? 'active' : ''} key={index} />)}</div>
          {soundStarted && !muted ? <button onClick={() => startTheme(ensureAudio())}>♪ REPLAY STINGER</button> : <button onClick={startAudio}>TAP FOR SOUND</button>}
          {finished && <button onClick={closeBroadcast}>BACK TO THE BOARD →</button>}
        </div>
      </section>
    </div>
  );
}

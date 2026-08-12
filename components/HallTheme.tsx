'use client';

import { useEffect, useRef, useState } from 'react';

function note(context: AudioContext, frequency: number, start: number, duration: number, gainValue: number) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(gainValue, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration);
}

export function HallTheme() {
  const [playing, setPlaying] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const play = () => {
    contextRef.current ??= new AudioContext();
    const context = contextRef.current;
    void context.resume();
    const start = context.currentTime + 0.03;
    const fanfare = [261.63, 329.63, 392, 523.25, 440, 523.25, 659.25, 783.99];
    fanfare.forEach((frequency, index) => {
      note(context, frequency, start + index * 0.22, 0.2, 0.04);
      if (index % 2 === 0) note(context, frequency / 2, start + index * 0.22, 0.38, 0.026);
    });
    setPlaying(true);
    window.setTimeout(() => setPlaying(false), 2100);
  };
  useEffect(() => () => { void contextRef.current?.close(); }, []);
  return <button className="hall-theme-button" onClick={play}>{playing ? '♪ FANFARE PLAYING' : '▶ PLAY HALL FANFARE'}</button>;
}

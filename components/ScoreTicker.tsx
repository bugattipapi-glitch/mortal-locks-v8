'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { demoScores } from '../lib/data';

type Score = (typeof demoScores)[number];

export function ScoreTicker() {
  const router = useRouter();
  const [scores, setScores] = useState<Score[]>(demoScores);
  const [updatedAt, setUpdatedAt] = useState<string>('PREVIEW');
  const [mode, setMode] = useState('demo');
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/scores', { cache: 'no-store' });
      if (!response.ok) return;
      const payload = await response.json();
      if (Array.isArray(payload.scores)) setScores(payload.scores);
      if (payload.mode) setMode(payload.mode);
      if (payload.updatedAt) {
        setUpdatedAt(new Date(payload.updatedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const scoreTimer = window.setInterval(refresh, 60_000);
    const pageTimer = window.setInterval(() => router.refresh(), 5 * 60_000);
    return () => {
      window.clearInterval(scoreTimer);
      window.clearInterval(pageTimer);
    };
  }, [refresh, router]);

  return (
    <section className="score-strip" aria-label="Picked games scoreboard">
      <div className="ticker-label">
        <span>ML8 {mode === 'demo' ? 'PRESEASON' : 'LIVE'} TICKER · {mode === 'demo' ? 'DEMO BOARD' : mode === 'awaiting-match' ? 'MATCHING PICKED GAMES' : 'PICKED GAMES ONLY'}</span>
        <button className="ticker-refresh" onClick={refresh} disabled={loading}>{loading ? 'CHECKING…' : `REFRESH · ${updatedAt}`}</button>
      </div>
      <div className="score-scroll">
        {scores.length ? scores.map((score) => (
          <div className="score-chip" key={score.id}>
            <div className={score.live ? 'score-state live' : 'score-state'}>{score.state}</div>
            <div><b>{score.away}</b> {score.awayScore}</div>
            <div><b>{score.home}</b> {score.homeScore}</div>
          </div>
        )) : <div className="score-chip score-awaiting"><div className="score-state">FEED READY</div><div><b>AWAITING MATCHED GAMES</b></div></div>}
      </div>
    </section>
  );
}

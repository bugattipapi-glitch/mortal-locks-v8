'use client';

import { useCallback, useEffect, useState } from 'react';

type Score = {
  id: string;
  away: string;
  home: string;
  awayScore: number;
  homeScore: number;
  state: string;
  live: boolean;
  startsAt?: string | null;
};

function scoreState(score: Score) {
  if (score.state !== 'SCHEDULED' || !score.startsAt) return score.state;
  return new Date(score.startsAt).toLocaleString([], { weekday: 'short', hour: 'numeric', minute: '2-digit' }).toUpperCase();
}

export function ScoreTicker() {
  const [scores, setScores] = useState<Score[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string>('CONNECTING');
  const [mode, setMode] = useState('loading');
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/scores', { cache: 'no-store' });
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
    const timer = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(timer);
  }, [refresh]);

  return (
    <section className="score-strip" aria-label="Picked games scoreboard">
      <div className="ticker-label">
        <span>ML8 LIVE TICKER · {mode === 'loading' ? 'CONNECTING TO SCORE FEED' : mode === 'awaiting-picks' ? 'AWAITING THIS WEEK\'S LOCKS' : mode === 'awaiting-match' ? 'MATCHING PICKED GAMES' : mode === 'provider-error' ? 'SCORE FEED TEMPORARILY OFFLINE' : 'PICKED GAMES ONLY'}</span>
        <button className="ticker-refresh" onClick={refresh} disabled={loading}>{loading ? 'CHECKING…' : `REFRESH · ${updatedAt}`}</button>
      </div>
      <div className="score-scroll">
        {scores.length ? scores.map((score) => (
          <div className="score-chip" key={score.id}>
            <div className={score.live ? 'score-state live' : 'score-state'}>{scoreState(score)}</div>
            <div><b>{score.away}</b> {score.awayScore}</div>
            <div><b>{score.home}</b> {score.homeScore}</div>
          </div>
        )) : <div className="score-chip score-awaiting"><div className="score-state">{mode === 'provider-error' ? 'RETRYING' : 'FEED READY'}</div><div><b>{mode === 'loading' ? 'CONNECTING TO LIVE SCORES' : mode === 'awaiting-match' ? 'MATCHING SAVED LOCKS' : mode === 'provider-error' ? 'LIVE SCORES TEMPORARILY UNAVAILABLE' : 'AWAITING THIS WEEK\'S LOCKS'}</b></div></div>}
      </div>
    </section>
  );
}

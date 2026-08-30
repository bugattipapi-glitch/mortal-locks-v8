'use client';

import { useEffect, useMemo, useState } from 'react';
import { savePickAction } from '../app/admin/actions';
import { commentaryRules, type BetSide, type Market, type Period } from '../lib/data';
import type { RuntimePlayer } from '../lib/runtime-data';
import type { ScheduleCandidate, ScheduledGameCandidate } from '../lib/score-feed';

function signedLine(value: string) {
  const number = Number(value);
  if (!Number.isFinite(number)) return '—';
  return `${number >= 0 ? '+' : ''}${number}`;
}

function localKickoff(value: string) {
  return new Date(value).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

export function GamePickEntry({
  players,
  seasonNumber,
  week,
  onWeekChange,
}: {
  players: RuntimePlayer[];
  seasonNumber: number;
  week: string;
  onWeekChange: (week: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [candidates, setCandidates] = useState<ScheduleCandidate[]>([]);
  const [selected, setSelected] = useState<ScheduledGameCandidate | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [market, setMarket] = useState<Market>('SPREAD');
  const [selectionSide, setSelectionSide] = useState<BetSide>('HOME');
  const [line, setLine] = useState('');
  const [period, setPeriod] = useState<Period>('FULL');
  const [commentaryChoice, setCommentaryChoice] = useState('');

  useEffect(() => {
    setSelected(null);
    setCandidates([]);
    setQuery('');
  }, [week]);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2 || selected) {
      setCandidates([]);
      setSearchError('');
      return;
    }
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setSearchError('');
      try {
        const response = await fetch(`/api/admin/games?week=${encodeURIComponent(week)}&q=${encodeURIComponent(trimmed)}`, {
          cache: 'no-store',
          signal: controller.signal,
        });
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error ?? 'Schedule search failed.');
        setCandidates(Array.isArray(payload.candidates) ? payload.candidates : []);
      } catch (error) {
        if (!controller.signal.aborted) setSearchError(error instanceof Error ? error.message : 'Schedule search failed.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 280);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query, selected, week]);

  const selectedTeam = selected
    ? (selectionSide === 'HOME' ? selected.home : selected.away)
    : null;
  const opponent = selected && selectedTeam
    ? (selectionSide === 'HOME' ? selected.away : selected.home)
    : null;
  const preview = useMemo(() => {
    if (!selected) return '';
    const prefix = period === 'FULL' ? '' : `${period} · `;
    if (market === 'TOTAL') return line ? `${prefix}${selected.away.shortName} / ${selected.home.shortName} ${selectionSide === 'OVER' ? 'O' : 'U'}${line}` : '';
    if (market === 'MONEYLINE') return selectedTeam ? `${prefix}${selectedTeam.shortName} ML` : '';
    return selectedTeam && line ? `${prefix}${selectedTeam.shortName} ${signedLine(line)}` : '';
  }, [line, market, period, selected, selectedTeam, selectionSide]);

  function chooseCandidate(candidate: ScheduleCandidate) {
    if (!candidate.available || !candidate.away || !candidate.home || !candidate.startsAt || !candidate.eventId || !candidate.matchedTeamSide) return;
    setSelected(candidate);
    setQuery(candidate.matchedTeam.name);
    setMarket('SPREAD');
    setSelectionSide(candidate.matchedTeamSide);
    setLine('');
  }

  function changeMarket(next: Market) {
    setMarket(next);
    setLine('');
    if (next === 'TOTAL') setSelectionSide('OVER');
    else setSelectionSide(selected?.matchedTeamSide ?? 'HOME');
  }

  return (
    <form className="admin-section canonical-pick-entry" action={savePickAction}>
      <h2>FIND GAME + ENTER LOCK</h2>
      <p className="helper">Search a team, select its actual scheduled game, then add the market and number. The saved event—not the typed label—drives the ticker and grading.</p>
      <input type="hidden" name="seasonNumber" value={seasonNumber} />
      <div className="admin-form-grid">
        <label>Week<select name="week" value={week} onChange={(event) => onWeekChange(event.target.value)}>{Array.from({ length: 18 }, (_, index) => index + 1).map((number) => <option key={number} value={number}>Week {number}</option>)}</select></label>
        <label>Player<select name="playerSlug" required>{players.map((player) => <option key={player.slug} value={player.slug}>{player.name}</option>)}</select></label>
        <label>Pick slot<select name="slot"><option value="1">Pick 1</option><option value="2">Pick 2</option></select></label>
        <label>Period<select name="period" value={period} onChange={(event) => setPeriod(event.target.value as Period)}><option value="FULL">Full game</option><option value="1H">1st half</option><option value="1Q">1st quarter</option></select></label>
      </div>

      <label className="game-search-label">Team search
        <input value={query} onChange={(event) => { setQuery(event.target.value); setSelected(null); }} placeholder="Try Miami, Florida State, Cowboys…" autoComplete="off" />
      </label>
      {!selected && query.trim().length < 2 && <div className="parse-placeholder">TYPE AT LEAST 2 CHARACTERS TO SEARCH THIS WEEK&apos;S NFL + CFB SCHEDULE.</div>}
      {!selected && loading && <div className="parse-placeholder">SCANNING THE WEEKLY SCHEDULE…</div>}
      {!selected && searchError && <div className="parse-preview warning-preview"><b>SCHEDULE SIGNAL LOST</b><span>{searchError}</span></div>}
      {!selected && !loading && query.trim().length >= 2 && !searchError && !candidates.length && <div className="parse-placeholder">NO MATCHING TEAM WITH A GAME IN THIS MORTAL LOCKS WEEK.</div>}
      {!selected && !!candidates.length && <div className="game-search-results" role="listbox" aria-label="Matching scheduled teams">
        {candidates.map((candidate) => {
          const hasGame = candidate.available && !!candidate.away && !!candidate.home && !!candidate.startsAt && !!candidate.eventId;
          return <button type="button" role="option" aria-selected="false" disabled={!hasGame} onClick={() => chooseCandidate(candidate)} key={`${candidate.sport}-${candidate.eventId ?? 'bye'}-${candidate.matchedTeam.id}`}>
              <span><b>{candidate.matchedTeam.name}</b><small>{candidate.sport} · {candidate.matchedTeam.abbreviation}</small></span>
              {hasGame
                ? <span><strong>{candidate.away!.shortName} at {candidate.home!.shortName}</strong><small>{localKickoff(candidate.startsAt!)}</small></span>
                : <span><strong>NO GAME THIS WEEK</strong><small>Choose another team or Mortal Locks week</small></span>}
            </button>;
        })}
      </div>}

      {selected && <>
        <div className="selected-game-card">
          <span className="sport-tag">{selected.sport} · EVENT LOCKED</span>
          <b>{selected.away.shortName} <em>AT</em> {selected.home.shortName}</b>
          <small>{localKickoff(selected.startsAt)} · shown in your local time</small>
          <button type="button" onClick={() => { setSelected(null); setQuery(''); }}>CHANGE GAME</button>
        </div>
        <input type="hidden" name="sport" value={selected.sport} />
        <input type="hidden" name="eventId" value={selected.eventId} />
        <input type="hidden" name="market" value={market} />
        <input type="hidden" name="selectionSide" value={selectionSide} />

        <div className="admin-form-grid wager-grid">
          <label>Market<select value={market} onChange={(event) => changeMarket(event.target.value as Market)}><option value="SPREAD">Point spread</option><option value="TOTAL">Over / under</option><option value="MONEYLINE">Even money / ML</option></select></label>
          {market === 'TOTAL' ? (
            <label>Direction<select value={selectionSide} onChange={(event) => setSelectionSide(event.target.value as BetSide)}><option value="OVER">Over</option><option value="UNDER">Under</option></select></label>
          ) : (
            <label>Team<select value={selectionSide} onChange={(event) => setSelectionSide(event.target.value as BetSide)}><option value="AWAY">{selected.away.shortName}</option><option value="HOME">{selected.home.shortName}</option></select></label>
          )}
          {market !== 'MONEYLINE' && <label>{market === 'TOTAL' ? 'Total' : 'Line'}<input name="line" type="number" step="0.5" min={market === 'TOTAL' ? 0 : -100} max={market === 'TOTAL' ? 200 : 100} value={line} onChange={(event) => setLine(event.target.value)} placeholder={market === 'TOTAL' ? '56' : '-28'} required /></label>}
          <label className="checkbox-line"><input name="force" type="checkbox" /> Force pick</label>
        </div>
        {market === 'MONEYLINE' && <input type="hidden" name="line" value="" />}

        <label>Booth call (optional)<select name="commentaryChoice" value={commentaryChoice} onChange={(event) => setCommentaryChoice(event.target.value)}><option value="">NO BOOTH CALL</option>{commentaryRules.map((rule) => <option value={rule.label} key={rule.label}>{rule.label}</option>)}<option value="OTHER">OTHER — WRITE YOUR OWN</option></select></label>
        {commentaryChoice === 'OTHER' && <label>Custom booth call<input name="commentaryCustom" maxLength={80} placeholder="TYPE ANY CALL…" required /></label>}

        <div className="parse-preview canonical-preview">
          <small>CONFIRM THE LOCK</small>
          <b>{preview || 'ADD THE NUMBER TO COMPLETE THIS PICK'}</b>
          <span>{opponent && market !== 'TOTAL' ? `${selectionSide === 'AWAY' ? 'AT' : 'VS'} ${opponent.shortName}` : `${selected.away.shortName} AT ${selected.home.shortName}`}</span>
          <button type="submit" disabled={!preview}>LOCK TO THIS EVENT</button>
        </div>
      </>}
    </form>
  );
}

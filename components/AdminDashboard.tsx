'use client';

import { useMemo, useState } from 'react';
import {
  addPlayerAction,
  logoutAction,
  overrideResultAction,
  savePickAction,
  saveParsedPicksAction,
  saveSeasonAction,
  setPlayerActiveAction,
} from '../app/admin/actions';
import { commentaryRules } from '../lib/data';
import type { RuntimeSnapshot } from '../lib/runtime-data';
import { parseTextPicks } from '../lib/pick-text-parser';
import { PlayerAvatar } from './PlayerAvatar';

const ambiguousAliases: Record<string, string[]> = {
  OSU: ['OHIO STATE', 'OKLAHOMA STATE', 'OREGON STATE'],
  USC: ['SOUTHERN CALIFORNIA', 'SOUTH CAROLINA'],
  MSU: ['MICHIGAN STATE', 'MISSISSIPPI STATE'],
};

const noticeCopy: Record<string, string> = {
  'season-saved': 'SEASON SETTINGS SAVED',
  'player-added': 'PLAYER ADDED TO ROSTER',
  'roster-updated': 'ROSTER STATUS UPDATED',
  'pick-saved': 'WEEKLY PICK SAVED',
  'result-saved': 'MANUAL RESULT LOCKED',
  'text-picks-saved': 'TEXT PICKS IMPORTED',
};

function parsePreview(raw: string) {
  const normalized = raw.trim().toUpperCase();
  if (!normalized) return null;
  const ambiguous = Object.entries(ambiguousAliases).find(([alias]) => new RegExp(`\\b${alias}\\b`).test(normalized));
  if (ambiguous) return { kind: 'ambiguous' as const, text: normalized, alias: ambiguous[0], options: ambiguous[1] };
  return { kind: 'ready' as const, text: normalized };
}

export function AdminDashboard({ snapshot, notice }: { snapshot: RuntimeSnapshot; notice?: string }) {
  const activePlayers = useMemo(() => snapshot.players.filter((player) => player.active), [snapshot.players]);
  const [rawPick, setRawPick] = useState('');
  const [game, setGame] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(activePlayers[0]?.slug ?? '');
  const [slot, setSlot] = useState('1');
  const [sport, setSport] = useState('CFB');
  const [period, setPeriod] = useState('FULL');
  const [week, setWeek] = useState(String(snapshot.season.currentWeek));
  const [isForce, setIsForce] = useState(false);
  const [textPicks, setTextPicks] = useState('');
  const [textSport, setTextSport] = useState<'CFB' | 'NFL'>('CFB');
  const preview = useMemo(() => parsePreview(`${game} ${rawPick}`), [game, rawPick]);
  const selectedName = snapshot.players.find((player) => player.slug === selectedPlayer)?.name ?? 'PLAYER';
  const visiblePicks = snapshot.picks.filter((pick) => pick.week === Number(week));
  const parsedTextPicks = useMemo(
    () => parseTextPicks(textPicks, activePlayers, textSport),
    [activePlayers, textPicks, textSport],
  );
  const readyTextPicks = parsedTextPicks.filter((pick) => pick.ready);

  return (
    <div className="admin-grid">
      <section className="panel admin-panel">
        <div className="panel-title cyan-title"><span>COMMISSIONER CONTROL</span><small>AUTHORIZED SIGNAL</small></div>
        <div className="admin-session-bar">
          <span className={`database-light ${snapshot.dataMode === 'database' ? 'online' : ''}`} />
          <b>{snapshot.dataMode === 'database' ? 'DATABASE ONLINE' : 'LOCAL PREVIEW · SAVES DISABLED'}</b>
          <form action={logoutAction}><button>LOG OUT</button></form>
        </div>
        {notice && noticeCopy[notice] && <div className="admin-notice" role="status">✓ {noticeCopy[notice]}</div>}

        <form className="admin-section" action={saveSeasonAction}>
          <h2>SEASON SETUP</h2>
          <div className="admin-form-grid">
            <label>Season number<input name="number" type="number" min="1" max="99" defaultValue={snapshot.season.number} required /></label>
            <label>Current week<select name="currentWeek" defaultValue={snapshot.season.currentWeek}>{Array.from({ length: 18 }, (_, index) => index + 1).map((number) => <option key={number} value={number}>Week {number}</option>)}</select></label>
            <label>Season title<input name="title" defaultValue={snapshot.season.title} maxLength={80} required /></label>
            <label>Broadcast status<select name="status" defaultValue={snapshot.season.status}><option>PRESEASON</option><option>LIVE</option><option>POSTSEASON</option><option>FINAL</option></select></label>
          </div>
          <label>Season start date<input name="startDate" type="date" defaultValue={snapshot.season.startDate} required /></label>
          <button className="primary-button" type="submit">SAVE SEASON SETTINGS</button>
        </form>

        <div className="admin-section">
          <h2>PLAYERS</h2>
          <div className="admin-player-grid">
            {snapshot.players.map((player) => (
              <div className={player.active ? '' : 'inactive-player'} key={player.slug}>
                <PlayerAvatar name={player.name} /><b>{player.name}</b>
                <form action={setPlayerActiveAction}>
                  <input type="hidden" name="slug" value={player.slug} />
                  <input type="hidden" name="active" value={String(!player.active)} />
                  <button>{player.active ? 'REMOVE FROM ACTIVE ROSTER' : 'RESTORE PLAYER'}</button>
                </form>
              </div>
            ))}
          </div>
          <form className="inline-add-player" action={addPlayerAction}>
            <label>New player<input name="name" placeholder="Player name" minLength={2} maxLength={40} required /></label>
            <button type="submit">+ ADD PLAYER</button>
          </form>
          <p className="helper">Removing a player hides them from the active roster but preserves every historical pick.</p>
        </div>

        <div className="admin-section">
          <h2>SCORE CONTROL STATUS</h2>
          <div className="system-status-grid">
            <div><span className="database-light online" /><b>MANUAL RESULTS</b><small>OPERATIONAL</small></div>
            <div><span className="database-light" /><b>SPORTS FEED</b><small>DEMO TICKER</small></div>
          </div>
          <p className="helper">Use Result Override to grade picks now. Automatic score grading is the one commissioner function intentionally left for the live sports-data phase.</p>
        </div>
      </section>

      <section className="panel admin-panel">
        <div className="panel-title red-title"><span>ENTER WEEKLY PICKS</span><small>2 PICKS · 1 PLAYER</small></div>
        <div className="admin-section text-pick-intake">
          <h2>PASTE TEXT PICKS</h2>
          <p className="helper">Paste one pick per line. Best format: <b>AJ 1 CFB · Ohio State vs Michigan | Ohio State -6.5 · CALL: SOME SPREAD</b>. Every line is previewed before anything is saved.</p>
          <div className="admin-form-grid">
            <label>Week<select value={week} onChange={(event) => setWeek(event.target.value)}>{Array.from({ length: 18 }, (_, index) => index + 1).map((number) => <option key={number} value={number}>Week {number}</option>)}</select></label>
            <label>Default sport<select value={textSport} onChange={(event) => setTextSport(event.target.value as 'CFB' | 'NFL')}><option>CFB</option><option>NFL</option></select></label>
          </div>
          <label>Group text / picks<textarea value={textPicks} onChange={(event) => setTextPicks(event.target.value)} placeholder={'AJ 1 CFB · Ohio State vs Michigan | Ohio State -6.5\nAJ 2 CFB · Texas vs Oklahoma | Texas -3\nKev 1 NFL · Bills vs Jets | Bills -4 · CALL: PUSH JOB'} /></label>
          {!!parsedTextPicks.length && <div className="text-parse-list">
            {parsedTextPicks.map((pick) => <article className={pick.ready ? 'ready' : 'warning'} key={pick.id}>
              <span>{pick.ready ? 'READY' : 'CHECK'}</span>
              <b>{pick.playerName ?? 'UNKNOWN'} · P{pick.slot ?? '?'} · {pick.sport ?? textSport}{pick.period !== 'FULL' ? ` · ${pick.period}` : ''}</b>
              <strong>{pick.game ?? 'GAME NOT PARSED'} → {pick.bet ?? 'PICK NOT PARSED'}</strong>
              {!!pick.warnings.length && <small>{pick.warnings.join(' · ')}</small>}
            </article>)}
          </div>}
          <form action={saveParsedPicksAction}>
            <input type="hidden" name="seasonNumber" value={snapshot.season.number} />
            <input type="hidden" name="week" value={week} />
            <input type="hidden" name="payload" value={JSON.stringify(readyTextPicks.map(({ playerSlug, slot: parsedSlot, sport: parsedSport, period: parsedPeriod, game: parsedGame, bet: parsedBet, commentary }) => ({ playerSlug, slot: parsedSlot, sport: parsedSport, period: parsedPeriod, game: parsedGame, bet: parsedBet, commentary })))} />
            <button className="primary-button" type="submit" disabled={!readyTextPicks.length || readyTextPicks.length !== parsedTextPicks.length}>IMPORT {readyTextPicks.length} CONFIRMED PICK{readyTextPicks.length === 1 ? '' : 'S'}</button>
          </form>
          <p className="helper">If any line says CHECK, edit the pasted text or use the structured entry form below. Nothing partial is imported.</p>
        </div>
        <form className="admin-section" action={savePickAction}>
          <h2>STRUCTURED ENTRY · FALLBACK</h2>
          <input type="hidden" name="seasonNumber" value={snapshot.season.number} />
          <div className="admin-form-grid">
            <label>Week<select name="week" value={week} onChange={(event) => setWeek(event.target.value)}>{Array.from({ length: 18 }, (_, index) => index + 1).map((number) => <option key={number} value={number}>Week {number}</option>)}</select></label>
            <label>Player<select name="playerSlug" value={selectedPlayer} onChange={(event) => setSelectedPlayer(event.target.value)}>{activePlayers.map((player) => <option key={player.slug} value={player.slug}>{player.name}</option>)}</select></label>
            <label>Pick slot<select name="slot" value={slot} onChange={(event) => setSlot(event.target.value)}><option value="1">Pick 1</option><option value="2">Pick 2</option></select></label>
            <label>Sport<select name="sport" value={sport} onChange={(event) => setSport(event.target.value)}><option>CFB</option><option>NFL</option></select></label>
            <label>Period<select name="period" value={period} onChange={(event) => setPeriod(event.target.value)}><option value="FULL">Full game</option><option value="1H">1st half</option><option value="1Q">1st quarter</option></select></label>
            <label className="checkbox-line"><input name="force" type="checkbox" checked={isForce} onChange={(event) => setIsForce(event.target.checked)} /> Force pick</label>
          </div>
          <label>Game<input name="game" value={game} onChange={(event) => setGame(event.target.value)} placeholder="Ohio State vs Michigan" required /></label>
          <label>Pick<input name="bet" value={rawPick} onChange={(event) => setRawPick(event.target.value)} placeholder="Ohio State -6.5" required /></label>
          <label>Booth call (optional)<input name="commentary" placeholder="SOME SPREAD" maxLength={80} /></label>

          {!preview && <div className="parse-placeholder">TYPE THE GAME AND PICK THE WAY YOU&apos;D TEXT THEM.</div>}
          {preview?.kind === 'ambiguous' && (
            <div className="parse-preview warning-preview">
              <b>HOLD UP: “{preview.alias}” IS AMBIGUOUS</b>
              <span>Spell out the team before saving: {preview.options.join(' / ')}.</span>
            </div>
          )}
          {preview?.kind === 'ready' && (
            <div className="parse-preview">
              <small>CONFIRM BEFORE SAVE</small>
              <b>{selectedName} · WEEK {week} · PICK {slot} · {sport}{period !== 'FULL' ? ` · ${period}` : ''}{isForce ? ' · FORCE' : ''}</b>
              <span>{preview.text}</span>
              <div><button type="submit">CONFIRM &amp; SAVE</button><button type="button" onClick={() => { setGame(''); setRawPick(''); }}>CLEAR</button></div>
            </div>
          )}
          <p className="helper">Saving the same player/week/slot updates that pick without erasing a result you already graded.</p>
        </form>

        <div className="admin-section">
          <h2>RESULT OVERRIDE · WEEK {week}</h2>
          <div className="override-list">
            {visiblePicks.length ? visiblePicks.map((pick) => (
              <form className="override-row" action={overrideResultAction} key={`${pick.playerSlug}-${pick.slot}`}>
                <input type="hidden" name="seasonNumber" value={snapshot.season.number} />
                <input type="hidden" name="week" value={pick.week} />
                <input type="hidden" name="playerSlug" value={pick.playerSlug} />
                <input type="hidden" name="slot" value={pick.slot} />
                <span><b>{pick.playerName} · P{pick.slot}</b><small>{pick.bet}{pick.manualOverride ? ' · MANUAL LOCK' : ''}</small></span>
                <select name="result" defaultValue={pick.result}><option value="PENDING">PENDING</option><option value="LIVE">LIVE</option><option value="W">WIN</option><option value="L">LOSS</option><option value="P">PUSH</option></select>
                <button type="submit">LOCK</button>
              </form>
            )) : <div className="parse-placeholder">NO PICKS ENTERED FOR WEEK {week}</div>}
          </div>
        </div>

        <div className="admin-section">
          <h2>COMMENTARY ENGINE</h2>
          <p className="helper">Aim for roughly 25% of picks. Not every ticket needs a rimshot.</p>
          <div className="rule-list">{commentaryRules.map((rule) => <div key={rule.label}><b>{rule.label}</b><span>{rule.detail}</span></div>)}</div>
        </div>
      </section>
    </div>
  );
}

'use client';

import { useMemo, useState } from 'react';
import {
  addDeadTeamAction,
  addLockOffAction,
  addPlayerAction,
  deleteDeadTeamAction,
  deleteLockOffAction,
  logoutAction,
  overrideResultAction,
  saveParsedPicksAction,
  saveSeasonAction,
  setPlayerActiveAction,
  syncScoresAction,
} from '../app/admin/actions';
import { commentaryRules } from '../lib/data';
import type { RuntimeSnapshot } from '../lib/runtime-data';
import { parseTextPicks } from '../lib/pick-text-parser';
import { PlayerAvatar } from './PlayerAvatar';
import { SeasonResetControl } from './SeasonResetControl';
import { GamePickEntry } from './GamePickEntry';

const noticeCopy: Record<string, string> = {
  'season-saved': 'SEASON SETTINGS SAVED',
  'player-added': 'PLAYER ADDED TO ROSTER',
  'roster-updated': 'ROSTER STATUS UPDATED',
  'pick-saved': 'WEEKLY PICK SAVED',
  'result-saved': 'RESULT + BOOTH CALL UPDATED',
  'pick-deleted': 'LOCK DELETED · THAT SLOT IS OPEN AGAIN',
  'text-picks-saved': 'TEXT PICKS IMPORTED',
  'season-reset': 'SEASON TEST DATA CLEARED · WEEK 1 PRESEASON RESTORED',
  'dead-team-added': 'NEW HEADSTONE ADDED',
  'dead-team-removed': 'HEADSTONE REMOVED',
  'lock-off-added': 'LOCK-OFF ALERT ADDED',
  'lock-off-removed': 'LOCK-OFF ALERT REMOVED',
  'scores-sync-failed': 'SCORE FEED DID NOT RESPOND · PICKS UNCHANGED · USE MANUAL OVERRIDE OR TRY AGAIN',
};

function noticeMessage(notice?: string) {
  if (!notice) return null;
  const scoreSync = notice.match(/^scores-synced-(\d+)-(\d+)$/);
  if (scoreSync) return `SCORE SYNC COMPLETE · ${scoreSync[1]} LOCK${scoreSync[1] === '1' ? '' : 'S'} UPDATED · ${scoreSync[2]} FINAL${scoreSync[2] === '1' ? '' : 'S'} MATCHED`;
  return noticeCopy[notice] ?? null;
}

function BoothCallSelect({ current, label }: { current: string; label: string }) {
  const custom = !!current && !commentaryRules.some((rule) => rule.label === current);
  const [choice, setChoice] = useState(custom ? 'OTHER' : current);
  return <div className="override-call-control">
    <select name="commentaryChoice" value={choice} onChange={(event) => setChoice(event.target.value)} aria-label={label}>
      <option value="">NO BOOTH CALL</option>
      {commentaryRules.map((rule) => <option value={rule.label} key={rule.label}>{rule.label}</option>)}
      <option value="OTHER">OTHER — WRITE YOUR OWN</option>
    </select>
    {choice === 'OTHER' && <input name="commentaryCustom" defaultValue={custom ? current : ''} maxLength={80} placeholder="CUSTOM CALL" required />}
  </div>;
}

export function AdminDashboard({ snapshot, notice }: { snapshot: RuntimeSnapshot; notice?: string }) {
  const activePlayers = useMemo(() => snapshot.players.filter((player) => player.active), [snapshot.players]);
  const [week, setWeek] = useState(String(snapshot.season.currentWeek));
  const [textPicks, setTextPicks] = useState('');
  const [textSport, setTextSport] = useState<'CFB' | 'NFL'>('CFB');
  const visiblePicks = snapshot.picks.filter((pick) => pick.week === Number(week));
  const parsedTextPicks = useMemo(
    () => parseTextPicks(textPicks, activePlayers, textSport),
    [activePlayers, textPicks, textSport],
  );
  const readyTextPicks = parsedTextPicks.filter((pick) => pick.ready);
  const resolvedNotice = noticeMessage(notice);

  return (
    <div className="admin-grid">
      <section className="panel admin-panel">
        <div className="panel-title cyan-title"><span>COMMISSIONER CONTROL</span><small>AUTHORIZED SIGNAL</small></div>
        <div className="admin-session-bar">
          <span className={`database-light ${snapshot.dataMode === 'database' ? 'online' : ''}`} />
          <b>{snapshot.dataMode === 'database' ? 'DATABASE ONLINE' : 'LOCAL PREVIEW · SAVES DISABLED'}</b>
          <form action={logoutAction}><button>LOG OUT</button></form>
        </div>
        {resolvedNotice && <div className="admin-notice" role="status">✓ {resolvedNotice}</div>}

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
            <div><span className="database-light online" /><b>AUTO RESULTS</b><small>DAILY SCORE SYNC</small></div>
            <div><span className="database-light online" /><b>MANUAL FALLBACK</b><small>OVERRIDES READY</small></div>
          </div>
          <p className="helper">The 5:00 AM Arizona score job settles event-linked full-game, first-half, and first-quarter spreads, totals, and even-money picks when the provider supplies period scores. Broadcast status does not control it. Legacy text-only or unusual picks remain available for manual review.</p>
          <form action={syncScoresAction}><button className="primary-button" type="submit">RUN SCORE SYNC NOW</button></form>
        </div>

        <div className="admin-section managed-content-section">
          <h2>DEAD TEAMS</h2>
          <form action={addDeadTeamAction}>
            <input type="hidden" name="seasonNumber" value={snapshot.season.number} />
            <div className="admin-form-grid">
              <label>Team / abbreviation<input name="teamName" placeholder="NYJ" minLength={2} maxLength={28} required /></label>
              <label>Cause of death<input name="reason" placeholder="HOPE DIED" minLength={2} maxLength={54} required /></label>
            </div>
            <button className="primary-button" type="submit">+ ADD HEADSTONE</button>
          </form>
          <div className="admin-managed-list">
            {snapshot.deadTeams.length ? snapshot.deadTeams.map((team) => (
              <form action={deleteDeadTeamAction} key={team.id}>
                <input type="hidden" name="id" value={team.id} />
                <input type="hidden" name="seasonNumber" value={snapshot.season.number} />
                <span><b>{team.teamName}</b><small>{team.reason}</small></span><button type="submit">REMOVE</button>
              </form>
            )) : <div className="parse-placeholder">NO DEAD TEAMS ON THE ACTIVE TAPE</div>}
          </div>
        </div>

        <div className="admin-section managed-content-section">
          <h2>LOCK-OFF ALERTS</h2>
          <form action={addLockOffAction}>
            <input type="hidden" name="seasonNumber" value={snapshot.season.number} />
            <div className="admin-form-grid lock-off-form-grid">
              <label>Week<select name="week" defaultValue={snapshot.season.currentWeek}>{Array.from({ length: 18 }, (_, index) => index + 1).map((number) => <option key={number} value={number}>Week {number}</option>)}</select></label>
              <label>Side A<input name="sideA" placeholder="BLAINE O43" minLength={2} maxLength={48} required /></label>
              <label>Side B<input name="sideB" placeholder="AJ U44.5" minLength={2} maxLength={48} required /></label>
            </div>
            <label>Lock-off call<input name="note" placeholder="THE MIDDLE IS ALIVE" minLength={2} maxLength={60} required /></label>
            <button className="primary-button" type="submit">+ ADD LOCK-OFF</button>
          </form>
          <div className="admin-managed-list">
            {snapshot.lockOffs.length ? snapshot.lockOffs.map((lockOff) => (
              <form action={deleteLockOffAction} key={lockOff.id}>
                <input type="hidden" name="id" value={lockOff.id} />
                <input type="hidden" name="seasonNumber" value={snapshot.season.number} />
                <span><b>W{lockOff.week} · {lockOff.sideA} VS {lockOff.sideB}</b><small>{lockOff.note}</small></span><button type="submit">REMOVE</button>
              </form>
            )) : <div className="parse-placeholder">NO LOCK-OFFS ON THE ACTIVE TAPE</div>}
          </div>
        </div>

        <div className="admin-section danger-zone">
          <h2>TEST SEASON RESET</h2>
          <p className="helper">Use this after the preseason test. It clears only Season {snapshot.season.number} picks/results and returns the broadcast to Week 1 · PRESEASON.</p>
          <SeasonResetControl seasonNumber={snapshot.season.number} pickCount={snapshot.picks.length} />
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
        <GamePickEntry players={activePlayers} seasonNumber={snapshot.season.number} week={week} onWeekChange={setWeek} />

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
                <select name="result" defaultValue={pick.result} aria-label={`${pick.playerName} pick ${pick.slot} result`}><option value="PENDING">PENDING</option><option value="LIVE">LIVE</option><option value="W">WIN</option><option value="L">LOSS</option><option value="P">PUSH</option><option value="DELETE">DELETE LOCK</option></select>
                <BoothCallSelect current={pick.commentary} label={`${pick.playerName} pick ${pick.slot} booth call`} />
                <button type="submit">LOCK</button>
              </form>
            )) : <div className="parse-placeholder">NO PICKS ENTERED FOR WEEK {week}</div>}
          </div>
        </div>

        <div className="admin-section">
          <h2>COMMENTARY ENGINE</h2>
          <p className="helper">Calls are commissioner-assigned, not guessed by the score feed. A selected call feeds the next weekly recap; choose NO BOOTH CALL and lock the override to remove one.</p>
          <div className="rule-list">{commentaryRules.map((rule) => <div key={rule.label}><b>{rule.label}</b><span>{rule.detail}</span></div>)}</div>
        </div>
      </section>
    </div>
  );
}

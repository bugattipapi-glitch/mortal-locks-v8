'use client';

import { useMemo, useState } from 'react';
import { SiteShell } from '../../components/SiteShell';
import { commentaryRules, players, season } from '../../lib/data';

const ambiguousAliases: Record<string, string[]> = {
  OSU: ['OHIO STATE', 'OKLAHOMA STATE', 'OREGON STATE'],
  USC: ['SOUTHERN CALIFORNIA', 'SOUTH CAROLINA'],
  MSU: ['MICHIGAN STATE', 'MISSISSIPPI STATE']
};

function parsePreview(raw: string) {
  const normalized = raw.trim().toUpperCase();
  if (!normalized) return null;
  const ambiguous = Object.entries(ambiguousAliases).find(([alias]) => new RegExp(`\\b${alias}\\b`).test(normalized));
  if (ambiguous) return { kind: 'ambiguous' as const, text: normalized, alias: ambiguous[0], options: ambiguous[1] };
  return { kind: 'ready' as const, text: normalized };
}

export default function AdminPage() {
  const [startDate, setStartDate] = useState(season.startDate);
  const [rawPick, setRawPick] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState('AJ');
  const [slot, setSlot] = useState('1');
  const [sport, setSport] = useState('CFB');
  const [period, setPeriod] = useState('FULL');
  const [isForce, setIsForce] = useState(false);
  const preview = useMemo(() => parsePreview(rawPick), [rawPick]);

  return (
    <SiteShell active="admin">
      <div className="admin-grid">
        <section className="panel admin-panel">
          <div className="panel-title cyan-title">COMMISSIONER CONTROL PANEL</div>
          <div className="admin-section">
            <h2>SEASON SETUP</h2>
            <label>Season start date<input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></label>
            <p className="helper">Starts at August 29 for now. This will be stored in the database later, so pushing the season back a week will be one edit.</p>
          </div>

          <div className="admin-section">
            <h2>PLAYERS</h2>
            <div className="admin-player-grid">
              {players.map((p) => <div key={p.name}><span className="avatar">{p.avatar}</span><b>{p.name}</b><button>UPLOAD AVATAR</button></div>)}
            </div>
            <div className="admin-actions"><button>+ ADD PLAYER</button><button>REMOVE PLAYER</button></div>
            <p className="helper">Avatar controls are laid out now. Actual uploads come with persistent storage.</p>
          </div>

          <div className="admin-section">
            <h2>SCORE CONTROLS</h2>
            <button className="primary-button">↻ UPDATE PICKED GAMES NOW</button>
            <p className="helper">The public ticker already polls a single score endpoint every 60 seconds. Later this button will call the same endpoint on demand.</p>
          </div>
        </section>

        <section className="panel admin-panel">
          <div className="panel-title red-title">ENTER WEEKLY PICKS</div>
          <div className="admin-section">
            <div className="admin-form-grid">
              <label>Player<select value={selectedPlayer} onChange={(e) => setSelectedPlayer(e.target.value)}>{players.map((p) => <option key={p.name}>{p.name}</option>)}</select></label>
              <label>Pick slot<select value={slot} onChange={(e) => setSlot(e.target.value)}><option value="1">Pick 1</option><option value="2">Pick 2</option></select></label>
              <label>Sport<select value={sport} onChange={(e) => setSport(e.target.value)}><option>CFB</option><option>NFL</option></select></label>
              <label>Period<select value={period} onChange={(e) => setPeriod(e.target.value)}><option value="FULL">Full game</option><option value="1H">1st half</option><option value="1Q">1st quarter</option></select></label>
            </div>
            <label>Pick<input value={rawPick} onChange={(e) => setRawPick(e.target.value)} placeholder="Ohio State/Michigan o43" /></label>
            <label className="checkbox-line"><input type="checkbox" checked={isForce} onChange={(e) => setIsForce(e.target.checked)} /> Force pick</label>

            {!preview && <div className="parse-placeholder">TYPE THE PICK THE WAY YOU'D TEXT IT.</div>}
            {preview?.kind === 'ambiguous' && (
              <div className="parse-preview warning-preview">
                <b>HOLD UP: “{preview.alias}” IS AMBIGUOUS</b>
                <span>I would not save this without asking which team you mean.</span>
                <div className="ambiguity-options">{preview.options.map((option) => <button key={option}>{option}</button>)}</div>
              </div>
            )}
            {preview?.kind === 'ready' && (
              <div className="parse-preview">
                <small>CONFIRM BEFORE SAVE</small>
                <b>{selectedPlayer} · PICK {slot} · {sport}{period !== 'FULL' ? ` · ${period}` : ''}{isForce ? ' · FORCE' : ''}</b>
                <span>{preview.text}</span>
                <div><button>CONFIRM & SAVE</button><button onClick={() => setRawPick('')}>CLEAR</button></div>
              </div>
            )}
            <p className="helper">The goal is to be conservative: “Ohio State -3” is easy; “OSU -3” should stop and ask you rather than silently choosing the wrong OSU.</p>
          </div>

          <div className="admin-section">
            <h2>RESULT OVERRIDE</h2>
            <div className="override-row"><span>AJ · Ohio State -6.5</span><select><option>AUTOMATIC</option><option>WIN</option><option>LOSS</option><option>PUSH</option><option>PENDING</option></select></div>
            <p className="helper">A manual result will lock the pick so future score refreshes cannot overwrite your decision.</p>
          </div>

          <div className="admin-section">
            <h2>COMMENTARY ENGINE</h2>
            <p className="helper">Target: roughly 25% of picks get a graphic/comment. Not every pick needs a rimshot.</p>
            <div className="rule-list">{commentaryRules.map((r) => <div key={r.label}><b>{r.label}</b><span>{r.detail}</span></div>)}</div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}

'use client';

export function BroadcastLauncher() {
  return (
    <button className="tv-window tv-window-button" type="button" aria-label="Play This Week in Mortal Locks" onClick={() => window.dispatchEvent(new Event('ml8:recap'))}>
      <div className="on-air"><span /> ON AIR</div>
      <div className="tv-copy">ML8-TV<br/><b>CHANNEL 8</b></div>
      <div className="signal-bug" aria-hidden="true">UHF · 08</div>
      <div className="scanlines" />
      <small className="recap-launch-label">PLAY WEEKLY RECAP</small>
    </button>
  );
}

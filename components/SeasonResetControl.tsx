'use client';

import { useState } from 'react';
import { resetSeasonAction } from '../app/admin/actions';

export function SeasonResetControl({ seasonNumber, pickCount }: { seasonNumber: number; pickCount: number }) {
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button className="danger-button" type="button" onClick={() => setConfirming(true)}>
        RESET SEASON {seasonNumber} TEST DATA
      </button>
    );
  }

  return (
    <div className="reset-confirmation" role="alert">
      <b>ARE YOU SURE?</b>
      <p>This permanently deletes {pickCount} Season {seasonNumber} lock{pickCount === 1 ? '' : 's'} and resets the header to Week 1 · PRESEASON. Players and Hall of Fame history stay intact.</p>
      <form action={resetSeasonAction}>
        <input type="hidden" name="seasonNumber" value={seasonNumber} />
        <button className="danger-button" type="submit">YES · CLEAR THIS SEASON</button>
        <button type="button" onClick={() => setConfirming(false)}>CANCEL</button>
      </form>
    </div>
  );
}

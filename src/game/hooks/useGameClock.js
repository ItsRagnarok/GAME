import { useEffect } from 'react';
import { tick } from '../logic/simulation';

const TICK_MS = 2000; // ~1 in-game hour per real 2 seconds

export function useGameClock() {
  useEffect(() => {
    const id = setInterval(tick, TICK_MS);
    return () => clearInterval(id);
  }, []);
}

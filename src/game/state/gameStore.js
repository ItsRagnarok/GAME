import { useSyncExternalStore } from 'react';

// Minimal external store (no extra dependency): a plain object plus a
// pub/sub set, read reactively via useSyncExternalStore. Kept separate
// from the camera engine on purpose — camera state changes every frame
// and stays out of React entirely, while game state changes a few times
// a second and *should* trigger re-renders (resource bar, build menu...).

const initialState = {
  day: 1,
  hour: 8,
  temperature: -8,
  resources: { coal: 60, wood: 40 },
  buildings: [],
  expeditions: {},
  log: [],
};

let state = initialState;
const listeners = new Set();

function getState() {
  return state;
}

function setState(updater) {
  state = typeof updater === 'function' ? updater(state) : { ...state, ...updater };
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export const gameStore = { getState, setState, subscribe };

export function useGameState() {
  return useSyncExternalStore(subscribe, getState);
}

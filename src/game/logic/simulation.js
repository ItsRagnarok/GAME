import { gameStore } from '../state/gameStore';
import { BUILDING_TYPES } from '../config/buildings';
import { GENERATOR_POSITION, MAIN_ZONE } from '../../world/config/worldConfig';

const MIN_DIST_FROM_GENERATOR = 300;
const MAX_DIST_FROM_GENERATOR = 1650;
const MIN_DIST_BETWEEN_BUILDINGS = 220;
const GRID_SNAP = 100;
const EXPEDITION_TICKS = 5;
const EXPEDITION_WOOD_COST = 8;

function snap(value) {
  return Math.round(value / GRID_SNAP) * GRID_SNAP;
}

/** One simulation step: ~1 in-game hour. Called on an interval. */
export function tick() {
  gameStore.setState((s) => {
    let hour = s.hour + 1;
    let day = s.day;
    if (hour >= 24) {
      hour = 0;
      day += 1;
    }

    let coalGain = 0;
    let woodGain = 0;
    const buildings = s.buildings.map((b) => {
      const def = BUILDING_TYPES[b.type];
      if (b.status === 'building') {
        const progress = b.progress + 1;
        if (progress >= def.buildTicks) {
          return { ...b, status: 'active', progress: def.buildTicks };
        }
        return { ...b, progress };
      }
      if (b.status === 'active') {
        coalGain += def.produces.coal || 0;
        woodGain += def.produces.wood || 0;
      }
      return b;
    });

    const generatorFueled = s.resources.coal > 0;
    const coalConsumed = generatorFueled ? 1 : 0;
    const outsideTemp = -4 - day * 0.4;
    const temperature = Math.round(generatorFueled ? outsideTemp + 14 : outsideTemp);

    const expeditions = { ...s.expeditions };
    const log = [...s.log];
    let coalReward = 0;
    let woodReward = 0;
    Object.keys(expeditions).forEach((zoneId) => {
      const exp = expeditions[zoneId];
      if (exp.status !== 'active') return;
      const remaining = exp.remaining - 1;
      if (remaining <= 0) {
        const reward = Math.random() < 0.5 ? 'coal' : 'wood';
        const amount = 6 + Math.floor(Math.random() * 10);
        if (reward === 'coal') coalReward += amount;
        else woodReward += amount;
        expeditions[zoneId] = { status: 'done', remaining: 0, reward: { type: reward, amount } };
        log.unshift(
          `Ziua ${day}, ora ${hour}:00 — echipa s-a întors cu ${amount} ${reward === 'coal' ? 'cărbune' : 'lemne'}.`,
        );
      } else {
        expeditions[zoneId] = { ...exp, remaining };
      }
    });

    return {
      ...s,
      hour,
      day,
      temperature,
      buildings,
      expeditions,
      log: log.slice(0, 20),
      resources: {
        coal: Math.max(0, s.resources.coal - coalConsumed + coalGain + coalReward),
        wood: s.resources.wood + woodGain + woodReward,
      },
    };
  });
}

export function placeBuilding(x, y, type) {
  const def = BUILDING_TYPES[type];
  if (!def) return { ok: false, reason: 'unknown-type' };

  const state = gameStore.getState();

  for (const key of Object.keys(def.cost)) {
    if ((state.resources[key] || 0) < def.cost[key]) {
      return { ok: false, reason: 'resources' };
    }
  }

  const sx = snap(x);
  const sy = snap(y);
  const margin = 250;
  const withinBounds =
    sx >= MAIN_ZONE.x + margin &&
    sx <= MAIN_ZONE.x + MAIN_ZONE.width - margin &&
    sy >= MAIN_ZONE.y + margin &&
    sy <= MAIN_ZONE.y + MAIN_ZONE.height - margin;
  if (!withinBounds) return { ok: false, reason: 'out-of-bounds' };

  const distFromGenerator = Math.hypot(sx - GENERATOR_POSITION.x, sy - GENERATOR_POSITION.y);
  if (distFromGenerator < MIN_DIST_FROM_GENERATOR || distFromGenerator > MAX_DIST_FROM_GENERATOR) {
    return { ok: false, reason: 'distance-from-generator' };
  }

  const tooClose = state.buildings.some(
    (b) => Math.hypot(sx - b.x, sy - b.y) < MIN_DIST_BETWEEN_BUILDINGS,
  );
  if (tooClose) return { ok: false, reason: 'overlap' };

  gameStore.setState((s) => {
    const resources = { ...s.resources };
    Object.entries(def.cost).forEach(([key, amount]) => {
      resources[key] -= amount;
    });
    return {
      ...s,
      resources,
      buildings: [
        ...s.buildings,
        { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, type, x: sx, y: sy, status: 'building', progress: 0 },
      ],
    };
  });

  return { ok: true };
}

export function sendExpedition(zoneId) {
  const state = gameStore.getState();
  const existing = state.expeditions[zoneId];
  if (existing && existing.status === 'active') return { ok: false, reason: 'already-active' };
  if (state.resources.wood < EXPEDITION_WOOD_COST) return { ok: false, reason: 'resources' };

  gameStore.setState((s) => ({
    ...s,
    resources: { ...s.resources, wood: s.resources.wood - EXPEDITION_WOOD_COST },
    expeditions: { ...s.expeditions, [zoneId]: { status: 'active', remaining: EXPEDITION_TICKS } },
  }));

  return { ok: true };
}

export { EXPEDITION_WOOD_COST };

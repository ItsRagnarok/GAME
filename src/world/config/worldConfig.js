// Central configuration for the world grid. Kept separate from rendering
// logic so future systems (buildings, fog of war, expeditions, save/load)
// can read zone metadata without touching camera/render code.
//
// The world isn't a uniform grid: "main" is the primary map (it already
// depicts a wide establishing view — mountains, a river, cracked ice) so
// it gets a bigger footprint and anchors the world as a central hub. The
// other 9 zones are single-unit tiles arranged around it.

export const UNIT = 2000; // one grid unit, in world px

// The main hub's art (src/world/art/HubMap.jsx) is drawn on a square
// 1000x1000 canvas, so its footprint stays square too — no stretching.
const MAIN_WIDTH = UNIT * 2;
const MAIN_HEIGHT = UNIT * 2;

export const WORLD_WIDTH = UNIT * 5; // 10000
export const WORLD_HEIGHT = MAIN_HEIGHT + UNIT * 2;

export const MIN_ZOOM = 0.3;
export const MAX_ZOOM = 3.2;
export const DEFAULT_ZOOM = 0.6;

// Camera starts centered on the main hub, not the geometric world center,
// so the primary map is what you see first.
export const DEFAULT_CAMERA = { x: UNIT, y: MAIN_HEIGHT / 2 };

//   [       MAIN (2 units wide)         ] mountains  forest      industrial
//   [        2 units tall               ] lake       ruins       volcanic
//    glacier      river       crater       ·          ·           ·
export const ZONES = [
  {
    id: 'main',
    order: '01',
    name: 'Teren înghețat principal',
    x: 0,
    y: 0,
    width: MAIN_WIDTH,
    height: MAIN_HEIGHT,
  },
  {
    id: 'mountains',
    order: '03',
    name: 'Zonă montană',
    x: UNIT * 2,
    y: 0,
    width: UNIT,
    height: UNIT,
  },
  {
    id: 'forest',
    order: '02',
    name: 'Pădure înghețată',
    x: UNIT * 3,
    y: 0,
    width: UNIT,
    height: UNIT,
  },
  {
    id: 'industrial',
    order: '07',
    name: 'Zonă industrială abandonată',
    x: UNIT * 4,
    y: 0,
    width: UNIT,
    height: UNIT,
  },
  {
    id: 'lake',
    order: '04',
    name: 'Lac înghețat',
    x: UNIT * 2,
    y: UNIT,
    width: UNIT,
    height: UNIT,
  },
  {
    id: 'ruins',
    order: '08',
    name: 'Ruinele unui oraș vechi',
    x: UNIT * 3,
    y: UNIT,
    width: UNIT,
    height: UNIT,
  },
  {
    id: 'volcanic',
    order: '10',
    name: 'Zonă vulcanică înghețată',
    x: UNIT * 4,
    y: UNIT,
    width: UNIT,
    height: UNIT,
  },
  {
    id: 'glacier',
    order: '09',
    name: 'Ghețar',
    x: 0,
    y: MAIN_HEIGHT,
    width: UNIT,
    height: UNIT,
  },
  {
    id: 'river',
    order: '05',
    name: 'Râu înghețat',
    x: UNIT,
    y: MAIN_HEIGHT,
    width: UNIT,
    height: UNIT,
  },
  {
    id: 'crater',
    order: '06',
    name: 'Crater uriaș',
    x: UNIT * 2,
    y: MAIN_HEIGHT,
    width: UNIT,
    height: UNIT,
  },
];

export const MAIN_ZONE = ZONES.find((z) => z.id === 'main');

// The Generator sits at the heart of the main hub — everything you build
// radiates out from here, same as in Frostpunk.
export const GENERATOR_POSITION = {
  x: MAIN_ZONE.x + MAIN_ZONE.width / 2,
  y: MAIN_ZONE.y + MAIN_ZONE.height / 2,
};

export function findZoneAt(x, y) {
  return (
    ZONES.find((z) => x >= z.x && x <= z.x + z.width && y >= z.y && y <= z.y + z.height) ?? null
  );
}

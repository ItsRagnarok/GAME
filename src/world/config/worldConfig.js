// Central configuration for the world grid. Kept separate from rendering
// logic so future systems (buildings, fog of war, expeditions, save/load)
// can read zone metadata without touching camera/render code.
//
// The world isn't a uniform grid: "main" is the primary map (it already
// depicts a wide establishing view — mountains, a river, cracked ice) so
// it gets a bigger footprint and anchors the world as a central hub. The
// other 9 zones are single-unit tiles arranged around it.

export const UNIT = 2000; // one grid unit, in world px

// The main hub's footprint matches the real source image's aspect ratio
// (harta_upscaled_x4.jpg, 6144x4096 = 3:2) so DeepZoomLayer never has to
// stretch it — width stays a clean 2 units, height is derived.
const MAIN_WIDTH = UNIT * 2;
const MAIN_HEIGHT = Math.round(MAIN_WIDTH * (4096 / 6144));

export const WORLD_WIDTH = UNIT * 5; // 10000
export const WORLD_HEIGHT = MAIN_HEIGHT + UNIT * 2;

export const MIN_ZOOM = 0.3;
export const MAX_ZOOM = 3.2;
export const DEFAULT_ZOOM = 0.6;

// Camera starts centered on the main hub, not the geometric world center,
// so the primary map is what you see first.
export const DEFAULT_CAMERA = { x: UNIT, y: MAIN_HEIGHT / 2 };

//   [       MAIN (2 units wide)         ] mountains  forest      industrial
//   [   height matches source aspect    ] lake       ruins       volcanic
//    glacier      river       crater       ·          ·           ·
export const ZONES = [
  {
    id: 'main',
    order: '01',
    name: 'Teren înghețat principal',
    // Rendered by DeepZoomLayer (public/deep-map/), not a flat file like
    // the other zones — no `file` field needed here.
    x: 0,
    y: 0,
    width: MAIN_WIDTH,
    height: MAIN_HEIGHT,
    accent: ['#3b5470', '#0e1a26'],
  },
  {
    id: 'mountains',
    order: '03',
    name: 'Zonă montană',
    file: '/tiles/03.jpg',
    x: UNIT * 2,
    y: 0,
    width: UNIT,
    height: UNIT,
    accent: ['#5b6b7a', '#1a2129'],
  },
  {
    id: 'forest',
    order: '02',
    name: 'Pădure înghețată',
    file: '/tiles/02.jpg',
    x: UNIT * 3,
    y: 0,
    width: UNIT,
    height: UNIT,
    accent: ['#33475a', '#101820'],
  },
  {
    id: 'industrial',
    order: '07',
    name: 'Zonă industrială abandonată',
    file: '/tiles/07.jpg',
    x: UNIT * 4,
    y: 0,
    width: UNIT,
    height: UNIT,
    accent: ['#44454a', '#131417'],
  },
  {
    id: 'lake',
    order: '04',
    name: 'Lac înghețat',
    file: '/tiles/04.jpg',
    x: UNIT * 2,
    y: UNIT,
    width: UNIT,
    height: UNIT,
    accent: ['#3d5f77', '#0d1b24'],
  },
  {
    id: 'ruins',
    order: '08',
    name: 'Ruinele unui oraș vechi',
    file: '/tiles/08.jpg',
    x: UNIT * 3,
    y: UNIT,
    width: UNIT,
    height: UNIT,
    accent: ['#4b4e56', '#15161b'],
  },
  {
    id: 'volcanic',
    order: '10',
    name: 'Zonă vulcanică înghețată',
    file: '/tiles/10.jpg',
    x: UNIT * 4,
    y: UNIT,
    width: UNIT,
    height: UNIT,
    accent: ['#4a3d45', '#181215'],
  },
  {
    id: 'glacier',
    order: '09',
    name: 'Ghețar',
    file: '/tiles/09.jpg',
    x: 0,
    y: MAIN_HEIGHT,
    width: UNIT,
    height: UNIT,
    accent: ['#6f8fa8', '#1c2933'],
  },
  {
    id: 'river',
    order: '05',
    name: 'Râu înghețat',
    file: '/tiles/05.jpg',
    x: UNIT,
    y: MAIN_HEIGHT,
    width: UNIT,
    height: UNIT,
    accent: ['#3a5568', '#0e1920'],
  },
  {
    id: 'crater',
    order: '06',
    name: 'Crater uriaș',
    file: '/tiles/06.jpg',
    x: UNIT * 2,
    y: MAIN_HEIGHT,
    width: UNIT,
    height: UNIT,
    accent: ['#4a4a52', '#16161c'],
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

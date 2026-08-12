// Central configuration for the world grid. Kept separate from rendering
// logic so future systems (buildings, fog of war, expeditions, save/load)
// can read zone metadata without touching camera/render code.

export const TILE_SIZE = 2000;
export const GRID_COLS = 5;
export const GRID_ROWS = 2;

export const WORLD_WIDTH = TILE_SIZE * GRID_COLS;
export const WORLD_HEIGHT = TILE_SIZE * GRID_ROWS;

export const MIN_ZOOM = 0.35;
export const MAX_ZOOM = 2.4;
export const DEFAULT_ZOOM = 0.7;

// Grid layout (col, row), 0-indexed. Arranged so thematically related
// zones sit next to each other and the "main" tile anchors the map.
//
//   row 0:  glacier   mountains   MAIN       forest      industrial
//   row 1:  crater    river       lake       ruins       volcanic
export const ZONES = [
  {
    id: 'main',
    order: '01',
    name: 'Teren înghețat principal',
    file: '/tiles/01.jpg',
    col: 2,
    row: 0,
    accent: ['#3b5470', '#0e1a26'],
  },
  {
    id: 'forest',
    order: '02',
    name: 'Pădure înghețată',
    file: '/tiles/02.jpg',
    col: 3,
    row: 0,
    accent: ['#33475a', '#101820'],
  },
  {
    id: 'mountains',
    order: '03',
    name: 'Zonă montană',
    file: '/tiles/03.jpg',
    col: 1,
    row: 0,
    accent: ['#5b6b7a', '#1a2129'],
  },
  {
    id: 'lake',
    order: '04',
    name: 'Lac înghețat',
    file: '/tiles/04.jpg',
    col: 2,
    row: 1,
    accent: ['#3d5f77', '#0d1b24'],
  },
  {
    id: 'river',
    order: '05',
    name: 'Râu înghețat',
    file: '/tiles/05.jpg',
    col: 1,
    row: 1,
    accent: ['#3a5568', '#0e1920'],
  },
  {
    id: 'crater',
    order: '06',
    name: 'Crater uriaș',
    file: '/tiles/06.jpg',
    col: 0,
    row: 1,
    accent: ['#4a4a52', '#16161c'],
  },
  {
    id: 'industrial',
    order: '07',
    name: 'Zonă industrială abandonată',
    file: '/tiles/07.jpg',
    col: 4,
    row: 0,
    accent: ['#44454a', '#131417'],
  },
  {
    id: 'ruins',
    order: '08',
    name: 'Ruinele unui oraș vechi',
    file: '/tiles/08.jpg',
    col: 3,
    row: 1,
    accent: ['#4b4e56', '#15161b'],
  },
  {
    id: 'glacier',
    order: '09',
    name: 'Ghețar',
    file: '/tiles/09.jpg',
    col: 0,
    row: 0,
    accent: ['#6f8fa8', '#1c2933'],
  },
  {
    id: 'volcanic',
    order: '10',
    name: 'Zonă vulcanică înghețată',
    file: '/tiles/10.jpg',
    col: 4,
    row: 1,
    accent: ['#4a3d45', '#181215'],
  },
];

export function zoneAt(col, row) {
  return ZONES.find((z) => z.col === col && z.row === row) ?? null;
}

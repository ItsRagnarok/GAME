// Central configuration for the world grid. Kept separate from rendering
// logic so future systems (buildings, fog of war, expeditions, save/load)
// can read zone metadata without touching camera/render code.
//
// The world isn't a uniform grid: "main" is the primary map (it already
// depicts a wide establishing view — mountains, a river, cracked ice) so
// it gets a bigger footprint and anchors the world as a central hub. The
// other 9 zones are single-unit tiles arranged around it.

export const UNIT = 2000; // one grid unit, in world px

export const WORLD_WIDTH = UNIT * 5; // 10000
export const WORLD_HEIGHT = UNIT * 3; // 6000

export const MIN_ZOOM = 0.3;
export const MAX_ZOOM = 2.4;
export const DEFAULT_ZOOM = 0.6;

// Camera starts centered on the main hub, not the geometric world center,
// so the primary map is what you see first.
export const DEFAULT_CAMERA = { x: UNIT, y: UNIT };

//   [            MAIN (2x2)             ] mountains  forest      industrial
//   [            MAIN (2x2)             ] lake       ruins       volcanic
//    glacier      river       crater       ·          ·           ·
export const ZONES = [
  {
    id: 'main',
    order: '01',
    name: 'Teren înghețat principal',
    file: '/tiles/01.jpg',
    x: 0,
    y: 0,
    width: UNIT * 2,
    height: UNIT * 2,
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
    y: UNIT * 2,
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
    y: UNIT * 2,
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
    y: UNIT * 2,
    width: UNIT,
    height: UNIT,
    accent: ['#4a4a52', '#16161c'],
  },
];

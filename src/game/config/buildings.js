// Placeable building types. `buildTicks` is how many simulation ticks
// (see logic/simulation.js) construction takes before a building goes
// from "building" (dashed, translucent) to "active" and starts
// producing. `produces` is added to resources every tick once active.

export const BUILDING_TYPES = {
  coalMine: {
    id: 'coalMine',
    name: 'Mină de cărbune',
    icon: '⛏️',
    cost: { wood: 15 },
    buildTicks: 3,
    produces: { coal: 1 },
  },
  sawmill: {
    id: 'sawmill',
    name: 'Gater',
    icon: '🪚',
    cost: { coal: 10 },
    buildTicks: 3,
    produces: { wood: 1 },
  },
  tent: {
    id: 'tent',
    name: 'Adăpost S-01',
    icon: '⛺',
    image: '/buildings/shelter.webp',
    cost: { wood: 10 },
    buildTicks: 2,
    produces: {},
  },
  workshop: {
    id: 'workshop',
    name: 'Atelier',
    icon: '🔧',
    cost: { wood: 20, coal: 10 },
    buildTicks: 4,
    produces: {},
  },
  house: {
    id: 'house',
    name: 'Casă familială',
    icon: '🏠',
    image: '/buildings/house.webp',
    cost: { wood: 25, coal: 5 },
    buildTicks: 3,
    produces: {},
  },
};

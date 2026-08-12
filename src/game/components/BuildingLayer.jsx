import { BUILDING_TYPES } from '../config/buildings';
import { BUILDING_ART } from '../art/BuildingArt';
import { Smoke } from './Smoke';

// Chimney-tip offset (world px, from the building's own x/y) per type, for
// the world-space <Smoke> component — derived from each SVG's own chimney
// coordinates in src/game/art/BuildingArt.jsx, scaled to the 160px stage.
const SMOKE_OFFSET = {
  tent: { x: 36, y: -34 },
  house: { x: 25, y: -43 },
  sawmill: { x: 36, y: -35 },
  workshop: { x: 31, y: -48 },
};

export function BuildingLayer({ buildings }) {
  return (
    <>
      {buildings.map((b) => {
        const def = BUILDING_TYPES[b.type];
        const Art = BUILDING_ART[b.type];
        const size = 160;
        const underConstruction = b.status === 'building';

        return (
          <div
            key={b.id}
            className="absolute flex flex-col items-center"
            style={{ left: b.x - size / 2, top: b.y - size / 2, width: size }}
          >
            {/* Ground-contact shadow shared by every building so they all
                read as sitting on the same surface. */}
            <div
              className="absolute rounded-full bg-black/45 blur-md"
              style={{ width: size * 0.62, height: size * 0.18, top: size * 0.66 }}
            />

            <div
              className="relative flex h-[160px] w-full items-center justify-center transition-opacity duration-700"
              style={{
                opacity: underConstruction ? 0.55 : 1,
                filter: underConstruction
                  ? 'grayscale(0.5) drop-shadow(0 0 10px rgba(0,0,0,0.5))'
                  : 'drop-shadow(0 0 14px rgba(0,0,0,0.55))',
              }}
            >
              {Art && <Art />}
            </div>

            {underConstruction && (
              <div className="frost-panel mt-1 h-1.5 w-20 overflow-hidden rounded-full border-0">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-300 transition-all"
                  style={{ width: `${Math.round((b.progress / def.buildTicks) * 100)}%` }}
                />
              </div>
            )}
          </div>
        );
      })}
      {buildings
        .filter((b) => b.status === 'active' && SMOKE_OFFSET[b.type])
        .map((b) => {
          const off = SMOKE_OFFSET[b.type];
          return <Smoke key={`smoke-${b.id}`} x={b.x + off.x} y={b.y + off.y} scale={1.3} />;
        })}
    </>
  );
}

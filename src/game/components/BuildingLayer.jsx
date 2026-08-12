import { BUILDING_TYPES } from '../config/buildings';
import { BUILDING_ICONS } from '../config/buildingIcons';

export function BuildingLayer({ buildings }) {
  return (
    <>
      {buildings.map((b) => {
        const def = BUILDING_TYPES[b.type];
        const size = 160;
        const underConstruction = b.status === 'building';
        const FallbackIcon = BUILDING_ICONS[b.type];

        return (
          <div
            key={b.id}
            className="absolute flex flex-col items-center"
            style={{ left: b.x - size / 2, top: b.y - size / 2, width: size }}
          >
            {/* Ground-contact shadow shared by every building so they all
                read as sitting on the same surface, regardless of each
                sprite's own (mismatched) source lighting. */}
            <div
              className="absolute rounded-full bg-black/45 blur-md"
              style={{ width: size * 0.62, height: size * 0.18, top: size * 0.66 }}
            />

            {def.image ? (
              <div
                className="relative flex h-[160px] w-full items-center justify-center transition-opacity duration-700"
                style={{ opacity: underConstruction ? 0.55 : 1 }}
              >
                <img
                  src={def.image}
                  alt={def.name}
                  draggable={false}
                  className="absolute select-none"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: size * 1.5,
                    transform: 'translate(-50%, -50%)',
                    maskImage: 'radial-gradient(circle, black 55%, transparent 85%)',
                    WebkitMaskImage: 'radial-gradient(circle, black 55%, transparent 85%)',
                    filter: underConstruction
                      ? 'grayscale(0.5) saturate(0.9) contrast(1.05) drop-shadow(0 0 10px rgba(0,0,0,0.5))'
                      : 'saturate(0.9) contrast(1.05) drop-shadow(0 0 14px rgba(0,0,0,0.55))',
                  }}
                />
              </div>
            ) : (
              <div
                className={`frost-panel relative flex h-[160px] w-full items-center justify-center rounded-lg ${
                  underConstruction ? 'opacity-60' : ''
                }`}
                style={{ borderStyle: underConstruction ? 'dashed' : 'solid' }}
              >
                {FallbackIcon ? <FallbackIcon width={40} height={40} className="text-orange-200/80" /> : null}
              </div>
            )}
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
    </>
  );
}

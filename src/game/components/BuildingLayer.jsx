import { BUILDING_TYPES } from '../config/buildings';

export function BuildingLayer({ buildings }) {
  return (
    <>
      {buildings.map((b) => {
        const def = BUILDING_TYPES[b.type];
        const size = 160;
        const underConstruction = b.status === 'building';

        return (
          <div
            key={b.id}
            className="absolute flex flex-col items-center"
            style={{ left: b.x - size / 2, top: b.y - size / 2, width: size }}
          >
            {def.image ? (
              <div
                className="relative flex h-[160px] w-full items-center justify-center"
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
                      ? 'grayscale(0.4) drop-shadow(0 0 10px rgba(0,0,0,0.5))'
                      : 'drop-shadow(0 0 14px rgba(0,0,0,0.55))',
                  }}
                />
              </div>
            ) : (
              <div
                className={`flex h-[160px] w-full items-center justify-center rounded-lg border text-4xl backdrop-blur-sm ${
                  underConstruction
                    ? 'border-dashed border-white/30 bg-white/5 opacity-60'
                    : 'border-white/20 bg-black/30'
                }`}
              >
                {def.icon}
              </div>
            )}
            {underConstruction && (
              <div className="mt-1 h-1 w-20 overflow-hidden rounded-full bg-black/40">
                <div
                  className="h-full bg-orange-400 transition-all"
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

import { useMemo } from 'react';

const PUFF_COUNT = 5;

/**
 * A handful of CSS-animated puffs rising and dissolving from a chimney
 * point. Lives in world space (positioned like everything else via
 * x/y), so it pans and zooms with the map instead of sitting fixed on
 * the viewport. This is the difference between a painting and a place —
 * the static art doesn't change, but something above it is always moving.
 */
export function Smoke({ x, y, scale = 1, intensity = 1 }) {
  const puffs = useMemo(
    () =>
      Array.from({ length: PUFF_COUNT }, (_, i) => ({
        id: i,
        delay: (i / PUFF_COUNT) * 4.2,
        drift: (Math.random() - 0.5) * 50,
        size: 22 + Math.random() * 16,
        duration: 3.6 + Math.random() * 1.4,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute" style={{ left: x, top: y, width: 0, height: 0, opacity: intensity }}>
      {puffs.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full blur-[3px]"
          style={{
            left: (-p.size * scale) / 2,
            top: (-p.size * scale) / 2,
            width: p.size * scale,
            height: p.size * scale,
            background: 'radial-gradient(circle, rgba(30,33,40,0.9) 0%, rgba(225,229,234,0.75) 50%, transparent 100%)',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            animation: `frost-smoke-rise ${p.duration}s ease-out infinite`,
            animationDelay: `${p.delay}s`,
            '--driftx': `${p.drift * scale}px`,
          }}
        />
      ))}
    </div>
  );
}

import { useMemo } from 'react';

// Cheap CSS-only snowfall so the scene has some life beyond static art —
// pointer-events none, fixed to the viewport (not the world transform),
// so it never affects camera/tap logic.
const FLAKE_COUNT = 42;

export function SnowOverlay() {
  const flakes = useMemo(
    () =>
      Array.from({ length: FLAKE_COUNT }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 1.5 + Math.random() * 2.5,
        duration: 9 + Math.random() * 12,
        delay: -Math.random() * 20,
        drift: `${(Math.random() - 0.5) * 80}px`,
        opacity: 0.25 + Math.random() * 0.4,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {flakes.map((f) => (
        <div
          key={f.id}
          className="absolute top-0 rounded-full bg-white"
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            filter: 'blur(0.3px)',
            animation: `frost-snow-fall ${f.duration}s linear infinite`,
            animationDelay: `${f.delay}s`,
            '--drift': f.drift,
          }}
        />
      ))}
    </div>
  );
}

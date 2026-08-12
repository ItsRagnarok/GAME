import { useState } from 'react';

/**
 * Single world tile. Renders the zone's terrain image when present in
 * /public/tiles, and falls back to a themed gradient placeholder (with
 * the zone name) so the world still reads correctly before real art is
 * dropped in. Zones aren't a uniform grid — each has its own x/y/width/
 * height, so the "main" hub can be larger than the surrounding zones.
 */
export function TerrainTile({ zone }) {
  const [failed, setFailed] = useState(false);
  const [x1, x2] = zone.accent;

  return (
    <div
      className="absolute overflow-hidden"
      style={{
        left: zone.x,
        top: zone.y,
        width: zone.width,
        height: zone.height,
      }}
    >
      {!failed ? (
        <img
          src={zone.file}
          alt=""
          draggable={false}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover select-none"
          style={{ filter: 'saturate(0.8) brightness(0.68) contrast(1.08)' }}
        />
      ) : (
        <div
          className="flex h-full w-full items-end justify-start p-10"
          style={{
            background: `radial-gradient(120% 120% at 30% 20%, ${x1} 0%, ${x2} 70%)`,
          }}
        >
          <span className="font-mono text-2xl tracking-wide text-white/25">
            {zone.order} · {zone.name}
          </span>
        </div>
      )}

      {/* Cold cast so every tile shares one light temperature instead of
          each photo's own white balance — mix-blend keeps the underlying
          detail instead of flattening it the way hue-rotate did. */}
      <div className="pointer-events-none absolute inset-0 bg-[#2b4a6e] mix-blend-color opacity-30" />

      {/* soft inner shadow so every tile blends into its neighbors instead
          of reading as a hard-edged image */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_90px_rgba(5,8,12,0.55)]" />
    </div>
  );
}

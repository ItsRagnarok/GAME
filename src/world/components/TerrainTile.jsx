import { useState } from 'react';
import { TILE_SIZE } from '../config/worldConfig';

/**
 * Single world tile. Renders the zone's terrain image when present in
 * /public/tiles, and falls back to a themed gradient placeholder (with
 * the zone name) so the world still reads correctly before real art is
 * dropped in.
 */
export function TerrainTile({ zone }) {
  const [failed, setFailed] = useState(false);
  const [x1, x2] = zone.accent;

  return (
    <div
      className="absolute overflow-hidden"
      style={{
        left: zone.col * TILE_SIZE,
        top: zone.row * TILE_SIZE,
        width: TILE_SIZE,
        height: TILE_SIZE,
      }}
    >
      {!failed ? (
        <img
          src={zone.file}
          alt=""
          draggable={false}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover select-none"
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

      {/* soft inner shadow so every tile blends into its neighbors instead
          of reading as a hard-edged image */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_140px_70px_rgba(5,8,12,0.4)]" />
    </div>
  );
}

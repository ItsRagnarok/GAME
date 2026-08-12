import { ZONE_ART } from '../art/ZoneArt';

/**
 * Single world tile. Renders the zone's hand-authored vector art
 * (src/world/art/ZoneArt.jsx) — no photo asset, no load state. Zones
 * aren't a uniform grid — each has its own x/y/width/height, so the
 * "main" hub can be larger than the surrounding zones.
 */
export function TerrainTile({ zone }) {
  const ZoneArt = ZONE_ART[zone.id];

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
      {ZoneArt && <ZoneArt />}

      {/* soft inner shadow so every tile blends into its neighbors instead
          of reading as a hard-edged image */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_90px_rgba(5,8,12,0.55)]" />
    </div>
  );
}

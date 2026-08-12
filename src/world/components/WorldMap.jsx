import { ZONES, WORLD_WIDTH, WORLD_HEIGHT } from '../config/worldConfig';
import { useWorldCamera } from '../hooks/useWorldCamera';
import { TerrainTile } from './TerrainTile';
import { Hud } from './Hud';
import { FullscreenButton } from './FullscreenButton';

export function WorldMap() {
  const { viewportRef, worldRef, cameraRef } = useWorldCamera();

  return (
    <div ref={viewportRef} className="relative h-full w-full cursor-grab touch-none bg-[#05070a] active:cursor-grabbing">
      <div
        ref={worldRef}
        className="absolute left-0 top-0 origin-top-left will-change-transform"
        style={{ width: WORLD_WIDTH, height: WORLD_HEIGHT }}
      >
        {ZONES.map((zone) => (
          <TerrainTile key={zone.id} zone={zone} />
        ))}
      </div>

      {/* Cinematic cold atmosphere — fixed to the viewport, never transformed. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a1420]/25 via-transparent to-[#05070a]/55" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(120%_100%_at_50%_40%,transparent_55%,rgba(3,5,8,0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />

      <Hud cameraRef={cameraRef} />
      <FullscreenButton />
    </div>
  );
}

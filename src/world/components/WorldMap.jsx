import { useState } from 'react';
import { ZONES, MAIN_ZONE, WORLD_WIDTH, WORLD_HEIGHT, findZoneAt } from '../config/worldConfig';
import { useWorldCamera } from '../hooks/useWorldCamera';
import { TerrainTile } from './TerrainTile';
import { DeepZoomLayer } from './DeepZoomLayer';
import { ZoneSeams } from './ZoneSeams';
import { Hud } from './Hud';
import { FullscreenButton } from './FullscreenButton';
import { useGameState } from '../../game/state/gameStore';
import { useGameClock } from '../../game/hooks/useGameClock';
import { placeBuilding } from '../../game/logic/simulation';
import { GameLayer } from '../../game/components/GameLayer';
import { ResourceBar } from '../../game/components/ResourceBar';
import { BuildMenu } from '../../game/components/BuildMenu';
import { ExpeditionPanel } from '../../game/components/ExpeditionPanel';

export function WorldMap() {
  const game = useGameState();
  useGameClock();

  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [expeditionZoneId, setExpeditionZoneId] = useState(null);

  function handleTap(worldX, worldY) {
    const zone = findZoneAt(worldX, worldY);
    if (!zone) {
      setSelectedBuilding(null);
      return;
    }

    if (zone.id === 'main') {
      if (selectedBuilding) {
        placeBuilding(worldX, worldY, selectedBuilding);
        setSelectedBuilding(null);
      }
      return;
    }

    setExpeditionZoneId(zone.id);
  }

  const { viewportRef, worldRef, cameraRef } = useWorldCamera({ onTap: handleTap });

  return (
    <div ref={viewportRef} className="relative h-full w-full cursor-grab touch-none bg-[#05070a] active:cursor-grabbing">
      <div
        ref={worldRef}
        className="absolute left-0 top-0 origin-top-left will-change-transform"
        style={{ width: WORLD_WIDTH, height: WORLD_HEIGHT }}
      >
        {ZONES.map((zone) =>
          zone.id === 'main' ? null : <TerrainTile key={zone.id} zone={zone} />,
        )}
        {/* Main hub renders as a tile pyramid (see public/deep-map + scripts/
            generate_deep_zoom.py) instead of one flat image, so it stays
            sharp at any zoom instead of one fixed-resolution <img> stretching
            blurrily across the whole hub. */}
        <DeepZoomLayer
          baseUrl="/deep-map"
          worldX={MAIN_ZONE.x}
          worldY={MAIN_ZONE.y}
          worldWidth={MAIN_ZONE.width}
          worldHeight={MAIN_ZONE.height}
          cameraRef={cameraRef}
          viewportRef={viewportRef}
        />
        <ZoneSeams />
        <GameLayer game={game} />
      </div>

      {/* Cinematic cold atmosphere — fixed to the viewport, never transformed. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a1420]/25 via-transparent to-[#05070a]/55" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(120%_100%_at_50%_40%,transparent_55%,rgba(3,5,8,0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />

      <ResourceBar game={game} />
      <BuildMenu selected={selectedBuilding} onSelect={setSelectedBuilding} resources={game.resources} />
      {expeditionZoneId && (
        <ExpeditionPanel zoneId={expeditionZoneId} game={game} onClose={() => setExpeditionZoneId(null)} />
      )}

      <Hud cameraRef={cameraRef} />
      <FullscreenButton />
    </div>
  );
}

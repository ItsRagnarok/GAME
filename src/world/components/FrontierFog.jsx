import { GENERATOR_POSITION } from '../config/worldConfig';

// Real Frostpunk never shows the frontier as a clean grid of postcards —
// everything past the walls sits in mist, and you only really see detail
// close to a point of interest. This is the same idea: a radial haze in
// world space, centered on the hub, that thickens with distance. It's
// what actually hides the "9 separate stock photos" seam that survives
// at low zoom no matter how well the tile edges are blended.
const CLEAR_RADIUS = 2700; // hub stays fully readable within this
const FADE_RADIUS = 5600; // by here the haze is at its max
const MAX_FOG = 'rgba(8,13,20,0.72)';

export function FrontierFog() {
  return (
    <div
      className="pointer-events-none absolute left-0 top-0"
      style={{
        width: '100%',
        height: '100%',
        background: `radial-gradient(circle at ${GENERATOR_POSITION.x}px ${GENERATOR_POSITION.y}px, transparent 0px, transparent ${CLEAR_RADIUS}px, ${MAX_FOG} ${FADE_RADIUS}px)`,
      }}
    />
  );
}

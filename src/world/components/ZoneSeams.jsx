import { GRID_COLS, GRID_ROWS, TILE_SIZE, WORLD_WIDTH, WORLD_HEIGHT } from '../config/worldConfig';

const BAND = 340; // world units wide, centered on each internal grid line
const FOG = 'rgba(9,13,20,0.65)';

/**
 * Soft fog bands laid over every internal tile boundary, in world space,
 * so they pan/zoom perfectly in sync with the terrain instead of feeling
 * like a fixed screen overlay. Turns hard tile edges into a deliberate
 * "mist between zones" transition.
 */
export function ZoneSeams() {
  const verticalLines = [];
  for (let col = 1; col < GRID_COLS; col += 1) {
    verticalLines.push(col * TILE_SIZE);
  }

  const horizontalLines = [];
  for (let row = 1; row < GRID_ROWS; row += 1) {
    horizontalLines.push(row * TILE_SIZE);
  }

  return (
    <>
      {verticalLines.map((x) => (
        <div
          key={`v-${x}`}
          className="pointer-events-none absolute top-0"
          style={{
            left: x - BAND / 2,
            width: BAND,
            height: WORLD_HEIGHT,
            background: `linear-gradient(to right, transparent, ${FOG}, transparent)`,
          }}
        />
      ))}
      {horizontalLines.map((y) => (
        <div
          key={`h-${y}`}
          className="pointer-events-none absolute left-0"
          style={{
            top: y - BAND / 2,
            height: BAND,
            width: WORLD_WIDTH,
            background: `linear-gradient(to bottom, transparent, ${FOG}, transparent)`,
          }}
        />
      ))}
    </>
  );
}

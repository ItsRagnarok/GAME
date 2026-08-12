import { ZONES } from '../config/worldConfig';

const BAND = 340; // world units wide, centered on each shared edge
const FOG = 'rgba(9,13,20,0.65)';

/**
 * Soft fog bands laid over every edge shared by two zones, in world
 * space, so they pan/zoom perfectly in sync with the terrain. Zones
 * aren't a uniform grid (the main hub is bigger than the rest), so
 * adjacency is computed geometrically instead of from grid indices —
 * this keeps it correct no matter how the layout changes later.
 */
function findSeams(zones) {
  const vertical = [];
  const horizontal = [];

  for (let i = 0; i < zones.length; i += 1) {
    for (let j = i + 1; j < zones.length; j += 1) {
      const a = zones[i];
      const b = zones[j];

      // Shared vertical edge: a's right touches b's left (or vice versa),
      // and their y-ranges overlap.
      const aRight = a.x + a.width;
      const bRight = b.x + b.width;
      if (aRight === b.x || bRight === a.x) {
        const top = Math.max(a.y, b.y);
        const bottom = Math.min(a.y + a.height, b.y + b.height);
        if (bottom > top) {
          vertical.push({ x: aRight === b.x ? aRight : bRight, top, bottom });
        }
      }

      // Shared horizontal edge: a's bottom touches b's top (or vice versa).
      const aBottom = a.y + a.height;
      const bBottom = b.y + b.height;
      if (aBottom === b.y || bBottom === a.y) {
        const left = Math.max(a.x, b.x);
        const right = Math.min(a.x + a.width, b.x + b.width);
        if (right > left) {
          horizontal.push({ y: aBottom === b.y ? aBottom : bBottom, left, right });
        }
      }
    }
  }

  return { vertical, horizontal };
}

export function ZoneSeams() {
  const { vertical, horizontal } = findSeams(ZONES);

  return (
    <>
      {vertical.map((seam, i) => (
        <div
          key={`v-${i}`}
          className="pointer-events-none absolute"
          style={{
            left: seam.x - BAND / 2,
            top: seam.top,
            width: BAND,
            height: seam.bottom - seam.top,
            background: `linear-gradient(to right, transparent, ${FOG}, transparent)`,
          }}
        />
      ))}
      {horizontal.map((seam, i) => (
        <div
          key={`h-${i}`}
          className="pointer-events-none absolute"
          style={{
            left: seam.left,
            top: seam.y - BAND / 2,
            width: seam.right - seam.left,
            height: BAND,
            background: `linear-gradient(to bottom, transparent, ${FOG}, transparent)`,
          }}
        />
      ))}
    </>
  );
}

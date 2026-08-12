import { useEffect, useRef } from 'react';
import { WORLD_WIDTH, WORLD_HEIGHT } from '../config/worldConfig';

/**
 * Minimal, unobtrusive readout of zoom level and approximate camera
 * position. Reads the camera ref directly on a throttled rAF loop so it
 * never triggers React re-renders of the world itself.
 */
export function Hud({ cameraRef }) {
  const zoomLabelRef = useRef(null);
  const posLabelRef = useRef(null);

  useEffect(() => {
    let rafId;
    let frame = 0;

    function loop() {
      frame += 1;
      if (frame % 6 === 0) {
        const { x, y, zoom } = cameraRef.current;
        const px = Math.round((x / WORLD_WIDTH) * 100);
        const py = Math.round((y / WORLD_HEIGHT) * 100);
        if (zoomLabelRef.current) zoomLabelRef.current.textContent = `${Math.round(zoom * 100)}%`;
        if (posLabelRef.current) posLabelRef.current.textContent = `${px}, ${py}`;
      }
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [cameraRef]);

  return (
    <div className="frost-panel pointer-events-none absolute bottom-4 left-4 hidden select-none rounded-md px-2.5 py-1.5 frost-label text-[10px] text-white/45 sm:block">
      <div>
        ZOOM <span ref={zoomLabelRef}>70%</span>
      </div>
      <div>
        SECTOR <span ref={posLabelRef}>50, 50</span>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';

const UPDATE_MS = 200; // tile/level recompute cadence — pan itself still updates every frame via CSS transform

/**
 * Renders one large source image as a multi-resolution tile pyramid
 * (same technique as Google Maps / OpenSeadragon), placed at a fixed
 * world-space rectangle. Only the tiles actually on screen are mounted,
 * at the resolution level closest to native screen pixels — so the
 * image stays sharp at any zoom instead of the browser blurrily
 * upscaling one fixed-size <img>.
 *
 * Panning/zooming itself is free (handled by the parent's CSS
 * transform, like every other world-space layer); this component only
 * needs to react when the *set of visible tiles* changes, so it polls
 * the camera on a slow interval rather than every animation frame.
 */
export function DeepZoomLayer({ baseUrl, worldX, worldY, worldWidth, worldHeight, cameraRef, viewportRef }) {
  const [manifest, setManifest] = useState(null);
  const [tiles, setTiles] = useState([]);
  const tileKeyRef = useRef('');

  useEffect(() => {
    let cancelled = false;
    fetch(`${baseUrl}/manifest.json`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setManifest(data);
      });
    return () => {
      cancelled = true;
    };
  }, [baseUrl]);

  useEffect(() => {
    if (!manifest) return;

    function update() {
      const viewport = viewportRef.current;
      const camera = cameraRef.current;
      if (!viewport || !camera) return;

      const vw = viewport.clientWidth;
      const vh = viewport.clientHeight;

      // Visible world-space rect.
      const halfW = vw / 2 / camera.zoom;
      const halfH = vh / 2 / camera.zoom;
      const viewLeft = camera.x - halfW;
      const viewRight = camera.x + halfW;
      const viewTop = camera.y - halfH;
      const viewBottom = camera.y + halfH;

      // No overlap with this image's world-space footprint at all.
      if (viewRight < worldX || viewLeft > worldX + worldWidth || viewBottom < worldY || viewTop > worldY + worldHeight) {
        if (tileKeyRef.current !== 'none') {
          tileKeyRef.current = 'none';
          setTiles([]);
        }
        return;
      }

      // Separate X/Y conversion factors: the world footprint this image is
      // stretched into doesn't necessarily share the source's aspect ratio.
      const worldUnitPerNativePxX = worldWidth / manifest.nativeWidth;
      const worldUnitPerNativePxY = worldHeight / manifest.nativeHeight;
      const screenPxPerNativePx = camera.zoom * Math.max(worldUnitPerNativePxX, worldUnitPerNativePxY);

      let level = manifest.levels - 1;
      for (let l = 0; l < manifest.levels; l += 1) {
        const [lw] = manifest.levelSizes[l];
        const levelScale = lw / manifest.nativeWidth;
        if (levelScale >= screenPxPerNativePx) {
          level = l;
          break;
        }
      }

      const [levelW, levelH] = manifest.levelSizes[level];

      // Clip the visible rect to the image, then convert to this level's pixels.
      const clipLeft = Math.max(viewLeft, worldX);
      const clipRight = Math.min(viewRight, worldX + worldWidth);
      const clipTop = Math.max(viewTop, worldY);
      const clipBottom = Math.min(viewBottom, worldY + worldHeight);

      const pxLeft = ((clipLeft - worldX) / worldWidth) * levelW;
      const pxRight = ((clipRight - worldX) / worldWidth) * levelW;
      const pxTop = ((clipTop - worldY) / worldHeight) * levelH;
      const pxBottom = ((clipBottom - worldY) / worldHeight) * levelH;

      const { tileSize } = manifest;
      const colStart = Math.max(0, Math.floor(pxLeft / tileSize));
      const colEnd = Math.min(Math.ceil(levelW / tileSize) - 1, Math.floor((pxRight - 1) / tileSize));
      const rowStart = Math.max(0, Math.floor(pxTop / tileSize));
      const rowEnd = Math.min(Math.ceil(levelH / tileSize) - 1, Math.floor((pxBottom - 1) / tileSize));

      const key = `${level}:${colStart}-${colEnd}:${rowStart}-${rowEnd}`;
      if (key === tileKeyRef.current) return;
      tileKeyRef.current = key;

      // World size of one full tile, clamped at the image edge (last
      // col/row in a level is usually a partial tile).
      const tileWorldW = (tileSize / levelW) * worldWidth;
      const tileWorldH = (tileSize / levelH) * worldHeight;

      const next = [];
      for (let row = rowStart; row <= rowEnd; row += 1) {
        for (let col = colStart; col <= colEnd; col += 1) {
          const tilePxW = Math.min(tileSize, levelW - col * tileSize);
          const tilePxH = Math.min(tileSize, levelH - row * tileSize);
          next.push({
            level,
            col,
            row,
            left: worldX + col * tileWorldW,
            top: worldY + row * tileWorldH,
            width: (tilePxW / tileSize) * tileWorldW,
            height: (tilePxH / tileSize) * tileWorldH,
          });
        }
      }
      setTiles(next);
    }

    update();
    const id = setInterval(update, UPDATE_MS);
    return () => clearInterval(id);
  }, [manifest, baseUrl, worldX, worldY, worldWidth, worldHeight, cameraRef, viewportRef]);

  if (!manifest) return null;

  return (
    <>
      {tiles.map((t) => (
        <img
          key={`${t.level}-${t.col}-${t.row}`}
          src={`${baseUrl}/${t.level}/${t.col}_${t.row}.jpg`}
          alt=""
          draggable={false}
          className="absolute select-none"
          style={{ left: t.left, top: t.top, width: t.width + 1, height: t.height + 1 }}
        />
      ))}
    </>
  );
}

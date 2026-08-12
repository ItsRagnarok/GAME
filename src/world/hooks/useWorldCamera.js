import { useEffect, useRef } from 'react';
import {
  WORLD_WIDTH,
  WORLD_HEIGHT,
  MIN_ZOOM,
  MAX_ZOOM,
  DEFAULT_ZOOM,
} from '../config/worldConfig';

const KEY_VECTORS = {
  w: [0, -1],
  arrowup: [0, -1],
  s: [0, 1],
  arrowdown: [0, 1],
  a: [-1, 0],
  arrowleft: [-1, 0],
  d: [1, 0],
  arrowright: [1, 0],
};

const KEYBOARD_SPEED = 900; // world units / second at zoom = 1
const WHEEL_SENSITIVITY = 0.0018;
const FRICTION = 0.9;
const MIN_VELOCITY = 2;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Imperative camera engine: pan (keyboard / drag / touch), zoom
 * (wheel / pinch), inertia on release, and clamping to world bounds.
 * Applies transforms directly to the DOM each frame instead of going
 * through React state, so panning/zooming stays smooth regardless of
 * render cost elsewhere in the tree.
 */
export function useWorldCamera() {
  const viewportRef = useRef(null);
  const worldRef = useRef(null);

  const cameraRef = useRef({
    x: WORLD_WIDTH / 2,
    y: WORLD_HEIGHT / 2,
    zoom: DEFAULT_ZOOM,
  });

  useEffect(() => {
    const viewport = viewportRef.current;
    const world = worldRef.current;
    if (!viewport || !world) return;

    const camera = cameraRef.current;
    const size = { w: viewport.clientWidth, h: viewport.clientHeight };
    const pressedKeys = new Set();
    const velocity = { x: 0, y: 0 };

    const drag = { active: false, pointerId: null, lastX: 0, lastY: 0 };
    const pinch = { active: false, startDist: 0, startZoom: 1 };
    const pointers = new Map();

    let rafId = null;
    let lastTime = performance.now();

    function clampCamera() {
      camera.zoom = clamp(camera.zoom, MIN_ZOOM, MAX_ZOOM);

      const halfViewW = size.w / 2 / camera.zoom;
      const halfViewH = size.h / 2 / camera.zoom;

      if (halfViewW * 2 >= WORLD_WIDTH) {
        camera.x = WORLD_WIDTH / 2;
      } else {
        camera.x = clamp(camera.x, halfViewW, WORLD_WIDTH - halfViewW);
      }

      if (halfViewH * 2 >= WORLD_HEIGHT) {
        camera.y = WORLD_HEIGHT / 2;
      } else {
        camera.y = clamp(camera.y, halfViewH, WORLD_HEIGHT - halfViewH);
      }
    }

    function applyTransform() {
      const tx = size.w / 2 - camera.x * camera.zoom;
      const ty = size.h / 2 - camera.y * camera.zoom;
      world.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${camera.zoom})`;
    }

    function zoomAround(screenX, screenY, nextZoom) {
      const worldX = camera.x + (screenX - size.w / 2) / camera.zoom;
      const worldY = camera.y + (screenY - size.h / 2) / camera.zoom;
      const clamped = clamp(nextZoom, MIN_ZOOM, MAX_ZOOM);
      camera.x = worldX - (screenX - size.w / 2) / clamped;
      camera.y = worldY - (screenY - size.h / 2) / clamped;
      camera.zoom = clamped;
      clampCamera();
      applyTransform();
    }

    function onResize() {
      size.w = viewport.clientWidth;
      size.h = viewport.clientHeight;
      clampCamera();
      applyTransform();
    }

    function tick(now) {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      let moved = false;

      if (pressedKeys.size > 0) {
        let vx = 0;
        let vy = 0;
        pressedKeys.forEach((key) => {
          const vec = KEY_VECTORS[key];
          if (vec) {
            vx += vec[0];
            vy += vec[1];
          }
        });
        const len = Math.hypot(vx, vy) || 1;
        const speed = KEYBOARD_SPEED / camera.zoom;
        camera.x += (vx / len) * speed * dt;
        camera.y += (vy / len) * speed * dt;
        moved = true;
      } else if (Math.hypot(velocity.x, velocity.y) > MIN_VELOCITY) {
        camera.x += velocity.x * dt;
        camera.y += velocity.y * dt;
        velocity.x *= FRICTION;
        velocity.y *= FRICTION;
        moved = true;
      }

      if (moved) {
        clampCamera();
        applyTransform();
      }

      rafId = requestAnimationFrame(tick);
    }

    function onKeyDown(e) {
      const key = e.key.toLowerCase();
      if (KEY_VECTORS[key]) {
        pressedKeys.add(key);
        velocity.x = 0;
        velocity.y = 0;
      }
    }

    function onKeyUp(e) {
      pressedKeys.delete(e.key.toLowerCase());
    }

    function onWheel(e) {
      e.preventDefault();
      const rect = viewport.getBoundingClientRect();
      const factor = Math.exp(-e.deltaY * WHEEL_SENSITIVITY);
      zoomAround(e.clientX - rect.left, e.clientY - rect.top, camera.zoom * factor);
    }

    function onPointerDown(e) {
      viewport.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.size === 1) {
        drag.active = true;
        drag.pointerId = e.pointerId;
        drag.lastX = e.clientX;
        drag.lastY = e.clientY;
        velocity.x = 0;
        velocity.y = 0;
      } else if (pointers.size === 2) {
        drag.active = false;
        const pts = [...pointers.values()];
        pinch.active = true;
        pinch.startDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) || 1;
        pinch.startZoom = camera.zoom;
      }
    }

    function onPointerMove(e) {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pinch.active && pointers.size === 2) {
        const pts = [...pointers.values()];
        const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) || 1;
        const rect = viewport.getBoundingClientRect();
        const midX = (pts[0].x + pts[1].x) / 2 - rect.left;
        const midY = (pts[0].y + pts[1].y) / 2 - rect.top;
        const nextZoom = pinch.startZoom * (dist / pinch.startDist);
        zoomAround(midX, midY, nextZoom);
        return;
      }

      if (drag.active && e.pointerId === drag.pointerId) {
        const dx = e.clientX - drag.lastX;
        const dy = e.clientY - drag.lastY;
        camera.x -= dx / camera.zoom;
        camera.y -= dy / camera.zoom;
        velocity.x = -dx / camera.zoom / (1 / 60);
        velocity.y = -dy / camera.zoom / (1 / 60);
        drag.lastX = e.clientX;
        drag.lastY = e.clientY;
        clampCamera();
        applyTransform();
      }
    }

    function endPointer(e) {
      pointers.delete(e.pointerId);
      if (e.pointerId === drag.pointerId) {
        drag.active = false;
        drag.pointerId = null;
      }
      if (pointers.size < 2) {
        pinch.active = false;
      }
      if (pointers.size === 1) {
        const [remaining] = pointers.values();
        const [id] = pointers.keys();
        drag.active = true;
        drag.pointerId = id;
        drag.lastX = remaining.x;
        drag.lastY = remaining.y;
      }
    }

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(viewport);

    viewport.addEventListener('wheel', onWheel, { passive: false });
    viewport.addEventListener('pointerdown', onPointerDown);
    viewport.addEventListener('pointermove', onPointerMove);
    viewport.addEventListener('pointerup', endPointer);
    viewport.addEventListener('pointercancel', endPointer);
    viewport.addEventListener('pointerleave', endPointer);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    clampCamera();
    applyTransform();
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      viewport.removeEventListener('wheel', onWheel);
      viewport.removeEventListener('pointerdown', onPointerDown);
      viewport.removeEventListener('pointermove', onPointerMove);
      viewport.removeEventListener('pointerup', endPointer);
      viewport.removeEventListener('pointercancel', endPointer);
      viewport.removeEventListener('pointerleave', endPointer);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return { viewportRef, worldRef, cameraRef };
}

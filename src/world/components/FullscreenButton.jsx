import { useRef } from 'react';
import { useFullscreen } from '../hooks/useFullscreen';

export function FullscreenButton() {
  const rootRef = useRef(document.documentElement);
  const { isFullscreen, toggle } = useFullscreen(rootRef);

  return (
    <button
      type="button"
      onClick={toggle}
      data-game-ui
      aria-label={isFullscreen ? 'Ieși din fullscreen' : 'Fullscreen'}
      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-black/30 text-white/60 backdrop-blur-sm transition-colors hover:bg-black/50 hover:text-white/90"
    >
      {isFullscreen ? (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 4v3a2 2 0 0 1-2 2H4M20 9h-3a2 2 0 0 1-2-2V4M4 15h3a2 2 0 0 1 2 2v3M15 20v-3a2 2 0 0 1 2-2h3" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 9V6a2 2 0 0 1 2-2h3M20 9V6a2 2 0 0 1-2-2h-3M4 15v3a2 2 0 0 0 2 2h3M20 15v3a2 2 0 0 1-2 2h-3" />
        </svg>
      )}
    </button>
  );
}

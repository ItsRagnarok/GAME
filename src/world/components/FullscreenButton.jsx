import { useRef } from 'react';
import { useFullscreen } from '../hooks/useFullscreen';
import { IconCollapse, IconExpand } from '../../game/components/icons';

export function FullscreenButton() {
  const rootRef = useRef(document.documentElement);
  const { isFullscreen, toggle } = useFullscreen(rootRef);

  return (
    <button
      type="button"
      onClick={toggle}
      data-game-ui
      aria-label={isFullscreen ? 'Ieși din fullscreen' : 'Fullscreen'}
      className="frost-panel absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-md text-white/60 transition-colors hover:text-orange-200"
    >
      {isFullscreen ? <IconCollapse width={16} height={16} /> : <IconExpand width={16} height={16} />}
    </button>
  );
}

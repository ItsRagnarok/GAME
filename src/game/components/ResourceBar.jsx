import { useEffect, useRef, useState } from 'react';
import { IconClock, IconThermometer, IconCoal, IconWood } from './icons';

function useFlashKey(value) {
  const prev = useRef(value);
  const [flashKey, setFlashKey] = useState(0);

  useEffect(() => {
    if (prev.current !== value) {
      prev.current = value;
      setFlashKey((k) => k + 1);
    }
  }, [value]);

  return flashKey;
}

function Stat({ icon, value, tone, flashKey }) {
  return (
    <span className="flex items-center gap-1.5">
      {icon}
      <span key={flashKey} className={`tabular-nums ${flashKey ? 'frost-value-changed' : ''} ${tone || ''}`}>
        {value}
      </span>
    </span>
  );
}

export function ResourceBar({ game }) {
  const coalFlash = useFlashKey(game.resources.coal);
  const woodFlash = useFlashKey(game.resources.wood);

  return (
    <div className="frost-panel pointer-events-none absolute left-1/2 top-4 flex max-w-[94vw] -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full px-3.5 py-2 frost-label text-[10px] text-white/80 sm:gap-4 sm:px-5 sm:py-2.5 sm:text-[11px]">
      <span className="flex items-center gap-1.5 text-white/60">
        <IconClock className="text-orange-200/70" />
        <span className="hidden sm:inline">Ziua {game.day} · {String(game.hour).padStart(2, '0')}:00</span>
        <span className="sm:hidden">Z{game.day} · {String(game.hour).padStart(2, '0')}:00</span>
      </span>
      <span className="frost-divider" />
      <Stat
        icon={<IconThermometer className={game.temperature < -15 ? 'text-sky-300' : 'text-orange-300/80'} />}
        value={`${game.temperature}°C`}
        tone={game.temperature < -15 ? 'text-sky-300' : ''}
      />
      <span className="frost-divider" />
      <Stat icon={<IconCoal className="text-neutral-400" />} value={game.resources.coal} flashKey={coalFlash} />
      <Stat icon={<IconWood className="text-amber-600" />} value={game.resources.wood} flashKey={woodFlash} />
    </div>
  );
}

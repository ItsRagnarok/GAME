import { BUILDING_TYPES } from '../config/buildings';

const COST_ICONS = { coal: '⛏️', wood: '🪵' };

export function BuildMenu({ selected, onSelect, resources }) {
  return (
    <div
      data-game-ui
      className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-xl border border-white/10 bg-black/40 p-2 backdrop-blur-sm"
    >
      {Object.values(BUILDING_TYPES).map((def) => {
        const affordable = Object.entries(def.cost).every(([key, amount]) => (resources[key] || 0) >= amount);
        const isSelected = selected === def.id;

        return (
          <button
            key={def.id}
            type="button"
            disabled={!affordable}
            onClick={() => onSelect(isSelected ? null : def.id)}
            className={`flex flex-col items-center rounded-lg px-3 py-2 text-xs transition-colors ${
              isSelected ? 'bg-orange-500/30 ring-1 ring-orange-300' : 'hover:bg-white/10'
            } ${!affordable ? 'opacity-30' : ''}`}
          >
            <span className="text-2xl">{def.icon}</span>
            <span className="mt-1 whitespace-nowrap text-white/70">{def.name}</span>
            <span className="text-[10px] text-white/40">
              {Object.entries(def.cost)
                .map(([key, amount]) => `${amount}${COST_ICONS[key]}`)
                .join(' ')}
            </span>
          </button>
        );
      })}
      {selected && (
        <div className="ml-2 max-w-[8rem] text-[11px] leading-tight text-orange-300/80">
          Click pe hartă, lângă generator
        </div>
      )}
    </div>
  );
}

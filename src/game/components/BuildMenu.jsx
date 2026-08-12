import { BUILDING_TYPES } from '../config/buildings';
import { BUILDING_ART } from '../art/BuildingArt';
import { IconCoal, IconWood } from './icons';

const COST_ICONS = { coal: IconCoal, wood: IconWood };

export function BuildMenu({ selected, onSelect, resources }) {
  return (
    <div
      data-game-ui
      className="frost-panel absolute bottom-4 left-1/2 flex max-w-[94vw] -translate-x-1/2 items-center gap-1 overflow-x-auto rounded-xl p-2"
    >
      {Object.values(BUILDING_TYPES).map((def) => {
        const affordable = Object.entries(def.cost).every(([key, amount]) => (resources[key] || 0) >= amount);
        const isSelected = selected === def.id;
        const Art = BUILDING_ART[def.id];

        return (
          <button
            key={def.id}
            type="button"
            disabled={!affordable}
            onClick={() => onSelect(isSelected ? null : def.id)}
            className={`flex flex-shrink-0 flex-col items-center rounded-lg px-3 py-2 text-xs transition-all active:scale-95 ${
              isSelected ? 'bg-orange-500/25 ring-1 ring-orange-300/70' : 'hover:bg-white/[0.06]'
            } ${!affordable ? 'opacity-30' : ''}`}
          >
            <span className="h-8 w-8">{Art && <Art />}</span>
            <span className="frost-label mt-1.5 whitespace-nowrap text-[10px] text-white/70">{def.name}</span>
            <span className="mt-0.5 flex items-center gap-1.5 text-[10px] text-white/40">
              {Object.entries(def.cost).map(([key, amount]) => {
                const Icon = COST_ICONS[key];
                return (
                  <span key={key} className="flex items-center gap-0.5">
                    <Icon width={11} height={11} />
                    {amount}
                  </span>
                );
              })}
            </span>
          </button>
        );
      })}
      {selected && (
        <div className="frost-divider mx-1" />
      )}
      {selected && (
        <div className="max-w-[8rem] px-2 text-[11px] leading-tight text-orange-300/80">
          Click pe hartă, lângă generator
        </div>
      )}
    </div>
  );
}

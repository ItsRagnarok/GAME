import { IconPickaxe, IconSaw, IconTent, IconWrench, IconHouse } from '../components/icons';

// Line-icon fallback for building types that don't have real art yet
// (see BUILDING_TYPES[id].image) — keeps them visually consistent with
// the rest of the HUD instead of falling back to emoji.
export const BUILDING_ICONS = {
  coalMine: IconPickaxe,
  sawmill: IconSaw,
  tent: IconTent,
  workshop: IconWrench,
  house: IconHouse,
};

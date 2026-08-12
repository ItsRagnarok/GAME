import { Generator } from './Generator';
import { BuildingLayer } from './BuildingLayer';

/** Everything gameplay-related that lives in world space (pans/zooms
 * with the terrain), as opposed to screen-space UI like ResourceBar. */
export function GameLayer({ game }) {
  return (
    <>
      <Generator fueled={game.resources.coal > 0} />
      <BuildingLayer buildings={game.buildings} />
    </>
  );
}

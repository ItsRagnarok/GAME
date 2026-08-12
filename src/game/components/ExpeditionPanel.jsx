import { ZONES } from '../../world/config/worldConfig';
import { sendExpedition, EXPEDITION_WOOD_COST } from '../logic/simulation';

export function ExpeditionPanel({ zoneId, game, onClose }) {
  const zone = ZONES.find((z) => z.id === zoneId);
  if (!zone) return null;

  const exp = game.expeditions[zoneId];

  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-black/50"
      onClick={onClose}
      data-game-ui
    >
      <div
        className="w-72 rounded-xl border border-white/10 bg-neutral-900/95 p-4 text-sm text-white/90 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-1 font-semibold">
          {zone.order} · {zone.name}
        </div>

        {!exp && (
          <>
            <p className="mb-3 text-white/50">
              Trimite o echipă de cercetași. Durează câteva ture, cost {EXPEDITION_WOOD_COST}🪵.
            </p>
            <button
              type="button"
              className="w-full rounded-lg bg-orange-500/80 py-2 font-medium transition-colors hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-30"
              disabled={game.resources.wood < EXPEDITION_WOOD_COST}
              onClick={() => sendExpedition(zoneId)}
            >
              Trimite expediție
            </button>
          </>
        )}

        {exp?.status === 'active' && (
          <p className="text-white/60">Echipa explorează... ({exp.remaining} ture rămase)</p>
        )}

        {exp?.status === 'done' && (
          <p className="text-emerald-400/90">
            Echipa s-a întors cu {exp.reward.amount} {exp.reward.type === 'coal' ? 'cărbune' : 'lemne'}.
          </p>
        )}

        <button
          type="button"
          className="mt-3 w-full rounded-lg border border-white/10 py-1.5 text-white/50 transition-colors hover:text-white"
          onClick={onClose}
        >
          Închide
        </button>
      </div>
    </div>
  );
}

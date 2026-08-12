import { ZONES } from '../../world/config/worldConfig';
import { sendExpedition, EXPEDITION_WOOD_COST } from '../logic/simulation';
import { IconWood } from './icons';

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
        className="frost-panel w-72 rounded-xl p-4 text-sm text-white/90"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="frost-label mb-1 text-orange-200/80">
          {zone.order} · {zone.name}
        </div>

        {!exp && (
          <>
            <p className="mb-3 text-white/50">
              Trimite o echipă de cercetași. Durează câteva ture, cost{' '}
              <span className="inline-flex items-center gap-1 text-white/70">
                {EXPEDITION_WOOD_COST}
                <IconWood width={12} height={12} />
              </span>
              .
            </p>
            <button
              type="button"
              className="w-full rounded-lg bg-gradient-to-b from-orange-500 to-orange-600 py-2 font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-30"
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

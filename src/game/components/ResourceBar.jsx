export function ResourceBar({ game }) {
  return (
    <div className="pointer-events-none absolute left-1/2 top-4 flex -translate-x-1/2 items-center gap-4 rounded-full border border-white/10 bg-black/40 px-5 py-2 font-mono text-xs text-white/80 backdrop-blur-sm">
      <span>
        Ziua {game.day}, ora {String(game.hour).padStart(2, '0')}:00
      </span>
      <span className={game.temperature < -15 ? 'text-sky-300' : ''}>🌡️ {game.temperature}°C</span>
      <span>⛏️ {game.resources.coal}</span>
      <span>🪵 {game.resources.wood}</span>
    </div>
  );
}

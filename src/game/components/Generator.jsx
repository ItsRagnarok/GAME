import { GENERATOR_POSITION } from '../../world/config/worldConfig';
import { Smoke } from './Smoke';

/**
 * The Generator: the heart of the hub, same role as in Frostpunk. Shows
 * a warmth ring so it's visually obvious why buildings cluster around
 * it, and dims when out of coal.
 */
export function Generator({ fueled }) {
  const size = 260;
  const warmthRadius = 1650;

  return (
    <>
      <div
        className="pointer-events-none absolute rounded-full border transition-colors duration-1000"
        style={{
          left: GENERATOR_POSITION.x - warmthRadius,
          top: GENERATOR_POSITION.y - warmthRadius,
          width: warmthRadius * 2,
          height: warmthRadius * 2,
          borderColor: fueled ? 'rgba(255,170,80,0.18)' : 'rgba(255,255,255,0.06)',
          background: fueled
            ? 'radial-gradient(circle, rgba(255,140,20,0.08) 0%, transparent 70%)'
            : 'transparent',
        }}
      />
      <div
        className="absolute"
        style={{ left: GENERATOR_POSITION.x - size / 2, top: GENERATOR_POSITION.y - size / 2, width: size, height: size }}
      >
        <div
          className="absolute inset-0 rounded-full blur-2xl transition-opacity duration-1000"
          style={{
            transform: 'scale(2.4)',
            background: fueled ? 'rgba(255,140,20,0.35)' : 'rgba(120,140,160,0.12)',
          }}
        />
        {/* Same ground-contact shadow used under every other building, so
            the Generator sits on the same visual "floor" as the rest. */}
        <div
          className="absolute rounded-full bg-black/45 blur-md"
          style={{ left: '50%', top: '78%', width: size * 0.5, height: size * 0.14, transform: 'translate(-50%, -50%)' }}
        />
        <img
          src="/generator/generator.webp"
          alt="Generator"
          draggable={false}
          className={`absolute select-none transition-[filter] duration-1000 ${fueled ? 'frost-flicker' : ''}`}
          style={{
            left: '50%',
            top: '50%',
            width: size * 1.35,
            transform: 'translate(-50%, -50%)',
            maskImage: 'radial-gradient(ellipse, black 52%, transparent 82%)',
            WebkitMaskImage: 'radial-gradient(ellipse, black 52%, transparent 82%)',
            filter: fueled
              ? 'drop-shadow(0 0 26px rgba(255,140,20,0.55)) saturate(1.05) contrast(1.05) brightness(1.02)'
              : 'drop-shadow(0 0 14px rgba(0,0,0,0.5)) saturate(0.85) contrast(1.05) brightness(0.82)',
          }}
        />
      </div>
      <Smoke
        x={GENERATOR_POSITION.x - 4}
        y={GENERATOR_POSITION.y - 108}
        scale={2.3}
        intensity={fueled ? 1 : 0.35}
      />
    </>
  );
}

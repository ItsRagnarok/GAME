// Hand-authored vector building art — same steel/ember palette and
// construction technique as the hub map, so buildings read as part of
// the same world instead of separately-sourced photos.

function BuildingGenerator() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full select-none">
      <>
    <radialGradient id="genGlow" cx="50%" cy="58%" r="55%">
      <stop offset="0%" stopColor="#ff9142" stopOpacity="0.55"/>
      <stop offset="100%" stopColor="#ff9142" stopOpacity="0"/>
    </radialGradient>
    <circle cx="100" cy="118" r="72" fill="url(#genGlow)"/>
    <rect x="82" y="34" width="24" height="70" rx="4" fill="#233240"/>
    <rect x="78" y="30" width="32" height="10" rx="3" fill="#2c3f50"/>
    <path d="M82 60 h-14 v34 h14" fill="none" stroke="#3a4f61" strokeWidth="4" strokeLinejoin="round"/>
    <path d="M106 70 h16 v22 h-16" fill="none" stroke="#3a4f61" strokeWidth="4" strokeLinejoin="round"/>
    <rect x="48" y="100" width="104" height="58" rx="6" fill="#2c3f50"/>
    <rect x="48" y="100" width="104" height="14" rx="4" fill="#374d61"/>
    <rect x="60" y="122" width="14" height="14" rx="2" fill="#ffb066" className="lit"/>
    <rect x="93" y="122" width="14" height="14" rx="2" fill="#ffb066" className="lit lit-2"/>
    <rect x="126" y="122" width="14" height="14" rx="2" fill="#ffb066" className="lit lit-3"/>
    <rect x="48" y="150" width="104" height="8" rx="2" fill="#1c2732"/>
  </>
    </svg>
  );
}

function BuildingShelter() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full select-none">
      <>
    <rect x="140" y="58" width="10" height="24" rx="2" fill="#233240"/>
    <path d="M34 150 V108 A66 58 0 0 1 166 108 V150 Z" fill="#25333f"/>
    <path d="M34 150 V108 A66 58 0 0 1 166 108 V150 Z" fill="none" stroke="#3a4f61" strokeWidth="3"/>
    <path d="M40 104 A62 54 0 0 1 160 104" fill="none" stroke="#e8eff4" strokeWidth="5" opacity="0.75" strokeLinecap="round"/>
    <rect x="34" y="150" width="132" height="16" fill="#1c2732"/>
    <rect x="91" y="118" width="18" height="32" rx="2" fill="#182330"/>
    <rect x="93" y="120" width="14" height="16" rx="1.5" fill="#ffb066" className="lit"/>
    <rect x="54" y="122" width="13" height="13" rx="2" fill="#ffb066" className="lit lit-2"/>
    <rect x="133" y="122" width="13" height="13" rx="2" fill="#ffb066" className="lit lit-3"/>
    <text x="100" y="140" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fill="#9fb4c4" opacity="0.8">S-01</text>
  </>
    </svg>
  );
}

function BuildingHouse() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full select-none">
      <>
    <rect x="126" y="46" width="10" height="26" rx="2" fill="#233240"/>
    <polygon points="100,64 44,108 156,108" fill="#25333f"/>
    <polygon points="100,64 44,108 156,108" fill="none" stroke="#3a4f61" strokeWidth="3" strokeLinejoin="round"/>
    <polygon points="100,72 62,100 138,100" fill="#e8eff4" opacity="0.55"/>
    <rect x="54" y="108" width="92" height="52" fill="#2c3f50"/>
    <rect x="54" y="108" width="92" height="52" fill="none" stroke="#1c2732" strokeWidth="2"/>
    <rect x="91" y="130" width="18" height="30" fill="#182330"/>
    <rect x="93" y="132" width="14" height="14" rx="1.5" fill="#ffb066" className="lit"/>
    <rect x="64" y="124" width="16" height="16" rx="2" fill="#ffb066" className="lit lit-2"/>
    <rect x="120" y="124" width="16" height="16" rx="2" fill="#ffb066" className="lit lit-3"/>
  </>
    </svg>
  );
}

function BuildingCoalMine() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full select-none">
      <>
    <polygon points="20,166 46,90 90,72 140,84 172,120 178,166" fill="#25333f"/>
    <polygon points="20,166 46,90 90,72 140,84 172,120 178,166" fill="none" stroke="#3a4f61" strokeWidth="3" strokeLinejoin="round"/>
    <polygon points="46,90 90,72 140,84 130,100 70,100" fill="#e8eff4" opacity="0.5"/>
    <rect x="72" y="118" width="56" height="48" rx="26" fill="#0e141b"/>
    <rect x="70" y="118" width="10" height="48" fill="#374d61"/>
    <rect x="120" y="118" width="10" height="48" fill="#374d61"/>
    <circle cx="100" cy="142" r="10" fill="#ffb066" className="lit" opacity="0.9"/>
    <rect x="8" y="166" width="184" height="8" fill="#1c2732"/>
    <path d="M8 172 h184 M8 176 h184" stroke="#37424c" strokeWidth="2"/>
    <g transform="translate(150 152)">
      <rect x="0" y="0" width="30" height="16" rx="3" fill="#2c3f50"/>
      <circle cx="7" cy="18" r="5" fill="#182330"/>
      <circle cx="23" cy="18" r="5" fill="#182330"/>
      <circle cx="8" cy="-4" r="4" fill="#1c2732"/>
      <circle cx="16" cy="-6" r="5" fill="#1c2732"/>
      <circle cx="23" cy="-3" r="4" fill="#1c2732"/>
    </g>
  </>
    </svg>
  );
}

function BuildingSawmill() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full select-none">
      <>
    <rect x="140" y="56" width="10" height="22" rx="2" fill="#233240"/>
    <polygon points="60,70 160,70 160,100 60,100" fill="#25333f"/>
    <polygon points="52,100 168,100 160,70 60,70" fill="none" stroke="#3a4f61" strokeWidth="3"/>
    <rect x="60" y="100" width="100" height="60" fill="#2c3f50"/>
    <rect x="60" y="100" width="100" height="60" fill="none" stroke="#1c2732" strokeWidth="2"/>
    <rect x="118" y="122" width="14" height="14" rx="2" fill="#ffb066" className="lit"/>
    <rect x="78" y="130" width="18" height="30" fill="#182330"/>
    <g transform="translate(38 138)">
      <circle r="20" fill="#182330" stroke="#3a4f61" strokeWidth="3"/>
      <circle r="5" fill="#374d61"/>
      <g stroke="#5b7288" strokeWidth="2.4">
        <path d="M0,-20 L0,-13 M0,20 L0,13 M-20,0 L-13,0 M20,0 L13,0 M-14,-14 L-9,-9 M14,14 L9,9 M14,-14 L9,-9 M-14,14 L-9,9" />
      </g>
    </g>
    <g transform="translate(160 150)">
      <rect x="-3" y="10" width="46" height="10" rx="4" fill="#2c3f50"/>
      <ellipse cx="-3" cy="15" rx="4" ry="5.5" fill="#374d61"/>
      <ellipse cx="43" cy="15" rx="4" ry="5.5" fill="#374d61"/>
      <rect x="-3" y="0" width="46" height="10" rx="4" fill="#2c3f50"/>
      <ellipse cx="-3" cy="5" rx="4" ry="5.5" fill="#374d61"/>
      <ellipse cx="43" cy="5" rx="4" ry="5.5" fill="#374d61"/>
    </g>
  </>
    </svg>
  );
}

function BuildingWorkshop() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full select-none">
      <>
    <rect x="134" y="40" width="10" height="26" rx="2" fill="#233240"/>
    <rect x="46" y="66" width="108" height="16" rx="4" fill="#25333f"/>
    <rect x="54" y="82" width="92" height="78" fill="#2c3f50"/>
    <rect x="54" y="82" width="92" height="78" fill="none" stroke="#1c2732" strokeWidth="2"/>
    <rect x="91" y="120" width="18" height="40" fill="#182330"/>
    <rect x="93" y="122" width="14" height="16" rx="1.5" fill="#ffb066" className="lit"/>
    <rect x="64" y="100" width="18" height="18" rx="2" fill="#ffb066" className="lit lit-2"/>
    <rect x="118" y="100" width="18" height="18" rx="2" fill="#ffb066" className="lit lit-3"/>
    <g transform="translate(100 58)" fill="none" stroke="#9fb4c4" strokeWidth="3" opacity="0.85">
      <circle r="11" />
      <circle r="4" fill="#9fb4c4" stroke="none"/>
      <path d="M0,-15 L0,-9 M0,15 L0,9 M-15,0 L-9,0 M15,0 L9,0 M-10.6,-10.6 L-6.4,-6.4 M10.6,10.6 L6.4,6.4 M10.6,-10.6 L6.4,-6.4 M-10.6,10.6 L-6.4,6.4" />
    </g>
  </>
    </svg>
  );
}

export const BUILDING_ART = {
  generator: BuildingGenerator,
  tent: BuildingShelter,
  house: BuildingHouse,
  coalMine: BuildingCoalMine,
  sawmill: BuildingSawmill,
  workshop: BuildingWorkshop,
};

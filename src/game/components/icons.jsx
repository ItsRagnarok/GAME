// Small inline SVG icon set, all sharing one stroke style, so the HUD
// doesn't depend on the OS/browser's emoji font (which renders
// inconsistently and clashes with the painted art). currentColor lets
// each call site tint the icon via text color.

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function IconCoal(props) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} {...props}>
      <path
        d="M7 8.5 12 5l5 3.5 2 6-3 4.5H8l-3-4.5Z"
        fill="currentColor"
        fillOpacity="0.22"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="10.5" cy="13" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="14" cy="11.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconWood(props) {
  return (
    <svg {...base} width={16} height={16} {...props}>
      <rect x="3.5" y="7" width="17" height="4" rx="2" />
      <rect x="3.5" y="13.5" width="17" height="4" rx="2" />
    </svg>
  );
}

export function IconThermometer(props) {
  return (
    <svg {...base} width={16} height={16} {...props}>
      <path d="M12 14.5V5a2 2 0 1 0-4 0v9.5a3.5 3.5 0 1 0 4 0Z" />
      <path d="M12 9h-2" />
    </svg>
  );
}

export function IconClock(props) {
  return (
    <svg {...base} width={16} height={16} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function IconExpand(props) {
  return (
    <svg {...base} width={16} height={16} {...props}>
      <path d="M4 9V6a2 2 0 0 1 2-2h3M20 9V6a2 2 0 0 0-2-2h-3M4 15v3a2 2 0 0 0 2 2h3M20 15v3a2 2 0 0 1-2 2h-3" />
    </svg>
  );
}

export function IconCollapse(props) {
  return (
    <svg {...base} width={16} height={16} {...props}>
      <path d="M9 4v3a2 2 0 0 1-2 2H4M20 9h-3a2 2 0 0 1-2-2V4M4 15h3a2 2 0 0 1 2 2v3M15 20v-3a2 2 0 0 1 2-2h3" />
    </svg>
  );
}


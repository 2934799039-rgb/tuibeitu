export function Logo({ size = 80, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Book body */}
      <rect x="12" y="10" width="48" height="52" rx="2.5"
        stroke="currentColor" strokeWidth="2.2" opacity="0.75" />

      {/* Spine line */}
      <line x1="18" y1="10" x2="18" y2="62" stroke="currentColor" strokeWidth="1.8" opacity="0.9" />

      {/* Binding knots — 4 dots along spine */}
      {[20, 32, 44, 56].map((y) => (
        <circle key={y} cx="15" cy={y} r="1.2" fill="currentColor" opacity="0.7" />
      ))}

      {/* Right page face — subtle */}
      <rect x="22" y="14" width="32" height="44" rx="1"
        stroke="currentColor" strokeWidth="0.8" opacity="0.2" />

      {/* Yin-Yang centered on page */}
      <path d="M38 22 A12 12 0 0 1 38 46 A6 6 0 0 0 38 34 A6 6 0 0 1 38 22Z"
        fill="currentColor" opacity="0.45" />
      <circle cx="38" cy="27" r="2.2" fill="currentColor" opacity="0.7" />
      <circle cx="38" cy="41" r="2.2" fill="currentColor" opacity="0.1"
        style={{ filter: "invert(1)" }} />
    </svg>
  );
}

export function LogoMark({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="6" y="6" width="32" height="36" rx="2"
        stroke="currentColor" strokeWidth="2" opacity="0.75" />
      <line x1="11" y1="6" x2="11" y2="42" stroke="currentColor" strokeWidth="1.6" opacity="0.9" />
      {[14, 24, 34, 40].map((y) => (
        <circle key={y} cx="8.5" cy={y} r="1" fill="currentColor" opacity="0.7" />
      ))}
      <rect x="14" y="9" width="23" height="30" rx="1"
        stroke="currentColor" strokeWidth="0.7" opacity="0.2" />
      <path d="M25 16 A8 8 0 0 1 25 32 A4 4 0 0 0 25 24 A4 4 0 0 1 25 16Z"
        fill="currentColor" opacity="0.45" />
      <circle cx="25" cy="19.5" r="1.5" fill="currentColor" opacity="0.7" />
      <circle cx="25" cy="28.5" r="1.5" fill="currentColor" opacity="0.1"
        style={{ filter: "invert(1)" }} />
    </svg>
  );
}

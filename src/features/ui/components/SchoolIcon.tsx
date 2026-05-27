import type { SchoolId } from "@/config/schools";

export function SchoolIcon({
  school, size = 48, className = "",
}: { school: SchoolId; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}>
      {school === "bazi" ? <BaziIcon /> : <ZhouyiIcon />}
    </svg>
  );
}

function BaziIcon() {
  return (
    <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.8">
      {/* Four pillars as simple vertical blocks */}
      <rect x="6" y="6" width="15" height="15" rx="2" />
      <rect x="27" y="6" width="15" height="15" rx="2" />
      <rect x="6" y="27" width="15" height="15" rx="2" />
      <rect x="27" y="27" width="15" height="15" rx="2" />
      {/* Stem-branch marks inside each */}
      <line x1="10" y1="13.5" x2="17" y2="13.5" strokeWidth="1" opacity="0.5" />
      <line x1="10" y1="16.5" x2="17" y2="16.5" strokeWidth="1" opacity="0.3" />
      <line x1="31" y1="13.5" x2="38" y2="13.5" strokeWidth="1" opacity="0.5" />
      <line x1="31" y1="16.5" x2="38" y2="16.5" strokeWidth="1" opacity="0.3" />
      <line x1="10" y1="34.5" x2="17" y2="34.5" strokeWidth="1" opacity="0.5" />
      <line x1="10" y1="37.5" x2="17" y2="37.5" strokeWidth="1" opacity="0.3" />
      <line x1="31" y1="34.5" x2="38" y2="34.5" strokeWidth="1" opacity="0.5" />
      <line x1="31" y1="37.5" x2="38" y2="37.5" strokeWidth="1" opacity="0.3" />
      {/* Connecting cross */}
      <line x1="13.5" y1="6" x2="13.5" y2="42" strokeWidth="0.6" opacity="0.15" />
      <line x1="34.5" y1="6" x2="34.5" y2="42" strokeWidth="0.6" opacity="0.15" />
    </g>
  );
}

function ZhouyiIcon() {
  return (
    <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      {/* Six hexagram lines — 3 yang / 3 yin, clean and centered */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const y = 8 + i * 6;
        const yang = [0, 2, 4].includes(i); // alternate
        return yang ? (
          <line key={i} x1="10" y1={y} x2="38" y2={y} opacity={0.8 - i * 0.06} />
        ) : (
          <g key={i} opacity={0.8 - i * 0.06}>
            <line x1="10" y1={y} x2="20" y2={y} />
            <line x1="28" y1={y} x2="38" y2={y} />
          </g>
        );
      })}
    </g>
  );
}

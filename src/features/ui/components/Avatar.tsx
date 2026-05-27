"use client";

// 5 unique gourds — each different color and shape
const GOURDS = [
  { id: "g1", body: "#8b5e3c", ring: "#c9952e", leaf: "#5a7a3a" }, // 棕葫芦
  { id: "g2", body: "#6b8a5e", ring: "#d4a12c", leaf: "#3d5c2e" }, // 绿葫芦
  { id: "g3", body: "#c9884b", ring: "#e8c44a", leaf: "#4a6b30" }, // 金橙葫芦
  { id: "g4", body: "#805a3a", ring: "#d4a12c", leaf: "#5a7a3a" }, // 深棕葫芦
  { id: "g5", body: "#b8835a", ring: "#e0b840", leaf: "#4a6b30" }, // 浅棕葫芦
];

export const PICKER_STYLES = GOURDS.map((g) => g.id);

function getGourd(id: string) {
  return GOURDS.find((g) => g.id === id) || GOURDS[0];
}

export function AvatarImage({ seed, size = 32 }: { seed: string; size?: number }) {
  return <GourdSVG gourd={getGourd(seed)} size={size} />;
}

export function PickerAvatar({ pattern, size = 44 }: { pattern: string; size?: number }) {
  return <GourdSVG gourd={getGourd(pattern)} size={size} />;
}

function GourdSVG({ gourd, size }: { gourd: typeof GOURDS[0]; size: number }) {
  const c = size / 2;
  const s = size / 48; // scale from 48px viewBox

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      {/* Gourd body — two overlapping circles */}
      <ellipse cx="24" cy="34" rx="12" ry="10" fill={gourd.body} />
      <ellipse cx="24" cy="20" rx="8" ry="7" fill={gourd.body} />
      {/* Bridge between circles */}
      <rect x="18" y="23" width="12" height="4" rx="2" fill={gourd.body} />
      {/* Highlight */}
      <ellipse cx="18" cy="17" rx="2.5" ry="2" fill="white" opacity="0.1" />
      <ellipse cx="19" cy="31" rx="3.5" ry="3" fill="white" opacity="0.08" />
      {/* Stem */}
      <line x1="24" y1="12" x2="24" y2="6" stroke={gourd.body} strokeWidth="2" strokeLinecap="round" />
      {/* Leaf */}
      <path d="M24,8 Q30,6 28,10 Q26,8 24,8Z" fill={gourd.leaf} />
      {/* Ring band — decorative line between upper and lower */}
      <path d="M17,24 Q24,28 31,24" fill="none" stroke={gourd.ring} strokeWidth="0.8" opacity="0.6" />
      {/* Outer ring */}
      <circle cx="24" cy="24" r="22" fill="none" stroke={gourd.ring} strokeWidth="1" opacity="0.35" />
    </svg>
  );
}

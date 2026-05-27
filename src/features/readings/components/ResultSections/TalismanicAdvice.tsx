"use client";

import { motion } from "framer-motion";

interface TalismanData {
  intro?: string;
  crystals?: { en: string; zh: string; ja: string };
  materials?: { en: string; zh: string; ja: string };
  wear?: { en: string; zh: string; ja: string };
  carry?: { en: string; zh: string; ja: string };
  home?: { en: string; zh: string; ja: string };
  avoid?: { en: string; zh: string; ja: string };
  general?: string;
  direction?: string;
  timing?: string;
}

const iconProps = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, className: "text-current flex-shrink-0" };

function GemIcon() {
  return (
    <svg {...iconProps}>
      <polygon points="12,3 20,9 12,15 4,9" strokeLinejoin="round" />
      <polygon points="12,15 20,9 16,19 12,21" strokeLinejoin="round" />
      <polygon points="12,15 4,9 8,19 12,21" strokeLinejoin="round" />
    </svg>
  );
}

function WearIcon() {
  return (
    <svg {...iconProps}>
      <path d="M5 3 L9 3 L12 9 L15 3 L19 3 L17 21 L12 18 L7 21Z" strokeLinejoin="round" />
    </svg>
  );
}

function CarryIcon() {
  return (
    <svg {...iconProps}>
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M9 8 L9 5 C9 3.9 9.9 3 11 3 C12.1 3 13 3.9 13 5 L13 8" />
      <circle cx="12" cy="14" r="2" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4 11 L12 4 L20 11 L20 21 L14 21 L14 14 L10 14 L10 21 L4 21Z" strokeLinejoin="round" />
    </svg>
  );
}

function AvoidIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <line x1="8" y1="8" x2="16" y2="16" strokeLinecap="round" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <polygon points="12,4 16,16 12,13 8,16" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="12" x2="12" y2="6" strokeLinecap="round" />
      <line x1="12" y1="12" x2="16" y2="12" strokeLinecap="round" />
    </svg>
  );
}

const sections = [
  { key: "crystals", Icon: GemIcon, label: { en: "Crystals & Stones", zh: "宝石晶石", ja: "宝石·晶石" } },
  { key: "wear", Icon: WearIcon, label: { en: "What to Wear", zh: "穿搭佩戴", ja: "服装·装身具" } },
  { key: "carry", Icon: CarryIcon, label: { en: "What to Carry", zh: "随身携带", ja: "携行品" } },
  { key: "home", Icon: HomeIcon, label: { en: "Home & Space", zh: "居家布局", ja: "家·空間" } },
  { key: "avoid", Icon: AvoidIcon, label: { en: "What to Avoid", zh: "避忌注意", ja: "避けるべきこと" } },
];

export function TalismanicAdvice({ data, locale }: { data: TalismanData; locale: string }) {
  const lang = locale === "zh" ? "zh" : locale === "ja" ? "ja" : "en";
  if (!data) return null;

  const heading = lang === "zh" ? "开运秘法" : lang === "ja" ? "開運秘法" : "Talismanic Guidance";

  // Zhouyi-style
  if (data.general) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }} className="mb-16"
      >
        <h2 className="text-xl font-display gold-text mb-6 text-center tracking-widest">{heading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="mystic-card rounded-sm p-5 md:col-span-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-gold-400 flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <circle cx="10" cy="10" r="8" />
                  <path d="M7 10 L9 12 L13 8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <span className="text-[10px] text-gold-400 tracking-[0.2em] uppercase">
                  {lang === "zh" ? "护身秘法" : lang === "ja" ? "護身秘法" : "Talisman"}
                </span>
                <p className="text-xs text-mystic-200 leading-relaxed mt-1.5">{data.general}</p>
              </div>
            </div>
          </div>
          {data.direction && (
            <div className="mystic-card rounded-sm p-5 flex items-start gap-3">
              <CompassIcon />
              <div>
                <span className="text-[10px] text-gold-400 tracking-[0.2em] uppercase">
                  {lang === "zh" ? "吉方位" : lang === "ja" ? "吉方位" : "Direction"}
                </span>
                <p className="text-xs text-mystic-300 leading-relaxed mt-1">{data.direction}</p>
              </div>
            </div>
          )}
          {data.timing && (
            <div className="mystic-card rounded-sm p-5 flex items-start gap-3">
              <ClockIcon />
              <div>
                <span className="text-[10px] text-gold-400 tracking-[0.2em] uppercase">
                  {lang === "zh" ? "最佳时机" : lang === "ja" ? "好機" : "Timing"}
                </span>
                <p className="text-xs text-mystic-300 leading-relaxed mt-1">{data.timing}</p>
              </div>
            </div>
          )}
        </div>
      </motion.section>
    );
  }

  // Bazi-style
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }} className="mb-16"
    >
      <h2 className="text-xl font-display gold-text mb-2 text-center tracking-widest">{heading}</h2>
      {data.intro && (
        <p className="text-xs text-mystic-400 text-center mb-6 tracking-wider">{data.intro}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map(({ key, Icon, label }) => {
          const content = (data as any)[key] as { en: string; zh: string; ja: string } | undefined;
          if (!content) return null;
          const text = content[lang] || content.en;
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`mystic-card rounded-sm p-5 flex items-start gap-3 ${key === "avoid" ? "border-l-2 border-rose-500/20" : ""}`}
            >
              <div className={`mt-0.5 flex-shrink-0 ${key === "avoid" ? "text-rose-400/70" : "text-gold-400"}`}>
                <Icon />
              </div>
              <div>
                <h4 className={`text-xs tracking-[0.15em] mb-1.5 ${key === "avoid" ? "text-rose-400/70" : "text-gold-400"}`}>
                  {label[lang] || label.en}
                </h4>
                <p className="text-[11px] text-mystic-300 leading-relaxed">{text}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

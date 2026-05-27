"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface Palace {
  name: string; role: string; branch: string; element: string;
  strength: number; interpretation: string; strengthReason: string;
}

export function ZiweiPalaces({ palaces }: { palaces: Palace[] }) {
  const t = useTranslations("results");
  if (!palaces?.length) return null;

  const strengthLabel = (s: number) => {
    if (s >= 5) return "▮▮▮▮▮";
    if (s >= 4) return "▮▮▮▮▯";
    if (s >= 3) return "▮▮▮▯▯";
    if (s >= 2) return "▮▮▯▯▯";
    return "▮▯▯▯▯";
  };

  const strengthColor = (s: number) => {
    if (s >= 5) return "text-gold-400";
    if (s >= 4) return "text-gold-300";
    if (s >= 3) return "text-mystic-200";
    if (s >= 2) return "text-mystic-400";
    return "text-mystic-500";
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mb-16"
    >
      <h2 className="text-xl font-display gold-text mb-6 text-center tracking-widest">
        {t("overview")} — 12 Palaces
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {palaces.map((palace, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="mystic-card rounded-sm p-5 flex flex-col"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-semibold text-gold-300 tracking-wider">
                  {palace.name}
                </h3>
                <p className="text-[10px] text-mystic-400 uppercase tracking-wider">
                  {palace.role} · {palace.branch} ({palace.element})
                </p>
              </div>
              <div className={`text-xs font-mono ${strengthColor(palace.strength)}`}>
                {strengthLabel(palace.strength)}
              </div>
            </div>

            <p className="text-xs text-mystic-300 leading-relaxed mb-2 flex-1">
              {palace.interpretation}
            </p>

            <div className="mt-2 pt-2 border-t border-gold-600/10">
              <p className="text-[10px] text-mystic-400 leading-relaxed italic">
                {palace.strengthReason}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

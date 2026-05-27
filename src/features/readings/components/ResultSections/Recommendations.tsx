"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function Recommendations({
  recommendations,
  locale,
}: {
  recommendations: any;
  locale: string;
}) {
  const t = useTranslations("results");

  if (!recommendations) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="mb-16"
    >
      <h2 className="text-xl font-display gold-text mb-6 text-center tracking-widest">
        {t("recommendations")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendations.favorableColors?.length > 0 && (
          <div className="mystic-card rounded-sm p-5">
            <h3 className="text-xs text-mystic-400 tracking-[0.2em] uppercase mb-4">
              {t("luckyColors")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {recommendations.favorableColors.map((color: string) => (
                <span
                  key={color}
                  className="text-xs px-2 py-1 bg-gold-950/30 text-gold-400 border border-gold-600/20 rounded-sm"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>
        )}

        {recommendations.luckyNumbers?.length > 0 && (
          <div className="mystic-card rounded-sm p-5">
            <h3 className="text-xs text-mystic-400 tracking-[0.2em] uppercase mb-4">
              {t("luckyNumbers")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {recommendations.luckyNumbers.map((num: number) => (
                <span
                  key={num}
                  className="text-lg font-display gold-text w-10 h-10 flex items-center justify-center border border-gold-600/20 rounded-sm"
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
        )}

        {recommendations.favorableDirections?.length > 0 && (
          <div className="mystic-card rounded-sm p-5">
            <h3 className="text-xs text-mystic-400 tracking-[0.2em] uppercase mb-4">
              {t("luckyDirections")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {recommendations.favorableDirections.map((dir: string) => (
                <span
                  key={dir}
                  className="text-xs px-2 py-1 bg-gold-950/30 text-gold-400 border border-gold-600/20 rounded-sm"
                >
                  {dir}
                </span>
              ))}
            </div>
          </div>
        )}

        {recommendations.favorableElements?.length > 0 && (
          <div className="mystic-card rounded-sm p-5">
            <h3 className="text-xs text-mystic-400 tracking-[0.2em] uppercase mb-4">
              {t("favorableElements")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {recommendations.favorableElements.map((el: string) => (
                <span
                  key={el}
                  className="text-xs px-2 py-1 bg-gold-950/30 text-gold-400 border border-gold-600/20 rounded-sm"
                >
                  {el}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}

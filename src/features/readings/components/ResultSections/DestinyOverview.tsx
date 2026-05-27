"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  explainChartType,
  explainFiveElements,
  explainDayMaster,
} from "@/lib/knowledge/glossary";

const ELEMENT_COLORS: Record<string, string> = {
  "金": "#d4a12c", "木": "#4db88c", "水": "#5b9bd5", "火": "#d45342", "土": "#b8956e",
  Metal: "#d4a12c", Wood: "#4db88c", Water: "#5b9bd5", Fire: "#d45342", Earth: "#b8956e",
};

export function DestinyOverview({
  calcResult, locale,
}: { calcResult: any; locale: string }) {
  const t = useTranslations("results");
  if (!calcResult?.dayMaster) return null;

  const { dayMaster, fiveElements, shengXiao, chartType, fourPillars } = calcResult;
  const chartExp = explainChartType(chartType, dayMaster.element, locale);
  const elementsExp = explainFiveElements(fiveElements, locale);
  const dayMasterExp = explainDayMaster(dayMaster.stem, dayMaster.element, locale);

  const lang = locale === "zh" ? "zh" : locale === "ja" ? "ja" : "en";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-16"
    >
      <h2 className="text-xl font-display gold-text mb-6 text-center tracking-widest">
        {t("overview")}
      </h2>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="mystic-card rounded-sm p-6">
          <h3 className="text-xs text-mystic-400 tracking-[0.2em] uppercase mb-4">{t("dayMaster")}</h3>
          <div className="flex items-center gap-4">
            <span className="text-5xl font-calligraphy gold-text">{dayMaster.stem}</span>
            <div>
              <p className="text-sm text-mystic-200">{t("fiveElements")}: {dayMaster.element}</p>
              <p className="text-xs text-mystic-400 mt-1">
                {dayMaster.polarity === "阳" ? t("yang") : t("yin")} {t("polarity")}
              </p>
              {shengXiao && <p className="text-xs text-mystic-400 mt-1">{t("zodiac")}: {shengXiao}</p>}
            </div>
          </div>
        </div>

        <div className="mystic-card rounded-sm p-6">
          <h3 className="text-xs text-mystic-400 tracking-[0.2em] uppercase mb-4">{t("chartType")}</h3>
          <p className="text-2xl font-display gold-text mb-2">{chartType}</p>
          <p className="text-[11px] text-mystic-400 leading-relaxed">
            {chartExp[lang] || chartExp.en}
          </p>
        </div>

        <div className="mystic-card rounded-sm p-6">
          <h3 className="text-xs text-mystic-400 tracking-[0.2em] uppercase mb-4">{t("fourPillars")}</h3>
          <div className="grid grid-cols-4 gap-3 text-center">
            {fourPillars && Object.entries(fourPillars as Record<string, any>).map(([key, pillar]) => (
              <div key={key}>
                <p className="text-[10px] text-mystic-400 uppercase tracking-wider mb-1">{key}</p>
                <p className="text-lg font-calligraphy gold-text">{pillar.stem}{pillar.branch}</p>
                <p className="text-[10px] text-mystic-400 mt-1">{pillar.stemElement}/{pillar.branchElement}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mystic-card rounded-sm p-6">
          <h3 className="text-xs text-mystic-400 tracking-[0.2em] uppercase mb-4">{t("fiveElements")}</h3>
          <div className="space-y-2">
            {fiveElements && Object.entries(fiveElements as Record<string, number>).map(([el, count]) => (
              <div key={el} className="flex items-center gap-3">
                <span className="text-xs text-mystic-300 w-8">{el}</span>
                <div className="flex-1 h-2 bg-mystic-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${((count as number) / 8) * 100}%`, backgroundColor: ELEMENT_COLORS[el] || "#b8956e" }} />
                </div>
                <span className="text-xs text-mystic-400 w-4">{count as number}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explanations */}
      <div className="space-y-4">
        <div className="mystic-card rounded-sm p-5 border-l-2 border-gold-500/30">
          <h4 className="text-xs text-gold-400 tracking-[0.2em] uppercase mb-2">
            {lang === "zh" ? "日主解读" : lang === "ja" ? "日主解説" : "Understanding Your Day Master"}
          </h4>
          <p className="text-xs text-mystic-300 leading-relaxed">
            {dayMasterExp[lang] || dayMasterExp.en}
          </p>
        </div>

        <div className="mystic-card rounded-sm p-5 border-l-2 border-gold-500/30">
          <h4 className="text-xs text-gold-400 tracking-[0.2em] uppercase mb-2">
            {lang === "zh" ? "五行解析" : lang === "ja" ? "五行解析" : "Five Elements Explained"}
          </h4>
          <p className="text-xs text-mystic-300 leading-relaxed">
            {elementsExp[lang] || elementsExp.en}
          </p>
        </div>
      </div>
    </motion.section>
  );
}

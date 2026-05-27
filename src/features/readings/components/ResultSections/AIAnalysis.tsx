"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

const TABS = [
  { key: "personality", i18nKey: "personality" },
  { key: "wealth", i18nKey: "wealth" },
  { key: "love", i18nKey: "love" },
  { key: "health", i18nKey: "health" },
  { key: "career", i18nKey: "career" },
  { key: "yearlyTrend", i18nKey: "yearly" },
];

export function AIAnalysis({
  analysis,
  locale,
}: {
  analysis: any;
  locale: string;
}) {
  const [activeTab, setActiveTab] = useState("personality");
  const t = useTranslations("results");

  if (!analysis) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mb-16"
    >
      <h2 className="text-xl font-display gold-text mb-6 text-center tracking-widest">
        {t("aiAnalysis")}
      </h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 mb-6 justify-center">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300 rounded-sm ${
              activeTab === tab.key
                ? "bg-gold-950/40 text-gold-400 border border-gold-600/40"
                : "text-mystic-400 hover:text-gold-300 border border-transparent"
            }`}
          >
            {t(tab.i18nKey)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mystic-card rounded-sm p-8 min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-sm font-semibold text-gold-400 tracking-widest uppercase mb-4">
              {t(TABS.find((tab) => tab.key === activeTab)?.i18nKey || activeTab)}
            </h3>
            <div className="prose prose-invert prose-sm max-w-none">
              <p className="text-mystic-200 leading-relaxed whitespace-pre-wrap text-sm">
                {analysis[activeTab] || t("analysisNotAvailable")}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {analysis.summary && (
        <div className="mt-6 mystic-card rounded-sm p-6 border-l-2 border-gold-500/40">
          <p className="text-sm text-gold-300 italic leading-relaxed">
            {analysis.summary}
          </p>
        </div>
      )}
    </motion.section>
  );
}

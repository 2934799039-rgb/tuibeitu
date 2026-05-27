"use client";

import { motion } from "framer-motion";

type Lang = "en" | "zh" | "ja";

const DOMAIN_KEYS = ["love", "wealth", "career", "health", "study", "decision"] as const;

export function ZhouyiReading({ calcResult, aiAnalysis, locale }: { calcResult: any; aiAnalysis: any; locale: string }) {
  const hex = calcResult?._hexagram;
  if (!hex) return null;

  const hexIdx = calcResult.hexagramIndex ?? 0;
  const lang: Lang = (locale === "zh" || locale === "ja") ? locale as Lang : "en";

  const hexNameLocal = hex.name?.[lang] || hex.name?.en || "";
  const guaCi = hex.guaCi?.[lang] || hex.guaCi?.en || "";
  const daXiang = hex.daXiang?.[lang] || hex.daXiang?.en || "";

  // Combine all domain analyses into one unified deep reading
  const analyses: string[] = [];
  const advices: string[] = [];
  for (const key of DOMAIN_KEYS) {
    const d = hex.domains?.[key];
    if (!d) continue;
    const a = d.analysis?.[lang] || d.analysis?.en;
    const adv = d.advice?.[lang] || d.advice?.en;
    if (a) analyses.push(a);
    if (adv && adv !== a) advices.push(adv);
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }} className="mb-16"
    >
      {/* Hexagram Symbol + Name */}
      <div className="text-center mb-8">
        <div className="inline-block mb-6">
          <svg width="160" height="160" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
            <circle cx="80" cy="80" r="75" fill="none" stroke="#d4a12c" strokeWidth="1.5" opacity="0.4" />
            <circle cx="80" cy="80" r="70" fill="rgba(184,137,30,0.05)" />
            <circle cx="80" cy="80" r="62" fill="none" stroke="#d4a12c" strokeWidth="0.5" opacity="0.2" />
            <text x="80" y="80" textAnchor="middle" dominantBaseline="central" fill="#d4a12c" fontSize="68" fontFamily="serif">
              {String.fromCodePoint(0x4DC0 + (hexIdx % 64))}
            </text>
          </svg>
        </div>
        <h2 className="text-2xl font-calligraphy gold-text tracking-widest">{hexNameLocal}</h2>
      </div>

      {/* 卦辞 */}
      {guaCi && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mystic-card rounded-sm p-6 mb-4">
          <h3 className="text-xs text-gold-400 tracking-[0.2em] uppercase mb-4">
            {lang === "zh" ? "卦辞" : lang === "ja" ? "卦辞" : "Gua Ci"}
          </h3>
          <div className="text-sm text-mystic-200 leading-relaxed whitespace-pre-wrap">{guaCi}</div>
        </motion.div>
      )}

      {/* 大象传 */}
      {daXiang && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="mystic-card rounded-sm p-6 mb-4">
          <h3 className="text-xs text-gold-400 tracking-[0.2em] uppercase mb-4">
            {lang === "zh" ? "大象传" : lang === "ja" ? "大象伝" : "Da Xiang"}
          </h3>
          <div className="text-sm text-mystic-200 leading-relaxed whitespace-pre-wrap">{daXiang}</div>
        </motion.div>
      )}

      {/* 深度解析 — unified reading */}
      {analyses.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="mystic-card rounded-sm p-6 mb-4">
          <h3 className="text-xs text-gold-400 tracking-[0.2em] uppercase mb-2">
            {lang === "zh" ? "深度解析" : lang === "ja" ? "深層解析" : "Deep Analysis"}
          </h3>
          <p className="text-[11px] text-mystic-500 mb-6 leading-relaxed">
            {lang === "zh" ? "以下是此卦在你所问的各个方面的具体解读，结合卦象原文的含义逐一展开：" :
             lang === "ja" ? "以下は、この卦があなたの問いの各側面について示す具体的な解釈です。卦象の原文の意味に基づいて展開します：" :
             "Here is how this hexagram speaks to each area of your question, drawn from the original text and imagery:"}
          </p>
          <div className="space-y-6">
            {analyses.map((text, i) => {
              const intros: Record<string, string> = {
                love:    lang === "zh" ? "感情方面，" : lang === "ja" ? "恋愛について、" : "In matters of love, ",
                wealth:  lang === "zh" ? "财运方面，" : lang === "ja" ? "財運について、" : "Regarding wealth, ",
                career:  lang === "zh" ? "事业方面，" : lang === "ja" ? "仕事について、" : "For your career, ",
                health:  lang === "zh" ? "健康方面，" : lang === "ja" ? "健康について、" : "As for health, ",
                study:   lang === "zh" ? "学业方面，" : lang === "ja" ? "学業について、" : "In your studies, ",
                decision:lang === "zh" ? "关于决断，" : lang === "ja" ? "決断について、" : "When it comes to decisions, ",
              };
              const key = DOMAIN_KEYS[i];
              return (
                <div key={i}>
                  <span className="text-[11px] text-gold-400/70 tracking-[0.1em] font-medium">
                    {intros[key]}
                  </span>
                  <div className="text-sm text-mystic-200 leading-relaxed whitespace-pre-wrap mt-1">{text}</div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* 忠告 */}
      {advices.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="mystic-card rounded-sm p-6 border border-gold-600/20">
          <h3 className="text-xs text-gold-400 tracking-[0.2em] uppercase mb-4">
            {lang === "zh" ? "综合忠告" : lang === "ja" ? "総合忠告" : "Guidance"}
          </h3>
          <div className="space-y-4">
            {advices.map((text, i) => (
              <p key={i} className="text-sm text-mystic-300 leading-relaxed">{text}</p>
            ))}
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}

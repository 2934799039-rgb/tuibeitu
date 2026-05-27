"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function ProfessionalBazi({ calcResult, locale }: { calcResult: any; locale: string }) {
  if (!calcResult?.tenGods) return null;

  const t = useTranslations("results");
  const lang = locale === "zh" ? "zh" : locale === "ja" ? "ja" : "en";

  const labels = {
    tenGods: lang === "zh" ? "十神分析" : lang === "ja" ? "十神分析" : "Ten Gods",
    shenSha: lang === "zh" ? "神煞" : lang === "ja" ? "神煞" : "Spirit Stars",
    dayun: lang === "zh" ? "大运流年" : lang === "ja" ? "大運" : "Luck Cycles",
    industry: lang === "zh" ? "行业推荐" : lang === "ja" ? "業界推薦" : "Industries",
    partner: lang === "zh" ? "伴侣适配" : lang === "ja" ? "相性" : "Compatibility",
  };

  const tenGods = calcResult.tenGods;
  const shenSha = calcResult.shenSha || [];
  const dayun = calcResult.dayun || [];
  const industries = calcResult.industries || [];
  const partner = calcResult.partner;

  const tenGodNames: Record<string, string> = {
    "正官": lang === "zh" ? "正官" : lang === "ja" ? "正官" : "Direct Officer",
    "七杀": lang === "zh" ? "七杀" : lang === "ja" ? "七殺" : "Seven Killings",
    "正印": lang === "zh" ? "正印" : lang === "ja" ? "正印" : "Direct Seal",
    "偏印": lang === "zh" ? "偏印" : lang === "ja" ? "偏印" : "Indirect Seal",
    "食神": lang === "zh" ? "食神" : lang === "ja" ? "食神" : "Eating God",
    "伤官": lang === "zh" ? "伤官" : lang === "ja" ? "傷官" : "Hurting Officer",
    "比肩": lang === "zh" ? "比肩" : lang === "ja" ? "比肩" : "Peer",
    "劫财": lang === "zh" ? "劫财" : lang === "ja" ? "劫財" : "Rob Wealth",
    "正财": lang === "zh" ? "正财" : lang === "ja" ? "正財" : "Direct Wealth",
    "偏财": lang === "zh" ? "偏财" : lang === "ja" ? "偏財" : "Indirect Wealth",
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }} className="mb-16"
    >
      {/* Ten Gods Table */}
      <h2 className="text-xl font-display gold-text mb-6 text-center tracking-widest">{labels.tenGods}</h2>

      <div className="mystic-card rounded-sm p-6 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          {(["year","month","day","hour"] as const).map((pillar) => {
            const god = tenGods[pillar];
            const pName = lang === "zh" ? {year:"年柱",month:"月柱",day:"日柱",hour:"时柱"}[pillar] : lang === "ja" ? {year:"年柱",month:"月柱",day:"日柱",hour:"時柱"}[pillar] : {year:"Year",month:"Month",day:"Day",hour:"Hour"}[pillar];
            return (
              <div key={pillar} className="p-3">
                <p className="text-[10px] text-mystic-400 tracking-wider mb-1">{pName}</p>
                <p className="text-lg font-calligraphy gold-text">{tenGodNames[god.name] || god.name}</p>
                <p className="text-[10px] text-mystic-400 mt-0.5">
                  {god.relation === "同我" ? (lang === "zh" ? "同我" : lang === "ja" ? "同我" : "Same") :
                   god.relation === "我生" ? (lang === "zh" ? "我生" : lang === "ja" ? "我生" : "I generate") :
                   god.relation === "我克" ? (lang === "zh" ? "我克" : lang === "ja" ? "我克" : "I control") :
                   god.relation === "克我" ? (lang === "zh" ? "克我" : lang === "ja" ? "克我" : "Controls me") :
                   god.relation === "生我" ? (lang === "zh" ? "生我" : lang === "ja" ? "生我" : "Generates me") : ""
                } · {god.element}
                </p>
              </div>
            );
          })}
        </div>

        {/* Ten Gods distribution */}
        {calcResult.tenGodCounts && (
          <div className="mt-4 pt-4 border-t border-gold-600/10">
            <p className="text-xs text-mystic-400 text-center mb-3">
              {lang === "zh" ? "十神分布" : lang === "ja" ? "十神分布" : "Distribution"}
            </p>
            <div className="space-y-1.5">
              {Object.entries(calcResult.tenGodCounts as Record<string, number>).map(([name, count]) => (
                <div key={name} className="flex items-center gap-3 text-xs">
                  <span className="w-16 text-right text-mystic-400">{tenGodNames[name] || name}</span>
                  <div className="flex-1 h-1.5 bg-mystic-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gold-600/50 rounded-full"
                      style={{ width: `${(count / 3) * 100}%` }} />
                  </div>
                  <span className="w-3 text-mystic-300">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Deep Ten Gods Reading */}
      {calcResult.tenGodsReading && (
        <div className="mb-6">
          <h2 className="text-xl font-display gold-text mb-6 text-center tracking-widest">
            {lang === "zh" ? "十神格局解读" : lang === "ja" ? "十神格局解読" : "Ten Gods Analysis"}
          </h2>

          {/* DM Strength */}
          <div className="mystic-card rounded-sm p-5 mb-4">
            <h4 className="text-xs text-gold-400 tracking-wider mb-2">
              {lang === "zh" ? "日主旺衰" : lang === "ja" ? "日主旺衰" : "DM Strength"}
            </h4>
            <p className="text-xs text-mystic-300 leading-relaxed">
              {calcResult.tenGodsReading.dmStrength[lang] || calcResult.tenGodsReading.dmStrength.zh}
            </p>
            <div className="flex gap-4 mt-3 text-xs">
              <span className="text-gold-400">
                {lang === "zh" ? "助力" : lang === "ja" ? "助力" : "Favorable"}: {calcResult.tenGodsReading.favorableGods?.join("、")}
              </span>
              <span className="text-mystic-500">
                {lang === "zh" ? "挑战" : lang === "ja" ? "課題" : "Challenge"}: {calcResult.tenGodsReading.challengingGods?.join("、")}
              </span>
            </div>
          </div>

          {/* Pillar-by-pillar readings */}
          {calcResult.tenGodsReading.pillarReadings?.length > 0 && (
            <div className="space-y-4 mb-4">
              {calcResult.tenGodsReading.pillarReadings.map((pr: any, i: number) => (
                <div key={i} className="mystic-card rounded-sm p-5 border-l-2 border-gold-500/30">
                  <h4 className="text-xs text-gold-400 tracking-wider mb-2">
                    {pr.pillarName} · {pr.godName}（{pr.element}）
                  </h4>
                  <p className="text-xs text-mystic-300 leading-relaxed">
                    {pr.interpretation[lang] || pr.interpretation.zh}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Combinations */}
          {calcResult.tenGodsReading.combinations?.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs text-gold-400 tracking-wider mb-3 text-center">
                {lang === "zh" ? "关键组合" : lang === "ja" ? "重要組合" : "Key Combinations"}
              </h4>
              {calcResult.tenGodsReading.combinations.map((c: any, i: number) => (
                <div key={i} className="mystic-card rounded-sm p-5 mb-3">
                  <h5 className="text-sm text-gold-300 mb-2">{c.name[lang] || c.name.zh}</h5>
                  <p className="text-xs text-mystic-300 leading-relaxed mb-2">{c.analysis[lang] || c.analysis.zh}</p>
                  <p className="text-[11px] text-gold-400/80 italic">{c.advice[lang] || c.advice.zh}</p>
                </div>
              ))}
            </div>
          )}

          {/* Real-world guides */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {calcResult.tenGodsReading.personalityGuide && (
              <div className="mystic-card rounded-sm p-4">
                <h4 className="text-xs text-gold-400 tracking-wider mb-1">
                  {lang === "zh" ? "性格特质" : lang === "ja" ? "性格" : "Personality"}
                </h4>
                <p className="text-[11px] text-mystic-300 leading-relaxed">
                  {calcResult.tenGodsReading.personalityGuide[lang] || calcResult.tenGodsReading.personalityGuide.zh}
                </p>
              </div>
            )}
            {calcResult.tenGodsReading.careerGuide && (
              <div className="mystic-card rounded-sm p-4">
                <h4 className="text-xs text-gold-400 tracking-wider mb-1">
                  {lang === "zh" ? "事业方向" : lang === "ja" ? "キャリア" : "Career"}
                </h4>
                <p className="text-[11px] text-mystic-300 leading-relaxed">
                  {calcResult.tenGodsReading.careerGuide[lang] || calcResult.tenGodsReading.careerGuide.zh}
                </p>
              </div>
            )}
            {calcResult.tenGodsReading.relationshipGuide && (
              <div className="mystic-card rounded-sm p-4">
                <h4 className="text-xs text-gold-400 tracking-wider mb-1">
                  {lang === "zh" ? "人际感情" : lang === "ja" ? "人間関係" : "Relationships"}
                </h4>
                <p className="text-[11px] text-mystic-300 leading-relaxed">
                  {calcResult.tenGodsReading.relationshipGuide[lang] || calcResult.tenGodsReading.relationshipGuide.zh}
                </p>
              </div>
            )}
            {calcResult.tenGodsReading.wealthGuide && (
              <div className="mystic-card rounded-sm p-4">
                <h4 className="text-xs text-gold-400 tracking-wider mb-1">
                  {lang === "zh" ? "财运分析" : lang === "ja" ? "財運" : "Wealth"}
                </h4>
                <p className="text-[11px] text-mystic-300 leading-relaxed">
                  {calcResult.tenGodsReading.wealthGuide[lang] || calcResult.tenGodsReading.wealthGuide.zh}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Shen Sha */}
      {shenSha.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-display gold-text mb-6 text-center tracking-widest">{labels.shenSha}</h2>
          <div className="mystic-card rounded-sm p-6">
            <div className="flex flex-wrap gap-2">
              {shenSha.map((s: any, i: number) => (
                <div key={i} className={`px-3 py-2 rounded-sm text-xs ${
                  s.type === "auspicious" ? "bg-gold-950/20 border border-gold-600/20" : "bg-red-950/10 border border-red-600/20"
                }`}>
                  <span className={s.type === "auspicious" ? "text-gold-400" : "text-red-400"}>
                    {s.name}
                  </span>
                  <span className="text-mystic-500 ml-1">· {s.pillar}柱</span>
                  <p className="text-[10px] text-mystic-400 mt-0.5">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Dayun */}
      {dayun.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-display gold-text mb-6 text-center tracking-widest">{labels.dayun}</h2>
          <div className="mystic-card rounded-sm p-6 overflow-x-auto">
            <div className="flex gap-2 min-w-[600px]">
              {dayun.map((d: any, i: number) => (
                <div key={i} className="flex-1 text-center p-3 rounded-sm"
                  style={{ background: d.score >= 5 ? "rgba(184,137,30,0.12)" : d.score >= 4 ? "rgba(184,137,30,0.08)" : d.score >= 3 ? "rgba(184,137,30,0.04)" : "rgba(139,69,19,0.06)" }}>
                  <p className="text-[10px] text-mystic-400">{d.years}</p>
                  <p className="text-lg font-calligraphy gold-text mt-1">{d.stem}{d.branch}</p>
                  <div className="flex justify-center gap-0.5 mt-2">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <div key={j} className={`w-2 h-2 rounded-full ${j < d.score ? "bg-gold-500" : "bg-mystic-700"}`} />
                    ))}
                  </div>
                  <p className="text-[10px] text-mystic-400 mt-1">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Industries + Partner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {industries.length > 0 && (
          <div className="mystic-card rounded-sm p-6">
            <h3 className="text-sm text-gold-400 tracking-wider mb-3 text-center">{labels.industry}</h3>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {industries.map((ind: string) => (
                <span key={ind} className="px-3 py-1 text-[10px] bg-gold-950/20 border border-gold-600/15 rounded-sm text-gold-400">
                  {ind}
                </span>
              ))}
            </div>
          </div>
        )}

        {partner && (
          <div className="mystic-card rounded-sm p-6">
            <h3 className="text-sm text-gold-400 tracking-wider mb-3 text-center">{labels.partner}</h3>
            <p className="text-xs text-mystic-300 leading-relaxed mb-3">{partner.desc}</p>
            {partner.bestStems?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 justify-center">
                {partner.bestStems.map((s: string) => (
                  <span key={s} className="px-3 py-1 text-xs bg-gold-950/30 border border-gold-600/20 rounded-sm text-gold-400 font-calligraphy">
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.section>
  );
}

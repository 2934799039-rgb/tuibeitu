import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DestinyOverview } from "@/features/readings/components/ResultSections/DestinyOverview";
import { AIAnalysis } from "@/features/readings/components/ResultSections/AIAnalysis";
import { TrendChart } from "@/features/readings/components/ResultSections/TrendChart";
import { Recommendations } from "@/features/readings/components/ResultSections/Recommendations";
import { SchoolIcon } from "@/features/ui/components/SchoolIcon";
import { schools } from "@/config/schools";
import { generateReading } from "@/lib/knowledge/engine";
import { lookupHexagram } from "@/lib/knowledge/hexagrams";
import { getBaziTalisman, getZhouyiTalisman } from "@/lib/knowledge/talisman";
import { TalismanicAdvice } from "@/features/readings/components/ResultSections/TalismanicAdvice";
import { ChatPanel } from "@/features/readings/components/ResultSections/ChatPanel";
import { ProfessionalBazi } from "@/features/readings/components/ResultSections/ProfessionalBazi";
import { ZhouyiReading } from "@/features/readings/components/ResultSections/ZhouyiReading";

type Props = {
  params: Promise<{ school: string; id: string; locale: string }>;
};

export default async function ResultsPage({ params }: Props) {
  const { school, id, locale } = await params;

  if (!schools.find((s) => s.id === school)) {
    notFound();
  }

  const t = await getTranslations("results");
  const ct = await getTranslations("common");
  const schoolT = await getTranslations("schools");

  const reading = await prisma.userReading.findUnique({
    where: { id },
    include: { result: true },
  });

  if (!reading || reading.status !== "COMPLETED") {
    notFound();
  }

  const result = reading.result;
  if (!result) notFound();

  const calcResult = result.calculationResult as any;
  const chartData = result.chartData as any;

  // Regenerate text from calc data using current locale (not stored locale)
  let aiAnalysis = result.aiAnalysis as any;
  let recommendations = result.recommendations as any;

  if (school === "bazi" && calcResult.dayMaster) {
    const fresh = generateReading(calcResult, locale);
    aiAnalysis = {
      personality: fresh.personality, wealth: fresh.wealth, love: fresh.love,
      health: fresh.health, career: fresh.career, yearlyTrend: fresh.yearlyTrend,
      summary: fresh.summary, elementNotes: fresh.elementNotes,
    };
    recommendations = fresh.recommendations;
  }

  if (school === "zhouyi" && typeof calcResult.hexagramIndex === "number") {
    const hex = lookupHexagram(calcResult.hexagramIndex);
    const lang = locale === "zh" ? "zh" : locale === "ja" ? "ja" : "en";
    aiAnalysis = {
      personality: hex.domains.love.analysis[lang] || hex.domains.love.analysis.en,
      wealth: hex.domains.wealth.analysis[lang] || hex.domains.wealth.analysis.en,
      love: hex.domains.love.advice[lang] || hex.domains.love.advice.en,
      health: hex.domains.health.analysis[lang] || hex.domains.health.analysis.en,
      career: hex.domains.career.analysis[lang] || hex.domains.career.analysis.en,
      yearlyTrend: hex.domains.decision.analysis[lang] || hex.domains.decision.analysis.en,
      summary: hex.name[lang] || hex.name.en,
    };
    calcResult._hexagram = hex;
  }

  // Talismanic advice based on reading
  let talismanData = null;
  if (school === "bazi" && calcResult.dayMaster) {
    talismanData = getBaziTalisman(calcResult.dayMaster.element, locale);
  } else if (school === "zhouyi" && typeof calcResult.hexagramIndex === "number") {
    talismanData = getZhouyiTalisman(calcResult.hexagramIndex, locale);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <div className="mb-12">
        <Link
          href={`/${school}` as any}
          className="inline-flex items-center gap-1 text-xs text-mystic-400 hover:text-gold-400 transition-colors tracking-widest uppercase"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {ct("back")}
        </Link>

        <div className="text-center mt-6">
          <SchoolIcon school={school as any} size={48} className="text-gold-400 mx-auto mb-3" />
          <p className="text-xs text-mystic-400 tracking-widest uppercase">
            {schoolT(`${school}.name`)}
          </p>
        </div>

        <h1 className="text-3xl md:text-5xl font-calligraphy gold-text mt-4 mb-2 text-center">
          {t("title")}
        </h1>
        {reading.inputData && (reading.inputData as any).year && (
          <p className="text-center text-mystic-400 text-sm tracking-widest">
            {(reading.inputData as any).year}-
            {String((reading.inputData as any).month).padStart(2, "0")}-
            {String((reading.inputData as any).day).padStart(2, "0")}
          </p>
        )}
        {reading.inputData && (reading.inputData as any).question && (
          <p className="text-center text-mystic-300 text-sm italic mt-1">
            &ldquo;{(reading.inputData as any).question}&rdquo;
          </p>
        )}
      </div>

      <DestinyOverview calcResult={calcResult} locale={locale} />

      {school === "bazi" && <ProfessionalBazi calcResult={calcResult} locale={locale} />}

      {school === "zhouyi" ? (
        <ZhouyiReading calcResult={calcResult} aiAnalysis={aiAnalysis} locale={locale} />
      ) : (
        aiAnalysis && <AIAnalysis analysis={aiAnalysis} locale={locale} />
      )}

      {chartData && <TrendChart data={chartData} locale={locale} />}

      {recommendations && (
        <Recommendations recommendations={recommendations} locale={locale} />
      )}

      {talismanData && <TalismanicAdvice data={talismanData} locale={locale} />}

      <ChatPanel readingId={id} locale={locale} />

      <div className="mt-16 text-center flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href={`/${school}` as any}
          className="px-8 py-3 bg-gradient-to-r from-gold-700 to-gold-500 text-mystic-950 text-sm font-semibold tracking-widest uppercase rounded-sm hover:shadow-gold-lg transition-all duration-300"
        >
          {t("newReading")}
        </Link>
        <Link
          href="/history"
          className="px-8 py-3 border border-gold-600/30 text-gold-400 text-sm tracking-widest uppercase rounded-sm hover:border-gold-400 transition-all duration-300"
        >
          {t("share")}
        </Link>
      </div>
    </div>
  );
}

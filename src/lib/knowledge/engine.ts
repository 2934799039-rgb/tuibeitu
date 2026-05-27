import type { BaziResult } from "@/lib/calculators/bazi";
import { getDayMasterProfile } from "./day-masters";
import { getElementInterpretation } from "./five-elements";
import { getRecommendations } from "./recommendations";

const ELEMENT_TO_EN: Record<string, string> = {
  "金": "Metal", "木": "Wood", "水": "Water", "火": "Fire", "土": "Earth",
};

export function generateReading(
  calcResult: BaziResult,
  locale: string
): {
  personality: string;
  wealth: string;
  love: string;
  health: string;
  career: string;
  yearlyTrend: string;
  summary: string;
  recommendations: {
    favorableColors: string[];
    unfavorableColors: string[];
    luckyNumbers: number[];
    favorableDirections: string[];
    favorableElements: string[];
  };
  elementNotes: { element: string; enName: string; note: string; count: number }[];
} {
  const lang = locale === "zh" ? "zh" : locale === "ja" ? "ja" : "en";
  const profile = getDayMasterProfile(calcResult.dayMaster.stem);
  const recs = getRecommendations(calcResult.dayMaster.element, lang);
  const elementCounts = calcResult.fiveElements;

  // Build element notes
  const elementNotes = Object.entries(elementCounts).map(([el, count]) => {
    const interp = getElementInterpretation(el, count as number);
    return {
      element: el,
      enName: ELEMENT_TO_EN[el] || el,
      note: interp[lang] || interp.en,
      count: count as number,
    };
  });

  return {
    personality: profile.personality[lang] || profile.personality.en,
    wealth: profile.wealth[lang] || profile.wealth.en,
    love: profile.love[lang] || profile.love.en,
    health: profile.health[lang] || profile.health.en,
    career: profile.career[lang] || profile.career.en,
    yearlyTrend: profile.yearlyTrend[lang] || profile.yearlyTrend.en,
    summary: profile.summary[lang] || profile.summary.en,
    recommendations: recs,
    elementNotes,
  };
}

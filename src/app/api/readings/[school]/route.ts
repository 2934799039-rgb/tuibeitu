import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";
import { calculateBazi } from "@/lib/calculators/bazi";
import { calcTenGods, countTenGods, calcShenSha, calcDayun, getIndustryRecommendations, getPartnerCompatibility } from "@/lib/calculators/bazi-enhanced";
import { generateReading } from "@/lib/knowledge/engine";
import { generateTenGodsReading } from "@/lib/knowledge/ten-gods-reading";
import { hexagramFromQuestion, lookupHexagram } from "@/lib/knowledge/hexagrams";

const SCHOOL_ENUM: Record<string, string> = {
  bazi: "BAZI", zhouyi: "ZHOUYI",
};

export const ENUM_TO_SCHOOL: Record<string, string> = Object.fromEntries(
  Object.entries(SCHOOL_ENUM).map(([k, v]) => [v, k])
);

const inputSchema = z.object({
  school: z.string(),
  inputData: z.any(),
  locale: z.string().default("en"),
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ school: string }> }
) {
  try {
    const session = await auth();
    const body = await request.json();
    const parsed = inputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { school, inputData, locale } = parsed.data;

    const reading = await prisma.userReading.create({
      data: {
        userId: session?.user?.id || null,
        schoolType: (SCHOOL_ENUM[school] || "BAZI") as any,
        inputData: inputData as any,
        status: "COMPLETED",
        locale,
        result: { create: processReadingNow(school, inputData, locale) },
      },
    });

    return NextResponse.json({ readingId: reading.id });
  } catch (error) {
    console.error("Create reading error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function processReadingNow(
  school: string,
  inputData: Record<string, unknown>,
  locale: string
) {
  const startTime = Date.now();

  if (school === "bazi") {
    const data = inputData as any;
    const calcResult = calculateBazi({
      year: data.year, month: data.month, day: data.day,
      hour: data.hour ?? 12, gender: data.gender ?? "male",
    });
    const reading = generateReading(calcResult, locale);
    const tenGods = calcTenGods(calcResult);
    const tenGodCounts = countTenGods(tenGods);
    const shenSha = calcShenSha(calcResult);
    const dayun = calcDayun(calcResult);
    const industries = getIndustryRecommendations(calcResult.favorableElements);
    const partner = getPartnerCompatibility(
      calcResult.dayMaster.stem, calcResult.fourPillars.day.branch,
      calcResult.fiveElements, calcResult.favorableElements
    );
    const tenGodsReading = generateTenGodsReading(
      tenGods as any, calcResult.dayMaster.element, calcResult.fiveElements, locale
    );

    return {
      calculationResult: {
        ...calcResult,
        tenGods,
        tenGodCounts,
        shenSha,
        dayun,
        industries,
        partner,
        tenGodsReading,
      } as any,
      aiAnalysis: {
        personality: reading.personality,
        wealth: reading.wealth,
        love: reading.love,
        health: reading.health,
        career: reading.career,
        yearlyTrend: reading.yearlyTrend,
        summary: reading.summary,
        elementNotes: reading.elementNotes,
      },
      recommendations: reading.recommendations as any,
      chartData: {
        fiveElements: Object.entries(calcResult.fiveElements).map(
          ([name, value]) => ({ name, value })
        ),
      } as any,
      aiModel: "knowledge-engine",
      generationTimeMs: Date.now() - startTime,
    };
  }

  // zhouyi — I Ching hexagram
  const data = inputData as any;
  const question = data.question || "";
  const hexIdx = typeof data.hexagramIndex === "number" ? data.hexagramIndex : hexagramFromQuestion(question);
  const hex = lookupHexagram(hexIdx);
  const lang = locale === "zh" ? "zh" : locale === "ja" ? "ja" : "en";

  return {
    calculationResult: { school, inputData, hexagram: hex.name[lang] || hex.name.en, hexagramIndex: hexIdx } as any,
    aiAnalysis: {
      personality: hex.domains.love.analysis[lang] || hex.domains.love.analysis.en,
      wealth: hex.domains.wealth.analysis[lang] || hex.domains.wealth.analysis.en,
      love: hex.domains.love.advice[lang] || hex.domains.love.advice.en,
      health: hex.domains.health.analysis[lang] || hex.domains.health.analysis.en,
      career: hex.domains.career.analysis[lang] || hex.domains.career.analysis.en,
      yearlyTrend: hex.domains.decision.analysis[lang] || hex.domains.decision.analysis.en,
      summary: hex.name[lang] || hex.name.en,
    },
    recommendations: hexagramRecs(hexIdx, lang) as any,
    chartData: {
      fiveElements: [
        { name: lang === "zh" ? "福运" : lang === "ja" ? "福運" : "Fortune", value: 3 + (hexIdx % 5) },
        { name: lang === "zh" ? "智慧" : lang === "ja" ? "知恵" : "Wisdom", value: 2 + ((hexIdx * 3) % 6) },
        { name: lang === "zh" ? "时机" : lang === "ja" ? "時機" : "Timing", value: 2 + ((hexIdx * 7) % 6) },
        { name: lang === "zh" ? "努力" : lang === "ja" ? "努力" : "Effort", value: 3 + ((hexIdx * 5) % 5) },
        { name: lang === "zh" ? "耐心" : lang === "ja" ? "忍耐" : "Patience", value: 3 + ((hexIdx * 2) % 5) },
      ],
    } as any,
    aiModel: "knowledge-engine",
    generationTimeMs: Date.now() - startTime,
  };
}

function hexagramRecs(idx: number, lang: string) {
  const colors: Record<string, string[]>[] = [
    { en: ["Gold","Yellow"], zh: ["金色","黄色"], ja: ["金","黄色"] },
    { en: ["Red","Crimson"], zh: ["红色","深红"], ja: ["赤","深紅"] },
    { en: ["Blue","Teal"], zh: ["蓝色","青色"], ja: ["青","ティール"] },
    { en: ["White","Silver"], zh: ["白色","银色"], ja: ["白","シルバー"] },
    { en: ["Green","Jade"], zh: ["绿色","玉色"], ja: ["緑","翡翠"] },
    { en: ["Purple","Violet"], zh: ["紫色","紫罗兰"], ja: ["紫","バイオレット"] },
    { en: ["Black","Navy"], zh: ["黑色","深蓝"], ja: ["黒","ネイビー"] },
    { en: ["Brown","Tan"], zh: ["棕色","棕褐"], ja: ["茶色","タン"] },
  ];
  const dirs: Record<string, string[]>[] = [
    { en: ["East"], zh: ["东方"], ja: ["東"] }, { en: ["Southeast"], zh: ["东南"], ja: ["南東"] },
    { en: ["South"], zh: ["南方"], ja: ["南"] }, { en: ["Southwest"], zh: ["西南"], ja: ["南西"] },
    { en: ["West"], zh: ["西方"], ja: ["西"] }, { en: ["Northwest"], zh: ["西北"], ja: ["北西"] },
    { en: ["North"], zh: ["北方"], ja: ["北"] }, { en: ["Northeast"], zh: ["东北"], ja: ["北東"] },
  ];
  const c = colors[idx % colors.length];
  const d = dirs[idx % dirs.length];
  return {
    favorableColors: c[lang] || c.en, unfavorableColors: [],
    luckyNumbers: [(idx % 9) + 1, ((idx + 3) % 9) + 1, ((idx + 7) % 9) + 1],
    favorableDirections: d[lang] || d.en, favorableElements: [],
  };
}

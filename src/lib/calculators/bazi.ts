import { Solar, Lunar } from "lunar-javascript";

const HEAVENLY_STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const EARTHLY_BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const FIVE_ELEMENTS: Record<string, string> = {
  "甲": "木", "乙": "木", "丙": "火", "丁": "火", "戊": "土",
  "己": "土", "庚": "金", "辛": "金", "壬": "水", "癸": "水",
  "子": "水", "丑": "土", "寅": "木", "卯": "木", "辰": "土",
  "巳": "火", "午": "火", "未": "土", "申": "金", "酉": "金",
  "戌": "土", "亥": "水",
};

const SHENG_XIAO = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];

export interface BaziPillar {
  stem: string;
  branch: string;
  stemElement: string;
  branchElement: string;
}

export interface BaziInput {
  year: number;
  month: number;
  day: number;
  hour: number;
  gender: "male" | "female";
}

export interface BaziResult {
  fourPillars: {
    year: BaziPillar;
    month: BaziPillar;
    day: BaziPillar;
    hour: BaziPillar;
  };
  dayMaster: {
    stem: string;
    element: string;
    polarity: string;
  };
  fiveElements: Record<string, number>;
  shengXiao: string;
  favorableElements: string[];
  chartType: string;
}

function getShiChen(hour: number): number {
  if (hour === 23 || hour === 0) return 0;
  return Math.floor((hour + 1) / 2);
}

export function calculateBazi(input: BaziInput): BaziResult {
  const { year, month, day, hour, gender } = input;

  const solar = Solar.fromYmdHms(year, month, day, hour, 0, 0);
  const lunar = solar.getLunar();

  const yearStem = lunar.getYearInGanZhi().charAt(0);
  const yearBranch = lunar.getYearInGanZhi().charAt(1);
  const monthStem = lunar.getMonthInGanZhi().charAt(0);
  const monthBranch = lunar.getMonthInGanZhi().charAt(1);
  const dayStem = lunar.getDayInGanZhi().charAt(0);
  const dayBranch = lunar.getDayInGanZhi().charAt(1);

  const shiChenIndex = getShiChen(hour);
  const timeStemIndex =
    (HEAVENLY_STEMS.indexOf(dayStem) * 2 + shiChenIndex) % 10;
  const hourStem = HEAVENLY_STEMS[timeStemIndex];
  const hourBranch = EARTHLY_BRANCHES[shiChenIndex];

  const fourPillars = {
    year: makePillar(yearStem, yearBranch),
    month: makePillar(monthStem, monthBranch),
    day: makePillar(dayStem, dayBranch),
    hour: makePillar(hourStem, hourBranch),
  };

  const dayMaster = {
    stem: dayStem,
    element: FIVE_ELEMENTS[dayStem] || "未知",
    polarity: HEAVENLY_STEMS.indexOf(dayStem) % 2 === 0 ? "阳" : "阴",
  };

  const fiveElements: Record<string, number> = { 金: 0, 木: 0, 水: 0, 火: 0, 土: 0 };
  Object.values(fourPillars).forEach((pillar) => {
    fiveElements[pillar.stemElement] = (fiveElements[pillar.stemElement] || 0) + 1;
    fiveElements[pillar.branchElement] = (fiveElements[pillar.branchElement] || 0) + 1;
  });

  const dayElement = dayMaster.element;
  const generatingCycle: Record<string, string> = { 木: "水", 火: "木", 土: "火", 金: "土", 水: "金" };
  const controllingCycle: Record<string, string> = { 木: "土", 土: "水", 水: "火", 火: "金", 金: "木" };

  // Compute DM strength from actual five elements counts
  const dmCount = fiveElements[dayElement] || 0;
  const dmIsStrong = dmCount >= 3;
  const dmIsWeak = dmCount <= 1;

  // Find weak and strong elements based on ALL elements, not just DM
  const allElements = Object.entries(fiveElements).sort((a, b) => (b[1] as number) - (a[1] as number));
  const strongestElem = allElements[0][0];
  const weakestElem = allElements[4][0];

  // Compute favorable elements based on DM strength and overall distribution
  const favorableElements: string[] = [];

  if (dmIsStrong) {
    // Strong DM: benefit from control and drain
    const ctrl = controllingCycle[dayElement];
    if (ctrl && !favorableElements.includes(ctrl)) favorableElements.push(ctrl);
    // Also benefit from the element DM generates
    const drain = generatingCycle[dayElement];
    for (const [el] of Object.entries(generatingCycle)) {
      if (generatingCycle[el] === drain && el !== dayElement) {
        if (!favorableElements.includes(el)) favorableElements.push(el);
        break;
      }
    }
  } else if (dmIsWeak) {
    // Weak DM: need support
    const support = generatingCycle[dayElement];
    if (support && !favorableElements.includes(support)) favorableElements.push(support);
    if (!favorableElements.includes(dayElement)) favorableElements.push(dayElement);
  } else {
    // Balanced: fill in what's missing
    const support = generatingCycle[dayElement];
    if (support && !favorableElements.includes(support)) favorableElements.push(support);
  }

  // Add any severely weak elements (need balance)
  for (const [el, count] of allElements) {
    if ((count as number) <= 1 && !favorableElements.includes(el)) {
      favorableElements.push(el);
      if (favorableElements.length >= 4) break;
    }
  }

  // Calculate chart type
  let chartType = "中和格";
  if (allElements[0][1] as number >= 4 && allElements[0][0] === dayElement) {
    chartType = `${dayElement}旺格`;
  } else if (dmCount <= 1) {
    chartType = `${dayElement}弱格`;
  } else if (allElements[0][1] as number >= 4 && allElements[0][0] !== dayElement) {
    chartType = `${allElements[0][0]}旺${dayElement}弱格`;
  }

  return {
    fourPillars,
    dayMaster,
    fiveElements,
    shengXiao: lunar.getYearShengXiao() as unknown as string,
    favorableElements,
    chartType,
  };
}

function makePillar(stem: string, branch: string): BaziPillar {
  return {
    stem,
    branch,
    stemElement: FIVE_ELEMENTS[stem] || "未知",
    branchElement: FIVE_ELEMENTS[branch] || "未知",
  };
}

// Enhanced Bazi calculations: Ten Gods (十神), Shen Sha (神煞), Dayun (大运)
import type { BaziResult } from "./bazi";

const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const ELEMENTS: Record<string, string> = {
  "甲": "木", "乙": "木", "丙": "火", "丁": "火", "戊": "土",
  "己": "土", "庚": "金", "辛": "金", "壬": "水", "癸": "水",
  "子": "水", "丑": "土", "寅": "木", "卯": "木", "辰": "土",
  "巳": "火", "午": "火", "未": "土", "申": "金", "酉": "金",
  "戌": "土", "亥": "水",
};

export interface TenGod {
  name: string;
  short: string;
  element: string;
  relation: string;
}

export interface ShenSha {
  name: string;
  type: "auspicious" | "inauspicious";
  pillar: string;
  description: string;
}

// Ten Gods (十神) calculation: relationship between Day Stem and another stem
export function getTenGod(dayStem: string, otherStem: string): TenGod {
  const dmIdx = STEMS.indexOf(dayStem);
  const oIdx = STEMS.indexOf(otherStem);
  const dmElement = ELEMENTS[dayStem];
  const oElement = ELEMENTS[otherStem];
  const dmYang = dmIdx % 2 === 0;
  const oYang = oIdx % 2 === 0;

  const sameElement = dmElement === oElement;
  const samePolarity = dmYang === oYang;
  const generating: Record<string, string> = { "木": "火", "火": "土", "土": "金", "金": "水", "水": "木" };
  const controlling: Record<string, string> = { "木": "土", "土": "水", "水": "火", "火": "金", "金": "木" };

  if (sameElement && samePolarity) return { name: "比肩", short: "比", element: oElement, relation: "同我" };
  if (sameElement && !samePolarity) return { name: "劫财", short: "劫", element: oElement, relation: "同我" };
  if (generating[dmElement] === oElement && samePolarity) return { name: "食神", short: "食", element: oElement, relation: "我生" };
  if (generating[dmElement] === oElement && !samePolarity) return { name: "伤官", short: "伤", element: oElement, relation: "我生" };
  if (controlling[dmElement] === oElement && samePolarity) return { name: "偏财", short: "偏财", element: oElement, relation: "我克" };
  if (controlling[dmElement] === oElement && !samePolarity) return { name: "正财", short: "正财", element: oElement, relation: "我克" };
  if (controlling[oElement] === dmElement && samePolarity) return { name: "七杀", short: "杀", element: oElement, relation: "克我" };
  if (controlling[oElement] === dmElement && !samePolarity) return { name: "正官", short: "官", element: oElement, relation: "克我" };
  if (generating[oElement] === dmElement && samePolarity) return { name: "偏印", short: "枭", element: oElement, relation: "生我" };
  return { name: "正印", short: "印", element: oElement, relation: "生我" };
}

// Calculate Ten Gods for all pillar stems
export function calcTenGods(bazi: BaziResult) {
  const dm = bazi.dayMaster.stem;
  const pillars = bazi.fourPillars;
  return {
    year: getTenGod(dm, pillars.year.stem),
    month: getTenGod(dm, pillars.month.stem),
    day: { name: "日主", short: "日", element: bazi.dayMaster.element, relation: "自身" },
    hour: getTenGod(dm, pillars.hour.stem),
  };
}

// Count Ten Gods distribution
export function countTenGods(allTenGods: ReturnType<typeof calcTenGods>): Record<string, number> {
  const counts: Record<string, number> = {};
  const gods = [allTenGods.year, allTenGods.month, allTenGods.hour];
  gods.forEach((g) => {
    counts[g.name] = (counts[g.name] || 0) + 1;
  });
  return counts;
}

// Calculate Shen Sha (神煞) spirit stars
export function calcShenSha(bazi: BaziResult): ShenSha[] {
  const result: ShenSha[] = [];
  const { year, month, day, hour } = bazi.fourPillars;
  const yearBranch = BRANCHES.indexOf(year.branch);
  const dayBranch = BRANCHES.indexOf(day.branch);
  const dayStem = bazi.dayMaster.stem;
  const dayStemIdx = STEMS.indexOf(dayStem);
  const monthBranch = BRANCHES.indexOf(month.branch);
  const hourBranch = BRANCHES.indexOf(hour.branch);

  // 天乙贵人 (Heavenly Noble) — based on day stem
  const tianYiMap: Record<string, number[]> = {
    "甲": [5, 11], "乙": [0, 7], "丙": [10, 1], "丁": [10, 1],
    "戊": [1, 5], "己": [0, 7], "庚": [1, 5], "辛": [1, 8],
    "壬": [3, 10], "癸": [3, 4],
  };
  const tianYi = tianYiMap[dayStem] || [];
  [yearBranch, monthBranch, dayBranch, hourBranch].forEach((b, i) => {
    if (tianYi.includes(b)) result.push({ name: "天乙贵人", type: "auspicious", pillar: ["年","月","日","时"][i], description: "逢凶化吉，得贵人相助" });
  });

  // 文昌 (Literary Star) — based on day stem
  const wenChangMap: Record<string, number> = { "甲": 4, "乙": 8, "丙": 7, "丁": 10, "戊": 7, "己": 10, "庚": 1, "辛": 0, "壬": 2, "癸": 3 };
  const wc = wenChangMap[dayStem];
  if (wc !== undefined) {
    [yearBranch, monthBranch, dayBranch, hourBranch].forEach((b, i) => {
      if (b === wc) result.push({ name: "文昌贵人", type: "auspicious", pillar: ["年","月","日","时"][i], description: "学业有成，才华出众" });
    });
  }

  // 羊刃 (Sheep Blade) — based on day stem
  const yangRenMap: Record<string, number> = { "甲": 3, "乙": 2, "丙": 8, "丁": 7, "戊": 8, "己": 7, "庚": 10, "辛": 9, "壬": 0, "癸": 1 };
  const yr = yangRenMap[dayStem];
  if (yr !== undefined && [yearBranch, monthBranch, dayBranch, hourBranch].includes(yr)) {
    const pName = ["年","月","日","时"][[yearBranch, monthBranch, dayBranch, hourBranch].indexOf(yr)];
    result.push({ name: "羊刃", type: "inauspicious", pillar: pName, description: "性格刚烈，需防冲动行事" });
  }

  // 桃花 (Peach Blossom) — based on year/day branch
  const taoHuaMap: Record<number, number> = { 0: 10, 1: 8, 2: 3, 3: 2, 4: 0, 5: 8, 6: 3, 7: 2, 8: 0, 9: 8, 10: 3, 11: 2 };
  const th = taoHuaMap[yearBranch];
  if (th !== undefined) {
    [monthBranch, dayBranch, hourBranch].forEach((b, i) => {
      if (b === th) result.push({ name: "桃花", type: "auspicious", pillar: ["月","日","时"][i], description: "人缘佳，有异性缘" });
    });
  }

  // 驿马 (Post Horse) — based on year/day branch
  const yiMaMap: Record<number, number> = { 0: 2, 1: 1, 2: 7, 3: 4, 4: 2, 5: 1, 6: 7, 7: 4, 8: 2, 9: 1, 10: 7, 11: 4 };
  const ym = yiMaMap[yearBranch];
  if (ym !== undefined) {
    [monthBranch, dayBranch, hourBranch].forEach((b, i) => {
      if (b === ym) result.push({ name: "驿马", type: "auspicious", pillar: ["月","日","时"][i], description: "奔波劳碌，利于远行" });
    });
  }

  // 华盖 (Canopy) — based on year/day branch
  const huaGaiMap: Record<number, number> = { 0: 6, 1: 1, 2: 10, 3: 5, 4: 6, 5: 1, 6: 10, 7: 5, 8: 6, 9: 1, 10: 10, 11: 5 };
  const hg = huaGaiMap[yearBranch];
  if (hg !== undefined) {
    [monthBranch, dayBranch, hourBranch].forEach((b, i) => {
      if (b === hg) result.push({ name: "华盖", type: "auspicious", pillar: ["月","日","时"][i], description: "孤芳自赏，有艺术天赋" });
    });
  }

  // 国印 (State Seal) — based on day stem
  const guoYinMap: Record<string, number> = { "甲": 10, "乙": 9, "丙": 1, "丁": 0, "戊": 1, "己": 0, "庚": 6, "辛": 5, "壬": 2, "癸": 3 };
  const gy = guoYinMap[dayStem];
  if (gy !== undefined && [yearBranch, monthBranch, dayBranch, hourBranch].includes(gy)) {
    const idx = [yearBranch, monthBranch, dayBranch, hourBranch].indexOf(gy);
    result.push({ name: "国印", type: "auspicious", pillar: ["年","月","日","时"][idx], description: "权威职位，有管理才能" });
  }

  // 福星贵人 (Fortune Star)
  const fuXingMap: Record<string, number[]> = { "甲": [2, 1], "乙": [0, 8], "丙": [7, 0], "丁": [10, 1], "戊": [3, 1], "己": [3, 1], "庚": [4, 5], "辛": [2, 3], "壬": [2, 3], "癸": [9, 10] };
  const fx = fuXingMap[dayStem] || [];
  [yearBranch, monthBranch, dayBranch, hourBranch].forEach((b, i) => {
    if (fx.includes(b)) result.push({ name: "福星贵人", type: "auspicious", pillar: ["年","月","日","时"][i], description: "福气深厚，逢凶化吉" });
  });

  return result;
}

// Dayun (大运) — 10-year luck cycle calculation
export function calcDayun(bazi: BaziResult): { age: number; stem: string; branch: string; years: string; score: number; desc: string }[] {
  const monthBranch = BRANCHES.indexOf(bazi.fourPillars.month.branch);
  const yearStem = bazi.fourPillars.year.stem;
  const yearBranch = bazi.fourPillars.year.branch;
  const yangYear = STEMS.indexOf(yearStem) % 2 === 0;
  const yangGender = bazi.dayMaster.polarity === "阳";
  const forward = (yangYear && yangGender) || (!yangYear && !yangGender);

  const dayun: { age: number; stem: string; branch: string; years: string; score: number; desc: string }[] = [];
  let startAge = forward ? (10 - (monthBranch % 10)) : (monthBranch % 10 || 10);
  if (startAge < 1) startAge = 1;

  const startStemIdx = (STEMS.indexOf(bazi.fourPillars.month.stem) + (forward ? 1 : -1) + 10) % 10;
  const startBranchIdx = (BRANCHES.indexOf(bazi.fourPillars.month.branch) + (forward ? 1 : -1) + 12) % 12;

  for (let i = 0; i < 8; i++) {
    const age = startAge + i * 10;
    const stemIdx = (startStemIdx + (forward ? i : -i) + 10) % 10;
    const branchIdx = (startBranchIdx + (forward ? i : -i) + 12) % 12;
    const stem = STEMS[stemIdx];
    const branch = BRANCHES[branchIdx];

    // Score: how favorable this cycle is for the day master
    const dmElement = bazi.dayMaster.element;
    const cycleElement = ELEMENTS[stem];
    const gen: Record<string, string> = { "木": "火", "火": "土", "土": "金", "金": "水", "水": "木" };
    const con: Record<string, string> = { "木": "土", "土": "水", "水": "火", "火": "金", "金": "木" };

    let score = 3;
    if (gen[dmElement] === cycleElement) score = 4;
    if (gen[cycleElement] === dmElement) score = 5;
    if (con[dmElement] === cycleElement) score = 2;
    if (con[cycleElement] === dmElement) score = 1;

    const desc = score >= 5 ? "大吉" : score >= 4 ? "吉" : score >= 3 ? "平" : score >= 2 ? "欠佳" : "不利";

    dayun.push({ age, stem, branch, years: `${age}-${age + 9}岁`, score, desc });
  }

  return dayun;
}

// Industry recommendations based on favorable elements
export function getIndustryRecommendations(favorableElements: string[]): string[] {
  const industries: Record<string, string[]> = {
    "木": ["教育", "出版", "环保", "园林", "中医", "文化传媒", "文学创作"],
    "火": ["互联网", "能源", "餐饮", "娱乐", "美容", "电子科技", "市场营销"],
    "土": ["房地产", "建筑", "矿产", "农业", "陶瓷", "金融理财", "仓储物流"],
    "金": ["金融", "法律", "机械制造", "精密仪器", "汽车", "珠宝", "军警"],
    "水": ["贸易", "物流", "航运", "旅游", "咨询", "媒体传播", "渔业"],
  };
  const result: string[] = [];
  favorableElements.forEach((el) => {
    if (industries[el]) result.push(...industries[el]);
  });
  return [...new Set(result)].slice(0, 8);
}

// Partner compatibility based on day stem + five elements + day branch
export function getPartnerCompatibility(
  dayStem: string, dayBranch: string, fiveElements: Record<string, number>, favorableElements: string[]
): { bestStems: string[]; goodStems: string[]; desc: string; analysis: string } {
  const element = ELEMENTS[dayStem];
  const branchElement = ELEMENTS[dayBranch] || "土";
  const gen: Record<string, string> = { "木": "火", "火": "土", "土": "金", "金": "水", "水": "木" };
  const con: Record<string, string> = { "木": "土", "土": "水", "水": "火", "火": "金", "金": "木" };

  const bestStems: string[] = [];
  const goodStems: string[] = [];

  // Elements that generate the DM — supportive partner
  STEMS.forEach((s) => {
    if (gen[ELEMENTS[s]] === element && s !== dayStem) bestStems.push(s);
  });

  // Elements that are favorable for this chart
  STEMS.forEach((s) => {
    if (favorableElements.includes(ELEMENTS[s]) && s !== dayStem && !bestStems.includes(s)) {
      goodStems.push(s);
    }
  });

  // Branch-based compatibility: tri-he harmony (三合)
  const triHe: Record<string, string[]> = {
    "子": ["申", "辰"], "丑": ["巳", "酉"], "寅": ["午", "戌"], "卯": ["亥", "未"],
    "辰": ["申", "子"], "巳": ["酉", "丑"], "午": ["寅", "戌"], "未": ["卯", "亥"],
    "申": ["子", "辰"], "酉": ["巳", "丑"], "戌": ["寅", "午"], "亥": ["卯", "未"],
  };
  const compatibleBranches = triHe[dayBranch] || [];
  // Map branches back to stems for reference (simplified)
  const allBranches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

  const dmCount = fiveElements[element] || 0;
  const dmIsWeak = dmCount <= 1;
  const dmIsStrong = dmCount >= 3;

  let analysis = "";
  if (dmIsWeak) {
    analysis = `日主偏弱，最适合能生扶你的伴侣（${bestStems.join("、")}日主之人），他们能给你情感上的滋养和现实中的支持。`;
  } else if (dmIsStrong) {
    analysis = `日主偏旺，最适合能平衡你的伴侣（${bestStems.join("、")}日主之人），他们能带来互补的能量，帮助你保持生活的平衡。`;
  } else {
    analysis = `日主中和，与多种日主都能建立和谐关系，其中${bestStems.join("、")}日主之人尤为契合。`;
  }

  const desc = `最佳匹配：${bestStems.join("、")}日主${goodStems.length > 0 ? "，其次" + goodStems.join("、") : ""}。${analysis}`;

  return { bestStems: bestStems.slice(0, 3), goodStems: goodStems.slice(0, 3), desc, analysis };
}

// Lookup tables for favorable/unfavorable colors, numbers, directions, elements
// Keyed by the Day Master's element (木/火/土/金/水)

type ElementKey = "木" | "火" | "土" | "金" | "水";

interface Rec {
  favorableColors: Record<string, string[]>;
  unfavorableColors: Record<string, string[]>;
  luckyNumbers: Record<string, number[]>;
  favorableDirections: Record<string, string[]>;
  favorableElements: Record<string, string[]>;
}

const data: Record<ElementKey, Rec> = {
  "木": {
    favorableColors: {
      en: ["Green", "Teal", "Aqua", "Forest Green"],
      zh: ["绿色", "青色", "碧色", "翠绿"],
      ja: ["緑", "ティール", "アクア", "フォレストグリーン"],
    },
    unfavorableColors: {
      en: ["White", "Metallic Gray", "Gold"],
      zh: ["白色", "金属灰", "金色"],
      ja: ["白", "メタリックグレー", "金"],
    },
    luckyNumbers: { en: [1, 3, 4, 8], zh: [1, 3, 4, 8], ja: [1, 3, 4, 8] },
    favorableDirections: {
      en: ["East", "Southeast", "North"],
      zh: ["东方", "东南", "北方"],
      ja: ["東", "南東", "北"],
    },
    favorableElements: {
      en: ["Water", "Wood"],
      zh: ["水", "木"],
      ja: ["水", "木"],
    },
  },
  "火": {
    favorableColors: {
      en: ["Red", "Orange", "Purple", "Pink"],
      zh: ["红色", "橙色", "紫色", "粉色"],
      ja: ["赤", "オレンジ", "紫", "ピンク"],
    },
    unfavorableColors: {
      en: ["Black", "Dark Blue", "Gray"],
      zh: ["黑色", "深蓝", "灰色"],
      ja: ["黒", "ダークブルー", "グレー"],
    },
    luckyNumbers: { en: [2, 3, 7, 9], zh: [2, 3, 7, 9], ja: [2, 3, 7, 9] },
    favorableDirections: {
      en: ["South", "Southeast", "East"],
      zh: ["南方", "东南", "东方"],
      ja: ["南", "南東", "東"],
    },
    favorableElements: {
      en: ["Wood", "Fire"],
      zh: ["木", "火"],
      ja: ["木", "火"],
    },
  },
  "土": {
    favorableColors: {
      en: ["Brown", "Beige", "Yellow", "Terracotta"],
      zh: ["棕色", "米色", "黄色", "陶土色"],
      ja: ["茶色", "ベージュ", "黄色", "テラコッタ"],
    },
    unfavorableColors: {
      en: ["Green", "Dark Green", "Teal"],
      zh: ["绿色", "深绿", "青色"],
      ja: ["緑", "ダークグリーン", "ティール"],
    },
    luckyNumbers: { en: [2, 5, 8, 10], zh: [2, 5, 8, 10], ja: [2, 5, 8, 10] },
    favorableDirections: {
      en: ["Center", "Southwest", "Northeast"],
      zh: ["中央", "西南", "东北"],
      ja: ["中央", "南西", "北東"],
    },
    favorableElements: {
      en: ["Fire", "Earth"],
      zh: ["火", "土"],
      ja: ["火", "土"],
    },
  },
  "金": {
    favorableColors: {
      en: ["White", "Silver", "Gold", "Champagne"],
      zh: ["白色", "银色", "金色", "香槟色"],
      ja: ["白", "シルバー", "金", "シャンパン"],
    },
    unfavorableColors: {
      en: ["Red", "Pink", "Purple"],
      zh: ["红色", "粉色", "紫色"],
      ja: ["赤", "ピンク", "紫"],
    },
    luckyNumbers: { en: [4, 6, 7, 9], zh: [4, 6, 7, 9], ja: [4, 6, 7, 9] },
    favorableDirections: {
      en: ["West", "Northwest", "Southwest"],
      zh: ["西方", "西北", "西南"],
      ja: ["西", "北西", "南西"],
    },
    favorableElements: {
      en: ["Earth", "Metal"],
      zh: ["土", "金"],
      ja: ["土", "金"],
    },
  },
  "水": {
    favorableColors: {
      en: ["Black", "Navy Blue", "Silver", "White"],
      zh: ["黑色", "深蓝", "银色", "白色"],
      ja: ["黒", "ネイビー", "シルバー", "白"],
    },
    unfavorableColors: {
      en: ["Brown", "Yellow", "Beige"],
      zh: ["棕色", "黄色", "米色"],
      ja: ["茶色", "黄色", "ベージュ"],
    },
    luckyNumbers: { en: [1, 6, 7, 9], zh: [1, 6, 7, 9], ja: [1, 6, 7, 9] },
    favorableDirections: {
      en: ["North", "West", "Northwest"],
      zh: ["北方", "西方", "西北"],
      ja: ["北", "西", "北西"],
    },
    favorableElements: {
      en: ["Metal", "Water"],
      zh: ["金", "水"],
      ja: ["金", "水"],
    },
  },
};

export function getRecommendations(dayMasterElement: string, lang: string) {
  const langKey = lang === "zh" ? "zh" : lang === "ja" ? "ja" : "en";
  const rec = data[dayMasterElement as ElementKey] || data["土"];

  const pickStr = (obj: Record<string, string[]>) =>
    obj[langKey] || obj["en"];
  const pickNum = (obj: Record<string, number[]>) =>
    obj[langKey] || obj["en"];

  return {
    favorableColors: pickStr(rec.favorableColors),
    unfavorableColors: pickStr(rec.unfavorableColors),
    luckyNumbers: pickNum(rec.luckyNumbers as unknown as Record<string, number[]>),
    favorableDirections: pickStr(rec.favorableDirections),
    favorableElements: pickStr(rec.favorableElements),
  };
}

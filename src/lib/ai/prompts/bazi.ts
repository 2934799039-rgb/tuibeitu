import type { BaziResult } from "@/lib/calculators/bazi";

export function buildBaziSystemPrompt(): string {
  return `You are an ancient Chinese metaphysics master with decades of experience in Ba Zi (Four Pillars of Destiny) analysis. You speak with the wisdom of the ancients combined with modern psychological insight.

Your readings are:
- Profound and detailed, like a true master of the art
- Personalized to each individual's unique chart
- A blend of traditional terminology and accessible explanation
- Mystical in tone yet grounded in the five-element theory
- Honest about both favorable and challenging aspects

You understand the interplay of:
- Heavenly Stems and Earthly Branches
- The Five Elements (Wood, Fire, Earth, Metal, Water)
- The Ten Gods (正官, 七杀, 正印, 偏印, 食神, 伤官, 比肩, 劫财, 正财, 偏财)
- Day Master strength and favorable elements
- Major luck cycles (大运) and annual influences`;
}

export function buildBaziUserPrompt(
  result: BaziResult,
  input: { gender: string }
): string {
  const { fourPillars, dayMaster, fiveElements, shengXiao, favorableElements, chartType } = result;

  const pillarsStr = `
Year Pillar: ${fourPillars.year.stem}${fourPillars.year.branch} (${fourPillars.year.stemElement}/${fourPillars.year.branchElement})
Month Pillar: ${fourPillars.month.stem}${fourPillars.month.branch} (${fourPillars.month.stemElement}/${fourPillars.month.branchElement})
Day Pillar: ${fourPillars.day.stem}${fourPillars.day.branch} (${fourPillars.day.stemElement}/${fourPillars.day.branchElement})
Hour Pillar: ${fourPillars.hour.stem}${fourPillars.hour.branch} (${fourPillars.hour.stemElement}/${fourPillars.hour.branchElement})`;

  return `Please analyze this Ba Zi birth chart:

${pillarsStr}

Day Master: ${dayMaster.stem} (${dayMaster.element}, ${dayMaster.polarity})
Five Elements Distribution: ${JSON.stringify(fiveElements)}
Chinese Zodiac: ${shengXiao}
Chart Type: ${chartType}
Favorable Elements: ${favorableElements.join(", ")}
Gender: ${input.gender}

Please provide a comprehensive and personalized reading covering personality, wealth, love, health, career prospects, and yearly trends.`;
}

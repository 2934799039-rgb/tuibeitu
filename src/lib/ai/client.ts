import OpenAI from "openai";

function getClient(): OpenAI {
  return new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY || "sk-placeholder",
    baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com",
  });
}

let _client: OpenAI | null = null;
function client(): OpenAI {
  if (!_client) _client = getClient();
  return _client;
}

export async function generateReading({
  systemPrompt,
  userPrompt,
  language,
}: {
  systemPrompt: string;
  userPrompt: string;
  language: string;
}) {
  const langInstruction =
    language === "zh"
      ? "请用中文回答，使用古典命理术语，风格如古籍注解。"
      : language === "ja"
        ? "日本語で回答してください。古典的な運命学の用語を使用し、風格のある文体で。"
        : "Respond in English with a mystical, scholarly tone. Use traditional Chinese metaphysics terminology with explanations.";

  const response = await client().chat.completions.create({
    model: process.env.AI_MODEL || "deepseek-chat",
    temperature: 0.8,
    max_tokens: 1200,
    messages: [
      {
        role: "system",
        content: `${systemPrompt}\n\nIMPORTANT: ${langInstruction}\n\nReturn ONLY valid JSON, no markdown. Structure:\n{"personality":"2-3 sentences","wealth":"2-3 sentences","love":"2-3 sentences","health":"2-3 sentences","career":"2-3 sentences","yearlyTrend":"2-3 sentences","summary":"one short line","recommendations":{"favorableColors":["color"],"unfavorableColors":["color"],"luckyNumbers":[n,n,n],"favorableDirections":["direction"],"favorableElements":["element"]}}`,
      },
      { role: "user", content: userPrompt },
    ],
  });

  const content = response.choices[0]?.message?.content || "{}";

  try {
    return JSON.parse(content);
  } catch {
    return {
      personality: content,
      wealth: "",
      love: "",
      health: "",
      career: "",
      yearlyTrend: "",
      summary: "",
      recommendations: {
        favorableColors: [],
        unfavorableColors: [],
        luckyNumbers: [],
        favorableDirections: [],
        favorableElements: [],
      },
    };
  }
}

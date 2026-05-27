import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import OpenAI from "openai";
import { z } from "zod";

function getAIClient(): OpenAI {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error("AI key not configured");
  return new OpenAI({ apiKey, baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com" });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ readingId: string }> }
) {
  try {
    const { readingId } = await params;
    const body = await request.json();
    const { message, history } = z.object({
      message: z.string().min(1),
      history: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string() })).optional(),
    }).parse(body);

    // Check credits
    const session = await auth();
    const userId = session?.user?.id || null;

    if (userId) {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user || user.chatCredits < 5) {
        return NextResponse.json({ error: "NO_CREDITS" }, { status: 402 });
      }
    } else {
      // Anonymous: allow 1 free chat
      const anonChats = await prisma.userReading.count({
        where: { userId: null, createdAt: { gte: new Date(Date.now() - 86400000) } },
      });
      if (anonChats > 1) {
        return NextResponse.json({ error: "NO_CREDITS" }, { status: 402 });
      }
    }

    // Fetch reading with result
    const reading = await prisma.userReading.findUnique({
      where: { id: readingId },
      include: { result: true },
    });
    if (!reading?.result) {
      return NextResponse.json({ error: "Reading not found" }, { status: 404 });
    }

    const calcResult = reading.result.calculationResult as any;
    const aiAnalysis = reading.result.aiAnalysis as any;

    // Build context from reading
    let readingContext = "";
    if (calcResult.dayMaster) {
      // Bazi
      readingContext = `
User's Ba Zi (Four Pillars of Destiny) chart:
- Day Master: ${calcResult.dayMaster.stem} (${calcResult.dayMaster.element}, ${calcResult.dayMaster.polarity})
- Chart Type: ${calcResult.chartType}
- Sheng Xiao: ${calcResult.shengXiao}
- Five Elements: ${JSON.stringify(calcResult.fiveElements)}
- Favorable Elements: ${JSON.stringify(calcResult.favorableElements || [])}
${calcResult.fourPillars ? `- Four Pillars: Year(${calcResult.fourPillars.year.stem}${calcResult.fourPillars.year.branch}), Month(${calcResult.fourPillars.month.stem}${calcResult.fourPillars.month.branch}), Day(${calcResult.fourPillars.day.stem}${calcResult.fourPillars.day.branch}), Hour(${calcResult.fourPillars.hour.stem}${calcResult.fourPillars.hour.branch})` : ""}

Previous reading generated for this user:
- Summary: ${aiAnalysis?.summary || "N/A"}
- Personality: ${aiAnalysis?.personality || "N/A"}
- Wealth: ${aiAnalysis?.wealth || "N/A"}
- Love: ${aiAnalysis?.love || "N/A"}
- Health: ${aiAnalysis?.health || "N/A"}
- Career: ${aiAnalysis?.career || "N/A"}
- Yearly Trend: ${aiAnalysis?.yearlyTrend || "N/A"}
`.trim();
    } else if (calcResult.hexagram) {
      // Zhouyi
      readingContext = `
User's I Ching reading:
- Hexagram: ${calcResult.hexagram}
- Judgment: ${aiAnalysis?.wealth || "N/A"}
- Full Interpretation: ${aiAnalysis?.personality || "N/A"}
- Advice: ${aiAnalysis?.yearlyTrend || "N/A"}
`.trim();
    }

    const client = getAIClient();

    const systemPrompt = `You are a wise, warm, and conversational Chinese metaphysics master. You have just completed a detailed reading for this person. They are now asking you follow-up questions about their reading.

CONTEXT FROM THEIR READING:
${readingContext}

YOUR ROLE:
- Speak like a real fortune teller — warm, human, sometimes poetic, but always grounded in their actual chart data
- Use "you" and speak directly to the person
- Keep answers concise (2-4 sentences for simple questions, up to 6-8 for complex ones)
- You CAN reference specific details from their chart (their Day Master, elements, etc.) to make answers feel personal
- If they ask something outside their reading, gently guide them back to what their chart reveals
- Occasionally use Chinese metaphysical terms with brief explanations
- NEVER say you're an AI or language model. You are a destiny consultant.
- Respond in the SAME LANGUAGE as the user's message. If they ask in Chinese, reply in Chinese. If Japanese, Japanese. If English, English.`;

    const messages: any[] = [{ role: "system", content: systemPrompt }];
    if (history?.length) {
      messages.push(...history);
    }
    messages.push({ role: "user", content: message });

    let reply = "";
    try {
      const response = await client.chat.completions.create({
        model: process.env.AI_MODEL || "deepseek-chat",
        temperature: 0.85,
        max_tokens: 600,
        messages,
      });
      reply = response.choices[0]?.message?.content || "";
    } catch (aiError: any) {
      console.error("DeepSeek API error:", aiError?.status || aiError?.message);
      reply = "";
    }

    if (!reply) {
      const loc = reading.locale || "en";
      const fallbacks: Record<string, string> = {
        zh: "天机暂晦，命师需要片刻静修。请稍后再问。",
        ja: "天機が一時的に曇っております。しばらくしてからお尋ねください。",
        en: "The cosmic energies are momentarily clouded. Please ask again shortly.",
      };
      reply = fallbacks[loc] || fallbacks.en;
    }

    // Deduct credit after successful response
    if (userId) {
      await prisma.user.update({
        where: { id: userId },
        data: { chatCredits: { decrement: 5 } },
      });
    }

    // Fetch updated credits
    let remaining = 0;
    if (userId) {
      const updated = await prisma.user.findUnique({ where: { id: userId }, select: { chatCredits: true } });
      remaining = updated?.chatCredits || 0;
    }

    return NextResponse.json({ reply, credits: remaining });
  } catch (error: any) {
    console.error("Chat error:", error);
    const msg = error?.message || "Internal server error";
    const status = msg.includes("key") ? 503 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}

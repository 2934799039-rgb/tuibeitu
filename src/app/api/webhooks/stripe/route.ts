import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

function verifySignature(payload: string, signature: string, secret: string): boolean {
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-airwallex-signature") || "";

    // Verify webhook
    const webhookSecret = process.env.AIRWALLEX_WEBHOOK_SECRET;
    if (webhookSecret && signature) {
      if (!verifySignature(body, signature, webhookSecret)) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }

    const data = JSON.parse(body);

    if (data.name === "payment_intent.succeeded" || data.event === "payment_intent.succeeded") {
      const intent = data.data?.object || data.data || {};
      const metadata = intent.metadata || {};
      const userId = metadata.userId;
      const coins = Number(metadata.coins || "0");

      if (userId && userId !== "anonymous" && coins > 0) {
        await prisma.user.update({
          where: { id: userId },
          data: { chatCredits: { increment: coins } },
        });
        console.log(`Added ${coins} credits to user ${userId}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (e) {
    console.error("Webhook error:", e);
    return NextResponse.json({ error: "Internal" }, { status: 500 });
  }
}

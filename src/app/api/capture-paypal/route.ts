import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const PAYPAL_BASE = process.env.PAYPAL_MODE === "live"
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

async function getPayPalToken(): Promise<string> {
  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Authorization": "Basic " + Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await res.json();
  return data.access_token;
}

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();
    if (!orderId) return NextResponse.json({ error: "Missing order ID" }, { status: 400 });

    const token = await getPayPalToken();

    // Capture the order
    const captureRes = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const capture = await captureRes.json();

    if (capture.status !== "COMPLETED") {
      console.error("PayPal capture failed:", capture);
      return NextResponse.json({ error: "Payment not completed" }, { status: 402 });
    }

    // Extract metadata from the order
    const purchaseUnit = capture.purchase_units?.[0];
    const customId = purchaseUnit?.payments?.captures?.[0]?.custom_id
                   || purchaseUnit?.custom_id
                   || "";

    let userId = "";
    let coins = 0;
    try {
      const meta = JSON.parse(customId);
      userId = meta.userId || "";
      coins = Number(meta.coins) || 0;
    } catch {
      // If custom_id is not JSON, try to get from reference
      coins = 0;
    }

    if (userId && userId !== "anonymous" && coins > 0) {
      await prisma.user.update({
        where: { id: userId },
        data: { chatCredits: { increment: coins } },
      });

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { chatCredits: true },
      });

      return NextResponse.json({
        success: true,
        coins,
        credits: user?.chatCredits || coins,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("PayPal capture error:", error.message);
    return NextResponse.json({ error: "Capture failed" }, { status: 500 });
  }
}

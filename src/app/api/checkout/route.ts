import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getAccessToken } from "@/lib/airwallex";

const PRESET: Record<string, { coins: number; price: number }> = {
  "20": { coins: 20, price: 1.99 },
  "80": { coins: 80, price: 5.99 },
  "250": { coins: 250, price: 14.99 },
};
const RATE = 1.99 / 20;

const BASE = process.env.AIRWALLEX_ENV === "prod"
  ? "https://api.airwallex.com"
  : "https://api-demo.airwallex.com";

const CHECKOUT_BASE = process.env.AIRWALLEX_ENV === "prod"
  ? "https://checkout.airwallex.com"
  : "https://demo.checkout.airwallex.com";

export async function POST(request: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id || "anonymous";
    const body = await request.json();
    const { coins, locale } = body;
    const lang = locale || "en";

    const pkg = PRESET[String(coins)];
    const price = pkg ? pkg.price : Math.round(coins * RATE * 100) / 100;
    const amountCents = Math.round(price * 100);

    const token = await getAccessToken();
    const orderId = `coins_${coins}_${Date.now()}`;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Create payment intent with return_url to get client_secret
    const res = await fetch(`${BASE}/api/v1/pa/payment_intents/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        request_id: orderId,
        amount: amountCents,
        currency: "USD",
        merchant_order_id: orderId,
        return_url: `${baseUrl}/${lang}/pricing?success=true`,
        metadata: { userId, coins: String(coins) },
      }),
    });
    const intent = await res.json();

    if (!intent.id || !intent.client_secret) {
      console.error("Airwallex error:", JSON.stringify(intent));
      return NextResponse.json({ error: "Payment service unavailable" }, { status: 502 });
    }

    const env = process.env.AIRWALLEX_ENV === "prod" ? "prod" : "demo";

    return NextResponse.json({
      env,
      intentId: intent.id,
      clientSecret: intent.client_secret,
    });
  } catch (error: any) {
    console.error("Checkout error:", error.message);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const PRESET: Record<string, { coins: number; price: number }> = {
  "20": { coins: 20, price: 1.99 },
  "80": { coins: 80, price: 5.99 },
  "250": { coins: 250, price: 14.99 },
};
const RATE = 1.99 / 20;

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
    const session = await auth();
    const userId = session?.user?.id || "anonymous";
    const body = await request.json();
    const { coins, locale } = body;
    const lang = locale || "en";

    const pkg = PRESET[String(coins)];
    const price = pkg ? pkg.price : Math.round(coins * RATE * 100) / 100;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const token = await getPayPalToken();

    const orderRes = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{
          amount: { currency_code: "USD", value: price.toFixed(2) },
          description: `${coins} 古币 — TuiBeiTu`,
          custom_id: JSON.stringify({ userId, coins }),
        }],
        application_context: {
          return_url: `${baseUrl}/${lang}/pricing?success=true`,
          cancel_url: `${baseUrl}/${lang}/pricing`,
          brand_name: "TuiBeiTu",
        },
      }),
    });

    const order = await orderRes.json();

    if (order.status === "CREATED") {
      const approveLink = order.links?.find((l: any) => l.rel === "payer-action")?.href
        || order.links?.find((l: any) => l.rel === "approve")?.href;

      if (approveLink) {
        return NextResponse.json({ url: approveLink });
      }
    }

    console.error("PayPal order error:", JSON.stringify(order));
    return NextResponse.json({ error: "Payment service unavailable" }, { status: 502 });
  } catch (error: any) {
    console.error("Checkout error:", error.message);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}

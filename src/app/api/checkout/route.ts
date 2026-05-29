import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import Stripe from "stripe";

const PRESET: Record<string, { coins: number; price: number }> = {
  "20": { coins: 20, price: 1.99 },
  "80": { coins: 80, price: 5.99 },
  "250": { coins: 250, price: 14.99 },
};
const RATE = 1.99 / 20;

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
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      currency: "usd",
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: {
            name: `${coins} 古币`,
            description: `TuiBeiTu ${coins} Ancient Coins`,
          },
          unit_amount: amountCents,
        },
        quantity: 1,
      }],
      metadata: { userId, coins: String(coins) },
      success_url: `${baseUrl}/${lang}/pricing?success=true`,
      cancel_url: `${baseUrl}/${lang}/pricing`,
    });

    if (!checkoutSession.url) {
      return NextResponse.json({ error: "Failed to create checkout" }, { status: 502 });
    }

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error("Checkout error:", error.message);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}

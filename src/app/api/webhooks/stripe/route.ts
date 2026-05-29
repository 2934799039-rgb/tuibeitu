import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") || "";

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const coins = Number(session.metadata?.coins || "0");

    if (userId && userId !== "anonymous" && coins > 0) {
      await prisma.user.update({
        where: { id: userId },
        data: { chatCredits: { increment: coins } },
      });
      console.log(`Stripe: Added ${coins} credits to user ${userId}`);
    }
  }

  return NextResponse.json({ received: true });
}

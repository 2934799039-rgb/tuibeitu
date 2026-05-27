import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getAccessToken } from "@/lib/airwallex";

export async function POST(request: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    const { intentId } = await request.json();
    if (!intentId) return NextResponse.json({ error: "Missing intent ID" }, { status: 400 });

    const token = await getAccessToken();
    const res = await fetch(
      `https://api-demo.airwallex.com/api/v1/pa/payment_intents/${intentId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();

    if (data.status === "SUCCEEDED") {
      const coins = Number(data.metadata?.coins || "0");
      if (coins > 0) {
        // Check if already credited (idempotent)
        const alreadyCredited = data.metadata?._credited === "true";
        if (!alreadyCredited) {
          await prisma.user.update({
            where: { id: userId },
            data: { chatCredits: { increment: coins } },
          });
        }
        const user = await prisma.user.findUnique({
          where: { id: userId }, select: { chatCredits: true },
        });
        return NextResponse.json({ success: true, coins, credits: user?.chatCredits });
      }
    }

    return NextResponse.json({ success: false, status: data.status });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ credits: null });
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { chatCredits: true },
  });
  return NextResponse.json({ credits: user?.chatCredits ?? 0 });
}

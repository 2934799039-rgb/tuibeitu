import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const reading = await prisma.userReading.findUnique({
      where: { id },
      include: { result: true },
    });

    if (!reading) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: reading.id,
      status: reading.status,
      schoolType: reading.schoolType,
      inputData: reading.inputData,
      createdAt: reading.createdAt,
      result: reading.result
        ? {
            calculationResult: reading.result.calculationResult,
            aiAnalysis: reading.result.aiAnalysis,
            recommendations: reading.result.recommendations,
            chartData: reading.result.chartData,
          }
        : null,
    });
  } catch (error) {
    console.error("Get result error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

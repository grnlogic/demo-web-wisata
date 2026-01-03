import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");

    const rekomendasi = await prisma.rekomendasi.findMany({
      where: {
        status: "PUBLISHED",
        ...(featured === "true" && { featured: true }),
      },
      orderBy: [{ featured: "desc" }, { urutan: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(rekomendasi);
  } catch (error) {
    console.error("Error fetching rekomendasi:", error);
    return NextResponse.json(
      { error: "Failed to fetch rekomendasi" },
      { status: 500 }
    );
  }
}

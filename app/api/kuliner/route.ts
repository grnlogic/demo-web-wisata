import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch kuliner for public (frontend)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const kategori = searchParams.get("kategori") || "";
    const status = searchParams.get("status") || "PUBLISHED";

    const where: any = {
      status,
    };

    if (search) {
      where.OR = [
        { nama: { contains: search, mode: "insensitive" } },
        { deskripsi: { contains: search, mode: "insensitive" } },
        { lokasi: { contains: search, mode: "insensitive" } },
      ];
    }

    if (kategori) {
      where.kategori = kategori;
    }

    const kuliner = await prisma.kuliner.findMany({
      where,
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(kuliner);
  } catch (error) {
    console.error("Error fetching kuliner:", error);
    return NextResponse.json(
      { error: "Failed to fetch kuliner" },
      { status: 500 }
    );
  }
}

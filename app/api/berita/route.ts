import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search");
    const kategori = searchParams.get("kategori");
    const limit = searchParams.get("limit");
    const featured = searchParams.get("featured");

    const where: any = {
      status: "PUBLISHED",
    };

    if (search) {
      where.OR = [
        { judul: { contains: search, mode: "insensitive" } },
        { konten: { contains: search, mode: "insensitive" } },
        { ringkasan: { contains: search, mode: "insensitive" } },
      ];
    }

    if (kategori) {
      where.kategori = kategori;
    }

    if (featured === "true") {
      where.featured = true;
    }

    const berita = await prisma.berita.findMany({
      where,
      include: {
        admin: {
          select: {
            nama: true,
            username: true,
          },
        },
      },
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
      take: limit ? parseInt(limit) : undefined,
    });

    return NextResponse.json(berita);
  } catch (error) {
    console.error("Error fetching berita:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data berita" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma, dbConnected } from "@/lib/prisma";
import { dummyGaleri } from "@/lib/dummy-data";
import type { KategoriGaleri } from "@prisma/client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const kategori = searchParams.get("kategori") || "";
  const featured = searchParams.get("featured") === "true";
  const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10) || 20, 100);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const skip = (page - 1) * limit;

  try {
    if (dbConnected && prisma) {
      const where: { kategori?: KategoriGaleri; featured?: boolean } = {};
      if (kategori && kategori !== "SEMUA") where.kategori = kategori as KategoriGaleri;
      if (featured) where.featured = true;

      const [galeri, total] = await Promise.all([
        prisma.galeri.findMany({
          where,
          orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
          skip,
          take: limit,
        }),
        prisma.galeri.count({ where }),
      ]);

      return NextResponse.json({
        data: galeri.map((g) => ({ ...g, createdAt: g.createdAt.toISOString() })),
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    }
  } catch (_) {
    // fallback to dummy
  }

  // Dummy data (tanpa DB / Vercel demo)
  let list = [...dummyGaleri];
  if (kategori && kategori !== "SEMUA") list = list.filter((g) => g.kategori === kategori);
  if (featured) list = list.filter((g) => g.featured);
  const total = list.length;
  const data = list.slice(skip, skip + limit).map((g) => ({
    ...g,
    createdAt: g.createdAt.toISOString ? g.createdAt.toISOString() : new Date(g.createdAt).toISOString(),
  }));

  return NextResponse.json({
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    },
  });
}

import { NextRequest, NextResponse } from "next/server";
import { prisma, dbConnected } from "@/lib/prisma";
import { dummyBerita } from "@/lib/dummy-data";

function toIso(d: Date | null | undefined): string | null {
  return d instanceof Date ? d.toISOString() : (d ?? null);
}

function serializeBerita(b: (typeof dummyBerita)[0]) {
  return {
    ...b,
    publishedAt: toIso(b.publishedAt ?? null),
    expiresAt: toIso(b.expiresAt ?? null),
    createdAt: toIso(b.createdAt as Date),
    updatedAt: toIso(b.updatedAt as Date),
  };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search");
  const kategori = searchParams.get("kategori");
  const limitParam = searchParams.get("limit");
  const featured = searchParams.get("featured");

  try {
    if (dbConnected && prisma) {
      const where: any = { status: "PUBLISHED" };
      if (search) {
        where.OR = [
          { judul: { contains: search, mode: "insensitive" } },
          { konten: { contains: search, mode: "insensitive" } },
          { ringkasan: { contains: search, mode: "insensitive" } },
        ];
      }
      if (kategori) where.kategori = kategori;
      if (featured === "true") where.featured = true;

      const berita = await prisma.berita.findMany({
        where,
        include: {
          admin: { select: { nama: true, username: true } },
        },
        orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
        take: limitParam ? parseInt(limitParam, 10) : undefined,
      });
      return NextResponse.json(berita);
    }
  } catch (_) {}

  let list = dummyBerita.filter((b) => b.status === "PUBLISHED");
  if (kategori) list = list.filter((b) => b.kategori === kategori);
  if (featured === "true") list = list.filter((b) => b.featured);
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(
      (b) =>
        b.judul.toLowerCase().includes(q) ||
        (b.ringkasan && b.ringkasan.toLowerCase().includes(q))
    );
  }
  const take = limitParam ? parseInt(limitParam, 10) : list.length;
  const berita = list.slice(0, take).map(serializeBerita);
  return NextResponse.json(berita);
}

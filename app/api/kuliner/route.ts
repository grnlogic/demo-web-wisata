import { NextRequest, NextResponse } from "next/server";
import { prisma, dbConnected } from "@/lib/prisma";
import { dummyKuliner } from "@/lib/dummy-data";

// GET - Fetch kuliner for public (frontend)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = (searchParams.get("search") || "").toLowerCase();
  const kategori = searchParams.get("kategori") || "";
  const status = searchParams.get("status") || "PUBLISHED";

  try {
    if (dbConnected && prisma) {
      const where: any = { status };
      if (search) {
        where.OR = [
          { nama: { contains: search, mode: "insensitive" } },
          { deskripsi: { contains: search, mode: "insensitive" } },
          { lokasi: { contains: search, mode: "insensitive" } },
        ];
      }
      if (kategori) where.kategori = kategori;

      const kuliner = await prisma.kuliner.findMany({
        where,
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      });
      return NextResponse.json(kuliner);
    }
  } catch (_) {}

  let list = dummyKuliner.filter((k) => k.status === status);
  if (kategori) list = list.filter((k) => k.kategori === kategori);
  if (search) {
    list = list.filter(
      (k) =>
        k.nama.toLowerCase().includes(search) ||
        k.deskripsi.toLowerCase().includes(search) ||
        k.lokasi.toLowerCase().includes(search)
    );
  }
  return NextResponse.json(list);
}

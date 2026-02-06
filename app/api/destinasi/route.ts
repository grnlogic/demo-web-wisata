import { NextRequest, NextResponse } from "next/server";
import { prisma, dbConnected } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { dummyDestinasiForList } from "@/lib/dummy-data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = (searchParams.get("search") || "").toLowerCase();
  const kategori = searchParams.get("kategori") || "";
  const status = searchParams.get("status") || "PUBLISHED";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(50, parseInt(searchParams.get("limit") || "12", 10) || 12);
  const skip = (page - 1) * limit;

  try {
    if (dbConnected && prisma) {
      const where: Prisma.DestinasiWhereInput = { status: status as "PUBLISHED" | "DRAFT" | "ARCHIVED" };
      if (search) {
        where.OR = [
          { nama: { contains: search, mode: "insensitive" } },
          { deskripsi: { contains: search, mode: "insensitive" } },
          { lokasi: { contains: search, mode: "insensitive" } },
        ];
      }
      if (kategori) where.kategori = kategori as any;

      const [total, destinasi] = await Promise.all([
        prisma.destinasi.count({ where }),
        prisma.destinasi.findMany({
          where,
          include: {
            images: { select: { url: true, caption: true, isPrimary: true } },
            harga: { select: { jenisHarga: true, harga: true } },
          },
          orderBy: { createdAt: "desc" },
          skip,
          take: limit,
        }),
      ]);

      return NextResponse.json({
        success: true,
        data: destinasi,
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
      });
    }
  } catch (_) {}

  let list = dummyDestinasiForList.filter((d) => d.status === status);
  if (kategori) list = list.filter((d) => d.kategori === kategori);
  if (search) {
    list = list.filter(
      (d) =>
        d.nama.toLowerCase().includes(search) ||
        d.deskripsi.toLowerCase().includes(search) ||
        d.lokasi.toLowerCase().includes(search)
    );
  }
  const total = list.length;
  const data = list.slice(skip, skip + limit);

  return NextResponse.json({
    success: true,
    data,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) || 1 },
  });
}

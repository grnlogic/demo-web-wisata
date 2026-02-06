import { NextRequest, NextResponse } from "next/server";
import { prisma, dbConnected } from "@/lib/prisma";
import { dummyEvent } from "@/lib/dummy-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  try {
    if (dbConnected && prisma) {
      const where: any = { status: "PUBLISHED" };
      if (status) {
        const now = new Date();
        if (status === "upcoming") where.tanggalMulai = { gt: now };
        else if (status === "ongoing") {
          where.AND = [
            { tanggalMulai: { lte: now } },
            { tanggalSelesai: { gte: now } },
          ];
        } else if (status === "completed") {
          where.tanggalSelesai = { lt: now };
        }
      }

      const events = await prisma.event.findMany({
        where,
        select: {
          id: true,
          nama: true,
          slug: true,
          deskripsi: true,
          lokasi: true,
          alamat: true,
          koordinat: true,
          googleMapsUrl: true,
          tanggalMulai: true,
          tanggalSelesai: true,
          jamMulai: true,
          jamSelesai: true,
          gambar: true,
          thumbnail: true,
            kontakPerson: true,
          nomorTelepon: true,
          hargaTiket: true,
          featured: true,
          createdAt: true,
        },
        orderBy: [
          { featured: "desc" },
          { tanggalMulai: "asc" },
        ],
      });
      return NextResponse.json(events);
    }
  } catch (_) {}

  let list = [...dummyEvent];
  if (status) {
    const now = new Date();
    if (status === "upcoming") list = list.filter((e) => new Date(e.tanggalMulai) > now);
    else if (status === "ongoing") {
      list = list.filter((e) => {
        const start = new Date(e.tanggalMulai);
        const end = new Date(e.tanggalSelesai);
        return start <= now && end >= now;
      });
    } else if (status === "completed") {
      list = list.filter((e) => new Date(e.tanggalSelesai) < now);
    }
  }
  return NextResponse.json(list);
}

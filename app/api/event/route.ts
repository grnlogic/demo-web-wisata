import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const where: any = {
      status: "PUBLISHED",
    };

    // Filter by event status (upcoming, ongoing, completed)
    if (status) {
      const now = new Date();
      
      if (status === "upcoming") {
        where.tanggalMulai = {
          gt: now,
        };
      } else if (status === "ongoing") {
        where.AND = [
          { tanggalMulai: { lte: now } },
          { tanggalSelesai: { gte: now } },
        ];
      } else if (status === "completed") {
        where.tanggalSelesai = {
          lt: now,
        };
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
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const event = await prisma.event.findUnique({
      where: {
        slug,
        status: "PUBLISHED",
      },
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
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

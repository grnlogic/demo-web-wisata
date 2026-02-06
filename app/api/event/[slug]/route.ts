import { NextRequest, NextResponse } from "next/server";
import { prisma, dbConnected } from "@/lib/prisma";
import { dummyEvent } from "@/lib/dummy-data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    if (dbConnected && prisma) {
      const event = await prisma.event.findUnique({
        where: { slug, status: "PUBLISHED" },
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
      if (event) return NextResponse.json(event);
    }
  } catch (_) {}

  const dummy = dummyEvent.find((e) => e.slug === slug && e.status === "PUBLISHED");
  if (dummy) return NextResponse.json(dummy);
  return NextResponse.json({ error: "Event not found" }, { status: 404 });
}

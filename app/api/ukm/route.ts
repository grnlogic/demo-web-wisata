import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch published UKM for public
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const kategori = searchParams.get("kategori") || "";
    const featured = searchParams.get("featured") || "";
    const slug = searchParams.get("slug") || "";

    const where: any = {
      status: "PUBLISHED",
    };

    if (slug) {
      where.slug = slug;
    }

    if (kategori) {
      where.kategori = kategori;
    }

    if (featured === "true") {
      where.featured = true;
    }

    const ukm = await prisma.profilUkm.findMany({
      where,
      orderBy: [
        { featured: "desc" },
        { verified: "desc" },
        { createdAt: "desc" },
      ],
      select: {
        id: true,
        namaUsaha: true,
        slug: true,
        deskripsi: true,
        kategori: true,
        pemilik: true,
        lokasi: true,
        alamat: true,
        koordinat: true,
        nomorTelepon: true,
        email: true,
        instagram: true,
        facebook: true,
        whatsapp: true,
        website: true,
        logo: true,
        gambar: true,
        produkLayanan: true,
        hargaRata: true,
        jamOperasional: true,
        featured: true,
        verified: true,
        createdAt: true,
      },
    });

    return NextResponse.json(ukm);
  } catch (error) {
    console.error("Error fetching UKM:", error);
    return NextResponse.json(
      { error: "Failed to fetch UKM" },
      { status: 500 }
    );
  }
}

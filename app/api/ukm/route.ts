import { NextRequest, NextResponse } from "next/server";
import { prisma, dbConnected } from "@/lib/prisma";
import { dummyProfilUkm } from "@/lib/dummy-data";

// GET - Fetch published UKM for public
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const kategori = searchParams.get("kategori") || "";
  const featured = searchParams.get("featured") || "";
  const slug = searchParams.get("slug") || "";

  try {
    if (dbConnected && prisma) {
      const where: any = { status: "PUBLISHED" };
      if (slug) where.slug = slug;
      if (kategori) where.kategori = kategori;
      if (featured === "true") where.featured = true;

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
    }
  } catch (_) {}

  let list = dummyProfilUkm.filter((u) => u.status === "PUBLISHED");
  if (slug) list = list.filter((u) => u.slug === slug);
  if (kategori) list = list.filter((u) => u.kategori === kategori);
  if (featured === "true") list = list.filter((u) => u.featured);
  return NextResponse.json(list);
}

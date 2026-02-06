import { prisma, safeQuery } from "@/lib/prisma";
import { dummyDestinasiForList } from "@/lib/dummy-data";
import { cookies } from "next/headers";
import { translateText, translateObject } from "@/lib/translation";
import DestinasiClient from "@/components/DestinasiClient";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function DestinasiPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value as "id" | "en") || "id";

  // 1. Initial Data Fetch (fallback dummy saat tanpa DB)
  let destinasi = await safeQuery(
    () =>
      prisma.destinasi.findMany({
        where: {
          status: "PUBLISHED",
        },
        include: {
          images: {
            select: {
              url: true,
              caption: true,
              isPrimary: true,
            },
          },
          harga: {
            select: {
              jenisHarga: true,
              harga: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 12,
      }),
    dummyDestinasiForList.slice(0, 12),
  );

  // 2. Define Static Content
  let content = {
    badge: "Peta rasa Pangandaran",
    title: "Destinasi yang punya cerita, bukan cuma spot foto.",
    description:
      "Kurasi pantai, cagar alam, dan sudut lokal yang biasanya cuma dibisikkan warga. Pilih vibe, sesuaikan tempo, langsung jalan.",
    features: {
      kurasi: "Kurasi warga",
      coords: "Koordinat siap pakai",
      rating: "Rating real visitor",
    },
    filter: {
      label: "Filter cepat",
      live: "Live search",
      searchPlaceholder: "Cari pantai sepi, gua hijau, atau kuliner...",
    },
    searchBar: {
      placeholder: "Cari destinasi...",
    },
    categories: {
      Semua: "Semua",
      PANTAI: "Pantai",
      CAGAR_ALAM: "Cagar Alam",
      GOA: "Goa",
      WISATA_BUDAYA: "Wisata Budaya",
      WISATA_BAHARI: "Wisata Bahari",
      WAHANA_AIR: "Wahana Air",
      KAMPUNG_TURIS: "Kampung Turis",
      LAINNYA: "Lainnya",
    },
    loading: "Memuat destinasi...",
    empty: {
      title: "Tidak ada destinasi ditemukan",
      desc: "Coba kata kunci atau kategori lain.",
    },
    card: {
      reviews: "ulasan nyata",
      noReviews: "Belum ada ulasan",
      detail: "Lihat detail",
      free: "Gratis",
    },
  };

  // 3. Translation
  if (lang === "en") {
    const [trContent, trDestinasi] = await Promise.all([
      translateObject(content, "id", "en"),
      Promise.all(
        destinasi.map(async (dest) => ({
          ...dest,
          nama: await translateText(dest.nama, "id", "en"),
          deskripsi: await translateText(dest.deskripsi, "id", "en"),
          lokasi: await translateText(dest.lokasi, "id", "en"),
          harga: await Promise.all(
            dest.harga.map(async (h) => ({
              ...h,
              jenisHarga: await translateText(h.jenisHarga, "id", "en"),
            })),
          ),
        })),
      ),
    ]);

    content = trContent;
    // @ts-ignore
    destinasi = trDestinasi;
  }

  return <DestinasiClient initialDestinasi={destinasi} content={content} />;
}

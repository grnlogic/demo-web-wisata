import { prisma, safeQuery } from "@/lib/prisma";
import { cookies } from "next/headers";
import { translateText, translateObject } from "@/lib/translation";
import BeritaClient from "@/components/BeritaClient";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function BeritaPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value as "id" | "en") || "id";

  // 1. Initial Data Fetch
  const params = new URLSearchParams();
  // Fetch a bit more for initial render if needed, or stick to default API behavior which returns all?
  // Use Prisma directly for Server Component to be fast
  let berita = await safeQuery(
    () =>
      prisma.berita.findMany({
        where: { status: "PUBLISHED" },
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        include: {
          admin: {
            select: {
              nama: true,
              username: true,
            },
          },
        },
      }),
    [],
  );

  // 2. Define Static Content
  let content = {
    hero: {
      badge: "Edisi Kurasi Redaksi",
      subbadge: "Berita & Insight",
      title: "Berita Pangandaran dengan rasa majalah premium",
      subtitle:
        "Sorotan wisata, event, kuliner, dan pengembangan daerah yang dikurasi dengan visual rapi, bukan portal generik.",
      stats: {
        trend: "Tren harian",
        popular: "Lokal populer",
        verified: "Arsip terverifikasi",
      },
      channel: "Kanal",
    },
    search: {
      placeholder: "Cari berita, topik, atau nama lokasi...",
      all: "Semua",
      features: {
        release: "Rilis terkini diperbarui otomatis",
        monitor: "Pantau berita paling dibaca",
        curation: "Kurasi redaksi non-template",
        algo: "Algoritma rekomendasi ringan",
      },
    },
    featured: {
      badge: "Pilihan utama",
      title: "Berita utama yang sedang hangat",
      pulse: "Live pulse",
      external: "External",
    },
    latest: {
      badge: "Rilis terbaru",
      title: "Update cepat tanpa rasa portal murahan",
      updated: "Terakhir diperbarui otomatis",
      empty: {
        title: "Belum ada berita",
        desc: "Konten akan segera hadir setelah redaksi mempublikasikan.",
      },
      readMore: "Baca selengkapnya",
    },
    categories: {
      badge: "Kurasi kategori",
      title: "Jelajahi kanal favorit pembaca",
      desc: "Disusun berdasar performa mingguan",
      articles: "artikel",
      items: {
        wisata: "Wisata",
        kuliner: "Kuliner",
        budaya: "Budaya",
        event: "Event",
        pengumuman: "Pengumuman",
        "tips-wisata": "Tips Wisata",
        "berita-lokal": "Berita Lokal",
      },
    },
  };

  // 3. Translation
  if (lang === "en") {
    // Parallelize content and data translation
    const [trContent, trBerita] = await Promise.all([
      translateObject(content, "id", "en"),
      Promise.all(
        berita.map(async (item) => ({
          ...item,
          judul: await translateText(item.judul, "id", "en"),
          ringkasan: item.ringkasan
            ? await translateText(item.ringkasan, "id", "en")
            : null,
          kategori: await translateText(item.kategori, "id", "en"), // This might mismatch category filter slugs, but for display good.
          // For filter consistency, we might need to map categories carefully.
          // But the client filter uses the displayed name passed from `content.categories.items`.
          // So we should update `item.kategori` to match the translated category name if possible?
          // Actually, the client filters by `kategoriFilter` state which matches `cat.name`.
          // `cat.name` comes from `content.categories.items`.
          // So if we translate `content`, `cat.name` becomes English "Tourism".
          // `item.kategori` in DB is "Wisata".
          // If we translate `item.kategori` to "Tourism", they match!
        })),
      ),
    ]);

    content = trContent;
    // @ts-ignore
    berita = trBerita;
  }

  // Casting needed because Prisma result type vs Interface match
  const beritaFormatted = berita.map((b) => ({
    ...b,
    createdAt: b.createdAt.toISOString(),
    publishedAt: b.publishedAt ? b.publishedAt.toISOString() : null,
  }));

  return (
    <BeritaClient
      initialBerita={beritaFormatted as any}
      content={content}
      lang={lang}
    />
  );
}

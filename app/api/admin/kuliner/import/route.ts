import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

const SERPAPI_API_KEY = process.env.SERPAPI_API_KEY || "";
const SERPAPI_ENDPOINT = "https://serpapi.com/search";
const MAX_RESULTS = 50;

interface SerpOrganic {
  title?: string;
  link?: string;
  snippet?: string;
  displayed_link?: string;
  thumbnail?: string;
}

async function fetchKulinerFromSerp(): Promise<SerpOrganic[]> {
  if (!SERPAPI_API_KEY) return [];

  const params = new URLSearchParams({
    engine: "google",
    q: "restoran Pangandaran",
    gl: "id",
    hl: "id",
    num: String(MAX_RESULTS),
    api_key: SERPAPI_API_KEY,
  });

  try {
    const res = await fetch(`${SERPAPI_ENDPOINT}?${params.toString()}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("SerpAPI kuliner error", await res.text());
      return [];
    }

    const data = await res.json();
    const organic: SerpOrganic[] = Array.isArray(data?.organic_results)
      ? data.organic_results.slice(0, MAX_RESULTS)
      : [];

    return organic;
  } catch (error) {
    console.error("SerpAPI kuliner fetch failed", error);
    return [];
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const organic = await fetchKulinerFromSerp();
    if (organic.length === 0) {
      return NextResponse.json(
        { error: "Tidak ada hasil kuliner dari Google." },
        { status: 404 }
      );
    }

    let imported = 0;
    let skipped = 0;

    for (const item of organic) {
      const title = item.title?.trim();
      if (!title) {
        skipped++;
        continue;
      }

      const baseSlug = slugify(title, { lower: true, strict: true });
      const link = item.link || null;

      // Skip if slug or link already exists
      const exists = await prisma.kuliner.findFirst({
        where: {
          OR: [{ slug: baseSlug }, { googleMapsUrl: link ?? undefined }],
        },
      });
      if (exists) {
        skipped++;
        continue;
      }

      let slug = baseSlug;
      let counter = 1;
      while (await prisma.kuliner.findUnique({ where: { slug } })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      const image = item.thumbnail || undefined;

      await prisma.kuliner.create({
        data: {
          nama: title,
          slug,
          deskripsi: item.snippet || title,
          kategori: "Restoran",
          lokasi: "Pangandaran",
          alamat: item.snippet || "Pangandaran",
          koordinat: null,
          googleMapsUrl: link,
          hargaMin: null,
          hargaMax: null,
          nomorTelepon: null,
          jamBuka: null,
          gambar: image ? [image] : [],
          rating: 0,
          status: "PUBLISHED",
          featured: false,
        },
      });

      imported++;
    }

    return NextResponse.json({ imported, skipped });
  } catch (error) {
    console.error("Import kuliner error", error);
    return NextResponse.json(
      { error: "Gagal import kuliner" },
      { status: 500 }
    );
  }
}

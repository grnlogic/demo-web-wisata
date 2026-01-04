import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

const SERPAPI_API_KEY = process.env.SERPAPI_API_KEY || "";
const SERPAPI_ENDPOINT = "https://serpapi.com/search";
const MAX_RESULTS = 50;

interface NewsSource {
  title: string;
  link: string;
  image?: string;
  description?: string;
  source?: string;
  published_at?: string;
}

async function fetchNewsFromSerpApi(): Promise<NewsSource[]> {
  if (!SERPAPI_API_KEY) return [];

  const params = new URLSearchParams({
    engine: "google",
    tbm: "nws",
    q: "Pangandaran",
    gl: "id",
    hl: "id",
    api_key: SERPAPI_API_KEY,
  });

  try {
    const res = await fetch(`${SERPAPI_ENDPOINT}?${params.toString()}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("SerpAPI news failed", await res.text());
      return [];
    }

    const data = await res.json();
    const news: any[] = Array.isArray(data?.news_results)
      ? data.news_results.slice(0, MAX_RESULTS)
      : [];

    return news.map((item: any) => ({
      title: item.title,
      link: item.link,
      image: item.thumbnail || item.image,
      description: item.snippet,
      source: item.source,
      published_at: item.published_at,
    }));
  } catch (error) {
    console.error("SerpAPI news error", error);
    return [];
  }
}

// POST - Import news from API
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get admin
    const admin = await prisma.admin.findUnique({
      where: { username: session.user.username },
    });

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    // Fetch news from SerpAPI (Google News) fokus Pangandaran
    const newsItems = await fetchNewsFromSerpApi();

    if (newsItems.length === 0) {
      return NextResponse.json(
        {
          error:
            "Tidak ada berita relevan ditemukan. Pastikan ada berita tentang wisata/Pangandaran di sumber berita.",
        },
        { status: 404 }
      );
    }

    const imported: any[] = [];
    const skipped: any[] = [];

    for (const item of newsItems) {
      try {
        // Generate slug from title
        const baseSlug = slugify(item.title, {
          lower: true,
          strict: true,
          locale: "id",
        });

        // Check if news already exists
        const existing = await prisma.berita.findFirst({
          where: {
            OR: [{ sourceUrl: item.link }, { slug: baseSlug }],
          },
        });

        if (existing) {
          skipped.push({ title: item.title, reason: "Already exists" });
          continue;
        }

        // Create unique slug
        let slug = baseSlug;
        let counter = 1;
        while (await prisma.berita.findUnique({ where: { slug } })) {
          slug = `${baseSlug}-${counter}`;
          counter++;
        }

        // Auto-detect category based on keywords
        const title = item.title.toLowerCase();
        let kategori = "Berita Lokal";
        if (
          title.includes("wisata") ||
          title.includes("pantai") ||
          title.includes("pangandaran")
        ) {
          kategori = "Wisata";
        } else if (title.includes("kuliner") || title.includes("makanan")) {
          kategori = "Kuliner";
        } else if (title.includes("event") || title.includes("festival")) {
          kategori = "Event";
        }

        // Create berita as PUBLISHED (trusted external source)
        const berita = await prisma.berita.create({
          data: {
            judul: item.title,
            slug,
            konten: item.link
              ? `${item.description || item.title}\n\nBaca selengkapnya: ${item.link}`
              : item.description || item.title,
            ringkasan: item.description?.substring(0, 200) || null,
            kategori,
            gambarUtama: item.image || null,
            sourceUrl: item.link,
            sourceImage: item.image || null,
            isExternal: true,
            status: "PUBLISHED",
            publishedAt: new Date(),
            expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            featured: false,
            createdBy: admin.id,
          },
        });

        imported.push({
          id: berita.id,
          title: berita.judul,
          kategori: berita.kategori,
        });
      } catch (error) {
        console.error(`Error importing news: ${item.title}`, error);
        skipped.push({ title: item.title, reason: "Import failed" });
      }
    }

    return NextResponse.json({
      success: true,
      imported: imported.length,
      skipped: skipped.length,
      details: {
        imported,
        skipped,
      },
    });
  } catch (error) {
    console.error("Error importing news:", error);
    return NextResponse.json(
      { success: false, error: "Failed to import news" },
      { status: 500 }
    );
  }
}

// GET - Fetch available news from API (preview)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const newsItems = await fetchNewsFromSerpApi();

    return NextResponse.json({
      success: true,
      count: newsItems.length,
      news: newsItems,
    });
  } catch (error) {
    console.error("Error fetching news preview:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

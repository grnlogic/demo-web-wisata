import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

const LOL_HUMAN_API_KEY = process.env.LOL_HUMAN_API_KEY || "";

interface NewsSource {
  title: string;
  link: string;
  image?: string;
  description?: string;
}

// Fetch news from multiple sources
async function fetchNewsFromSources() {
  const sources = [
    {
      name: "Kumparan",
      url: `https://api.lolhuman.xyz/api/kumparan?apikey=${LOL_HUMAN_API_KEY}`,
    },
    {
      name: "Republika",
      url: `https://api.lolhuman.xyz/api/republika?apikey=${LOL_HUMAN_API_KEY}`,
    },
  ];

  const allNews: NewsSource[] = [];

  // Keywords yang harus ada (primary)
  const primaryKeywords = [
    "pangandaran",
    "ciamis",
    "jawa barat",
    "jabar",
  ];

  // Keywords pelengkap wisata (secondary - optional)
  const secondaryKeywords = [
    "wisata",
    "pantai",
    "tourism",
    "travel",
    "liburan",
    "destinasi",
    "kuliner",
    "festival",
  ];

  // Exclude keywords (blacklist)
  const excludeKeywords = [
    "inggris",
    "england",
    "eropa",
    "amerika",
    "australia",
    "jepang",
    "korea",
    "china",
    "thailand",
    "malaysia",
    "singapura",
    "bali", // agar fokus ke Pangandaran saja
    "jakarta",
    "bandung", // kecuali disebutkan berkaitan dengan Pangandaran
  ];

  for (const source of sources) {
    try {
      const response = await fetch(source.url);
      const data = await response.json();

      if (data.status === 200 && data.result && Array.isArray(data.result)) {
        // Filter berita yang relevan dengan keyword
        const filteredNews = data.result.filter((item: any) => {
          const title = item.title?.toLowerCase() || "";
          const description = item.description?.toLowerCase() || "";
          const content = `${title} ${description}`;

          // Check exclude keywords first
          const hasExcluded = excludeKeywords.some((keyword) =>
            content.includes(keyword.toLowerCase())
          );
          
          if (hasExcluded) return false;

          // Must have at least one primary keyword
          const hasPrimary = primaryKeywords.some((keyword) =>
            content.includes(keyword.toLowerCase())
          );

          // OR have at least 2 secondary keywords (wisata + pantai, dll)
          const secondaryMatches = secondaryKeywords.filter((keyword) =>
            content.includes(keyword.toLowerCase())
          ).length;

          return hasPrimary || secondaryMatches >= 2;
        });

        // Map and add source info
        const newsItems = filteredNews.map((item: any) => ({
          title: item.title,
          link: item.link,
          image: item.image || item.thumbnail || "",
          description: item.description || item.snippet || "",
        }));

        allNews.push(...newsItems);
      }
    } catch (error) {
      console.error(`Error fetching from ${source.name}:`, error);
    }
  }

  return allNews;
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

    // Fetch news from sources
    const newsItems = await fetchNewsFromSources();

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

        // Create berita as DRAFT
        const berita = await prisma.berita.create({
          data: {
            judul: item.title,
            slug,
            konten: item.description || item.title,
            ringkasan: item.description?.substring(0, 200) || null,
            kategori,
            gambarUtama: item.image || null,
            sourceUrl: item.link,
            sourceImage: item.image || null,
            isExternal: true,
            status: "DRAFT",
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

    const newsItems = await fetchNewsFromSources();

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

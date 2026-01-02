import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST - Auto-archive expired news (older than 5 days)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    // Find published news that are older than 5 days
    const expiredNews = await prisma.berita.findMany({
      where: {
        status: "PUBLISHED",
        publishedAt: {
          lt: fiveDaysAgo,
        },
        expiresAt: null, // Not yet archived
      },
    });

    // Archive them by setting status to DRAFT and expiresAt
    const archived = await prisma.berita.updateMany({
      where: {
        id: {
          in: expiredNews.map((news) => news.id),
        },
      },
      data: {
        status: "DRAFT",
        expiresAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      archived: archived.count,
      items: expiredNews.map((news) => ({
        id: news.id,
        judul: news.judul,
        publishedAt: news.publishedAt,
      })),
    });
  } catch (error) {
    console.error("Error auto-archiving news:", error);
    return NextResponse.json(
      { success: false, error: "Failed to archive news" },
      { status: 500 }
    );
  }
}

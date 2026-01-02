import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    const berita = await prisma.berita.findUnique({
      where: {
        slug,
        status: "PUBLISHED",
      },
      include: {
        admin: {
          select: {
            nama: true,
            username: true,
          },
        },
      },
    });

    if (!berita) {
      return NextResponse.json(
        { error: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }

    // Increment views
    await prisma.berita.update({
      where: { id: berita.id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json(berita);
  } catch (error) {
    console.error("Error fetching berita:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data berita" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma, dbConnected } from "@/lib/prisma";
import { dummyBerita } from "@/lib/dummy-data";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  try {
    if (dbConnected && prisma) {
      const berita = await prisma.berita.findUnique({
        where: { slug, status: "PUBLISHED" },
        include: {
          admin: { select: { nama: true, username: true } },
        },
      });
      if (berita) {
        await prisma.berita.update({
          where: { id: berita.id },
          data: { views: { increment: 1 } },
        });
        return NextResponse.json(berita);
      }
    }
  } catch (_) {}

  const dummy = dummyBerita.find((b) => b.slug === slug && b.status === "PUBLISHED");
  if (dummy) {
    const toIso = (d: Date | null | undefined) =>
      d instanceof Date ? d.toISOString() : (d ?? null);
    return NextResponse.json({
      ...dummy,
      publishedAt: toIso(dummy.publishedAt ?? null),
      expiresAt: toIso(dummy.expiresAt ?? null),
      createdAt: toIso(dummy.createdAt as Date),
      updatedAt: toIso(dummy.updatedAt as Date),
    });
  }

  return NextResponse.json(
    { error: "Berita tidak ditemukan" },
    { status: 404 }
  );
}

import { NextRequest, NextResponse } from "next/server";
import { prisma, dbConnected } from "@/lib/prisma";
import { dummyKuliner } from "@/lib/dummy-data";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

// GET - Fetch single kuliner by slug for public
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { slug } = await params;

  try {
    if (dbConnected && prisma) {
      const kuliner = await prisma.kuliner.findUnique({
        where: { slug, status: "PUBLISHED" },
      });
      if (kuliner) return NextResponse.json(kuliner);
    }
  } catch (_) {}

  const dummy = dummyKuliner.find((k) => k.slug === slug && k.status === "PUBLISHED");
  if (dummy) return NextResponse.json(dummy);
  return NextResponse.json(
    { error: "Kuliner tidak ditemukan" },
    { status: 404 }
  );
}

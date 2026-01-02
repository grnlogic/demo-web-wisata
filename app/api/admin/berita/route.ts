import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

// GET - Fetch all berita
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const kategori = searchParams.get("kategori") || "";
    const status = searchParams.get("status") || "";

    const where: any = {};

    if (search) {
      where.OR = [
        { judul: { contains: search, mode: "insensitive" } },
        { konten: { contains: search, mode: "insensitive" } },
      ];
    }

    if (kategori) {
      where.kategori = kategori;
    }

    if (status) {
      where.status = status;
    }

    const berita = await prisma.berita.findMany({
      where,
      include: {
        admin: {
          select: {
            nama: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(berita);
  } catch (error) {
    console.error("Error fetching berita:", error);
    return NextResponse.json(
      { error: "Failed to fetch berita" },
      { status: 500 }
    );
  }
}

// POST - Create new berita
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Generate slug from judul
    const slug = slugify(data.judul, { lower: true, strict: true });

    // Check if slug already exists
    const existingBerita = await prisma.berita.findUnique({
      where: { slug },
    });

    if (existingBerita) {
      return NextResponse.json(
        { error: "Berita dengan judul ini sudah ada" },
        { status: 400 }
      );
    }

    const berita = await prisma.berita.create({
      data: {
        judul: data.judul,
        slug,
        konten: data.konten,
        ringkasan: data.ringkasan,
        kategori: data.kategori,
        gambarUtama: data.gambarUtama,
        tags: data.tags || [],
        sourceUrl: data.sourceUrl,
        sourceImage: data.sourceImage,
        isExternal: data.isExternal || false,
        status: data.status || "DRAFT",
        featured: data.featured || false,
        publishedAt: data.status === "PUBLISHED" ? new Date() : null,
        createdBy: session.user.id,
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

    return NextResponse.json(berita, { status: 201 });
  } catch (error) {
    console.error("Error creating berita:", error);
    return NextResponse.json(
      { error: "Failed to create berita" },
      { status: 500 }
    );
  }
}

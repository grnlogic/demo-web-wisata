import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { KategoriGaleri, TipeMedia } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const search = searchParams.get("search") || "";
    const kategori = searchParams.get("kategori") || "";
    const tipeMedia = searchParams.get("tipeMedia") || "";

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (search) {
      where.OR = [
        { judul: { contains: search, mode: "insensitive" } },
        { deskripsi: { contains: search, mode: "insensitive" } },
      ];
    }

    if (kategori) {
      where.kategori = kategori as KategoriGaleri;
    }

    if (tipeMedia) {
      where.tipeMedia = tipeMedia as TipeMedia;
    }

    const [galeri, total] = await Promise.all([
      prisma.galeri.findMany({
        where,
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        skip,
        take: limit,
        include: {
          admin: {
            select: {
              nama: true,
            },
          },
        },
      }),
      prisma.galeri.count({ where }),
    ]);

    return NextResponse.json({
      data: galeri,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching galeri:", error);
    return NextResponse.json(
      { error: "Failed to fetch galeri" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      judul,
      deskripsi,
      url,
      thumbnail,
      kategori,
      tags,
      tipeMedia,
      featured,
    } = body;

    // Validation
    if (!judul || !url || !kategori) {
      return NextResponse.json(
        { error: "Judul, URL, dan kategori wajib diisi" },
        { status: 400 }
      );
    }

    const galeri = await prisma.galeri.create({
      data: {
        judul,
        deskripsi: deskripsi || null,
        url,
        thumbnail: thumbnail || url,
        kategori: kategori as KategoriGaleri,
        tags: tags || [],
        tipeMedia: tipeMedia || TipeMedia.IMAGE,
        featured: featured || false,
        uploadedBy: session.user.id,
      },
    });

    return NextResponse.json(galeri, { status: 201 });
  } catch (error) {
    console.error("Error creating galeri:", error);
    return NextResponse.json(
      { error: "Failed to create galeri" },
      { status: 500 }
    );
  }
}

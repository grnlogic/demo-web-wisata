import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

// GET - Fetch all UKM
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
        { namaUsaha: { contains: search, mode: "insensitive" } },
        { deskripsi: { contains: search, mode: "insensitive" } },
        { pemilik: { contains: search, mode: "insensitive" } },
      ];
    }

    if (kategori) {
      where.kategori = kategori;
    }

    if (status) {
      where.status = status;
    }

    const ukm = await prisma.profilUkm.findMany({
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

    return NextResponse.json(ukm);
  } catch (error) {
    console.error("Error fetching UKM:", error);
    return NextResponse.json(
      { error: "Failed to fetch UKM" },
      { status: 500 }
    );
  }
}

// POST - Create new UKM
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Generate slug from namaUsaha
    const baseSlug = slugify(data.namaUsaha, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    // Check if slug already exists and add number if needed
    while (await prisma.profilUkm.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const ukm = await prisma.profilUkm.create({
      data: {
        namaUsaha: data.namaUsaha,
        slug,
        deskripsi: data.deskripsi,
        kategori: data.kategori,
        pemilik: data.pemilik,
        lokasi: data.lokasi,
        alamat: data.alamat,
        koordinat: data.koordinat || null,
        nomorTelepon: data.nomorTelepon || null,
        email: data.email || null,
        instagram: data.instagram || null,
        facebook: data.facebook || null,
        whatsapp: data.whatsapp || null,
        website: data.website || null,
        logo: data.logo || null,
        gambar: data.gambar || [],
        produkLayanan: data.produkLayanan || [],
        hargaRata: data.hargaRata || null,
        jamOperasional: data.jamOperasional || null,
        status: data.status || "DRAFT",
        featured: data.featured || false,
        verified: data.verified || false,
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

    return NextResponse.json(ukm, { status: 201 });
  } catch (error) {
    console.error("Error creating UKM:", error);
    return NextResponse.json(
      { error: "Failed to create UKM" },
      { status: 500 }
    );
  }
}

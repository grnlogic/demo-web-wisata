import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

// GET - Fetch all kuliner
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
        { nama: { contains: search, mode: "insensitive" } },
        { deskripsi: { contains: search, mode: "insensitive" } },
        { lokasi: { contains: search, mode: "insensitive" } },
      ];
    }

    if (kategori) {
      where.kategori = kategori;
    }

    if (status) {
      where.status = status;
    }

    const kuliner = await prisma.kuliner.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(kuliner);
  } catch (error) {
    console.error("Error fetching kuliner:", error);
    return NextResponse.json(
      { error: "Failed to fetch kuliner" },
      { status: 500 }
    );
  }
}

// POST - Create new kuliner
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Generate slug from nama
    const slug = slugify(data.nama, { lower: true, strict: true });

    // Check if slug already exists
    const existingKuliner = await prisma.kuliner.findUnique({
      where: { slug },
    });

    if (existingKuliner) {
      return NextResponse.json(
        { error: "Kuliner dengan nama ini sudah ada" },
        { status: 400 }
      );
    }

    const kuliner = await prisma.kuliner.create({
      data: {
        nama: data.nama,
        slug,
        deskripsi: data.deskripsi,
        kategori: data.kategori,
        lokasi: data.lokasi,
        alamat: data.alamat,
        koordinat: data.koordinat || null,
        googleMapsUrl: data.googleMapsUrl || null,
        hargaMin: data.hargaMin ? parseInt(data.hargaMin) : null,
        hargaMax: data.hargaMax ? parseInt(data.hargaMax) : null,
        nomorTelepon: data.nomorTelepon || null,
        jamBuka: data.jamBuka || null,
        gambar: data.gambar || [],
        rating: data.rating ? parseFloat(data.rating) : 0,
        status: data.status || "DRAFT",
        featured: data.featured || false,
      },
    });

    return NextResponse.json(kuliner, { status: 201 });
  } catch (error) {
    console.error("Error creating kuliner:", error);
    return NextResponse.json(
      { error: "Failed to create kuliner" },
      { status: 500 }
    );
  }
}

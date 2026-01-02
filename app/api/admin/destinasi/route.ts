import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { KategoriDestinasi, StatusPublish } from "@prisma/client";

// GET - Fetch all destinasi with filters
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || "";
    const kategori = searchParams.get("kategori") as KategoriDestinasi | null;
    const status = searchParams.get("status") as StatusPublish | null;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    
    if (search) {
      where.OR = [
        { nama: { contains: search, mode: "insensitive" } },
        { lokasi: { contains: search, mode: "insensitive" } },
        { deskripsi: { contains: search, mode: "insensitive" } },
      ];
    }
    
    if (kategori) {
      where.kategori = kategori;
    }
    
    if (status) {
      where.status = status;
    }

    const [destinasi, total] = await Promise.all([
      prisma.destinasi.findMany({
        where,
        include: {
          admin: {
            select: {
              nama: true,
              username: true,
            },
          },
          images: {
            where: { isPrimary: true },
            take: 1,
          },
        },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        skip,
        take: limit,
      }),
      prisma.destinasi.count({ where }),
    ]);

    return NextResponse.json({
      data: destinasi,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching destinasi:", error);
    return NextResponse.json(
      { error: "Failed to fetch destinasi" },
      { status: 500 }
    );
  }
}

// POST - Create new destinasi
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      nama,
      slug,
      deskripsi,
      kategori,
      lokasi,
      alamat,
      koordinat,
      googleMapsUrl,
      rating,
      jumlahReview,
      metaTitle,
      metaDescription,
      status,
      featured,
      images,
      harga,
      fasilitas,
    } = body;

    const destinasi = await prisma.destinasi.create({
      data: {
        nama,
        slug,
        deskripsi,
        kategori,
        lokasi,
        alamat,
        koordinat,
        googleMapsUrl,
        rating: rating ? parseFloat(rating) : 0,
        jumlahReview: jumlahReview ? parseInt(jumlahReview) : 0,
        metaTitle,
        metaDescription,
        status: status || StatusPublish.DRAFT,
        featured: featured || false,
        createdBy: session.user.id,
        images: images
          ? {
              create: images.map((img: any, index: number) => ({
                url: img.url,
                caption: img.caption,
                isPrimary: img.isPrimary || index === 0,
                urutan: index,
              })),
            }
          : undefined,
        harga: harga
          ? {
              create: harga.map((h: any, index: number) => ({
                jenisHarga: h.jenisHarga,
                harga: parseInt(h.harga),
                keterangan: h.keterangan,
                urutan: index,
              })),
            }
          : undefined,
        fasilitas: fasilitas
          ? {
              create: fasilitas.map((f: any, index: number) => ({
                jenis: f.jenis,
                judul: f.judul,
                konten: f.konten,
                urutan: index,
              })),
            }
          : undefined,
      },
      include: {
        images: true,
        harga: true,
        fasilitas: true,
      },
    });

    return NextResponse.json(
      { message: "Destinasi created successfully", data: destinasi },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating destinasi:", error);
    return NextResponse.json(
      { error: "Failed to create destinasi" },
      { status: 500 }
    );
  }
}

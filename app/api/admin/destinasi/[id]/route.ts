import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatusPublish } from "@prisma/client";

// GET - Fetch single destinasi by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const destinasi = await prisma.destinasi.findUnique({
      where: { id },
      include: {
        admin: {
          select: {
            nama: true,
            username: true,
          },
        },
        images: {
          orderBy: { urutan: "asc" },
        },
        harga: {
          orderBy: { urutan: "asc" },
        },
        fasilitas: {
          orderBy: { urutan: "asc" },
        },
      },
    });

    if (!destinasi) {
      return NextResponse.json(
        { error: "Destinasi not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: destinasi });
  } catch (error) {
    console.error("Error fetching destinasi:", error);
    return NextResponse.json(
      { error: "Failed to fetch destinasi" },
      { status: 500 }
    );
  }
}

// PUT - Update destinasi
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
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

    // Check if destinasi exists
    const existing = await prisma.destinasi.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Destinasi not found" },
        { status: 404 }
      );
    }

    // Update destinasi
    const destinasi = await prisma.$transaction(async (tx) => {
      // Delete existing related data if new data provided
      if (images !== undefined) {
        await tx.destinasiImage.deleteMany({
          where: { destinasiId: id },
        });
      }
      if (harga !== undefined) {
        await tx.destinasiHarga.deleteMany({
          where: { destinasiId: id },
        });
      }
      if (fasilitas !== undefined) {
        await tx.destinasiDetail.deleteMany({
          where: { destinasiId: id },
        });
      }

      // Update destinasi
      return await tx.destinasi.update({
        where: { id },
        data: {
          nama,
          slug,
          deskripsi,
          kategori,
          lokasi,
          alamat,
          koordinat,
          googleMapsUrl,
          rating: rating !== undefined ? parseFloat(rating) : undefined,
          jumlahReview:
            jumlahReview !== undefined ? parseInt(jumlahReview) : undefined,
          metaTitle,
          metaDescription,
          status,
          featured,
          images:
            images !== undefined
              ? {
                  create: images.map((img: any, index: number) => ({
                    url: img.url,
                    caption: img.caption,
                    isPrimary: img.isPrimary || index === 0,
                    urutan: index,
                  })),
                }
              : undefined,
          harga:
            harga !== undefined
              ? {
                  create: harga.map((h: any, index: number) => ({
                    jenisHarga: h.jenisHarga,
                    harga: parseInt(h.harga),
                    keterangan: h.keterangan,
                    urutan: index,
                  })),
                }
              : undefined,
          fasilitas:
            fasilitas !== undefined
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
    });

    return NextResponse.json({
      message: "Destinasi updated successfully",
      data: destinasi,
    });
  } catch (error) {
    console.error("Error updating destinasi:", error);
    return NextResponse.json(
      { error: "Failed to update destinasi" },
      { status: 500 }
    );
  }
}

// DELETE - Delete destinasi
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    // Check if destinasi exists
    const existing = await prisma.destinasi.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Destinasi not found" },
        { status: 404 }
      );
    }

    // Delete destinasi (cascade will handle related records)
    await prisma.destinasi.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Destinasi deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting destinasi:", error);
    return NextResponse.json(
      { error: "Failed to delete destinasi" },
      { status: 500 }
    );
  }
}

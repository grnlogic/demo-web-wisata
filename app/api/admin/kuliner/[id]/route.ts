import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

interface RouteParams {
  params: {
    id: string;
  };
}

// GET - Fetch single kuliner by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const kuliner = await prisma.kuliner.findUnique({
      where: { id: params.id },
    });

    if (!kuliner) {
      return NextResponse.json(
        { error: "Kuliner tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(kuliner);
  } catch (error) {
    console.error("Error fetching kuliner:", error);
    return NextResponse.json(
      { error: "Failed to fetch kuliner" },
      { status: 500 }
    );
  }
}

// PUT - Update kuliner
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Check if kuliner exists
    const existingKuliner = await prisma.kuliner.findUnique({
      where: { id: params.id },
    });

    if (!existingKuliner) {
      return NextResponse.json(
        { error: "Kuliner tidak ditemukan" },
        { status: 404 }
      );
    }

    // Generate new slug if nama changed
    let slug = existingKuliner.slug;
    if (data.nama && data.nama !== existingKuliner.nama) {
      slug = slugify(data.nama, { lower: true, strict: true });

      // Check if new slug already exists
      const duplicateSlug = await prisma.kuliner.findFirst({
        where: {
          slug,
          id: { not: params.id },
        },
      });

      if (duplicateSlug) {
        return NextResponse.json(
          { error: "Kuliner dengan nama ini sudah ada" },
          { status: 400 }
        );
      }
    }

    const kuliner = await prisma.kuliner.update({
      where: { id: params.id },
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
        status: data.status,
        featured: data.featured || false,
      },
    });

    return NextResponse.json(kuliner);
  } catch (error) {
    console.error("Error updating kuliner:", error);
    return NextResponse.json(
      { error: "Failed to update kuliner" },
      { status: 500 }
    );
  }
}

// DELETE - Delete kuliner
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if kuliner exists
    const existingKuliner = await prisma.kuliner.findUnique({
      where: { id: params.id },
    });

    if (!existingKuliner) {
      return NextResponse.json(
        { error: "Kuliner tidak ditemukan" },
        { status: 404 }
      );
    }

    await prisma.kuliner.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Kuliner berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting kuliner:", error);
    return NextResponse.json(
      { error: "Failed to delete kuliner" },
      { status: 500 }
    );
  }
}

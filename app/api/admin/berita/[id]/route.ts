import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

// GET - Fetch single berita
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
    const berita = await prisma.berita.findUnique({
      where: { id },
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
      return NextResponse.json({ error: "Berita not found" }, { status: 404 });
    }

    return NextResponse.json(berita);
  } catch (error) {
    console.error("Error fetching berita:", error);
    return NextResponse.json(
      { error: "Failed to fetch berita" },
      { status: 500 }
    );
  }
}

// PUT - Update berita
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();

    // Check if berita exists
    const existingBerita = await prisma.berita.findUnique({
      where: { id },
    });

    if (!existingBerita) {
      return NextResponse.json({ error: "Berita not found" }, { status: 404 });
    }

    // Generate new slug if judul changed
    let slug = existingBerita.slug;
    if (data.judul && data.judul !== existingBerita.judul) {
      slug = slugify(data.judul, { lower: true, strict: true });

      // Check if new slug conflicts with another berita
      const conflictingBerita = await prisma.berita.findUnique({
        where: { slug },
      });

      if (conflictingBerita && conflictingBerita.id !== id) {
        return NextResponse.json(
          { error: "Berita dengan judul ini sudah ada" },
          { status: 400 }
        );
      }
    }

    const updateData: any = {};

    if (data.judul) updateData.judul = data.judul;
    if (slug !== existingBerita.slug) updateData.slug = slug;
    if (data.konten !== undefined) updateData.konten = data.konten;
    if (data.ringkasan !== undefined) updateData.ringkasan = data.ringkasan;
    if (data.kategori) updateData.kategori = data.kategori;
    if (data.gambarUtama !== undefined) updateData.gambarUtama = data.gambarUtama;
    if (data.tags !== undefined) updateData.tags = data.tags;
    if (data.sourceUrl !== undefined) updateData.sourceUrl = data.sourceUrl;
    if (data.sourceImage !== undefined) updateData.sourceImage = data.sourceImage;
    if (data.isExternal !== undefined) updateData.isExternal = data.isExternal;
    if (data.status) {
      updateData.status = data.status;
      // Set publishedAt when changing to PUBLISHED
      if (data.status === "PUBLISHED" && !existingBerita.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }
    if (data.featured !== undefined) updateData.featured = data.featured;

    const berita = await prisma.berita.update({
      where: { id },
      data: updateData,
      include: {
        admin: {
          select: {
            nama: true,
            username: true,
          },
        },
      },
    });

    return NextResponse.json(berita);
  } catch (error) {
    console.error("Error updating berita:", error);
    return NextResponse.json(
      { error: "Failed to update berita" },
      { status: 500 }
    );
  }
}

// DELETE - Delete berita
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

    // Check if berita exists
    const existingBerita = await prisma.berita.findUnique({
      where: { id },
    });

    if (!existingBerita) {
      return NextResponse.json({ error: "Berita not found" }, { status: 404 });
    }

    await prisma.berita.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Berita deleted successfully" });
  } catch (error) {
    console.error("Error deleting berita:", error);
    return NextResponse.json(
      { error: "Failed to delete berita" },
      { status: 500 }
    );
  }
}

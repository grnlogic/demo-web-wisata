import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { KategoriGaleri, TipeMedia } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const galeri = await prisma.galeri.findUnique({
      where: { id },
      include: {
        admin: {
          select: {
            nama: true,
          },
        },
      },
    });

    if (!galeri) {
      return NextResponse.json({ error: "Galeri not found" }, { status: 404 });
    }

    return NextResponse.json(galeri);
  } catch (error) {
    console.error("Error fetching galeri:", error);
    return NextResponse.json(
      { error: "Failed to fetch galeri" },
      { status: 500 }
    );
  }
}

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
      judul,
      deskripsi,
      url,
      thumbnail,
      kategori,
      tags,
      tipeMedia,
      featured,
    } = body;

    // Check if galeri exists
    const existingGaleri = await prisma.galeri.findUnique({
      where: { id },
    });

    if (!existingGaleri) {
      return NextResponse.json({ error: "Galeri not found" }, { status: 404 });
    }

    const galeri = await prisma.galeri.update({
      where: { id },
      data: {
        judul,
        deskripsi: deskripsi || null,
        url,
        thumbnail: thumbnail || url,
        kategori: kategori as KategoriGaleri,
        tags: tags || [],
        tipeMedia: tipeMedia || TipeMedia.IMAGE,
        featured: featured || false,
      },
    });

    return NextResponse.json(galeri);
  } catch (error) {
    console.error("Error updating galeri:", error);
    return NextResponse.json(
      { error: "Failed to update galeri" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    // Check if galeri exists
    const existingGaleri = await prisma.galeri.findUnique({
      where: { id },
    });

    if (!existingGaleri) {
      return NextResponse.json({ error: "Galeri not found" }, { status: 404 });
    }

    await prisma.galeri.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Galeri deleted successfully" });
  } catch (error) {
    console.error("Error deleting galeri:", error);
    return NextResponse.json(
      { error: "Failed to delete galeri" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

// GET - Fetch single UKM by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ukm = await prisma.profilUkm.findUnique({
      where: { id: params.id },
      include: {
        admin: {
          select: {
            nama: true,
            username: true,
          },
        },
      },
    });

    if (!ukm) {
      return NextResponse.json({ error: "UKM not found" }, { status: 404 });
    }

    return NextResponse.json(ukm);
  } catch (error) {
    console.error("Error fetching UKM:", error);
    return NextResponse.json(
      { error: "Failed to fetch UKM" },
      { status: 500 }
    );
  }
}

// PUT - Update UKM
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Check if UKM exists
    const existingUkm = await prisma.profilUkm.findUnique({
      where: { id: params.id },
    });

    if (!existingUkm) {
      return NextResponse.json({ error: "UKM not found" }, { status: 404 });
    }

    // Generate new slug if namaUsaha changed
    let slug = existingUkm.slug;
    if (data.namaUsaha !== existingUkm.namaUsaha) {
      const baseSlug = slugify(data.namaUsaha, { lower: true, strict: true });
      slug = baseSlug;
      let counter = 1;

      // Check if slug already exists (excluding current UKM)
      while (true) {
        const existingSlug = await prisma.profilUkm.findUnique({
          where: { slug },
        });
        if (!existingSlug || existingSlug.id === params.id) break;
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    const ukm = await prisma.profilUkm.update({
      where: { id: params.id },
      data: {
        namaUsaha: data.namaUsaha,
        slug,
        deskripsi: data.deskripsi,
        kategori: data.kategori,
        pemilik: data.pemilik,
        lokasi: data.lokasi,
        alamat: data.alamat,
        koordinat: data.koordinat,
        nomorTelepon: data.nomorTelepon,
        email: data.email,
        instagram: data.instagram,
        facebook: data.facebook,
        whatsapp: data.whatsapp,
        website: data.website,
        logo: data.logo,
        gambar: data.gambar || [],
        produkLayanan: data.produkLayanan || [],
        hargaRata: data.hargaRata,
        jamOperasional: data.jamOperasional,
        status: data.status,
        featured: data.featured,
        verified: data.verified,
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

    return NextResponse.json(ukm);
  } catch (error) {
    console.error("Error updating UKM:", error);
    return NextResponse.json(
      { error: "Failed to update UKM" },
      { status: 500 }
    );
  }
}

// DELETE - Delete UKM
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if UKM exists
    const ukm = await prisma.profilUkm.findUnique({
      where: { id: params.id },
    });

    if (!ukm) {
      return NextResponse.json({ error: "UKM not found" }, { status: 404 });
    }

    await prisma.profilUkm.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "UKM deleted successfully" });
  } catch (error) {
    console.error("Error deleting UKM:", error);
    return NextResponse.json(
      { error: "Failed to delete UKM" },
      { status: 500 }
    );
  }
}

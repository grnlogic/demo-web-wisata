import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

// GET - Fetch single event
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
    const event = await prisma.event.findUnique({
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

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

// PUT - Update event
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

    // Check if event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Generate new slug if nama changed
    let slug = existingEvent.slug;
    if (data.nama && data.nama !== existingEvent.nama) {
      slug = slugify(data.nama, { lower: true, strict: true });

      // Check if new slug conflicts with another event
      const conflictingEvent = await prisma.event.findUnique({
        where: { slug },
      });

      if (conflictingEvent && conflictingEvent.id !== id) {
        return NextResponse.json(
          { error: "Event dengan nama ini sudah ada" },
          { status: 400 }
        );
      }
    }

    const updateData: any = {};
    
    if (data.nama) updateData.nama = data.nama;
    if (slug !== existingEvent.slug) updateData.slug = slug;
    if (data.deskripsi !== undefined) updateData.deskripsi = data.deskripsi;
    if (data.lokasi) updateData.lokasi = data.lokasi;
    if (data.alamat !== undefined) updateData.alamat = data.alamat;
    if (data.koordinat !== undefined) updateData.koordinat = data.koordinat;
    if (data.googleMapsUrl !== undefined) updateData.googleMapsUrl = data.googleMapsUrl;
    if (data.tanggalMulai) updateData.tanggalMulai = new Date(data.tanggalMulai);
    if (data.tanggalSelesai) updateData.tanggalSelesai = new Date(data.tanggalSelesai);
    if (data.jamMulai !== undefined) updateData.jamMulai = data.jamMulai;
    if (data.jamSelesai !== undefined) updateData.jamSelesai = data.jamSelesai;
    if (data.gambar !== undefined) updateData.gambar = data.gambar;
    if (data.thumbnail !== undefined) updateData.thumbnail = data.thumbnail;
    if (data.kontakPerson !== undefined) updateData.kontakPerson = data.kontakPerson;
    if (data.nomorTelepon !== undefined) updateData.nomorTelepon = data.nomorTelepon;
    if (data.hargaTiket !== undefined) updateData.hargaTiket = data.hargaTiket;
    if (data.status) updateData.status = data.status;
    if (data.featured !== undefined) updateData.featured = data.featured;

    const event = await prisma.event.update({
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

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

// DELETE - Delete event
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
    // Check if event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    await prisma.event.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

// GET - Fetch all events
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const where: any = {};

    if (search) {
      where.OR = [
        { nama: { contains: search, mode: "insensitive" } },
        { lokasi: { contains: search, mode: "insensitive" } },
      ];
    }

    if (status) {
      where.status = status;
    }

    const events = await prisma.event.findMany({
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

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// POST - Create new event
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
    const existingEvent = await prisma.event.findUnique({
      where: { slug },
    });

    if (existingEvent) {
      return NextResponse.json(
        { error: "Event dengan nama ini sudah ada" },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        nama: data.nama,
        slug,
        deskripsi: data.deskripsi,
        lokasi: data.lokasi,
        alamat: data.alamat,
        koordinat: data.koordinat,
        googleMapsUrl: data.googleMapsUrl,
        tanggalMulai: new Date(data.tanggalMulai),
        tanggalSelesai: new Date(data.tanggalSelesai),
        jamMulai: data.jamMulai,
        jamSelesai: data.jamSelesai,
        gambar: data.gambar,
        thumbnail: data.thumbnail,
        kontakPerson: data.kontakPerson,
        nomorTelepon: data.nomorTelepon,
        hargaTiket: data.hargaTiket,
        status: data.status || "DRAFT",
        featured: data.featured || false,
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

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}

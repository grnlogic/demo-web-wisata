import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || "";
    const kategori = searchParams.get("kategori") || "";
    const status = searchParams.get("status") || "PUBLISHED"; // Default PUBLISHED for public
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;

    // Build where clause
    const where: Prisma.DestinasiWhereInput = {
      status: status as any,
    };

    if (search) {
      where.OR = [
        { nama: { contains: search, mode: "insensitive" } },
        { deskripsi: { contains: search, mode: "insensitive" } },
        { lokasi: { contains: search, mode: "insensitive" } },
      ];
    }

    if (kategori) {
      where.kategori = kategori as any;
    }

    // Get total count
    const total = await prisma.destinasi.count({ where });

    // Get destinasi with pagination
    const destinasi = await prisma.destinasi.findMany({
      where,
      include: {
        images: {
          select: {
            url: true,
            caption: true,
            isPrimary: true,
          },
        },
        harga: {
          select: {
            jenisHarga: true,
            harga: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    });

    return NextResponse.json({
      success: true,
      data: destinasi,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching destinasi:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch destinasi" },
      { status: 500 }
    );
  }
}

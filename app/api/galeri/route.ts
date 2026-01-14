import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Check if Prisma client is connected
    if (!prisma) {
      console.error("Prisma client is not initialized");
      return NextResponse.json(
        { error: "Database connection error" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const kategori = searchParams.get("kategori") || "";
    const featured = searchParams.get("featured") === "true";
    const limit = parseInt(searchParams.get("limit") || "20");
    const page = parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (kategori && kategori !== "SEMUA") {
      where.kategori = kategori;
    }

    if (featured) {
      where.featured = true;
    }

    const [galeri, total] = await Promise.all([
      prisma.galeri.findMany({
        where,
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        skip,
        take: limit,
      }),
      prisma.galeri.count({ where }),
    ]);

    return NextResponse.json({
      data: galeri,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching galeri:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      env: {
        DATABASE_URL: process.env.DATABASE_URL ? "Set" : "Not set",
        NODE_ENV: process.env.NODE_ENV,
      },
    });
    return NextResponse.json(
      {
        error: "Failed to fetch galeri",
        details:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.message
              : "Unknown error"
            : undefined,
      },
      { status: 500 }
    );
  }
}

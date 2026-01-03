import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

// GET - Fetch single kuliner by slug for public
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const kuliner = await prisma.kuliner.findUnique({
      where: {
        slug,
        status: "PUBLISHED",
      },
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

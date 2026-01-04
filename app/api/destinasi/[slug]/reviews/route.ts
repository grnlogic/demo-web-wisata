import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getDestinasiBySlug(slug: string) {
  if (!slug) return null;

  return prisma.destinasi.findUnique({
    where: { slug },
    select: { id: true },
  });
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const destinasi = await getDestinasiBySlug(slug);

    if (!destinasi) {
      return NextResponse.json(
        { success: false, error: "Destinasi tidak ditemukan" },
        { status: 404 }
      );
    }

    const [reviews, aggregate] = await Promise.all([
      prisma.destinasiReview.findMany({
        where: { destinasiId: destinasi.id },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          userId: true,
          userName: true,
          rating: true,
          comment: true,
          createdAt: true,
        },
      }),
      prisma.destinasiReview.aggregate({
        where: { destinasiId: destinasi.id },
        _avg: { rating: true },
        _count: { id: true },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        reviews,
        averageRating: aggregate._avg.rating ?? 0,
        totalReview: aggregate._count.id,
      },
    });
  } catch (error) {
    console.error("Error fetching destinasi reviews:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat review" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Harus login untuk memberikan review" },
        { status: 401 }
      );
    }

    if (session.user.role !== "USER") {
      return NextResponse.json(
        { success: false, error: "Hanya pengguna yang dapat memberikan review" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const rating = Number(body.rating);
    const comment = (body.comment || "").trim();

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: "Rating harus 1-5" },
        { status: 400 }
      );
    }

    if (comment.length < 3) {
      return NextResponse.json(
        { success: false, error: "Komentar minimal 3 karakter" },
        { status: 400 }
      );
    }

    const { slug } = await params;
    const destinasi = await getDestinasiBySlug(slug);
    if (!destinasi) {
      return NextResponse.json(
        { success: false, error: "Destinasi tidak ditemukan" },
        { status: 404 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Pengguna tidak ditemukan" },
        { status: 404 }
      );
    }

    const displayName =
      user.name || user.email?.split("@")[0] || session.user.username || "Pengguna";

    // Upsert to keep one review per user per destinasi
    const review = await prisma.destinasiReview.upsert({
      where: {
        destinasiId_userId: {
          destinasiId: destinasi.id,
          userId: session.user.id,
        },
      },
      update: {
        rating,
        comment,
        userName: displayName,
      },
      create: {
        destinasiId: destinasi.id,
        userId: session.user.id,
        userName: displayName,
        rating,
        comment,
      },
      select: {
        id: true,
        userId: true,
        userName: true,
        rating: true,
        comment: true,
        createdAt: true,
      },
    });

    const aggregate = await prisma.destinasiReview.aggregate({
      where: { destinasiId: destinasi.id },
      _avg: { rating: true },
      _count: { id: true },
    });

    await prisma.destinasi.update({
      where: { id: destinasi.id },
      data: {
        rating: aggregate._avg.rating ?? 0,
        jumlahReview: aggregate._count.id,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        review,
        averageRating: aggregate._avg.rating ?? 0,
        totalReview: aggregate._count.id,
      },
    });
  } catch (error) {
    console.error("Error creating destinasi review:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan review" },
      { status: 500 }
    );
  }
}

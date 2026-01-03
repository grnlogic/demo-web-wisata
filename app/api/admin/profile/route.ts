import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hash, compare } from "bcryptjs";

// GET - Get current user profile
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const admin = await prisma.admin.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        username: true,
        nama: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!admin) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(admin);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

// PUT - Update profile
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { nama, email } = await request.json();

    if (!nama || !email) {
      return NextResponse.json(
        { error: "Nama dan email harus diisi" },
        { status: 400 }
      );
    }

    // Check if email is already used by another admin
    const existingAdmin = await prisma.admin.findFirst({
      where: {
        email,
        NOT: { id: session.user.id },
      },
    });

    if (existingAdmin) {
      return NextResponse.json(
        { error: "Email sudah digunakan oleh admin lain" },
        { status: 400 }
      );
    }

    const updatedAdmin = await prisma.admin.update({
      where: { id: session.user.id },
      data: { nama, email },
      select: {
        id: true,
        username: true,
        nama: true,
        email: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Profil berhasil diperbarui",
      data: updatedAdmin,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui profil" },
      { status: 500 }
    );
  }
}

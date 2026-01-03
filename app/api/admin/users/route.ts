import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

// GET - Get all admins
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        username: true,
        nama: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    return NextResponse.json(
      { error: "Failed to fetch admins" },
      { status: 500 }
    );
  }
}

// POST - Create new admin
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { username, password, nama, email } = await request.json();

    // Validation
    if (!username || !password || !nama || !email) {
      return NextResponse.json(
        { error: "Semua field harus diisi" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password minimal 6 karakter" },
        { status: 400 }
      );
    }

    // Check if username already exists
    const existingUsername = await prisma.admin.findUnique({
      where: { username },
    });

    if (existingUsername) {
      return NextResponse.json(
        { error: "Username sudah digunakan" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingEmail = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: "Email sudah digunakan" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create admin
    const newAdmin = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
        nama,
        email,
      },
      select: {
        id: true,
        username: true,
        nama: true,
        email: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Admin baru berhasil dibuat",
      data: newAdmin,
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json(
      { error: "Gagal membuat admin baru" },
      { status: 500 }
    );
  }
}

// DELETE - Delete admin
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID admin harus disediakan" },
        { status: 400 }
      );
    }

    // Prevent deleting self
    if (id === session.user.id) {
      return NextResponse.json(
        { error: "Tidak dapat menghapus akun sendiri" },
        { status: 400 }
      );
    }

    await prisma.admin.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Admin berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting admin:", error);
    return NextResponse.json(
      { error: "Gagal menghapus admin" },
      { status: 500 }
    );
  }
}

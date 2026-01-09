import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, code, type, name, password } = await req.json();

    if (!email || !code || !type) {
      return NextResponse.json(
        { error: "Email, code, dan type diperlukan" },
        { status: 400 }
      );
    }

    // Find OTP
    const otpRecord = await prisma.otpVerification.findFirst({
      where: {
        email,
        code,
        type,
        verified: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!otpRecord) {
      return NextResponse.json(
        { error: "Kode OTP tidak valid" },
        { status: 400 }
      );
    }

    // Check if expired
    if (otpRecord.expiresAt < new Date()) {
      await prisma.otpVerification.delete({
        where: { id: otpRecord.id },
      });
      return NextResponse.json(
        { error: "Kode OTP telah kadaluarsa" },
        { status: 400 }
      );
    }

    // Mark OTP as verified
    await prisma.otpVerification.update({
      where: { id: otpRecord.id },
      data: { verified: true },
    });

    // For REGISTER, create the user account
    if (type === "REGISTER") {
      if (!name || !password) {
        return NextResponse.json(
          { error: "Nama dan password diperlukan untuk registrasi" },
          { status: 400 }
        );
      }

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "Email sudah terdaftar" },
          { status: 400 }
        );
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          isVerified: true,
        },
      });

      // Clean up used OTP
      await prisma.otpVerification.deleteMany({
        where: { email, type: "REGISTER" },
      });

      return NextResponse.json({
        success: true,
        message: "Registrasi berhasil",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    }

    // For LOGIN
    if (type === "LOGIN") {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return NextResponse.json(
          { error: "User tidak ditemukan" },
          { status: 400 }
        );
      }

      // Update user verification status
      await prisma.user.update({
        where: { id: user.id },
        data: { isVerified: true },
      });

      // Clean up used OTP
      await prisma.otpVerification.deleteMany({
        where: { email, type: "LOGIN" },
      });

      return NextResponse.json({
        success: true,
        message: "Verifikasi berhasil",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    }

    return NextResponse.json(
      { error: "Type tidak valid" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

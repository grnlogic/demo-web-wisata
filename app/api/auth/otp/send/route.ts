import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOtp, sendOtpEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email, type } = await req.json();

    if (!email || !type) {
      return NextResponse.json(
        { error: "Email dan type diperlukan" },
        { status: 400 }
      );
    }

    if (!["LOGIN", "REGISTER"].includes(type)) {
      return NextResponse.json(
        { error: "Type tidak valid" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format email tidak valid" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // For REGISTER, user should not exist
    if (type === "REGISTER" && user) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    // For LOGIN, user must exist
    if (type === "LOGIN" && !user) {
      return NextResponse.json(
        { error: "Email tidak terdaftar" },
        { status: 400 }
      );
    }

    // Generate OTP
    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Delete old OTPs for this email
    await prisma.otpVerification.deleteMany({
      where: {
        email,
        type,
      },
    });

    // Create new OTP
    await prisma.otpVerification.create({
      data: {
        email,
        code: otp,
        type,
        expiresAt,
        userId: user?.id,
      },
    });

    // Send OTP via email
    const emailResult = await sendOtpEmail(
      email,
      otp,
      type === "REGISTER" ? "register" : "login"
    );

    if (!emailResult.success) {
      return NextResponse.json(
        { error: "Gagal mengirim email. Silakan coba lagi." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Kode OTP telah dikirim ke email Anda",
    });
  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// DELETE - Delete all berita
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Delete all berita
    const result = await prisma.berita.deleteMany({});

    return NextResponse.json({
      success: true,
      deleted: result.count,
      message: `${result.count} berita berhasil dihapus`,
    });
  } catch (error) {
    console.error("Error deleting all berita:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete all berita" },
      { status: 500 }
    );
  }
}

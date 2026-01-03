import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - Fetch all settings
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settings = await prisma.settings.findMany({
      orderBy: { key: "asc" },
    });

    // Convert array to object for easier frontend consumption
    const settingsObject: Record<string, string> = {};
    settings.forEach((setting) => {
      settingsObject[setting.key] = setting.value;
    });

    return NextResponse.json(settingsObject);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// POST/PUT - Update multiple settings at once
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Update or create each setting
    const operations = Object.entries(data).map(([key, value]) =>
      prisma.settings.upsert({
        where: { key },
        update: { value: value as string },
        create: {
          key,
          value: value as string,
          description: getSettingDescription(key),
        },
      })
    );

    await Promise.all(operations);

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully",
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}

// Helper function to provide descriptions for settings
function getSettingDescription(key: string): string {
  const descriptions: Record<string, string> = {
    site_about: "Deskripsi tentang Pangandaran",
    site_email: "Email kontak utama",
    site_phone: "Nomor telepon kontak",
    social_facebook: "Link Facebook",
    social_instagram: "Link Instagram",
    social_twitter: "Link Twitter",
    social_youtube: "Link YouTube",
  };
  return descriptions[key] || "";
}

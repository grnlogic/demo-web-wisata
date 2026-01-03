import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch public settings for frontend
export async function GET(request: NextRequest) {
  try {
    const settings = await prisma.settings.findMany({
      select: {
        key: true,
        value: true,
      },
    });

    // Convert array to object for easier frontend consumption
    const settingsObject: Record<string, string> = {};
    settings.forEach((setting) => {
      settingsObject[setting.key] = setting.value;
    });

    return NextResponse.json(settingsObject, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

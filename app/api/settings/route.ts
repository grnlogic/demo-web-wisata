import { NextRequest, NextResponse } from "next/server";
import { prisma, dbConnected } from "@/lib/prisma";
import { dummySettings } from "@/lib/dummy-data";

// GET - Fetch public settings for frontend
export async function GET(request: NextRequest) {
  try {
    if (dbConnected && prisma) {
      const settings = await prisma.settings.findMany({
        select: { key: true, value: true },
      });
      const settingsObject: Record<string, string> = {};
      settings.forEach((s) => { settingsObject[s.key] = s.value; });
      return NextResponse.json(settingsObject, {
        headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
      });
    }
  } catch (_) {}

  const settingsObject: Record<string, string> = {};
  dummySettings.forEach((s) => { settingsObject[s.key] = s.value; });
  return NextResponse.json(settingsObject, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}

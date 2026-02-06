import { NextRequest, NextResponse } from "next/server";
import { prisma, dbConnected } from "@/lib/prisma";
import { dummyHotelListing } from "@/lib/dummy-data";

const SERPAPI_ENDPOINT = "https://serpapi.com/search";
const DEFAULT_QUERY = "Pangandaran hotels";
const DEFAULT_ADULTS = 2;
const MAX_RESULTS = 50;

function buildDate(offsetDays: number) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

function pickFirst<T>(items: T[] | undefined | null): T | null {
  if (!items || items.length === 0) return null;
  return items[0];
}

export async function GET() {
  try {
    if (dbConnected && prisma) {
      const hotels = await prisma.hotelListing.findMany({
        orderBy: [
          { rating: "desc" },
          { reviews: "desc" },
          { fetchedAt: "desc" },
        ],
        take: 12,
      });
      return NextResponse.json(
        { hotels },
        {
          headers: {
            "Cache-Control": "public, s-maxage=300, stale-while-revalidate=900",
          },
        }
      );
    }
  } catch (_) {}

  return NextResponse.json(
    { hotels: dummyHotelListing.slice(0, 12) },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=900",
      },
    }
  );
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.SERPAPI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "SERPAPI_API_KEY is missing" },
      { status: 500 }
    );
  }

  try {
    const params = new URLSearchParams({
      engine: "google_hotels",
      q: DEFAULT_QUERY,
      check_in_date: buildDate(7),
      check_out_date: buildDate(8),
      adults: String(DEFAULT_ADULTS),
      currency: "IDR",
      output: "json",
      api_key: apiKey,
    });

    const response = await fetch(`${SERPAPI_ENDPOINT}?${params.toString()}`, {
      headers: {
        "Content-Type": "application/json",
      },
      // Explicit GET for SerpAPI
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("SerpAPI error", text);
      return NextResponse.json(
        { error: "Failed to fetch hotels from SerpAPI" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const properties: any[] = Array.isArray(data?.properties)
      ? data.properties
      : [];

    const hotels = properties.slice(0, MAX_RESULTS).map((item) => {
      const firstImage = pickFirst<{ thumbnail?: string }>(item.images);
      return {
        name: item.name ?? "Hotel tanpa nama",
        description: item.description ?? null,
        link: item.link ?? null,
        thumbnail: firstImage?.thumbnail ?? null,
        source: item.source ?? "google_hotels",
        location: item.location ?? item.address ?? null,
        price:
          item.total_rate?.lowest ||
          item.rate_per_night?.lowest ||
          item.price ||
          null,
        rating: typeof item.overall_rating === "number" ? item.overall_rating : null,
        reviews: typeof item.reviews === "number" ? item.reviews : null,
        propertyToken: item.property_token ?? null,
        checkInDate: params.get("check_in_date"),
        checkOutDate: params.get("check_out_date"),
        fetchedAt: new Date(),
        createdAt: new Date(),
      };
    });

    await prisma.$transaction([
      prisma.hotelListing.deleteMany(),
      prisma.hotelListing.createMany({ data: hotels }),
    ]);

    return NextResponse.json({ stored: hotels.length });
  } catch (error) {
    console.error("Failed to refresh hotel listings", error);
    return NextResponse.json(
      { error: "Failed to refresh hotels" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";

// Pexels API - Free untuk personal & small projects
// Daftar di: https://www.pexels.com/api/
const PEXELS_API_KEY = process.env.PEXELS_API_KEY || ""; // Add to .env.local

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query") || "landscape";
    const page = searchParams.get("page") || "1";
    const perPage = searchParams.get("per_page") || "20";

    if (!PEXELS_API_KEY) {
      return NextResponse.json(
        { error: "Pexels API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(
        query
      )}&page=${page}&per_page=${perPage}&orientation=landscape`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch images from Pexels");
    }

    const data = await response.json();

    // Transform response to simpler format
    const photos = data.photos.map((photo: any) => ({
      id: photo.id,
      url: photo.src.large2x, // High quality
      thumbnail: photo.src.medium,
      photographer: photo.photographer,
      photographer_url: photo.photographer_url,
      alt: photo.alt || query,
      width: photo.width,
      height: photo.height,
    }));

    return NextResponse.json({
      success: true,
      photos,
      total_results: data.total_results,
      page: data.page,
      per_page: data.per_page,
    });
  } catch (error) {
    console.error("Error searching images:", error);
    return NextResponse.json(
      { success: false, error: "Failed to search images" },
      { status: 500 }
    );
  }
}

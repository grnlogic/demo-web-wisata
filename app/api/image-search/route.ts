import { NextRequest, NextResponse } from "next/server";

// LoL Human API - Pinterest Image Search
// API: https://api.lolhuman.xyz/api/pinterest
const LOL_HUMAN_API_KEY = process.env.LOL_HUMAN_API_KEY || "";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query") || "landscape";
    const perPage = parseInt(searchParams.get("per_page") || "20");

    if (!LOL_HUMAN_API_KEY) {
      return NextResponse.json(
        { error: "LoL Human API key not configured" },
        { status: 500 }
      );
    }

    // Fetch multiple images in parallel (20-50 requests)
    const numberOfImages = Math.min(perPage, 50); // Max 50 images
    const fetchPromises = Array.from({ length: numberOfImages }, () =>
      fetch(
        `https://api.lolhuman.xyz/api/pinterest?apikey=${LOL_HUMAN_API_KEY}&query=${encodeURIComponent(
          query
        )}`
      ).then((res) => res.json())
    );

    const results = await Promise.all(fetchPromises);

    // Extract image URLs and filter out duplicates
    const imageUrls = new Set<string>();
    results.forEach((data) => {
      if (data.status === 200 && data.result) {
        imageUrls.add(data.result);
      }
    });

    // Convert to photos array
    const photos = Array.from(imageUrls).map((url, index) => ({
      id: Date.now() + index,
      url: url,
      thumbnail: url,
      photographer: "Pinterest",
      photographer_url: "",
      alt: query,
      width: 1200,
      height: 800,
    }));

    return NextResponse.json({
      success: true,
      photos,
      total_results: photos.length,
      page: 1,
      per_page: photos.length,
    });
  } catch (error) {
    console.error("Error searching images:", error);
    return NextResponse.json(
      { success: false, error: "Failed to search images" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  let url = "";

  if (q) {
    // Search by query
    url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&addressdetails=1&limit=5`;
  } else if (lat && lon) {
    // Reverse geocoding
    url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`;
  } else {
    return NextResponse.json({ error: "Invalid params" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Wisata-Pangandaran/1.0",
      },
    });

    if (!res.ok) {
      throw new Error("Geocoding failed");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Geocoding error:", error);
    return NextResponse.json(
      { error: "Failed to fetch location data" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const radius = searchParams.get("radius") || "6000";
    const lang = searchParams.get("lang") || "en";

    if (!lat || !lng) {
      return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error("❌ Google Maps API key missing!");
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=restaurant&language=${lang}&key=${apiKey}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch Google Places API");

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Failed to fetch nearby restaurants" }, { status: 500 });
  }
}


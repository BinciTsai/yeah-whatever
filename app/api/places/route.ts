import { NextResponse } from 'next/server';
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const lat = url.searchParams.get('lat');
    const lng = url.searchParams.get('lng');
    const radius = url.searchParams.get('radius') || process.env.NEXT_PUBLIC_DEFAULT_RADIUS_METERS || '6000';
    const minRating = Number(url.searchParams.get('minRating') || process.env.NEXT_PUBLIC_MIN_RATING || '3.5');
    const key = process.env.GOOGLE_MAPS_API_KEY;
    if (!lat || !lng) return NextResponse.json({ error: 'missing lat/lng' }, { status: 400 });
    if (!key) return NextResponse.json({ error: 'missing API key on server' }, { status: 500 });
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=restaurant&key=${key}`;
    const r = await fetch(placesUrl);
    const data = await r.json();
    const filtered = (data.results || []).filter((p:any) => (p.rating || 0) >= minRating);
    return NextResponse.json({ ok: true, results: filtered });
  } catch (e) {
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}

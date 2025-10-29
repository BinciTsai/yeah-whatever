'use client';
import React, { useEffect, useRef, useState } from 'react';
import LangSwitcher from './components/LangSwitcher';
import MapDisplay from './components/MapDisplay';
import { useLoadScript } from '@react-google-maps/api';

type ResultItem = {
  name: string;
  rating?: number;
  vicinity?: string;
  lat: number;
  lng: number;
};

export default function Page() {
  const [lang, setLang] = useState<'en' | 'zh-TW'>('en');
  const [zoom] = useState<number>(14);
  const [radiusKm, setRadiusKm] = useState<number>(6); // default 6 km
  const [minRating, setMinRating] = useState<number>(3.5);
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [selected, setSelected] = useState<{ lat: number; lng: number; title?: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const mapRef = useRef<HTMLDivElement | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places', 'geometry']
  });

  useEffect(() => {
    // get current position, fallback to Taipei 101
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setCenter({ lat: 25.033964, lng: 121.564468 }), // Taipei 101 fallback
        { timeout: 10000 }
      );
    } else {
      setCenter({ lat: 25.033964, lng: 121.564468 });
    }
  }, []);

  const handlePick = () => {
    if (!isLoaded || !center) { alert(lang==='en' ? 'Map not ready' : '地圖尚未準備好'); return; }
    setLoading(true);
    setSelected(null);

    // use PlacesService with a temporary div
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    const radiusMeters = Math.max(100, Math.min(60000, Math.round(radiusKm * 1000)));
    const request: google.maps.places.PlaceSearchRequest = {
      location: new google.maps.LatLng(center.lat, center.lng),
      radius: radiusMeters,
      type: 'restaurant',
      language: lang,
    };

    service.nearbySearch(request, (results, status) => {
      setLoading(false);
      if (status !== google.maps.places.PlacesServiceStatus.OK || !results) {
        console.error('Places status', status, results);
        alert(lang === 'en' ? 'Failed to fetch nearby restaurants.' : '無法取得附近餐廳資料。');
        return;
      }
      const filtered = results.filter((r) => (r.rating ?? 0) >= minRating);
      if (filtered.length === 0) {
        alert(lang === 'en' ? 'No matching restaurants found.' : '找不到符合條件的餐廳。');
        return;
      }
      const pick = filtered[Math.floor(Math.random() * filtered.length)];
      const loc = pick.geometry?.location;
      if (!loc) { alert('No location'); return; }
      const lat = loc.lat();
      const lng = loc.lng();
      setSelected({ lat, lng, title: pick.name });
      setCenter({ lat, lng });
    });
  };

  const handleNavigate = () => {
    if (!selected) return;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}&travelmode=driving`;
    window.open(url, '_blank');
  };

  return (
    <main className="min-h-screen">
      <div className="p-4 bg-gray-800 text-white flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">yeah, whatever.</h1>
          <div className="text-sm text-gray-200">{lang === 'en' ? 'Random nearby restaurant picker' : '隨機附近餐廳抽籤'}</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-200">Language</div>
          <LangSwitcher lang={lang} setLang={setLang} />
        </div>
      </div>

      <div className="p-4 bg-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="md:col-span-2">
          <label className="block text-sm">Search radius (km)</label>
          <input type="number" value={radiusKm} min={0.1} max={60} step={0.1} onChange={(e)=>setRadiusKm(Number(e.target.value))} className="w-40 border p-1 rounded" />
        </div>
        <div>
          <label className="block text-sm">Minimum rating</label>
          <input type="number" value={minRating} min={0} max={5} step={0.1} onChange={(e)=>setMinRating(Number(e.target.value))} className="w-28 border p-1 rounded" />
        </div>
        <div>
          <button onClick={handlePick} className="bg-blue-600 text-white px-4 py-2 rounded">{loading ? (lang==='en' ? 'Searching...' : '搜尋中...') : (lang==='en' ? 'Pick a restaurant' : '抽餐廳')}</button>
        </div>
      </div>

      <div className="p-4">
        {isLoaded ? <MapDisplay center={center} zoom={zoom} selected={selected} /> : <div>Loading map...</div>}
      </div>

      {selected && (
        <div className="p-4 max-w-3xl mx-auto bg-white shadow rounded space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-lg font-semibold">{selected.title}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleNavigate} className="bg-green-600 text-white px-3 py-1 rounded">{lang==='en' ? 'Navigate' : '導航'}</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

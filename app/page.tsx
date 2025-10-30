"use client";

import { useEffect, useState } from "react";

interface Place {
  name: string;
  rating: number;
  user_ratings_total: number;
  vicinity: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  distance_km: number;
}

export default function HomePage() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(false);
  const [adsKey, setAdsKey] = useState(0);
  const [drawCount, setDrawCount] = useState(0);
  const [cooldown, setCooldown] = useState(false);

  // 每日抽籤限制設定
  const DAILY_LIMIT = 3;

  useEffect(() => {
    // 初始化抽籤次數
    const savedData = localStorage.getItem("drawData");
    const today = new Date().toDateString();

    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed.date === today) {
        setDrawCount(parsed.count);
      } else {
        // 新的一天重置
        localStorage.setItem(
          "drawData",
          JSON.stringify({ date: today, count: 0 })
        );
        setDrawCount(0);
      }
    } else {
      localStorage.setItem(
        "drawData",
        JSON.stringify({ date: today, count: 0 })
      );
    }
  }, []);

  const updateDrawCount = (count: number) => {
    const today = new Date().toDateString();
    localStorage.setItem("drawData", JSON.stringify({ date: today, count }));
    setDrawCount(count);
  };

  // 模擬顯示廣告
  const showAdThenContinue = async () => {
    alert("🎬 Please watch this short ad to continue!");
    await new Promise((r) => setTimeout(r, 3000)); // 模擬 3 秒廣告
    setAdsKey((k) => k + 1);
  };

  const fetchNearbyRestaurants = async () => {
    if (cooldown) return;
    setCooldown(true);
    setTimeout(() => setCooldown(false), 1500);

    if (drawCount >= DAILY_LIMIT) {
      await showAdThenContinue();
      updateDrawCount(drawCount - DAILY_LIMIT + 1);
    }

    setLoading(true);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );

      const { latitude, longitude } = position.coords;

      const res = await fetch(
        `/api/nearby?lat=${latitude}&lng=${longitude}&radius=6000`
      );

      if (!res.ok) throw new Error("Failed to fetch nearby restaurants.");
      const data = await res.json();

      const restaurants = (data.results || []).map((p: any) => ({
        ...p,
        distance_km:
          getDistanceFromLatLonInKm(
            latitude,
            longitude,
            p.geometry.location.lat,
            p.geometry.location.lng
          ).toFixed(2),
      }));

      if (restaurants.length === 0) throw new Error("No restaurants found.");

      const random = restaurants[Math.floor(Math.random() * restaurants.length)];
      setSelectedPlace(random);
      updateDrawCount(drawCount + 1);
      setAdsKey((k) => k + 1);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch nearby restaurants.");
    } finally {
      setLoading(false);
    }
  };

  const getDistanceFromLatLonInKm = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const deg2rad = (deg: number) => deg * (Math.PI / 180);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-yellow-100 text-center px-4">
      {/* Global AdSense script */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxx"
        crossOrigin="anonymous"
      ></script>

      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Yeah Whatever 🍽️
      </h1>

      <p className="text-gray-700 mb-4">
        Feeling hungry? Let fate decide your next meal.
      </p>

      <button
        onClick={fetchNearbyRestaurants}
        disabled={loading || cooldown}
        className="bg-blue-500 text-white px-6 py-3 rounded-2xl hover:bg-blue-600 disabled:opacity-60"
      >
        {loading ? "Picking..." : "Draw a Restaurant"}
      </button>

      <p className="mt-3 text-sm text-gray-600">
        🎯 Remaining draws today: {Math.max(0, DAILY_LIMIT - drawCount)}
      </p>

      {selectedPlace && (
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-md w-full max-w-md text-left">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            {selectedPlace.name}
          </h2>
          <p className="text-gray-700">
            ⭐ {selectedPlace.rating || "N/A"} ({selectedPlace.user_ratings_total || 0} reviews)
          </p>
          <p className="text-gray-600">📍 {selectedPlace.vicinity}</p>
          <p className="text-gray-600">
            📏 Distance: {selectedPlace.distance_km} km
          </p>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.geometry.location.lat},${selectedPlace.geometry.location.lng}`}
            target="_blank"
            className="block mt-4 bg-green-500 text-white text-center py-2 rounded-xl hover:bg-green-600"
          >
            Navigate with Google Maps
          </a>
        </div>
      )}

      {/* Ad block */}
      <div key={adsKey} className="mt-10 w-full flex justify-center">
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "120px" }}
          data-ad-client="ca-pub-xxxxxxxxxxxx"
          data-ad-slot={1000000 + adsKey}
        ></ins>
        <script>{`(adsbygoogle = window.adsbygoogle || []).push({});`}</script>
      </div>

      <footer className="mt-10 text-sm text-gray-500">
        © 2025 Yeah Whatever. All rights reserved.
      </footer>
    </main>
  );
}

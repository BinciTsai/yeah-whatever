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
  const [lang, setLang] = useState<"en" | "zh-TW">("en");
  const [radius, setRadius] = useState(6000); // default 6 km
  const [minRating, setMinRating] = useState(3.5);

  const DAILY_LIMIT = 3;

  const t = (en: string, zh: string) => (lang === "zh-TW" ? zh : en);

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

  const showAdThenContinue = async () => {
    alert(t("🎬 Please watch a short ad to continue!", "🎬 請觀看短片廣告以繼續！"));
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
        `/api/nearby?lat=${latitude}&lng=${longitude}&radius=${radius}`
      );

      if (!res.ok) throw new Error("Failed to fetch nearby restaurants.");
      const data = await res.json();

      const restaurants = (data.results || [])
        .map((p: any) => ({
          ...p,
          distance_km:
            getDistanceFromLatLonInKm(
              latitude,
              longitude,
              p.geometry.location.lat,
              p.geometry.location.lng
            ).toFixed(2),
        }))
        .filter((p: any) => (p.rating ?? 0) >= minRating);

      if (restaurants.length === 0)
        throw new Error(t("No restaurants found.", "找不到符合條件的餐廳。"));

      const random = restaurants[Math.floor(Math.random() * restaurants.length)];
      setSelectedPlace(random);
      updateDrawCount(drawCount + 1);
      setAdsKey((k) => k + 1);
    } catch (err) {
      console.error(err);
      alert(t("Failed to fetch nearby restaurants.", "無法取得餐廳資料。"));
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
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxx"
        crossOrigin="anonymous"
      ></script>

      <div className="flex items-center justify-between w-full max-w-md mt-6 mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Yeah Whatever 🍽️</h1>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as "en" | "zh-TW")}
          className="border rounded-lg px-2 py-1 text-sm bg-white"
        >
          <option value="en">English</option>
          <option value="zh-TW">中文</option>
        </select>
      </div>

      <div className="text-gray-700 mb-4 leading-relaxed">
        {lang === "en" ? (
          <>
             <p className="font-medium mb-1">Let fate decide your next meal.</p>
             <p>
                Discover nearby restaurants, cafés, and local favorites within your area.  
                You can adjust distance and rating filters, or simply let the app pick one for you —  
                a fun and effortless way to find your next dining spot!
             </p>
          </>
        ) : (
          <>
             <p className="font-medium mb-1">讓命運決定你的下一餐吧！</p>
             <p>
                探索你附近的餐廳、咖啡館與在地美食。  
                你可以調整距離與評價條件，或直接讓系統幫你隨機抽選，  
                享受輕鬆又有趣的美食發現體驗！
             </p>
          </>
        )}
      </div>

      {/* 控制項 */}
      <div className="flex gap-4 mb-4 items-center">
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            {t("Radius (km)", "距離（公里）")}
          </label>
          <input
            type="number"
            min={1}
            max={420}
            value={radius / 1000}
            onChange={(e) => setRadius(Number(e.target.value) * 1000)}
            className="border px-2 py-1 rounded-lg w-24 text-center"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            {t("Min Rating", "最低星等")}
          </label>
          <input
            type="number"
            min={1}
            max={5}
            step={0.1}
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="border px-2 py-1 rounded-lg w-24 text-center"
          />
        </div>
      </div>

      <button
        onClick={fetchNearbyRestaurants}
        disabled={loading || cooldown}
        className="bg-blue-500 text-white px-6 py-3 rounded-2xl hover:bg-blue-600 disabled:opacity-60"
      >
        {loading
          ? t("Picking...", "抽取中...")
          : t("Draw a Restaurant", "抽一間餐廳")}
      </button>

      <p className="mt-3 text-sm text-gray-600">
        🎯 {t("Remaining draws today:", "今日剩餘抽籤次數：")}{" "}
        {Math.max(0, DAILY_LIMIT - drawCount)}
      </p>

      {selectedPlace && (
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-md w-full max-w-md text-left">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            {selectedPlace.name}
          </h2>
          <p className="text-gray-700">
            ⭐ {selectedPlace.rating || "N/A"} (
            {selectedPlace.user_ratings_total || 0}{" "}
            {t("reviews", "則評論")})
          </p>
          <p className="text-gray-600">📍 {selectedPlace.vicinity}</p>
          <p className="text-gray-600">
            📏 {t("Distance", "距離")}：{selectedPlace.distance_km} km
          </p>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.geometry.location.lat},${selectedPlace.geometry.location.lng}`}
            target="_blank"
            className="block mt-4 bg-green-500 text-white text-center py-2 rounded-xl hover:bg-green-600"
          >
            {t("Navigate with Google Maps", "使用 Google Maps 導航")}
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
        © 2025 Yeah Whatever. {t("All rights reserved.", "版權所有。")}
      </footer>
    </main>
  );
}

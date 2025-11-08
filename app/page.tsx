"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [lang, setLang] = useState<"en" | "zh-TW">("en");

  const t = (en: string, zh: string) => (lang === "en" ? en : zh);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-yellow-100 text-center px-6">
      <div className="flex items-center justify-between w-full max-w-md mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Yeah Whatever 🍽️</h1>

        {/* 🌐 語言切換 */}
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as "en" | "zh-TW")}
          className="border rounded-lg px-2 py-1 text-sm bg-white shadow-sm"
        >
          <option value="en">English</option>
          <option value="zh-TW">中文</option>
        </select>
      </div>

      {/* 📝 主內容 */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        {t("Find restaurants near you", "尋找你附近的餐廳")}
      </h2>

      <p className="text-gray-600 leading-relaxed max-w-md mb-6">
        {t(
          "Let fate decide your next meal. Discover nearby restaurants, cafés, and local favorites within your area. You can adjust distance and rating filters, or simply let the app pick one for you. A fun and effortless way to find your next dining spot!",
          "讓命運決定你的下一餐吧！探索你附近的餐廳、咖啡館和在地美食。你可以調整距離與評價篩選條件，或是讓系統隨機幫你選擇，輕鬆又有趣地找到下一個用餐地點！"
        )}
      </p>

      {/* 🎯 開始按鈕 */}
      <button
        onClick={() => router.push("/random")}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-md transition-all duration-200"
      >
        {t("Start Now", "開始抽籤")}
      </button>

      {/* 📜 頁面底部說明 */}
      <div className="mt-10 text-gray-500 text-sm max-w-md">
        {t(
          "Tip: You can adjust distance and star rating in the next page for more accurate results.",
          "小提示：在下一頁你可以調整距離與星等，讓結果更精準。"
        )}
      </div>
    </main>
  );
}

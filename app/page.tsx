"use client";
import { useState, useEffect } from "react";
import Script from "next/script";
import dynamic from "next/dynamic";

const LangSwitcher = dynamic(() => import("./components/LangSwitcher"), { ssr: false });

export default function Home() {
  const [lang, setLang] = useState<"en" | "zh-TW">("zh-TW");
  const [drawCount, setDrawCount] = useState(3);
  const [showAdPrompt, setShowAdPrompt] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // ✅ 每日重置邏輯
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const savedDate = localStorage.getItem("draw_date");
    const savedCount = localStorage.getItem("draw_count");

    if (savedDate === today && savedCount) {
      setDrawCount(Number(savedCount));
    } else {
      localStorage.setItem("draw_date", today);
      localStorage.setItem("draw_count", "3");
      setDrawCount(3);
    }
  }, []);

  // ✅ 抽籤功能
  const handleDraw = () => {
    if (drawCount > 0) {
      const newCount = drawCount - 1;
      setDrawCount(newCount);
      localStorage.setItem("draw_count", String(newCount));
      setResult(lang === "en" ? "🎯 You got a random restaurant!" : "🎯 抽中一家隨機餐廳！");
    } else {
      setShowAdPrompt(true);
    }
  };

  // ✅ 真實 Rewarded 廣告邏輯
  const showRewardedAd = async () => {
    const slotId = process.env.NEXT_PUBLIC_ADSENSE_REWARDED_SLOT!;
    const clientId = process.env.NEXT_PUBLIC_ADSENSE_ID!;

    try {
      // @ts-ignore
      const ad = new google.ads.rewarded.RewardedAd({
        adUnitId: slotId,
        publisherId: clientId,
      });

      ad.addEventListener("rewarded", () => {
        // 👇 使用者完整看完廣告 → 解鎖一次抽籤
        const newCount = drawCount + 1;
        setDrawCount(newCount);
        localStorage.setItem("draw_count", String(newCount));
        setShowAdPrompt(false);
        alert(lang === "en" ? "Thanks for watching! You earned 1 more draw!" : "感謝觀看廣告！你又能抽一次了！");
      });

      await ad.load();
      await ad.show();
    } catch (err) {
      console.error("Rewarded ad failed:", err);
      alert(lang === "en" ? "Ad failed to load. Try again later." : "廣告載入失敗，請稍後再試。");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      {/* ✅ AdSense SDK & Rewarded API */}
      <Script
        id="adsbygoogle-init"
        async
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
        crossOrigin="anonymous"
      />
      <Script
        id="adsense-rewarded"
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/rewarded_ads.js"
      />

      <div className="max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold mb-4">
          {lang === "en" ? "Yeah Whatever 🍽️" : "隨便啦 🍽️"}
        </h1>

        <LangSwitcher lang={lang} setLang={setLang} />

        <p className="mt-4">
          {lang === "en"
            ? `You have ${drawCount} draw${drawCount !== 1 ? "s" : ""} left today.`
            : `今天還可以抽 ${drawCount} 次`}
        </p>

        <button
          onClick={handleDraw}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {lang === "en" ? "Draw a Restaurant" : "抽一家餐廳"}
        </button>

        {result && <p className="mt-6 text-lg text-green-600 font-semibold">{result}</p>}

        {showAdPrompt && (
          <div className="mt-8 p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
            <p>
              {lang === "en"
                ? "You've reached your daily limit. Watch an ad to unlock one more draw."
                : "今天的免費抽籤次數已用完，觀看廣告可再抽一次。"}
            </p>
            <button
              onClick={showRewardedAd}
              className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {lang === "en" ? "Watch Ad" : "觀看廣告"}
            </button>
          </div>
        )}
      </div>

      {/* ✅ 橫幅廣告 */}
      <div className="fixed bottom-0 left-0 w-1/3 h-20 flex items-center justify-center bg-gray-50 border-t">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
          data-ad-slot="1234567890"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
      <div className="fixed bottom-0 right-0 w-1/3 h-20 flex items-center justify-center bg-gray-50 border-t">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
          data-ad-slot="0987654321"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </main>
  );
}

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
      <p className="text-gray-600 leading-relaxed max-w-md mb-6">
        {t(
          "Let’s be honest: choosing what to eat shouldn’t be this hard. Yet here we are, scrolling through endless lists of restaurants, comparing menus, checking reviews, and trying to guess whether a photo is real or taken under perfect studio lights. By the time you finally decide, you’re either too hungry or too tired to care. Yeah Whatever was created for one simple reason: sometimes, you just want the universe to decide for you. No complicated searching, no arguments, and definitely no agonizing over the difference between a 4.3 and a 4.4 star rating.If you want to pick a restaurant you click or tap the button upward. This paragraph is just for passing google adsense. It’s a hard time to build a real useful tool and make ends meet. If you read this sentence, you probably rich in time. There’s a story for you to know how this site came from. I was struggling to choose a restaurant to feed my belly and there were too many boring places to have food around me. Seriously, I had no idea what should I eat because there was no restaurant arousing my interest. My crush have to travel to many new places due to her job, and  she had a same problem( well, I think she had. ). Thank you google make me single! You are blocking my path to happiness! There’s not many things a nerd can get ladies praise. Anyway……I stole this idea from a man collecting cafe informations and randomly pick one. I hope you enjoy this story and enjoy using this site to start your adventure.",
          "說實話，選擇吃什麼本來就不該這麼難。然而，我們卻不得不瀏覽無窮無盡的餐廳列表，比較菜單，查看評論，還要猜測照片是真實的還是在完美的影棚燈光下拍攝的。等你終於決定好吃什麼的時候，要嘛餓得不行，要嘛累得不想管了。Yeah Whatever 的出現其實很簡單：有時候，你只想讓宇宙替你做決定。無需繁瑣的搜索，無需爭論“你想吃什麼？”，更不用糾結於 4.3 星和 4.4 星之間的區別。如果你想選一家餐廳，請點擊上面的按鈕。這段文字只是為了通過google adsense的審核。現在開發一個真正有用的工具並維持收支平衡真的很難。如果你讀到了這句話，那你可能時間充裕。我跟你講個故事，告訴你這個網站的由來。當時我正苦惱於選一家餐廳填飽肚子，周圍都是些無聊的餐廳。說真的，我完全不知道該吃什麼，因為沒有一家餐廳能讓我提起興趣。我的暗戀對象因為工作需要常常出差，她也遇到同樣的問題（嗯，我覺得她有）。真是謝了喔google！你擋住了我通往幸福的道路！肥宅能博得女生好感的東西不多耶。總之……我從一個收集咖啡館資訊的人那裡借來了​​這個想法，然後隨機選了一家。希望你喜歡這個故事，也希望你能喜歡用這個網站開啟你的美食之旅。"
        )}
      </p>
    </main>
  );
}

import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Yeah Whatever",
  description: "Random restaurant picker with map and ads",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 取得 AdSense Publisher ID（你可以放在 .env.local）
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-你的ID";

  return (
    <html lang="en">
      <head>
        {/* ✅ 這段是 AdSense 審核所需 */}
        <Script
          id="adsense-verify"
          strategy="beforeInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7290581557337468`}
          async
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        {children}

        {/* ✅ 這段會在審核通過後自動顯示廣告 */}
        <Script id="adsense-auto-load" strategy="afterInteractive">
          {`
            (function() {
              // 如果 Google AdSense 已允許顯示廣告，這段會載入廣告
              if (window.adsbygoogle) {
                console.log("AdSense already initialized");
                (adsbygoogle = window.adsbygoogle || []).push({});
              } else {
                console.log("AdSense script not ready yet");
              }
            })();
          `}
        </Script>

        {/* ✅ 預留底部左右兩塊廣告區 */}
        <div
          style={{
            position: "fixed",
            bottom: "10px",
            left: "10px",
            zIndex: 1000,
          }}
        >
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "120px", height: "240px" }}
            data-ad-client={adsenseClient}
            data-ad-slot="你的廣告代號1"
          ></ins>
        </div>

        <div
          style={{
            position: "fixed",
            bottom: "10px",
            right: "10px",
            zIndex: 1000,
          }}
        >
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "120px", height: "240px" }}
            data-ad-client={adsenseClient}
            data-ad-slot="你的廣告代號2"
          ></ins>
        </div>
        <footer className="w-full bg-gray-100 text-center text-sm text-gray-600 py-4 border-t mt-10">
           © 2025 Yeah Whatever |
           <a href="/about" className="mx-1 hover:underline">About</a> |
           <a href="/privacy" className="mx-1 hover:underline">Privacy Policy</a> |
           <a href="/terms" className="mx-1 hover:underline">Terms of Service</a>
        </footer>

      </body>
    </html>
  );
}

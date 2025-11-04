import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

// ✅ SEO metadata (改進版)
export const metadata = {
  title: "Yeah Whatever 🍽️ | Random Restaurant Picker",
  description:
    "Let fate decide your next meal. Discover nearby restaurants, cafés, and hidden local favorites effortlessly.",
  keywords: [
    "restaurant picker",
    "food finder",
    "random restaurant",
    "yeah whatever",
    "find restaurants near me",
    "dining suggestions",
    "food discovery",
  ],
  authors: [{ name: "Yeah Whatever Team" }],
  openGraph: {
    title: "Yeah Whatever 🍽️ | Random Restaurant Picker",
    description:
      "Let fate decide your next meal — fun, easy, and spontaneous food discovery near you.",
    url: "https://yeah-whatever.vercel.app",
    siteName: "Yeah Whatever",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yeah Whatever 🍽️ | Random Restaurant Picker",
    description:
      "A fun and effortless way to find your next dining spot. Try your luck and discover hidden gems nearby!",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ AdSense Publisher ID（請改成你的實際 ID）
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-7290581557337468";

  return (
    <html lang="en">
      <head>
        {/* ✅ Google AdSense 驗證用 Script（必須在 <head>） */}
        <Script
          id="adsense-verify"
          strategy="beforeInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          async
          crossOrigin="anonymous"
        />
      </head>

      <body className={inter.className}>
        {children}

        {/* ✅ 初始化 AdSense 自動廣告 */}
        <Script id="adsense-auto-load" strategy="afterInteractive">
          {`
            (function() {
              if (window.adsbygoogle) {
                console.log("AdSense initialized");
                (adsbygoogle = window.adsbygoogle || []).push({});
              } else {
                console.log("AdSense script not ready yet");
              }
            })();
          `}
        </Script>

        {/* ✅ 左下廣告區 */}
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

        {/* ✅ 右下廣告區 */}
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

        {/* ✅ Footer 區塊 */}
        <footer className="w-full bg-gray-100 text-center text-sm text-gray-600 py-4 border-t mt-10">
          © 2025 Yeah Whatever |{" "}
          <a href="/about" className="mx-1 hover:underline">
            About
          </a>{" "}
          |{" "}
          <a href="/privacy" className="mx-1 hover:underline">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/terms" className="mx-1 hover:underline">
            Terms of Service
          </a>
        </footer>
      </body>
    </html>
  );
}

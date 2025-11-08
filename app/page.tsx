import Link from "next/link";

export const metadata = {
  title: "Yeah Whatever | Discover Random Restaurants Near You",
  description:
    "Yeah Whatever is a fun restaurant picker that helps you discover new places to eat nearby. Explore local cafes and restaurants effortlessly!",
  openGraph: {
    title: "Yeah Whatever | Let Fate Decide Your Next Meal",
    description:
      "Feeling indecisive? Let Yeah Whatever pick a random restaurant near you. Explore new dining experiences around you.",
    url: "https://yeah-whatever.vercel.app",
    siteName: "Yeah Whatever",
    images: [
      {
        url: "https://yeah-whatever.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Yeah Whatever - Random Restaurant Picker",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-yellow-100 text-center px-6">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Yeah Whatever 🍽️</h1>
      <p className="text-gray-700 max-w-xl leading-relaxed mb-6">
        Welcome to <strong>Yeah Whatever</strong> — the fun way to discover where
        to eat next!  
        <br />
        Whether you’re craving something new or can’t decide what to eat, we’ll
        help you pick a random restaurant nearby.  
        <br />
        <br />
        Adjust your preferences for distance and rating, or just let fate choose
        your next dining adventure.  
      </p>

      <Link
        href="/random"
        className="bg-blue-500 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-blue-600 transition-all shadow-md"
      >
        🍀 Start Now
      </Link>

      <footer className="mt-10 text-sm text-gray-600">
        © 2025 Yeah Whatever |
        <Link href="/about" className="mx-1 hover:underline">
          About
        </Link>
        |
        <Link href="/privacy" className="mx-1 hover:underline">
          Privacy Policy
        </Link>
        |
        <Link href="/terms" className="mx-1 hover:underline">
          Terms of Service
        </Link>
      </footer>
    </main>
  );
}

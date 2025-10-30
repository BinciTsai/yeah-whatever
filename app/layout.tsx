import './globals.css';

export const metadata = {
  title: 'yeah, whatever.',
  description: 'Random nearby restaurant picker — yeah, whatever.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
     <head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7290581557337468"crossorigin="anonymous"></script>
     </head>
      <body className="min-h-screen flex flex-col">
        <main className="flex-1">
          {children}
        </main>
        <footer className="w-full bg-white border-t">
          <div className="max-w-6xl mx-auto flex gap-4 p-4">
            <div className="w-1/2 p-2 flex items-center justify-center border-r">
              <div className="text-sm text-gray-500">(AdSense Left Placeholder)</div>
            </div>
            <div className="w-1/2 p-2 flex items-center justify-center">
              <div className="text-sm text-gray-500">(AdSense Right Placeholder)</div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

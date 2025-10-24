import './globals.css';

export const metadata = {
  title: 'whatever!',
  description: 'Random restaurant picker',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center p-6 bg-gray-50">
          <div className="w-full max-w-4xl">{children}</div>
        </main>
        <footer className="w-full bg-white border-t">
          <div className="max-w-5xl mx-auto flex gap-4 p-4">
            <div className="w-1/2 p-2 flex items-center justify-center border-r">
              {/* AdSense Left Placeholder - replace with your AdSense snippet */}
              <div className="text-sm text-gray-500">(AdSense Left Placeholder)</div>
            </div>
            <div className="w-1/2 p-2 flex items-center justify-center">
              {/* AdSense Right Placeholder - replace with your AdSense snippet */}
              <div className="text-sm text-gray-500">(AdSense Right Placeholder)</div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

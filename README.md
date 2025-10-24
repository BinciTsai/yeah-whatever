# whatever! — Final stable package (Next.js + Tailwind + Google Places)

## Local setup (macOS / Linux / Windows WSL)
1. Unzip package and open terminal, cd into folder.
2. Copy .env.local.example to .env.local and add your server-side API key:
   ```bash
   cp .env.local.example .env.local
   # edit .env.local
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run dev server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000

## Deploy to Vercel
- Push to GitHub then import into Vercel.
- Add Environment Variable `GOOGLE_MAPS_API_KEY` with your server key.
- Deploy.

Notes:
- Do NOT commit `.env.local` to GitHub.
- Replace AdSense placeholders in `app/layout.tsx` footer after AdSense approval.

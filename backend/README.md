# CanadaClip Merchant Dashboard

**Help small Canadian businesses steal customers from big brands via AI search.**

Merchant-facing dashboard for CanadaClip — track customers stolen from big brands via AI-powered App Clips and get Gemini-powered GEO optimization suggestions.

Built for **Hack Canada 2026** (Reactiv ClipKit + Gemini API).

## Stack

- **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS**
- **Recharts** for analytics
- **Lucide React** for icons
- **Gemini API** (`@google/generative-ai`) for GEO suggestions

## Setup

```bash
npm install
cp .env.example .env
```

Add your **Gemini API key** to `.env`:

```
GEMINI_API_KEY=your_key_here
```

Get a key at [Google AI Studio](https://aistudio.google.com/app/apikey).

## Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You’re redirected to `/dashboard`.

## Pages

| Route | Description |
|-------|-------------|
| `/dashboard` | Hero KPIs, stolen-customers chart, competitor breakdown, live activity feed |
| `/dashboard/geo` | GEO Optimizer — paste listing, click “Analyze with Gemini AI”, get suggestions + before/after |
| `/dashboard/clip` | Active triggers, clip performance, phone mockup preview |

## Demo flow (judging)

1. Show App Clip on iPhone simulator.
2. Open dashboard in browser → hero stats (“247 customers stolen”).
3. Stolen customers chart (Jansport, Herschel, North Face).
4. Go to **GEO Optimizer** → paste listing → **Analyze**.
5. Watch Gemini stream 5 suggestions and before/after listing.
6. Pitch: small businesses get GEO power for a fraction of big-brand spend.

## Deploy (Vercel)

1. Push to GitHub and import in Vercel.
2. Set `GEMINI_API_KEY` in Vercel project environment variables.
3. Deploy. Use the live URL in your Devpost submission.

All data is **mocked** for the demo; no backend or auth required except the Gemini API for the GEO page.

# Canada Clip — Backend + Frontend

This repo contains two parts of the Canada Clip project in separate folders so both are easy to find and run.

---

## Backend (dashboard)

**Location:** [`backend/`](./backend)  
**Author:** Your Next.js dashboard and APIs.

Merchant-facing dashboard for CanadaClip — track customers stolen from big brands via AI-powered App Clips and get GEO optimization suggestions.

- **Stack:** Next.js 14, TypeScript, Tailwind, Recharts, Gemini API
- **Run:** `cd backend && npm install && npm run dev` → [http://localhost:3000](http://localhost:3000)
- **Details:** See [backend/README.md](./backend/README.md)

---

## Frontend (App Clip simulator)

**Location:** [`frontend/`](./frontend)  
**Author:** [Pranav Marthi](https://github.com/PranavMarthi) — [canadaclips](https://github.com/PranavMarthi/canadaclips).

Reactiv ClipKit Lab: iOS App Clip simulator for Hack Canada. Build and test App Clip experiences (Swift/Xcode) without entitlements or an Apple Developer account.

- **Stack:** Swift, SwiftUI, Xcode 26+
- **Run:** Open `frontend/ReactivChallengeKit/ReactivChallengeKit.xcodeproj` in Xcode, then Build & Run (Cmd+R)
- **Details:** See [frontend/README.md](./frontend/README.md)

---

## Quick start

| What you want to run | Command / action |
|----------------------|------------------|
| **Dashboard (backend)** | `cd backend && npm run dev` |
| **App Clip simulator (frontend)** | Open `frontend/ReactivChallengeKit/ReactivChallengeKit.xcodeproj` in Xcode → Cmd+R |

# YouTube CTR Boost Lab

A free public tool that helps YouTube creators improve their titles, hooks, and thumbnail text to boost click-through rate (CTR).

## Features
- **CTR Scoring**: Analyzes title length, power words, and structure.
- **Title Generation**: Creates 10 optimized alternatives based on viral patterns.
- **Hook & Thumbnail Ideas**: Generates scripts and text overlays.
- **Email Lead Capture**: Teaser results displayed, full results emailed (Mocked in this localized version).

## Tech Stack
- **Frontend**: Next.js 14 (App Router), React, Lucide Icons
- **Styling**: Vanilla CSS (Modern Dark Mode)
- **Backend**: Next.js API Routes (Serverless Functions)

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Environment Variables
Copy `.env.example` to `.env.local` and add your keys (if implementing real email sending).
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment Checklist

- [ ] **Set Environment Variables**: Add `BREVO_API_KEY` (or other email provider) in your deployment platform (Vercel/Netlify).
- [ ] **Deploy Backend**: The API route `/api/analyze-title` is automatically deployed with Next.js.
- [ ] **Connect Domain**: Point your custom domain to the deployment.
- [ ] **Connect Email System**: implementing the `sendTitlePackEmail` function in `app/api/analyze-title/route.js`.
- [ ] **Test**: Verify the flow inputs -> teaser -> email gate -> success.

## Customization
- Edit `lib/logic.js` to tweak the scoring algorithms and title templates.
- Edit `app/globals.css` to change the color scheme.

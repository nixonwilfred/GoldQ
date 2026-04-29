# GoldQ Website

Professional trading website for NQ Futures and Gold (XAUUSD) analysis.

## Stack

- Next.js 14 (App Router)
- Tailwind CSS
- TypeScript
- MDX authoring for analysis posts
- Resend-powered email signup backend

## Local development

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
npm run start
```

## MDX blog authoring

Create new analysis posts in:

`content/analysis/<slug>.mdx`

Each post uses frontmatter:

```md
---
title: "Post title"
date: "2026-04-27"
asset: "NQ" # or "Gold"
excerpt: "Short summary"
bias: "Bullish" # or "Bearish"
priceZones:
  - "Support: ..."
  - "Pivot: ..."
  - "Resistance: ..."
---
```

## Email signup (Resend)

Copy `.env.example` to `.env.local` and set:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_TO_EMAIL`

The form posts to `POST /api/subscribe`.

## SEO & OG images

- Dynamic sitemap: `/sitemap.xml`
- Site OG image: `/opengraph-image`
- Per-post OG image: `/analysis/[slug]/opengraph-image`

# Heartland Tracker

Public, dark cartographic–intel map of **US / China / Russia / EU / other** involvement in Central Asia (Kazakhstan, Kyrgyzstan, Tajikistan, Turkmenistan, Uzbekistan), with soft shadow context for neighbors.

## Principles

- **No unsourced claims.** Every pin has a source URL + quote (or dataset citation).
- **Two layers:** Verified assets vs Reported activity (headline-derived live pulls).
- **Free tier only:** GDELT + Google News RSS, OpenFreeMap tiles, Vercel hosting.

## Stack

- Next.js 15 + MapLibre GL + OpenFreeMap dark basemap
- Verified ledger in `src/data/`
- Live API: `/api/live` (GDELT + RSS)
- GitHub Action refreshes `data/live/events.json` every 30 minutes

## Develop

```bash
npm install
npm run dev
```

```bash
npm run ingest   # pull live snapshot to data/live/events.json
npm run build
```

## Deploy

Connected to GitHub `asurixyz/heartland-tracker` and Vercel (public).

## Data lineage

| Layer | Sources |
|-------|---------|
| Verified | Hand-cited seed + AidData / AEI CGIT / SIPRI / official pages |
| Reported | GDELT DOC 2.0 + Google News RSS (automatic) |

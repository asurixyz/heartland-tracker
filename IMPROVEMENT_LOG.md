# Heartland Tracker — improvement log

Autopilot loop notes. Agents: `heartland-improver`, `heartland-data-trust`, `heartland-ux`, `heartland-shipper`.

## 2026-08-06 — Cycle 1 (live relevance + UX)

- **Problem:** `/api/live` was noisy (UNICEF “Europe and Central Asia”, Legatum, weak actor tags).
- **Fix:** Heartland relevance gate in `src/lib/gdelt.ts` — require CA-5 / Central Asia signal, drop bureau noise, prefer power+theme; tighter GDELT + Google News queries; confidence scoring.
- **UX:** Esc closes drawer; Reset filters; feed sorts reported pulse first; core-country map labels.
- **Subagents created:** `.cursor/agents/*` + user `live-site-autopilot`.
- **Verify after ship:** `https://heartland-tracker.vercel.app/api/live` should show fewer off-topic headlines.

## 2026-08-06 — Cycle 2 (depth + host fix)

- **Data:** +18 verified historical entities (TM gas, UZ auto/textile FDI, KZ uranium/rail/port, RU media soft power, EU water/CADAP/Global Gateway, US GE Healthcare KZ).
- **Live:** host-country = earliest country mention in headline; feed shows reported match %.
- **Prod check (cycle 1):** live feed now surfaces Russia/China/Türkiye/India–CA stories instead of UNICEF bureau noise.

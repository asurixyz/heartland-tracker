import type { Actor, Category, Entity, LiveBundle } from "./types";

const CA_QUERY =
  '(Kazakhstan OR Kyrgyzstan OR Tajikistan OR Turkmenistan OR Uzbekistan OR "Central Asia")';

const COUNTRY_COORDS: Record<string, { lat: number; lng: number; host: Entity["host_country"] }> = {
  kazakhstan: { lat: 48.0, lng: 67.0, host: "Kazakhstan" },
  kyrgyzstan: { lat: 41.2, lng: 74.8, host: "Kyrgyzstan" },
  tajikistan: { lat: 38.9, lng: 71.0, host: "Tajikistan" },
  turkmenistan: { lat: 39.0, lng: 59.5, host: "Turkmenistan" },
  uzbekistan: { lat: 41.4, lng: 64.6, host: "Uzbekistan" },
  mongolia: { lat: 46.9, lng: 103.8, host: "Mongolia" },
  afghanistan: { lat: 33.9, lng: 66.0, host: "Afghanistan" },
};

type GdeltArticle = {
  url: string;
  title: string;
  seendate?: string;
  domain?: string;
  language?: string;
  socialimage?: string;
};

function detectActors(text: string): Actor[] {
  const t = text.toLowerCase();
  const actors = new Set<Actor>();
  if (/\b(china|chinese|beijing|bri|belt and road|cnpc|huawei|xi jinping)\b/.test(t)) actors.add("China");
  if (/\b(russia|russian|moscow|kremlin|gazprom|csto|rosatom|putin)\b/.test(t)) actors.add("Russia");
  if (/\b(united states|\bu\.?s\.?\b|washington|pentagon|usaid|centcom|white house)\b/.test(t))
    actors.add("US");
  if (/\b(european union|\beu\b|brussels|ebrd|eib|france|germany|italy)\b/.test(t)) actors.add("EU");
  if (/\b(turkey|türkiye|turkiye|india|iran|japan|adb|world bank|nato)\b/.test(t)) actors.add("Other");
  if (!actors.size) actors.add("Other");
  return Array.from(actors);
}

function detectCategory(text: string): Category {
  const t = text.toLowerCase();
  if (/\b(base|military|troop|drone|missile|exercise|army|air force|csto|arms)\b/.test(t))
    return "military";
  if (/\b(pipeline|railway|rail|road|port|gas|oil|uranium|power plant|infra)\b/.test(t))
    return "energy_infra";
  if (/\b(invest|loan|fdi|deal|billion|contract|acquisition)\b/.test(t)) return "capital";
  if (/\b(migrant|remittance|diaspora|labor)\b/.test(t)) return "people_flows";
  if (/\b(confucius|university|media|culture|soft power|education)\b/.test(t)) return "soft_power";
  return "diplomacy_security";
}

function detectHost(text: string): Entity["host_country"] {
  const t = text.toLowerCase();
  for (const [key, val] of Object.entries(COUNTRY_COORDS)) {
    if (t.includes(key)) return val.host;
  }
  return "Regional";
}

function coordsFor(host: Entity["host_country"]): { lat: number; lng: number } {
  const hit = Object.values(COUNTRY_COORDS).find((c) => c.host === host);
  return hit ?? { lat: 41.8, lng: 66.5 };
}

function parseSeenDate(seendate?: string): string {
  if (!seendate || seendate.length < 8) return new Date().toISOString();
  // GDELT format: YYYYMMDDHHMMSS
  const y = seendate.slice(0, 4);
  const m = seendate.slice(4, 6);
  const d = seendate.slice(6, 8);
  const hh = seendate.slice(8, 10) || "00";
  const mm = seendate.slice(10, 12) || "00";
  return `${y}-${m}-${d}T${hh}:${mm}:00.000Z`;
}

function hashId(url: string): string {
  let h = 0;
  for (let i = 0; i < url.length; i++) h = (Math.imul(31, h) + url.charCodeAt(i)) | 0;
  return `gdelt-${Math.abs(h)}`;
}

export function articlesToEntities(articles: GdeltArticle[]): Entity[] {
  const out: Entity[] = [];
  const seen = new Set<string>();
  for (const a of articles) {
    if (!a.url || !a.title) continue;
    if (seen.has(a.url)) continue;
    seen.add(a.url);
    const text = `${a.title}`;
    const host = detectHost(text);
    const { lat, lng } = coordsFor(host);
    const published = parseSeenDate(a.seendate);
    out.push({
      id: hashId(a.url),
      layer: "reported",
      category: detectCategory(text),
      actors: detectActors(text),
      host_country: host,
      title: a.title.slice(0, 220),
      summary: `Reported via GDELT from ${a.domain ?? "news source"}. Open the source for full context — Heartland Tracker does not invent details beyond the headline metadata.`,
      status: "reported",
      started_at: published.slice(0, 10),
      lat,
      lng,
      confidence: 0.55,
      tags: ["gdelt", "live"],
      sources: [
        {
          url: a.url,
          title: a.title,
          quote: a.title,
          published_at: published,
          accessed_at: new Date().toISOString(),
          publisher: a.domain,
        },
      ],
    });
  }
  return out;
}

export async function fetchGdeltLive(maxRecords = 50): Promise<LiveBundle> {
  const params = new URLSearchParams({
    query: CA_QUERY,
    mode: "ArtList",
    format: "json",
    maxrecords: String(maxRecords),
    sort: "DateDesc",
  });
  const url = `https://api.gdeltproject.org/api/v2/doc/doc?${params.toString()}`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: 900 },
  });
  if (!res.ok) {
    throw new Error(`GDELT HTTP ${res.status}`);
  }
  const text = await res.text();
  let json: { articles?: GdeltArticle[] } = {};
  try {
    json = JSON.parse(text) as { articles?: GdeltArticle[] };
  } catch {
    // GDELT sometimes returns empty/non-JSON on sparse queries
    json = { articles: [] };
  }
  const events = articlesToEntities(json.articles ?? []);
  return {
    fetched_at: new Date().toISOString(),
    source: "GDELT DOC 2.0",
    events,
  };
}

/** Curated free RSS feeds — parsed lightly without extra deps */
const RSS_FEEDS = [
  {
    id: "rferl-ca",
    url: "https://www.rferl.org/api/z-$iqq_eot-",
    // RFE region pages vary; use Google News RSS as reliable free fallback below
  },
];

export async function fetchGoogleNewsRss(): Promise<Entity[]> {
  const q = encodeURIComponent(
    "Central Asia OR Kazakhstan OR Kyrgyzstan OR Tajikistan OR Uzbekistan OR Turkmenistan",
  );
  const url = `https://news.google.com/rss/search?q=${q}&hl=en-US&gl=US&ceid=US:en`;
  try {
    const res = await fetch(url, { next: { revalidate: 900 } });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 40);
    const articles: GdeltArticle[] = items.map((m) => {
      const block = m[1];
      const title = decodeXml(
        block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ??
          block.match(/<title>(.*?)<\/title>/)?.[1] ??
          "Untitled",
      );
      const link =
        block.match(/<link>(.*?)<\/link>/)?.[1] ??
        block.match(/<guid[^>]*>(.*?)<\/guid>/)?.[1] ??
        "";
      const pub = block.match(/<pubDate>(.*?)<\/pubDate>/)?.[1];
      const seendate = pub ? toGdeltDate(new Date(pub)) : undefined;
      return {
        url: link,
        title: title.replace(/ - [^-]+$/, ""),
        seendate,
        domain: "news.google.com",
      };
    });
    return articlesToEntities(articles).map((e) => ({
      ...e,
      id: e.id.replace("gdelt-", "rss-"),
      tags: ["rss", "google-news", "live"],
      summary: `Reported via Google News RSS. Headline-only extract — verify details at the source link.`,
      sources: e.sources.map((s) => ({ ...s, publisher: s.publisher ?? "Google News" })),
    }));
  } catch {
    return [];
  }
}

function decodeXml(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function toGdeltDate(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}${p(d.getUTCMonth() + 1)}${p(d.getUTCDate())}${p(d.getUTCHours())}${p(d.getUTCMinutes())}${p(d.getUTCSeconds())}`;
}

export async function fetchLiveBundle(): Promise<LiveBundle> {
  const [gdelt, rss] = await Promise.allSettled([fetchGdeltLive(40), fetchGoogleNewsRss()]);
  const events: Entity[] = [];
  const seen = new Set<string>();
  const push = (list: Entity[]) => {
    for (const e of list) {
      const key = e.sources[0]?.url ?? e.id;
      if (seen.has(key)) continue;
      seen.add(key);
      events.push(e);
    }
  };
  if (gdelt.status === "fulfilled") push(gdelt.value.events);
  if (rss.status === "fulfilled") push(rss.value);
  return {
    fetched_at: new Date().toISOString(),
    source: "GDELT + Google News RSS",
    events,
  };
}

// silence unused in case tree-shaking
void RSS_FEEDS;

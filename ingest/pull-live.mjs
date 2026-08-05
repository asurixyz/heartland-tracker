#!/usr/bin/env node
/**
 * Free-tier live pull: GDELT DOC API + Google News RSS.
 * Writes data/live/events.json for optional static fallback / Actions commit.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "..", "data", "live", "events.json");

const CA_QUERY =
  '(Kazakhstan OR Kyrgyzstan OR Tajikistan OR Turkmenistan OR Uzbekistan OR "Central Asia")';

async function fetchGdelt() {
  const params = new URLSearchParams({
    query: CA_QUERY,
    mode: "ArtList",
    format: "json",
    maxrecords: "40",
    sort: "DateDesc",
  });
  const url = `https://api.gdeltproject.org/api/v2/doc/doc?${params}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GDELT ${res.status}`);
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { articles: [] };
  }
}

async function fetchRss() {
  const q = encodeURIComponent(
    "Central Asia OR Kazakhstan OR Kyrgyzstan OR Tajikistan OR Uzbekistan OR Turkmenistan",
  );
  const url = `https://news.google.com/rss/search?q=${q}&hl=en-US&gl=US&ceid=US:en`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const xml = await res.text();
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 40).map((m) => {
    const block = m[1];
    const title = (
      block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ||
      block.match(/<title>(.*?)<\/title>/)?.[1] ||
      "Untitled"
    )
      .replace(/&amp;/g, "&")
      .replace(/ - [^-]+$/, "");
    const link =
      block.match(/<link>(.*?)<\/link>/)?.[1] ||
      block.match(/<guid[^>]*>(.*?)<\/guid>/)?.[1] ||
      "";
    return { title, url: link, domain: "news.google.com" };
  });
}

function toEvent(article, prefix) {
  return {
    id: `${prefix}-${Buffer.from(article.url).toString("base64url").slice(0, 16)}`,
    layer: "reported",
    title: article.title,
    url: article.url,
    domain: article.domain || null,
    pulled_at: new Date().toISOString(),
  };
}

const gdelt = await fetchGdelt().catch((e) => {
  console.error("GDELT failed", e.message);
  return { articles: [] };
});
const rss = await fetchRss().catch((e) => {
  console.error("RSS failed", e.message);
  return [];
});

const events = [
  ...(gdelt.articles || []).map((a) => toEvent(a, "gdelt")),
  ...rss.map((a) => toEvent(a, "rss")),
];

mkdirSync(dirname(outPath), { recursive: true });
const bundle = {
  fetched_at: new Date().toISOString(),
  source: "GDELT + Google News RSS",
  count: events.length,
  events,
};
writeFileSync(outPath, JSON.stringify(bundle, null, 2));
console.log(`Wrote ${events.length} events → ${outPath}`);

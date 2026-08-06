"use client";

import { filterEntities, getVerifiedEntities } from "@/lib/data";
import type { Entity, Filters, LiveBundle } from "@/lib/types";
import {
  DEFAULT_FILTERS,
  filtersFromSearch,
  readSelectedId,
  searchFromFilters,
} from "@/lib/url-state";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Console } from "./Console";
import { ExploreStrip } from "./ExploreStrip";
import { HeartlandMap } from "./HeartlandMap";

function fmtBn(n?: number | null): string {
  if (n == null) return "—";
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}bn`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(0)}m`;
  return `$${n.toLocaleString()}`;
}

export function Dashboard() {
  const verified = useMemo(() => getVerifiedEntities(), []);
  const [live, setLive] = useState<Entity[]>([]);
  const [liveStatus, setLiveStatus] = useState("Live pull idle");
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoverCountry, setHoverCountry] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search);
    setFilters(filtersFromSearch(p));
    setSelectedId(readSelectedId(p));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const next = searchFromFilters(filters, selectedId);
    window.history.replaceState(null, "", `${window.location.pathname}${next}`);
  }, [filters, selectedId, hydrated]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const pullLive = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/live", { cache: "no-store" });
      const data = (await res.json()) as LiveBundle & { error?: string };
      setLive(data.events ?? []);
      setLiveStatus(
        data.error
          ? `Live degraded · ${data.error}`
          : `${data.source} · ${data.events?.length ?? 0} items · ${new Date(
              data.fetched_at,
            ).toLocaleString()}`,
      );
    } catch {
      setLiveStatus("Live pull failed — verified ledger still available");
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void pullLive();
    const t = setInterval(() => void pullLive(), 15 * 60 * 1000);
    return () => clearInterval(t);
  }, [pullLive]);

  const all = useMemo(() => {
    const map = new Map<string, Entity>();
    for (const e of verified) map.set(e.id, e);
    for (const e of live) if (!map.has(e.id)) map.set(e.id, e);
    return Array.from(map.values());
  }, [verified, live]);

  const filtered = useMemo(() => {
    const list = filterEntities(all, filters);
    return [...list].sort((a, b) => {
      if (a.layer !== b.layer) return a.layer === "reported" ? -1 : 1;
      const conf = (b.confidence ?? 0) - (a.confidence ?? 0);
      if (conf !== 0) return conf;
      return (b.started_at ?? "").localeCompare(a.started_at ?? "");
    });
  }, [all, filters]);

  const selected = filtered.find((e) => e.id === selectedId) ?? all.find((e) => e.id === selectedId) ?? null;

  const stats = useMemo(() => {
    const verifiedList = filtered.filter((e) => e.layer === "verified");
    const capital = verifiedList.filter((e) => e.category === "capital" || e.category === "energy_infra");
    const capitalSum = capital.reduce((s, e) => s + (e.amount_usd ?? 0), 0);
    const byActor = new Map<string, number>();
    for (const e of verifiedList) {
      for (const a of e.actors) byActor.set(a, (byActor.get(a) ?? 0) + 1);
    }
    const lead = Array.from(byActor.entries()).sort((a, b) => b[1] - a[1])[0];
    return {
      total: filtered.length,
      verified: verifiedList.length,
      reported: filtered.length - verifiedList.length,
      capitalSum,
      lead,
    };
  }, [filtered]);

  return (
    <main>
      <ExploreStrip
        filters={filters}
        onChange={setFilters}
        onReset={() => {
          setFilters(DEFAULT_FILTERS);
          setSelectedId(null);
        }}
        liveStatus={liveStatus}
        onRefresh={() => void pullLive()}
        refreshing={refreshing}
      />

      <section className="border-b border-[var(--line)]">
        <div className="mx-auto grid max-w-7xl gap-0 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col justify-center py-10 pr-0 lg:py-16 lg:pr-10">
            <p className="eyebrow rise">The heartland · Central Asia</p>
            <h1 className="display rise rise-delay-1 mt-3 text-4xl sm:text-5xl lg:text-6xl">
              Who is building
              <br />
              what, where,
              <br />
              and for whom.
            </h1>
            <p className="rise rise-delay-2 mt-5 max-w-md text-[15px] leading-relaxed text-[var(--muted)]">
              Kazakhstan, Kyrgyzstan, Tajikistan, Turkmenistan, Uzbekistan.
              {" "}Bases, pipelines, loans, deals, drills — all sourced, none invented.
              {" "}The map is a live intelligence surface: pin colours mark actors,
              solid rings mark verified assets, dashed rings mark reported activity.
              {" "}
              {hoverCountry ? (
                <span className="text-[var(--ink)]">Looking at {hoverCountry}.</span>
              ) : selected ? (
                <span className="text-[var(--ink)]">Reading “{selected.title}”.</span>
              ) : (
                <span>Hover a country, click a pin.</span>
              )}
            </p>

            <div className="rise rise-delay-3 mt-8 grid grid-cols-3 gap-6 border-t border-[var(--line)] pt-6">
              <div>
                <div className="eyebrow !text-[10px]">In view</div>
                <div className="display mt-1 text-3xl">{stats.total}</div>
                <div className="mt-1 font-[family-name:var(--font-mono)] text-[10px] text-[var(--muted)]">
                  sourced items
                </div>
              </div>
              <div>
                <div className="eyebrow !text-[10px]">Verified</div>
                <div className="display mt-1 text-3xl">{stats.verified}</div>
                <div className="mt-1 font-[family-name:var(--font-mono)] text-[10px] text-[var(--muted)]">
                  ledger assets
                </div>
              </div>
              <div>
                <div className="eyebrow !text-[10px]">Named capital</div>
                <div className="display mt-1 text-3xl">
                  {stats.capitalSum > 0 ? fmtBn(stats.capitalSum) : "—"}
                </div>
                <div className="mt-1 font-[family-name:var(--font-mono)] text-[10px] text-[var(--muted)]">
                  {stats.lead ? `lead actor · ${stats.lead[0]}` : "no lead"}
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[420px] border-l border-[var(--line)] bg-[var(--paper-deep)] lg:min-h-[600px]">
            <HeartlandMap
              entities={filtered}
              selectedId={selectedId}
              onSelect={setSelectedId}
              activeCountry={hoverCountry}
              onHoverCountry={setHoverCountry}
            />
          </div>
        </div>
      </section>

      <Console entities={filtered} selected={selected} onSelect={setSelectedId} />

      <footer className="border-t border-[var(--line)] bg-[var(--paper-deep)]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">Where the pins come from</p>
              <p className="mt-3 max-w-md text-[13px] leading-relaxed text-[var(--muted)]">
                Verified assets are hand-cited from datasets (AidData, AEI CGIT, SIPRI) and
                official pages (State Department, MFA, EBRD, ADB, Wikipedia). Reported
                activity is auto-ingested from GDELT and Google News RSS, filtered for
                Central Asia relevance, and never promoted to verified without a real
                source. If a number isn’t published, you’ll see a dash instead of a guess.
              </p>
            </div>
            <div>
              <p className="eyebrow mb-3">Sources & datasets</p>
              <div className="flex flex-wrap gap-1.5">
                {(
                  [
                    ["AidData · China finance", "https://www.aiddata.org/china"],
                    ["AEI China Global Investment Tracker", "https://www.aei.org/china-global-investment-tracker/"],
                    ["SIPRI Arms Transfers", "https://www.sipri.org/databases/armstransfers"],
                    ["GDELT DOC 2.0", "https://www.gdeltproject.org/"],
                    ["EBRD", "https://www.ebrd.com/"],
                    ["ADB Central & West Asia", "https://www.adb.org/where-we-work/central-west-asia"],
                    ["EEAS on Central Asia", "https://www.eeas.europa.eu/eeas/central-asia_en"],
                    ["U.S. C5+1", "https://www.state.gov/c51/"],
                    ["RFE/RL Central Asia", "https://www.rferl.org/region/central-asia/p:6"],
                  ] as const
                ).map(([label, url]) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-sm border border-[var(--line)] bg-[var(--panel)] px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[11px] text-[var(--ink-soft)] transition hover:border-[var(--ink)]"
                  >
                    {label}
                  </a>
                ))}
              </div>
              <p className="mt-6 font-[family-name:var(--font-mono)] text-[10px] text-[var(--muted)]">
                {liveStatus}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

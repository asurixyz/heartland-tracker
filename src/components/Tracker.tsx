"use client";

import { filterEntities, getVerifiedEntities, sortEntities } from "@/lib/data";
import { YEAR_MAX, YEAR_MIN } from "@/lib/constants";
import type { Entity, Filters, LiveBundle } from "@/lib/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DetailDrawer } from "./DetailDrawer";
import { FeedPanel } from "./FeedPanel";
import { FiltersPanel } from "./FiltersPanel";
import { HeartlandMap } from "./HeartlandMap";

const DEFAULT_FILTERS: Filters = {
  actors: [],
  categories: [],
  layers: [],
  countries: [],
  query: "",
  yearFrom: YEAR_MIN,
  yearTo: YEAR_MAX,
};

export function Tracker() {
  const verified = useMemo(() => getVerifiedEntities(), []);
  const [live, setLive] = useState<Entity[]>([]);
  const [liveStatus, setLiveStatus] = useState("Live pull idle");
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
    for (const e of live) {
      if (!map.has(e.id)) map.set(e.id, e);
    }
    return Array.from(map.values());
  }, [verified, live]);

  const filtered = useMemo(
    () => sortEntities(filterEntities(all, filters)),
    [all, filters],
  );

  const selected = filtered.find((e) => e.id === selectedId) ?? all.find((e) => e.id === selectedId) ?? null;

  const counts = useMemo(
    () => ({
      shown: filtered.length,
      verified: filtered.filter((e) => e.layer === "verified").length,
      reported: filtered.filter((e) => e.layer === "reported").length,
    }),
    [filtered],
  );

  return (
    <div className="shell">
      <HeartlandMap
        entities={filtered}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <FiltersPanel filters={filters} onChange={setFilters} counts={counts} />
      <FeedPanel
        entities={filtered.slice(0, 80)}
        selectedId={selectedId}
        onSelect={setSelectedId}
        liveStatus={liveStatus}
        refreshing={refreshing}
        onRefresh={() => void pullLive()}
      />
      <DetailDrawer entity={selected} onClose={() => setSelectedId(null)} />
      <div className="map-legend">
        <span className="dot verified" /> Verified
        <span className="dot reported" /> Reported
        <span className="hint">Core five lit · neighbors in shadow</span>
      </div>
    </div>
  );
}

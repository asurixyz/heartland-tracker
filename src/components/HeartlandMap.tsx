"use client";

import { ACTOR_COLOR } from "@/lib/constants";
import type { Entity } from "@/lib/types";
import { geoMercator, geoPath } from "d3-geo";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { useEffect, useMemo, useRef, useState } from "react";

type CountryProps = { name: string; role: "core" | "shadow" | "other" };
type CountryFeature = Feature<Geometry, CountryProps>;

type Props = {
  entities: Entity[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  activeCountry: string | null;
  onHoverCountry?: (name: string | null) => void;
};

const W = 900;
const H = 620;

export function HeartlandMap({
  entities,
  selectedId,
  onSelect,
  activeCountry,
  onHoverCountry,
}: Props) {
  const [geo, setGeo] = useState<CountryFeature[] | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [tip, setTip] = useState<{ x: number; y: number; e: Entity } | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/geo/heartland.geojson")
      .then((r) => r.json())
      .then((d: FeatureCollection) => setGeo(d.features as CountryFeature[]))
      .catch(() => setGeo([]));
  }, []);

  const projection = useMemo(() => {
    if (!geo || !geo.length) return null;
    const coreFC: FeatureCollection = {
      type: "FeatureCollection",
      features: geo.filter((f) => f.properties.role === "core"),
    };
    return geoMercator().fitExtent(
      [
        [40, 40],
        [W - 40, H - 40],
      ],
      coreFC,
    );
  }, [geo]);

  const path = useMemo(() => (projection ? geoPath(projection) : null), [projection]);

  const placedEntities = useMemo(() => {
    if (!projection) return [] as Array<Entity & { x: number; y: number }>;
    return entities
      .filter((e) => e.lat != null && e.lng != null)
      .map((e) => {
        const p = projection([e.lng as number, e.lat as number]) ?? [-9999, -9999];
        return { ...e, x: p[0], y: p[1] };
      })
      .filter((e) => e.x > -50 && e.x < W + 50 && e.y > -50 && e.y < H + 50);
  }, [projection, entities]);

  const countryEntityCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const e of entities) m.set(e.host_country, (m.get(e.host_country) ?? 0) + 1);
    return m;
  }, [entities]);

  const handleMove = (e: React.MouseEvent, entity: Entity & { x: number; y: number }) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTip({ x: e.clientX - rect.left, y: e.clientY - rect.top, e: entity });
  };

  const graticules = useMemo(() => {
    const lines: { d: string }[] = [];
    if (!projection) return lines;
    for (let lat = 30; lat <= 55; lat += 5) {
      const pts: [number, number][] = [];
      for (let lng = 50; lng <= 110; lng += 2) {
        const p = projection([lng, lat]);
        if (p) pts.push(p as [number, number]);
      }
      if (pts.length) lines.push({ d: "M" + pts.map((p) => p.join(",")).join(" L") });
    }
    for (let lng = 50; lng <= 110; lng += 5) {
      const pts: [number, number][] = [];
      for (let lat = 30; lat <= 55; lat += 2) {
        const p = projection([lng, lat]);
        if (p) pts.push(p as [number, number]);
      }
      if (pts.length) lines.push({ d: "M" + pts.map((p) => p.join(",")).join(" L") });
    }
    return lines;
  }, [projection]);

  return (
    <div ref={wrapRef} className="relative h-full w-full select-none">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-full w-full"
        role="img"
        aria-label="Map of Central Asia showing sourced great-power involvement"
      >
        <defs>
          <radialGradient id="glow-core" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="rgba(240,230,214,0.06)" />
            <stop offset="100%" stopColor="rgba(240,230,214,0)" />
          </radialGradient>
          <filter id="soft-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        <rect x={0} y={0} width={W} height={H} fill="var(--paper)" />
        <rect x={0} y={0} width={W} height={H} fill="url(#glow-core)" />

        <g stroke="rgba(236,233,226,0.05)" strokeWidth={0.5} fill="none">
          {graticules.map((g, i) => (
            <path key={i} d={g.d} />
          ))}
        </g>

        {geo && path ? (
          <g>
            {geo
              .filter((f) => f.properties.role === "shadow")
              .map((f) => (
                <path
                  key={f.properties.name}
                  d={path(f) ?? undefined}
                  fill="var(--map-shadow)"
                  stroke="rgba(236,233,226,0.09)"
                  strokeWidth={0.6}
                  strokeLinejoin="round"
                />
              ))}
            {geo
              .filter((f) => f.properties.role === "core")
              .map((f) => {
                const name = f.properties.name;
                const count = countryEntityCounts.get(name) ?? 0;
                const density = Math.min(1, count / 20);
                const fill = `rgba(240, 230, 214, ${0.04 + density * 0.08})`;
                const isActive = activeCountry === name || hover === name;
                return (
                  <g key={name}>
                    <path
                      d={path(f) ?? undefined}
                      fill={fill}
                      stroke={isActive ? "var(--map-accent)" : "rgba(240,230,214,0.35)"}
                      strokeWidth={isActive ? 1.8 : 0.9}
                      strokeLinejoin="round"
                      style={{
                        transition: "stroke 200ms ease, fill 300ms ease",
                        cursor: "default",
                        filter: isActive ? "drop-shadow(0 0 12px var(--map-glow))" : undefined,
                      }}
                      onMouseEnter={() => {
                        setHover(name);
                        onHoverCountry?.(name);
                      }}
                      onMouseLeave={() => {
                        setHover(null);
                        onHoverCountry?.(null);
                      }}
                    >
                      <title>{name}</title>
                    </path>
                  </g>
                );
              })}
            {geo
              .filter((f) => f.properties.role === "core")
              .map((f) => {
                const centroid = path.centroid(f);
                return (
                  <text
                    key={`label-${f.properties.name}`}
                    x={centroid[0]}
                    y={centroid[1]}
                    textAnchor="middle"
                    fontSize={11}
                    fontFamily="var(--font-mono)"
                    letterSpacing="0.16em"
                    fill="var(--map-label)"
                    style={{ pointerEvents: "none", textTransform: "uppercase" }}
                  >
                    {f.properties.name}
                  </text>
                );
              })}
          </g>
        ) : (
          <g>
            <text
              x={W / 2}
              y={H / 2}
              textAnchor="middle"
              fill="var(--muted)"
              fontFamily="var(--font-mono)"
              fontSize={12}
            >
              Loading atlas…
            </text>
          </g>
        )}

        <g>
          {placedEntities.map((e) => {
            const isSel = e.id === selectedId;
            const primary = e.actors[0] ?? "Other";
            const color = ACTOR_COLOR[primary];
            const r = e.layer === "verified" ? 4.5 : 3.2;
            const boost = isSel ? 1.6 : 1;
            return (
              <g
                key={e.id}
                transform={`translate(${e.x}, ${e.y})`}
                style={{ cursor: "pointer" }}
                onMouseEnter={(evt) => handleMove(evt, e)}
                onMouseMove={(evt) => handleMove(evt, e)}
                onMouseLeave={() => setTip(null)}
                onClick={() => onSelect(e.id)}
              >
                {isSel && (
                  <circle
                    r={r * 2.6}
                    fill="none"
                    stroke={color}
                    strokeOpacity={0.9}
                    strokeWidth={1}
                    className="pulse-ring"
                  />
                )}
                <circle
                  r={r * boost * 2.2}
                  fill={color}
                  opacity={0.14}
                  filter="url(#soft-glow)"
                />
                <circle
                  r={r * boost}
                  fill={color}
                  stroke={e.layer === "reported" ? "var(--paper)" : "rgba(14,14,12,0.85)"}
                  strokeWidth={e.layer === "reported" ? 1.1 : 0.6}
                  strokeDasharray={e.layer === "reported" ? "1.6 1.4" : undefined}
                  opacity={0.95}
                />
              </g>
            );
          })}
        </g>
      </svg>

      {tip && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-sm border border-[var(--line-strong)] bg-[var(--panel)]/95 px-3 py-2 shadow-lg backdrop-blur"
          style={{ left: tip.x, top: tip.y - 8, maxWidth: 300 }}
        >
          <div className="eyebrow !text-[10px]">
            {tip.e.layer === "verified" ? "Verified" : "Reported"} · {tip.e.host_country}
          </div>
          <div className="mt-1 font-[family-name:var(--font-display)] text-[14px] leading-snug text-[var(--ink)]">
            {tip.e.title}
          </div>
          <div className="mt-1 font-[family-name:var(--font-mono)] text-[10px] text-[var(--muted)]">
            {tip.e.actors.join(" · ")}
          </div>
        </div>
      )}
    </div>
  );
}

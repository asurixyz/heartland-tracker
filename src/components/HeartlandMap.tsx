"use client";

import { ACTOR_COLOR, ACTORS } from "@/lib/constants";
import type { Entity } from "@/lib/types";
import { geoMercator, geoPath } from "d3-geo";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
const MIN_K = 1;
const MAX_K = 8;

type View = { k: number; tx: number; ty: number };
const RESET_VIEW: View = { k: 1, tx: 0, ty: 0 };

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
  const [view, setView] = useState<View>(RESET_VIEW);
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragRef = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);

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

  const clampView = (v: View): View => {
    const k = Math.max(MIN_K, Math.min(MAX_K, v.k));
    const maxTx = (W * (k - 1)) / 2;
    const maxTy = (H * (k - 1)) / 2;
    return {
      k,
      tx: Math.max(-maxTx, Math.min(maxTx, v.tx)),
      ty: Math.max(-maxTy, Math.min(maxTy, v.ty)),
    };
  };

  const zoomAt = useCallback(
    (svgX: number, svgY: number, delta: number) => {
      setView((v) => {
        const factor = Math.exp(-delta * 0.0015);
        const newK = Math.max(MIN_K, Math.min(MAX_K, v.k * factor));
        // Keep pointer position fixed as anchor
        const kRatio = newK / v.k;
        const tx = svgX - (svgX - v.tx) * kRatio;
        const ty = svgY - (svgY - v.ty) * kRatio;
        return clampView({ k: newK, tx, ty });
      });
    },
    [],
  );

  const zoomBy = (factor: number) => {
    setView((v) => clampView({ k: v.k * factor, tx: v.tx * factor, ty: v.ty * factor }));
  };

  // Convert client coordinates to SVG viewBox coordinates
  const clientToSvg = (clientX: number, clientY: number): [number, number] => {
    const svg = svgRef.current;
    if (!svg) return [0, 0];
    const rect = svg.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * W;
    const y = ((clientY - rect.top) / rect.height) * H;
    return [x, y];
  };

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const [sx, sy] = clientToSvg(e.clientX, e.clientY);
      zoomAt(sx, sy, e.deltaY);
    };
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  const handleMove = (e: React.MouseEvent, entity: Entity & { x: number; y: number }) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTip({ x: e.clientX - rect.left, y: e.clientY - rect.top, e: entity });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    dragRef.current = { x: e.clientX, y: e.clientY, tx: view.tx, ty: view.ty };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const d = dragRef.current;
    if (!d) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    const dx = (e.clientX - d.x) * scaleX;
    const dy = (e.clientY - d.y) * scaleY;
    setView((v) => clampView({ k: v.k, tx: d.tx + dx, ty: d.ty + dy }));
  };

  const onMouseUp = () => {
    dragRef.current = null;
  };

  const zoomed = view.k > 1.01;

  return (
    <div
      ref={wrapRef}
      className="relative h-full w-full select-none"
      onMouseLeave={() => {
        setTip(null);
        dragRef.current = null;
      }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="h-full w-full"
        role="img"
        aria-label="Map of Central Asia showing sourced great-power involvement"
        style={{ cursor: dragRef.current ? "grabbing" : zoomed ? "grab" : "default" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onDoubleClick={() => setView(RESET_VIEW)}
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

        <g transform={`translate(${view.tx}, ${view.ty}) scale(${view.k})`}>
          <g stroke="rgba(236,233,226,0.05)" strokeWidth={0.5 / view.k} fill="none">
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
                    strokeWidth={0.6 / view.k}
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
                    <path
                      key={name}
                      d={path(f) ?? undefined}
                      fill={fill}
                      stroke={isActive ? "var(--map-accent)" : "rgba(240,230,214,0.35)"}
                      strokeWidth={(isActive ? 1.8 : 0.9) / view.k}
                      strokeLinejoin="round"
                      style={{
                        transition: "stroke 200ms ease, fill 300ms ease",
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
                      fontSize={11 / Math.max(1, view.k * 0.7)}
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
              const baseR = e.layer === "verified" ? 4.5 : 3.2;
              const r = baseR / Math.max(1, view.k * 0.55);
              const boost = isSel ? 1.6 : 1;
              return (
                <g
                  key={e.id}
                  transform={`translate(${e.x}, ${e.y})`}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={(evt) => handleMove(evt, e)}
                  onMouseMove={(evt) => handleMove(evt, e)}
                  onMouseLeave={() => setTip(null)}
                  onClick={(evt) => {
                    evt.stopPropagation();
                    onSelect(e.id);
                  }}
                >
                  {isSel && (
                    <circle
                      r={r * 2.6}
                      fill="none"
                      stroke={color}
                      strokeOpacity={0.9}
                      strokeWidth={1 / view.k}
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
                    strokeWidth={(e.layer === "reported" ? 1.1 : 0.6) / view.k}
                    strokeDasharray={e.layer === "reported" ? `${1.6 / view.k} ${1.4 / view.k}` : undefined}
                    opacity={0.95}
                  />
                </g>
              );
            })}
          </g>
        </g>
      </svg>

      {/* Zoom controls */}
      <div className="absolute right-3 top-3 flex flex-col gap-1 rounded-sm border border-[var(--line)] bg-[var(--panel)]/85 p-1 backdrop-blur">
        <button
          type="button"
          onClick={() => zoomBy(1.4)}
          className="h-7 w-7 font-[family-name:var(--font-mono)] text-[14px] text-[var(--ink)] transition hover:bg-[var(--panel)]"
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => zoomBy(1 / 1.4)}
          className="h-7 w-7 font-[family-name:var(--font-mono)] text-[14px] text-[var(--ink)] transition hover:bg-[var(--panel)]"
          aria-label="Zoom out"
        >
          −
        </button>
        <button
          type="button"
          onClick={() => setView(RESET_VIEW)}
          className="h-7 w-7 font-[family-name:var(--font-mono)] text-[9px] tracking-widest text-[var(--muted)] transition hover:text-[var(--ink)]"
          aria-label="Reset zoom"
          title="Reset (double-click map)"
        >
          RESET
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex flex-col gap-2 rounded-sm border border-[var(--line)] bg-[var(--panel)]/88 px-3 py-3 backdrop-blur">
        <div className="eyebrow !text-[9px]">Legend</div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14">
              <circle cx="7" cy="7" r="4" fill="var(--map-accent)" stroke="rgba(14,14,12,0.85)" strokeWidth="0.6" />
            </svg>
            <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--ink-soft)]">
              Verified asset
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14">
              <circle
                cx="7"
                cy="7"
                r="3.2"
                fill="var(--actor-russia)"
                stroke="var(--paper)"
                strokeWidth="1.1"
                strokeDasharray="1.6 1.4"
              />
            </svg>
            <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--ink-soft)]">
              Reported activity
            </span>
          </div>
        </div>

        <div className="mt-1 border-t border-[var(--line)] pt-2">
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            {ACTORS.map((a) => (
              <div key={a} className="flex items-center gap-1.5">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: ACTOR_COLOR[a] }}
                />
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--ink-soft)]">
                  {a}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-1 border-t border-[var(--line)] pt-2 font-[family-name:var(--font-mono)] text-[9px] text-[var(--muted)]">
          scroll · drag · double-click resets
        </div>
      </div>

      {tip && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-sm border border-[var(--line-strong)] bg-[var(--panel)]/95 px-3 py-2 shadow-lg backdrop-blur"
          style={{ left: tip.x, top: tip.y - 8, maxWidth: 300 }}
        >
          <div className="eyebrow !text-[10px]">
            {tip.e.layer === "verified" ? "Verified" : "Reported"} · {tip.e.host_country}
          </div>
          <div className="mt-1 font-[family-name:var(--font-display)] text-[15px] leading-snug text-[var(--ink)]">
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

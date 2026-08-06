"use client";

import { ACTOR_COLOR, ACTORS, CATEGORIES, CATEGORY_LABEL, LAYERS, LAYER_LABEL } from "@/lib/constants";
import type { Actor, Category, Filters, Layer } from "@/lib/types";

type Props = {
  filters: Filters;
  onChange: (f: Filters) => void;
  onReset: () => void;
  liveStatus: string;
  onRefresh: () => void;
  refreshing: boolean;
};

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((x) => x !== value) : [...list, value];
}

export function ExploreStrip({ filters, onChange, onReset, liveStatus, onRefresh, refreshing }: Props) {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[var(--paper)]/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-5 py-3 sm:px-8">
        <div className="mr-2 flex items-baseline gap-2">
          <span className="font-[family-name:var(--font-display)] text-[18px] tracking-tight text-[var(--ink)]">
            Heartland
          </span>
          <span className="eyebrow !text-[10px]">Tracker</span>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {LAYERS.map((l) => {
            const on = filters.layers.includes(l);
            return (
              <button
                key={l}
                type="button"
                onClick={() => onChange({ ...filters, layers: toggle(filters.layers, l as Layer) })}
                className={`rounded-sm border px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[11px] transition ${
                  on
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                    : "border-[var(--line)] text-[var(--ink-soft)] hover:border-[var(--ink)]"
                }`}
              >
                {LAYER_LABEL[l]}
              </button>
            );
          })}
        </nav>

        <div className="flex flex-wrap items-center gap-1">
          {ACTORS.map((a) => {
            const on = filters.actors.includes(a);
            return (
              <button
                key={a}
                type="button"
                onClick={() => onChange({ ...filters, actors: toggle(filters.actors, a as Actor) })}
                className="rounded-sm border px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[11px] transition"
                style={{
                  borderColor: on ? ACTOR_COLOR[a as Actor] : "var(--line)",
                  color: on ? ACTOR_COLOR[a as Actor] : "var(--ink-soft)",
                  background: on ? `${ACTOR_COLOR[a as Actor]}14` : "transparent",
                }}
              >
                {a}
              </button>
            );
          })}
        </div>

        <div className="hidden flex-wrap items-center gap-1 lg:flex">
          {CATEGORIES.map((c) => {
            const on = filters.categories.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() =>
                  onChange({ ...filters, categories: toggle(filters.categories, c as Category) })
                }
                className={`rounded-sm border px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[11px] transition ${
                  on
                    ? "border-[var(--ink)] text-[var(--ink)]"
                    : "border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--ink)]"
                }`}
              >
                {CATEGORY_LABEL[c]}
              </button>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <input
            value={filters.query}
            onChange={(e) => onChange({ ...filters, query: e.target.value })}
            placeholder="Search…"
            className="w-40 rounded-sm border border-[var(--line)] bg-transparent px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[11px] text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-[var(--ink)] focus:outline-none"
          />
          <button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            title={liveStatus}
            className="rounded-sm border border-[var(--line)] px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[11px] text-[var(--ink-soft)] transition hover:border-[var(--ink)] disabled:opacity-50"
          >
            {refreshing ? "Pulling…" : "Refresh live"}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--muted)] hover:text-[var(--ink)]"
          >
            Reset
          </button>
        </div>
      </div>
    </header>
  );
}

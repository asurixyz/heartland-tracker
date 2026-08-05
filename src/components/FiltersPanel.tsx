"use client";

import {
  ACTOR_COLOR,
  ACTORS,
  CATEGORIES,
  CATEGORY_LABEL,
  CORE_COUNTRIES,
  LAYERS,
  LAYER_LABEL,
  YEAR_MAX,
  YEAR_MIN,
} from "@/lib/constants";
import type { Actor, Category, Filters, HostCountry, Layer } from "@/lib/types";

type Props = {
  filters: Filters;
  onChange: (f: Filters) => void;
  counts: { verified: number; reported: number; shown: number };
};

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((x) => x !== value) : [...list, value];
}

export function FiltersPanel({ filters, onChange, counts }: Props) {
  return (
    <aside className="panel panel-left">
      <header className="brand">
        <div className="brand-mark">HT</div>
        <div>
          <h1>Heartland Tracker</h1>
          <p>Central Asia · power & capital</p>
        </div>
      </header>

      <div className="stat-row">
        <div>
          <span className="stat-n">{counts.shown}</span>
          <span className="stat-l">shown</span>
        </div>
        <div>
          <span className="stat-n">{counts.verified}</span>
          <span className="stat-l">verified</span>
        </div>
        <div>
          <span className="stat-n">{counts.reported}</span>
          <span className="stat-l">reported</span>
        </div>
      </div>

      <label className="field">
        <span>Search</span>
        <input
          value={filters.query}
          onChange={(e) => onChange({ ...filters, query: e.target.value })}
          placeholder="pipeline, base, remittance…"
        />
      </label>

      <section className="filter-block">
        <h2>Layer</h2>
        <div className="chip-row">
          {LAYERS.map((l) => (
            <button
              key={l}
              type="button"
              className={`chip ${filters.layers.includes(l) ? "on" : ""}`}
              onClick={() => onChange({ ...filters, layers: toggle(filters.layers, l as Layer) })}
            >
              {LAYER_LABEL[l]}
            </button>
          ))}
        </div>
      </section>

      <section className="filter-block">
        <h2>Actor</h2>
        <div className="chip-row">
          {ACTORS.map((a) => (
            <button
              key={a}
              type="button"
              className={`chip actor ${filters.actors.includes(a) ? "on" : ""}`}
              style={{ ["--actor" as string]: ACTOR_COLOR[a as Actor] }}
              onClick={() => onChange({ ...filters, actors: toggle(filters.actors, a as Actor) })}
            >
              {a}
            </button>
          ))}
        </div>
      </section>

      <section className="filter-block">
        <h2>Category</h2>
        <div className="chip-row">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              className={`chip ${filters.categories.includes(c) ? "on" : ""}`}
              onClick={() =>
                onChange({ ...filters, categories: toggle(filters.categories, c as Category) })
              }
            >
              {CATEGORY_LABEL[c]}
            </button>
          ))}
        </div>
      </section>

      <section className="filter-block">
        <h2>Country</h2>
        <div className="chip-row">
          {CORE_COUNTRIES.map((c) => (
            <button
              key={c}
              type="button"
              className={`chip ${filters.countries.includes(c) ? "on" : ""}`}
              onClick={() =>
                onChange({
                  ...filters,
                  countries: toggle(filters.countries, c as HostCountry),
                })
              }
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="filter-block">
        <h2>
          Years · {filters.yearFrom}–{filters.yearTo}
        </h2>
        <div className="year-row">
          <input
            type="range"
            min={YEAR_MIN}
            max={YEAR_MAX}
            value={filters.yearFrom}
            onChange={(e) =>
              onChange({
                ...filters,
                yearFrom: Math.min(Number(e.target.value), filters.yearTo),
              })
            }
          />
          <input
            type="range"
            min={YEAR_MIN}
            max={YEAR_MAX}
            value={filters.yearTo}
            onChange={(e) =>
              onChange({
                ...filters,
                yearTo: Math.max(Number(e.target.value), filters.yearFrom),
              })
            }
          />
        </div>
      </section>

      <p className="trust-note">
        Every pin requires a source URL and quote. Reported items are headline-derived and never
        promoted to Verified without multi-source or dataset backing.
      </p>
    </aside>
  );
}

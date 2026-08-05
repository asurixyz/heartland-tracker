import { YEAR_MAX, YEAR_MIN } from "./constants";
import type { Actor, Category, Filters, HostCountry, Layer } from "./types";

const DEFAULT: Filters = {
  actors: [],
  categories: [],
  layers: [],
  countries: [],
  query: "",
  yearFrom: YEAR_MIN,
  yearTo: YEAR_MAX,
};

function split<T extends string>(v: string | null, allowed: readonly T[]): T[] {
  if (!v) return [];
  return v
    .split(",")
    .map((s) => s.trim())
    .filter((s): s is T => (allowed as readonly string[]).includes(s));
}

export function filtersFromSearch(params: URLSearchParams): Filters {
  const yearFrom = Number(params.get("from") ?? YEAR_MIN);
  const yearTo = Number(params.get("to") ?? YEAR_MAX);
  return {
    actors: split(params.get("actors"), ["US", "China", "Russia", "EU", "Other"] as Actor[]),
    categories: split(params.get("cats"), [
      "military",
      "capital",
      "energy_infra",
      "diplomacy_security",
      "soft_power",
      "people_flows",
    ] as Category[]),
    layers: split(params.get("layers"), ["verified", "reported"] as Layer[]),
    countries: split(params.get("countries"), [
      "Kazakhstan",
      "Kyrgyzstan",
      "Tajikistan",
      "Turkmenistan",
      "Uzbekistan",
      "Regional",
      "Mongolia",
      "Afghanistan",
    ] as HostCountry[]),
    query: params.get("q") ?? "",
    yearFrom: Number.isFinite(yearFrom) ? yearFrom : YEAR_MIN,
    yearTo: Number.isFinite(yearTo) ? yearTo : YEAR_MAX,
  };
}

export function searchFromFilters(filters: Filters, selectedId: string | null): string {
  const p = new URLSearchParams();
  if (filters.actors.length) p.set("actors", filters.actors.join(","));
  if (filters.categories.length) p.set("cats", filters.categories.join(","));
  if (filters.layers.length) p.set("layers", filters.layers.join(","));
  if (filters.countries.length) p.set("countries", filters.countries.join(","));
  if (filters.query.trim()) p.set("q", filters.query.trim());
  if (filters.yearFrom !== YEAR_MIN) p.set("from", String(filters.yearFrom));
  if (filters.yearTo !== YEAR_MAX) p.set("to", String(filters.yearTo));
  if (selectedId) p.set("id", selectedId);
  const s = p.toString();
  return s ? `?${s}` : "";
}

export function readSelectedId(params: URLSearchParams): string | null {
  return params.get("id");
}

export { DEFAULT as DEFAULT_FILTERS };

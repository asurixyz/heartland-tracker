import { HISTORICAL_INVESTMENTS } from "@/data/historical-investments";
import { SEED_ENTITIES } from "@/data/seed-entities";
import type { Entity, Filters } from "./types";

export function getVerifiedEntities(): Entity[] {
  const map = new Map<string, Entity>();
  for (const e of [...SEED_ENTITIES, ...HISTORICAL_INVESTMENTS]) {
    map.set(e.id, e);
  }
  return Array.from(map.values());
}

export function entityYear(e: Entity): number | null {
  if (!e.started_at) return null;
  const y = Number(e.started_at.slice(0, 4));
  return Number.isFinite(y) ? y : null;
}

export function filterEntities(entities: Entity[], f: Filters): Entity[] {
  const q = f.query.trim().toLowerCase();
  return entities.filter((e) => {
    if (f.layers.length && !f.layers.includes(e.layer)) return false;
    if (f.actors.length && !e.actors.some((a) => f.actors.includes(a))) return false;
    if (f.categories.length && !f.categories.includes(e.category)) return false;
    if (f.countries.length && !f.countries.includes(e.host_country)) return false;
    const y = entityYear(e);
    if (y !== null && (y < f.yearFrom || y > f.yearTo)) return false;
    if (q) {
      const hay = `${e.title} ${e.summary} ${e.tags?.join(" ") ?? ""} ${e.host_country}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function sortEntities(entities: Entity[]): Entity[] {
  return [...entities].sort((a, b) => {
    const ad = a.started_at ?? "";
    const bd = b.started_at ?? "";
    return bd.localeCompare(ad);
  });
}

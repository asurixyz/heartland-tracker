import type { Actor, Category, HostCountry, Layer } from "./types";

export const CORE_COUNTRIES: HostCountry[] = [
  "Kazakhstan",
  "Kyrgyzstan",
  "Tajikistan",
  "Turkmenistan",
  "Uzbekistan",
];

export const ACTORS: Actor[] = ["US", "China", "Russia", "EU", "Other"];

export const CATEGORIES: Category[] = [
  "military",
  "capital",
  "energy_infra",
  "diplomacy_security",
  "soft_power",
  "people_flows",
];

export const LAYERS: Layer[] = ["verified", "reported"];

/** Cartographic-intel palette — not default IR clichés */
export const ACTOR_COLOR: Record<Actor, string> = {
  China: "#d4a574",
  Russia: "#8eb4c8",
  US: "#c4d4a8",
  EU: "#b8a0c8",
  Other: "#a8a49c",
};

export const CATEGORY_LABEL: Record<Category, string> = {
  military: "Military",
  capital: "Capital / FDI",
  energy_infra: "Energy & Infra",
  diplomacy_security: "Diplomacy / Security",
  soft_power: "Soft Power",
  people_flows: "People & Flows",
};

export const LAYER_LABEL: Record<Layer, string> = {
  verified: "Verified assets",
  reported: "Reported activity",
};

export const MAP_CENTER: [number, number] = [66.5, 41.8];
export const MAP_ZOOM = 3.55;

export const YEAR_MIN = 1991;
export const YEAR_MAX = new Date().getFullYear();

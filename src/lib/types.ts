export type Actor = "US" | "China" | "Russia" | "EU" | "Other";
export type Layer = "verified" | "reported";
export type Category =
  | "military"
  | "capital"
  | "energy_infra"
  | "diplomacy_security"
  | "soft_power"
  | "people_flows";

export type HostCountry =
  | "Kazakhstan"
  | "Kyrgyzstan"
  | "Tajikistan"
  | "Turkmenistan"
  | "Uzbekistan"
  | "Regional"
  | "Mongolia"
  | "Afghanistan";

export type Source = {
  url: string;
  title: string;
  quote: string;
  published_at?: string;
  accessed_at: string;
  publisher?: string;
};

export type Entity = {
  id: string;
  layer: Layer;
  category: Category;
  actors: Actor[];
  host_country: HostCountry;
  title: string;
  summary: string;
  amount_usd?: number | null;
  status?: "active" | "completed" | "planned" | "closed" | "reported";
  started_at?: string | null;
  ended_at?: string | null;
  lat?: number | null;
  lng?: number | null;
  confidence: number; // 0-1
  tags?: string[];
  sources: Source[];
};

export type LiveBundle = {
  fetched_at: string;
  source: string;
  events: Entity[];
};

export type Filters = {
  actors: Actor[];
  categories: Category[];
  layers: Layer[];
  countries: HostCountry[];
  query: string;
  yearFrom: number;
  yearTo: number;
};

"use client";

import { ACTOR_COLOR, MAP_CENTER, MAP_ZOOM } from "@/lib/constants";
import type { Entity } from "@/lib/types";
import * as maplibregl from "maplibre-gl";
import type { GeoJSONSource, Map as MapLibreMap } from "maplibre-gl";
import { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";

type Props = {
  entities: Entity[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
};

function toGeoJSON(entities: Entity[]): GeoJSON.FeatureCollection {
  return {
    type: "FeatureCollection",
    features: entities
      .filter((e) => e.lat != null && e.lng != null)
      .map((e) => ({
        type: "Feature",
        properties: {
          id: e.id,
          title: e.title,
          layer: e.layer,
          category: e.category,
          actors: e.actors.join(","),
          primaryActor: e.actors[0],
          color: ACTOR_COLOR[e.actors[0] ?? "Other"],
          confidence: e.confidence,
        },
        geometry: {
          type: "Point",
          coordinates: [e.lng as number, e.lat as number],
        },
      })),
  };
}

export function HeartlandMap({ entities, selectedId, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const selectedRef = useRef(selectedId);
  const [mapError, setMapError] = useState<string | null>(null);
  selectedRef.current = selectedId;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let map: MapLibreMap;
    try {
      map = new maplibregl.Map({
        container: containerRef.current,
        style: "https://tiles.openfreemap.org/styles/dark",
        center: MAP_CENTER,
        zoom: MAP_ZOOM,
        attributionControl: { compact: true },
      });
    } catch (err) {
      setMapError(err instanceof Error ? err.message : "Map failed to initialize");
      return;
    }
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");
    mapRef.current = map;

    map.on("error", (e) => {
      const msg = (e as { error?: Error }).error?.message;
      if (msg) console.error("MapLibre:", msg);
    });

    map.on("load", () => {
      map.addSource("countries", {
        type: "geojson",
        data: "/geo/heartland.geojson",
      });

      // Locate first symbol layer in the basemap so our fills sit below labels
      const layers = map.getStyle().layers ?? [];
      const firstSymbol = layers.find((l) => l.type === "symbol")?.id;

      map.addLayer(
        {
          id: "shadow-fill",
          type: "fill",
          source: "countries",
          filter: ["==", ["get", "role"], "shadow"],
          paint: {
            "fill-color": "#151d23",
            "fill-opacity": 0.4,
          },
        },
        firstSymbol,
      );

      map.addLayer(
        {
          id: "core-fill",
          type: "fill",
          source: "countries",
          filter: ["==", ["get", "role"], "core"],
          paint: {
            "fill-color": "#23303a",
            "fill-opacity": 0.55,
          },
        },
        firstSymbol,
      );

      map.addLayer(
        {
          id: "shadow-line",
          type: "line",
          source: "countries",
          filter: ["==", ["get", "role"], "shadow"],
          paint: {
            "line-color": "#37424c",
            "line-width": 0.6,
            "line-opacity": 0.55,
          },
        },
        firstSymbol,
      );

      map.addLayer(
        {
          id: "core-line",
          type: "line",
          source: "countries",
          filter: ["==", ["get", "role"], "core"],
          paint: {
            "line-color": "#c9a66b",
            "line-width": 1.15,
            "line-opacity": 0.85,
          },
        },
        firstSymbol,
      );

      map.addLayer({
        id: "core-label",
        type: "symbol",
        source: "countries",
        filter: ["==", ["get", "role"], "core"],
        layout: {
          "text-field": ["get", "name"],
          "text-size": 11,
          "text-transform": "uppercase",
          "text-letter-spacing": 0.08,
          "text-allow-overlap": false,
        },
        paint: {
          "text-color": "#d8c6a2",
          "text-halo-color": "#0b0f12",
          "text-halo-width": 1.2,
          "text-opacity": 0.9,
        },
      });

      map.addSource("entities", {
        type: "geojson",
        data: toGeoJSON([]),
      });

      map.addLayer({
        id: "entity-glow",
        type: "circle",
        source: "entities",
        paint: {
          "circle-radius": [
            "case",
            ["==", ["get", "layer"], "verified"],
            10,
            7,
          ],
          "circle-color": ["get", "color"],
          "circle-opacity": 0.16,
          "circle-blur": 0.7,
        },
      });

      map.addLayer({
        id: "entity-points",
        type: "circle",
        source: "entities",
        paint: {
          "circle-radius": [
            "case",
            ["==", ["get", "id"], selectedRef.current ?? ""],
            7.5,
            ["==", ["get", "layer"], "verified"],
            5.5,
            4,
          ],
          "circle-color": ["get", "color"],
          "circle-stroke-width": [
            "case",
            ["==", ["get", "layer"], "reported"],
            1.2,
            0.6,
          ],
          "circle-stroke-color": [
            "case",
            ["==", ["get", "layer"], "reported"],
            "#e8dcc8",
            "#0d1114",
          ],
          "circle-opacity": 0.95,
        },
      });

      map.on("mouseenter", "entity-points", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "entity-points", () => {
        map.getCanvas().style.cursor = "";
      });
      map.on("click", "entity-points", (e) => {
        const id = e.features?.[0]?.properties?.id as string | undefined;
        if (id) onSelect(id);
      });
      map.on("click", (e) => {
        const feats = map.queryRenderedFeatures(e.point, { layers: ["entity-points"] });
        if (!feats.length) onSelect(null);
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [onSelect]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const apply = () => {
      const src = map.getSource("entities") as GeoJSONSource | undefined;
      if (src) src.setData(toGeoJSON(entities));
    };
    if (map.isStyleLoaded()) apply();
    else map.once("load", apply);
  }, [entities]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.getLayer("entity-points")) return;
    map.setPaintProperty("entity-points", "circle-radius", [
      "case",
      ["==", ["get", "id"], selectedId ?? ""],
      7.5,
      ["==", ["get", "layer"], "verified"],
      5.5,
      4,
    ]);
    if (selectedId) {
      const ent = entities.find((e) => e.id === selectedId);
      if (ent?.lng != null && ent.lat != null) {
        map.flyTo({ center: [ent.lng, ent.lat], zoom: Math.max(map.getZoom(), 4.5), speed: 0.8 });
      }
    }
  }, [selectedId, entities]);

  return (
    <div className="map-root">
      <div ref={containerRef} className="map-canvas" />
      {mapError && (
        <div className="map-error">
          Map couldn’t initialize{mapError ? `: ${mapError}` : ""}. Verified ledger and feed still
          work.
        </div>
      )}
    </div>
  );
}

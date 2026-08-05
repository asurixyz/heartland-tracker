"use client";

import { ACTOR_COLOR, CATEGORY_LABEL, LAYER_LABEL } from "@/lib/constants";
import type { Entity } from "@/lib/types";

type Props = {
  entities: Entity[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  liveStatus: string;
  refreshing: boolean;
  onRefresh: () => void;
};

export function FeedPanel({
  entities,
  selectedId,
  onSelect,
  liveStatus,
  refreshing,
  onRefresh,
}: Props) {
  return (
    <aside className="panel panel-right">
      <div className="feed-head">
        <div>
          <h2>Intel feed</h2>
          <p className="muted">{liveStatus}</p>
        </div>
        <button type="button" className="ghost-btn" onClick={onRefresh} disabled={refreshing}>
          {refreshing ? "Pulling…" : "Refresh live"}
        </button>
      </div>
      <ul className="feed-list">
        {entities.map((e) => (
          <li key={e.id}>
            <button
              type="button"
              className={`feed-item ${selectedId === e.id ? "selected" : ""}`}
              onClick={() => onSelect(e.id)}
            >
              <div className="feed-meta">
                <span className={`layer-pill ${e.layer}`}>{LAYER_LABEL[e.layer]}</span>
                <span className="cat">{CATEGORY_LABEL[e.category]}</span>
                {e.layer === "reported" && (
                  <span className="conf">{Math.round(e.confidence * 100)}% match</span>
                )}
              </div>
              <strong>{e.title}</strong>
              <div className="feed-actors">
                {e.actors.map((a) => (
                  <span key={a} style={{ color: ACTOR_COLOR[a] }}>
                    {a}
                  </span>
                ))}
                <span className="host">{e.host_country}</span>
              </div>
            </button>
          </li>
        ))}
        {!entities.length && (
          <li className="empty">No sourced items in the current filter range.</li>
        )}
      </ul>
    </aside>
  );
}

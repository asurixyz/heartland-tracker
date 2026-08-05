"use client";

import { ACTOR_COLOR, CATEGORY_LABEL, LAYER_LABEL } from "@/lib/constants";
import type { Entity } from "@/lib/types";

type Props = {
  entity: Entity | null;
  onClose: () => void;
};

function fmtMoney(n?: number | null) {
  if (n == null) return null;
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(0)}M`;
  return `$${n.toLocaleString()}`;
}

export function DetailDrawer({ entity, onClose }: Props) {
  return (
    <div className={`drawer ${entity ? "open" : ""}`} aria-hidden={!entity}>
      {entity && (
        <>
          <div className="drawer-top">
            <span className={`layer-pill ${entity.layer}`}>{LAYER_LABEL[entity.layer]}</span>
            <button type="button" className="ghost-btn" onClick={onClose}>
              Close
            </button>
          </div>
          <h2>{entity.title}</h2>
          <p className="summary">{entity.summary}</p>

          <dl className="meta-grid">
            <div>
              <dt>Category</dt>
              <dd>{CATEGORY_LABEL[entity.category]}</dd>
            </div>
            <div>
              <dt>Host</dt>
              <dd>{entity.host_country}</dd>
            </div>
            <div>
              <dt>Actors</dt>
              <dd>
                {entity.actors.map((a) => (
                  <span key={a} className="actor-tag" style={{ color: ACTOR_COLOR[a] }}>
                    {a}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt>Confidence</dt>
              <dd>{Math.round(entity.confidence * 100)}%</dd>
            </div>
            {entity.started_at && (
              <div>
                <dt>Start</dt>
                <dd>{entity.started_at}</dd>
              </div>
            )}
            {entity.ended_at && (
              <div>
                <dt>End</dt>
                <dd>{entity.ended_at}</dd>
              </div>
            )}
            {fmtMoney(entity.amount_usd) && (
              <div>
                <dt>Amount</dt>
                <dd>{fmtMoney(entity.amount_usd)}</dd>
              </div>
            )}
            {entity.status && (
              <div>
                <dt>Status</dt>
                <dd>{entity.status}</dd>
              </div>
            )}
          </dl>

          <section className="sources">
            <h3>Sources</h3>
            {entity.sources.map((s, i) => (
              <article key={`${s.url}-${i}`} className="source-card">
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.title}
                </a>
                {s.publisher && <div className="pub">{s.publisher}</div>}
                <blockquote>“{s.quote}”</blockquote>
                <div className="src-dates">
                  {s.published_at && <span>Published {s.published_at.slice(0, 10)}</span>}
                  <span>Accessed {s.accessed_at.slice(0, 10)}</span>
                </div>
              </article>
            ))}
          </section>
        </>
      )}
    </div>
  );
}

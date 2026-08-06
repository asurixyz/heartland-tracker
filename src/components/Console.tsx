"use client";

import { ACTOR_COLOR, CATEGORY_LABEL, LAYER_LABEL } from "@/lib/constants";
import type { Entity } from "@/lib/types";

type Props = {
  entities: Entity[];
  selected: Entity | null;
  onSelect: (id: string | null) => void;
};

function fmtMoney(n?: number | null) {
  if (n == null) return null;
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}bn`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(0)}m`;
  return `$${n.toLocaleString()}`;
}

export function Console({ entities, selected, onSelect }: Props) {
  const list = entities.slice(0, 120);

  return (
    <section className="border-b border-[var(--line)] bg-[var(--paper-deep)]">
      <div className="mx-auto grid max-w-7xl gap-0 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-[var(--line)] py-8 lg:border-b-0 lg:border-r lg:pr-8">
          <p className="eyebrow">Intel feed · {entities.length} sourced items</p>
          <div className="pro-scroll mt-4 max-h-[600px] overflow-auto pr-2">
            <ul className="divide-y divide-[var(--line)]">
              {list.map((e) => {
                const isSel = e.id === selected?.id;
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(e.id)}
                      className={`w-full py-3 pr-4 text-left transition ${
                        isSel ? "bg-[var(--panel)] pl-3" : "hover:bg-[var(--panel)]/60"
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em]">
                        <span
                          className={`border px-1.5 py-0.5 ${
                            e.layer === "verified"
                              ? "border-[var(--map-accent)] text-[var(--map-accent)]"
                              : "border-[var(--actor-russia)] text-[var(--actor-russia)]"
                          }`}
                        >
                          {LAYER_LABEL[e.layer]}
                        </span>
                        <span className="text-[var(--muted)]">{CATEGORY_LABEL[e.category]}</span>
                        <span className="ml-auto text-[var(--muted)]">{e.host_country}</span>
                      </div>
                      <div className="mt-2 font-[family-name:var(--font-display)] text-[16px] leading-snug text-[var(--ink)]">
                        {e.title}
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-2 font-[family-name:var(--font-mono)] text-[10px]">
                        {e.actors.map((a) => (
                          <span key={a} style={{ color: ACTOR_COLOR[a] }}>
                            {a}
                          </span>
                        ))}
                        {e.started_at && (
                          <span className="text-[var(--muted)]">· {e.started_at.slice(0, 4)}</span>
                        )}
                        {e.layer === "reported" && (
                          <span className="text-[var(--muted)]">
                            · {Math.round(e.confidence * 100)}% match
                          </span>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
              {!list.length && (
                <li className="py-8 text-center font-[family-name:var(--font-mono)] text-[12px] text-[var(--muted)]">
                  No sourced items match these filters.
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="py-8 lg:pl-10">
          {selected ? (
            <article className="rise">
              <div className="flex flex-wrap items-center gap-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em]">
                <span
                  className={`border px-1.5 py-0.5 ${
                    selected.layer === "verified"
                      ? "border-[var(--map-accent)] text-[var(--map-accent)]"
                      : "border-[var(--actor-russia)] text-[var(--actor-russia)]"
                  }`}
                >
                  {LAYER_LABEL[selected.layer]}
                </span>
                <span className="text-[var(--muted)]">{CATEGORY_LABEL[selected.category]}</span>
                <span className="text-[var(--muted)]">· {selected.host_country}</span>
                {selected.status && (
                  <span className="text-[var(--muted)]">· {selected.status}</span>
                )}
              </div>

              <h2 className="display mt-4 text-3xl sm:text-4xl">{selected.title}</h2>

              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--ink-soft)]">
                {selected.summary}
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[var(--line)] pt-6 sm:grid-cols-4">
                <div>
                  <dt className="eyebrow !text-[10px]">Actors</dt>
                  <dd className="mt-1.5 flex flex-wrap gap-1.5 font-[family-name:var(--font-mono)] text-[12px]">
                    {selected.actors.map((a) => (
                      <span key={a} style={{ color: ACTOR_COLOR[a] }}>
                        {a}
                      </span>
                    ))}
                  </dd>
                </div>
                {selected.started_at && (
                  <div>
                    <dt className="eyebrow !text-[10px]">Since</dt>
                    <dd className="mt-1.5 font-[family-name:var(--font-mono)] text-[12px] text-[var(--ink)]">
                      {selected.started_at}
                    </dd>
                  </div>
                )}
                {fmtMoney(selected.amount_usd) && (
                  <div>
                    <dt className="eyebrow !text-[10px]">Amount</dt>
                    <dd className="mt-1.5 font-[family-name:var(--font-display)] text-[18px] text-[var(--ink)]">
                      {fmtMoney(selected.amount_usd)}
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="eyebrow !text-[10px]">Confidence</dt>
                  <dd className="mt-1.5 font-[family-name:var(--font-mono)] text-[12px] text-[var(--ink)]">
                    {Math.round(selected.confidence * 100)}%
                  </dd>
                </div>
              </dl>

              <section className="mt-8">
                <p className="eyebrow">Sources</p>
                <div className="mt-4 space-y-4">
                  {selected.sources.map((s, i) => (
                    <a
                      key={`${s.url}-${i}`}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-sm border border-[var(--line)] bg-[var(--panel)] p-4 transition hover:border-[var(--ink)]"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <div className="font-[family-name:var(--font-display)] text-[15px] text-[var(--ink)]">
                          {s.title}
                        </div>
                        <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--muted)]">
                          {s.publisher ?? new URL(s.url).hostname.replace("www.", "")}
                        </div>
                      </div>
                      <blockquote className="mt-3 border-l-2 border-[var(--map-accent)] pl-3 text-[13px] leading-relaxed text-[var(--ink-soft)]">
                        “{s.quote}”
                      </blockquote>
                      <div className="mt-3 flex gap-4 font-[family-name:var(--font-mono)] text-[10px] text-[var(--muted)]">
                        {s.published_at && <span>Published {s.published_at.slice(0, 10)}</span>}
                        <span>Accessed {s.accessed_at.slice(0, 10)}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            </article>
          ) : (
            <div className="rise flex h-full flex-col justify-center">
              <p className="eyebrow">Nothing selected</p>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[var(--muted)]">
                Pick a pin on the map or a story from the feed. Every item shows its source, quote,
                and how confident this tracker is that it belongs here.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useCallback } from "react";

export type PanelType = "stat" | "chart-bar" | "brand" | "table-row" | null;

export type PanelPayload =
  | { type: "stat"; key: string; label: string }
  | { type: "chart-bar"; day: string }
  | { type: "brand"; brandName: string }
  | { type: "table-row"; row: { time: string; query: string; intercepted: string; action: string; province: string } }
  | null;

const DATA_SOURCE_PLACEHOLDER = `// App Clip event schema (clip_events)
{ id, created_at, merchant_id, query, intercepted, action, province }`;

export function DetailPanel({
  open,
  payload,
  onClose,
}: {
  open: boolean;
  payload: PanelPayload;
  onClose: () => void;
}) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, handleEscape]);

  if (!open) return null;

  const title =
    payload?.type === "stat"
      ? payload.label
      : payload?.type === "chart-bar"
        ? `Day: ${payload.day}`
        : payload?.type === "brand"
          ? payload.brandName
          : payload?.type === "table-row"
            ? "Session details"
            : "Details";

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-200"
        onClick={onClose}
        aria-hidden
      />
      <aside
        className="fixed top-0 right-0 w-full max-w-[400px] h-full z-50 bg-[var(--surface)] border-l border-[var(--border)] shadow-2xl panel-slide-in flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="p-7 flex items-center justify-between border-b border-[var(--border)]">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors duration-150 focus:outline-none"
            aria-label="Close panel"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-7 space-y-6">
          {payload?.type === "stat" && (
            <>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-2">
                  Sparkline trend (30 days)
                </h3>
                <p className="text-sm text-[var(--text-secondary)] font-mono">
                  Daily views and conversions for the last 30 days
                </p>
              </section>
              <div className="h-px bg-[var(--border)]" />
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-2">
                  Breakdown by province
                </h3>
                <p className="text-sm text-[var(--text-secondary)] font-mono">
                  ON 34% · BC 28% · AB 18% · QC 12% · Other 8%
                </p>
              </section>
              <div className="h-px bg-[var(--border)]" />
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-2">
                  Top 3 source brands
                </h3>
                <p className="text-sm text-[var(--text-secondary)] font-mono">
                  Jansport 41% · Herschel 28% · North Face 18% · Others 13%
                </p>
              </section>
            </>
          )}
          {payload?.type === "chart-bar" && (
            <>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-2">
                  Day breakdown
                </h3>
                <p className="text-sm text-[var(--text-secondary)] font-mono">
                  Full brand breakdown for {payload.day}
                </p>
              </section>
              <div className="h-px bg-[var(--border)]" />
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-2">
                  Hourly heatmap
                </h3>
                <p className="text-sm text-[var(--text-secondary)] font-mono">
                  Peak: 12–2pm and 7–9pm ET; weekend lift in afternoon
                </p>
              </section>
              <div className="h-px bg-[var(--border)]" />
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-2">
                  Top queries / conversion funnel
                </h3>
                <p className="text-sm text-[var(--text-secondary)] font-mono">
                  Viewed → Clicked → Purchased
                </p>
              </section>
            </>
          )}
          {payload?.type === "brand" && (
            <>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-2">
                  Brand
                </h3>
                <p className="text-sm text-[var(--text-primary)] font-mono">
                  {payload.brandName}
                </p>
              </section>
              <div className="h-px bg-[var(--border)]" />
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-2">
                  Top 5 intercepted queries
                </h3>
                <p className="text-sm text-[var(--text-secondary)] font-mono">
                  backpack under $200 · Canadian made backpack · Jansport alternative
                </p>
              </section>
              <div className="h-px bg-[var(--border)]" />
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-2">
                  Province distribution / AOV / Trend
                </h3>
                <p className="text-sm text-[var(--text-secondary)] font-mono">
                  ON 38% · QC 22% · BC 20% · AOV $94 · +12% vs last week
                </p>
              </section>
            </>
          )}
          {payload?.type === "table-row" && (
            <>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-2">
                  Session
                </h3>
                <p className="text-sm text-[var(--text-primary)] font-mono">
                  {payload.row.time} · {payload.row.query}
                </p>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  {payload.row.intercepted} · {payload.row.action} · {payload.row.province}
                </p>
              </section>
              <div className="h-px bg-[var(--border)]" />
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-2">
                  Device / Trigger URL / Journey
                </h3>
                <p className="text-sm text-[var(--text-secondary)] font-mono">
                  iPhone 15 · thenorthface.com/en-ca/shop/equipment/backpacks · Viewed → Clicked → Purchased
                </p>
              </section>
            </>
          )}
          <div className="h-px bg-[var(--border)]" />
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-2">
              Data source
            </h3>
            <pre className="text-xs text-[var(--text-secondary)] font-mono bg-black/20 p-3 rounded-lg overflow-x-auto whitespace-pre">
              {DATA_SOURCE_PLACEHOLDER}
            </pre>
          </section>
        </div>
      </aside>
    </>
  );
}

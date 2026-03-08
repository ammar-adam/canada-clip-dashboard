"use client";

import { useEffect, useCallback, useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useMerchant } from "@/contexts/MerchantContext";
import { merchantData, getKeywordDrillDown, getTriggerDrillData } from "@/lib/merchantData";

export type PanelType = "stat" | "chart-bar" | "brand" | "table-row" | "trigger" | null;

export type PanelPayload =
  | { type: "stat"; key: string; label: string }
  | { type: "chart-bar"; day: string }
  | { type: "brand"; brandName: string }
  | { type: "table-row"; row: { time: string; query: string; intercepted: string; action: string; province: string; journey?: string } }
  | { type: "trigger"; query: string; impressions: number; trend: "up" | "down"; isPaused?: boolean; boostRemaining?: number }
  | { type: "keyword"; word: string; views: number; clicks: number; purchases: number; productKey: string }
  | null;

const DATA_SOURCE_PLACEHOLDER = `// App Clip event schema (clip_events)
{ id, created_at, merchant_id, query, intercepted, action, province }`;

export function DetailPanel({
  open,
  payload,
  onClose,
  onKeywordBoost,
  onPauseTrigger,
  onBoostTrigger,
}: {
  open: boolean;
  payload: PanelPayload;
  onClose: () => void;
  onKeywordBoost?: () => void;
  onPauseTrigger?: (query: string) => void;
  onBoostTrigger?: (query: string, duration: "24h" | "3d" | "7d") => void;
}) {
  const merchantId = useMerchant();
  const data = merchantData[merchantId];
  const [revenueGranularity, setRevenueGranularity] = useState<"daily" | "weekly">("daily");
  const [boostDurationSelecting, setBoostDurationSelecting] = useState(false);

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

  useEffect(() => {
    if (!open || payload?.type !== "trigger") setBoostDurationSelecting(false);
  }, [open, payload?.type]);

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
            : payload?.type === "trigger"
              ? `Trigger: ${payload.query}`
              : payload?.type === "keyword"
                ? `"${payload.word}"`
                : "Details";

  const revenueData = revenueGranularity === "daily" ? data.revenueDaily : data.revenueWeekly;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-200"
        onClick={onClose}
        aria-hidden
      />
      <aside
        className="fixed top-0 right-0 w-full max-w-[480px] h-full z-50 bg-[#1a1a1a] border-l border-[var(--border)] shadow-2xl panel-slide-in flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="p-7 flex items-center justify-between border-b border-[var(--border)]">
          <h2 className="text-lg font-semibold text-white">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors duration-150 focus:outline-none"
            aria-label="Close panel"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-7 space-y-6">
          {payload?.type === "stat" && payload.key === "revenue" && (
            <>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                  Revenue over time
                </h3>
                <div className="flex gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setRevenueGranularity("daily")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${revenueGranularity === "daily" ? "bg-white/15 text-white" : "text-white/70 hover:text-white"}`}
                  >
                    Daily
                  </button>
                  <button
                    type="button"
                    onClick={() => setRevenueGranularity("weekly")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${revenueGranularity === "weekly" ? "bg-white/15 text-white" : "text-white/70 hover:text-white"}`}
                  >
                    Weekly
                  </button>
                </div>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                      <XAxis dataKey="period" tick={{ fill: "rgba(255,255,255,0.8)", fontSize: 10 }} axisLine={{ stroke: "var(--border)" }} tickLine={false} />
                      <YAxis tick={{ fill: "rgba(255,255,255,0.8)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                      <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid var(--border)", borderRadius: "8px" }} labelStyle={{ color: "#fff" }} formatter={(v: number) => [`$${v}`, "Revenue"]} />
                      <Line type="monotone" dataKey="revenue" stroke="#fff" strokeWidth={2} dot={{ fill: "#1a1a1a", stroke: "#fff" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </section>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                  Top 3 source brands
                </h3>
                <div className="h-[140px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.revenueByBrand} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
                      <XAxis type="number" tick={{ fill: "rgba(255,255,255,0.8)", fontSize: 10 }} axisLine={{ stroke: "var(--border)" }} tickLine={false} tickFormatter={(v) => `$${v}`} />
                      <YAxis type="category" dataKey="name" tick={{ fill: "rgba(255,255,255,0.9)", fontSize: 11 }} axisLine={false} tickLine={false} width={72} />
                      <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid var(--border)", borderRadius: "8px" }} formatter={(v: number) => [`$${v}`, "Revenue"]} />
                      <Bar dataKey="revenue" fill="var(--brand-red)" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </section>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                  Province breakdown
                </h3>
                <div className="space-y-2">
                  {data.revenueByProvince.map((row, i) => (
                    <div key={row.province} className="flex items-center justify-between text-sm">
                      <span className="text-white font-mono">{row.province}</span>
                      <span className="text-white tabular-nums">${row.revenue.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                  Summary
                </h3>
                <p className="text-sm text-white font-mono">
                  Profit margin 24% · AOV $94 · +12% vs last week
                </p>
              </section>
            </>
          )}

          {payload?.type === "stat" && payload.key === "stolen" && (
            <>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                  Customers stolen by brand
                </h3>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.competitors} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
                      <XAxis type="number" tick={{ fill: "rgba(255,255,255,0.8)", fontSize: 10 }} axisLine={{ stroke: "var(--border)" }} tickLine={false} />
                      <YAxis type="category" dataKey="name" tick={{ fill: "rgba(255,255,255,0.9)", fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                      <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid var(--border)", borderRadius: "8px" }} />
                      <Bar dataKey="count" name="Stolen" radius={[0, 4, 4, 0]}>
                        {data.competitors.map((entry, i) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </section>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                  Trend & top query
                </h3>
                <p className="text-sm text-white font-mono">
                  +8% WoW · Top query: backpack under $200
                </p>
              </section>
            </>
          )}

          {payload?.type === "stat" && payload.key === "taps" && (
            <>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                  Taps over time (30 days)
                </h3>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.tapsTimeSeries ?? data.viewsOverTime.map((d) => ({ date: d.date, value: Math.round(d.views * 0.25) }))} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                      <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.8)", fontSize: 9 }} axisLine={{ stroke: "var(--border)" }} tickLine={false} />
                      <YAxis tick={{ fill: "rgba(255,255,255,0.8)", fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid var(--border)", borderRadius: "8px" }} labelStyle={{ color: "#fff" }} />
                      <Line type="monotone" dataKey="value" stroke="var(--brand-blue)" strokeWidth={2} strokeDasharray="6 4" dot={{ fill: "var(--brand-blue)", r: 2 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </section>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                  Tap-through by province
                </h3>
                <p className="text-sm text-white font-mono">
                  ON 38% · BC 22% · AB 18% · QC 14% · Other 8%
                </p>
              </section>
            </>
          )}

          {payload?.type === "stat" && payload.key === "views" && (
            <>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                  Clip views over time (30 days)
                </h3>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.viewsTimeSeries ?? data.viewsOverTime.map((d) => ({ date: d.date, value: d.views }))} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--brand-red)" stopOpacity={0.4} />
                          <stop offset="100%" stopColor="var(--brand-red)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                      <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.8)", fontSize: 9 }} axisLine={{ stroke: "var(--border)" }} tickLine={false} />
                      <YAxis tick={{ fill: "rgba(255,255,255,0.8)", fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid var(--border)", borderRadius: "8px" }} labelStyle={{ color: "#fff" }} />
                      <Area type="monotone" dataKey="value" stroke="var(--brand-red)" strokeWidth={2} fill="url(#viewsFill)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </section>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                  Device split & peak
                </h3>
                <p className="text-sm text-white font-mono">
                  Mobile 72% · Desktop 28%. Peak days: Sat–Sun.
                </p>
              </section>
            </>
          )}

          {payload?.type === "stat" && (payload.key === "conversionRate" || payload.key === "purchases") && (
            <>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                  Conversion funnel
                </h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.funnelData} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
                      <XAxis type="number" tick={{ fill: "rgba(255,255,255,0.8)", fontSize: 10 }} axisLine={{ stroke: "var(--border)" }} tickLine={false} />
                      <YAxis type="category" dataKey="stage" tick={{ fill: "rgba(255,255,255,0.9)", fontSize: 11 }} axisLine={false} tickLine={false} width={72} />
                      <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid var(--border)", borderRadius: "8px" }} />
                      <Bar dataKey="count" fill="var(--brand-blue)" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </section>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                  Drop-off
                </h3>
                <p className="text-sm text-white font-mono">
                  75% view→tap · 54% tap→purchase
                </p>
              </section>
            </>
          )}

          {payload?.type === "chart-bar" && (
            <>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                  Day breakdown
                </h3>
                <p className="text-sm text-white font-mono">
                  Full brand breakdown for {payload.day}
                </p>
              </section>
              <div className="h-px bg-[var(--border)]" />
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                  Hourly heatmap
                </h3>
                <p className="text-sm text-white font-mono">
                  Peak: 12–2pm and 7–9pm ET; weekend lift in afternoon
                </p>
              </section>
              <div className="h-px bg-[var(--border)]" />
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                  Top queries / conversion funnel
                </h3>
                <p className="text-sm text-white font-mono">
                  Viewed → Clicked → Purchased
                </p>
              </section>
            </>
          )}
          {payload?.type === "brand" && (
            <>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                  Brand
                </h3>
                <p className="text-sm text-white font-mono">
                  {payload.brandName}
                </p>
              </section>
              <div className="h-px bg-[var(--border)]" />
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                  Top 5 intercepted queries
                </h3>
                <p className="text-sm text-white font-mono">
                  backpack under $200 · Canadian made backpack · Jansport alternative
                </p>
              </section>
              <div className="h-px bg-[var(--border)]" />
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                  Province distribution / AOV / Trend
                </h3>
                <p className="text-sm text-white font-mono">
                  ON 38% · QC 22% · BC 20% · AOV $94 · +12% vs last week
                </p>
              </section>
            </>
          )}
          {payload?.type === "table-row" && (
            <>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                  Session
                </h3>
                <p className="text-sm text-white font-mono">
                  {payload.row.time} · {payload.row.query}
                </p>
                <p className="text-xs text-white/90 mt-1">
                  {payload.row.intercepted} · {payload.row.action} · {payload.row.province}
                </p>
              </section>
              <div className="h-px bg-[var(--border)]" />
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                  Device / Trigger URL / Journey
                </h3>
                <p className="text-sm text-white font-mono">
                  iPhone 15 · thenorthface.com/en-ca/shop/equipment/backpacks · {payload.row.journey ?? "Viewed → Clicked → Purchased"}
                </p>
              </section>
            </>
          )}

          {payload?.type === "keyword" && (() => {
            const drill = getKeywordDrillDown(merchantId, payload.productKey, payload.word, payload.views);
            const conversionPct = payload.views ? Math.round((payload.purchases / payload.views) * 1000) / 10 : 0;
            return (
              <>
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                    14-day impression sparkline
                  </h3>
                  <div className="h-[100px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={drill.sparkline} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                        <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.8)", fontSize: 9 }} axisLine={{ stroke: "var(--border)" }} tickLine={false} />
                        <YAxis tick={{ fill: "rgba(255,255,255,0.8)", fontSize: 10 }} axisLine={false} tickLine={false} />
                        <Line type="monotone" dataKey="impressions" stroke="var(--brand-blue)" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </section>
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                    Conversion rate (Purchases / Views)
                  </h3>
                  <p className="text-sm text-white font-mono tabular-nums">{conversionPct}%</p>
                </section>
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                    Top 3 provinces
                  </h3>
                  <div className="space-y-2">
                    {drill.topProvinces.map(({ province, pct }) => (
                      <div key={province} className="flex items-center gap-2">
                        <span className="w-8 text-white font-mono text-sm">{province}</span>
                        <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full rounded-full bg-[var(--brand-blue)]" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-white font-mono text-xs tabular-nums w-8">{pct}%</span>
                      </div>
                    ))}
                  </div>
                </section>
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                    Top device type
                  </h3>
                  <p className="text-sm text-white font-mono">{drill.device}</p>
                </section>
                <button
                  type="button"
                  onClick={() => onKeywordBoost?.()}
                  className="rounded-lg bg-[var(--brand-blue)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-colors"
                >
                  Boost this keyword
                </button>
              </>
            );
          })()}

          {payload?.type === "trigger" && (() => {
            const drill = getTriggerDrillData(merchantId, payload.query, payload.impressions, payload.trend);
            return (
              <>
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                    Impression history (14 days)
                  </h3>
                  <div className="h-[120px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={drill.sparkline} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                        <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.8)", fontSize: 9 }} axisLine={{ stroke: "var(--border)" }} tickLine={false} />
                        <YAxis tick={{ fill: "rgba(255,255,255,0.8)", fontSize: 10 }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid var(--border)", borderRadius: "8px" }} />
                        <Line type="monotone" dataKey="impressions" stroke="var(--brand-blue)" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </section>
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                    Conversion rate (this query)
                  </h3>
                  <p className="text-sm text-white font-mono tabular-nums">
                    ~{Math.round(8000 / Math.max(1, payload.impressions)) / 100}% (view → tap → purchase)
                  </p>
                </section>
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                    Top provinces / devices
                  </h3>
                  <p className="text-sm text-white font-mono">
                    {drill.topProvinces.map((p) => `${p.province} ${p.pct}%`).join(" · ")}
                  </p>
                  <p className="text-xs text-white/90 font-mono mt-1">
                    iPhone 62% · Android 28% · Other 10%
                  </p>
                </section>
                <section className="flex flex-wrap gap-3 items-center">
                <button
                  type="button"
                  onClick={() => payload.isPaused ? onPauseTrigger?.(payload.query) : onPauseTrigger?.(payload.query)}
                  className="rounded-lg border border-[var(--border)] bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                >
                  {payload.isPaused ? "Resume trigger" : "Pause trigger"}
                </button>
                {typeof payload.boostRemaining === "number" && payload.boostRemaining > 0 ? (
                  <span className="rounded-lg bg-[var(--brand-blue-muted)] border border-[var(--brand-blue)] px-4 py-2 text-sm font-medium text-[var(--brand-blue)]">
                    Boosting ({payload.boostRemaining}d remaining)
                  </span>
                ) : boostDurationSelecting ? (
                  <div className="flex gap-2">
                    {(["24h", "3d", "7d"] as const).map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => {
                          onBoostTrigger?.(payload.query, d);
                          setBoostDurationSelecting(false);
                        }}
                        className="rounded-lg bg-[var(--brand-blue)] px-3 py-2 text-sm font-medium text-white hover:opacity-90 transition-colors"
                      >
                        {d === "24h" ? "24 hours" : d === "3d" ? "3 days" : "7 days"}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setBoostDurationSelecting(false)}
                      className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm text-white/80 hover:bg-white/5"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setBoostDurationSelecting(true)}
                    className="rounded-lg bg-[var(--brand-blue)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-colors"
                  >
                    Boost trigger
                  </button>
                )}
              </section>
              </>
            );
          })()}

          {payload?.type === "stat" && !["revenue", "stolen", "views", "conversionRate", "taps", "purchases"].includes(payload.key) && (
            <>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                  Sparkline trend (30 days)
                </h3>
                <p className="text-sm text-white font-mono">
                  Daily views and conversions for the last 30 days
                </p>
              </section>
              <div className="h-px bg-[var(--border)]" />
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                  Breakdown by province
                </h3>
                <p className="text-sm text-white font-mono">
                  ON 34% · BC 28% · AB 18% · QC 12% · Other 8%
                </p>
              </section>
              <div className="h-px bg-[var(--border)]" />
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                  Top 3 source brands
                </h3>
                <p className="text-sm text-white font-mono">
                  Jansport 41% · Herschel 28% · North Face 18% · Others 13%
                </p>
              </section>
            </>
          )}

          <div className="h-px bg-[var(--border)]" />
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
              Data source
            </h3>
            <pre className="text-xs text-white/80 font-mono bg-black/20 p-3 rounded-lg overflow-x-auto whitespace-pre">
              {DATA_SOURCE_PLACEHOLDER}
            </pre>
          </section>
        </div>
      </aside>
    </>
  );
}

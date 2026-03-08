"use client";

import { useEffect, useCallback, useState } from "react";
import {
  LineChart,
  Line,
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
import { merchantData } from "@/lib/merchantData";

export type PanelType = "stat" | "chart-bar" | "brand" | "table-row" | "trigger" | null;

export type PanelPayload =
  | { type: "stat"; key: string; label: string }
  | { type: "chart-bar"; day: string }
  | { type: "brand"; brandName: string }
  | { type: "table-row"; row: { time: string; query: string; intercepted: string; action: string; province: string } }
  | { type: "trigger"; query: string; impressions: number; trend: "up" | "down" }
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
  const merchantId = useMerchant();
  const data = merchantData[merchantId];
  const [revenueGranularity, setRevenueGranularity] = useState<"daily" | "weekly">("daily");

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
            : payload?.type === "trigger"
              ? `Trigger: ${payload.query}`
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
          <h2 className="text-lg font-semibold text-[#fafafa]">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-[#888] hover:text-[#fafafa] hover:bg-white/5 transition-colors duration-150 focus:outline-none"
            aria-label="Close panel"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-7 space-y-6">
          {payload?.type === "stat" && payload.key === "revenue" && (
            <>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#aaaaaa] mb-2">
                  Revenue over time
                </h3>
                <div className="flex gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setRevenueGranularity("daily")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${revenueGranularity === "daily" ? "bg-white/15 text-white" : "text-[#888] hover:text-[#aaa]"}`}
                  >
                    Daily
                  </button>
                  <button
                    type="button"
                    onClick={() => setRevenueGranularity("weekly")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${revenueGranularity === "weekly" ? "bg-white/15 text-white" : "text-[#888] hover:text-[#aaa]"}`}
                  >
                    Weekly
                  </button>
                </div>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                      <XAxis dataKey="period" tick={{ fill: "#888", fontSize: 10 }} axisLine={{ stroke: "var(--border)" }} tickLine={false} />
                      <YAxis tick={{ fill: "#888", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                      <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid var(--border)", borderRadius: "8px" }} labelStyle={{ color: "#fafafa" }} formatter={(v: number) => [`$${v}`, "Revenue"]} />
                      <Line type="monotone" dataKey="revenue" stroke="#fafafa" strokeWidth={2} dot={{ fill: "#1a1a1a", stroke: "#fafafa" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </section>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#aaaaaa] mb-2">
                  Top 3 source brands
                </h3>
                <div className="h-[140px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.revenueByBrand} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
                      <XAxis type="number" tick={{ fill: "#888", fontSize: 10 }} axisLine={{ stroke: "var(--border)" }} tickLine={false} tickFormatter={(v) => `$${v}`} />
                      <YAxis type="category" dataKey="name" tick={{ fill: "#aaa", fontSize: 11 }} axisLine={false} tickLine={false} width={72} />
                      <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid var(--border)", borderRadius: "8px" }} formatter={(v: number) => [`$${v}`, "Revenue"]} />
                      <Bar dataKey="revenue" fill="#C8102E" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </section>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#aaaaaa] mb-2">
                  Province breakdown
                </h3>
                <div className="space-y-2">
                  {data.revenueByProvince.map((row, i) => (
                    <div key={row.province} className="flex items-center justify-between text-sm">
                      <span className="text-[#aaa] font-mono">{row.province}</span>
                      <span className="text-[#fafafa] tabular-nums">${row.revenue.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {payload?.type === "stat" && payload.key === "stolen" && (
            <>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#aaaaaa] mb-2">
                  Customers stolen by brand
                </h3>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.competitors} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
                      <XAxis type="number" tick={{ fill: "#888", fontSize: 10 }} axisLine={{ stroke: "var(--border)" }} tickLine={false} />
                      <YAxis type="category" dataKey="name" tick={{ fill: "#aaa", fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
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
            </>
          )}

          {payload?.type === "stat" && payload.key === "taps" && (
            <>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#aaaaaa] mb-2">
                  Taps over time (30 days)
                </h3>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.viewsOverTime.map((d) => ({ ...d, taps: Math.round(d.views * 0.25) }))} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                      <XAxis dataKey="date" tick={{ fill: "#888", fontSize: 9 }} axisLine={{ stroke: "var(--border)" }} tickLine={false} />
                      <YAxis tick={{ fill: "#888", fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid var(--border)", borderRadius: "8px" }} labelStyle={{ color: "#fafafa" }} />
                      <Line type="monotone" dataKey="taps" stroke="#a3a3a3" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </section>
            </>
          )}

          {payload?.type === "stat" && payload.key === "views" && (
            <>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#aaaaaa] mb-2">
                  Clip views over time (30 days)
                </h3>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.viewsOverTime} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                      <XAxis dataKey="date" tick={{ fill: "#888", fontSize: 9 }} axisLine={{ stroke: "var(--border)" }} tickLine={false} />
                      <YAxis tick={{ fill: "#888", fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid var(--border)", borderRadius: "8px" }} labelStyle={{ color: "#fafafa" }} />
                      <Line type="monotone" dataKey="views" stroke="#a3a3a3" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </section>
            </>
          )}

          {payload?.type === "stat" && (payload.key === "conversionRate" || payload.key === "purchases") && (
            <>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#aaaaaa] mb-2">
                  Conversion funnel
                </h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.funnelData} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
                      <XAxis type="number" tick={{ fill: "#888", fontSize: 10 }} axisLine={{ stroke: "var(--border)" }} tickLine={false} />
                      <YAxis type="category" dataKey="stage" tick={{ fill: "#aaa", fontSize: 11 }} axisLine={false} tickLine={false} width={72} />
                      <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid var(--border)", borderRadius: "8px" }} />
                      <Bar dataKey="count" fill="#22c55e" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </section>
            </>
          )}

          {payload?.type === "chart-bar" && (
            <>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#aaaaaa] mb-2">
                  Day breakdown
                </h3>
                <p className="text-sm text-[#888] font-mono">
                  Full brand breakdown for {payload.day}
                </p>
              </section>
              <div className="h-px bg-[var(--border)]" />
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#aaaaaa] mb-2">
                  Hourly heatmap
                </h3>
                <p className="text-sm text-[#888] font-mono">
                  Peak: 12–2pm and 7–9pm ET; weekend lift in afternoon
                </p>
              </section>
              <div className="h-px bg-[var(--border)]" />
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#aaaaaa] mb-2">
                  Top queries / conversion funnel
                </h3>
                <p className="text-sm text-[#888] font-mono">
                  Viewed → Clicked → Purchased
                </p>
              </section>
            </>
          )}
          {payload?.type === "brand" && (
            <>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#aaaaaa] mb-2">
                  Brand
                </h3>
                <p className="text-sm text-[#fafafa] font-mono">
                  {payload.brandName}
                </p>
              </section>
              <div className="h-px bg-[var(--border)]" />
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#aaaaaa] mb-2">
                  Top 5 intercepted queries
                </h3>
                <p className="text-sm text-[#888] font-mono">
                  backpack under $200 · Canadian made backpack · Jansport alternative
                </p>
              </section>
              <div className="h-px bg-[var(--border)]" />
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#aaaaaa] mb-2">
                  Province distribution / AOV / Trend
                </h3>
                <p className="text-sm text-[#888] font-mono">
                  ON 38% · QC 22% · BC 20% · AOV $94 · +12% vs last week
                </p>
              </section>
            </>
          )}
          {payload?.type === "table-row" && (
            <>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#aaaaaa] mb-2">
                  Session
                </h3>
                <p className="text-sm text-[#fafafa] font-mono">
                  {payload.row.time} · {payload.row.query}
                </p>
                <p className="text-xs text-[#888] mt-1">
                  {payload.row.intercepted} · {payload.row.action} · {payload.row.province}
                </p>
              </section>
              <div className="h-px bg-[var(--border)]" />
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#aaaaaa] mb-2">
                  Device / Trigger URL / Journey
                </h3>
                <p className="text-sm text-[#888] font-mono">
                  iPhone 15 · thenorthface.com/en-ca/shop/equipment/backpacks · Viewed → Clicked → Purchased
                </p>
              </section>
            </>
          )}

          {payload?.type === "trigger" && (
            <>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#aaaaaa] mb-2">
                  Impression history (14 days)
                </h3>
                <div className="h-[120px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={Array.from({ length: 14 }, (_, i) => ({
                        day: `D${i + 1}`,
                        impressions: Math.max(0, Math.round(payload.impressions * (0.6 + 0.4 * (i / 13)) + (payload.trend === "up" ? i * 4 : -i * 2))),
                      }))}
                      margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                      <XAxis dataKey="day" tick={{ fill: "#888", fontSize: 9 }} axisLine={{ stroke: "var(--border)" }} tickLine={false} />
                      <YAxis tick={{ fill: "#888", fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid var(--border)", borderRadius: "8px" }} />
                      <Line type="monotone" dataKey="impressions" stroke="var(--accent)" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </section>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#aaaaaa] mb-2">
                  Conversion rate (this query)
                </h3>
                <p className="text-sm text-[#fafafa] font-mono tabular-nums">
                  ~{Math.round(8000 / Math.max(1, payload.impressions)) / 100}% (view → tap → purchase)
                </p>
              </section>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#aaaaaa] mb-2">
                  Top provinces / devices
                </h3>
                <p className="text-sm text-[#888] font-mono">
                  ON 38% · BC 24% · AB 18% · QC 12% · Other 8%
                </p>
                <p className="text-xs text-[#888] font-mono mt-1">
                  iPhone 62% · Android 28% · Other 10%
                </p>
              </section>
              <section className="flex gap-3">
                <button type="button" className="rounded-lg border border-[var(--border)] bg-white/5 px-4 py-2 text-sm font-medium text-[#fafafa] hover:bg-white/10 transition-colors">
                  Pause trigger
                </button>
                <button type="button" className="rounded-lg bg-[#22c55e] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-colors">
                  Boost trigger
                </button>
              </section>
            </>
          )}

          {payload?.type === "stat" && !["revenue", "stolen", "views", "conversionRate", "taps", "purchases"].includes(payload.key) && (
            <>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#aaaaaa] mb-2">
                  Sparkline trend (30 days)
                </h3>
                <p className="text-sm text-[#888] font-mono">
                  Daily views and conversions for the last 30 days
                </p>
              </section>
              <div className="h-px bg-[var(--border)]" />
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#aaaaaa] mb-2">
                  Breakdown by province
                </h3>
                <p className="text-sm text-[#888] font-mono">
                  ON 34% · BC 28% · AB 18% · QC 12% · Other 8%
                </p>
              </section>
              <div className="h-px bg-[var(--border)]" />
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#aaaaaa] mb-2">
                  Top 3 source brands
                </h3>
                <p className="text-sm text-[#888] font-mono">
                  Jansport 41% · Herschel 28% · North Face 18% · Others 13%
                </p>
              </section>
            </>
          )}

          <div className="h-px bg-[var(--border)]" />
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-2">
              Data source
            </h3>
            <pre className="text-xs text-[#7a7a7a] font-mono bg-black/20 p-3 rounded-lg overflow-x-auto whitespace-pre">
              {DATA_SOURCE_PLACEHOLDER}
            </pre>
          </section>
        </div>
      </aside>
    </>
  );
}

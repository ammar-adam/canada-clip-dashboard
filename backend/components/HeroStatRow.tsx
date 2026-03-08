"use client";

import { useMerchant } from "@/contexts/MerchantContext";
import { merchantData } from "@/lib/merchantData";

const STAT_KEYS = ["stolen", "views", "conversionRate", "revenue"] as const;
const LABELS: Record<(typeof STAT_KEYS)[number], string> = {
  stolen: "CUSTOMERS STOLEN",
  views: "CLIP VIEWS",
  conversionRate: "CONVERSION RATE",
  revenue: "REVENUE VIA CLIP",
};
const DELTAS: Record<(typeof STAT_KEYS)[number], string> = {
  stolen: "+18 this week",
  views: "+124 today",
  conversionRate: "+2.1% vs last week",
  revenue: "+$890 this week",
};

export function HeroStatRow({
  onStatClick,
}: { onStatClick?: (key: (typeof STAT_KEYS)[number]) => void } = {}) {
  const merchantId = useMerchant();
  const { stats } = merchantData[merchantId];

  const values: Record<(typeof STAT_KEYS)[number], string> = {
    stolen: stats.stolen.toLocaleString(),
    views: stats.views.toLocaleString(),
    conversionRate: `${stats.conversionRate}%`,
    revenue: `$${stats.revenue.toLocaleString()}`,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {STAT_KEYS.map((key) => (
        <button
          type="button"
          key={key}
          onClick={() => onStatClick?.(key)}
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 text-left transition-all duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)] hover:border-white/20 focus:outline-none focus:shadow-[0_0_0_1px_rgba(255,255,255,0.12)] cursor-pointer"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] block">
            {LABELS[key]}
          </span>
          <p className="mt-2 text-2xl sm:text-3xl font-semibold tabular-nums text-[var(--text-primary)] tracking-tight">
            {values[key]}
          </p>
          <p className="mt-1 text-sm text-[var(--text-secondary)] tabular-tight">
            {DELTAS[key]}
          </p>
        </button>
      ))}
    </div>
  );
}

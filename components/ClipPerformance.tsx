"use client";

import { Eye, MousePointer, ShoppingBag, DollarSign } from "lucide-react";
import { useMerchant } from "@/contexts/MerchantContext";
import { merchantData } from "@/lib/merchantData";

const metrics: { label: string; key: "views" | "taps" | "purchases" | "revenue"; icon: typeof Eye; delta: string }[] = [
  { label: "Views", key: "views", icon: Eye, delta: "+12% vs last week" },
  { label: "Taps", key: "taps", icon: MousePointer, delta: "+8% vs last week" },
  { label: "Purchases", key: "purchases", icon: ShoppingBag, delta: "+18% vs last week" },
  { label: "Revenue", key: "revenue", icon: DollarSign, delta: "+$890 vs last week" },
];

export function ClipPerformance({
  onStatClick,
}: { onStatClick?: (key: string) => void } = {}) {
  const merchantId = useMerchant();
  const { stats } = merchantData[merchantId];
  const values = {
    views: stats.views,
    taps: Math.round(stats.views * 0.25),
    purchases: stats.stolen,
    revenue: stats.revenue,
  };

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-shadow duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
      <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
        Clip performance
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((m) => (
          <button
            type="button"
            key={m.label}
            onClick={() => onStatClick?.(m.key)}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-left transition-all duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)] hover:border-white/20 cursor-pointer"
          >
            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <m.icon className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-widest font-mono">
                {m.label}
              </span>
            </div>
            <p className="mt-2 text-xl font-bold tabular-nums tracking-tight text-[var(--text-primary)]">
              {m.key === "revenue"
                ? `$${values[m.key].toLocaleString()}`
                : values[m.key].toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-[#22c55e] font-mono tabular-nums">
              {m.delta}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

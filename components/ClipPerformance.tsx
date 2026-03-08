"use client";

import { Eye, MousePointer, ShoppingBag, DollarSign } from "lucide-react";
import { useMerchant } from "@/contexts/MerchantContext";
import { merchantData } from "@/lib/merchantData";

const metrics = [
  { label: "Views", key: "views" as const, icon: Eye },
  { label: "Taps", key: "taps" as const, icon: MousePointer },
  { label: "Purchases", key: "purchases" as const, icon: ShoppingBag },
  { label: "Revenue", key: "revenue" as const, icon: DollarSign },
];

export function ClipPerformance() {
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
          <div
            key={m.label}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-shadow duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
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
          </div>
        ))}
      </div>
    </div>
  );
}

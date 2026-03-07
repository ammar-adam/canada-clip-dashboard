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
    <div className="rounded-xl border border-[#1A2E4A] bg-[#0B1628] p-6 hover:bg-[#0F1E36] hover:border-[#1E3A5C] transition-all duration-200">
      <h2 className="text-lg font-semibold text-[#E8EDF5] mb-4">
        Clip performance
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-[#1A2E4A] bg-[#0B1628] p-4 hover:bg-[#0F1E36] hover:border-[#1E3A5C] transition-all duration-200"
          >
            <div className="flex items-center gap-2 text-[#5A7A9E]">
              <m.icon className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-widest">
                {m.label}
              </span>
            </div>
            <p className="mt-2 text-xl font-bold tabular-nums text-[#E8EDF5]">
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

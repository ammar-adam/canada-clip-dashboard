"use client";

import { Eye, MousePointer, ShoppingBag, DollarSign } from "lucide-react";
import { CLIP_PERFORMANCE } from "@/lib/mock-data";

const metrics = [
  { label: "Views", value: CLIP_PERFORMANCE.views, icon: Eye },
  { label: "Taps", value: CLIP_PERFORMANCE.taps, icon: MousePointer },
  { label: "Purchases", value: CLIP_PERFORMANCE.purchases, icon: ShoppingBag },
  { label: "Revenue", value: `$${CLIP_PERFORMANCE.revenue.toLocaleString()}`, icon: DollarSign },
];

export function ClipPerformance() {
  return (
    <div className="rounded-xl border border-navy-border bg-navy-card p-6">
      <h2 className="font-display font-bold text-lg text-text-primary mb-4">
        Clip performance
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-lg border border-navy-border bg-navy/60 p-4"
          >
            <div className="flex items-center gap-2 text-text-secondary">
              <m.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{m.label}</span>
            </div>
            <p className="mt-2 font-display font-bold text-lg text-text-primary">
              {typeof m.value === "number" ? m.value.toLocaleString() : m.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

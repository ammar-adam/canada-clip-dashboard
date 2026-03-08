"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { useMerchant } from "@/contexts/MerchantContext";
import { merchantData } from "@/lib/merchantData";
import type { Trigger } from "@/lib/merchantData";

export function ActiveTriggers({
  onTriggerClick,
}: { onTriggerClick?: (trigger: Trigger) => void } = {}) {
  const merchantId = useMerchant();
  const { triggers } = merchantData[merchantId];

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-shadow duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
      <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
        Active triggers
      </h2>
      <p className="text-sm text-[var(--text-secondary)] mb-4 font-mono">
        Search queries that currently surface your clip
      </p>
      <ul className="space-y-0 divide-y divide-[var(--border)]">
        {triggers.map((t) => (
          <li
            key={t.query}
            role="button"
            tabIndex={0}
            onClick={() => onTriggerClick?.(t)}
            onKeyDown={(e) => e.key === "Enter" && onTriggerClick?.(t)}
            className="flex items-center justify-between px-4 py-3 transition-colors duration-150 hover:bg-[#2a2a2a] hover:border-l hover:border-l-white border-l border-l-transparent cursor-pointer"
          >
            <span className="font-mono text-sm text-[var(--accent)]">
              &quot;{t.query}&quot;
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--text-secondary)] tabular-nums font-mono">
                {t.impressions.toLocaleString()} impressions
              </span>
              {t.trend === "up" ? (
                <TrendingUp className="w-4 h-4 text-[#22c55e] shrink-0" aria-hidden />
              ) : (
                <TrendingDown className="w-4 h-4 text-[#ef4444] shrink-0" aria-hidden />
              )}
            </div>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="mt-4 w-full rounded-xl border border-dashed border-[var(--border)] bg-transparent py-3 text-sm font-medium text-[var(--text-secondary)] hover:border-[#888] hover:text-[var(--text-primary)] transition-colors duration-150 cursor-pointer"
      >
        + Add trigger
      </button>
    </div>
  );
}

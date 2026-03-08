"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { useMerchant } from "@/contexts/MerchantContext";
import { merchantData } from "@/lib/merchantData";

export function ActiveTriggers() {
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
            className="flex items-center justify-between px-4 py-3 transition-colors duration-150 hover:bg-[#ffffff08] hover:border-l hover:border-l-white border-l border-l-transparent"
          >
            <span className="font-mono text-sm text-[var(--accent)]">
              &quot;{t.query}&quot;
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--text-secondary)] tabular-nums font-mono">
                {t.impressions.toLocaleString()} impressions
              </span>
              {t.trend === "up" ? (
                <TrendingUp className="w-4 h-4 text-[var(--accent)] shrink-0" />
              ) : (
                <TrendingDown className="w-4 h-4 text-[var(--text-secondary)] shrink-0" />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

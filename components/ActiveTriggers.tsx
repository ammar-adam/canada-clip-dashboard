"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { useMerchant } from "@/contexts/MerchantContext";
import { merchantData } from "@/lib/merchantData";

export function ActiveTriggers() {
  const merchantId = useMerchant();
  const { triggers } = merchantData[merchantId];

  return (
    <div className="rounded-xl border border-[#1A2E4A] bg-[#0B1628] p-6 hover:bg-[#0F1E36] hover:border-[#1E3A5C] transition-all duration-200">
      <h2 className="text-lg font-semibold text-[#E8EDF5] mb-1">
        Active triggers
      </h2>
      <p className="text-sm text-[#5A7A9E] mb-4">
        Search queries that currently surface your clip
      </p>
      <ul className="space-y-0 divide-y divide-[#1A2E4A]">
        {triggers.map((t) => (
          <li
            key={t.query}
            className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#0F1E36] transition-colors"
          >
            <span className="font-mono text-sm text-[#5A9ED4]">
              &quot;{t.query}&quot;
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#5A7A9E] tabular-nums">
                {t.impressions.toLocaleString()} impressions
              </span>
              {t.trend === "up" ? (
                <TrendingUp className="w-4 h-4 text-[#0EA472] shrink-0" />
              ) : (
                <TrendingDown className="w-4 h-4 text-[#D4930A] shrink-0" />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

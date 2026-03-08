"use client";

import { useMerchant } from "@/contexts/MerchantContext";
import { merchantData } from "@/lib/merchantData";

export function CompetitorBreakdown({
  onBrandClick,
}: { onBrandClick?: (brandName: string) => void } = {}) {
  const merchantId = useMerchant();
  const { competitors } = merchantData[merchantId];
  const maxCount = Math.max(...competitors.map((c) => c.count), 1);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-shadow duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
      <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
        Who you&apos;re stealing from
      </h2>
      <p className="text-sm text-[var(--text-secondary)] mb-4 font-mono">
        Customer count by intercepted brand
      </p>
      <div className="space-y-4">
        {competitors.map((row) => (
          <button
            type="button"
            key={row.name}
            onClick={() => onBrandClick?.(row.name)}
            className="flex items-center gap-3 rounded-lg px-3 py-2 w-full text-left transition-colors duration-150 hover:bg-[#ffffff08] hover:border-l hover:border-l-white border-l border-l-transparent focus:outline-none"
          >
            <span className="w-24 text-sm text-[var(--text-primary)] shrink-0 font-mono lowercase">
              {row.name.toLowerCase()}
            </span>
            <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300 bg-white"
                style={{
                  width: `${(row.count / maxCount) * 100}%`,
                  opacity: 0.6,
                }}
              />
            </div>
            <span className="w-20 text-right text-sm text-[var(--text-secondary)] tabular-nums shrink-0 font-mono">
              {row.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

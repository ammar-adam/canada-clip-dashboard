"use client";

import { useMerchant } from "@/contexts/MerchantContext";
import { merchantData } from "@/lib/merchantData";

export function CompetitorBreakdown() {
  const merchantId = useMerchant();
  const { competitors } = merchantData[merchantId];
  const maxCount = Math.max(...competitors.map((c) => c.count), 1);

  return (
    <div className="rounded-xl border border-[#1A2E4A] bg-[#0B1628] p-6 hover:bg-[#0F1E36] hover:border-[#1E3A5C] transition-all duration-200">
      <h2 className="text-lg font-semibold text-[#E8EDF5] mb-1">
        Who you&apos;re stealing from
      </h2>
      <p className="text-sm text-[#5A7A9E] mb-4">Customer count by intercepted brand</p>
      <div className="space-y-4">
        {competitors.map((row) => (
          <div
            key={row.name}
            className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-[#0F1E36]"
          >
            <span className="w-24 text-sm text-[#E8EDF5] shrink-0">{row.name}</span>
            <div className="flex-1 h-2 rounded-full bg-[#132040] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${(row.count / maxCount) * 100}%`,
                  backgroundColor: row.color,
                }}
              />
            </div>
            <span className="w-20 text-right text-sm text-[#5A7A9E] tabular-nums shrink-0">
              {row.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

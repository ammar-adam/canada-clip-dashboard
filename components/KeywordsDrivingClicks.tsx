"use client";

import { useMerchant } from "@/contexts/MerchantContext";
import { merchantData } from "@/lib/merchantData";
import type { KeywordMetric } from "@/lib/merchantData";

export function KeywordsDrivingClicks({ selectedProduct }: { selectedProduct: string }) {
  const merchantId = useMerchant();
  const data = merchantData[merchantId];
  const keywords: KeywordMetric[] =
    data.keywords[selectedProduct] ??
    Object.values(data.keywords)[0] ??
    [];
  const topKeyword = keywords.length ? keywords.reduce((a, b) => (a.purchases >= b.purchases ? a : b)).word : "";

  return (
    <div className="rounded-xl border border-[#1A2E4A] bg-[#0B1628] p-6 hover:bg-[#0F1E36] hover:border-[#1E3A5C] transition-all duration-200">
      <h2 className="text-lg font-semibold text-[#E8EDF5]">
        Keywords driving performance on this product
      </h2>
      <p className="text-sm text-[#5A7A9E] mt-0.5">
        From App Clip searches — last 30 days
      </p>
      <div className="flex flex-wrap gap-3 mt-4">
        {keywords.map((k) => (
          <div
            key={k.word}
            className="rounded-xl border border-[#1A2E4A] bg-[#0B1628] p-4 min-w-[140px] hover:bg-[#0F1E36] hover:border-[#1E3A5C] transition-all duration-200"
          >
            <p className="text-sm font-mono font-bold text-[#5A9ED4] mb-3">
              &quot;{k.word}&quot;
            </p>
            <div className="space-y-1.5 text-xs">
              <p className="text-[#5A7A9E]">👁 Views: {k.views.toLocaleString()}</p>
              <p className="text-[#D4930A]">👆 Clicks: {k.clicks.toLocaleString()}</p>
              <p className="text-[#0EA472]">💰 Purchases: {k.purchases.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
      {topKeyword && (
        <div className="mt-4 rounded-lg border border-[#1A3A5C] bg-[#051525] p-3 text-sm text-[#5A7A9E]">
          💡 &quot;{topKeyword}&quot; drives the most purchases. Consider featuring it in your product title and first sentence.
        </div>
      )}
    </div>
  );
}

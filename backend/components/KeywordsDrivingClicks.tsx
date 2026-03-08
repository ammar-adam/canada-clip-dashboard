"use client";

import { useMerchant } from "@/contexts/MerchantContext";
import { merchantData } from "@/lib/merchantData";
import type { KeywordMetric } from "@/lib/merchantData";

export function KeywordsDrivingClicks({
  selectedProduct,
  onKeywordClick,
}: {
  selectedProduct: string;
  onKeywordClick?: (keyword: KeywordMetric) => void;
}) {
  const merchantId = useMerchant();
  const data = merchantData[merchantId];
  const keywords: KeywordMetric[] =
    data.keywords[selectedProduct] ??
    Object.values(data.keywords)[0] ??
    [];
  const topKeyword = keywords.length ? keywords.reduce((a, b) => (a.purchases >= b.purchases ? a : b)).word : "";

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-shadow duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
      <h2 className="text-lg font-semibold text-[var(--text-primary)]">
        Keywords driving performance on this product
      </h2>
      <p className="text-sm text-[var(--text-secondary)] mt-0.5 font-mono">
        From App Clip searches — last 30 days
      </p>
      <div className="flex flex-wrap gap-3 mt-4">
        {keywords.map((k) => (
          <button
            type="button"
            key={k.word}
            onClick={() => onKeywordClick?.(k)}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 min-w-[140px] text-left transition-all duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)] hover:border-[var(--brand-blue-muted)] cursor-pointer"
          >
            <p className="text-sm font-mono font-bold text-[var(--brand-blue-light)] mb-3">
              &quot;{k.word}&quot;
            </p>
            <div className="space-y-1.5 text-xs font-mono tabular-tight">
              <p className="text-[var(--text-secondary)]">
                Views: {k.views.toLocaleString()}
              </p>
              <p className="text-[var(--text-secondary)]">
                Clicks: {k.clicks.toLocaleString()}
              </p>
              <p className="text-[var(--text-primary)]">
                Purchases: {k.purchases.toLocaleString()}
              </p>
            </div>
          </button>
        ))}
      </div>
      {topKeyword && (
        <div className="mt-4 rounded-lg border border-[var(--border)] bg-black/20 p-3 text-sm text-[var(--text-secondary)] font-mono">
          💡 &quot;{topKeyword}&quot; drives the most purchases. Consider featuring it in your product title and first sentence.
        </div>
      )}
    </div>
  );
}

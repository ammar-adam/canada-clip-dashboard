"use client";

import { MERCHANT } from "@/lib/mock-data";

export function ClipPreviewMockup() {
  return (
    <div className="rounded-xl border border-navy-border bg-navy-card p-6">
      <h2 className="font-display font-bold text-lg text-text-primary mb-4">
        Clip preview
      </h2>
      <p className="text-sm text-text-secondary mb-6">
        What consumers see when your clip is triggered
      </p>
      <div className="flex justify-center">
        <div className="relative w-[280px] rounded-[2.5rem] border-4 border-navy-border bg-navy p-4 shadow-xl">
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-1.5 rounded-full bg-navy-border" />
          <div className="mt-6 rounded-2xl bg-navy-card border border-navy-border overflow-hidden">
            <div className="p-3 border-b border-navy-border flex items-center gap-2">
              <span className="text-accent-red font-bold">🍁</span>
              <span className="font-display font-semibold text-sm text-text-primary">
                Canadian alternatives
              </span>
            </div>
            <div className="p-3 space-y-2">
              <div className="rounded-lg border border-accent-green/30 bg-accent-green/10 p-3">
                <p className="font-display font-semibold text-sm text-text-primary">
                  {MERCHANT.name}
                </p>
                <p className="text-xs text-text-secondary mt-0.5">
                  {MERCHANT.product} · {MERCHANT.priceRange}
                </p>
                <p className="text-xs text-accent-green mt-1">Canadian Verified</p>
              </div>
              <div className="rounded-lg border border-navy-border p-3 opacity-70">
                <p className="font-medium text-sm text-text-secondary">
                  Other options
                </p>
                <p className="text-xs text-text-secondary">2 more Canadian brands</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

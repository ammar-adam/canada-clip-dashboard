"use client";

import { useState } from "react";
import Image from "next/image";
import { Compass, Paperclip } from "lucide-react";
import { useMerchant } from "@/contexts/MerchantContext";
import { merchantData } from "@/lib/merchantData";

function MapleLeafIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      width={12}
      height={12}
      aria-hidden
    >
      <path d="M12 2C8 8 4 10 4 14c0 3.5 2.5 6 8 8 5.5-2 8-4.5 8-8 0-4-4-6-8-12z" />
    </svg>
  );
}

export function ClipPreviewMockup() {
  const merchantId = useMerchant();
  const data = merchantData[merchantId];
  const { image, productName, price, sourceDomain, triggerUrl } = data.clipPreview;
  const [imageError, setImageError] = useState(false);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-shadow duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
      <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
        Clip preview
      </h2>
      <p className="text-sm text-[var(--text-secondary)] mb-6 font-mono">
        What consumers see when your clip is triggered
      </p>

      <div className="max-w-sm mx-auto space-y-4">
        <p className="text-xs text-[#aaaaaa] font-mono">
          Source: {sourceDomain}
        </p>

        {/* Flat App Clip card — no phone chrome */}
        <div
          className="rounded-2xl bg-white border border-[#e5e7eb] overflow-hidden shadow-lg"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.12)" }}
        >
          <div className="p-4">
            <div className="relative w-full aspect-square max-h-[180px] rounded-xl bg-[#f5f5f5] overflow-hidden mx-auto">
              {imageError ? (
                <div className="absolute inset-0 flex items-center justify-center bg-[#f5f5f5] text-[#6b7280] text-sm font-mono">
                  Product
                </div>
              ) : (
                <Image
                  src={image}
                  alt={productName}
                  fill
                  className="object-cover"
                  sizes="200px"
                  onError={() => setImageError(true)}
                />
              )}
            </div>
            <p className="text-base font-bold text-[#171717] mt-3 text-center">
              {productName}
            </p>
            <div className="flex items-center justify-center gap-2 mt-1 flex-wrap">
              <span className="text-sm text-[#6b7280]">{data.business}</span>
              <span className="inline-flex items-center gap-0.5 rounded-full border border-[var(--brand-red)] bg-[var(--brand-red-muted)] px-2 py-0.5 text-xs font-medium text-[var(--brand-red)]">
                <MapleLeafIcon className="text-[#dc2626]" />
                Local
              </span>
            </div>
            <p className="text-base font-bold text-[#171717] mt-2 text-center tabular-nums">
              {price}
            </p>
            <button
              type="button"
              className="mt-4 w-full rounded-xl bg-[var(--brand-red)] flex items-center justify-center gap-2 py-3 text-sm font-bold text-white"
            >
              <Compass className="w-4 h-4" strokeWidth={2.5} />
              Visit Store
            </button>
          </div>
        </div>

        {/* App Clip Preview banner */}
        <div className="rounded-2xl bg-white border border-[#e5e7eb] p-3 flex items-center gap-3 shadow-sm">
          <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#007AFF] flex items-center justify-center">
            <Paperclip className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#171717]">App Clip Preview</p>
            <p className="text-[10px] text-[#6b7280]">Get the full app experience</p>
          </div>
          <button
            type="button"
            className="flex-shrink-0 rounded-lg bg-[#007AFF] px-3 py-1.5 text-xs font-semibold text-white"
          >
            GET
          </button>
        </div>
      </div>
    </div>
  );
}

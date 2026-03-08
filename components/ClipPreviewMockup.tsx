"use client";

import { useState } from "react";
import Image from "next/image";
import { Compass, Paperclip } from "lucide-react";
import { useMerchant } from "@/contexts/MerchantContext";
import { merchantData } from "@/lib/merchantData";
import type { MerchantId } from "@/lib/merchantData";

const FALLBACK_IMAGES: Record<MerchantId, string> = {
  backpack: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200",
  streetwear: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200",
  electronics: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200",
  shawarma: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=200",
};

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
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-shadow duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
      <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
        Clip preview
      </h2>
      <p className="text-sm text-[var(--text-secondary)] mb-6 font-mono">
        What consumers see when your clip is triggered
      </p>
      <div className="flex justify-center">
        <div
          className="relative w-[280px] rounded-[44px] border-2 border-[#2A2A2A] bg-[#1A1A1A] overflow-hidden"
          style={{
            boxShadow:
              "0 0 60px rgba(200,16,46,0.15), 0 24px 48px rgba(0,0,0,0.6)",
            aspectRatio: "9/19.5",
          }}
        >
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-6 rounded-full bg-[#3a3a3a] z-10" />
          <div className="absolute right-0 top-[100px] w-1 rounded-l bg-[#2A2A2A] h-8" />
          <div className="absolute right-0 top-[140px] w-1 rounded-l bg-[#2A2A2A] h-14" />
          <div className="absolute right-0 top-[200px] w-1 rounded-l bg-[#2A2A2A] h-14" />
          <div className="absolute inset-[6px] rounded-[40px] overflow-hidden bg-[#f2f2f2] flex flex-col">
            {/* Header */}
            <div className="px-4 pt-6 pb-2 bg-white">
              <h3 className="text-base font-bold text-[#171717]">Canadian Alternatives</h3>
              <p className="text-xs text-[#6b7280] mt-0.5">Source: {sourceDomain}</p>
              <div className="flex gap-2 mt-3">
                <input
                  type="text"
                  readOnly
                  value={triggerUrl}
                  className="flex-1 min-w-0 rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-[10px] text-[#374151] truncate"
                />
                <button
                  type="button"
                  className="flex-shrink-0 rounded-lg bg-[#007AFF] px-3 py-2 text-xs font-medium text-white"
                >
                  Find
                </button>
              </div>
            </div>

            {/* Product card */}
            <div className="flex-1 mx-3 mt-3 p-4 rounded-2xl bg-[#e5e7eb] flex flex-col min-h-0">
              <div className="relative w-full aspect-square max-h-[120px] rounded-xl bg-white/80 overflow-hidden mx-auto">
                <Image
                  src={imgSrc}
                  alt={productName}
                  fill
                  className="object-contain p-2"
                  sizes="160px"
                  onError={() => setImgSrc(FALLBACK_IMAGES[merchantId])}
                />
              </div>
              <p className="text-sm font-bold text-[#171717] mt-2 text-center">{productName}</p>
              <div className="flex items-center justify-center gap-1.5 mt-1 flex-wrap">
                <span className="text-xs text-[#6b7280]">{data.business}</span>
                <span className="inline-flex items-center gap-0.5 rounded-full border border-white bg-[#22c55e] px-2 py-0.5 text-[10px] font-medium text-white">
                  <MapleLeafIcon className="text-[#dc2626]" />
                  Local
                </span>
              </div>
              <p className="text-sm font-bold text-[#171717] mt-1 text-center tabular-nums">{price}</p>
              <button
                type="button"
                className="mt-3 w-full rounded-xl bg-[#C8102E] flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-white"
              >
                <Compass className="w-4 h-4" strokeWidth={2.5} />
                Visit Store
              </button>
            </div>

            {/* App Clip Preview banner */}
            <div className="mx-3 mb-3 p-3 rounded-2xl bg-white border border-[#e5e7eb] flex items-center gap-3 shadow-sm">
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
      </div>
    </div>
  );
}

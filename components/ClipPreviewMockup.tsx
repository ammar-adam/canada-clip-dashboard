"use client";

import { useState } from "react";
import Image from "next/image";
import { useMerchant } from "@/contexts/MerchantContext";
import { merchantData } from "@/lib/merchantData";
import type { MerchantId } from "@/lib/merchantData";

const FALLBACK_IMAGES: Record<MerchantId, string> = {
  backpack: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200",
  streetwear: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200",
  electronics: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200",
  shawarma: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=200",
};

export function ClipPreviewMockup() {
  const merchantId = useMerchant();
  const data = merchantData[merchantId];
  const { image, productName, price } = data.clipPreview;
  const [imgSrc, setImgSrc] = useState(image);
  const [engravingOn, setEngravingOn] = useState(false);
  const [engravingText, setEngravingText] = useState("");

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
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-6 rounded-full bg-black z-10" />
          <div className="absolute right-0 top-[100px] w-1 rounded-l bg-[#2A2A2A] h-8" />
          <div className="absolute right-0 top-[140px] w-1 rounded-l bg-[#2A2A2A] h-14" />
          <div className="absolute right-0 top-[200px] w-1 rounded-l bg-[#2A2A2A] h-14" />
          <div className="absolute inset-[6px] rounded-[40px] overflow-hidden bg-[#050C1A] flex flex-col">
            <div className="flex justify-center pt-2">
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-[var(--text-secondary)] font-mono">
                App Clip
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 pt-2 pb-3 border-b border-[var(--border)]">
              <span className="text-[var(--accent)]">🍁</span>
              <span className="text-sm font-semibold text-[var(--text-primary)]">
                Canadian alternatives
              </span>
            </div>
            <div className="mx-3 mt-2 p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
              <div className="relative w-full aspect-square rounded-lg bg-black/30 overflow-hidden mb-2">
                <Image
                  src={imgSrc}
                  alt={productName}
                  fill
                  className="object-cover"
                  sizes="200px"
                  onError={() => setImgSrc(FALLBACK_IMAGES[merchantId])}
                />
              </div>
              <p className="text-xs font-semibold text-[var(--text-primary)]">{productName}</p>
              <p className="text-[10px] text-[var(--text-secondary)] font-mono">
                {data.business} · {data.province}
              </p>
              <p className="text-sm font-bold tabular-nums text-[var(--text-primary)] mt-1">{price}</p>
              <span className="inline-flex items-center gap-0.5 mt-1 text-[10px] text-[var(--accent)] bg-[var(--accent)]/10 rounded-full px-2 py-0.5 border border-[var(--accent)]/30 font-mono">
                Canadian Verified 🍁
              </span>
            </div>
            <div className="mx-3 mt-2 p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
              <p className="text-[9px] uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-mono">
                Customize
              </p>
              <div className="flex gap-1 mb-2">
                {["#8B6914", "#1A1A1A", "#2D5A27", "#C4A882", "#C8102E"].map(
                  (c, i) => (
                    <div
                      key={c}
                      className="w-5 h-5 rounded-full border-2 flex-shrink-0"
                      style={{
                        backgroundColor: c,
                        borderColor: i === 1 ? "var(--accent)" : "var(--border)",
                        boxShadow: i === 1 ? "0 0 0 2px var(--accent)" : undefined,
                      }}
                    />
                  )
                )}
              </div>
              <div className="flex gap-1 mb-2">
                {(["S", "M", "L"] as const).map((size) => (
                  <span
                    key={size}
                    className={`text-[10px] px-3 py-1 rounded-md border font-mono ${
                      size === "M"
                        ? "bg-[var(--accent)] border-[var(--accent)] text-[var(--bg)]"
                        : "border-[var(--border)] text-[var(--text-secondary)]"
                    }`}
                  >
                    {size}
                  </span>
                ))}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[var(--text-secondary)] font-mono">Add engraving</span>
                  <button
                    type="button"
                    onClick={() => setEngravingOn((v) => !v)}
                    className="w-8 h-4 rounded-full p-0.5 transition-colors duration-150"
                    style={{
                      backgroundColor: engravingOn ? "var(--accent)" : "var(--border)",
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full bg-[var(--text-primary)] transition-transform duration-150"
                      style={{ transform: engravingOn ? "translateX(18px)" : "translateX(2px)" }}
                    />
                  </button>
                </div>
                {engravingOn && (
                  <input
                    type="text"
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value)}
                    placeholder="Engraving text..."
                    className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] text-[10px] px-2 py-1.5 font-mono focus:border-[var(--accent)] focus:outline-none placeholder:text-[var(--text-secondary)]"
                  />
                )}
              </div>
            </div>
            <div className="mt-auto mx-3 mb-3">
              <button
                type="button"
                className="w-full rounded-xl bg-[var(--accent)] text-[var(--bg)] text-xs font-semibold py-2 text-center border border-[var(--border)] transition-colors duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
              >
                Visit Store →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

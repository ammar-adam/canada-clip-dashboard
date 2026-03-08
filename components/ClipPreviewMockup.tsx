"use client";

import { useState } from "react";
import Image from "next/image";
import { useMerchant } from "@/contexts/MerchantContext";
import { merchantData } from "@/lib/merchantData";

export function ClipPreviewMockup() {
  const merchantId = useMerchant();
  const data = merchantData[merchantId];
  const { image, productName, price } = data.clipPreview;
  const [engravingOn, setEngravingOn] = useState(false);
  const [engravingText, setEngravingText] = useState("");

  return (
    <div className="rounded-xl border border-[#1A2E4A] bg-[#0B1628] p-6">
      <h2 className="text-lg font-semibold text-[#E8EDF5] mb-1">
        Clip preview
      </h2>
      <p className="text-sm text-[#5A7A9E] mb-6">
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
              <span className="rounded-full bg-[#5A7A9E]/20 px-2 py-0.5 text-[10px] text-[#5A7A9E]">
                App Clip
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 pt-2 pb-3 border-b border-[#1A2E4A]">
              <span className="text-[#C8102E]">🍁</span>
              <span className="text-sm font-semibold text-[#E8EDF5]">
                Canadian alternatives
              </span>
            </div>
            <div className="mx-3 mt-2 p-3 rounded-xl bg-[#0B1628] border border-[#1A2E4A]">
              <div className="relative w-full aspect-square rounded-lg bg-[#1A2E4A] overflow-hidden mb-2">
                <Image
                  src={image}
                  alt={productName}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
              <p className="text-xs font-semibold text-[#E8EDF5]">{productName}</p>
              <p className="text-[10px] text-[#5A7A9E]">
                {data.business} · {data.province}
              </p>
              <p className="text-sm font-bold text-[#E8EDF5] mt-1">{price}</p>
              <span className="inline-flex items-center gap-0.5 mt-1 text-[10px] text-[#0EA472] bg-[#051A12] rounded-full px-2 py-0.5 border border-[#0EA472]/30">
                Canadian Verified 🍁
              </span>
            </div>
            <div className="mx-3 mt-2 p-3 rounded-xl bg-[#0B1628] border border-[#1A2E4A]">
              <p className="text-[9px] uppercase tracking-wider text-[#5A7A9E] mb-2">
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
                        borderColor: i === 1 ? "#C8102E" : "#0B1628",
                        boxShadow: i === 1 ? "0 0 0 2px #C8102E" : undefined,
                      }}
                    />
                  )
                )}
              </div>
              <div className="flex gap-1 mb-2">
                {(["S", "M", "L"] as const).map((size) => (
                  <span
                    key={size}
                    className={`text-[10px] px-3 py-1 rounded-md border ${
                      size === "M"
                        ? "bg-[#C8102E] border-[#C8102E] text-white"
                        : "border-[#1A2E4A] text-[#5A7A9E]"
                    }`}
                  >
                    {size}
                  </span>
                ))}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#5A7A9E]">Add engraving</span>
                  <button
                    type="button"
                    onClick={() => setEngravingOn((v) => !v)}
                    className="w-8 h-4 rounded-full p-0.5 transition-colors"
                    style={{
                      backgroundColor: engravingOn ? "#C8102E" : "#1A2E4A",
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full bg-[#E8EDF5] transition-transform"
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
                    className="mt-2 w-full rounded-lg border border-[#1A2E4A] bg-[#0B1628] text-[#E8EDF5] text-[10px] px-2 py-1.5 focus:border-[#C8102E] focus:outline-none"
                  />
                )}
              </div>
            </div>
            <div className="mt-auto mx-3 mb-3">
              <button
                type="button"
                className="w-full rounded-xl bg-[#C8102E] hover:bg-[#0F1E36] text-white text-xs font-semibold py-2 text-center border border-[#1A2E4A]"
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

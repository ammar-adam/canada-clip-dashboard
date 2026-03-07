"use client";

import { useEffect, useState } from "react";
import type { GeoSuggestion } from "@/app/api/geo/route";

export function GeoSuggestionsPanel({
  suggestions,
  loaded,
}: {
  suggestions: GeoSuggestion[];
  loaded: boolean;
}) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!loaded || suggestions.length === 0) return;
    const delays = suggestions.map((_, i) => (i + 1) * 400);
    const timers = delays.map((d) => setTimeout(() => setVisibleCount((c) => c + 1), d));
    return () => timers.forEach(clearTimeout);
  }, [loaded, suggestions.length]);

  const impactClass = (impact: string) => {
    if (impact === "High") return "bg-[#1A0810] text-[#C8102E] border-[#2A1020]";
    if (impact === "Medium") return "bg-[#1A1205] text-[#D4930A] border-[#2A1E08]";
    return "bg-[#0B1628] text-[#5A7A9E] border-[#1A2E4A]";
  };

  return (
    <div className="space-y-4">
      {suggestions.slice(0, visibleCount).map((s, i) => (
        <div
          key={i}
          className="rounded-xl border border-[#1A2E4A] bg-[#0B1628] p-4 opacity-0 animate-[fadeIn_0.3s_ease-out_forwards] hover:bg-[#0F1E36] transition-all"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-[#E8EDF5]">{s.issue}</h3>
            <span
              className={`shrink-0 rounded border px-2 py-0.5 text-xs font-medium ${impactClass(
                s.impact
              )}`}
            >
              {s.impact}
            </span>
          </div>
          <p className="mt-1 text-xs text-[#5A7A9E]">{s.why}</p>
          <p className="mt-2 text-sm text-[#5A9ED4] font-mono bg-[#051525] rounded p-2 border border-[#1A2E4A]">
            {s.fix}
          </p>
        </div>
      ))}
    </div>
  );
}

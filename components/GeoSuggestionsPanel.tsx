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
    if (impact === "High") return "bg-white/10 text-[var(--text-primary)] border-[var(--border)]";
    if (impact === "Medium") return "bg-white/5 text-[var(--text-secondary)] border-[var(--border)]";
    return "bg-transparent text-[var(--text-secondary)] border-[var(--border)]";
  };

  return (
    <div className="space-y-4">
      {suggestions.slice(0, visibleCount).map((s, i) => (
        <div
          key={i}
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 opacity-0 animate-[fadeIn_0.3s_ease-out_forwards] transition-all duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              {s.issue}
            </h3>
            <span
              className={`shrink-0 rounded border px-2 py-0.5 text-xs font-medium font-mono uppercase ${impactClass(
                s.impact
              )}`}
            >
              {s.impact}
            </span>
          </div>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            {s.why}
          </p>
          <p className="mt-2 text-sm text-[var(--accent)] font-mono bg-black/20 rounded p-2 border border-[var(--border)]">
            {s.fix}
          </p>
        </div>
      ))}
    </div>
  );
}

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
    const timers = delays.map((delay, i) =>
      setTimeout(() => setVisibleCount((c) => c + 1), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [loaded, suggestions.length]);

  const impactBg = (impact: string) => {
    if (impact === "High") return "bg-accent-red/20 text-accent-red";
    if (impact === "Medium") return "bg-amber-500/20 text-amber-400";
    return "bg-text-secondary/20 text-text-secondary";
  };

  return (
    <div className="space-y-4">
      {suggestions.slice(0, visibleCount).map((s, i) => (
        <div
          key={i}
          className="rounded-lg border border-navy-border bg-navy-card p-4"
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-semibold text-text-primary">
              {s.issue}
            </h3>
            <span
              className={`shrink-0 rounded px-2 py-0.5 text-xs font-medium ${impactBg(
                s.impact
              )}`}
            >
              {s.impact}
            </span>
          </div>
          <p className="mt-2 text-sm text-text-secondary">{s.why}</p>
          <p className="mt-2 text-sm text-accent-green">
            <span className="text-text-secondary">Fix: </span>
            {s.fix}
          </p>
          <p className="mt-1 text-xs text-text-secondary">
            Keyword: <span className="text-text-primary">{s.keyword}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

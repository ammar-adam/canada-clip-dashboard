"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { ACTIVE_TRIGGERS } from "@/lib/mock-data";

export function ActiveTriggers() {
  return (
    <div className="rounded-xl border border-navy-border bg-navy-card p-6">
      <h2 className="font-display font-bold text-lg text-text-primary mb-4">
        Active triggers
      </h2>
      <p className="text-sm text-text-secondary mb-4">
        Search queries that currently surface your clip
      </p>
      <ul className="space-y-3">
        {ACTIVE_TRIGGERS.map((t) => (
          <li
            key={t.query}
            className="flex items-center justify-between py-2 px-3 rounded-lg bg-navy/60 border border-navy-border"
          >
            <span className="text-text-primary font-medium">&quot;{t.query}&quot;</span>
            <div className="flex items-center gap-2">
              <span className="text-text-secondary text-sm">
                {t.impressions.toLocaleString()} impressions
              </span>
              {t.trend === "up" ? (
                <TrendingUp className="w-4 h-4 text-accent-green" />
              ) : (
                <TrendingDown className="w-4 h-4 text-amber-400" />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

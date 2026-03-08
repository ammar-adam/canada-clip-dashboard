"use client";

import { useState, useCallback, useEffect } from "react";
import { ActiveTriggers } from "@/components/ActiveTriggers";
import { ClipPreviewMockup } from "@/components/ClipPreviewMockup";
import { ClipPerformance } from "@/components/ClipPerformance";
import { DetailPanel, type PanelPayload } from "@/components/DetailPanel";
import type { Trigger } from "@/lib/merchantData";

const STAT_LABELS: Record<string, string> = {
  views: "Clip Views",
  taps: "Taps",
  purchases: "Purchases",
  revenue: "Revenue via Clip",
};

function getBoostRemaining(endTime: number): number {
  const days = Math.ceil((endTime - Date.now()) / (24 * 60 * 60 * 1000));
  return Math.max(0, days);
}

export default function ClipPage() {
  const [panelPayload, setPanelPayload] = useState<PanelPayload>(null);
  const [pausedQueries, setPausedQueries] = useState<Set<string>>(new Set());
  const [boostedQueries, setBoostedQueries] = useState<Record<string, number>>({});
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const openPanel = useCallback((payload: PanelPayload) => {
    setPanelPayload(payload);
  }, []);

  const closePanel = useCallback(() => {
    setPanelPayload(null);
  }, []);

  const handlePauseTrigger = useCallback((query: string) => {
    setPausedQueries((prev) => {
      const next = new Set(prev);
      if (next.has(query)) {
        next.delete(query);
        setToast("Trigger resumed — your clip will surface again for this query");
      } else {
        next.add(query);
        setToast("Trigger paused — it will no longer surface your clip");
      }
      return next;
    });
    setPanelPayload((prev) =>
      prev && prev.type === "trigger" && prev.query === query
        ? { ...prev, isPaused: !prev.isPaused }
        : prev
    );
  }, []);

  const handleBoostTrigger = useCallback((query: string, duration: "24h" | "3d" | "7d") => {
    const hours = duration === "24h" ? 24 : duration === "3d" ? 72 : 168;
    const endTime = Date.now() + hours * 60 * 60 * 1000;
    const days = duration === "24h" ? 1 : duration === "3d" ? 3 : 7;
    setBoostedQueries((prev) => ({ ...prev, [query]: endTime }));
    const label = duration === "24h" ? "24 hours" : duration === "3d" ? "3 days" : "7 days";
    setToast(`Trigger boosted for ${label} — your clip will be prioritized for this query`);
    setPanelPayload((prev) =>
      prev && prev.type === "trigger" && prev.query === query ? { ...prev, boostRemaining: days } : prev
    );
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
          My Clip
        </h1>
        <p className="text-[var(--text-secondary)] mt-1 text-sm">
          Your active App Clip configuration and how it looks to consumers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ActiveTriggers
            pausedQueries={pausedQueries}
            onTriggerClick={(trigger: Trigger) =>
              openPanel({
                type: "trigger",
                query: trigger.query,
                impressions: trigger.impressions,
                trend: trigger.trend,
                isPaused: pausedQueries.has(trigger.query),
                boostRemaining: boostedQueries[trigger.query] ? getBoostRemaining(boostedQueries[trigger.query]) : 0,
              })
            }
          />
        </div>
        <div>
          <ClipPerformance
            onStatClick={(key) =>
              openPanel({
                type: "stat",
                key,
                label: STAT_LABELS[key] ?? key,
              })
            }
          />
        </div>
      </div>

      <ClipPreviewMockup />

      <DetailPanel
        open={panelPayload !== null}
        payload={panelPayload}
        onClose={closePanel}
        onPauseTrigger={handlePauseTrigger}
        onBoostTrigger={handleBoostTrigger}
      />

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg border border-[var(--brand-blue)] bg-[var(--surface)] text-[var(--brand-blue)] font-mono text-sm shadow-lg"
        >
          {toast}
        </div>
      )}
    </div>
  );
}

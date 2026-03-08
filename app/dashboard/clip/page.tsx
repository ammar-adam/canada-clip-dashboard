"use client";

import { useState, useCallback } from "react";
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

export default function ClipPage() {
  const [panelPayload, setPanelPayload] = useState<PanelPayload>(null);

  const openPanel = useCallback((payload: PanelPayload) => {
    setPanelPayload(payload);
  }, []);

  const closePanel = useCallback(() => {
    setPanelPayload(null);
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
            onTriggerClick={(trigger: Trigger) =>
              openPanel({
                type: "trigger",
                query: trigger.query,
                impressions: trigger.impressions,
                trend: trigger.trend,
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
      />
    </div>
  );
}

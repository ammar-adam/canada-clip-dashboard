"use client";

import { useState, useCallback } from "react";
import { HeroStatRow } from "@/components/HeroStatRow";
import { StolenCustomersChart } from "@/components/StolenCustomersChart";
import { CompetitorBreakdown } from "@/components/CompetitorBreakdown";
import { ActivityFeed } from "@/components/ActivityFeed";
import { DetailPanel, type PanelPayload } from "@/components/DetailPanel";

const STAT_LABELS: Record<string, string> = {
  stolen: "Customers Stolen",
  views: "Clip Views",
  conversionRate: "Conversion Rate",
  revenue: "Revenue via Clip",
};

export function DashboardClient() {
  const [panelPayload, setPanelPayload] = useState<PanelPayload>(null);

  const openPanel = useCallback((payload: PanelPayload) => {
    setPanelPayload(payload);
  }, []);

  const closePanel = useCallback(() => {
    setPanelPayload(null);
  }, []);

  return (
    <>
      <div className="animate-[fadeUp_300ms_ease-out]">
        <HeroStatRow
          onStatClick={(key) =>
            openPanel({
              type: "stat",
              key,
              label: STAT_LABELS[key] ?? key,
            })
          }
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[65%_1fr] gap-8 mb-8 animate-[fadeUp_300ms_ease-out]"
        style={{ animationDelay: "50ms", animationFillMode: "backwards" }}
      >
        <StolenCustomersChart
          onBarClick={(day) => openPanel({ type: "chart-bar", day })}
        />
        <CompetitorBreakdown
          onBrandClick={(brandName) =>
            openPanel({ type: "brand", brandName })
          }
        />
      </div>
      <div className="animate-[fadeUp_300ms_ease-out]"
        style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
      >
        <ActivityFeed
          onRowClick={(row) =>
            openPanel({
              type: "table-row",
              row: {
                time: row.time,
                query: row.query,
                intercepted: row.intercepted,
                action: row.action,
                province: row.province,
                journey: row.journey,
              },
            })
          }
        />
      </div>

      <DetailPanel
        open={panelPayload !== null}
        payload={panelPayload}
        onClose={closePanel}
      />
    </>
  );
}

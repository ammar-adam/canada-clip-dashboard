"use client";

import { useState, useEffect } from "react";
import { ACTIVITY_FEED, PROVINCE_FLAGS } from "@/lib/mock-data";

type ActivityRow = (typeof ACTIVITY_FEED)[0];

const DEMO_NEW_ROWS: ActivityRow[] = [
  { id: "n1", time: "Just now", query: "backpack under $200", intercepted: "Jansport.com", action: "Viewed", province: "ON" },
  { id: "n2", time: "1 min ago", query: "Canadian hiking pack", intercepted: "NorthFace.com", action: "Clicked", province: "BC" },
  { id: "n3", time: "30 sec ago", query: "Jansport alternative", intercepted: "Jansport.com", action: "Purchased", province: "QC" },
];

export function ActivityFeed() {
  const [rows, setRows] = useState<ActivityRow[]>(ACTIVITY_FEED.slice(0, 8));
  const [nextDemoIndex, setNextDemoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newRow = DEMO_NEW_ROWS[nextDemoIndex % DEMO_NEW_ROWS.length];
      setRows((prev) => [
        { ...newRow, id: `live-${Date.now()}` },
        ...prev.slice(0, 9),
      ]);
      setNextDemoIndex((i) => i + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, [nextDemoIndex]);

  const actionColor = (action: string) => {
    if (action === "Purchased") return "text-accent-green";
    if (action === "Clicked") return "text-amber-400";
    return "text-text-secondary";
  };

  return (
    <div className="rounded-xl border border-navy-border bg-navy-card p-6">
      <h2 className="font-display font-bold text-lg text-text-primary mb-4">
        Recent Clip Activity
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-text-secondary border-b border-navy-border">
              <th className="pb-3 font-medium">Time</th>
              <th className="pb-3 font-medium">Query</th>
              <th className="pb-3 font-medium">Intercepted</th>
              <th className="pb-3 font-medium">Action</th>
              <th className="pb-3 font-medium">Province</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.id}
                className={`border-b border-navy-border/70 ${
                  i === 0 ? "animate-pulse bg-accent-red/5" : ""
                }`}
              >
                <td className="py-3 text-text-secondary">{row.time}</td>
                <td className="py-3 text-text-primary">&quot;{row.query}&quot;</td>
                <td className="py-3 text-text-secondary">{row.intercepted}</td>
                <td className={`py-3 font-medium ${actionColor(row.action)}`}>
                  {row.action}
                </td>
                <td className="py-3 text-text-secondary">
                  {PROVINCE_FLAGS[row.province] ?? "🇨🇦"} {row.province}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

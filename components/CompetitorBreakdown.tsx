"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { COMPETITOR_BREAKDOWN } from "@/lib/mock-data";

export function CompetitorBreakdown() {
  return (
    <div className="rounded-xl border border-navy-border bg-navy-card p-6">
      <h2 className="font-display font-bold text-lg text-text-primary mb-4">
        Who you&apos;re stealing from
      </h2>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={COMPETITOR_BREAKDOWN}
            margin={{ top: 0, right: 24, left: 80, bottom: 0 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#9CA3AF"
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={70}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #1F2937",
                borderRadius: "8px",
              }}
              formatter={(value: number, _name: string, props: { payload?: { percent?: number } }) => [
                `${value} customers (${props.payload?.percent ?? 0}%)`,
                "Stolen",
              ]}
            />
            <Bar dataKey="customers" radius={[0, 4, 4, 0]} maxBarSize={28}>
              {COMPETITOR_BREAKDOWN.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

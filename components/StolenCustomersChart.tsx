"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { WEEKLY_STOLEN, COMPETITOR_BREAKDOWN } from "@/lib/mock-data";

const brandColors: Record<string, string> = {
  Jansport: "#FF6B6B",
  Herschel: "#4ECDC4",
  "North Face": "#45B7D1",
  Others: "#96CEB4",
};

export function StolenCustomersChart() {
  const data = WEEKLY_STOLEN.map((d) => ({
    ...d,
    fill: brandColors[d.brand] ?? "#96CEB4",
  }));

  return (
    <div className="rounded-xl border border-navy-border bg-navy-card p-6 mb-8">
      <h2 className="font-display font-bold text-lg text-text-primary mb-4">
        Customers stolen from big brands (last 7 days)
      </h2>
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 12, right: 12, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
            <XAxis
              dataKey="day"
              stroke="#9CA3AF"
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              axisLine={{ stroke: "#1F2937" }}
            />
            <YAxis
              stroke="#9CA3AF"
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              axisLine={{ stroke: "#1F2937" }}
              tickLine={{ stroke: "#1F2937" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #1F2937",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#F9FAFB" }}
              itemStyle={{ color: "#9CA3AF" }}
              formatter={(value: number, _name: string, props: { payload?: { brand?: string } }) => [
                `${value} stolen from ${props.payload?.brand ?? "—"}`,
                "Customers",
              ]}
              labelFormatter={(label) => `Day: ${label}`}
            />
            <Bar dataKey="stolen" name="Customers" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-navy-border">
        {COMPETITOR_BREAKDOWN.map((c) => (
          <span
            key={c.name}
            className="flex items-center gap-2 text-sm text-text-secondary"
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: c.color }}
            />
            {c.name}
          </span>
        ))}
      </div>
    </div>
  );
}

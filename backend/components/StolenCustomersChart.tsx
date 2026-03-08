"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useMerchant } from "@/contexts/MerchantContext";
import { merchantData } from "@/lib/merchantData";

const OPACITY_SCALE = [0.85, 0.6, 0.4, 0.2];

export function StolenCustomersChart({
  onBarClick,
}: { onBarClick?: (day: string) => void } = {}) {
  const merchantId = useMerchant();
  const { weeklyStolen } = merchantData[merchantId];
  const barKeys = weeklyStolen.length
    ? (Object.keys(weeklyStolen[0]).filter((k) => k !== "day") as string[])
    : [];

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 mb-8 transition-shadow duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
      <h2 className="text-lg font-semibold text-[var(--text-primary)]">
        Customers stolen from big brands
      </h2>
      <p className="text-sm text-[var(--text-secondary)] mt-0.5 font-mono uppercase">
        Last 4 weeks
      </p>
      <div className="h-[280px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={weeklyStolen}
            margin={{ top: 12, right: 12, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.06)"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{
                fill: "var(--text-secondary)",
                fontSize: 11,
                fontFamily: "var(--font-mono), monospace",
              }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <YAxis
              tick={{
                fill: "var(--text-secondary)",
                fontSize: 11,
                fontFamily: "var(--font-mono), monospace",
              }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "var(--text-primary)" }}
              itemStyle={{ color: "var(--text-secondary)", fontVariantNumeric: "tabular-nums" }}
            />
            <Legend
              wrapperStyle={{ paddingTop: "12px" }}
              formatter={(value) => (
                <span className="text-[var(--text-secondary)] text-xs font-mono lowercase">
                  {value}
                </span>
              )}
              iconType="square"
              iconSize={8}
            />
            {barKeys.map((key, i) => {
              const opacity = OPACITY_SCALE[Math.min(i, OPACITY_SCALE.length - 1)];
              return (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={`rgba(255,255,255,${opacity})`}
                  radius={[4, 4, 0, 0]}
                  name={key.toLowerCase()}
                  onClick={(data) => data?.day && onBarClick?.(data.day)}
                />
              );
            })}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

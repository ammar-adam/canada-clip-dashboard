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

const FALLBACK_COLORS: Record<string, string> = {
  Jansport: "#C8102E",
  Herschel: "#0EA472",
  "North Face": "#1E6FD4",
  Others: "#2E4A6B",
  Supreme: "#C8102E",
  Stussy: "#0EA472",
  Palace: "#1E6FD4",
  Anker: "#C8102E",
  Belkin: "#0EA472",
  Mophie: "#1E6FD4",
  Samsung: "#D4930A",
  REI: "#D4930A",
  MEC: "#2E4A6B",
  Carhartt: "#D4930A",
  "Nike SB": "#2E4A6B",
  "McDonald's": "#C8102E",
  Subway: "#0EA472",
  "Tim Hortons": "#1E6FD4",
  "Pita Pit": "#D4930A",
  Others: "#2E4A6B",
};

export function StolenCustomersChart() {
  const merchantId = useMerchant();
  const { weeklyStolen, competitors } = merchantData[merchantId];
  const colorMap: Record<string, string> = {};
  competitors.forEach((c) => {
    colorMap[c.name] = c.color;
  });
  const barKeys = weeklyStolen.length
    ? (Object.keys(weeklyStolen[0]).filter((k) => k !== "day") as string[])
    : [];

  return (
    <div className="rounded-xl border border-[#1A2E4A] bg-[#0B1628] p-6 mb-8 hover:bg-[#0F1E36] hover:border-[#1E3A5C] transition-all duration-200">
      <h2 className="text-lg font-semibold text-[#E8EDF5]">
        Customers stolen from big brands
      </h2>
      <p className="text-sm text-[#5A7A9E] mt-0.5">Last 7 days</p>
      <div className="h-[280px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={weeklyStolen}
            margin={{ top: 12, right: 12, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1A2E4A" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fill: "#5A7A9E", fontSize: 12 }}
              axisLine={{ stroke: "#1A2E4A" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#5A7A9E", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0F1E36",
                border: "1px solid #1A2E4A",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#E8EDF5" }}
              itemStyle={{ color: "#5A7A9E" }}
            />
            <Legend
              wrapperStyle={{ paddingTop: "12px" }}
              formatter={(value) => (
                <span className="text-[#5A7A9E] text-sm">{value}</span>
              )}
            />
            {barKeys.map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colorMap[key] ?? FALLBACK_COLORS[key] ?? "#2E4A6B"}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

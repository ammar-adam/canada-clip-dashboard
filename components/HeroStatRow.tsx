"use client";

import { Target, Eye, TrendingUp, DollarSign } from "lucide-react";
import { useMerchant } from "@/contexts/MerchantContext";
import { merchantData } from "@/lib/merchantData";

const iconMap = {
  target: Target,
  eye: Eye,
  "trending-up": TrendingUp,
  "dollar-sign": DollarSign,
} as const;

export function HeroStatRow() {
  const merchantId = useMerchant();
  const { stats } = merchantData[merchantId];

  const cards = [
    {
      label: "CUSTOMERS STOLEN",
      value: stats.stolen.toLocaleString(),
      delta: "+18 this week",
      color: "red" as const,
      icon: "target" as const,
      className: "bg-[#1A0A0C] border-[#2E1418] hover:bg-[#0F1E36] hover:border-[#1A2E4A]",
      valueClassName: "text-4xl font-bold tabular-nums text-[#C8102E]",
      deltaClassName: "text-[#C8102E]",
    },
    {
      label: "CLIP VIEWS",
      value: stats.views.toLocaleString(),
      delta: "+124 today",
      icon: "eye" as const,
      className: "rounded-xl border border-[#1A2E4A] bg-[#0B1628] hover:bg-[#0F1E36] hover:border-[#1E3A5C] transition-all duration-200",
      valueClassName: "text-4xl font-bold tabular-nums text-[#E8EDF5]",
      deltaClassName: "text-[#0EA472]",
    },
    {
      label: "CONVERSION RATE",
      value: `${stats.conversionRate}%`,
      delta: "+2.1% vs last week",
      icon: "trending-up" as const,
      className: "rounded-xl border border-[#1A2E4A] bg-[#0B1628] hover:bg-[#0F1E36] hover:border-[#1E3A5C] transition-all duration-200",
      valueClassName: "text-4xl font-bold tabular-nums text-[#E8EDF5]",
      deltaClassName: "text-[#0EA472]",
    },
    {
      label: "REVENUE VIA CLIP",
      value: `$${stats.revenue.toLocaleString()}`,
      delta: "+$890 this week",
      icon: "dollar-sign" as const,
      className: "rounded-xl border border-[#1A2E4A] bg-[#0B1628] hover:bg-[#0F1E36] hover:border-[#1E3A5C] transition-all duration-200",
      valueClassName: "text-4xl font-bold tabular-nums text-[#E8EDF5]",
      deltaClassName: "text-[#0EA472]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => {
        const Icon = iconMap[card.icon];
        return (
          <div
            key={card.label}
            className={`rounded-xl border p-6 transition-all duration-200 ${card.className}`}
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#5A7A9E]">
                {card.label}
              </span>
              <div className={`rounded-lg p-2 ${card.color === "red" ? "bg-[#C8102E]/20 text-[#C8102E]" : "bg-[#5A7A9E]/10 text-[#5A7A9E]"}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <p className={`mt-2 ${card.valueClassName}`}>{card.value}</p>
            <p className={`mt-1 flex items-center gap-1 text-sm ${card.deltaClassName}`}>
              <TrendingUp className="w-3.5 h-3.5 shrink-0" />
              {card.delta}
            </p>
          </div>
        );
      })}
    </div>
  );
}

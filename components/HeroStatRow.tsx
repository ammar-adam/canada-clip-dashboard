"use client";

import {
  Target,
  Eye,
  TrendingUp,
  DollarSign,
  LucideIcon,
} from "lucide-react";
import { HERO_STATS } from "@/lib/mock-data";

const iconMap: Record<string, LucideIcon> = {
  target: Target,
  eye: Eye,
  "trending-up": TrendingUp,
  "dollar-sign": DollarSign,
};

export function HeroStatRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {HERO_STATS.map((stat) => {
        const Icon = iconMap[stat.icon];
        const isRed = stat.color === "red";
        return (
          <div
            key={stat.label}
            className="rounded-xl border border-navy-border bg-navy-card p-6"
          >
            <div className="flex items-start justify-between">
              <span className="text-text-secondary text-sm font-medium">
                {stat.label}
              </span>
              {Icon && (
                <div
                  className={`p-2 rounded-lg ${
                    isRed ? "bg-accent-red/20 text-accent-red" : "bg-accent-green/20 text-accent-green"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              )}
            </div>
            <p className="mt-2 font-display font-bold text-2xl text-text-primary">
              {stat.value}
            </p>
            <p
              className={`mt-1 text-sm font-medium ${
                isRed ? "text-accent-red" : "text-accent-green"
              }`}
            >
              {stat.delta}
            </p>
          </div>
        );
      })}
    </div>
  );
}

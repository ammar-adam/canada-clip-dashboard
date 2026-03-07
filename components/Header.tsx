"use client";

import Link from "next/link";
import { MERCHANT } from "@/lib/mock-data";
import { DashboardNav } from "./DashboardNav";

export function Header() {
  return (
    <header className="border-b border-navy-border bg-navy-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3">
          <span className="font-display font-bold text-xl text-text-primary tracking-tight">
            CanadaClip
          </span>
          <span className="text-accent-red font-display font-bold">🍁</span>
        </Link>
        <div className="flex items-center gap-6">
          <span className="text-text-secondary text-sm font-medium">
            {MERCHANT.name}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-green/20 text-accent-green text-xs font-semibold px-3 py-1">
            🍁 Canadian Verified
          </span>
        </div>
      </div>
      <nav className="max-w-7xl mx-auto px-6 border-t border-navy-border/50">
        <DashboardNav />
      </nav>
    </header>
  );
}

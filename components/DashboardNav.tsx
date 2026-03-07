"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Map, Smartphone } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/geo", label: "GEO Optimizer", icon: Map },
  { href: "/dashboard/clip", label: "My Clip", icon: Smartphone },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <div className="flex gap-1">
      {links.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            data-active={isActive}
            className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-text-secondary hover:text-text-primary border-b-2 border-transparent hover:border-text-secondary/50 transition-colors data-[active]:text-text-primary data-[active]:border-accent-red"
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        );
      })}
    </div>
  );
}

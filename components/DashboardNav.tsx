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
    <nav className="flex gap-8">
      {links.map(({ href, label, icon: Icon }) => {
        const isActive =
          pathname === href ||
          (href !== "/dashboard" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 px-1 py-2 text-sm font-medium border-b-2 transition-colors ${
              isActive
                ? "text-[#E8EDF5] border-[#C8102E]"
                : "text-[#5A7A9E] border-transparent hover:text-[#E8EDF5]"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

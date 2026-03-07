import Link from "next/link";
import { auth0 } from "@/lib/auth0";
import { getMerchantFromEmail } from "@/lib/merchantData";
import { merchantData } from "@/lib/merchantData";
import { DashboardNav } from "./DashboardNav";

export async function Header() {
  const session = await auth0.getSession();
  const merchantId = getMerchantFromEmail(session?.user?.email ?? "");
  const merchant = merchantData[merchantId];

  return (
    <header className="sticky top-0 z-50 h-14 border-b border-[#1A2E4A] bg-[#050C1A] flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
          <span className="text-xl font-bold text-[#E8EDF5]">
            CanadaClip
          </span>
          <span className="text-[#C8102E]">🍁</span>
        </Link>
        <div className="absolute left-1/2 -translate-x-1/2">
          <DashboardNav />
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-sm text-[#E8EDF5]">{merchant.business}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0EA472]/15 text-[#0EA472] text-xs font-semibold px-3 py-1">
            🍁 Canadian Verified
          </span>
          <a
            href="/auth/logout"
            className="text-xs text-[#5A7A9E] hover:text-[#E8EDF5] border border-[#1A2E4A] rounded-lg px-3 py-1.5 transition-colors ml-3"
          >
            Sign out
          </a>
        </div>
      </div>
    </header>
  );
}

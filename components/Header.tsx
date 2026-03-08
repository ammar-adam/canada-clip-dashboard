import Link from "next/link";
import Image from "next/image";
import { auth0 } from "@/lib/auth0";
import { getMerchantFromEmail } from "@/lib/merchantData";
import { merchantData } from "@/lib/merchantData";
import { DashboardNav } from "./DashboardNav";

export async function Header() {
  const session = await auth0.getSession();
  const merchantId = getMerchantFromEmail(session?.user?.email ?? "");
  const merchant = merchantData[merchantId];

  return (
    <header className="sticky top-0 z-50 h-[52px] border-b border-[var(--border)] bg-[var(--surface)] flex items-center">
      <div className="max-w-[1600px] mx-auto px-8 w-full flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 shrink-0 transition-opacity duration-150 hover:opacity-90">
          <Image src="/logo.png" alt="CanadaClip" width={32} height={32} className="rounded-full object-contain" />
          <span className="text-[var(--text-primary)] font-semibold sr-only sm:not-sr-only">CanadaClip</span>
        </Link>
        <div className="absolute left-1/2 -translate-x-1/2">
          <DashboardNav />
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-sm text-[var(--text-primary)]">{merchant.business}</span>
          <span className="inline-flex items-center rounded-full bg-white/10 text-[var(--accent)] text-xs font-medium px-3 py-1 border border-white/10">
            Canadian Verified
          </span>
          <a
            href="/auth/logout"
            className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] rounded-lg px-3 py-1.5 transition-colors duration-150"
          >
            Sign out
          </a>
        </div>
      </div>
    </header>
  );
}

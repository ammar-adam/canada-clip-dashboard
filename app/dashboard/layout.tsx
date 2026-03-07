import { auth0 } from "@/lib/auth0";
import { getMerchantFromEmail } from "@/lib/merchantData";
import { MerchantProvider } from "@/contexts/MerchantContext";
import { Header } from "@/components/Header";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth0.getSession();
  if (!session) redirect("/auth/login");
  const merchantId = getMerchantFromEmail(session.user?.email ?? "");

  return (
    <MerchantProvider merchantId={merchantId}>
      <div className="min-h-screen bg-[var(--bg-base)]">
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
      </div>
    </MerchantProvider>
  );
}

import { Header } from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-navy">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}

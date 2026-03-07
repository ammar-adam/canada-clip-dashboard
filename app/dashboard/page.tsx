import { HeroStatRow } from "@/components/HeroStatRow";
import { StolenCustomersChart } from "@/components/StolenCustomersChart";
import { CompetitorBreakdown } from "@/components/CompetitorBreakdown";
import { ActivityFeed } from "@/components/ActivityFeed";

export default function DashboardPage() {
  return (
    <div>
      <HeroStatRow />
      <StolenCustomersChart />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <CompetitorBreakdown />
        </div>
        <div className="lg:col-span-3">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}

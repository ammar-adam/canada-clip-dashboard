import { ActiveTriggers } from "@/components/ActiveTriggers";
import { ClipPreviewMockup } from "@/components/ClipPreviewMockup";
import { ClipPerformance } from "@/components/ClipPerformance";

export default function ClipPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-2xl text-text-primary">
          My Clip
        </h1>
        <p className="text-text-secondary mt-1">
          Your active App Clip configuration and how it looks to consumers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ActiveTriggers />
        </div>
        <div>
          <ClipPerformance />
        </div>
      </div>

      <ClipPreviewMockup />
    </div>
  );
}

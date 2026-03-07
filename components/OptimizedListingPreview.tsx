"use client";

export function OptimizedListingPreview({
  before,
  after,
  loaded,
}: {
  before: string;
  after: string;
  loaded: boolean;
}) {
  if (!loaded) return null;

  // Simple before/after: before grey with strikethrough feel, after with green emphasis
  return (
    <div className="rounded-xl border border-navy-border bg-navy-card p-6">
      <h2 className="font-display font-bold text-lg text-text-primary mb-4">
        Before vs After
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
            Before
          </p>
          <p className="text-sm text-text-secondary leading-relaxed line-through decoration-text-secondary/60">
            {before}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-accent-green uppercase tracking-wider mb-2">
            After (optimized)
          </p>
          <p className="text-sm text-text-primary leading-relaxed">
            {after}
          </p>
        </div>
      </div>
    </div>
  );
}

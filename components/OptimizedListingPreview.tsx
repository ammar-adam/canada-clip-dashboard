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

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-shadow duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
      <h2 className="text-base font-semibold text-[var(--text-primary)] mb-4">
        Before vs After
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-mono">
            Before
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-through decoration-[var(--text-secondary)]/60 font-mono">
            {before}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--accent)] mb-2 font-mono">
            After (optimized)
          </p>
          <p className="text-sm text-[var(--text-primary)] leading-relaxed font-mono">
            {after}
          </p>
        </div>
      </div>
    </div>
  );
}

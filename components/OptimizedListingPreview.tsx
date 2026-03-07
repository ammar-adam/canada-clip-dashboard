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
    <div className="rounded-xl border border-[#1A2E4A] bg-[#0B1628] p-6">
      <h2 className="text-base font-semibold text-[#E8EDF5] mb-4">
        Before vs After
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-xs uppercase tracking-wider text-[#5A7A9E] mb-2">
            Before
          </p>
          <p className="text-sm text-[#5A7A9E] leading-relaxed line-through decoration-[#5A7A9E]/60">
            {before}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-[#0EA472] mb-2">
            After (optimized)
          </p>
          <p className="text-sm text-[#E8EDF5] leading-relaxed">{after}</p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Sparkles, ExternalLink } from "lucide-react";
import { useMerchant } from "@/contexts/MerchantContext";
import { merchantData } from "@/lib/merchantData";
import { KeywordsDrivingClicks } from "@/components/KeywordsDrivingClicks";
import { GeoScoreGauge } from "@/components/GeoScoreGauge";
import { GeoSuggestionsPanel } from "@/components/GeoSuggestionsPanel";
import { OptimizedListingPreview } from "@/components/OptimizedListingPreview";
import type { GeoSuggestion } from "@/app/api/geo/route";

const FALLBACK_SUGGESTIONS: GeoSuggestion[] = [
  { issue: "Missing price signals", why: "LLMs prioritize listings with clear pricing.", fix: "Add price to the first sentence.", impact: "High" },
  { issue: "Vague descriptors", why: "Generic terms are not searchable.", fix: "Use specific materials and features.", impact: "Medium" },
  { issue: "No geographic signal", why: "Canadian buyers search for local options.", fix: "Add 'Ships across Canada' early.", impact: "High" },
];

export default function GeoPage() {
  const merchantId = useMerchant();
  const data = merchantData[merchantId];
  const firstProduct = data.products[0] ?? "";
  const [selectedProduct, setSelectedProduct] = useState(firstProduct);
  const [listing, setListing] = useState(
    () => data.productDescriptions[firstProduct] ?? ""
  );
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<GeoSuggestion[]>([]);
  const [optimizedListing, setOptimizedListing] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [analysisDone, setAnalysisDone] = useState(false);
  const [showProjected, setShowProjected] = useState(false);
  const [applying, setApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const product = e.target.value;
    setSelectedProduct(product);
    setListing(data.productDescriptions[product] ?? "");
  };

  async function handleAnalyze() {
    setLoading(true);
    setError(null);
    setSuggestions([]);
    setOptimizedListing("");
    setAnalysisDone(false);
    setShowProjected(false);

    try {
      const res = await fetch("/api/geo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listing }),
      });
      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Analysis failed");
        setSuggestions(FALLBACK_SUGGESTIONS);
        setAnalysisDone(true);
        return;
      }

      setSuggestions(result.suggestions || FALLBACK_SUGGESTIONS);
      setOptimizedListing(result.optimizedListing || "");
      setAnalysisDone(true);
      setTimeout(() => setShowProjected(true), 2500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
      setSuggestions(FALLBACK_SUGGESTIONS);
      setAnalysisDone(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleApplyToWebsite() {
    if (!optimizedListing) return;
    setApplying(true);
    setApplySuccess(false);
    try {
      const res = await fetch("/api/update-listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merchant_id: merchantId,
          product_name: selectedProduct,
          description: optimizedListing,
        }),
      });
      const result = await res.json();
      if (res.ok && result.success) setApplySuccess(true);
    } finally {
      setApplying(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
          GEO Optimizer
        </h1>
        <p className="text-[var(--text-secondary)] mt-1 text-sm font-mono">
          Improve your discoverability in LLM search results with Gemini AI.
        </p>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-shadow duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
        <label className="block text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-2">
          Select a product to optimize
        </label>
        <select
          value={selectedProduct}
          onChange={handleProductChange}
          className="w-full max-w-md rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] px-4 py-2.5 text-sm font-mono focus:border-[var(--accent)] focus:ring-0 focus:outline-none transition-colors duration-150"
        >
          {data.products.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <KeywordsDrivingClicks selectedProduct={selectedProduct} />

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-shadow duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
        <h2 className="text-base font-semibold text-[var(--text-primary)] mb-3">
          Current listing
        </h2>
        <textarea
          value={listing}
          onChange={(e) => setListing(e.target.value)}
          rows={5}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] p-4 text-sm font-mono min-h-32 focus:border-[var(--accent)] focus:ring-0 focus:outline-none transition-colors duration-150 placeholder:text-[var(--text-secondary)]"
          placeholder="Product description..."
        />
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] text-[var(--bg)] font-semibold px-4 py-2 border border-[var(--border)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
        >
          <Sparkles className="w-4 h-4" />
          {loading ? "Analyzing…" : "Analyze with Gemini AI"}
        </button>
        {error && (
          <p className="mt-3 text-sm text-[var(--text-secondary)] font-mono">
            {error}
          </p>
        )}
      </div>

      {analysisDone && (
        <>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-shadow duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
            <h2 className="text-base font-semibold text-[var(--text-primary)] mb-4">
              GEO Score
            </h2>
            <GeoScoreGauge
              current={34}
              projected={78}
              loaded={analysisDone}
              showProjected={showProjected}
            />
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-shadow duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
            <h2 className="text-base font-semibold text-[var(--text-primary)] mb-4">
              Suggestions
            </h2>
            <GeoSuggestionsPanel suggestions={suggestions} loaded={analysisDone} />
          </div>

          {optimizedListing && (
            <>
              <OptimizedListingPreview
                before={listing}
                after={optimizedListing}
                loaded={true}
              />
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-shadow duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
                <button
                  onClick={handleApplyToWebsite}
                  disabled={applying}
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] text-[var(--bg)] font-semibold px-4 py-2 border border-[var(--border)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
                >
                  {applying ? (
                    <>Updating your website…</>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4" />
                      Apply to my website
                    </>
                  )}
                </button>
                {applySuccess && (
                  <div className="mt-4 p-3 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-sm text-[var(--accent)] font-mono">
                    ✅ Your website has been updated.{" "}
                    <a
                      href={data.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-medium"
                    >
                      View live on {data.website.replace(/^https?:\/\//, "")} →
                    </a>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

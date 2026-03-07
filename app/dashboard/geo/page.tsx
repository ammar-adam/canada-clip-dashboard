"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { DEFAULT_LISTING } from "@/lib/mock-data";
import { GeoScoreGauge } from "@/components/GeoScoreGauge";
import { GeoSuggestionsPanel } from "@/components/GeoSuggestionsPanel";
import { OptimizedListingPreview } from "@/components/OptimizedListingPreview";
import type { GeoSuggestion } from "@/app/api/geo/route";

export default function GeoPage() {
  const [listing, setListing] = useState(DEFAULT_LISTING);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<GeoSuggestion[]>([]);
  const [optimizedListing, setOptimizedListing] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [analysisDone, setAnalysisDone] = useState(false);

  async function handleAnalyze() {
    setLoading(true);
    setError(null);
    setSuggestions([]);
    setOptimizedListing("");
    setAnalysisDone(false);

    try {
      const res = await fetch("/api/geo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listing }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Analysis failed");
        return;
      }

      setSuggestions(data.suggestions || []);
      setOptimizedListing(data.optimizedListing || "");
      setAnalysisDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-2xl text-text-primary">
          GEO Optimizer
        </h1>
        <p className="text-text-secondary mt-1">
          Improve your discoverability in LLM search results with Gemini AI.
        </p>
      </div>

      <div className="rounded-xl border border-navy-border bg-navy-card p-6">
        <h2 className="font-display font-semibold text-text-primary mb-3">
          Current product listing
        </h2>
        <textarea
          value={listing}
          onChange={(e) => setListing(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-navy-border bg-navy text-text-primary placeholder-text-secondary px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent-red/50"
          placeholder="Paste your product description..."
        />
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent-red px-5 py-2.5 font-semibold text-white hover:bg-accent-red/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          {loading ? "Analyzing…" : "Analyze with Gemini AI"}
        </button>
        {error && (
          <p className="mt-3 text-sm text-accent-red">{error}</p>
        )}
      </div>

      {analysisDone && (
        <>
          <div className="rounded-xl border border-navy-border bg-navy-card p-6">
            <h2 className="font-display font-semibold text-text-primary mb-4">
              GEO Score
            </h2>
            <GeoScoreGauge current={34} projected={78} loaded={analysisDone} />
          </div>

          <div className="rounded-xl border border-navy-border bg-navy-card p-6">
            <h2 className="font-display font-semibold text-text-primary mb-4">
              Gemini suggestions
            </h2>
            <GeoSuggestionsPanel suggestions={suggestions} loaded={analysisDone} />
          </div>

          {optimizedListing && (
            <OptimizedListingPreview
              before={listing}
              after={optimizedListing}
              loaded={true}
            />
          )}
        </>
      )}
    </div>
  );
}

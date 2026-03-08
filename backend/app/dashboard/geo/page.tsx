"use client";

import { useState, useEffect } from "react";
import { Sparkles, ThumbsUp, RotateCcw, Save } from "lucide-react";
import { useMerchant } from "@/contexts/MerchantContext";
import { merchantData } from "@/lib/merchantData";
import { KeywordsDrivingClicks } from "@/components/KeywordsDrivingClicks";
import { GeoScoreGauge } from "@/components/GeoScoreGauge";
import { GeoSuggestionsPanel } from "@/components/GeoSuggestionsPanel";
import { DetailPanel, type PanelPayload } from "@/components/DetailPanel";
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
  const [error, setError] = useState<string | null>(null);
  const [analysisDone, setAnalysisDone] = useState(false);
  const [showProjected, setShowProjected] = useState(false);
  const [showRewritePanel, setShowRewritePanel] = useState(false);
  const [suggestedRewrite, setSuggestedRewrite] = useState("");
  const [rewriteAccepted, setRewriteAccepted] = useState(false);
  const [rewriteLoading, setRewriteLoading] = useState(false);
  type SaveState = "idle" | "saving" | "success" | "error";
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [toast, setToast] = useState<{ message: string; success: boolean } | null>(null);
  const [keywordPanelPayload, setKeywordPanelPayload] = useState<PanelPayload>(null);
  const [geoScore, setGeoScore] = useState(34);
  const [projectedScore, setProjectedScore] = useState(78);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const product = e.target.value;
    setSelectedProduct(product);
    setListing(data.productDescriptions[product] ?? "");
  };


  async function handleTryAgainRewrite() {
    setRewriteLoading(true);
    try {
      const res = await fetch("/api/geo/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listing,
          issues: suggestions.map((s) => s.issue),
        }),
      });
      const result = await res.json();
      if (res.ok && typeof result.optimizedListing === "string") {
        setSuggestedRewrite(result.optimizedListing.trim());
      }
    } finally {
      setRewriteLoading(false);
    }
  }

  async function handleSaveToSupabase() {
    if (!suggestedRewrite) return;
    setSaveState("saving");
    setToast(null);
    try {
      const res = await fetch("/api/update-listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: "city-pack-28l",
          description: suggestedRewrite,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSaveState("success");
      setToast({ message: "Your listing has been updated ✓", success: true });
    } catch {
      setSaveState("error");
      setToast({ message: "Save failed — check Supabase connection", success: false });
    }
  }

  async function handleAnalyze() {
    setLoading(true);
    setError(null);
    setSuggestions([]);
    setAnalysisDone(false);
    setShowProjected(false);
    setShowRewritePanel(false);
    setSuggestedRewrite("");
    setRewriteAccepted(false);

    try {
      const res = await fetch("/api/geo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listing,
          merchant_id: merchantId,
          product_name: selectedProduct,
        }),
      });
      const result = await res.json();

      if (!res.ok) {
        const msg =
          result.code === "GEMINI_API_KEY_NOT_SET" || result.message
            ? result.message || result.error
            : result.error || "Analysis failed";
        setError(msg);
        setSuggestions(FALLBACK_SUGGESTIONS);
        setAnalysisDone(true);
        return;
      }

      setSuggestions(result.suggestions || FALLBACK_SUGGESTIONS);
      setGeoScore(typeof result.geoScore === "number" ? result.geoScore : 34);
      setProjectedScore(typeof result.projectedScore === "number" ? result.projectedScore : 78);
      setError(null);
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">
          GEO Optimizer
        </h1>
        <p className="text-white/90 mt-1 text-sm font-mono">
          Improve your discoverability in LLM search results with Gemini AI.
        </p>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-shadow duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
        <label className="block text-xs font-semibold uppercase tracking-widest text-white/90 mb-2">
          Select a product to optimize
        </label>
        <select
          value={selectedProduct}
          onChange={handleProductChange}
          className="w-full max-w-md rounded-lg border border-[var(--border)] bg-[var(--surface)] text-white px-4 py-2.5 text-sm font-mono focus:border-[var(--brand-red)] focus:ring-0 focus:outline-none transition-colors duration-150"
        >
          {data.products.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <KeywordsDrivingClicks
        selectedProduct={selectedProduct}
        onKeywordClick={(k) =>
          setKeywordPanelPayload({
            type: "keyword",
            word: k.word,
            views: k.views,
            clicks: k.clicks,
            purchases: k.purchases,
            productKey: selectedProduct,
          })
        }
      />

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-shadow duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
        <h2 className="text-base font-semibold text-white mb-3">
          Current listing
        </h2>
        <textarea
          value={listing}
          onChange={(e) => setListing(e.target.value)}
          rows={5}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] text-white p-4 text-sm font-mono min-h-32 focus:border-[var(--brand-red)] focus:ring-0 focus:outline-none transition-colors duration-150 placeholder:text-white/50"
          placeholder="Paste your product or listing text here for GEO suggestions (e.g. title, description, bullet points)"
        />
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[var(--brand-red)] text-white font-semibold px-4 py-2 border border-[var(--border)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 hover:opacity-90"
        >
          <Sparkles className="w-4 h-4" />
          {loading ? "Analyzing…" : "Analyze with Gemini AI"}
        </button>
        {loading && (
          <p className="mt-2 text-sm text-[var(--brand-blue-light)] font-mono">
            Gemini is analyzing…
          </p>
        )}
        <p className="mt-2 text-xs text-white/80 font-mono">
          Runs Gemini and saves suggestions + optimized listing to Supabase.
        </p>
        {error && (
          <div className="mt-3 p-3 rounded-lg border border-[var(--accent)]/50 bg-[var(--accent)]/10">
            <p className="text-sm font-semibold text-[var(--accent)] mb-1">
              {error.includes("API key") || error.includes("GEMINI_API_KEY") ? "API key not working" : "Error"}
            </p>
            <p className="text-sm text-white font-mono">
              {error}
            </p>
          </div>
        )}
      </div>

      {analysisDone && (
        <>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-shadow duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
            <h2 className="text-base font-semibold text-white mb-4">
              GEO Score
            </h2>
            <GeoScoreGauge
              current={geoScore}
              projected={projectedScore}
              loaded={analysisDone}
              showProjected={showProjected}
            />
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-shadow duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
            <h2 className="text-base font-semibold text-white mb-4">
              Suggestions
            </h2>
            <GeoSuggestionsPanel suggestions={suggestions} loaded={analysisDone} />
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-shadow duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
            <button
              type="button"
              onClick={async () => {
                setRewriteLoading(true);
                setSaveState("idle");
                try {
                  const res = await fetch("/api/geo/rewrite", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ listing, issues: suggestions.map((s) => s.issue) }),
                  });
                  const result = await res.json();
                  if (res.ok && typeof result.optimizedListing === "string") {
                    setSuggestedRewrite(result.optimizedListing.trim());
                  } else {
                    setSuggestedRewrite(listing + "\n\n[Add price and Canadian signal here.]");
                  }
                } catch {
                  setSuggestedRewrite(listing + "\n\n[Add price and Canadian signal here.]");
                } finally {
                  setRewriteLoading(false);
                }
                setShowRewritePanel(true);
                setRewriteAccepted(false);
              }}
              disabled={rewriteLoading}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand-red)] text-white font-semibold px-4 py-2.5 border border-[var(--border)] transition-colors duration-150 hover:opacity-90 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {rewriteLoading ? "Gemini is rewriting…" : "Rewrite with Gemini"}
            </button>
            <p className="mt-2 text-xs text-white/80 font-mono">
              Get an optimized description and save to Supabase.
            </p>
          </div>

          {showRewritePanel && suggestedRewrite && (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-shadow duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
              <h2 className="text-base font-semibold text-white mb-2">
                Suggested Rewrite
              </h2>
              <p className="text-xs text-white/90 font-mono mb-3">
                Projected GEO score: +{projectedScore}
              </p>
              <div className="rounded-lg border border-[var(--border)] bg-black/20 p-4 text-sm text-white leading-relaxed font-mono mb-4 min-h-[100px]">
                {suggestedRewrite}
              </div>
              {!rewriteAccepted ? (
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setRewriteAccepted(true)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand-blue)] text-white font-semibold px-4 py-2 border border-[var(--border)] transition-colors duration-150 hover:opacity-90"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    Looks good
                  </button>
                  <button
                    type="button"
                    onClick={handleTryAgainRewrite}
                    disabled={rewriteLoading}
                    className="inline-flex items-center gap-2 rounded-lg bg-white/10 text-[var(--text-primary)] font-semibold px-4 py-2 border border-[var(--border)] disabled:opacity-50 transition-colors duration-150 hover:bg-white/15"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {rewriteLoading ? "Gemini is rewriting…" : "Try again"}
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    onClick={handleSaveToSupabase}
                    disabled={saveState === "saving" || saveState === "success"}
                    className={`inline-flex items-center gap-2 rounded-lg font-semibold px-4 py-2 border transition-colors duration-150 disabled:cursor-not-allowed ${
                      saveState === "success"
                        ? "bg-green-500/20 text-green-400 border-green-500/50"
                        : saveState === "error"
                          ? "bg-[var(--brand-red)]/20 text-[var(--brand-red)] border-[var(--brand-red)]"
                          : "bg-[var(--accent)] text-[var(--bg)] border-[var(--border)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)] disabled:opacity-50"
                    }`}
                  >
                    {saveState === "saving" ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Saving…
                      </>
                    ) : saveState === "success" ? (
                      "✓ Live on your website"
                    ) : saveState === "error" ? (
                      "Save failed — try again"
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        💾 Add this to my website
                      </>
                    )}
                  </button>
                  {toast && (
                    <p className={`mt-3 text-sm font-mono ${toast.success ? "text-[var(--brand-blue)]" : "text-[var(--brand-red)]"}`}>
                      {toast.message}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}

      <DetailPanel
        open={keywordPanelPayload !== null}
        payload={keywordPanelPayload}
        onClose={() => setKeywordPanelPayload(null)}
        onKeywordBoost={() => {
          setToast({ message: "Keyword boost request submitted", success: true });
          setKeywordPanelPayload(null);
        }}
      />

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg border shadow-lg font-mono text-sm animate-[fadeIn_0.2s_ease-out]"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: toast.success ? "var(--brand-blue)" : "var(--brand-red)",
            color: toast.success ? "var(--brand-blue)" : "var(--brand-red)",
          }}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}

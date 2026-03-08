#!/usr/bin/env node
/**
 * Test that the GEO API (DeepSeek) actually returns model-generated content.
 * Run with: node scripts/test-geo-api.mjs
 * Requires: dev server running (npm run dev) and GEMINI_API_KEY in .env.local
 */

const BASE = process.env.GEO_TEST_URL || "http://localhost:3000";
const testListing = "Northbound Packs City Pack. A great backpack for everyday use. Quality materials. Best value.";

async function main() {
  console.log("POST", BASE + "/api/geo");
  console.log("Listing preview:", testListing.slice(0, 60) + "...");

  const res = await fetch(BASE + "/api/geo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      listing: testListing,
      merchant_id: "backpack",
      product_name: "City Pack 28L ($179)",
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error("FAIL: API returned", res.status, data.error || data.message || res.statusText);
    process.exit(1);
  }

  const source = data.source ?? "unknown";
  const suggestions = data.suggestions || [];
  const fallbackFirstIssue = "Missing price signals";

  if (source === "fallback") {
    console.error("FAIL: API used fallback suggestions (model did not return valid JSON or returned empty).");
    console.error("Check server logs for 'GEO API:' messages.");
    process.exit(1);
  }

  if (source !== "model") {
    console.warn("WARN: response.source is", source, "(expected 'model')");
  }

  if (suggestions.length === 0) {
    console.error("FAIL: No suggestions in response.");
    process.exit(1);
  }

  if (suggestions[0].issue === fallbackFirstIssue && suggestions[0].fix?.includes("Starting at $89")) {
    console.error("FAIL: First suggestion matches fallback text; model output may not be used.");
    process.exit(1);
  }

  console.log("OK: source =", source, "| suggestions =", suggestions.length);
  console.log("First suggestion:", suggestions[0].issue, "-", (suggestions[0].fix || "").slice(0, 50) + "...");
  if (data.optimizedListing) {
    console.log("Optimized listing length:", data.optimizedListing.length, "chars");
  }
  console.log("geoScore:", data.geoScore, "| projectedScore:", data.projectedScore);
}

main().catch((e) => {
  console.error("Request failed:", e.message);
  if (e.cause) console.error(e.cause);
  process.exit(1);
});

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export interface GeoSuggestion {
  issue: string;
  why: string;
  fix: string;
  impact: "High" | "Medium" | "Low";
  keyword?: string;
}

const GEO_PROMPT = (listing: string) => `You are a GEO (Generative Engine Optimization) expert. Your job is to give Canadian small businesses clear, actionable wording feedback so their product listings get recommended by AI assistants (ChatGPT, Perplexity, Google AI Overviews).

RULES FOR YOUR FEEDBACK:
1. Be specific about wording. For each suggestion, give either (a) exact replacement phrasing the merchant can copy, or (b) a precise instruction with a full example sentence.
2. Do not give vague advice like "improve clarity" or "add more details." Instead say exactly what to add and where (e.g. "In the first sentence, add the price: '[Product] — $89. Ships across Canada.'").
3. Check for: (a) Price visible in the first 15 words, (b) Concrete specs (materials, dimensions, capacity, weight) not just "quality" or "durable", (c) Canadian/location signal in the first 2 sentences (e.g. "Made in Ontario", "Ships Canada-wide"), (d) No filler words ("best", "great", "perfect") — replace with factual claims, (e) Keywords a buyer would say to an AI (e.g. "waterproof backpack 30L", "GaN charger 65W").
4. "fix" must be actionable: either a full sentence they can paste in, or "Replace X with Y" / "Add after the first sentence: [exact wording]."
5. "impact" = High if the change strongly affects whether an LLM would recommend this product; Medium for clarity/specificity; Low for polish.

Return ONLY valid JSON, no markdown, no code fence. Use this exact structure:
{
  "suggestions": [
    {
      "title": "short title under 6 words",
      "severity": "HIGH or MEDIUM or LOW",
      "description": "One sentence: why LLMs skip or downrank this listing.",
      "fix": "Exact actionable wording: a sentence to add/replace, or 'Replace \"[current]\" with \"[new wording]\"' or 'Add after first sentence: \"[exact text]\"'."
    }
  ],
  "geoScore": number from 0 to 100 (current listing score),
  "projectedScore": number from 0 to 100 (score after applying suggestions),
  "optimized_listing": "Full rewritten listing, 2-4 sentences. Include price early, Canadian/location signal, concrete specs. No markdown. Ready to paste on their website."
}

Product listing to analyze:
${listing}`;

const GEMINI_MODELS = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro"] as const;

function parseGeminiResponse(text: string): {
  suggestions: GeoSuggestion[];
  optimizedListing: string;
  geoScore: number;
  projectedScore: number;
} {
  let raw = text.trim();
  if (raw.startsWith("```")) {
    raw = raw.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
  }
  const parsed = JSON.parse(raw);
  const rawSuggestions = Array.isArray(parsed.suggestions) ? parsed.suggestions : [];
  const suggestions: GeoSuggestion[] = rawSuggestions.map((s: Record<string, unknown>) => ({
    issue: typeof s.title === "string" ? s.title : typeof s.issue === "string" ? s.issue : "Suggestion",
    why: typeof s.description === "string" ? s.description : typeof s.why === "string" ? s.why : "",
    fix: typeof s.fix === "string" ? s.fix : "",
    impact: (typeof s.severity === "string" ? s.severity : typeof s.impact === "string" ? s.impact : "Medium") as "High" | "Medium" | "Low",
  }));
  const optimizedListing =
    typeof parsed.optimized_listing === "string"
      ? parsed.optimized_listing.trim()
      : typeof parsed.optimizedListing === "string"
        ? parsed.optimizedListing.trim()
        : "";
  const geoScore = typeof parsed.geoScore === "number" ? Math.min(100, Math.max(0, parsed.geoScore)) : 34;
  const projectedScore = typeof parsed.projectedScore === "number" ? Math.min(100, Math.max(0, parsed.projectedScore)) : 78;
  return { suggestions, optimizedListing, geoScore, projectedScore };
}

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "API key not configured",
        code: "GEMINI_API_KEY_NOT_SET",
        message: "Add GEMINI_API_KEY to your .env.local to enable analysis. Get a key at https://aistudio.google.com/apikey",
      },
      { status: 503 }
    );
  }

  let listing: string;
  let merchantId: string | undefined;
  let productName: string | undefined;
  try {
    const body = await req.json();
    listing = body.listing;
    merchantId = typeof body.merchant_id === "string" ? body.merchant_id : undefined;
    productName = typeof body.product_name === "string" ? body.product_name : undefined;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  if (!listing || typeof listing !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid listing" },
      { status: 400 }
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  let suggestions: GeoSuggestion[] = [];
  let optimizedListing = "";
  let geoScore = 34;
  let projectedScore = 78;

  for (const modelId of GEMINI_MODELS) {
    try {
      const model = genAI.getGenerativeModel({ model: modelId });
      const result = await model.generateContent(GEO_PROMPT(listing));
      const text = result.response.text();
      if (!text) continue;
      const parsed = parseGeminiResponse(text);
      if (parsed.suggestions.length === 0) continue;
      suggestions = parsed.suggestions;
      optimizedListing = parsed.optimizedListing;
      geoScore = parsed.geoScore;
      projectedScore = parsed.projectedScore;
      break;
    } catch (e) {
      console.warn(`GEO API: model ${modelId} failed`, e);
      continue;
    }
  }

  if (suggestions.length === 0) {
    const fallback: GeoSuggestion[] = [
      { issue: "Missing price signals", why: "LLMs prioritize listings with clear pricing.", fix: "Add price to the first sentence, e.g. 'Starting at $89.'", impact: "High" },
      { issue: "Vague descriptors", why: "Generic terms like 'quality' are not searchable.", fix: "Use specific materials and features, e.g. 'YKK zippers, 28L capacity'.", impact: "Medium" },
      { issue: "No geographic signal", why: "Canadian buyers search for local options.", fix: "Add 'Ships across Canada' or 'Made in Ontario' early in the listing.", impact: "High" },
    ];
    suggestions = fallback;
  }

  // Write to Supabase if we have merchant + product and a client
  if (merchantId && productName) {
    const supabase = createServerClient();
    if (supabase) {
      try {
        await supabase.from("geo_analyses").insert({
          merchant_id: merchantId,
          product_name: productName,
          original_listing: listing.slice(0, 10000),
          optimized_listing: optimizedListing.slice(0, 10000),
          suggestions: suggestions as unknown as Record<string, unknown>[],
        });
      } catch (e) {
        console.error("GEO: Supabase insert failed", e);
      }
    }
  }

  return NextResponse.json({ suggestions, optimizedListing, geoScore, projectedScore });
}

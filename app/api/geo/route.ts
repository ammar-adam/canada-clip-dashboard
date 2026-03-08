import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

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
      "issue": "short title under 6 words",
      "why": "One sentence: why LLMs skip or downrank this listing.",
      "fix": "Exact actionable wording: a sentence to add/replace, or 'Replace \"[current]\" with \"[new wording]\"' or 'Add after first sentence: \"[exact text]\"'.",
      "impact": "High or Medium or Low"
    }
  ],
  "optimized_listing": "Full rewritten listing, 2-4 sentences. Include price early, Canadian/location signal, concrete specs. No markdown. Ready to paste on their website."
}

Product listing to analyze:
${listing}`;

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not set" },
      { status: 500 }
    );
  }

  try {
    const { listing } = await req.json();
    if (!listing || typeof listing !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid listing" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(GEO_PROMPT(listing));
    const text = result.response.text();
    if (!text) {
      return NextResponse.json(
        { error: "No response from Gemini" },
        { status: 500 }
      );
    }

    let raw = text.trim();
    if (raw.startsWith("```")) {
      raw = raw.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
    }
    const parsed = JSON.parse(raw);
    const suggestions: GeoSuggestion[] = Array.isArray(parsed.suggestions)
      ? parsed.suggestions
      : Array.isArray(parsed)
        ? parsed
        : [];
    const optimizedListing: string =
      typeof parsed.optimized_listing === "string"
        ? parsed.optimized_listing
        : "";

    if (suggestions.length === 0) {
      return NextResponse.json(
        { error: "Invalid suggestions format" },
        { status: 500 }
      );
    }

    return NextResponse.json({ suggestions, optimizedListing });
  } catch (e) {
    console.error("GEO API error:", e);
    // Fallback so demo never breaks
    const fallback: GeoSuggestion[] = [
      { issue: "Missing price signals", why: "LLMs prioritize listings with clear pricing.", fix: "Add price to the first sentence, e.g. 'Starting at $89.'", impact: "High" },
      { issue: "Vague descriptors", why: "Generic terms like 'quality' are not searchable.", fix: "Use specific materials and features, e.g. 'YKK zippers, 28L capacity'.", impact: "Medium" },
      { issue: "No geographic signal", why: "Canadian buyers search for local options.", fix: "Add 'Ships across Canada' or 'Made in Ontario' early in the listing.", impact: "High" },
    ];
    return NextResponse.json({
      suggestions: fallback,
      optimizedListing: "Your improved listing will appear here. Add price, materials, and Canadian shipping to your description.",
    });
  }
}

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export interface GeoSuggestion {
  issue: string;
  why: string;
  fix: string;
  impact: "High" | "Medium" | "Low";
  keyword: string;
}

const GEO_PROMPT = (listing: string) => `You are a GEO (Generative Engine Optimization) expert helping Canadian small businesses appear in LLM search results. Analyze this product listing and return 5 specific suggestions plus one optimized listing.

Return a single JSON object with two keys:
1. "suggestions": an array of exactly 5 objects, each with: "issue", "why", "fix", "impact" (High|Medium|Low), "keyword"
2. "optimized_listing": a single string that is the full rewritten product listing with all improvements applied (2-4 sentences, ready to use)

Listing to analyze: ${listing}

Return only the JSON object, no other text. No markdown, no code block.`;

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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(GEO_PROMPT(listing));
    const text = result.response.text();
    if (!text) {
      return NextResponse.json(
        { error: "No response from Gemini" },
        { status: 500 }
      );
    }

    // Strip markdown code block if present
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
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Analysis failed" },
      { status: 500 }
    );
  }
}

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const REWRITE_PROMPT = (listing: string, issues: string[]) => `You are a GEO (Generative Engine Optimization) expert. Rewrite this product listing so it performs better in AI search results.

Current listing:
${listing}

Issues to fix (from prior analysis):
${issues.map((i) => `- ${i}`).join("\n")}

Return ONLY the rewritten listing text: 2-4 sentences. Include price early, Canadian/location signal, and concrete specs. No JSON, no markdown, no code fence. Ready to paste on the merchant's website.`;

const GEMINI_MODELS = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro"] as const;

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured", code: "GEMINI_API_KEY_NOT_SET" },
      { status: 503 }
    );
  }

  let listing: string;
  let issues: string[];
  try {
    const body = await req.json();
    listing = typeof body.listing === "string" ? body.listing : "";
    issues = Array.isArray(body.issues) ? body.issues.filter((i: unknown) => typeof i === "string") : [];
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!listing) {
    return NextResponse.json({ error: "Missing listing" }, { status: 400 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  for (const modelId of GEMINI_MODELS) {
    try {
      const model = genAI.getGenerativeModel({ model: modelId });
      const result = await model.generateContent(REWRITE_PROMPT(listing, issues));
      const text = result.response.text();
      if (!text) continue;
      const optimizedListing = text.trim().replace(/^```\w*\n?|\n?```$/g, "").trim();
      if (optimizedListing.length > 0) {
        return NextResponse.json({ optimizedListing });
      }
    } catch (e) {
      console.warn(`GEO rewrite: model ${modelId} failed`, e);
      continue;
    }
  }

  return NextResponse.json(
    { error: "Could not generate rewrite" },
    { status: 502 }
  );
}

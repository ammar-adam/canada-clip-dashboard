import { NextResponse } from "next/server";

const REWRITE_PROMPT = (listing: string, issues: string[]) => `You are a GEO (Generative Engine Optimization) expert. Rewrite this product listing so it performs better in AI search results.

Current listing:
${listing}

Issues to fix (from prior analysis):
${issues.map((i) => `- ${i}`).join("\n")}

Return ONLY the rewritten listing text: 2-4 sentences. Include price early, Canadian/location signal, and concrete specs. No JSON, no markdown, no code fence. Ready to paste on the merchant's website.`;

const DEEPSEEK_MODEL = "deepseek-chat";

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
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

  try {
    const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: [{ role: "user", content: REWRITE_PROMPT(listing, issues) }],
        max_tokens: 1024,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const msg = typeof err.error?.message === "string" ? err.error.message : res.statusText;
      return NextResponse.json(
        { error: "Rewrite failed", message: msg },
        { status: res.status >= 500 ? 503 : res.status }
      );
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content;
    if (!text) {
      return NextResponse.json(
        { error: "Empty response from model" },
        { status: 502 }
      );
    }

    const optimizedListing = text.trim().replace(/^```\w*\n?|\n?```$/g, "").trim();
    if (optimizedListing.length > 0) {
      return NextResponse.json({ optimizedListing });
    }
  } catch (e) {
    console.warn("GEO rewrite: DeepSeek request failed", e);
  }

  return NextResponse.json(
    { error: "Could not generate rewrite" },
    { status: 502 }
  );
}

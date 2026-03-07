import { createServerClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = createServerClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase not configured" },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const { merchant_id, product_name, description } = body;
    if (!merchant_id || !product_name || description == null) {
      return NextResponse.json(
        { error: "Missing merchant_id, product_name, or description" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("merchant_listings")
      .upsert(
        {
          merchant_id: String(merchant_id).slice(0, 50),
          product_name: String(product_name).slice(0, 200),
          description: String(description).slice(0, 5000),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "merchant_id" }
      )
      .select("merchant_id, updated_at")
      .single();

    if (error) {
      console.error("update-listing error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({
      success: true,
      updated_at: data?.updated_at ?? new Date().toISOString(),
    });
  } catch (e) {
    console.error("update-listing API error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Request failed" },
      { status: 500 }
    );
  }
}

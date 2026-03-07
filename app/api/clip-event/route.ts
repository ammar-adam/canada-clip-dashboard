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
    const { merchant_id, query, intercepted, action, province } = body;
    if (!merchant_id || !query || !intercepted || !action || !province) {
      return NextResponse.json(
        { error: "Missing merchant_id, query, intercepted, action, or province" },
        { status: 400 }
      );
    }
    if (!["Viewed", "Clicked", "Purchased"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("clip_events")
      .insert({
        merchant_id: String(merchant_id).slice(0, 50),
        query: String(query).slice(0, 500),
        intercepted: String(intercepted).slice(0, 200),
        action,
        province: String(province).slice(0, 10),
      })
      .select("id, created_at, merchant_id, query, intercepted, action, province")
      .single();

    if (error) {
      console.error("clip_event insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, ...data });
  } catch (e) {
    console.error("clip-event API error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Request failed" },
      { status: 500 }
    );
  }
}

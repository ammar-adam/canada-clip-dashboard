"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useMerchant } from "@/contexts/MerchantContext";
import { merchantData } from "@/lib/merchantData";
import { createBrowserClient, type ClipEvent } from "@/lib/supabase";

const PROVINCE_FLAGS: Record<string, string> = {
  ON: "🇨🇦", BC: "🇨🇦", QC: "🇨🇦", AB: "🇨🇦", MB: "🇨🇦", NS: "🇨🇦",
  SK: "🇨🇦", NB: "🇨🇦", NL: "🇨🇦", PE: "🇨🇦",
};

type Row = {
  id: string;
  time: string;
  query: string;
  intercepted: string;
  action: "Viewed" | "Clicked" | "Purchased";
  province: string;
};

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function formatTime(createdAt: string) {
  const d = new Date(createdAt);
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 120) return "1 min ago";
  return `${Math.floor(diff / 60)} min ago`;
}

export function ActivityFeed({
  onLiveEvent,
}: { onLiveEvent?: (action: "Viewed" | "Clicked" | "Purchased") => void } = {}) {
  const merchantId = useMerchant();
  const pool = useMemo(
    () => shuffle([...merchantData[merchantId].activityFeed]),
    [merchantId]
  );
  const [rows, setRows] = useState<Row[]>(() =>
    pool.slice(0, 8).map((r, i) => ({ ...r, id: `init-${i}` }))
  );
  const [nextIndex, setNextIndex] = useState(8);
  const onLiveEventRef = useRef(onLiveEvent);
  onLiveEventRef.current = onLiveEvent;

  useEffect(() => {
    const interval = setInterval(() => {
      const next = pool[nextIndex % pool.length];
      setRows((prev) => [
        { ...next, id: `live-${Date.now()}` },
        ...prev.slice(0, 9),
      ]);
      setNextIndex((i) => i + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [pool, nextIndex]);

  useEffect(() => {
    const supabase = createBrowserClient();
    if (!supabase) return;
    const channel = supabase
      .channel("clip_events")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "clip_events" },
        (payload) => {
          const e = payload.new as ClipEvent & { merchant_id?: string };
          if (e.merchant_id !== merchantId) return;
          setRows((prev) => [
            {
              id: e.id,
              time: formatTime(e.created_at),
              query: e.query,
              intercepted: e.intercepted,
              action: e.action,
              province: e.province,
            },
            ...prev.slice(0, 9),
          ]);
          onLiveEventRef.current?.(e.action);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [merchantId]);

  const actionClass = (action: Row["action"]) => {
    if (action === "Purchased") return "text-[#0EA472] font-medium";
    if (action === "Clicked") return "text-[#D4930A] font-medium";
    return "text-[#5A7A9E]";
  };

  return (
    <div className="rounded-xl border border-[#1A2E4A] bg-[#0B1628] p-6 hover:bg-[#0F1E36] hover:border-[#1E3A5C] transition-all duration-200">
      <h2 className="text-lg font-semibold text-[#E8EDF5] mb-1">
        Recent Clip Activity
      </h2>
      <p className="text-sm text-[#5A7A9E] mb-4">
        Live feed from App Clip interactions
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[#5A7A9E] border-b border-[#1A2E4A]">
              <th className="pb-3 font-medium">Time</th>
              <th className="pb-3 font-medium">Query</th>
              <th className="pb-3 font-medium">Intercepted</th>
              <th className="pb-3 font-medium">Action</th>
              <th className="pb-3 font-medium">Province</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.id}
                className={`border-b border-[#1A2E4A]/80 transition-colors hover:bg-[#0F1E36] ${
                  i === 0 ? "animate-[fadeIn_0.3s_ease-out_forwards] bg-[#C8102E]/5" : ""
                }`}
              >
                <td className="py-3 text-[#5A7A9E]">{row.time}</td>
                <td className="py-3 font-mono text-[#5A9ED4] text-xs">
                  &quot;{row.query}&quot;
                </td>
                <td className="py-3 text-[#5A7A9E]">{row.intercepted}</td>
                <td className={`py-3 ${actionClass(row.action)}`}>{row.action}</td>
                <td className="py-3 text-[#5A7A9E]">
                  {PROVINCE_FLAGS[row.province] ?? "🇨🇦"} {row.province}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

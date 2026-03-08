"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useMerchant } from "@/contexts/MerchantContext";
import { merchantData } from "@/lib/merchantData";
import { createBrowserClient, type ClipEvent } from "@/lib/supabase";

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
  onRowClick,
}: {
  onLiveEvent?: (action: "Viewed" | "Clicked" | "Purchased") => void;
  onRowClick?: (row: Row) => void;
} = {}) {
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
    if (action === "Purchased") return "text-white/90";
    if (action === "Clicked") return "text-[var(--accent)]";
    return "text-[var(--text-secondary)]";
  };

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-shadow duration-150 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
          Recent Clip Activity
        </h2>
        <span className="live-dot" aria-hidden />
      </div>
      <p className="text-sm text-[var(--text-secondary)] mb-4 font-mono">
        Live feed from App Clip interactions
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[var(--text-secondary)] border-b border-[var(--border)] font-mono uppercase text-xs">
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
                onClick={() => onRowClick?.(row)}
                className={`border-b border-[var(--border)]/80 transition-colors duration-150 hover:bg-[#2a2a2a] hover:border-l hover:border-l-white cursor-pointer ${
                  i === 0 ? "animate-[fadeIn_0.3s_ease-out_forwards]" : ""
                }`}
              >
                <td className="py-3 text-[var(--text-secondary)] tabular-tight">
                  {row.time}
                </td>
                <td className="py-3 font-mono text-[var(--accent)] text-xs">
                  &quot;{row.query}&quot;
                </td>
                <td className="py-3 text-[var(--text-secondary)]">
                  {row.intercepted}
                </td>
                <td className={`py-3 font-mono ${actionClass(row.action)}`}>
                  {row.action}
                </td>
                <td className="py-3 text-[var(--text-secondary)] font-mono tabular-tight">
                  {row.province}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

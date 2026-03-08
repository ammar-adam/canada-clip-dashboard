"use client";

import { useEffect, useState } from "react";

function currentScoreColor(score: number) {
  return "var(--brand-red)";
}

const PROJECTED_COLOR = "var(--brand-blue)";

export function GeoScoreGauge({
  current = 34,
  projected = 78,
  loaded,
  showProjected = false,
}: {
  current?: number;
  projected?: number;
  loaded: boolean;
  showProjected?: boolean;
}) {
  const [displayCurrent, setDisplayCurrent] = useState(0);
  const [displayProjected, setDisplayProjected] = useState(0);

  useEffect(() => {
    if (!loaded) return;
    const duration = 1000;
    const steps = 25;
    let step = 0;
    const t = setInterval(() => {
      step++;
      setDisplayCurrent(Math.round((current / 100) * (step / steps) * 100));
      if (showProjected)
        setDisplayProjected(Math.round((projected / 100) * (step / steps) * 100));
      if (step >= steps) {
        setDisplayCurrent(current);
        setDisplayProjected(projected);
        clearInterval(t);
      }
    }, duration / steps);
    return () => clearInterval(t);
  }, [loaded, current, projected, showProjected]);

  const currentColor = currentScoreColor(displayCurrent);

  return (
    <div className="flex gap-10 flex-wrap justify-center items-start">
      <div className="flex flex-col items-center">
        <div className="relative w-28 h-28">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="var(--border)"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke={currentColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(displayCurrent / 100) * 264} 264`}
              className="transition-all duration-100"
            />
          </svg>
          <span
            className="absolute inset-0 flex items-center justify-center text-2xl font-bold tabular-nums tracking-tight"
            style={{ color: currentColor }}
          >
            {displayCurrent}
          </span>
        </div>
        <p className="mt-2 text-xs font-mono uppercase text-white/80">
          Current GEO Score
        </p>
      </div>
      {showProjected && (
        <div className="flex flex-col items-center">
          <div className="relative w-28 h-28">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="var(--border)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={PROJECTED_COLOR}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(displayProjected / 100) * 264} 264`}
                className="transition-all duration-800 ease-out"
                style={{ transitionProperty: "stroke-dasharray" }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold tabular-nums tracking-tight" style={{ color: PROJECTED_COLOR }}>
              {displayProjected}
            </span>
          </div>
          <p className="mt-2 text-xs font-mono uppercase text-white/80">
            Projected
          </p>
        </div>
      )}
    </div>
  );
}

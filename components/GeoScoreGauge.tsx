"use client";

import { useEffect, useState } from "react";

function scoreColor(score: number) {
  if (score <= 40) return "#C8102E";
  if (score <= 70) return "#D4930A";
  return "#0EA472";
}

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

  return (
    <div className="flex gap-10 flex-wrap justify-center items-start">
      <div className="flex flex-col items-center">
        <div className="relative w-28 h-28">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#1A2E4A" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke={scoreColor(displayCurrent)}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(displayCurrent / 100) * 264} 264`}
              className="transition-all duration-100"
            />
          </svg>
          <span
            className="absolute inset-0 flex items-center justify-center text-2xl font-bold tabular-nums"
            style={{ color: scoreColor(displayCurrent) }}
          >
            {displayCurrent}
          </span>
        </div>
        <p className="mt-2 text-xs text-[#5A7A9E]">Current GEO Score</p>
      </div>
      {showProjected && (
        <div className="flex flex-col items-center">
          <div className="relative w-28 h-28">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#1A2E4A" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#0EA472"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(displayProjected / 100) * 264} 264`}
                className="transition-all duration-100"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold tabular-nums text-[#0EA472]">
              {displayProjected}
            </span>
          </div>
          <p className="mt-2 text-xs text-[#5A7A9E]">Projected</p>
        </div>
      )}
    </div>
  );
}

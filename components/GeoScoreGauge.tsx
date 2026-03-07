"use client";

import { useEffect, useState } from "react";

export function GeoScoreGauge({
  current = 34,
  projected = 78,
  loaded,
}: {
  current?: number;
  projected?: number;
  loaded: boolean;
}) {
  const [displayCurrent, setDisplayCurrent] = useState(0);
  const [displayProjected, setDisplayProjected] = useState(0);

  useEffect(() => {
    if (!loaded) return;
    const duration = 1200;
    const steps = 30;
    const step = duration / steps;
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setDisplayCurrent(Math.round((current / 100) * (currentStep / steps) * 100));
      setDisplayProjected(Math.round((projected / 100) * (currentStep / steps) * 100));
      if (currentStep >= steps) {
        setDisplayCurrent(current);
        setDisplayProjected(projected);
        clearInterval(timer);
      }
    }, step);
    return () => clearInterval(timer);
  }, [loaded, current, projected]);

  const label = (score: number) =>
    score >= 70 ? "High GEO Visibility" : score >= 40 ? "Medium GEO Visibility" : "Low GEO Visibility";

  return (
    <div className="flex gap-8 flex-wrap justify-center">
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#1F2937"
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#FF0000"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${(displayCurrent / 100) * 264} 264`}
              className="transition-all duration-150"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-2xl text-text-primary">
            {displayCurrent}
          </span>
        </div>
        <p className="mt-2 text-sm text-text-secondary font-medium">Current</p>
        <p className="text-xs text-text-secondary">{label(displayCurrent)}</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#1F2937"
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#10B981"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${(displayProjected / 100) * 264} 264`}
              className="transition-all duration-150"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-2xl text-accent-green">
            {displayProjected}
          </span>
        </div>
        <p className="mt-2 text-sm text-text-secondary font-medium">After improvements</p>
        <p className="text-xs text-accent-green">{label(displayProjected)}</p>
      </div>
    </div>
  );
}

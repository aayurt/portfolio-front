"use client";

import React, { useState } from "react";

interface QuerySample {
  question: string;
  response: string;
  focusPlanet: string;
  house: string;
}

const QUERIES: QuerySample[] = [
  {
    question: "What does my 7th house mean?",
    response: "7th house in Libra with Venus as the ruler signifies a deep longing for harmonious, balanced partnerships and emotional reciprocity.",
    focusPlanet: "Venus",
    house: "7th House (Libra)",
  },
  {
    question: "How does Mars in Pisces affect my career?",
    response: "Mars in 10th/Pisces channels your drive into creative or spiritual leadership, favoring intuitive decision-making over rigid structures.",
    focusPlanet: "Mars",
    house: "10th House (Pisces)",
  },
  {
    question: "When is my Jupiter transit?",
    response: "Jupiter transiting your 2nd house in Taurus brings expansion in financial stability, values, and family resources over the next 12 months.",
    focusPlanet: "Jupiter",
    house: "2nd House (Taurus)",
  },
];

export function AstroPipeline() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = QUERIES[activeIdx];

  return (
    <div className="w-full flex flex-col items-center bg-[#0d1117] rounded-xl border border-white/10 p-3 text-xs select-none overflow-hidden relative shadow-2xl">
      {/* Background Subtle Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(#a855f7 0.75px, transparent 0.75px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Top Header */}
      <div className="w-full flex items-center justify-between pb-2 mb-1 border-b border-white/10 z-10">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span className="font-mono text-[11px] font-semibold text-purple-400 uppercase tracking-wider">
            Vedic Ephemeris & AI Reasoning
          </span>
        </div>
        <div className="flex gap-1">
          {QUERIES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`w-4 h-4 rounded-full text-[9px] font-mono transition-all flex items-center justify-center ${
                activeIdx === i
                  ? "bg-purple-500 text-white font-bold"
                  : "bg-white/10 text-white/50 hover:bg-white/20"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Chat on Left, Natal Wheel on Right */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 items-center py-1 z-10">
        {/* Left: Interactive Chat Simulation */}
        <div className="flex flex-col gap-2">
          {/* User Bubble */}
          <div className="self-end max-w-[90%] bg-purple-950/60 border border-purple-500/30 rounded-2xl rounded-tr-sm p-2 text-white/90">
            <span className="text-[10px] text-purple-300 font-medium block">
              You asked:
            </span>
            <p className="text-[11px] font-sans font-medium text-white/95">
              "{current.question}"
            </p>
          </div>

          {/* AI Response Bubble */}
          <div className="self-start max-w-[95%] bg-[#131b2e] border border-sky-500/30 rounded-2xl rounded-tl-sm p-2 text-white/90">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-[11px]">✨</span>
              <span className="text-[10px] text-sky-400 font-semibold font-mono">
                Astro Guru AI
              </span>
            </div>
            <p className="text-[10px] text-white/80 leading-relaxed font-sans">
              {current.response}
            </p>
          </div>

          {/* Active Context Tag */}
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[9px] text-white/40">Context:</span>
            <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 text-[9px] font-mono border border-purple-500/20">
              {current.house}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-300 text-[9px] font-mono border border-sky-500/20">
              {current.focusPlanet} Active
            </span>
          </div>
        </div>

        {/* Right: SVG Natal Chart Wheel */}
        <div className="flex flex-col items-center justify-center">
          <svg viewBox="0 0 160 160" className="w-[145px] h-[145px] overflow-visible">
            <defs>
              <linearGradient id="wheelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>

            {/* Outer Rings */}
            <circle cx="80" cy="80" r="74" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <circle cx="80" cy="80" r="54" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx="80" cy="80" r="28" fill="#090d16" stroke="#a855f7" strokeWidth="1.5" />

            {/* 12 House Dividing Rays */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x1 = 80 + 28 * Math.cos(rad);
              const y1 = 80 + 28 * Math.sin(rad);
              const x2 = 80 + 74 * Math.cos(rad);
              const y2 = 80 + 74 * Math.sin(rad);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#334155"
                  strokeWidth="0.75"
                />
              );
            })}

            {/* Planetary Coordinates Placed in Wheel */}
            <text x="80" y="20" fill="#fde047" fontSize="8" textAnchor="middle" fontWeight="bold">☉ Sun</text>
            <text x="135" y="55" fill="#f1f5f9" fontSize="8" textAnchor="middle" fontWeight="bold">☽ Moon</text>
            <text x="135" y="115" fill="#38bdf8" fontSize="8" textAnchor="middle" fontWeight="bold">☿ Mer</text>
            <text x="80" y="148" fill="#f472b6" fontSize="8" textAnchor="middle" fontWeight="bold">♀ Venus</text>
            <text x="25" y="115" fill="#ef4444" fontSize="8" textAnchor="middle" fontWeight="bold">♂ Mars</text>
            <text x="25" y="55" fill="#c084fc" fontSize="8" textAnchor="middle" fontWeight="bold">♃ Jup</text>

            {/* Center Symbol */}
            <text x="80" y="84" fill="#a855f7" fontSize="12" textAnchor="middle" fontWeight="bold">
              ☸
            </text>
          </svg>
          <span className="text-[9px] font-mono text-white/50 mt-1">
            Vedic D1 Natal Map (Lahiri Ayanamsa)
          </span>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="w-full mt-2 pt-2 border-t border-white/10 z-10 flex items-center justify-between">
        <span className="text-[10px] text-white/70">
          Combines Swiss Ephemeris calculations with context-grounded LLM inference.
        </span>
        <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 text-[9px] font-mono border border-purple-500/20">
          &lt;2s Latency
        </span>
      </div>
    </div>
  );
}

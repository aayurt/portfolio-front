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
    response: "7th house in Libra with Venus ruling signifies a deep longing for harmonious, balanced partnerships and emotional reciprocity.",
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        borderRadius: "14px",
        overflow: "hidden",
        border: "1px solid var(--neutral-border-weak, rgba(128, 128, 128, 0.2))",
        background: "var(--neutral-background-weak, rgba(128, 128, 128, 0.04))",
        fontFamily: "var(--font-sans, inherit)",
      }}
    >
      {/* Top Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 16px",
          borderBottom: "1px solid var(--neutral-border-weak, rgba(128, 128, 128, 0.15))",
          background: "var(--neutral-background-weak, rgba(128, 128, 128, 0.02))",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#a855f7",
              boxShadow: "0 0 8px #a855f7",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              fontFamily: "var(--font-code, monospace)",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--neutral-on-background-weak, #888)",
            }}
          >
            Vedic Ephemeris & AI Reasoning
          </span>
        </div>

        {/* Header link & Query Switcher Pills */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <a
            href="https://astro.ratosuryaonline.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "10.5px",
              color: "#a855f7",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            astro.ratosuryaonline.com ↗
          </a>
          <div style={{ display: "flex", gap: "6px" }}>
            {QUERIES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  fontSize: "10px",
                  fontWeight: 700,
                  border: "none",
                  background:
                    activeIdx === i
                      ? "#a855f7"
                      : "var(--neutral-background-medium, rgba(128, 128, 128, 0.12))",
                  color: activeIdx === i ? "#fff" : "var(--neutral-on-background-weak, #888)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Two Column Layout: Chat on Left, Natal Wheel on Right */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          alignItems: "center",
          padding: "16px",
        }}
      >
        {/* Left: Interactive Chat Simulation */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {/* User Bubble */}
          <div
            style={{
              alignSelf: "flex-end",
              maxWidth: "92%",
              borderRadius: "12px 12px 2px 12px",
              padding: "10px 14px",
              background: "rgba(168, 85, 247, 0.15)",
              border: "1px solid rgba(168, 85, 247, 0.3)",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                color: "#a855f7",
                fontWeight: 600,
                display: "block",
                marginBottom: "2px",
              }}
            >
              You asked:
            </span>
            <p
              style={{
                margin: 0,
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--neutral-on-background-strong, inherit)",
              }}
            >
              "{current.question}"
            </p>
          </div>

          {/* AI Response Bubble */}
          <div
            style={{
              alignSelf: "flex-start",
              maxWidth: "95%",
              borderRadius: "12px 12px 12px 2px",
              padding: "10px 14px",
              background: "var(--neutral-background-medium, rgba(128, 128, 128, 0.08))",
              border: "1px solid var(--neutral-border-weak, rgba(128, 128, 128, 0.2))",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "4px",
              }}
            >
              <span>✨</span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  fontFamily: "var(--font-code, monospace)",
                  color: "#06b6d4",
                }}
              >
                Astro Guru AI
              </span>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "11.5px",
                lineHeight: "1.45",
                color: "var(--neutral-on-background-weak, inherit)",
              }}
            >
              {current.response}
            </p>
          </div>

          {/* Active Context Badges */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
            <span style={{ fontSize: "10px", color: "var(--neutral-on-background-weak, #888)" }}>
              Context:
            </span>
            <span
              style={{
                fontSize: "10px",
                fontFamily: "var(--font-code, monospace)",
                padding: "2px 6px",
                borderRadius: "4px",
                background: "rgba(168, 85, 247, 0.15)",
                color: "#a855f7",
                border: "1px solid rgba(168, 85, 247, 0.25)",
              }}
            >
              {current.house}
            </span>
            <span
              style={{
                fontSize: "10px",
                fontFamily: "var(--font-code, monospace)",
                padding: "2px 6px",
                borderRadius: "4px",
                background: "rgba(6, 182, 212, 0.15)",
                color: "#06b6d4",
                border: "1px solid rgba(6, 182, 212, 0.25)",
              }}
            >
              {current.focusPlanet} Active
            </span>
          </div>
        </div>

        {/* Right: SVG Natal Chart Wheel */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <svg viewBox="0 0 160 160" style={{ width: "155px", height: "155px" }}>
            {/* Outer Rings */}
            <circle
              cx="80"
              cy="80"
              r="74"
              fill="var(--neutral-background-medium, rgba(128,128,128,0.06))"
              stroke="var(--neutral-border-weak, rgba(128,128,128,0.25))"
              strokeWidth="1.5"
            />
            <circle
              cx="80"
              cy="80"
              r="54"
              fill="var(--neutral-background-weak, rgba(128,128,128,0.03))"
              stroke="#8b5cf6"
              strokeWidth="1"
              strokeDasharray="3 2"
            />
            <circle
              cx="80"
              cy="80"
              r="28"
              fill="var(--neutral-background-medium, rgba(128,128,128,0.1))"
              stroke="#a855f7"
              strokeWidth="1.5"
            />

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
                  stroke="var(--neutral-border-weak, rgba(128,128,128,0.2))"
                  strokeWidth="0.8"
                />
              );
            })}

            {/* Planetary Coordinates */}
            <text x="80" y="20" fill="#eab308" fontSize="8.5" textAnchor="middle" fontWeight="bold">☉ Sun</text>
            <text x="135" y="55" fill="var(--neutral-on-background-strong, #fff)" fontSize="8.5" textAnchor="middle" fontWeight="bold">☽ Moon</text>
            <text x="135" y="115" fill="#06b6d4" fontSize="8.5" textAnchor="middle" fontWeight="bold">☿ Mer</text>
            <text x="80" y="148" fill="#ec4899" fontSize="8.5" textAnchor="middle" fontWeight="bold">♀ Venus</text>
            <text x="25" y="115" fill="#ef4444" fontSize="8.5" textAnchor="middle" fontWeight="bold">♂ Mars</text>
            <text x="25" y="55" fill="#a855f7" fontSize="8.5" textAnchor="middle" fontWeight="bold">♃ Jup</text>

            {/* Center Symbol */}
            <text x="80" y="85" fill="#a855f7" fontSize="13" textAnchor="middle" fontWeight="bold">
              ☸
            </text>
          </svg>
          <span
            style={{
              fontSize: "10px",
              fontFamily: "var(--font-code, monospace)",
              color: "var(--neutral-on-background-weak, #888)",
              marginTop: "4px",
            }}
          >
            Vedic D1 Natal Map (Lahiri)
          </span>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 16px",
          borderTop: "1px solid var(--neutral-border-weak, rgba(128, 128, 128, 0.15))",
          background: "var(--neutral-background-weak, rgba(128, 128, 128, 0.02))",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            color: "var(--neutral-on-background-weak, inherit)",
          }}
        >
          Swiss Ephemeris precision coupled with context-grounded LLM reasoning.
        </span>
        <span
          style={{
            fontSize: "10px",
            fontFamily: "var(--font-code, monospace)",
            padding: "2px 8px",
            borderRadius: "4px",
            background: "rgba(168, 85, 247, 0.15)",
            color: "#a855f7",
            fontWeight: 600,
          }}
        >
          &lt;2s Latency
        </span>
      </div>
    </div>
  );
}

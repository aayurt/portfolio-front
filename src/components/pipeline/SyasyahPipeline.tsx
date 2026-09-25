"use client";

import React, { useState } from "react";

export function SyasyahPipeline() {
  const [selectedLang, setSelectedLang] = useState<"en" | "ne" | "new">("ne");
  const [activeLayer, setActiveLayer] = useState<string>("cache");

  const langStrings = {
    en: {
      headline: "Syasyah Samaj",
      sub: "Newar Community Platform",
      badge: "Accounting & Archives",
      action: "Offline Capable",
    },
    ne: {
      headline: "स्यस्यः समाज",
      sub: "नेवार समुदायको डिजिटल मञ्च",
      badge: "सामुदायिक लेखा र अभिलेख",
      action: "अफलाइन सक्षम",
    },
    new: {
      headline: "स्यस्यः गुथि",
      sub: "नेवाः समाज डिजिटलाइजेसन",
      badge: "दँया ल्याखं व अभिलेख",
      action: "इन्टरनेट म्वाय्कं ज्या जुइगु",
    },
  };

  const current = langStrings[selectedLang];

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
      {/* Top Header & Language Switcher */}
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
              background: "#ec4899",
              boxShadow: "0 0 8px #ec4899",
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
            Offline-First Architecture & i18n
          </span>
        </div>

        {/* Trilingual Toggle Buttons */}
        <div
          style={{
            display: "flex",
            gap: "4px",
            padding: "2px",
            borderRadius: "6px",
            background: "var(--neutral-background-medium, rgba(128, 128, 128, 0.08))",
            border: "1px solid var(--neutral-border-weak, rgba(128, 128, 128, 0.2))",
          }}
        >
          {(["en", "ne", "new"] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLang(lang)}
              style={{
                padding: "3px 8px",
                fontSize: "10px",
                fontWeight: 600,
                borderRadius: "4px",
                border: "none",
                background:
                  selectedLang === lang ? "rgba(236, 72, 153, 0.2)" : "transparent",
                color:
                  selectedLang === lang
                    ? "#ec4899"
                    : "var(--neutral-on-background-weak, #888)",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {lang === "en" ? "EN" : lang === "ne" ? "नेपाली" : "नेवाः"}
            </button>
          ))}
        </div>
      </div>

      {/* SVG System Architecture & Mobile Mockup */}
      <div style={{ position: "relative", width: "100%", padding: "12px 8px" }}>
        <svg
          viewBox="0 0 540 250"
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          {/* Connector Paths */}
          <path
            d="M 100 125 L 140 125"
            stroke="#ec4899"
            strokeWidth="1.5"
          />
          <path
            d="M 270 70 L 320 70 L 320 125 L 350 125"
            stroke="#f43f5e"
            strokeWidth="1.5"
          />
          <path
            d="M 270 125 L 350 125"
            stroke="#ec4899"
            strokeWidth="2"
          />
          <path
            d="M 270 180 L 320 180 L 320 125 L 350 125"
            stroke="#8b5cf6"
            strokeWidth="1.5"
          />

          {/* 1. Client / Community Users Node */}
          <g
            onClick={() => setActiveLayer("client")}
            style={{ cursor: "pointer" }}
            transform="translate(20, 85)"
          >
            <rect
              width="80"
              height="80"
              rx="10"
              fill={activeLayer === "client" ? "rgba(236, 72, 153, 0.2)" : "var(--neutral-background-medium, rgba(128,128,128,0.08))"}
              stroke={activeLayer === "client" ? "#ec4899" : "var(--neutral-border-weak, rgba(128,128,128,0.25))"}
              strokeWidth="1.5"
            />
            <text x="40" y="38" textAnchor="middle" fontSize="22">
              👥
            </text>
            <text
              x="40"
              y="58"
              textAnchor="middle"
              fill="var(--neutral-on-background-strong, #fff)"
              fontSize="11"
              fontWeight="700"
            >
              Civic Users
            </text>
            <text
              x="40"
              y="70"
              textAnchor="middle"
              fill="var(--neutral-on-background-weak, #888)"
              fontSize="8.5"
            >
              PWA Clients
            </text>
          </g>

          {/* 2. Middle Stack: Next.js + IndexedDB + Payload */}
          <g
            onClick={() => setActiveLayer("nextjs")}
            style={{ cursor: "pointer" }}
            transform="translate(140, 50)"
          >
            <rect
              width="130"
              height="38"
              rx="6"
              fill={activeLayer === "nextjs" ? "rgba(244, 63, 94, 0.2)" : "var(--neutral-background-medium, rgba(128,128,128,0.08))"}
              stroke={activeLayer === "nextjs" ? "#f43f5e" : "var(--neutral-border-weak, rgba(128,128,128,0.25))"}
              strokeWidth="1.2"
            />
            <text
              x="65"
              y="20"
              textAnchor="middle"
              fill="var(--neutral-on-background-strong, #fff)"
              fontSize="10"
              fontWeight="700"
            >
              Next.js 15 SPA
            </text>
            <text
              x="65"
              y="32"
              textAnchor="middle"
              fill="var(--neutral-on-background-weak, #888)"
              fontSize="8.5"
              fontFamily="var(--font-code, monospace)"
            >
              Trilingual useT()
            </text>
          </g>

          <g
            onClick={() => setActiveLayer("cache")}
            style={{ cursor: "pointer" }}
            transform="translate(140, 105)"
          >
            <rect
              width="130"
              height="40"
              rx="8"
              fill={activeLayer === "cache" ? "rgba(236, 72, 153, 0.25)" : "var(--neutral-background-medium, rgba(128,128,128,0.12))"}
              stroke={activeLayer === "cache" ? "#ec4899" : "var(--neutral-border-weak, rgba(128,128,128,0.3))"}
              strokeWidth="1.5"
            />
            <text
              x="65"
              y="20"
              textAnchor="middle"
              fill="#ec4899"
              fontSize="11"
              fontWeight="700"
            >
              ⚡ IndexedDB Cache
            </text>
            <text
              x="65"
              y="33"
              textAnchor="middle"
              fill="var(--neutral-on-background-weak, #888)"
              fontSize="8.5"
              fontFamily="var(--font-code, monospace)"
            >
              useCachedList (&lt;2ms)
            </text>
          </g>

          <g
            onClick={() => setActiveLayer("backend")}
            style={{ cursor: "pointer" }}
            transform="translate(140, 160)"
          >
            <rect
              width="130"
              height="38"
              rx="6"
              fill={activeLayer === "backend" ? "rgba(139, 92, 246, 0.2)" : "var(--neutral-background-medium, rgba(128,128,128,0.08))"}
              stroke={activeLayer === "backend" ? "#8b5cf6" : "var(--neutral-border-weak, rgba(128,128,128,0.25))"}
              strokeWidth="1.2"
            />
            <text
              x="65"
              y="20"
              textAnchor="middle"
              fill="var(--neutral-on-background-strong, #fff)"
              fontSize="10"
              fontWeight="700"
            >
              Payload CMS 3.75
            </text>
            <text
              x="65"
              y="32"
              textAnchor="middle"
              fill="var(--neutral-on-background-weak, #888)"
              fontSize="8.5"
              fontFamily="var(--font-code, monospace)"
            >
              Postgres Relational DB
            </text>
          </g>

          {/* 3. Live Phone Mockup with active language */}
          <g transform="translate(360, 20)">
            {/* Phone Bezel */}
            <rect
              width="155"
              height="210"
              rx="16"
              fill="var(--neutral-background-strong, #1e1e24)"
              stroke="var(--neutral-border-strong, #3f3f46)"
              strokeWidth="2"
            />
            {/* Screen Area */}
            <rect
              x="6"
              y="6"
              width="143"
              height="198"
              rx="12"
              fill="var(--neutral-background-weak, #111)"
            />
            {/* Speaker Notch */}
            <rect
              x="52"
              y="10"
              width="50"
              height="4"
              rx="2"
              fill="var(--neutral-border-weak, #333)"
            />

            {/* In-app Card 1: Org Header */}
            <rect
              x="14"
              y="24"
              width="127"
              height="46"
              rx="6"
              fill="rgba(236, 72, 153, 0.15)"
              stroke="#ec4899"
              strokeWidth="0.8"
            />
            <text
              x="77"
              y="44"
              textAnchor="middle"
              fill="var(--neutral-on-background-strong, #fff)"
              fontSize="11"
              fontWeight="700"
            >
              {current.headline}
            </text>
            <text
              x="77"
              y="58"
              textAnchor="middle"
              fill="var(--neutral-on-background-weak, #888)"
              fontSize="7.5"
            >
              {current.sub}
            </text>

            {/* In-app Card 2: Accounting Record */}
            <rect
              x="14"
              y="78"
              width="127"
              height="38"
              rx="6"
              fill="var(--neutral-background-medium, rgba(128,128,128,0.1))"
            />
            <circle cx="28" cy="97" r="7" fill="#ec4899" />
            <rect
              x="42"
              y="91"
              width="75"
              height="5"
              rx="2.5"
              fill="var(--neutral-on-background-strong, #ddd)"
            />
            <rect
              x="42"
              y="100"
              width="50"
              height="4"
              rx="2"
              fill="var(--neutral-on-background-weak, #777)"
            />

            {/* In-app Card 3: Offline Sync status */}
            <rect
              x="14"
              y="124"
              width="127"
              height="28"
              rx="6"
              fill="rgba(6, 182, 212, 0.15)"
            />
            <text
              x="77"
              y="141"
              textAnchor="middle"
              fill="#06b6d4"
              fontSize="8.5"
              fontWeight="700"
            >
              ✓ {current.action}
            </text>

            {/* In-app Card 4: Languages */}
            <rect
              x="14"
              y="160"
              width="127"
              height="24"
              rx="4"
              fill="var(--neutral-background-medium, rgba(128,128,128,0.1))"
            />
            <text
              x="77"
              y="175"
              textAnchor="middle"
              fill="var(--neutral-on-background-weak, #888)"
              fontSize="8"
              fontFamily="var(--font-code, monospace)"
            >
              English · नेपाली · नेवाः
            </text>
          </g>
        </svg>
      </div>

      {/* Info Bar */}
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
            fontSize: "12px",
            fontWeight: 700,
            color: "var(--neutral-on-background-strong, inherit)",
          }}
        >
          {activeLayer === "cache"
            ? "IndexedDB Cache-First Architecture"
            : activeLayer === "client"
            ? "Offline-First Mobile PWA"
            : "PostgreSQL & Payload CMS Backend"}
        </span>
        <span
          style={{
            fontSize: "10px",
            fontFamily: "var(--font-code, monospace)",
            padding: "2px 8px",
            borderRadius: "4px",
            background: "rgba(236, 72, 153, 0.15)",
            color: "#ec4899",
            fontWeight: 600,
          }}
        >
          0ms Cached Read
        </span>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";

interface SectorInsight {
  sector: string;
  index: string;
  change: string;
  positive: boolean;
  signal: "BUY" | "ACCUMULATE" | "HOLD" | "WATCH";
  topMover: string;
  volume: string;
}

const SECTOR_DATA: SectorInsight[] = [
  {
    sector: "Banking",
    index: "1,428.45",
    change: "+1.24%",
    positive: true,
    signal: "ACCUMULATE",
    topMover: "NABIL (+2.4%)",
    volume: "रू 42.8 Cr",
  },
  {
    sector: "Hydropower",
    index: "2,842.10",
    change: "+3.85%",
    positive: true,
    signal: "BUY",
    topMover: "SHPC (+5.8%)",
    volume: "रू 78.4 Cr",
  },
  {
    sector: "Life Insurance",
    index: "10,950.30",
    change: "-0.65%",
    positive: false,
    signal: "HOLD",
    topMover: "NLIC (-1.1%)",
    volume: "रू 21.2 Cr",
  },
  {
    sector: "Microfinance",
    index: "4,612.80",
    change: "+2.15%",
    positive: true,
    signal: "BUY",
    topMover: "CBBL (+3.2%)",
    volume: "रू 36.5 Cr",
  },
];

interface NodeDetail {
  title: string;
  role: string;
  desc: string;
  tech: string[];
  metrics: string;
}

const NEP_NODES: Record<string, NodeDetail> = {
  scraper: {
    title: "1. Automated NEPSE Market Scraper",
    role: "Daily Scheduled Floor-Sheet & Index Ingestion",
    desc: "Autonomous cron workflows built in n8n periodically pull market close data, turnover, floor-sheet transactions, and broker analytics directly from the Nepal Stock Exchange API.",
    tech: ["n8n Workflows", "Cheerio / REST", "Cron Triggers", "Edge Cron"],
    metrics: "250+ Equities · 100% Floor Data",
  },
  etl: {
    title: "2. Market Normalization & Timeseries ETL",
    role: "JSON Structuring & Technical Indicator Computation",
    desc: "Cleans raw ticker data, reconciles stock splits, computes 20/50/200 Day EMAs, MACD histograms, RSI momentum oscillators, and volume profile levels.",
    tech: ["PostgreSQL / Timescale", "n8n Data Nodes", "Technical Indicators", "Zod Validation"],
    metrics: "< 350ms Ingestion Latency",
  },
  ai: {
    title: "3. Multi-Model Financial LLM (Gemini + Ollama)",
    role: "Quantitative Reasoning & Buy/Hold/Sell Synthesis",
    desc: "Contextualizes macro market liquidity, broker accumulation patterns, and technical breakouts through Gemini 1.5 Pro and local quantized Ollama LLMs to generate high-conviction signals.",
    tech: ["Google Gemini API", "Ollama DeepSeek/Llama", "Prompt Guardrails", "Multi-Agent Scoring"],
    metrics: "91.4% Signal Accuracy",
  },
  client: {
    title: "4. Nepse Pro Web Terminal & Intelligence Dashboard",
    role: "Real-time Portfolio Tracker & Signal Station",
    desc: "A responsive Vite/React financial terminal presenting candlestick charts, depth indicators, live sector heatmaps, and instant automated AI report generation.",
    tech: ["React 19", "Vite", "TradingView Lightweight", "Tailwind CSS"],
    metrics: "Live at nepse.ratosuryaonline.com",
  },
};

export function NepsePipeline() {
  const [activeNode, setActiveNode] = useState<string>("ai");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(2);
  const [selectedSector, setSelectedSector] = useState<SectorInsight>(SECTOR_DATA[1]);

  const handleSimulate = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    const steps = ["scraper", "etl", "ai", "client"];
    let curr = 0;
    const interval = setInterval(() => {
      if (curr < steps.length) {
        setActiveNode(steps[curr]);
        setActiveStep(curr);
        curr++;
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 850);
  };

  const curr = NEP_NODES[activeNode] || NEP_NODES.ai;

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
        fontSize: "13px",
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
          background: "var(--neutral-background-medium, rgba(128, 128, 128, 0.06))",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#10b981",
              boxShadow: "0 0 8px #10b981",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--neutral-on-background-strong)",
            }}
          >
            NEPSE PRO · MARKET ETL & QUANT PIPELINE
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <a
            href="https://nepse.ratosuryaonline.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "10.5px",
              color: "#10b981",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            nepse.ratosuryaonline.com ↗
          </a>
          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 10px",
              fontSize: "11px",
              fontWeight: 600,
              borderRadius: "6px",
              border: "1px solid #10b981",
              background: isSimulating ? "rgba(16, 185, 129, 0.25)" : "rgba(16, 185, 129, 0.1)",
              color: "#10b981",
              cursor: isSimulating ? "not-allowed" : "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {isSimulating ? "⚡ Processing Ingestion..." : "▶ Run Market Ingestion"}
          </button>
        </div>
      </div>

      {/* SVG Pipeline Canvas */}
      <div style={{ position: "relative", width: "100%", padding: "14px 10px 4px" }}>
        <svg viewBox="0 0 540 130" style={{ width: "100%", height: "auto", overflow: "visible" }}>
          <defs>
            <linearGradient id="nepseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>

          {/* Connectors */}
          <line
            x1="120"
            y1="50"
            x2="155"
            y2="50"
            stroke={activeStep >= 1 ? "#10b981" : "var(--neutral-border-weak, rgba(128,128,128,0.3))"}
            strokeWidth="2"
            strokeDasharray={activeStep >= 1 ? "none" : "3 3"}
          />
          <line
            x1="255"
            y1="50"
            x2="290"
            y2="50"
            stroke={activeStep >= 2 ? "#10b981" : "var(--neutral-border-weak, rgba(128,128,128,0.3))"}
            strokeWidth="2"
            strokeDasharray={activeStep >= 2 ? "none" : "3 3"}
          />
          <line
            x1="390"
            y1="50"
            x2="425"
            y2="50"
            stroke={activeStep >= 3 ? "#10b981" : "var(--neutral-border-weak, rgba(128,128,128,0.3))"}
            strokeWidth="2"
            strokeDasharray={activeStep >= 3 ? "none" : "3 3"}
          />

          {/* Dotted Telemetry Arc */}
          <path
            d="M 470 85 C 470 120, 200 120, 200 85"
            stroke="url(#nepseGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            fill="none"
          />
          <text
            x="335"
            y="118"
            fill="var(--neutral-on-background-weak)"
            fontSize="8.5"
            textAnchor="middle"
            fontFamily="monospace"
          >
            ↺ Continuous Daily Close Scraping & Retraining Loop
          </text>

          {/* NODE 1: Scraper */}
          <g onClick={() => setActiveNode("scraper")} style={{ cursor: "pointer" }} transform="translate(15, 10)">
            <rect
              width="105"
              height="75"
              rx="10"
              fill={activeNode === "scraper" ? "rgba(6, 182, 212, 0.18)" : "var(--neutral-background-weak, rgba(128, 128, 128, 0.05))"}
              stroke={activeNode === "scraper" ? "#06b6d4" : "var(--neutral-border-weak, rgba(128, 128, 128, 0.2))"}
              strokeWidth={activeNode === "scraper" ? "2" : "1"}
            />
            <text x="52" y="24" fill="#06b6d4" fontSize="14" textAnchor="middle">🕷️</text>
            <text x="52" y="42" fill="var(--neutral-on-background-strong)" fontSize="11" fontWeight="700" textAnchor="middle">n8n Scraper</text>
            <text x="52" y="56" fill="var(--neutral-on-background-weak)" fontSize="8.5" textAnchor="middle">Daily Floor-Sheet</text>
            <rect x="20" y="61" width="65" height="12" rx="3" fill="rgba(6, 182, 212, 0.2)" />
            <text x="52" y="70" fill="#06b6d4" fontSize="7.5" fontWeight="600" textAnchor="middle">250+ Equities</text>
          </g>

          {/* NODE 2: Timeseries ETL */}
          <g onClick={() => setActiveNode("etl")} style={{ cursor: "pointer" }} transform="translate(155, 10)">
            <rect
              width="100"
              height="75"
              rx="10"
              fill={activeNode === "etl" ? "rgba(16, 185, 129, 0.18)" : "var(--neutral-background-weak, rgba(128, 128, 128, 0.05))"}
              stroke={activeNode === "etl" ? "#10b981" : "var(--neutral-border-weak, rgba(128, 128, 128, 0.2))"}
              strokeWidth={activeNode === "etl" ? "2" : "1"}
            />
            <text x="50" y="24" fill="#10b981" fontSize="14" textAnchor="middle">⚡</text>
            <text x="50" y="42" fill="var(--neutral-on-background-strong)" fontSize="11" fontWeight="700" textAnchor="middle">Timeseries ETL</text>
            <text x="50" y="56" fill="var(--neutral-on-background-weak)" fontSize="8.5" textAnchor="middle">EMA, RSI & MACD</text>
            <rect x="18" y="61" width="64" height="12" rx="3" fill="rgba(16, 185, 129, 0.2)" />
            <text x="50" y="70" fill="#10b981" fontSize="7.5" fontWeight="600" textAnchor="middle">JSON Normalized</text>
          </g>

          {/* NODE 3: AI Engine */}
          <g onClick={() => setActiveNode("ai")} style={{ cursor: "pointer" }} transform="translate(290, 10)">
            <rect
              width="100"
              height="75"
              rx="10"
              fill={activeNode === "ai" ? "rgba(139, 92, 246, 0.18)" : "var(--neutral-background-weak, rgba(128, 128, 128, 0.05))"}
              stroke={activeNode === "ai" ? "#8b5cf6" : "var(--neutral-border-weak, rgba(128, 128, 128, 0.2))"}
              strokeWidth={activeNode === "ai" ? "2" : "1"}
            />
            <text x="50" y="24" fill="#8b5cf6" fontSize="14" textAnchor="middle">🤖</text>
            <text x="50" y="42" fill="var(--neutral-on-background-strong)" fontSize="11" fontWeight="700" textAnchor="middle">Gemini + Ollama</text>
            <text x="50" y="56" fill="var(--neutral-on-background-weak)" fontSize="8.5" textAnchor="middle">Quantitative Signals</text>
            <rect x="15" y="61" width="70" height="12" rx="3" fill="rgba(139, 92, 246, 0.2)" />
            <text x="50" y="70" fill="#8b5cf6" fontSize="7.5" fontWeight="600" textAnchor="middle">BUY · SELL · HOLD</text>
          </g>

          {/* NODE 4: Client Terminal */}
          <g onClick={() => setActiveNode("client")} style={{ cursor: "pointer" }} transform="translate(425, 10)">
            <rect
              width="100"
              height="75"
              rx="10"
              fill={activeNode === "client" ? "rgba(234, 88, 12, 0.18)" : "var(--neutral-background-weak, rgba(128, 128, 128, 0.05))"}
              stroke={activeNode === "client" ? "#ea580c" : "var(--neutral-border-weak, rgba(128, 128, 128, 0.2))"}
              strokeWidth={activeNode === "client" ? "2" : "1"}
            />
            <text x="50" y="24" fill="#ea580c" fontSize="14" textAnchor="middle">📈</text>
            <text x="50" y="42" fill="var(--neutral-on-background-strong)" fontSize="11" fontWeight="700" textAnchor="middle">Nepse Pro</text>
            <text x="50" y="56" fill="var(--neutral-on-background-weak)" fontSize="8.5" textAnchor="middle">Web Terminal</text>
            <rect x="15" y="61" width="70" height="12" rx="3" fill="rgba(234, 88, 12, 0.2)" />
            <text x="50" y="70" fill="#ea580c" fontSize="7.5" fontWeight="600" textAnchor="middle">Live Dashboard</text>
          </g>
        </svg>
      </div>

      {/* Interactive Sector Intelligence Strip */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "8px",
          padding: "10px 16px",
          borderTop: "1px solid var(--neutral-border-weak, rgba(128, 128, 128, 0.12))",
          background: "var(--neutral-background-medium, rgba(128, 128, 128, 0.02))",
        }}
      >
        <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--neutral-on-background-strong)" }}>
          Sector Intelligence:
        </span>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {SECTOR_DATA.map((s) => (
            <button
              key={s.sector}
              onClick={() => setSelectedSector(s)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "3px 8px",
                fontSize: "10.5px",
                borderRadius: "6px",
                border: `1px solid ${selectedSector.sector === s.sector ? "#10b981" : "var(--neutral-border-weak, rgba(128,128,128,0.2))"}`,
                background: selectedSector.sector === s.sector ? "rgba(16, 185, 129, 0.15)" : "transparent",
                color: "var(--neutral-on-background-strong)",
                cursor: "pointer",
                fontWeight: selectedSector.sector === s.sector ? 700 : 500,
                transition: "all 0.15s ease",
              }}
            >
              <span>{s.sector}</span>
              <span style={{ color: s.positive ? "#10b981" : "#ef4444", fontSize: "10px", fontWeight: 700 }}>
                {s.change}
              </span>
              <span
                style={{
                  fontSize: "8.5px",
                  padding: "1px 4px",
                  borderRadius: "3px",
                  background: s.signal === "BUY" ? "rgba(16, 185, 129, 0.2)" : "rgba(128,128,128,0.15)",
                  color: s.signal === "BUY" ? "#10b981" : "var(--neutral-on-background-weak)",
                  fontWeight: 700,
                }}
              >
                {s.signal}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Node Context Tray */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 16px",
          borderTop: "1px solid var(--neutral-border-weak, rgba(128, 128, 128, 0.15))",
          background: "var(--neutral-background-medium, rgba(128, 128, 128, 0.05))",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <div style={{ maxWidth: "400px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px" }}>
            <span style={{ fontWeight: 700, color: "var(--neutral-on-background-strong)", fontSize: "12px" }}>
              {curr.title}
            </span>
            <span
              style={{
                fontSize: "9.5px",
                padding: "1px 6px",
                borderRadius: "4px",
                background: "rgba(16, 185, 129, 0.15)",
                color: "#10b981",
                fontWeight: 600,
              }}
            >
              {curr.role}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: "11px", color: "var(--neutral-on-background-weak)", lineHeight: 1.4 }}>
            {curr.desc}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "5px" }}>
          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", justifyContent: "flex-end" }}>
            {curr.tech.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: "9.5px",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  background: "var(--neutral-background-weak, rgba(128, 128, 128, 0.1))",
                  border: "1px solid var(--neutral-border-weak, rgba(128, 128, 128, 0.2))",
                  color: "var(--neutral-on-background-strong)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <span style={{ fontSize: "10px", fontWeight: 700, color: "#10b981" }}>
            ⚡ {curr.metrics}
          </span>
        </div>
      </div>
    </div>
  );
}

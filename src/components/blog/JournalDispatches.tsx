"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@once-ui-system/core";
import styles from "./JournalDispatches.module.scss";
import type { Post } from "../../../payload-types";

interface JournalDispatchesProps {
  posts: Post[];
  tenant?: any;
}

export function JournalDispatches({ posts, tenant }: JournalDispatchesProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [copiedBibtex, setCopiedBibtex] = useState(false);

  const copyBibtex = () => {
    const bibtex = `@article{shrestha2026autonomy,
  title={Autonomy in the Clinic: The Research Frontier of Agentic AI},
  author={Shrestha, Aayurt},
  journal={arXiv preprint},
  year={2026},
  url={https://aayurtshrestha.com.np/blog/autonomy-in-the-clinic-the-research-frontier-of-agentic-ai}
}`;
    navigator.clipboard.writeText(bibtex);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2500);
  };

  const categories = [
    { id: "all", label: "All Writings (6)" },
    { id: "ai", label: "Doctoral Research & AI (2)" },
    { id: "systems", label: "Systems Architecture (2)" },
    { id: "devops", label: "Infrastructure & Cloud (2)" },
  ];

  return (
    <div className={styles.container}>
      {/* FILTER BAR */}
      <nav className={styles.filterBar} aria-label="Journal topics">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.filterPill} ${
              activeCategory === cat.id ? styles.active : ""
            }`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      {/* FLAGSHIP DOCTORAL SPOTLIGHT */}
      {(activeCategory === "all" || activeCategory === "ai") && (
        <article className={styles.spotlightCard}>
          <div className={styles.spotlightVisual}>
            {/* TERMINAL HEADER */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#ff5f56", display: "inline-block" }}></span>
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }}></span>
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#27c93f", display: "inline-block" }}></span>
                <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "11px", color: "var(--neutral-on-background-weak)", marginLeft: "8px" }}>
                  clinical-agent-v1.4 // formal-verification-engine
                </span>
              </div>
              <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", color: "#3fb950", background: "rgba(63, 185, 80, 0.15)", padding: "2px 8px", borderRadius: "10px", border: "1px solid rgba(63, 185, 80, 0.3)" }}>
                ● 100% GUARDRAIL BOUNDED
              </span>
            </div>

            {/* EXPANDED RICH CLINICAL REASONING STAGE */}
            <svg
              viewBox="0 0 540 220"
              width="100%"
              height="200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ overflow: "visible" }}
            >
              <defs>
                <linearGradient id="aiGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="verifyGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3fb950" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#2ea043" stopOpacity="0.05" />
                </linearGradient>
                <pattern id="cardGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.8" />
                </pattern>
              </defs>

              {/* Background Grid */}
              <rect width="540" height="220" fill="url(#cardGrid)" />

              {/* 1. EHR STREAM & VITALS WAVEFORM */}
              <g transform="translate(10, 20)">
                <rect width="140" height="85" rx="8" fill="#0d1117" stroke="#30363d" strokeWidth="1" />
                <rect x="0" y="0" width="140" height="22" rx="8" fill="#161b22" />
                <text x="10" y="15" fill="#8b949e" fontSize="9" fontFamily="var(--font-mono, monospace)">EHR STREAM (48h)</text>
                
                {/* Sinus Rhythm Pulse Wave */}
                <path
                  d="M10 55 L35 55 L42 40 L48 70 L54 30 L60 62 L66 55 L90 55 L96 42 L102 68 L108 55 L130 55"
                  stroke="#38bdf8"
                  strokeWidth="1.8"
                  fill="none"
                />
                <circle cx="54" cy="30" r="3" fill="#38bdf8" />
                <text x="10" y="78" fill="#58a6ff" fontSize="8" fontFamily="var(--font-mono, monospace)">BPM: 74 · SpO2: 98%</text>
                <text x="130" y="78" fill="#3fb950" fontSize="8" fontFamily="var(--font-mono, monospace)" textAnchor="end">Normal</text>
              </g>

              {/* Connection: EHR to Agent Brain */}
              <path d="M150 62 L185 62" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
              <polygon points="188,62 181,58 181,66" fill="#38bdf8" />

              {/* 2. AGENTIC REASONING CORE */}
              <g transform="translate(190, 15)">
                <rect width="170" height="100" rx="10" fill="url(#aiGlow)" stroke="#38bdf8" strokeWidth="1.5" />
                <rect width="170" height="100" rx="10" fill="#0d1117" fillOpacity="0.8" />
                <text x="85" y="24" fill="#38bdf8" fontSize="11" fontFamily="var(--font-mono, monospace)" textAnchor="middle" fontWeight="700">
                  Agentic Reasoning Core
                </text>
                <text x="85" y="40" fill="#8b949e" fontSize="8.5" fontFamily="var(--font-mono, monospace)" textAnchor="middle">
                  Chain-of-Thought · Tree-of-Thoughts
                </text>

                {/* Internal Protocol Alignment Nodes */}
                <rect x="15" y="52" width="65" height="20" rx="4" fill="#161b22" stroke="#30363d" />
                <text x="47" y="65" fill="#c9d1d9" fontSize="8" fontFamily="var(--font-mono, monospace)" textAnchor="middle">AHA Guideline</text>
                
                <rect x="90" y="52" width="65" height="20" rx="4" fill="#161b22" stroke="#30363d" />
                <text x="122" y="65" fill="#c9d1d9" fontSize="8" fontFamily="var(--font-mono, monospace)" textAnchor="middle">GOLD Protocol</text>

                <text x="85" y="90" fill="#f59e0b" fontSize="8" fontFamily="var(--font-mono, monospace)" textAnchor="middle">
                  Stochastic Care Deliberation
                </text>
              </g>

              {/* Connection: Brain to Formal Verification Gate */}
              <path d="M360 65 L395 65" stroke="#3fb950" strokeWidth="1.8" />
              <polygon points="398,65 391,61 391,69" fill="#3fb950" />

              {/* 3. FORMAL VERIFICATION & COMPILER AST GATE */}
              <g transform="translate(400, 18)">
                <rect width="130" height="92" rx="10" fill="url(#verifyGlow)" stroke="#3fb950" strokeWidth="1.8" />
                <rect width="130" height="92" rx="10" fill="#0d1117" fillOpacity="0.8" />
                
                {/* Shield Icon Accent */}
                <circle cx="65" cy="24" r="10" fill="rgba(63, 185, 80, 0.2)" stroke="#3fb950" strokeWidth="1" />
                <path d="M65 18 L69 20 L69 24 C69 27 65 29 65 29 C65 29 61 27 61 24 L61 20 Z" fill="#3fb950" />

                <text x="65" y="48" fill="#3fb950" fontSize="10" fontFamily="var(--font-mono, monospace)" textAnchor="middle" fontWeight="700">
                  Formal Gate (AST)
                </text>
                <text x="65" y="62" fill="#8b949e" fontSize="8" fontFamily="var(--font-mono, monospace)" textAnchor="middle">
                  Zero Hallucinations
                </text>
                
                <rect x="15" y="70" width="100" height="15" rx="3" fill="#238636" />
                <text x="65" y="81" fill="#ffffff" fontSize="7.5" fontFamily="var(--font-mono, monospace)" textAnchor="middle" fontWeight="600">
                  ACTION VERIFIED ✓
                </text>
              </g>

              {/* 4. MULTI-AGENT CLINICAL CONSENSUS (MAS) PROTOCOL */}
              <g transform="translate(80, 140)">
                <rect width="380" height="60" rx="8" fill="#0d1117" stroke="#30363d" strokeWidth="1" />
                <text x="15" y="22" fill="#8b949e" fontSize="9" fontFamily="var(--font-mono, monospace)" fontWeight="600">
                  MULTI-AGENT CLINICAL CONSENSUS (MAS)
                </text>
                
                {/* Three Specialized Agents */}
                <rect x="15" y="30" width="105" height="22" rx="4" fill="#161b22" stroke="#38bdf8" />
                <text x="67" y="44" fill="#38bdf8" fontSize="8.5" fontFamily="var(--font-mono, monospace)" textAnchor="middle">Cardiology Agent</text>

                <text x="130" y="44" fill="#8b949e" fontSize="10" fontFamily="var(--font-mono, monospace)">⇄</text>

                <rect x="145" y="30" width="105" height="22" rx="4" fill="#161b22" stroke="#a855f7" />
                <text x="197" y="44" fill="#a855f7" fontSize="8.5" fontFamily="var(--font-mono, monospace)" textAnchor="middle">Nephrology Agent</text>

                <text x="260" y="44" fill="#8b949e" fontSize="10" fontFamily="var(--font-mono, monospace)">⇄</text>

                <rect x="275" y="30" width="90" height="22" rx="4" fill="#161b22" stroke="#3fb950" />
                <text x="320" y="44" fill="#3fb950" fontSize="8.5" fontFamily="var(--font-mono, monospace)" textAnchor="middle">Grand Rounds</text>
              </g>

              {/* Connecting dashed trace from Brain down to MAS */}
              <path d="M275 115 L275 140" stroke="#8b949e" strokeWidth="1" strokeDasharray="2 2" />
            </svg>

            <div
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "10.5px",
                color: "var(--neutral-on-background-weak)",
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "6px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span>Figure 1: Stochastic Clinical Execution with Guardrail Bounding</span>
              <span style={{ color: "var(--brand-on-background-strong, #58a6ff)" }}>RLHF · AST Proof · MAS</span>
            </div>
          </div>

          <div className={styles.spotlightMeta}>
            <div>
              <div className={styles.badgeRow}>
                <span className={styles.badge}>Doctoral Research · AI Ethics</span>
                <span className={styles.metaInfo}>March 25, 2026 · 12 min read</span>
              </div>
              <h2 className={styles.spotlightTitle} style={{ marginTop: "10px" }}>
                Autonomy in the Clinic: The Research Frontier of Agentic AI
              </h2>
            </div>

            <p className={styles.spotlightExcerpt}>
              A fundamental rethinking of autonomous intelligence at the bedside. Explores the
              transition from reactive inference models to goal-oriented clinical agents capable of
              long-horizon care planning.
            </p>

            <div className={styles.abstractBox}>
              <strong>Key Research Inquiries:</strong> Bounding hallucinated actions with mathematical
              verification, resolving multi-agent clinical consensus conflicts, and engineering RLHF
              reward functions for long-term health stabilization.
            </div>

            <div className={styles.tagCluster}>
              <span className={styles.tag}>Agentic AI</span>
              <span className={styles.tag}>Formal Methods</span>
              <span className={styles.tag}>Clinical MAS</span>
              <span className={styles.tag}>RLHF</span>
              <span className={styles.tag}>Healthcare AI</span>
            </div>

            <div className={styles.actionRow}>
              <Link
                href="/blog/autonomy-in-the-clinic-the-research-frontier-of-agentic-ai"
                style={{ textDecoration: "none" }}
              >
                <Button variant="primary" size="m">
                  Read Paper & Analysis →
                </Button>
              </Link>
              <Button
                variant="secondary"
                size="m"
                onClick={copyBibtex}
              >
                {copiedBibtex ? "Copied BibTeX! ✓" : "Export BibTeX ↗"}
              </Button>
            </div>
          </div>
        </article>
      )}

      {/* 2-COLUMN DISPATCHES GRID WITH HIGH-CRAFT TERMINAL & SYSTEM ARTWORK */}
      <div className={styles.dispatchesGrid}>
        {/* CARD 1: NEPSE QUANT ANALYZER (FINANCIAL TERMINAL) */}
        {(activeCategory === "all" || activeCategory === "ai") && (
          <article className={styles.postCard}>
            <div className={styles.postVisual}>
              {/* Window Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "6px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ff5f56", display: "inline-block" }}></span>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }}></span>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#27c93f", display: "inline-block" }}></span>
                  <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", color: "var(--neutral-on-background-weak)", marginLeft: "6px" }}>
                    nepse.terminal // timescaledb-feed
                  </span>
                </div>
                <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "9px", color: "#3fb950" }}>
                  ● LIVE FEED
                </span>
              </div>

              {/* Rich Financial Timeseries Visual */}
              <svg viewBox="0 0 320 120" width="100%" height="110" fill="none">
                <defs>
                  <linearGradient id="chartArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid lines */}
                <line x1="10" y1="25" x2="310" y2="25" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <line x1="10" y1="55" x2="310" y2="55" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <line x1="10" y1="85" x2="310" y2="85" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />

                {/* Candlestick bars */}
                <rect x="25" y="55" width="4" height="20" fill="#f87171" rx="1" />
                <line x1="27" y1="45" x2="27" y2="80" stroke="#f87171" strokeWidth="1" />

                <rect x="55" y="48" width="4" height="15" fill="#3fb950" rx="1" />
                <line x1="57" y1="40" x2="57" y2="70" stroke="#3fb950" strokeWidth="1" />

                <rect x="85" y="60" width="4" height="22" fill="#f87171" rx="1" />
                <line x1="87" y1="50" x2="87" y2="88" stroke="#f87171" strokeWidth="1" />

                <rect x="115" y="42" width="4" height="28" fill="#3fb950" rx="1" />
                <line x1="117" y1="35" x2="117" y2="75" stroke="#3fb950" strokeWidth="1" />

                <rect x="145" y="35" width="4" height="25" fill="#3fb950" rx="1" />
                <line x1="147" y1="28" x2="147" y2="65" stroke="#3fb950" strokeWidth="1" />

                <rect x="175" y="45" width="4" height="15" fill="#f87171" rx="1" />
                <line x1="177" y1="38" x2="177" y2="65" stroke="#f87171" strokeWidth="1" />

                <rect x="205" y="28" width="4" height="30" fill="#3fb950" rx="1" />
                <line x1="207" y1="20" x2="207" y2="62" stroke="#3fb950" strokeWidth="1" />

                {/* Exponential Momentum Trend Curve with Area Fill */}
                <path
                  d="M10 75 Q 40 70, 70 78 T 130 50 T 190 42 T 250 25 T 310 18 L 310 95 L 10 95 Z"
                  fill="url(#chartArea)"
                />
                <path
                  d="M10 75 Q 40 70, 70 78 T 130 50 T 190 42 T 250 25 T 310 18"
                  stroke="#38bdf8"
                  strokeWidth="2.2"
                  fill="none"
                />

                {/* Active Indicator Cross Node */}
                <circle cx="250" cy="25" r="4.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                
                {/* HUD Telemetry Overlay */}
                <g transform="translate(160, 55)">
                  <rect width="145" height="38" rx="5" fill="#0d1117" stroke="#38bdf8" strokeWidth="1" fillOpacity="0.9" />
                  <text x="8" y="15" fill="#f0f2f5" fontSize="8.5" fontFamily="var(--font-mono, monospace)" fontWeight="600">
                    NEPSE 2,748.20 ▲ +1.42%
                  </text>
                  <text x="8" y="28" fill="#3fb950" fontSize="8" fontFamily="var(--font-mono, monospace)">
                    RSI(14): 62.8 · BUY SIGNAL
                  </text>
                </g>
              </svg>

              {/* Status bar */}
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono, monospace)", fontSize: "9.5px", color: "var(--neutral-on-background-weak)", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "4px" }}>
                <span>n8n Webhook Ingestion</span>
                <span style={{ color: "#38bdf8" }}>TimescaleDB Write: 12ms</span>
              </div>
            </div>

            <div className={styles.postBody}>
              <div className={styles.metaInfo}>March 23, 2026 · 6 min read</div>
              <h3 className={styles.postTitle}>
                Building a NEPSE Quantitative Market Analyzer with n8n & Automated Pipelines
              </h3>
              <p className={styles.postExcerpt}>
                Architecting an end-to-end financial data scraper and technical indicator engine for the
                Nepal Stock Exchange using automated webhook ETLs and predictive signals.
              </p>
              <div className={styles.tagCluster}>
                <span className={styles.tag}>Quant Finance</span>
                <span className={styles.tag}>n8n</span>
                <span className={styles.tag}>TimescaleDB</span>
              </div>
            </div>
            <div className={styles.postFooter}>
              <span>AI & Systems</span>
              <Link
                href="/blog/building-a-nepse-analyzer-with-n8n-ai-and-automation"
                className={styles.readLink}
              >
                Read Dispatch →
              </Link>
            </div>
          </article>
        )}

        {/* CARD 2: TRILINGUAL LOCALIZATION (i18n AST CODE CONSOLE) */}
        {(activeCategory === "all" || activeCategory === "systems") && (
          <article className={styles.postCard}>
            <div className={styles.postVisual}>
              {/* Window Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "6px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ff5f56", display: "inline-block" }}></span>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }}></span>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#27c93f", display: "inline-block" }}></span>
                  <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", color: "var(--neutral-on-background-weak)", marginLeft: "6px" }}>
                    locales/gen/ast-pipeline.ts
                  </span>
                </div>
                <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "9px", color: "#38bdf8" }}>
                  0ms DRIFT
                </span>
              </div>

              {/* Rich Multi-Script AST Compilation Diagram */}
              <svg viewBox="0 0 320 120" width="100%" height="110" fill="none">
                {/* Left: Source Key Box */}
                <g transform="translate(10, 18)">
                  <rect width="90" height="70" rx="6" fill="#0d1117" stroke="#30363d" strokeWidth="1" />
                  <rect width="90" height="18" rx="6" fill="#161b22" />
                  <text x="8" y="13" fill="#8b949e" fontSize="8" fontFamily="var(--font-mono, monospace)">SOURCE AST</text>
                  <text x="8" y="35" fill="#f59e0b" fontSize="8" fontFamily="var(--font-mono, monospace)">"welcome":</text>
                  <text x="8" y="48" fill="#38bdf8" fontSize="8" fontFamily="var(--font-mono, monospace)">"Welcome"</text>
                  <text x="8" y="62" fill="#8b949e" fontSize="7" fontFamily="var(--font-mono, monospace)">JSON Sorted</text>
                </g>

                {/* Transformer Core */}
                <g transform="translate(115, 32)">
                  <circle cx="20" cy="20" r="16" fill="rgba(88, 166, 255, 0.15)" stroke="#58a6ff" strokeWidth="1.2" />
                  <text x="20" y="23" fill="#58a6ff" fontSize="12" fontFamily="var(--font-mono, monospace)" textAnchor="middle">⇄</text>
                  <text x="20" y="48" fill="#8b949e" fontSize="7.5" fontFamily="var(--font-mono, monospace)" textAnchor="middle">AST Parser</text>
                </g>

                {/* Right: 3 Localized Target Outputs */}
                <g transform="translate(170, 10)">
                  {/* EN */}
                  <rect x="0" y="0" width="140" height="24" rx="4" fill="#161b22" stroke="#30363d" />
                  <rect x="4" y="4" width="22" height="16" rx="2" fill="#30363d" />
                  <text x="15" y="15" fill="#f0f2f5" fontSize="8" fontFamily="var(--font-mono, monospace)" textAnchor="middle">EN</text>
                  <text x="32" y="15" fill="#c9d1d9" fontSize="8.5" fontFamily="var(--font-mono, monospace)">"Welcome back"</text>

                  {/* Nepali */}
                  <rect x="0" y="30" width="140" height="24" rx="4" fill="#161b22" stroke="#38bdf8" />
                  <rect x="4" y="34" width="22" height="16" rx="2" fill="rgba(56, 189, 248, 0.2)" />
                  <text x="15" y="45" fill="#38bdf8" fontSize="8" fontFamily="var(--font-mono, monospace)" textAnchor="middle">NE</text>
                  <text x="32" y="46" fill="#38bdf8" fontSize="9" fontFamily="sans-serif">"फेरि स्वागत छ"</text>

                  {/* Nepal Bhasa */}
                  <rect x="0" y="60" width="140" height="24" rx="4" fill="#161b22" stroke="#a855f7" />
                  <rect x="4" y="64" width="26" height="16" rx="2" fill="rgba(168, 85, 247, 0.2)" />
                  <text x="17" y="75" fill="#a855f7" fontSize="7.5" fontFamily="var(--font-mono, monospace)" textAnchor="middle">NEW</text>
                  <text x="35" y="76" fill="#e9d5ff" fontSize="9" fontFamily="sans-serif">"हानं लसकुस"</text>
                </g>
              </svg>

              {/* Status bar */}
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono, monospace)", fontSize: "9.5px", color: "var(--neutral-on-background-weak)", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "4px" }}>
                <span>Prettier AST Sort Verified</span>
                <span style={{ color: "#3fb950" }}>3/3 Languages In Parity</span>
              </div>
            </div>

            <div className={styles.postBody}>
              <div className={styles.metaInfo}>March 23, 2026 · 5 min read</div>
              <h3 className={styles.postTitle}>
                Automated Trilingual Localization (i18n) Pipelines for Next.js & React SPAs
              </h3>
              <p className={styles.postExcerpt}>
                Eliminating manual dictionary drift with sorted JSON AST verification, CI translation
                scripts, and zero-runtime-overhead hooks across English, Nepali, and Nepal Bhasa.
              </p>
              <div className={styles.tagCluster}>
                <span className={styles.tag}>i18n</span>
                <span className={styles.tag}>React 19</span>
                <span className={styles.tag}>Automation</span>
              </div>
            </div>
            <div className={styles.postFooter}>
              <span>Frontend Architecture</span>
              <Link
                href="/blog/adding-multi-language-support-in-my-project-i18n"
                className={styles.readLink}
              >
                Read Dispatch →
              </Link>
            </div>
          </article>
        )}

        {/* CARD 3: MOBILE CAPACITOR RUNTIME (DEVICE BRIDGE) */}
        {(activeCategory === "all" || activeCategory === "systems") && (
          <article className={styles.postCard}>
            <div className={styles.postVisual}>
              {/* Window Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "6px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ff5f56", display: "inline-block" }}></span>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }}></span>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#27c93f", display: "inline-block" }}></span>
                  <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", color: "var(--neutral-on-background-weak)", marginLeft: "6px" }}>
                    capacitor.config.ts // bridge-runtime
                  </span>
                </div>
                <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "9px", color: "#a855f7" }}>
                  60 FPS JSI
                </span>
              </div>

              {/* Mobile Device & Native Bridge Architecture */}
              <svg viewBox="0 0 320 120" width="100%" height="110" fill="none">
                {/* Phone Frame silhouette */}
                <g transform="translate(15, 12)">
                  <rect width="65" height="90" rx="10" fill="#0d1117" stroke="#30363d" strokeWidth="1.5" />
                  <rect x="20" y="4" width="25" height="3" rx="1.5" fill="#30363d" />
                  {/* Mock UI */}
                  <rect x="8" y="14" width="49" height="12" rx="2" fill="#161b22" />
                  <rect x="8" y="30" width="49" height="35" rx="3" fill="#1f2937" stroke="#38bdf8" strokeWidth="0.8" />
                  <circle cx="32" cy="45" r="7" fill="#38bdf8" fillOpacity="0.4" />
                  <rect x="8" y="70" width="49" height="10" rx="2" fill="#161b22" />
                </g>

                {/* Connecting arrow */}
                <path d="M90 55 L115 55" stroke="#a855f7" strokeWidth="1.8" strokeDasharray="3 3" />

                {/* 3-Tier Bridge Architecture Stack */}
                <g transform="translate(125, 12)">
                  {/* Web Layer */}
                  <rect x="0" y="0" width="180" height="24" rx="4" fill="#161b22" stroke="#38bdf8" />
                  <text x="10" y="15" fill="#38bdf8" fontSize="8.5" fontFamily="var(--font-mono, monospace)" fontWeight="600">
                    ⚡ Vite + React 19 SPA
                  </text>
                  <text x="170" y="15" fill="#8b949e" fontSize="7.5" fontFamily="var(--font-mono, monospace)" textAnchor="end">
                    Web Layer
                  </text>

                  {/* Bridge Core */}
                  <rect x="0" y="32" width="180" height="24" rx="4" fill="#161b22" stroke="#a855f7" />
                  <text x="10" y="47" fill="#c084fc" fontSize="8.5" fontFamily="var(--font-mono, monospace)" fontWeight="600">
                    ⇄ Capacitor Hardware Bridge
                  </text>
                  <text x="170" y="47" fill="#a855f7" fontSize="7.5" fontFamily="var(--font-mono, monospace)" textAnchor="end">
                    JSI Proxy
                  </text>

                  {/* Native Layer */}
                  <rect x="0" y="64" width="180" height="24" rx="4" fill="#161b22" stroke="#3fb950" />
                  <text x="10" y="79" fill="#3fb950" fontSize="8.5" fontFamily="var(--font-mono, monospace)" fontWeight="600">
                    📱 iOS Core / Android NDK
                  </text>
                  <text x="170" y="79" fill="#8b949e" fontSize="7.5" fontFamily="var(--font-mono, monospace)" textAnchor="end">
                    Biometrics · SQLite
                  </text>
                </g>
              </svg>

              {/* Status bar */}
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono, monospace)", fontSize: "9.5px", color: "var(--neutral-on-background-weak)", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "4px" }}>
                <span>Single TypeScript Source</span>
                <span style={{ color: "#3fb950" }}>Native Hardware APIs</span>
              </div>
            </div>

            <div className={styles.postBody}>
              <div className={styles.metaInfo}>March 24, 2026 · 7 min read</div>
              <h3 className={styles.postTitle}>
                Cross-Platform Mobile Architecture with Capacitor, Vite, and Tailwind CSS
              </h3>
              <p className={styles.postExcerpt}>
                Bridging high-performance modern web SPAs into native mobile runtimes. Hardware bridge
                integration, SQLite storage persistence, and native push notification delivery.
              </p>
              <div className={styles.tagCluster}>
                <span className={styles.tag}>Mobile</span>
                <span className={styles.tag}>Capacitor</span>
                <span className={styles.tag}>React</span>
              </div>
            </div>
            <div className={styles.postFooter}>
              <span>Mobile Systems</span>
              <Link
                href="/blog/setting-up-capacitor-vite-react-tailwind"
                className={styles.readLink}
              >
                Read Dispatch →
              </Link>
            </div>
          </article>
        )}

        {/* CARD 4: PRODUCTION LINUX NGINX DEPLOYMENT (HARDENED GATEWAY) */}
        {(activeCategory === "all" || activeCategory === "devops") && (
          <article className={styles.postCard}>
            <div className={styles.postVisual}>
              {/* Window Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "6px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ff5f56", display: "inline-block" }}></span>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }}></span>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#27c93f", display: "inline-block" }}></span>
                  <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", color: "var(--neutral-on-background-weak)", marginLeft: "6px" }}>
                    root@aayurt-vps: ~ (Ubuntu 22.04)
                  </span>
                </div>
                <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "9px", color: "#3fb950" }}>
                  SSL GRADE: A+
                </span>
              </div>

              {/* Nginx & Cloud Security Architecture */}
              <svg viewBox="0 0 320 120" width="100%" height="110" fill="none">
                {/* 1. Ingress TLS Client */}
                <g transform="translate(10, 20)">
                  <rect width="80" height="65" rx="6" fill="#0d1117" stroke="#30363d" strokeWidth="1" />
                  <text x="40" y="24" fill="#8b949e" fontSize="8" fontFamily="var(--font-mono, monospace)" textAnchor="middle">CLIENT INGRESS</text>
                  
                  {/* Lock icon */}
                  <circle cx="40" cy="42" r="8" fill="rgba(63, 185, 80, 0.2)" stroke="#3fb950" strokeWidth="1" />
                  <path d="M37 42 L40 45 L44 39" stroke="#3fb950" strokeWidth="1.2" fill="none" />
                  
                  <text x="40" y="60" fill="#f0f2f5" fontSize="8" fontFamily="var(--font-mono, monospace)" textAnchor="middle">TLS 1.3 :443</text>
                  <text x="40" y="74" fill="#3fb950" fontSize="7" fontFamily="var(--font-mono, monospace)" textAnchor="middle">HTTP/2 Fast</text>
                </g>

                {/* Arrow */}
                <path d="M95 52 L118 52" stroke="#38bdf8" strokeWidth="1.5" />
                <polygon points="120,52 114,48 114,56" fill="#38bdf8" />

                {/* 2. Nginx Reverse Proxy Engine */}
                <g transform="translate(122, 12)">
                  <rect width="95" height="80" rx="8" fill="#161b22" stroke="#38bdf8" strokeWidth="1.2" />
                  <text x="47" y="20" fill="#38bdf8" fontSize="9" fontFamily="var(--font-mono, monospace)" textAnchor="middle" fontWeight="700">
                    Nginx Gateway
                  </text>
                  <text x="47" y="34" fill="#8b949e" fontSize="7.5" fontFamily="var(--font-mono, monospace)" textAnchor="middle">
                    Reverse Proxy
                  </text>

                  <rect x="8" y="44" width="79" height="15" rx="3" fill="#0d1117" stroke="#30363d" />
                  <text x="47" y="55" fill="#f59e0b" fontSize="7" fontFamily="var(--font-mono, monospace)" textAnchor="middle">
                    UFW: 22, 80, 443
                  </text>
                  
                  <text x="47" y="74" fill="#8b949e" fontSize="7" fontFamily="var(--font-mono, monospace)" textAnchor="middle">
                    Let's Encrypt Auto
                  </text>
                </g>

                {/* Arrow */}
                <path d="M222 52 L245 52" stroke="#3fb950" strokeWidth="1.5" />
                <polygon points="247,52 241,48 241,56" fill="#3fb950" />

                {/* 3. Node.js PM2 Cluster */}
                <g transform="translate(248, 18)">
                  <rect width="65" height="68" rx="6" fill="#0d1117" stroke="#3fb950" strokeWidth="1" />
                  <text x="32" y="18" fill="#3fb950" fontSize="8.5" fontFamily="var(--font-mono, monospace)" textAnchor="middle" fontWeight="700">Node :3000</text>
                  <text x="32" y="32" fill="#8b949e" fontSize="7.5" fontFamily="var(--font-mono, monospace)" textAnchor="middle">PM2 Cluster</text>
                  
                  <circle cx="20" cy="48" r="4" fill="#3fb950" />
                  <circle cx="32" cy="48" r="4" fill="#3fb950" />
                  <circle cx="44" cy="48" r="4" fill="#3fb950" />
                  
                  <text x="32" y="60" fill="#c9d1d9" fontSize="6.5" fontFamily="var(--font-mono, monospace)" textAnchor="middle">4 Workers</text>
                </g>
              </svg>

              {/* Status bar */}
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono, monospace)", fontSize: "9.5px", color: "var(--neutral-on-background-weak)", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "4px" }}>
                <span>Nginx Reverse Proxy</span>
                <span style={{ color: "#38bdf8" }}>Proxy Overhead &lt; 1.2ms</span>
              </div>
            </div>

            <div className={styles.postBody}>
              <div className={styles.metaInfo}>February 16, 2026 · 6 min read</div>
              <h3 className={styles.postTitle}>
                Production Linux VPS Hardening, Nginx Reverse Proxy, and TLS Termination
              </h3>
              <p className={styles.postExcerpt}>
                Production deployment playbook for Node.js microservices on bare Ubuntu VPS. UFW firewall
                rules, automated Let's Encrypt certificate renewal, and PM2 process supervision.
              </p>
              <div className={styles.tagCluster}>
                <span className={styles.tag}>DevOps</span>
                <span className={styles.tag}>Nginx</span>
                <span className={styles.tag}>Security</span>
              </div>
            </div>
            <div className={styles.postFooter}>
              <span>Infrastructure</span>
              <Link
                href="/blog/server-deployment--nginx--vps"
                className={styles.readLink}
              >
                Read Dispatch →
              </Link>
            </div>
          </article>
        )}

        {/* CARD 5: PLESK MULTI-TENANCY HOSTING (CLOUD HOST CONTROLLER) */}
        {(activeCategory === "all" || activeCategory === "devops") && (
          <article className={styles.postCard}>
            <div className={styles.postVisual}>
              {/* Window Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "6px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ff5f56", display: "inline-block" }}></span>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }}></span>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#27c93f", display: "inline-block" }}></span>
                  <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", color: "var(--neutral-on-background-weak)", marginLeft: "6px" }}>
                    plesk-obsidian // multi-tenant-controller
                  </span>
                </div>
                <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "9px", color: "#38bdf8" }}>
                  ISOLATED VHOSTS
                </span>
              </div>

              {/* Multi-Tenant Provisioning Topology */}
              <svg viewBox="0 0 320 120" width="100%" height="110" fill="none">
                {/* Ingress Router */}
                <g transform="translate(10, 20)">
                  <rect width="85" height="70" rx="6" fill="#161b22" stroke="#38bdf8" strokeWidth="1.2" />
                  <text x="42" y="24" fill="#38bdf8" fontSize="8.5" fontFamily="var(--font-mono, monospace)" textAnchor="middle" fontWeight="700">
                    Host Controller
                  </text>
                  <text x="42" y="38" fill="#8b949e" fontSize="7.5" fontFamily="var(--font-mono, monospace)" textAnchor="middle">
                    Plesk Obsidian
                  </text>
                  
                  <rect x="8" y="46" width="69" height="15" rx="3" fill="#0d1117" />
                  <text x="42" y="57" fill="#f59e0b" fontSize="7" fontFamily="var(--font-mono, monospace)" textAnchor="middle">
                    DNS REST Sync
                  </text>
                </g>

                {/* Fan-out arrows */}
                <path d="M100 45 L130 30" stroke="#38bdf8" strokeWidth="1.2" />
                <path d="M100 55 L130 55" stroke="#38bdf8" strokeWidth="1.2" />
                <path d="M100 65 L130 80" stroke="#38bdf8" strokeWidth="1.2" />

                {/* 3 Isolated Tenant Containers */}
                <g transform="translate(135, 12)">
                  {/* Tenant 1 */}
                  <rect x="0" y="0" width="170" height="24" rx="4" fill="#0d1117" stroke="#30363d" />
                  <circle cx="12" cy="12" r="3.5" fill="#3fb950" />
                  <text x="22" y="15" fill="#f0f2f5" fontSize="8" fontFamily="var(--font-mono, monospace)">app1.tenant.com</text>
                  <text x="160" y="15" fill="#8b949e" fontSize="7" fontFamily="var(--font-mono, monospace)" textAnchor="end">Node 22 · SSL</text>

                  {/* Tenant 2 */}
                  <rect x="0" y="32" width="170" height="24" rx="4" fill="#0d1117" stroke="#30363d" />
                  <circle cx="12" cy="44" r="3.5" fill="#3fb950" />
                  <text x="22" y="47" fill="#f0f2f5" fontSize="8" fontFamily="var(--font-mono, monospace)">app2.tenant.co.uk</text>
                  <text x="160" y="47" fill="#8b949e" fontSize="7" fontFamily="var(--font-mono, monospace)" textAnchor="end">FastCGI Cache</text>

                  {/* Tenant 3 */}
                  <rect x="0" y="64" width="170" height="24" rx="4" fill="#0d1117" stroke="#30363d" />
                  <circle cx="12" cy="76" r="3.5" fill="#3fb950" />
                  <text x="22" y="79" fill="#f0f2f5" fontSize="8" fontFamily="var(--font-mono, monospace)">api.internal.org</text>
                  <text x="160" y="79" fill="#8b949e" fontSize="7" fontFamily="var(--font-mono, monospace)" textAnchor="end">Cgroup 512MB</text>
                </g>
              </svg>

              {/* Status bar */}
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono, monospace)", fontSize: "9.5px", color: "var(--neutral-on-background-weak)", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "4px" }}>
                <span>Subdomain Automated Ingress</span>
                <span style={{ color: "#3fb950" }}>Zero Downtime Provisioning</span>
              </div>
            </div>

            <div className={styles.postBody}>
              <div className={styles.metaInfo}>March 24, 2026 · 5 min read</div>
              <h3 className={styles.postTitle}>
                Automating Multi-Tenant VPS Provisioning with Plesk Obsidian & Node Runtimes
              </h3>
              <p className={styles.postExcerpt}>
                Configuring isolated multi-tenant application boundaries on dedicated cloud VPS. DNS zone
                delegation, Node.js process managers, and zero-downtime deployment pipelines.
              </p>
              <div className={styles.tagCluster}>
                <span className={styles.tag}>Hosting</span>
                <span className={styles.tag}>Multi-Tenant</span>
                <span className={styles.tag}>Plesk</span>
              </div>
            </div>
            <div className={styles.postFooter}>
              <span>Cloud & Hosting</span>
              <Link href="/blog/plesk-on-vps-setup" className={styles.readLink}>
                Read Dispatch →
              </Link>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}

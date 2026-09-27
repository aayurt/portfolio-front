"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./ProductBento.module.scss";
import { HermesPipeline } from "../pipeline/HermesPipeline";
import { AfnoPipeline } from "../pipeline/AfnoPipeline";
import { SyasyahPipeline } from "../pipeline/SyasyahPipeline";
import { NepsePipeline } from "../pipeline/NepsePipeline";
import { AstroPipeline } from "../pipeline/AstroPipeline";

type Category = "all" | "agents" | "systems" | "web";

interface BentoItem {
  id: string;
  category: Category[];
  spanDesktop: "span1" | "span2";
  title: string;
  badge: string;
  subtitle: string;
  component: React.ReactNode;
  specsLeft: string;
  specsRight: string;
  footerTagline: string;
  caseStudyHref?: string;
  liveUrl?: string;
}

const BENTO_ITEMS: BentoItem[] = [
  {
    id: "hermes",
    category: ["all", "agents"],
    spanDesktop: "span2",
    title: "Hermes Agent CLI & Execution Engine",
    badge: "AI / Multi-Agent",
    subtitle: "Autonomous multi-agent DAG runner with isolated subagent processes and Docker verification gates",
    component: <HermesPipeline />,
    specsLeft: "Metrics: < 50ms Dispatch · 99.9% Gate Pass",
    specsRight: "Stack: Python · Docker · MCP · Asyncio",
    footerTagline: "Orchestrating concurrent coding subagents autonomously.",
    caseStudyHref: "/work/hermes",
  },
  {
    id: "afno",
    category: ["all", "web"],
    spanDesktop: "span1",
    title: "Afno Events",
    badge: "Ticketing & Mobile",
    subtitle: "UK Diaspora event ticketing platform with Flutter app & real-time door scanner",
    component: <AfnoPipeline />,
    specsLeft: "Reach: 8+ UK Cities · < 0.8s Gate Check-in",
    specsRight: "Stack: Next.js 15 · Flutter · Stripe",
    footerTagline: "High-throughput ticketing & promoter studio.",
    caseStudyHref: "/work/afno-events",
    liveUrl: "https://afnoevents.co.uk",
  },
  {
    id: "syasyah",
    category: ["all", "systems", "web"],
    spanDesktop: "span1",
    title: "Syasyah Samaj",
    badge: "Civic Governance / PWA",
    subtitle: "Civic governance, 10 territorial Ilakas & offline-first accounting for Newar community in Patan",
    component: <SyasyahPipeline />,
    specsLeft: "Civic: 10 Ilakas · 100% Offline Resilience",
    specsRight: "Stack: React 19 · IndexedDB · Payload CMS 3",
    footerTagline: "Zero-network street collection & cultural calendar.",
    caseStudyHref: "/work/syasyah-samaj",
    liveUrl: "https://syasyahsamaj.com",
  },
  {
    id: "nepse",
    category: ["all", "agents", "web"],
    spanDesktop: "span2",
    title: "Nepse Pro — Market Scraper, Quantitative ETL & AI Signals",
    badge: "Fintech / Quantitative AI",
    subtitle: "Automated n8n floor-sheet scraping, timeseries indicator ETL (EMA/MACD/RSI), and Gemini + Ollama signal synthesis",
    component: <NepsePipeline />,
    specsLeft: "Coverage: 250+ Equities · Daily Floor Timeseries",
    specsRight: "Stack: n8n · Gemini API · Ollama · React 19",
    footerTagline: "Institutional-grade market intelligence terminal.",
    caseStudyHref: "/work/nepse-analyser",
    liveUrl: "https://nepse.ratosuryaonline.com",
  },
  {
    id: "astro",
    category: ["all", "agents"],
    spanDesktop: "span1",
    title: "Astro Guru",
    badge: "Vedic Astrolabe",
    subtitle: "Personalized Vedic ephemeris calculations and interactive AI chart reasoning",
    component: <AstroPipeline />,
    specsLeft: "Precision: 12 Sidereal Houses · Swiss Ephemeris",
    specsRight: "Stack: Next.js · Astrolabe · LLM Engine",
    footerTagline: "Mathematical celestial coordinates & cosmic guide.",
    caseStudyHref: "/work/astro-guru",
    liveUrl: "https://astro.ratosuryaonline.com",
  },
  {
    id: "research",
    category: ["all", "systems"],
    spanDesktop: "span2",
    title: "Research & Systems Foundations",
    badge: "Systems & PhD Track",
    subtitle: "Core areas of technical inquiry, formal verification, and engineering philosophy",
    component: (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "10px",
          padding: "14px",
          background: "var(--neutral-background-weak, rgba(128,128,128,0.04))",
          borderRadius: "12px",
          border: "1px solid var(--neutral-border-weak, rgba(128,128,128,0.15))",
        }}
      >
        <div
          style={{
            border: "1px solid var(--neutral-border-weak, rgba(128,128,128,0.2))",
            padding: "10px",
            borderRadius: "8px",
            background: "var(--neutral-background-medium, rgba(128,128,128,0.06))",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: "12px", color: "var(--neutral-on-background-strong)" }}>
            ⚡ Deterministic Evaluation
          </div>
          <div style={{ fontSize: "11px", color: "var(--neutral-on-background-weak)", marginTop: "4px", lineHeight: 1.4 }}>
            Evaluating autonomous agent code diffs via AST verification gates and isolated Docker runtimes.
          </div>
        </div>

        <div
          style={{
            border: "1px solid var(--neutral-border-weak, rgba(128,128,128,0.2))",
            padding: "10px",
            borderRadius: "8px",
            background: "var(--neutral-background-medium, rgba(128,128,128,0.06))",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: "12px", color: "var(--neutral-on-background-strong)" }}>
            🔄 Offline State Machines
          </div>
          <div style={{ fontSize: "11px", color: "var(--neutral-on-background-weak)", marginTop: "4px", lineHeight: 1.4 }}>
            IndexedDB cache-first local synchronization and optimistic voucher reconciliation without network connectivity.
          </div>
        </div>

        <div
          style={{
            border: "1px solid var(--neutral-border-weak, rgba(128,128,128,0.2))",
            padding: "10px",
            borderRadius: "8px",
            background: "var(--neutral-background-medium, rgba(128,128,128,0.06))",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: "12px", color: "var(--neutral-on-background-strong)" }}>
            🚀 High-Throughput Web
          </div>
          <div style={{ fontSize: "11px", color: "var(--neutral-on-background-weak)", marginTop: "4px", lineHeight: 1.4 }}>
            Next.js 15 standalone deployments, edge reverse proxies, and sub-second transaction validation.
          </div>
        </div>
      </div>
    ),
    specsLeft: "Inquiry: AST Gates · Offline Engines · Edge SSR",
    specsRight: "Focus: Kathmandu (UTC+5:45) · Open to Work",
    footerTagline: "Bridging academic rigor with high-performance production systems.",
    caseStudyHref: "/about",
  },
];

export function ProductBento() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredItems = BENTO_ITEMS.filter((item) =>
    item.category.includes(activeCategory)
  );

  return (
    <div className={styles.container}>
      {/* Category Filter Pills */}
      <div className={styles.filterBar}>
        <button
          className={`${styles.filterPill} ${activeCategory === "all" ? styles.active : ""}`}
          onClick={() => setActiveCategory("all")}
        >
          All Systems ({BENTO_ITEMS.length})
        </button>
        <button
          className={`${styles.filterPill} ${activeCategory === "agents" ? styles.active : ""}`}
          onClick={() => setActiveCategory("agents")}
        >
          🤖 Agents & AI
        </button>
        <button
          className={`${styles.filterPill} ${activeCategory === "systems" ? styles.active : ""}`}
          onClick={() => setActiveCategory("systems")}
        >
          ⚡ Offline & Systems
        </button>
        <button
          className={`${styles.filterPill} ${activeCategory === "web" ? styles.active : ""}`}
          onClick={() => setActiveCategory("web")}
        >
          🌐 Web & Mobile
        </button>
      </div>

      {/* Responsive Bento Grid */}
      <div className={styles.bentoGrid}>
        {filteredItems.map((item) => {
          // In filtered views with fewer items, let them expand naturally
          const spanClass =
            activeCategory === "all"
              ? item.spanDesktop === "span2"
                ? styles.span2
                : styles.span1
              : styles.span2;

          return (
            <div key={item.id} className={`${styles.card} ${spanClass}`}>
              {/* Card Header */}
              <div className={styles.cardHeader}>
                <div className={styles.cardMeta}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardSubtitle}>{item.subtitle}</p>
                </div>
                <span className={styles.badge}>{item.badge}</span>
              </div>

              {/* Embedded Visual Simulator / Component */}
              <div className={styles.visualContainer}>{item.component}</div>

              {/* Specifications Strip */}
              <div className={styles.specsBar}>
                <span style={{ color: "var(--neutral-on-background-weak)" }}>{item.specsLeft}</span>
                <span style={{ fontWeight: 600, color: "var(--neutral-on-background-strong)" }}>{item.specsRight}</span>
              </div>

              {/* Card Footer */}
              <div className={styles.cardFooter}>
                <span style={{ fontSize: "11px", color: "var(--neutral-on-background-weak)" }}>
                  {item.footerTagline}
                </span>

                <div className={styles.actionLinks}>
                  {item.liveUrl && (
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionLink}
                    >
                      Live App ↗
                    </a>
                  )}
                  {item.caseStudyHref && (
                    <Link href={item.caseStudyHref} className={styles.actionLinkBrand}>
                      Inspect Architecture →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

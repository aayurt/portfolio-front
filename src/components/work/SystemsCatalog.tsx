"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Column, Heading, Row, Text } from "@once-ui-system/core";
import styles from "./SystemsCatalog.module.scss";

import { HermesPipeline } from "@/components/pipeline/HermesPipeline";
import { AfnoPipeline } from "@/components/pipeline/AfnoPipeline";
import { SyasyahPipeline } from "@/components/pipeline/SyasyahPipeline";
import { NepsePipeline } from "@/components/pipeline/NepsePipeline";
import { AstroPipeline } from "@/components/pipeline/AstroPipeline";
import type { Project } from "../../../payload-types";

interface SystemsCatalogProps {
  projects: Project[];
}

interface SystemItem {
  id: string;
  slug: string;
  category: "ai" | "saas" | "fintech" | "astronomy";
  badge: string;
  title: string;
  role: string;
  description: string;
  metrics: { value: string; label: string }[];
  stack: string[];
  liveUrl?: string;
  caseStudyUrl: string;
  visual: React.ReactNode;
}

export function SystemsCatalog({ projects }: SystemsCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Map database projects and augment with high-signal systems telemetry
  const systems: SystemItem[] = [
    {
      id: "hermes",
      slug: "hermes",
      category: "ai",
      badge: "AGENT HARNESS",
      title: "Hermes Agent Engine",
      role: "Lead Systems Architect & AI Engineer",
      description:
        "Production harness orchestrating DAG task decomposition, sandboxed Docker container execution, and deterministic AST verification gates for autonomous AI agents.",
      metrics: [
        { value: "10K+", label: "Tasks Ran" },
        { value: "< 50ms", label: "Agent Dispatch" },
        { value: "99.9%", label: "AST Pass Rate" },
      ],
      stack: ["TypeScript", "Docker", "MCP Protocol", "Next.js 15"],
      caseStudyUrl: "/work/hermes",
      visual: <HermesPipeline />,
    },
    {
      id: "afno-events",
      slug: "afno-events",
      category: "saas",
      badge: "LIVE EVENT SAAS",
      title: "Afno Events",
      role: "Full-Stack Lead · UK & Nepal Operations",
      description:
        "Comprehensive event ticketing and gate management platform connecting the UK Nepalese diaspora. Features sub-second offline gate scanning and multi-currency Stripe Terminal routing.",
      metrics: [
        { value: "< 0.8s", label: "Gate Scan" },
        { value: "100%", label: "Offline SQLite" },
        { value: "Zero", label: "Dup Passes" },
      ],
      stack: ["Next.js 15", "Flutter 3", "PostgreSQL", "Stripe"],
      liveUrl: "https://afnoevents.co.uk",
      caseStudyUrl: "/work/afno-events",
      visual: <AfnoPipeline />,
    },
    {
      id: "syasyah-samaj",
      slug: "syasyah-samaj",
      category: "saas",
      badge: "OFFLINE SPA",
      title: "Syasyah Samaj (स्यस्यः समाज)",
      role: "Lead Engineer · Newar Community Lalitpur",
      description:
        "Civic community accounting platform serving 10 territorial Ilakas in Lalitpur. Engineered with an IndexedDB cache-first store for sub-millisecond offline lookups and automated cloud sync.",
      metrics: [
        { value: "0ms", label: "Offline Read" },
        { value: "3 Langs", label: "EN / NE / NEW" },
        { value: "10", label: "Territorial Ilakas" },
      ],
      stack: ["React 19", "IndexedDB", "Payload CMS 3", "Tailwind CSS"],
      liveUrl: "https://syasyahsamaj.com",
      caseStudyUrl: "/work/syasyah-samaj",
      visual: <SyasyahPipeline />,
    },
    {
      id: "nepse-analyser",
      slug: "nepse-analyser",
      category: "fintech",
      badge: "QUANT FINANCE",
      title: "Nepse Pro",
      role: "Systems Engineer · TimescaleDB ETL",
      description:
        "Financial market terminal ingesting live trading floor data into TimescaleDB with automated algorithmic pattern recognition, candlestick breakout detection, and automated trading alerts.",
      metrics: [
        { value: "< 150ms", label: "Live Ingestion" },
        { value: "250+", label: "Equities Tracked" },
        { value: "91.4%", label: "Signal Precision" },
      ],
      stack: ["Node.js", "TimescaleDB", "Next.js", "WebSockets"],
      liveUrl: "https://nepse.ratosuryaonline.com",
      caseStudyUrl: "/work/nepse-analyser",
      visual: <NepsePipeline />,
    },
    {
      id: "astro-guru",
      slug: "astro-guru",
      category: "astronomy",
      badge: "CELESTIAL AI",
      title: "Astro Guru",
      role: "Full-Stack Developer · Swiss Ephemeris",
      description:
        "Astronomical calculation engine computing precise planetary longitudes, divisional charts (D1 to D60), and transit aspects paired with structured Gemini 1.5 LLM celestial interpretations.",
      metrics: [
        { value: "< 2s", label: "AI Inference" },
        { value: "12", label: "Houses Calc" },
        { value: "Exact", label: "Swiss Ephemeris" },
      ],
      stack: ["Next.js 15", "Swiss Ephemeris", "Gemini API", "Prisma"],
      liveUrl: "https://astro.ratosuryaonline.com",
      caseStudyUrl: "/work/astro-guru",
      visual: <AstroPipeline />,
    },
    {
      id: "research-foundations",
      slug: "research-foundations",
      category: "ai",
      badge: "THEORETICAL FOUNDATION",
      title: "Agentic Safety & AST Research",
      role: "Doctoral Research Agenda · Formal Verification",
      description:
        "Academic inquiry into deterministic runtime verification gates, sandboxed multi-turn execution, and bounding autonomous reasoning in mission-critical applications.",
      metrics: [
        { value: "Formal", label: "AST Checks" },
        { value: "100%", label: "Deterministic" },
        { value: "PhD", label: "Candidate" },
      ],
      stack: ["Compiler AST", "Static Analysis", "Docker", "Formal Methods"],
      caseStudyUrl: "/about#research",
      visual: (
        <svg viewBox="0 0 400 160" width="100%" height="100%">
          <rect x="40" y="30" width="140" height="100" rx="8" fill="var(--neutral-background-medium)" stroke="var(--neutral-border-weak)" strokeWidth="1.5" />
          <text x="110" y="65" fill="var(--neutral-on-background-strong)" fontSize="11" fontWeight="bold" textAnchor="middle">
            Bounded Autonomy
          </text>
          <text x="110" y="85" fill="var(--neutral-on-background-weak)" fontSize="9" textAnchor="middle">
            AST Static Guarantees
          </text>
          <text x="110" y="105" fill="var(--brand-alpha-strong, #6366f1)" fontSize="9" fontWeight="600" textAnchor="middle">
            Sub-agent Isolation
          </text>

          <path d="M 180 80 L 220 80" stroke="var(--neutral-border-strong)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />

          <rect x="220" y="30" width="140" height="100" rx="8" fill="var(--neutral-background-weak)" stroke="var(--brand-alpha-strong, #6366f1)" strokeWidth="1.5" />
          <text x="290" y="65" fill="var(--neutral-on-background-strong)" fontSize="11" fontWeight="bold" textAnchor="middle">
            Doctoral Inquiry
          </text>
          <text x="290" y="85" fill="var(--neutral-on-background-weak)" fontSize="9" textAnchor="middle">
            Formal Verification Gates
          </text>
          <text x="290" y="105" fill="var(--brand-alpha-strong, #6366f1)" fontSize="9" fontWeight="600" textAnchor="middle">
            Kingston MSc &amp; Patan BSc
          </text>
        </svg>
      ),
    },
  ];

  const categories = [
    { key: "all", label: "All Platforms", count: 6 },
    { key: "ai", label: "Autonomous AI", count: 2 },
    { key: "saas", label: "Multi-Tenant SaaS", count: 2 },
    { key: "fintech", label: "Fintech & Quant", count: 1 },
    { key: "astronomy", label: "Vedic Astrometry", count: 1 },
  ];

  const filteredSystems = activeCategory === "all"
    ? systems
    : systems.filter((s) => s.category === activeCategory);

  return (
    <div className={styles.container}>
      {/* FILTER BAR */}
      <div className={styles.filterBar}>
        {categories.map((cat) => (
          <button
            key={cat.key}
            type="button"
            className={`${styles.filterPill} ${activeCategory === cat.key ? styles.active : ""}`}
            onClick={() => setActiveCategory(cat.key)}
          >
            {cat.label} ({cat.count})
          </button>
        ))}
      </div>

      {/* 2-COLUMN CATALOG GRID */}
      <div className={styles.catalogGrid}>
        {filteredSystems.map((item) => (
          <div key={item.id} className={styles.card}>
            {/* Visual Container */}
            <div className={styles.cardVisual}>
              <span className={styles.cardBadge}>{item.badge}</span>
              {item.visual}
            </div>

            {/* Content Body */}
            <div className={styles.cardBody}>
              <div className={styles.titleRow}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <span className={styles.cardRole}>{item.role}</span>
              </div>

              <p className={styles.cardDesc}>{item.description}</p>

              {/* Metrics Rail */}
              <div className={styles.metricsRail}>
                {item.metrics.map((m, idx) => (
                  <div key={idx}>
                    <div className={styles.metricVal}>{m.value}</div>
                    <div className={styles.metricLbl}>{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Stack Pills */}
              <div className={styles.stackRow}>
                {item.stack.map((t, idx) => (
                  <span key={idx} className={styles.tag}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className={styles.actionRow}>
                {item.liveUrl && (
                  <Button
                    href={item.liveUrl}
                    target="_blank"
                    variant="secondary"
                    size="s"
                    suffixIcon="arrowUpRight"
                    label="Live Demo"
                    fillWidth
                  />
                )}
                <Button
                  href={item.caseStudyUrl}
                  variant="primary"
                  size="s"
                  suffixIcon="arrowRight"
                  label={item.category === "ai" && item.id === "research-foundations" ? "Research Agenda" : "Case Study"}
                  fillWidth
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

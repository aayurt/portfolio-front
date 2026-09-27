"use client";

import React from "react";
import Link from "next/link";
import styles from "./SolutionsRails.module.scss";
import type { Solution } from "../../../payload-types";

interface SolutionsRailsProps {
  solutions?: Solution[];
}

interface PatternData {
  id: string;
  num: string;
  title: string;
  category: string;
  problem: string;
  pattern: string;
  metric: string;
  stack: string[];
  appliedIn: string;
  slug?: string;
}

const DEFAULT_PATTERNS: PatternData[] = [
  {
    id: "multi-tenant-saas",
    num: "PATTERN 01",
    title: "Multi-Tenant SaaS Platforms",
    category: "Cloud Architecture",
    problem: "Data bleed, tenant crosstalk, and escalating infrastructure overhead across fragmented client deployments.",
    pattern: "Row-level Postgres tenancy with Next.js edge middleware rewrites and a single unified monorepo.",
    metric: "< 15ms Rewrite · 100% Isolation",
    stack: ["Next.js 15", "Payload CMS 3", "PostgreSQL"],
    appliedIn: "Afno Events, Syasyah Samaj",
    slug: "multi-tenant-saas-platforms",
  },
  {
    id: "ai-automation-pipelines",
    num: "PATTERN 02",
    title: "AI & Automation Pipelines",
    category: "AI/ML Systems",
    problem: "Unreliable floor data extraction, runaway cloud API costs, and unverified LLM hallucinations.",
    pattern: "Hybrid inference: local Ollama for feature extraction, Gemini 1.5 for reasoning, and deterministic AST verification gates.",
    metric: "91.4% Precision · Sub-2s ETL",
    stack: ["n8n", "Ollama", "Gemini API", "TimescaleDB"],
    appliedIn: "Nepse Pro, Hermes Agent",
    slug: "ai-automation-pipelines",
  },
  {
    id: "cross-platform-mobile",
    num: "PATTERN 03",
    title: "Cross-Platform Mobile Development",
    category: "Mobile Engineering",
    problem: "Duplicate iOS/Android teams, slow door entry lines, and fraudulent ticket screenshots.",
    pattern: "Unified Flutter codebase with rolling HMAC QR vouchers, offline SQLite sync, and sub-second camera scanning.",
    metric: "< 0.8s Gate Scan · 0 Duplicates",
    stack: ["Flutter 3", "Dart", "Stripe Terminal", "SQLite"],
    appliedIn: "Afno Mobile Scanner",
    slug: "cross-platform-mobile-development",
  },
];

export const SolutionsRails: React.FC<SolutionsRailsProps> = ({ solutions }) => {
  const patterns = DEFAULT_PATTERNS;

  return (
    <div className={styles.container}>
      {patterns.map((item) => (
        <div key={item.id} className={styles.rail}>
          <div className={styles.railDomain}>
            <span className={styles.railNum}>{item.num}</span>
            <h3 className={styles.railTitle}>{item.title}</h3>
            <span className={styles.railBadge}>{item.category}</span>
          </div>

          <div className={styles.railBody}>
            <div className={styles.railRow}>
              <span className={styles.railLabel}>Problem</span>
              <span className={styles.railDesc}>{item.problem}</span>
            </div>
            <div className={styles.railRow}>
              <span className={styles.railLabel}>Pattern</span>
              <span className={`${styles.railDesc} ${styles.railDescStrong}`}>
                {item.pattern}
              </span>
            </div>
            <div className={styles.railRow}>
              <span className={styles.railLabel}>Applied</span>
              <span className={styles.appliedPill}>
                <span>↳</span> {item.appliedIn}
              </span>
            </div>
          </div>

          <div className={styles.railAside}>
            <span className={styles.railMetric}>{item.metric}</span>
            <div className={styles.railTags}>
              {item.stack.map((tech) => (
                <span key={tech} className={styles.railTag}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

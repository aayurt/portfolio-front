"use client";

import React from "react";
import Link from "next/link";
import styles from "./RecruiterDossier.module.scss";

interface RecruiterDossierProps {
  email?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export function RecruiterDossier({
  email = "aayurtshrestha@gmail.com",
  githubUrl = "https://github.com/aayurt",
  linkedinUrl = "https://www.linkedin.com/in/aayurt-shrestha/",
}: RecruiterDossierProps) {
  return (
    <div className={styles.dossierContainer}>
      {/* Header bar */}
      <div className={styles.headerRow}>
        <div className={styles.titleArea}>
          <span className={styles.dossierBadge}>RECRUITER TELEMETRY</span>
          <h2 className={styles.dossierTitle}>Candidate Dossier · Staff / Senior Systems & Full-Stack</h2>
        </div>
        <div className={styles.statusPill}>
          <span className={styles.statusDot} />
          <span>OPEN TO WORK</span>
        </div>
      </div>

      {/* 4-Column Technical Metrics */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricBlock}>
          <span className={styles.metricIndex}>01 / ARCHITECTURE</span>
          <div className={styles.metricName}>Distributed & Offline</div>
          <p className={styles.metricDetail}>
            Next.js 15 SSR, React 19, IndexedDB cache-first state machines, and atomic PostgreSQL transactions.
          </p>
        </div>

        <div className={styles.metricBlock}>
          <span className={styles.metricIndex}>02 / AGENTIC & QUANT AI</span>
          <div className={styles.metricName}>Multi-Agent DAGs & Signals</div>
          <p className={styles.metricDetail}>
            Autonomous subagent orchestration, AST evaluation gates, local Ollama inference & financial ETL.
          </p>
        </div>

        <div className={styles.metricBlock}>
          <span className={styles.metricIndex}>03 / PRODUCTION SLA</span>
          <div className={styles.metricName}>Low-Latency Execution</div>
          <p className={styles.metricDetail}>
            &lt; 50ms agent dispatch, &lt; 0.8s door ticket scanning, and zero race conditions under drop load.
          </p>
        </div>

        <div className={styles.metricBlock}>
          <span className={styles.metricIndex}>04 / CORE STACK</span>
          <div className={styles.metricName}>Full-Stack & Cloud</div>
          <p className={styles.metricDetail}>
            TypeScript, Python (Asyncio), Docker, Payload CMS 3.75, Nginx, Flutter & Linux VPS automation.
          </p>
        </div>
      </div>

      {/* Quick Actions Row */}
      <div className={styles.actionsRow}>
        <div className={styles.specsNote}>
          Kathmandu (UTC+5:45) · 4+ hrs US/UK/EU overlap · Remote / Relocation / Full-Time
        </div>

        <div className={styles.buttonGroup}>
          <a
            href={`mailto:${email}?subject=${encodeURIComponent("Technical Opportunity / Candidate Inquiry")}`}
            className={styles.primaryBtn}
          >
            ✉ Email Directly
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryBtn}
          >
            GitHub ↗
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryBtn}
          >
            LinkedIn ↗
          </a>
          <Link href="/about" className={styles.secondaryBtn}>
            Full CV & Bio →
          </Link>
        </div>
      </div>
    </div>
  );
}

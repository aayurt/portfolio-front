"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Column, Heading, Row, Text } from "@once-ui-system/core";
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "10px",
                  color: "var(--brand-on-background-strong, #58a6ff)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                AST Formal Gate · Stochastic Care
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "10px",
                  color: "var(--neutral-on-background-weak)",
                }}
              >
                ARXIV PREPRINT
              </span>
            </div>

            {/* FORMAL VERIFICATION & CLINICAL AGENT SCHEMATIC */}
            <svg
              viewBox="0 0 460 160"
              width="100%"
              height="150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ overflow: "visible" }}
            >
              {/* Input trajectory */}
              <rect
                x="10"
                y="20"
                width="100"
                height="50"
                rx="8"
                fill="var(--neutral-background-weak, #14171f)"
                stroke="var(--brand-on-background-strong, #58a6ff)"
                strokeWidth="1.5"
              />
              <text
                x="60"
                y="42"
                fill="var(--neutral-on-background-strong, #f0f2f5)"
                fontSize="10"
                fontFamily="var(--font-mono, monospace)"
                textAnchor="middle"
                fontWeight="600"
              >
                Patient Trajectory
              </text>
              <text
                x="60"
                y="56"
                fill="var(--neutral-on-background-weak, #8b949e)"
                fontSize="8"
                fontFamily="var(--font-mono, monospace)"
                textAnchor="middle"
              >
                EHR · 48h Stream
              </text>

              {/* Dotted pipeline to brain */}
              <path
                d="M110 45 L150 45"
                stroke="var(--brand-on-background-strong, #58a6ff)"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <polygon
                points="152,45 146,42 146,48"
                fill="var(--brand-on-background-strong, #58a6ff)"
              />

              {/* Reasoning Engine */}
              <rect
                x="155"
                y="15"
                width="140"
                height="60"
                rx="8"
                fill="var(--neutral-alpha-weak, #181c26)"
                stroke="var(--neutral-border-medium, #8b949e)"
                strokeWidth="1"
              />
              <text
                x="225"
                y="36"
                fill="var(--brand-on-background-strong, #58a6ff)"
                fontSize="11"
                fontFamily="var(--font-mono, monospace)"
                textAnchor="middle"
                fontWeight="700"
              >
                Agentic Reasoning
              </text>
              <text
                x="225"
                y="52"
                fill="var(--neutral-on-background-weak, #8b949e)"
                fontSize="8.5"
                fontFamily="var(--font-mono, monospace)"
                textAnchor="middle"
              >
                Chain-of-Thought · ToT
              </text>
              <text
                x="225"
                y="64"
                fill="var(--neutral-on-background-weak, #606873)"
                fontSize="7.5"
                fontFamily="var(--font-mono, monospace)"
                textAnchor="middle"
              >
                Clinical Protocol Alignment
              </text>

              {/* Arrow to verification gate */}
              <path
                d="M295 45 L335 45"
                stroke="var(--brand-on-background-strong, #58a6ff)"
                strokeWidth="1.5"
              />
              <polygon
                points="337,45 331,42 331,48"
                fill="var(--brand-on-background-strong, #58a6ff)"
              />

              {/* Formal Gate */}
              <rect
                x="340"
                y="20"
                width="110"
                height="50"
                rx="8"
                fill="var(--neutral-background-weak, #14171f)"
                stroke="#3fb950"
                strokeWidth="1.5"
              />
              <text
                x="395"
                y="42"
                fill="#3fb950"
                fontSize="10"
                fontFamily="var(--font-mono, monospace)"
                textAnchor="middle"
                fontWeight="600"
              >
                Formal Verification
              </text>
              <text
                x="395"
                y="56"
                fill="var(--neutral-on-background-weak, #8b949e)"
                fontSize="8"
                fontFamily="var(--font-mono, monospace)"
                textAnchor="middle"
              >
                Zero Hallucinated Tools
              </text>

              {/* Multi-Agent Hospital Consensus */}
              <path
                d="M225 75 L225 105"
                stroke="var(--neutral-border-weak, #30363d)"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <rect
                x="120"
                y="105"
                width="210"
                height="38"
                rx="6"
                fill="var(--neutral-background-weak, #0d1117)"
                stroke="var(--neutral-border-weak, #30363d)"
                strokeWidth="1"
              />
              <text
                x="225"
                y="122"
                fill="var(--neutral-on-background-strong, #c9d1d9)"
                fontSize="9"
                fontFamily="var(--font-mono, monospace)"
                textAnchor="middle"
                fontWeight="600"
              >
                Multi-Agent Clinical Consensus (MAS)
              </text>
              <text
                x="225"
                y="134"
                fill="var(--neutral-on-background-weak, #8b949e)"
                fontSize="7.5"
                fontFamily="var(--font-mono, monospace)"
                textAnchor="middle"
              >
                Cardiology · Nephrology · Tumor Board
              </text>
            </svg>

            <div
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "10px",
                color: "var(--neutral-on-background-weak)",
                textAlign: "center",
              }}
            >
              Figure 1: Stochastic Clinical Execution with Guardrail Bounding
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

      {/* 2-COLUMN DISPATCHES GRID */}
      <div className={styles.dispatchesGrid}>
        {/* CARD 1: NEPSE QUANT ANALYZER */}
        {(activeCategory === "all" || activeCategory === "ai") && (
          <article className={styles.postCard}>
            <div className={styles.postVisual}>
              <svg viewBox="0 0 300 110" width="100%" height="100" fill="none">
                <polyline
                  points="20,80 60,65 100,75 140,40 180,50 220,25 260,35"
                  stroke="var(--brand-on-background-strong, #58a6ff)"
                  strokeWidth="2"
                />
                <circle
                  cx="220"
                  cy="25"
                  r="4"
                  fill="var(--brand-on-background-strong, #58a6ff)"
                />
                <text
                  x="220"
                  y="18"
                  fill="var(--brand-on-background-strong, #58a6ff)"
                  fontSize="9"
                  fontFamily="var(--font-mono, monospace)"
                >
                  Buy Signal
                </text>
                <line
                  x1="20"
                  y1="95"
                  x2="280"
                  y2="95"
                  stroke="var(--neutral-border-weak, #30363d)"
                  strokeWidth="1"
                />
                <text
                  x="20"
                  y="105"
                  fill="var(--neutral-on-background-weak, #606873)"
                  fontSize="8"
                  fontFamily="var(--font-mono, monospace)"
                >
                  Timeseries ETL · 250+ Equities · n8n Automation
                </text>
              </svg>
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

        {/* CARD 2: TRILINGUAL LOCALIZATION (i18n) */}
        {(activeCategory === "all" || activeCategory === "systems") && (
          <article className={styles.postCard}>
            <div className={styles.postVisual}>
              <svg viewBox="0 0 300 110" width="100%" height="100" fill="none">
                <rect
                  x="20"
                  y="25"
                  width="70"
                  height="45"
                  rx="6"
                  fill="var(--neutral-background-weak, #14171f)"
                  stroke="var(--neutral-border-weak, #30363d)"
                />
                <text
                  x="55"
                  y="52"
                  fill="var(--neutral-on-background-strong, #f0f2f5)"
                  fontSize="10"
                  fontFamily="var(--font-mono, monospace)"
                  textAnchor="middle"
                >
                  EN
                </text>
                <path
                  d="M90 47 L120 47"
                  stroke="var(--brand-on-background-strong, #58a6ff)"
                  strokeWidth="1.5"
                />
                <rect
                  x="120"
                  y="25"
                  width="70"
                  height="45"
                  rx="6"
                  fill="var(--neutral-background-weak, #14171f)"
                  stroke="var(--brand-on-background-strong, #58a6ff)"
                />
                <text
                  x="155"
                  y="52"
                  fill="var(--brand-on-background-strong, #58a6ff)"
                  fontSize="10"
                  fontFamily="sans-serif"
                  textAnchor="middle"
                >
                  नेपाली
                </text>
                <path
                  d="M190 47 L220 47"
                  stroke="var(--brand-on-background-strong, #58a6ff)"
                  strokeWidth="1.5"
                />
                <rect
                  x="220"
                  y="25"
                  width="70"
                  height="45"
                  rx="6"
                  fill="var(--neutral-background-weak, #14171f)"
                  stroke="var(--neutral-border-weak, #30363d)"
                />
                <text
                  x="255"
                  y="52"
                  fill="var(--neutral-on-background-strong, #f0f2f5)"
                  fontSize="9"
                  fontFamily="sans-serif"
                  textAnchor="middle"
                >
                  नेवाः भाय्
                </text>
                <text
                  x="150"
                  y="95"
                  fill="var(--neutral-on-background-weak, #606873)"
                  fontSize="8"
                  fontFamily="var(--font-mono, monospace)"
                  textAnchor="middle"
                >
                  Automated CLI Translation · Deterministic AST Diffing
                </text>
              </svg>
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

        {/* CARD 3: MOBILE CAPACITOR RUNTIME */}
        {(activeCategory === "all" || activeCategory === "systems") && (
          <article className={styles.postCard}>
            <div className={styles.postVisual}>
              <svg viewBox="0 0 300 110" width="100%" height="100" fill="none">
                <rect
                  x="40"
                  y="15"
                  width="90"
                  height="65"
                  rx="6"
                  fill="var(--neutral-background-weak, #14171f)"
                  stroke="var(--neutral-border-weak, #30363d)"
                />
                <text
                  x="85"
                  y="45"
                  fill="var(--neutral-on-background-strong, #f0f2f5)"
                  fontSize="10"
                  fontFamily="var(--font-mono, monospace)"
                  textAnchor="middle"
                >
                  Vite + React
                </text>
                <text
                  x="85"
                  y="60"
                  fill="var(--neutral-on-background-weak, #8b949e)"
                  fontSize="8"
                  fontFamily="var(--font-mono, monospace)"
                  textAnchor="middle"
                >
                  Tailwind Web
                </text>
                <path
                  d="M130 48 L170 48"
                  stroke="#3fb950"
                  strokeWidth="1.5"
                />
                <rect
                  x="170"
                  y="15"
                  width="90"
                  height="65"
                  rx="6"
                  fill="var(--neutral-background-weak, #14171f)"
                  stroke="#3fb950"
                />
                <text
                  x="215"
                  y="45"
                  fill="#3fb950"
                  fontSize="10"
                  fontFamily="var(--font-mono, monospace)"
                  textAnchor="middle"
                >
                  Capacitor Bridge
                </text>
                <text
                  x="215"
                  y="60"
                  fill="var(--neutral-on-background-weak, #8b949e)"
                  fontSize="8"
                  fontFamily="var(--font-mono, monospace)"
                  textAnchor="middle"
                >
                  iOS & Android
                </text>
                <text
                  x="150"
                  y="98"
                  fill="var(--neutral-on-background-weak, #606873)"
                  fontSize="8"
                  fontFamily="var(--font-mono, monospace)"
                  textAnchor="middle"
                >
                  Single Codebase · Native Biometrics · Offline Cache
                </text>
              </svg>
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

        {/* CARD 4: PRODUCTION LINUX NGINX DEPLOYMENT */}
        {(activeCategory === "all" || activeCategory === "devops") && (
          <article className={styles.postCard}>
            <div className={styles.postVisual}>
              <svg viewBox="0 0 300 110" width="100%" height="100" fill="none">
                <rect
                  x="25"
                  y="20"
                  width="75"
                  height="50"
                  rx="6"
                  fill="var(--neutral-background-weak, #14171f)"
                  stroke="var(--neutral-border-weak, #30363d)"
                />
                <text
                  x="62"
                  y="42"
                  fill="var(--neutral-on-background-weak, #8b949e)"
                  fontSize="9"
                  fontFamily="var(--font-mono, monospace)"
                  textAnchor="middle"
                >
                  Client TLS
                </text>
                <text
                  x="62"
                  y="56"
                  fill="var(--neutral-on-background-strong, #f0f2f5)"
                  fontSize="8"
                  fontFamily="var(--font-mono, monospace)"
                  textAnchor="middle"
                >
                  :443 HTTPS
                </text>
                <path
                  d="M100 45 L130 45"
                  stroke="var(--brand-on-background-strong, #58a6ff)"
                  strokeWidth="1.5"
                />
                <rect
                  x="130"
                  y="20"
                  width="80"
                  height="50"
                  rx="6"
                  fill="var(--neutral-alpha-weak, #181c26)"
                  stroke="var(--brand-on-background-strong, #58a6ff)"
                />
                <text
                  x="170"
                  y="42"
                  fill="var(--brand-on-background-strong, #58a6ff)"
                  fontSize="9"
                  fontFamily="var(--font-mono, monospace)"
                  textAnchor="middle"
                >
                  Nginx Gateway
                </text>
                <text
                  x="170"
                  y="56"
                  fill="var(--neutral-on-background-weak, #8b949e)"
                  fontSize="8"
                  fontFamily="var(--font-mono, monospace)"
                  textAnchor="middle"
                >
                  Reverse Proxy
                </text>
                <path
                  d="M210 45 L240 45"
                  stroke="var(--brand-on-background-strong, #58a6ff)"
                  strokeWidth="1.5"
                />
                <rect
                  x="240"
                  y="20"
                  width="55"
                  height="50"
                  rx="6"
                  fill="var(--neutral-background-weak, #14171f)"
                  stroke="#3fb950"
                />
                <text
                  x="267"
                  y="42"
                  fill="#3fb950"
                  fontSize="9"
                  fontFamily="var(--font-mono, monospace)"
                  textAnchor="middle"
                >
                  Node
                </text>
                <text
                  x="267"
                  y="56"
                  fill="var(--neutral-on-background-weak, #8b949e)"
                  fontSize="8"
                  fontFamily="var(--font-mono, monospace)"
                  textAnchor="middle"
                >
                  :3000
                </text>
                <text
                  x="150"
                  y="95"
                  fill="var(--neutral-on-background-weak, #606873)"
                  fontSize="8"
                  fontFamily="var(--font-mono, monospace)"
                  textAnchor="middle"
                >
                  Automated Let's Encrypt · PM2 Cluster · UFW Hardening
                </text>
              </svg>
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

        {/* CARD 5: PLESK MULTI-TENANCY HOSTING */}
        {(activeCategory === "all" || activeCategory === "devops") && (
          <article className={styles.postCard}>
            <div className={styles.postVisual}>
              <svg viewBox="0 0 300 110" width="100%" height="100" fill="none">
                <rect
                  x="30"
                  y="20"
                  width="240"
                  height="55"
                  rx="6"
                  fill="var(--neutral-background-weak, #14171f)"
                  stroke="var(--neutral-border-weak, #30363d)"
                />
                <text
                  x="45"
                  y="40"
                  fill="var(--brand-on-background-strong, #58a6ff)"
                  fontSize="9"
                  fontFamily="var(--font-mono, monospace)"
                >
                  Plesk Obsidian Host Controller
                </text>
                <text
                  x="45"
                  y="55"
                  fill="var(--neutral-on-background-weak, #8b949e)"
                  fontSize="8"
                  fontFamily="var(--font-mono, monospace)"
                >
                  Vhost Isolation · Node.js Selector · DNS Sync
                </text>
                <text
                  x="150"
                  y="95"
                  fill="var(--neutral-on-background-weak, #606873)"
                  fontSize="8"
                  fontFamily="var(--font-mono, monospace)"
                  textAnchor="middle"
                >
                  Multi-Tenant Subdomains · FastCGI Cache · Resource Limits
                </text>
              </svg>
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

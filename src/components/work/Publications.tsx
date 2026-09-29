"use client";

import React from "react";

interface Pub {
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: "Working Paper" | "Engineering Dispatch" | "Peer-Reviewed" | "Preprint";
  abstract: string;
  links: { label: string; url: string }[];
}

const PUBLICATIONS: Pub[] = [
  {
    title: "Autonomy in the Clinic: The Research Frontier of Agentic AI",
    authors: "A. Shrestha",
    venue: "Engineering Dispatch — Hermes Research",
    year: 2026,
    type: "Working Paper",
    abstract:
      "Explores agentic evaluation frameworks in clinical settings: multi-subagent orchestration, deterministic AST verification gates, and human-in-the-loop oversight for autonomous diagnostic assistance. Proposes a pipeline architecture linking local inference (Ollama) to structured reasoning (Gemini 1.5 Pro) under deterministic guardrails.",
    links: [
      { label: "Read", url: "/blog/autonomy-in-the-clinic-the-research-frontier-of-agentic-ai" },
    ],
  },
  {
    title: "Women in IT as a Project Manager",
    authors: "A. Shrestha",
    venue: "Engineering Dispatch — Portfolio Archive",
    year: 2026,
    type: "Engineering Dispatch",
    abstract:
      "Architectural retrospective on distributed full-stack delivery: row-level Postgres tenancy patterns, cross-functional coordination across Flutter/Nginx/Stripe stacks, and the engineering leadership required to maintain sub-second SLAs under multi-city load.",
    links: [
      { label: "Read", url: "/blog/women-in-it-as-a-pm" },
    ],
  },
  {
    title: "8848 UI: A Mountain-Inspired Design System Registry for Agentic Interfaces",
    authors: "A. Shrestha",
    venue: "npmi Registry / Independent",
    year: 2026,
    type: "Preprint",
    abstract:
      "Presents a React 19 design-system specification (OKLCH token architecture, elevation shadow taxonomy, agentic component primitives) with a live MCP server for autonomous component retrieval. Documents the transition from decorative UI libraries to agent-first interface specifications.",
    links: [
      { label: "GitHub", url: "https://github.com/aayurt/8848-ui" },
      { label: "Live Registry", url: "https://8848.aayurtshrestha.com.np" },
    ],
  },
  {
    title: "Offline-First Civic Accounting: IndexedDB Cache-First State Machines for Zero-Network Governance",
    authors: "A. Shrestha",
    venue: "In preparation — Syasyah Samaj / Civic Governance",
    year: 2026,
    type: "Working Paper",
    abstract:
      "Formalizes an offline-first accounting model for community governance (10 Ilakas, sub-second local sync, zero data loss under network partition). Defines the useCachedList abstraction and optimistic reconciliation pattern for civic voucher systems.",
    links: [{ label: "Project", url: "/work/syasyah-samaj" }],
  },
  {
    title: "Reliable Agentic Software Engineering: Methods for Trustworthy, Verifiable, and Autonomous AI-Assisted Software Development",
    authors: "A. Shrestha",
    venue: "Doctoral Research Monograph — Hermes Research",
    year: 2026,
    type: "Working Paper",
    abstract:
      "Exhaustive analysis across 12 core methodological dimensions of agentic software engineering reliability. Paper-by-paper evaluation of 10 foundational benchmarks, cross-literature synthesis resolving fundamental academic debates, actionable taxonomy of agentic reliability, 10 candidate PhD research questions (RQ1–RQ10), and three complete experimental designs: containerized OverlayFS state checkpointing (sub-15ms), objective differential fuzzing verifiers replacing LLM reviewers, and dynamic complexity routing for adaptive verification. Formal initial research hypothesis with empirical validation plan on SWE-bench.",
    links: [
      { label: "Read", url: "/work/research-reliable-agentic-se" },
      { label: "GitHub", url: "https://github.com/aayurt/hermes" },
    ],
  },
  {
    title: "Autonomy in the Clinic: The Research Frontier of Agentic AI",
    authors: "A. Shrestha",
    venue: "Working Paper — Hermes Research",
    year: 2026,
    type: "Working Paper",
    abstract:
      "Explores agentic evaluation frameworks in clinical settings: multi-subagent orchestration, deterministic AST verification gates, and human-in-the-loop oversight for autonomous diagnostic assistance. Proposes a three-layer pipeline architecture linking local inference (Ollama) to structured reasoning (Gemini 1.5 Pro) under deterministic guardrails. Evaluated on MIMIC-IV differential diagnosis subset (n=1,247) with 87.1% diagnostic accuracy vs 72.3% baseline, 2.1% hallucination rate vs 18.4%, and 8% clinician override rate vs 34%.",
    links: [
      { label: "Read", url: "/research/autonomy-in-the-clinic" },
    ],
  },
];

export function Publications() {
  return (
    <div
      style={{
        width: "100%",
        background: "var(--neutral-background-weak, rgba(0,0,0,0.03))",
        border: "1px solid var(--neutral-border-weak, rgba(128,128,128,0.15))",
        borderRadius: "14px",
        padding: "24px",
        fontFamily: "var(--font-mono, monospace)",
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 6px", letterSpacing: "0.03em" }}>
          Publications &amp; Research Outputs
        </h3>
        <p style={{ fontSize: 11, color: "var(--neutral-on-background-weak)", margin: 0, lineHeight: 1.55 }}>
          Working papers, engineering dispatches, preprints, and system specifications. Ordered by date; peer-reviewed status labeled explicitly.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {PUBLICATIONS.map((pub, i) => (
          <article
            key={pub.title}
            style={{
              padding: 14,
              borderRadius: 10,
              border: "1px solid var(--neutral-border-weak, rgba(128,128,128,0.12))",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
              <span
                style={{
                  display: "inline-block",
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  padding: "2px 7px",
                  borderRadius: 4,
                  border: "1px solid rgba(0,180,216,0.3)",
                  color: pub.type === "Peer-Reviewed" ? "#0891b2" : pub.type === "Working Paper" ? "#7c3aed" : pub.type === "Preprint" ? "#f59e0b" : "#4b5563",
                  background: pub.type === "Peer-Reviewed" ? "rgba(8,145,178,0.1)" : pub.type === "Working Paper" ? "rgba(124,58,237,0.08)" : pub.type === "Preprint" ? "rgba(245,158,11,0.08)" : "rgba(75,85,99,0.08)",
                }}
              >
                {pub.type.toUpperCase()}
              </span>
              <span style={{ fontSize: 9, color: "var(--neutral-on-background-weak)", fontWeight: 500 }}>
                {pub.venue} · {pub.year}
              </span>
            </div>

            <h4 style={{ fontSize: 13, fontWeight: 700, margin: "0 0 3px", lineHeight: 1.35 }}>
              {pub.title}
            </h4>
            <p style={{ fontSize: 10.5, color: "var(--neutral-on-background-weak)", margin: "0 0 8px", fontWeight: 500 }}>
              {pub.authors}
            </p>
            <p style={{ fontSize: 11, color: "var(--neutral-on-background-medium, #4b5563)", margin: "0 0 10px", lineHeight: 1.5 }}>
              {pub.abstract}
            </p>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {pub.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 9999,
                    border: "1.5px solid rgba(8,145,178,0.3)",
                    color: "#0891b2",
                    textDecoration: "none",
                    background: "rgba(255,255,255,0.06)",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "#0891b2";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#0891b2";
                  }}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

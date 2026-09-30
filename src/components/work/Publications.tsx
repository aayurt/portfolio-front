"use client";

import React, { useEffect, useState, useMemo } from "react";

interface Pub {
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: "Working Paper" | "Engineering Dispatch" | "Peer-Reviewed" | "Preprint";
  abstract: string;
  slug: string;
  links: { label: string; url: string }[];
  tags?: string[];
  excerpt?: string;
  date?: string;
  readTime?: string;
}

export async function getPublications() {
  const res = await fetch(`/api/publications`, {
    method: "GET",
  });
  if (!res.ok) throw new Error("Failed to fetch publications");
  const data = await res.json();
  return data.docs.map((doc: any) => ({
    title: doc.title,
    authors: doc.authors,
    venue: doc.venue || "",
    year: doc.year,
    type: doc.type as Pub["type"],
    abstract: doc.abstract,
    slug: doc.slug || "",
    links: [
      { label: "Read", url: `/blog/${doc.slug}` },
    ],
    tags: doc.tags || [],
    excerpt: doc.excerpt || doc.abstract?.substring(0, 200) + "…",
    date: doc.publishedAt ? new Date(doc.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "",
    readTime: doc.readTime || "5 min read",
  }));
}

const typeColors: Record<Pub["type"], { border: string; color: string; bg: string }> = {
  "Peer-Reviewed": {
    border: "rgba(8,145,178,0.3)",
    color: "#00b4d8",
    bg: "rgba(8,145,178,0.1)",
  },
  "Working Paper": {
    border: "rgba(124,58,237,0.3)",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
  },
  Preprint: {
    border: "rgba(245,158,11,0.3)",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
  },
  "Engineering Dispatch": {
    border: "rgba(63,185,80,0.3)",
    color: "#3fb950",
    bg: "rgba(63,185,80,0.08)",
  },
};

const filterOptions = [
  { id: "all", label: "All Writings" },
  { id: "Working Paper", label: "Working Papers" },
  { id: "Engineering Dispatch", label: "Engineering Dispatches" },
  { id: "Peer-Reviewed", label: "Peer-Reviewed" },
  { id: "Preprint", label: "Preprints" },
];

// Per-publication featured-card dressing. Anything not listed here falls back
// to the generic type/venue kicker, the excerpt, and the verification schematic.
const FEATURED_DETAILS: Record<
  string,
  { kicker: string; inquiriesTitle: string; inquiries: string; figureCaption: string; schematic: "clinical" | "verification" }
> = {
  "autonomy-in-the-clinic-the-research-frontier-of-agentic-ai": {
    kicker: "Doctoral Research · AI Ethics",
    inquiriesTitle: "Key Research Inquiries:",
    inquiries:
      "Bounding hallucinated actions with mathematical verification, resolving multi-agent clinical consensus conflicts, and engineering RLHF reward functions for long-term health stabilization.",
    figureCaption: "Figure 1: Stochastic Clinical Execution with Guardrail Bounding",
    schematic: "clinical",
  },
  "reliable-agentic-software-engineering": {
    kicker: "Doctoral Research · Agentic Systems Engineering",
    inquiriesTitle: "Key Research Inquiries:",
    inquiries:
      "Replacing LLM reviewers with differential fuzzing verifiers, checkpointing agent state in sub-15ms with OverlayFS, and routing verification effort by code complexity.",
    figureCaption: "Figure 1: Objective Verification Pipeline for Agentic Code",
    schematic: "verification",
  },
};

export function Publications() {
  const [publications, setPublications] = useState<Pub[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    getPublications()
      .then((pubs) => {
        setPublications(pubs);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredPublications = useMemo(() => {
    if (activeFilter === "all") return publications;
    return publications.filter((p) => p.type === activeFilter);
  }, [publications, activeFilter]);

  // Featured: first Working Paper or first publication
  const featured = useMemo(() => {
    return filteredPublications.find((p) => p.type === "Working Paper") || filteredPublications[0];
  }, [filteredPublications]);

  const remaining = useMemo(() => {
    if (!featured) return filteredPublications;
    return filteredPublications.filter((p) => p !== featured);
  }, [filteredPublications, featured]);

  const featuredDetails = (featured && FEATURED_DETAILS[featured.slug]) || null;

  if (loading) return <p style={{ color: "var(--neutral-on-background-weak)", textAlign: "center", padding: "40px" }}>Loading publications…</p>;
  if (error) return <p style={{ color: "red", textAlign: "center", padding: "40px" }}>Error: {error}</p>;

  return (
    <div style={{ width: "100%", maxWidth: "1200px" }}>
      {/* Filter Bar */}
      <nav style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap", marginBottom: "36px" }}>
        {filterOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setActiveFilter(opt.id)}
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "12px",
              padding: "7px 14px",
              borderRadius: "9999px",
              background: activeFilter === opt.id ? "var(--neutral-on-background-strong)" : "transparent",
              color: activeFilter === opt.id ? "var(--neutral-background-strong)" : "var(--neutral-on-background-weak)",
              border: `1px solid ${activeFilter === opt.id ? "var(--neutral-on-background-strong)" : "var(--neutral-border-weak)"}`,
              cursor: "pointer",
              transition: "all 0.15s ease",
              fontWeight: activeFilter === opt.id ? 600 : 400,
            }}
            onMouseEnter={(e) => {
              if (activeFilter !== opt.id) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--neutral-border-medium)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--neutral-on-background-strong)";
              }
            }}
            onMouseLeave={(e) => {
              if (activeFilter !== opt.id) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--neutral-border-weak)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--neutral-on-background-weak)";
              }
            }}
          >
            {opt.label}
          </button>
        ))}
      </nav>

      {/* Featured Spotlight Card */}
      {featured && (
        <article
          style={{
            background: "var(--neutral-background-weak)",
            border: "1px solid var(--neutral-border-medium)",
            borderRadius: "20px",
            padding: "28px",
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: "28px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            marginBottom: "32px",
            transition: "border-color 0.2s ease, transform 0.2s ease",
          }}
        >
          {/* Visual/Schematic Area */}
          <div
            style={{
              background: "var(--neutral-alpha-weak, rgba(128,128,128,0.06))",
              border: "1px solid var(--neutral-border-weak)",
              borderRadius: "14px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "280px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", color: "var(--brand-on-background-strong, #00b4d8)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {featured.type} · {featured.venue || "Research"}
              </span>
              <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", color: "var(--neutral-on-background-weak)" }}>
                {featured.year}
              </span>
            </div>

            {/* Schematic SVG - per-publication pipeline */}
            {(featuredDetails?.schematic ?? "verification") === "clinical" ? (
            <svg viewBox="0 0 460 160" width="100%" height="150" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flex: 1 }}>
              {/* Patient Trajectory */}
              <rect x="10" y="20" width="100" height="50" rx="6" fill="rgba(128,128,128,0.10)" stroke="#00b4d8" strokeWidth="1.5"/>
              <text x="60" y="42" fill="var(--neutral-on-background-strong)" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="600">Patient Trajectory</text>
              <text x="60" y="56" fill="var(--neutral-on-background-weak)" fontSize="8" fontFamily="monospace" textAnchor="middle">EHR · 48h Stream</text>

              <path d="M110 45 L150 45" stroke="#00b4d8" strokeWidth="1.5" strokeDasharray="3 3"/>
              <polygon points="152,45 146,42 146,48" fill="#00b4d8"/>

              {/* Agentic Reasoning */}
              <rect x="155" y="15" width="140" height="60" rx="8" fill="rgba(128,128,128,0.16)" stroke="var(--neutral-border-medium)" strokeWidth="1"/>
              <text x="225" y="36" fill="#00b4d8" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="700">Agentic Reasoning</text>
              <text x="225" y="52" fill="var(--neutral-on-background-weak)" fontSize="8.5" fontFamily="monospace" textAnchor="middle">Chain-of-Thought · ToT</text>
              <text x="225" y="64" fill="var(--neutral-on-background-weak)" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Clinical Protocol Alignment</text>

              <path d="M295 45 L335 45" stroke="#00b4d8" strokeWidth="1.5"/>
              <polygon points="337,45 331,42 331,48" fill="#00b4d8"/>

              {/* Formal Verification */}
              <rect x="340" y="20" width="110" height="50" rx="6" fill="rgba(128,128,128,0.10)" stroke="#3fb950" strokeWidth="1.5"/>
              <text x="395" y="42" fill="#3fb950" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="600">Formal Verification</text>
              <text x="395" y="56" fill="var(--neutral-on-background-weak)" fontSize="8" fontFamily="monospace" textAnchor="middle">Zero Hallucinated Tools</text>

              {/* Multi-Agent Bottom Row */}
              <path d="M225 75 L225 105" stroke="var(--neutral-border-medium)" strokeWidth="1" strokeDasharray="2 2"/>
              <rect x="120" y="105" width="210" height="38" rx="6" fill="rgba(128,128,128,0.06)" stroke="var(--neutral-border-weak)" strokeWidth="1"/>
              <text x="225" y="122" fill="var(--neutral-on-background-strong)" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="600">Multi-Agent Clinical Consensus (MAS)</text>
              <text x="225" y="134" fill="var(--neutral-on-background-weak)" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Cardiology · Nephrology · Tumor Board</text>
            </svg>
            ) : (
            <svg viewBox="0 0 460 160" width="100%" height="150" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flex: 1 }}>
              {/* Agent Workspace */}
              <rect x="10" y="20" width="110" height="52" rx="6" fill="rgba(128,128,128,0.10)" stroke="#00b4d8" strokeWidth="1.5"/>
              <text x="65" y="42" fill="var(--neutral-on-background-strong)" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="600">Agent Workspace</text>
              <text x="65" y="56" fill="var(--neutral-on-background-weak)" fontSize="8" fontFamily="monospace" textAnchor="middle">OverlayFS Snapshot</text>

              <path d="M120 46 L152 46" stroke="#00b4d8" strokeWidth="1.5" strokeDasharray="3 3"/>
              <polygon points="154,46 148,43 148,49" fill="#00b4d8"/>

              {/* Objective Verifiers */}
              <rect x="157" y="14" width="146" height="64" rx="8" fill="rgba(128,128,128,0.16)" stroke="var(--neutral-border-medium)" strokeWidth="1"/>
              <text x="230" y="36" fill="#00b4d8" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="700">Objective Verifiers</text>
              <text x="230" y="52" fill="var(--neutral-on-background-weak)" fontSize="8.5" fontFamily="monospace" textAnchor="middle">AFL++ Fuzz · Daikon</text>
              <text x="230" y="64" fill="var(--neutral-on-background-weak)" fontSize="7.5" fontFamily="monospace" textAnchor="middle">No LLM Reviewers</text>

              <path d="M303 46 L335 46" stroke="#00b4d8" strokeWidth="1.5"/>
              <polygon points="337,46 331,43 331,49" fill="#00b4d8"/>

              {/* Complexity Router */}
              <rect x="340" y="20" width="110" height="52" rx="6" fill="rgba(128,128,128,0.10)" stroke="#3fb950" strokeWidth="1.5"/>
              <text x="395" y="42" fill="#3fb950" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="600">Complexity Router</text>
              <text x="395" y="56" fill="var(--neutral-on-background-weak)" fontSize="7" fontFamily="monospace" textAnchor="middle">Static → Fuzz</text>

              {/* Reliability Ledger */}
              <path d="M230 78 L230 106" stroke="var(--neutral-border-medium)" strokeWidth="1" strokeDasharray="2 2"/>
              <rect x="120" y="106" width="220" height="38" rx="6" fill="rgba(128,128,128,0.06)" stroke="var(--neutral-border-weak)" strokeWidth="1"/>
              <text x="230" y="123" fill="var(--neutral-on-background-strong)" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="600">Agentic Reliability Taxonomy</text>
              <text x="230" y="135" fill="var(--neutral-on-background-weak)" fontSize="7.5" fontFamily="monospace" textAnchor="middle">12 Dimensions · 10 Benchmarks · RQ1–RQ10</text>
            </svg>
            )}

            <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", color: "var(--neutral-on-background-weak)", textAlign: "center" }}>
              {featuredDetails?.figureCaption ?? "Figure 1: Research pipeline schematic"}
            </div>
          </div>

          {/* Meta Content */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "16px" }}>
            <div className="badgeRow" style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", padding: "4px 8px", borderRadius: "4px", background: "var(--brand-background-weak, rgba(0,180,216,0.12))", color: "var(--brand-on-background-strong, #00b4d8)", border: "1px solid rgba(0,180,216,0.35)" }}>
                {featuredDetails?.kicker ?? `${featured.type} · ${featured.venue || "Research"}`}
              </span>
              <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "11px", color: "var(--neutral-on-background-weak)" }}>
                {featured.date || `${featured.year}`} · {featured.readTime}
              </span>
            </div>

            <h2 style={{ fontSize: "24px", fontWeight: 700, lineHeight: "1.3", letterSpacing: "-0.02em", margin: 0 }}>
              {featured.title}
            </h2>

            <p style={{ fontSize: "14px", color: "var(--neutral-on-background-weak)", lineHeight: "1.6", margin: 0 }}>
              {featured.excerpt}
            </p>

            <div style={{ background: "rgba(128,128,128,0.08)", borderLeft: "2px solid var(--brand-on-background-strong, #00b4d8)", padding: "10px 14px", fontSize: "12px", color: "var(--neutral-on-background-weak)", lineHeight: "1.5", borderRadius: "0 6px 6px 0" }}>
              <strong>{featuredDetails?.inquiriesTitle ?? "Abstract:"}</strong> {featuredDetails?.inquiries ?? featured.excerpt}
            </div>

            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {featured.tags?.slice(0, 5).map((tag, i) => (
                <span key={i} style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "11px", padding: "3px 8px", borderRadius: "4px", background: "rgba(128,128,128,0.08)", border: "1px solid var(--border-weak, rgba(255,255,255,0.08))", color: "var(--neutral-on-background-weak)" }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "4px" }}>
              <a
                href={featured.links[0]?.url || "#"}
                style={{
                  background: "var(--neutral-on-background-strong)",
                  color: "var(--neutral-background-strong)",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                Read Paper & Analysis →
              </a>
              <a
                href="#"
                style={{
                  background: "transparent",
                  color: "var(--neutral-on-background-weak)",
                  border: "1px solid var(--neutral-border-weak)",
                  padding: "7px 14px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontFamily: "var(--font-mono, monospace)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                Export BibTeX ↗
              </a>
            </div>
          </div>
        </article>
      )}

      {/* Posts Grid */}
      {remaining.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", width: "100%" }}>
          {remaining.map((pub, idx) => (
            <article
              key={pub.title}
              style={{
                background: "var(--neutral-background-weak)",
                border: "1px solid var(--neutral-border-medium)",
                borderRadius: "20px",
                padding: "18px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.15)",
                transition: "transform 0.2s ease, border-color 0.2s ease",
              }}
            >
              {/* Visual Placeholder */}
              <div style={{ height: "140px", background: "var(--neutral-alpha-weak, rgba(128,128,128,0.06))", border: "1px solid var(--border-weak, rgba(255,255,255,0.08))", borderRadius: "14px", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", padding: "14px" }}>
                <svg viewBox="0 0 300 110" width="100%" height="100" fill="none" style={{ opacity: 0.6 }}>
                  {/* Abstract diagram based on type */}
                  {pub.slug === "reliable-agentic-software-engineering" && (
                    <>
                      <rect x="8" y="28" width="88" height="46" rx="6" fill="rgba(0,180,216,0.08)" stroke="#00b4d8" strokeWidth="1.5"/>
                      <text x="52" y="48" fill="#00b4d8" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="700">Checkpoint</text>
                      <text x="52" y="61" fill="var(--neutral-on-background-weak)" fontSize="7" fontFamily="monospace" textAnchor="middle">OverlayFS · &lt;15ms</text>
                      <path d="M96 51 L112 51" stroke="#00b4d8" strokeWidth="1.5"/>
                      <polygon points="114,51 108,48 108,54" fill="#00b4d8"/>
                      <rect x="116" y="28" width="92" height="46" rx="6" fill="rgba(128,128,128,0.10)" stroke="var(--neutral-border-medium)" strokeWidth="1"/>
                      <text x="162" y="48" fill="var(--neutral-on-background-strong)" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="700">Fuzz Verifier</text>
                      <text x="162" y="61" fill="var(--neutral-on-background-weak)" fontSize="7" fontFamily="monospace" textAnchor="middle">AFL++ · Daikon</text>
                      <path d="M208 51 L224 51" stroke="#00b4d8" strokeWidth="1.5"/>
                      <polygon points="226,51 220,48 220,54" fill="#00b4d8"/>
                      <rect x="228" y="28" width="64" height="46" rx="6" fill="rgba(63,185,80,0.08)" stroke="#3fb950" strokeWidth="1.5"/>
                      <text x="260" y="48" fill="#3fb950" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="700">Route</text>
                      <text x="260" y="61" fill="var(--neutral-on-background-weak)" fontSize="7" fontFamily="monospace" textAnchor="middle">Adaptive</text>
                      <text x="150" y="95" fill="var(--neutral-on-background-weak)" fontSize="7" fontFamily="monospace" textAnchor="middle">Isolated State · Objective Verifiers · No LLM Reviewers</text>
                    </>
                  )}
                  {pub.type === "Working Paper" && pub.slug !== "reliable-agentic-software-engineering" && (
                    <>
                      <rect x="20" y="30" width="80" height="40" rx="6" fill="rgba(128,128,128,0.10)" stroke="#00b4d8" strokeWidth="1.5"/>
                      <text x="60" y="52" fill="#00b4d8" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="600">Input</text>
                      <path d="M100 50 L130 50" stroke="#00b4d8" strokeWidth="1.5"/>
                      <polygon points="132,50 126,47 126,53" fill="#00b4d8"/>
                      <rect x="135" y="25" width="140" height="50" rx="6" fill="rgba(128,128,128,0.16)" stroke="var(--neutral-border-medium)" strokeWidth="1"/>
                      <text x="205" y="42" fill="var(--neutral-on-background-strong)" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="600">Verification</text>
                      <text x="205" y="56" fill="var(--neutral-on-background-weak)" fontSize="7.5" fontFamily="monospace" textAnchor="middle">AST · Fuzz · Human</text>
                      <path d="M275 50 L300 50" stroke="#00b4d8" strokeWidth="1.5"/>
                      <polygon points="302,50 296,47 296,53" fill="#00b4d8"/>
                      <text x="310" y="50" fill="#3fb950" fontSize="9" fontFamily="monospace">Output</text>
                    </>
                  )}
                  {pub.type === "Engineering Dispatch" && (
                    <>
                      <rect x="20" y="25" width="70" height="45" rx="6" fill="rgba(128,128,128,0.10)" stroke="var(--neutral-border-weak)"/>
                      <text x="55" y="52" fill="var(--neutral-on-background-strong)" fontSize="10" fontFamily="monospace" textAnchor="middle">Code</text>
                      <path d="M90 47 L120 47" stroke="#3fb950" strokeWidth="1.5"/>
                      <polygon points="122,47 116,44 116,50" fill="#3fb950"/>
                      <rect x="120" y="25" width="70" height="45" rx="6" fill="rgba(128,128,128,0.10)" stroke="#3fb950"/>
                      <text x="155" y="52" fill="#3fb950" fontSize="10" fontFamily="monospace" textAnchor="middle">Build</text>
                      <path d="M190 47 L220 47" stroke="#3fb950" strokeWidth="1.5"/>
                      <polygon points="222,47 216,44 216,50" fill="#3fb950"/>
                      <rect x="220" y="25" width="70" height="45" rx="6" fill="rgba(128,128,128,0.10)" stroke="#3fb950"/>
                      <text x="255" y="52" fill="#3fb950" fontSize="10" fontFamily="monospace" textAnchor="middle">Deploy</text>
                    </>
                  )}
                  {pub.type === "Peer-Reviewed" && (
                    <>
                      <rect x="20" y="25" width="75" height="50" rx="6" fill="rgba(128,128,128,0.10)" stroke="#00b4d8" strokeWidth="1.5"/>
                      <text x="57" y="42" fill="#00b4d8" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="600">Submission</text>
                      <text x="57" y="56" fill="var(--neutral-on-background-weak)" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Manuscript</text>
                      <path d="M95 45 L135 45" stroke="#00b4d8" strokeWidth="1.5" strokeDasharray="3 3"/>
                      <rect x="135" y="25" width="100" height="50" rx="6" fill="rgba(128,128,128,0.16)" stroke="#00b4d8" strokeWidth="1.5"/>
                      <text x="185" y="42" fill="#00b4d8" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="600">Peer Review</text>
                      <text x="185" y="56" fill="var(--neutral-on-background-weak)" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Revision Cycle</text>
                      <path d="M235 45 L275 45" stroke="#00b4d8" strokeWidth="1.5"/>
                      <polygon points="277,45 271,42 271,48" fill="#00b4d8"/>
                      <rect x="275" y="25" width="40" height="50" rx="6" fill="rgba(128,128,128,0.10)" stroke="#3fb950" strokeWidth="1.5"/>
                      <text x="295" y="42" fill="#3fb950" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="600">Published</text>
                      <text x="295" y="56" fill="var(--neutral-on-background-weak)" fontSize="7.5" fontFamily="monospace" textAnchor="middle">DOI</text>
                    </>
                  )}
                  {pub.type === "Preprint" && (
                    <>
                      <rect x="20" y="30" width="100" height="40" rx="6" fill="rgba(128,128,128,0.10)" stroke="#f59e0b" strokeWidth="1.5"/>
                      <text x="70" y="52" fill="#f59e0b" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="600">Preprint</text>
                      <path d="M120 50 L160 50" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3"/>
                      <polygon points="162,50 156,47 156,53" fill="#f59e0b"/>
                      <rect x="165" y="25" width="120" height="50" rx="6" fill="rgba(128,128,128,0.16)" stroke="var(--neutral-border-medium)" strokeWidth="1"/>
                      <text x="225" y="42" fill="var(--neutral-on-background-strong)" fontSize="9" fontFamily="monospace" textAnchor="middle">arXiv / bioRxiv</text>
                      <text x="225" y="56" fill="var(--neutral-on-background-weak)" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Open Commentary</text>
                      <path d="M285 50 L300 50" stroke="#f59e0b" strokeWidth="1.5"/>
                      <polygon points="302,50 296,47 296,53" fill="#f59e0b"/>
                      <text x="310" y="50" fill="var(--neutral-on-background-weak)" fontSize="9" fontFamily="monospace">Version</text>
                    </>
                  )}
                </svg>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "11px", color: "var(--neutral-on-background-weak)" }}>
                  {pub.date} · {pub.readTime}
                </div>
                <h3 style={{ fontSize: "17px", fontWeight: 600, lineHeight: "1.35", letterSpacing: "-0.01em", margin: 0 }}>
                  {pub.title}
                </h3>
                <p style={{ fontSize: "13px", color: "var(--neutral-on-background-weak)", lineHeight: "1.5", margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {pub.excerpt}
                </p>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {pub.tags?.slice(0, 3).map((tag, i) => (
<span key={i} style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "11px", padding: "3px 8px", borderRadius: "4px", background: "rgba(128,128,128,0.08)", border: "1px solid var(--neutral-border-weak)", color: "var(--neutral-on-background-weak)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "10px", borderTop: "1px solid var(--border-weak, rgba(255,255,255,0.08))", fontFamily: "var(--font-mono, monospace)", fontSize: "11px", color: "var(--neutral-on-background-weak)" }}>
                <span>{pub.type}</span>
                <a
                  href={pub.links[0]?.url || "#"}
                  style={{ color: "var(--neutral-on-background-strong)", fontWeight: 500, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}
                >
                  Read Dispatch →
                </a>
              </div>
            </article>
          ))}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 900px) {
          article:first-of-type {
            grid-template-columns: 1fr !important;
          }
          .postsGrid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Publications;
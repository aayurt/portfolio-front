"use client";

import { Column, Heading, Line, Row, Text } from "@once-ui-system/core";
import { about, baseURL, person, research as researchConfig } from "@/resources";
import Publications from "@/components/work/Publications";

export default function AutonomyInTheClinic() {
  return (
    <Column fillWidth maxWidth="l" horizontal="center" paddingY="48" gap="xl" style={{ background: "var(--bg, #0c0e12)", minHeight: "100vh" }}>
      {/* Header */}
      <Column fillWidth horizontal="center" gap="s" marginBottom="xl">
        <Text
          variant="label-default-s"
          onBackground="neutral-weak"
          style={{
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: "var(--font-mono, monospace)",
            color: "var(--text-dim, #606873)",
          }}
          align="center"
        >
          Research & Publications
        </Text>
        <Heading variant="display-strong-m" align="center" style={{ color: "var(--text, #f0f2f5)" }}>
          Autonomy in the Clinic: The Research Frontier of Agentic AI
        </Heading>
        <Text
          variant="body-default-l"
          onBackground="neutral-weak"
          align="center"
          style={{ maxWidth: "680px", color: "var(--text-muted, #8b949e)" }}
          wrap="balance"
        >
          {researchConfig.description}
        </Text>
      </Column>

      {/* Featured Paper Detail - Full Width */}
      <article
        style={{
          width: "100%",
          background: "var(--card-bg, #14171f)",
          border: "1px solid var(--border-medium, rgba(255,255,255,0.16))",
          borderRadius: "20px",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Header Meta */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "10px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  background: "rgba(124,58,237,0.15)",
                  color: "#7c3aed",
                  border: "1px solid rgba(124,58,237,0.3)",
                }}
              >
                WORKING PAPER
              </span>
              <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", color: "var(--text-dim, #606873)" }}>
                Hermes Research · 2026
              </span>
            </div>
            <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "11px", color: "var(--text-dim, #606873)" }}>
              A. Shrestha · September 15, 2026 · 12 min read
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <a
              href="/blog/autonomy-in-the-clinic-the-research-frontier-of-agentic-ai"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "var(--text, #f0f2f5)",
                color: "var(--bg, #0c0e12)",
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
              Read Full Paper ↗
            </a>
            <a
              href="https://docs.google.com/document/d/1cQ6DEYC3DMluBoo80e-245HNk7SOjNvvqKFxINxXrBM/edit?tab=t.0#heading=h.kzobgexilpy5"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "transparent",
                color: "var(--text-muted, #8b949e)",
                border: "1px solid var(--border-weak, rgba(255,255,255,0.08))",
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
              Google Doc ↗
            </a>
          </div>
        </div>

        {/* Schematic Visual */}
        <div
          style={{
            background: "var(--card-inner, #090a0d)",
            border: "1px solid var(--border-weak, rgba(255,255,255,0.08))",
            borderRadius: "14px",
            padding: "24px",
          }}
        >
          <svg viewBox="0 0 800 200" width="100%" height="180" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Layer 1: Perception */}
            <rect x="20" y="40" width="180" height="120" rx="8" fill="#14171f" stroke="#58a6ff" strokeWidth="1.5"/>
            <text x="110" y="70" fill="#58a6ff" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="700">PERCEPTION LAYER</text>
            <text x="110" y="88" fill="#f0f2f5" fontSize="10" fontFamily="monospace" textAnchor="middle">Local Inference</text>
            <text x="110" y="102" fill="#8b949e" fontSize="9" fontFamily="monospace" textAnchor="middle">Ollama · Quantized</text>
            <text x="110" y="116" fill="#8b949e" fontSize="9" fontFamily="monospace" textAnchor="middle">PHI-Safe Preprocess</text>
            <text x="110" y="134" fill="#c9d1d9" fontSize="9" fontFamily="monospace" textAnchor="middle">History Collector</text>
            <text x="110" y="148" fill="#8b949e" fontSize="8" fontFamily="monospace" textAnchor="middle">FHIR Schema Validation</text>

            <path d="M200 100 L230 100" stroke="#58a6ff" strokeWidth="1.5" strokeDasharray="3 3"/>
            <polygon points="232,100 226,97 226,103" fill="#58a6ff"/>

            {/* Layer 2: Reasoning */}
            <rect x="235" y="20" width="280" height="160" rx="10" fill="#181c26" stroke="#8b949e" strokeWidth="1"/>
            <text x="375" y="45" fill="#58a6ff" fontSize="12" fontFamily="monospace" textAnchor="middle" fontWeight="700">REASONING LAYER</text>
            <text x="375" y="62" fill="#f0f2f5" fontSize="10" fontFamily="monospace" textAnchor="middle">Structured LLM Orchestration</text>
            <text x="375" y="76" fill="#8b949e" fontSize="9" fontFamily="monospace" textAnchor="middle">Gemini 1.5 Pro · Cloud</text>
            <text x="375" y="90" fill="#8b949e" fontSize="9" fontFamily="monospace" textAnchor="middle">Deterministic Guardrails</text>

            {/* Subagents in reasoning */}
            <rect x="255" y="85" width="100" height="35" rx="6" fill="#14171f" stroke="#30363d" strokeWidth="1"/>
            <text x="305" y="102" fill="#f0f2f5" fontSize="8.5" fontFamily="monospace" textAnchor="middle">Differential</text>
            <text x="305" y="112" fill="#8b949e" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Generator</text>

            <rect x="365" y="85" width="100" height="35" rx="6" fill="#14171f" stroke="#30363d" strokeWidth="1"/>
            <text x="415" y="102" fill="#f0f2f5" fontSize="8.5" fontFamily="monospace" textAnchor="middle">Evidence</text>
            <text x="415" y="112" fill="#8b949e" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Retriever</text>

            <rect x="475" y="85" width="100" height="35" rx="6" fill="#14171f" stroke="#30363d" strokeWidth="1"/>
            <text x="525" y="102" fill="#f0f2f5" fontSize="8.5" fontFamily="monospace" textAnchor="middle">Safety</text>
            <text x="525" y="112" fill="#8b949e" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Reviewer</text>

            <path d="M515 100 L545 100" stroke="#58a6ff" strokeWidth="1.5" strokeDasharray="3 3"/>
            <polygon points="547,100 541,97 541,103" fill="#58a6ff"/>

            {/* Layer 3: Verification */}
            <rect x="550" y="40" width="230" height="120" rx="8" fill="#14171f" stroke="#3fb950" strokeWidth="1.5"/>
            <text x="665" y="70" fill="#3fb950" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="700">VERIFICATION LAYER</text>
            <text x="665" y="88" fill="#f0f2f5" fontSize="10" fontFamily="monospace" textAnchor="middle">Execution-Grounded</text>
            <text x="665" y="102" fill="#8b949e" fontSize="9" fontFamily="monospace" textAnchor="middle">AST Validator</text>
            <text x="665" y="116" fill="#8b949e" fontSize="9" fontFamily="monospace" textAnchor="middle">Differential Fuzzing</text>
            <text x="665" y="134" fill="#c9d1d9" fontSize="9" fontFamily="monospace" textAnchor="middle">Human Checkpoint</text>
            <text x="665" y="148" fill="#8b949e" fontSize="8" fontFamily="monospace" textAnchor="middle">Configurable Policy</text>

            {/* Bottom: Output */}
            <path d="M400 182 L400 200" stroke="#8b949e" strokeWidth="1" strokeDasharray="2 2"/>
            <text x="400" y="195" fill="#606873" fontSize="9" fontFamily="monospace" textAnchor="middle">FHIR DiagnosticReport</text>
          </svg>

          <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", color: "var(--text-dim, #606873)", textAlign: "center", marginTop: "12px" }}>
            Figure 1: Three-Layer Agentic Pipeline Architecture — Perception → Reasoning → Verification
          </div>
        </div>

        {/* Abstract */}
        <div style={{ background: "rgba(255,255,255,0.03)", borderLeft: "3px solid var(--accent, #58a6ff)", padding: "16px 20px", borderRadius: "0 8px 8px 0" }}>
          <p style={{ fontSize: "14px", color: "var(--text-muted, #8b949e)", lineHeight: "1.6", margin: 0 }}>
            <strong>Abstract:</strong> This paper explores agentic evaluation frameworks in clinical settings: multi-subagent orchestration, deterministic AST verification gates, and human-in-the-loop oversight for autonomous diagnostic assistance. We propose a pipeline architecture linking local inference (Ollama) to structured reasoning (Gemini 1.5 Pro) under deterministic guardrails. Evaluated on MIMIC-IV differential diagnosis subset (n=1,247) with 87.1% diagnostic accuracy vs 72.3% baseline, 2.1% hallucination rate vs 18.4%, and 8% clinician override rate vs 34%.
          </p>
        </div>

        {/* Key Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", padding: "16px 0", borderTop: "1px solid var(--border-weak, rgba(255,255,255,0.08))", borderBottom: "1px solid var(--border-weak, rgba(255,255,255,0.08))" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "28px", fontWeight: 700, fontFamily: "var(--font-mono, monospace)", color: "var(--accent, #58a6ff)", lineHeight: 1 }}>87.1%</div>
            <div style={{ fontSize: "11px", color: "var(--text-dim, #606873)", fontFamily: "var(--font-mono, monospace)", marginTop: "4px" }}>Diagnostic Accuracy</div>
            <div style={{ fontSize: "10px", color: "var(--text-dim, #606873)", marginTop: "2px" }}>vs 72.3% baseline</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "28px", fontWeight: 700, fontFamily: "var(--font-mono, monospace)", color: "#3fb950", lineHeight: 1 }}>2.1%</div>
            <div style={{ fontSize: "11px", color: "var(--text-dim, #606873)", fontFamily: "var(--font-mono, monospace)", marginTop: "4px" }}>Hallucination Rate</div>
            <div style={{ fontSize: "10px", color: "var(--text-dim, #606873)", marginTop: "2px" }}>vs 18.4% baseline</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "28px", fontWeight: 700, fontFamily: "var(--font-mono, monospace)", color: "#f59e0b", lineHeight: 1 }}>2.3s</div>
            <div style={{ fontSize: "11px", color: "var(--text-dim, #606873)", fontFamily: "var(--font-mono, monospace)", marginTop: "4px" }}>Verification Latency</div>
            <div style={{ fontSize: "10px", color: "var(--text-dim, #606873)", marginTop: "2px" }}>p95 end-to-end</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "28px", fontWeight: 700, fontFamily: "var(--font-mono, monospace)", color: "#7c3aed", lineHeight: 1 }}>8%</div>
            <div style={{ fontSize: "11px", color: "var(--text-dim, #606873)", fontFamily: "var(--font-mono, monospace)", marginTop: "4px" }}>Clinician Override</div>
            <div style={{ fontSize: "10px", color: "var(--text-dim, #606873)", marginTop: "2px" }}>vs 34% baseline</div>
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["Agentic AI", "Formal Methods", "Clinical MAS", "RLHF", "Healthcare AI", "MIMIC-IV"].map((tag, i) => (
            <span key={i} style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "11px", padding: "4px 10px", borderRadius: "4px", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-weak, rgba(255,255,255,0.08))", color: "var(--text-muted, #8b949e)" }}>
              {tag}
            </span>
          ))}
        </div>
      </article>

      <Line maxWidth={60} style={{ borderColor: "var(--border-medium, rgba(255,255,255,0.16))" }} />

      {/* All Publications */}
      <Column fillWidth horizontal="center" gap="l" marginTop="xl" style={{ maxWidth: "1200px" }}>
        <Text
          variant="label-default-s"
          onBackground="neutral-weak"
          style={{
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: "var(--font-mono, monospace)",
            color: "var(--text-dim, #606873)",
          }}
          align="center"
        >
          All Publications & Research Outputs
        </Text>
      </Column>

      <Column fillWidth horizontal="center" gap="l" marginTop="l" style={{ maxWidth: "1200px" }}>
        <Publications />
      </Column>

      {/* Writing */}
      {researchConfig.writing && researchConfig.writing.length > 0 && (
        <Column fillWidth gap="l" marginTop="l" style={{ maxWidth: "1200px" }}>
          <Heading variant="heading-strong-xl" align="center" marginBottom="s" style={{ color: "var(--text, #f0f2f5)" }}>
            Writing & Dispatches
          </Heading>
          <Row horizontal="center" gap="m" wrap>
            {researchConfig.writing.map((item, i) => (
              <span key={i}>
                <a
                  href={item.link}
                  style={{
                    color: "var(--brand-on-background-strong)",
                    textDecoration: "underline",
                    textUnderlineOffset: "2px",
                  }}
                >
                  {item.title}
                </a>
              </span>
            ))}
          </Row>
        </Column>
      )}
    </Column>
  );
}
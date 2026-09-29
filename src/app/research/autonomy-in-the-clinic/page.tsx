import { Metadata } from "next";
import { Column, Heading, Line, Meta, Row, Text } from "@once-ui-system/core";
import { about, baseURL, person, research as researchConfig } from "@/resources";
import { Publications } from "@/components/work/Publications";

export async function generateMetadata(): Promise<Metadata> {
  return Meta.generate({
    title: "Autonomy in the Clinic: The Research Frontier of Agentic AI – Aayurt Shrestha",
    description: "Explores agentic evaluation frameworks in clinical settings: multi-subagent orchestration, deterministic AST verification gates, and human-in-the-loop oversight for autonomous diagnostic assistance. Proposes a three-layer pipeline architecture linking local inference (Ollama) to structured reasoning (Gemini 1.5 Pro) under deterministic guardrails.",
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent("Autonomy in the Clinic: The Research Frontier of Agentic AI")}`,
    path: "/research/autonomy-in-the-clinic",
  });
}

export default function AutonomyInTheClinic() {
  return (
    <Column fillWidth maxWidth="l" horizontal="center" paddingY="48" gap="xl">
      {/* Header */}
      <Column fillWidth horizontal="center" gap="s" marginBottom="xl">
        <Text
          variant="label-default-s"
          onBackground="neutral-weak"
          style={{
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: "var(--font-mono, monospace)",
          }}
          align="center"
        >
          Research & Publications
        </Text>
        <Heading variant="display-strong-m" align="center">
          Autonomy in the Clinic: The Research Frontier of Agentic AI
        </Heading>
        <Text
          variant="body-default-l"
          onBackground="neutral-weak"
          align="center"
          style={{ maxWidth: "680px" }}
          wrap="balance"
        >
          {researchConfig.description}
        </Text>
      </Column>

      {/* Publication Details */}
      <Column fillWidth horizontal="center" gap="l" marginTop="xl">
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
              Working Paper — Hermes Research
            </h3>
            <p style={{ fontSize: 11, color: "var(--neutral-on-background-weak)", margin: 0, lineHeight: 1.55 }}>
              A. Shrestha · 2026
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <article
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
                    border: "1px solid rgba(124,58,237,0.3)",
                    color: "#7c3aed",
                    background: "rgba(124,58,237,0.08)",
                  }}
                >
                  WORKING PAPER
                </span>
                <span style={{ fontSize: 9, color: "var(--neutral-on-background-weak)", fontWeight: 500 }}>
                  Hermes Research · 2026
                </span>
              </div>

              <h4 style={{ fontSize: 13, fontWeight: 700, margin: "0 0 3px", lineHeight: 1.35 }}>
                Autonomy in the Clinic: The Research Frontier of Agentic AI
              </h4>
              <p style={{ fontSize: 10.5, color: "var(--neutral-on-background-weak)", margin: "0 0 8px", fontWeight: 500 }}>
                A. Shrestha
              </p>
              <p style={{ fontSize: 11, color: "var(--neutral-on-background-medium, #4b5563)", margin: "0 0 10px", lineHeight: 1.5 }}>
                Explores agentic evaluation frameworks in clinical settings: multi-subagent orchestration, deterministic AST verification gates, and human-in-the-loop oversight for autonomous diagnostic assistance. Proposes a three-layer pipeline architecture linking local inference (Ollama) to structured reasoning (Gemini 1.5 Pro) under deterministic guardrails. Evaluated on MIMIC-IV differential diagnosis subset (n=1,247) with 87.1% diagnostic accuracy vs 72.3% baseline, 2.1% hallucination rate vs 18.4%, and 8% clinician override rate vs 34%.
              </p>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <a
                  href="/blog/autonomy-in-the-clinic-the-research-frontier-of-agentic-ai"
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
                  Read Full Paper ↗
                </a>
              </div>
            </article>
          </div>
        </div>
      </Column>

      {/* All Publications */}
      <Line maxWidth={60} />

      <Column fillWidth horizontal="center" gap="l" marginTop="xl">
        <Publications />
      </Column>

      {/* Writing */}
      {researchConfig.writing && researchConfig.writing.length > 0 && (
        <Column fillWidth gap="l" marginTop="l">
          <Heading variant="heading-strong-xl" align="center" marginBottom="s">
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
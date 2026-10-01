"use client";

import { Column, Heading, Line, Row, Text } from "@once-ui-system/core";
import { about, baseURL, person, research as researchConfig } from "@/resources";
import Publications from "@/components/work/Publications";

export default function Research() {
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
          Research Outputs
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

      {/* Interests */}
      {researchConfig.interests && researchConfig.interests.length > 0 && (
        <Column fillWidth horizontal="center" gap="s" marginBottom="xl">
          <Heading variant="heading-strong-m" align="center">Interests</Heading>
          <Row horizontal="center" gap="s" wrap>
            {researchConfig.interests.map((interest, i) => (
              <span
                key={i}
                style={{
                  fontSize: "0.9rem",
                  color: "var(--brand-on-background-strong)",
                  background: "var(--brand-background-weak)",
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  border: "1px solid var(--brand-border-weak)",
                }}
              >
                {interest}
              </span>
            ))}
          </Row>
        </Column>
      )}

      <Line maxWidth={60} />

      {/* Publications */}
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
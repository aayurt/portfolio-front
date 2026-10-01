import { Metadata } from "next";
import { Column, Heading, Line, Meta, Row, Text } from "@once-ui-system/core";
import { about, baseURL, person, research } from "@/resources";
import Publications from "@/components/work/Publications";

export async function generateMetadata(): Promise<Metadata> {
  return Meta.generate({
    title: "Publications – Aayurt Shrestha",
    description: "Formal working papers, preprints, and engineering dispatches on agentic software engineering, clinical AI autonomy, distributed systems, and civic governance.",
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent("Publications – Aayurt Shrestha")}`,
    path: "/publications",
  });
}

export default function PublicationsPage() {
  return (
    <Column fillWidth maxWidth="l" horizontal="center" paddingY="48" gap="xl">
      <Column fillWidth horizontal="center" gap="s" marginBottom="xl">
        <Text
          variant="label-default-s"
          onBackground="neutral-weak"
          style={{ letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-mono, monospace)" }}
          align="center"
        >
          Research Outputs
        </Text>
        <Heading variant="display-strong-m" align="center">Publications</Heading>
        <Text variant="body-default-l" onBackground="neutral-weak" align="center" style={{ maxWidth: "680px" }} wrap="balance">
          {research.description}
        </Text>
      </Column>

      <Line maxWidth={60} />

      <Column fillWidth horizontal="center" gap="l" marginTop="xl">
        <Publications />
      </Column>
    </Column>
  );
}
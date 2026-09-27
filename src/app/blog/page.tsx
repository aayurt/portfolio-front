import React from "react";
import { JournalDispatches } from "@/components/blog/JournalDispatches";
import { baseURL, person } from "@/resources";
import { getImageUrl, getPosts, getTenantBySlug } from "@/utils/payload";
import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";

export async function generateMetadata() {
  const tenant = await getTenantBySlug();
  const name = tenant?.name || person.name;
  return Meta.generate({
    title: `${name} | Engineering Journal & Publications`,
    description:
      "Doctoral research inquiries into agentic clinical autonomy, formal verification, distributed consensus architectures, and quantitative timeseries pipelines.",
    baseURL: "https://aayurtshrestha.com.np",
    image: `/api/og/generate?title=${encodeURIComponent("Engineering Journal & Publications")}`,
    path: "/blog",
  });
}

export default async function Blog() {
  const tenant = await getTenantBySlug();
  const posts = await getPosts();

  return (
    <Column
      fillWidth
      maxWidth="l"
      paddingY="24"
      paddingX="16"
      horizontal="center"
      gap="32"
    >
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={`${tenant?.name || person.name}'s Engineering Journal`}
        description="Doctoral research inquiries into agentic clinical autonomy, formal verification, and distributed systems."
        path={"/blog"}
        image={`/api/og/generate?title=${encodeURIComponent("Engineering Journal & Publications")}`}
        author={{
          name: tenant?.name || person.name,
          url: `${baseURL}/blog`,
          image: getImageUrl(tenant?.avatar) || `${baseURL}${person.avatar}`,
        }}
      />

      {/* HEADER SECTION */}
      <Column fillWidth gap="8" horizontal="center" style={{ textAlign: "center" }}>
        <Text
          variant="code-default-s"
          onBackground="neutral-weak"
          style={{
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: "var(--font-mono, monospace)",
          }}
        >
          RESEARCH DISPATCHES & SYSTEMS INQUIRY
        </Text>
        <Heading variant="display-strong-s" align="center">
          Engineering Journal & Publications
        </Heading>
        <Text
          variant="body-default-m"
          onBackground="neutral-weak"
          align="center"
          wrap="balance"
          style={{ maxWidth: "660px" }}
        >
          Doctoral inquiry into agentic clinical autonomy, formal verification, distributed
          consensus architectures, and quantitative timeseries pipelines.
        </Text>
      </Column>

      {/* HIGH-FIDELITY JOURNAL DISPATCHES (VARIANT 13) */}
      <JournalDispatches posts={posts} tenant={tenant} />
    </Column>
  );
}

import React from "react";
import { about, baseURL, person } from "@/resources";
import { getImageUrl, getProjects, getSolutions, getTenantBySlug } from "@/utils/payload";
import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import { SystemsCatalog } from "@/components/work/SystemsCatalog";
import { SolutionsRails } from "@/components/solutions/SolutionsRails";

export async function generateMetadata() {
  const tenant = await getTenantBySlug();
  const name = tenant?.name || person.name;
  return Meta.generate({
    title: `Systems & Products Catalog – ${name}`,
    description: `Production distributed platforms, autonomous AI engines, quantitative analytics tools, and offline-first applications by ${name}.`,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(`Systems Catalog – ${name}`)}`,
    path: "/work",
  });
}

export default async function Work() {
  const [tenant, projects, solutions] = await Promise.all([
    getTenantBySlug(),
    getProjects(),
    getSolutions(),
  ]);

  const name = tenant?.name || person.name;

  return (
    <Column fillWidth maxWidth="l" paddingY="24" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={"/work"}
        title={`${name}'s Systems Catalog`}
        description={`Production distributed platforms, autonomous AI engines, and offline-first architectures by ${name}`}
        image={`/api/og/generate?title=${encodeURIComponent(`${name}'s Systems Catalog`)}`}
        author={{
          name: name,
          url: `${baseURL}${about.path}`,
          image: getImageUrl(tenant?.avatar) || `${baseURL}${person.avatar}`,
        }}
      />

      {/* Header */}
      <Column fillWidth horizontal="center" gap="s" marginBottom="l">
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
          Engineering Systems &amp; Products
        </Text>
        <Heading variant="display-strong-m" align="center">
          Systems Catalog
        </Heading>
        <Text
          variant="body-default-l"
          onBackground="neutral-weak"
          align="center"
          style={{ maxWidth: "680px" }}
          wrap="balance"
        >
          Production distributed platforms, autonomous AI engines, quantitative analytics tools, and offline-first mobile applications.
        </Text>
      </Column>

      {/* Filterable 2-Column Systems Catalog (Variant 10) */}
      <SystemsCatalog projects={projects} />

      {/* Engineering Solutions & Patterns Rails */}
      {solutions && solutions.length > 0 && (
        <Column fillWidth gap="l" marginTop="48">
          <Column fillWidth gap="s">
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
              Architectural Blueprints
            </Text>
            <Heading variant="heading-strong-xl" align="center">
              Engineering Solutions &amp; Patterns
            </Heading>
            <Text
              variant="body-default-m"
              onBackground="neutral-weak"
              align="center"
              wrap="balance"
            >
              Concrete problem-to-architecture patterns with production benchmark metrics and reference implementations.
            </Text>
          </Column>
          <SolutionsRails solutions={solutions} />
        </Column>
      )}
    </Column>
  );
}

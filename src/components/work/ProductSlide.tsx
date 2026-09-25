"use client";

import React, { useState } from "react";
import {
  Column,
  Grid,
  Heading,
  List,
  ListItem,
  Media,
  Row,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";

export type ProductCardData = {
  title: string;
  image?: string | null;
  pipeline?: React.ReactNode;
  subtitle?: string | null;
  shortDescription?: string | null;
  description?: string | null;
  metrics?: { value: string; label: string; id?: string | null }[] | null;
  features?: { title: string; description?: string | null; id?: string | null }[] | null;
  benefits?: { benefit?: string | null; id?: string | null }[] | null;
  techStack?: { tech?: string | null; id?: string | null }[] | null;
  links?: { liveUrl?: string | null; repoUrl?: string | null };
  href?: string;
};

export const ProductSlide: React.FC<{ data: ProductCardData }> = ({ data }) => {
  const metricsCount = data.metrics?.length || 0;
  const featuresCount = data.features?.length || 0;
  const [viewMode, setViewMode] = useState<"pipeline" | "image">(
    data.pipeline ? "pipeline" : "image"
  );

  return (
    <Column
      fillWidth
      padding="xl"
      gap="l"
      style={{
        borderRadius: "16px",
        border: "1px solid var(--neutral-border-weak, rgba(128, 128, 128, 0.25))",
        background: "var(--neutral-background-weak, rgba(128, 128, 128, 0.04))",
      }}
    >
      {/* Top Visual Showcase: Pipeline or Image with view mode toggle */}
      {(data.pipeline || data.image) && (
        <Column fillWidth gap="8">
          {data.pipeline && data.image && (
            <Row horizontal="end" gap="4">
              <button
                onClick={() => setViewMode("pipeline")}
                style={{
                  padding: "4px 10px",
                  fontSize: "11px",
                  fontWeight: 600,
                  borderRadius: "6px",
                  border: "none",
                  background:
                    viewMode === "pipeline"
                      ? "var(--neutral-background-medium, rgba(128, 128, 128, 0.2))"
                      : "transparent",
                  color:
                    viewMode === "pipeline"
                      ? "var(--neutral-on-background-strong, inherit)"
                      : "var(--neutral-on-background-weak, #888)",
                  cursor: "pointer",
                }}
              >
                ⚡ Architecture Pipeline
              </button>
              <button
                onClick={() => setViewMode("image")}
                style={{
                  padding: "4px 10px",
                  fontSize: "11px",
                  fontWeight: 600,
                  borderRadius: "6px",
                  border: "none",
                  background:
                    viewMode === "image"
                      ? "var(--neutral-background-medium, rgba(128, 128, 128, 0.2))"
                      : "transparent",
                  color:
                    viewMode === "image"
                      ? "var(--neutral-on-background-strong, inherit)"
                      : "var(--neutral-on-background-weak, #888)",
                  cursor: "pointer",
                }}
              >
                🖼️ Screenshot
              </button>
            </Row>
          )}

          {data.pipeline && viewMode === "pipeline" ? (
            <div style={{ width: "100%", overflow: "hidden" }}>
              {data.pipeline}
            </div>
          ) : data.image ? (
            <Media
              priority
              sizes="(max-width: 768px) 100vw, 640px"
              border="neutral-alpha-weak"
              radius="l"
              src={data.image}
              alt={`${data.title} preview`}
              aspectRatio="16 / 9"
            />
          ) : null}
        </Column>
      )}

      <Row gap="16" wrap vertical="center">
        <Heading as="h3" variant="heading-strong-l" wrap="balance">
          {data.title}
        </Heading>
        {data.subtitle && (
          <Tag variant="primary" radius="m">
            <Text variant="label-strong-s" onBackground="neutral-weak">
              {data.subtitle}
            </Text>
          </Tag>
        )}
      </Row>

      {data.shortDescription && (
        <Text variant="body-default-m" onBackground="neutral-weak" wrap="balance">
          {data.shortDescription}
        </Text>
      )}

      {metricsCount > 0 && (
        <Row gap="16" wrap horizontal="center" fillWidth>
          {data.metrics!.slice(0, 3).map((metric) => (
            <Column
              key={metric.id || metric.label}
              horizontal="center"
              gap="2"
              minWidth={0}
              style={{ flex: "1 1 160px", minWidth: 0 }}
            >
              <Heading
                variant="heading-strong-l"
                align="center"
                wrap="balance"
                style={{ overflowWrap: "anywhere" }}
              >
                {metric.value}
              </Heading>
              <Text
                variant="label-default-xs"
                onBackground="neutral-weak"
                align="center"
                wrap="balance"
                style={{ overflowWrap: "anywhere" }}
              >
                {metric.label}
              </Text>
            </Column>
          ))}
        </Row>
      )}

      {data.description && (
        <Text variant="body-default-s" onBackground="neutral-medium">
          {data.description}
        </Text>
      )}

      {featuresCount > 0 && (
        <Grid columns="2" s={{ columns: 1 }} gap="12" fillWidth>
          {data.features!.map((feature) => (
            <Column key={feature.id || feature.title} gap="2">
              <Heading as="h4" variant="heading-strong-s">
                {feature.title}
              </Heading>
              {feature.description && (
                <Text variant="body-default-xs" onBackground="neutral-weak">
                  {feature.description}
                </Text>
              )}
            </Column>
          ))}
        </Grid>
      )}

      {data.benefits && data.benefits.length > 0 && (
        <List as="ul">
          {data.benefits.map((b) => (
            <ListItem key={b.id || b.benefit} marginTop="2" marginBottom="4">
              <Text variant="body-default-s">{b.benefit}</Text>
            </ListItem>
          ))}
        </List>
      )}

      {data.techStack && data.techStack.length > 0 && (
        <Row gap="8" wrap>
          {data.techStack.map((t) => (
            <Tag key={t.id || t.tech} variant="tertiary">
              <Text variant="label-strong-xs" onBackground="neutral-weak">
                {t.tech}
              </Text>
            </Tag>
          ))}
        </Row>
      )}

      {(data.links?.liveUrl || data.links?.repoUrl || data.href) && (
        <Row gap="16" wrap>
          {data.links?.liveUrl && (
            <SmartLink
              suffixIcon="arrowUpRightFromSquare"
              style={{ width: "fit-content", margin: "0" }}
              href={data.links.liveUrl}
              target="_blank"
            >
              <Text variant="label-strong-m">Live demo</Text>
            </SmartLink>
          )}
          {data.links?.repoUrl && (
            <SmartLink
              suffixIcon="arrowUpRightFromSquare"
              style={{ width: "fit-content", margin: "0" }}
              href={data.links.repoUrl}
              target="_blank"
            >
              <Text variant="label-strong-m">Source</Text>
            </SmartLink>
          )}
          {data.href && (
            <SmartLink
              suffixIcon="arrowRight"
              style={{ width: "fit-content", margin: "0" }}
              href={data.href}
            >
              <Text variant="label-strong-m">Case study</Text>
            </SmartLink>
          )}
        </Row>
      )}
    </Column>
  );
};

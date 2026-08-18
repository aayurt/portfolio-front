import React from "react";
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

  return (
    <Column
      fillWidth
      padding="xl"
      gap="l"
      style={{
        borderRadius: "16px",
        border: "1px solid rgba(128, 128, 128, 0.25)",
        background: "rgba(128, 128, 128, 0.05)",
      }}
    >
      {data.image && (
        <Media
          priority
          sizes="(max-width: 768px) 100vw, 640px"
          border="neutral-alpha-weak"
          radius="l"
          src={data.image}
          alt={`${data.title} preview`}
          aspectRatio="16 / 9"
        />
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
              key={metric.id}
              horizontal="center"
              gap="2"
              minWidth={0}
              style={{ flex: "1 1 130px", minWidth: 0 }}
            >
              <Heading
                variant="display-strong-s"
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
            <Column key={feature.id} gap="2">
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
            <ListItem key={b.id} marginTop="2" marginBottom="4">
              <Text variant="body-default-s">{b.benefit}</Text>
            </ListItem>
          ))}
        </List>
      )}

      {data.techStack && data.techStack.length > 0 && (
        <Row gap="8" wrap>
          {data.techStack.map((t) => (
            <Tag key={t.id} variant="tertiary">
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

"use client";

import { Card, Column, Media, Row, Avatar, Text, Tag } from "@once-ui-system/core";
import { formatDate } from "@/utils/formatDate";
import { person } from "@/resources";
import { Post as PostType } from "../../../payload-types";
import { getImageUrl } from "@/utils/payload";

interface PostProps {
  post: PostType;
  thumbnail: boolean;
  direction?: "row" | "column";
}

export default function Post({ post, thumbnail, direction }: PostProps) {
  return (
    <Card
      fillWidth
      key={post.slug}
      href={`/blog/${post.slug}`}
      transition="micro-medium"
      direction={direction}
      border="transparent"
      background="transparent"
      padding="4"
      radius="l-4"
      gap={direction === "column" ? undefined : "24"}
      s={{ direction: "column" }}
    >
      {post.heroImage && thumbnail && (
        <Media
          priority
          sizes="(max-width: 768px) 100vw, 640px"
          border="neutral-alpha-weak"
          cursor="interactive"
          radius="l"
          src={getImageUrl(post.heroImage)}
          alt={"Thumbnail of " + post.title}
          aspectRatio="16 / 9"
        />
      )}
      <Row fillWidth>
        <Column maxWidth={28} paddingY="24" paddingX="l" gap="20" vertical="center">
          <Row gap="24" vertical="center">
            <Row vertical="center" gap="16">
              <Avatar src={person.avatar} size="s" />
              <Text variant="label-default-s">{person.name}</Text>
            </Row>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {formatDate(post.publishedAt || "", false)}
            </Text>
          </Row>
          <Text variant="heading-strong-l" wrap="balance">
            {post.title}
          </Text>
          {post.tags && post.tags.length > 0 && (
            post.tags.map((tag) => (
              <Tag key={tag.id} variant="tertiary">
                <Text variant="label-strong-s" onBackground="neutral-weak">
                  {tag.tag}
                </Text>
              </Tag>
            ))
          )}
        </Column>
      </Row>
    </Card>
  );
}

import { RichText, ScrollToHash } from "@/components";
import { ShareSection } from "@/components/blog/ShareSection";
import { about, baseURL, blog, person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { getImageUrl, getPostBySlug, getPosts, getTenantBySlug } from "@/utils/payload";
import Link from "next/link";
import {
  Avatar,
  Column,
  Flex,
  Grid,
  Heading,
  HeadingNav,
  Line,
  Media,
  Meta,
  Row,
  Schema,
  SmartLink,
  Text
} from "@once-ui-system/core";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug || "",
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const post = await getPostBySlug(slugPath);

  if (!post) return {};

  const imageUrl = post.heroImage ? getImageUrl(post.heroImage) : null;

  return Meta.generate({
    title: post.meta?.title || post.title,
    description: post.meta?.description || "",
    baseURL: baseURL,
    image: imageUrl || `/api/og/generate?title=${post.title}`,
    path: `${blog.path}/${post.slug}`,
  });
}

export default async function Blog({ params }: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const [post, tenant, recentPosts] = await Promise.all([
    getPostBySlug(slugPath),
    getTenantBySlug(),
    getPosts(),
  ]);
  if (!post) {
    notFound();
  }

  const imageUrl = post.heroImage ? getImageUrl(post.heroImage) : null;
  const otherPosts = recentPosts
    .filter((p) => p.slug !== post.slug && p.slug !== "plesk-on-vps-setup")
    .slice(0, 2);

  return (
    <Row fillWidth>
      <Row maxWidth={12} m={{ hide: true }} />
      <Flex fillWidth horizontal="center" vertical="start" gap="xl" paddingX="l">
        <Column as="section" maxWidth="s" flex={1} horizontal="center" gap="l" paddingTop="24">
          <Schema
            as="blogPosting"
            baseURL={baseURL}
            path={`${blog.path}/${post.slug}`}
            title={post.title}
            description={post.meta?.description || ""}
            datePublished={post.publishedAt || ""}
            dateModified={post.updatedAt}
            image={
              imageUrl ||
              `/api/og/generate?title=${encodeURIComponent(post.title)}`
            }
            author={{
              name: tenant?.name || person.name,
              url: `${baseURL}${about.path}`,
              image: getImageUrl(tenant?.avatar) || `${baseURL}${person.avatar}`,
            }}
          />
          <Column maxWidth="s" gap="16" horizontal="center" align="center">
            <SmartLink href="/blog">
              <Text variant="label-strong-m">Blog</Text>
            </SmartLink>
            <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
              {post.publishedAt && formatDate(post.publishedAt)}
            </Text>
            <Heading variant="display-strong-m">{post.title}</Heading>
          </Column>
          <Row marginBottom="32" horizontal="center">
            <Row gap="16" vertical="center">
              <Avatar size="s" src={getImageUrl(tenant?.avatar) || person.avatar} />
              <Text variant="label-default-m" onBackground="brand-weak">
                {tenant?.name || person.name}
              </Text>
            </Row>
          </Row>
          {imageUrl && (
            <Media
              src={imageUrl}
              alt={post.title}
              aspectRatio="16/9"
              priority
              sizes="(min-width: 768px) 100vw, 768px"
              border="neutral-alpha-weak"
              radius="l"
              marginTop="12"
              marginBottom="8"
            />
          )}
          <Column as="article" maxWidth="s">
            <RichText content={post.content} />
          </Column>

          <ShareSection
            title={post.title}
            url={`${baseURL}${blog.path}/${post.slug}`}
          />

          {otherPosts.length > 0 && (
            <Column fillWidth gap="24" horizontal="center" marginTop="48">
              <Line maxWidth="40" />
              <Heading as="h2" id="recent-posts" variant="heading-strong-xl" marginBottom="8">
                Recent Dispatches
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak" marginBottom="16" align="center">
                Continued inquiry in distributed systems, offline architecture, and agentic AI.
              </Text>
              <Grid columns="2" s={{ columns: 1 }} fillWidth gap="16">
                {otherPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    style={{ textDecoration: "none", color: "inherit", display: "flex", width: "100%" }}
                  >
                    <Column
                      fillWidth
                      padding="24"
                      gap="12"
                      style={{
                        background: "var(--neutral-background-weak)",
                        border: "1px solid var(--neutral-border-weak)",
                        borderRadius: "var(--radius-l)",
                        transition: "transform 0.2s ease, border-color 0.2s ease",
                      }}
                    >
                      <Row horizontal="between" vertical="center" fillWidth>
                        <Text
                          variant="label-default-xs"
                          onBackground="brand-strong"
                          style={{ fontFamily: "var(--font-mono, monospace)", textTransform: "uppercase" }}
                        >
                          {relatedPost.slug?.includes("clinic") || relatedPost.slug?.includes("nepse")
                            ? "Doctoral AI & FinTech"
                            : relatedPost.slug?.includes("language") || relatedPost.slug?.includes("capacitor")
                            ? "Systems Architecture"
                            : "Infrastructure"}
                        </Text>
                        <Text variant="label-default-xs" onBackground="neutral-weak">
                          {relatedPost.publishedAt ? formatDate(relatedPost.publishedAt) : ""}
                        </Text>
                      </Row>
                      <Heading as="h3" variant="heading-strong-m">
                        {relatedPost.title}
                      </Heading>
                      {relatedPost.meta?.description && (
                        <Text
                          variant="body-default-s"
                          onBackground="neutral-weak"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {relatedPost.meta.description}
                        </Text>
                      )}
                      <Row vertical="center" gap="8" style={{ marginTop: "auto", paddingTop: "12px" }}>
                        <Text variant="label-strong-s" onBackground="neutral-strong">
                          Read Dispatch →
                        </Text>
                      </Row>
                    </Column>
                  </Link>
                ))}
              </Grid>
            </Column>
          )}
          <ScrollToHash />
        </Column>
        <Column
          maxWidth={12}
          fitHeight
          position="sticky"
          top="80"
          gap="16"
          m={{ hide: true }}
        >
          <HeadingNav fitHeight />
        </Column>
      </Flex>
    </Row>
  );
}

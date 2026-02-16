import { RichText, ScrollToHash } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { ShareSection } from "@/components/blog/ShareSection";
import { about, baseURL, blog, person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { getImageUrl, getPostBySlug, getPosts, getTenantBySlug } from "@/utils/payload";
import {
  Avatar,
  Column,
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

  const post = await getPostBySlug(slugPath);
  const tenant = await getTenantBySlug()
  if (!post) {
    notFound();
  }

  const imageUrl = post.heroImage ? getImageUrl(post.heroImage) : null;

  return (
    <Row fillWidth>
      <Row maxWidth={12} m={{ hide: true }} />
      <Row fillWidth horizontal="center">
        <Column as="section" maxWidth="m" horizontal="center" gap="l" paddingTop="24">
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

          <Column fillWidth gap="40" horizontal="center" marginTop="40">
            <Line maxWidth="40" />
            <Text as="h2" id="recent-posts" variant="heading-strong-xl" marginBottom="24">
              Recent posts
            </Text>
            <Posts range={[1, 2]} columns="2" thumbnail direction="column" />
          </Column>
          <ScrollToHash />
        </Column>
      </Row>
      <Column
        maxWidth={12}
        paddingLeft="40"
        fitHeight
        position="sticky"
        top="80"
        gap="16"
        m={{ hide: true }}
      >
        <HeadingNav fitHeight />
      </Column>
    </Row>
  );
}

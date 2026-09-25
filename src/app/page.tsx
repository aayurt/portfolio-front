import { FeaturedShowcase, Mailchimp } from "@/components";
import { PostCarousel } from "@/components/blog/PostCarousel";
import PatienceImage from "@/components/patienceImage";
import { ProductCarousel } from "@/components/work/ProductCarousel";
import type { ProductCardData } from "@/components/work/ProductSlide";
import { baseURL, home, person, research, routes } from "@/resources";
import { getImageUrl, getPosts, getProjects, getSolutions, getTenantBySlug } from "@/utils/payload";
import {
  Avatar,
  Button,
  Column,
  Heading,
  Meta,
  RevealFx,
  Row,
  Schema,
  SmartLink,
  Tag,
  Text
} from "@once-ui-system/core";

export async function generateMetadata() {
  const data = await getTenantBySlug()

  return Meta.generate({
    title: data?.name || home.title,
    description: data?.intro?.introDescription || home.description,
    baseURL: baseURL,
    path: "/",
    image: getImageUrl(data?.avatar) || home.image,
  });
}

export default async function Home() {
  const [data, projects, solutions, posts] = await Promise.all([
    getTenantBySlug(),
    getProjects(),
    getSolutions(),
    getPosts().then((p) =>
      p.sort((a, b) => new Date(b.publishedAt || "").getTime() - new Date(a.publishedAt || "").getTime()),
    ),
  ]);

  const cvUrl = data?.cv ? getImageUrl(data.cv) : person.resume;

  const solutionCards: ProductCardData[] = solutions.map((solution) => ({
    title: solution.title,
    subtitle: solution.subtitle || undefined,
    shortDescription: solution.shortDescription || undefined,
    description: solution.description || undefined,
    metrics: solution.metrics || undefined,
    features: solution.features || undefined,
    benefits: solution.benefits || undefined,
    techStack: solution.techStack || undefined,
    links: solution.links || undefined,
  }));

  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={"/"}
        title={data?.name || home.title}
        description={data?.intro?.introDescription || home.description}
        image={`/api/og/generate?title=${encodeURIComponent(data?.name || home.title)}`}
        author={{
          name: data?.name || "User",
          url: `${baseURL}/about`,
          image: getImageUrl(data?.avatar) || `${process.env.NEXT_PUBLIC_BASE_URL}${data?.avatar}`,
        }}
      />
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          <PatienceImage width="12rem" height="12rem" />
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {data?.intro?.intro}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {data?.intro?.introDescription}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" paddingLeft="12">
            <Row gap="12" wrap horizontal="center">
              <Button
                id="about"
                data-border="rounded"
                href={"/about"}
                variant="secondary"
                size="m"
                weight="default"
                arrowIcon
              >
                <Row gap="8" vertical="center" paddingRight="4">
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={getImageUrl(data?.avatar)}
                    size="m"
                  />
                  About Me - {data?.name}
                </Row>
              </Button>
              {cvUrl && (
                <Button
                  href={cvUrl}
                  variant="secondary"
                  size="m"
                  weight="default"
                  prefixIcon="document"
                  target="_blank"
                >
                  <Row gap="8" vertical="center" paddingRight="4">
                    Download CV
                  </Row>
                </Button>
              )}
            </Row>
          </RevealFx>
        </Column>
      </Column>

      {/* Featured Products with Visual Pipeline Showcase */}
      <RevealFx translateY="16" delay={0.6} fillWidth>
        <FeaturedShowcase />
      </RevealFx>

      {/* Solutions Section */}
      <Column fillWidth gap="xl">
        <Column fillWidth gap="s">
          <Heading variant="heading-strong-xl" align="center">
            Solutions
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-weak" align="center" wrap="balance">
            How I apply those products — capabilities and services.
          </Text>
        </Column>
        {solutionCards.length > 0 ? (
          <ProductCarousel items={solutionCards} ariaLabel="Solutions carousel" />
        ) : (
          <Text variant="body-default-m" onBackground="neutral-weak" align="center">
            Solutions coming soon.
          </Text>
        )}
      </Column>

      {/* Research & Publications Section (for PhD & Academic Jobs) */}
      {research.display && (
        <Column fillWidth gap="xl">
          <Column fillWidth gap="s">
            <Heading variant="heading-strong-xl" align="center">
              {research.title}
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-weak" align="center" wrap="balance">
              {research.description}
            </Text>
          </Column>
          <Column fillWidth gap="l" horizontal="center">
            {research.interests.length > 0 && (
              <Row gap="8" wrap horizontal="center">
                {research.interests.map((interest) => (
                  <Tag key={interest} variant="secondary" size="l">
                    <Text variant="label-strong-s" onBackground="neutral-weak">
                      {interest}
                    </Text>
                  </Tag>
                ))}
              </Row>
            )}
            {research.publications.length > 0 && (
              <Column fillWidth maxWidth="m" gap="m">
                {research.publications.map((pub) => (
                  <Column key={`${pub.title}-${pub.year}`} gap="2" horizontal="center">
                    <Heading as="h3" variant="heading-strong-m" align="center">
                      {pub.title}
                    </Heading>
                    <Text variant="body-default-xs" onBackground="neutral-weak" align="center">
                      {pub.venue} · {pub.year}
                    </Text>
                    {pub.link && (
                      <SmartLink href={pub.link} target="_blank" suffixIcon="arrowUpRightFromSquare" style={{ width: "fit-content", margin: "0" }}>
                        <Text variant="label-strong-m">Read paper</Text>
                      </SmartLink>
                    )}
                  </Column>
                ))}
              </Column>
            )}
            {research.writing.length > 0 && (
              <Column fillWidth gap="8">
                {research.writing.map((writing) => (
                  <Row key={writing.link} horizontal="center">
                    <SmartLink
                      href={writing.link}
                      suffixIcon="arrowRight"
                      style={{ width: "fit-content", margin: "0" }}
                    >
                      <Text variant="label-strong-m">{writing.title}</Text>
                    </SmartLink>
                  </Row>
                ))}
              </Column>
            )}
          </Column>
        </Column>
      )}

      {/* Blog Section */}
      {routes["/blog"] && posts.length > 0 && (
        <Column fillWidth gap="xl">
          <Column fillWidth gap="s">
            <Heading variant="heading-strong-xl" align="center">
              Latest from the blog
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-weak" align="center" wrap="balance">
              Writing on software engineering, AI, and what I am building.
            </Text>
          </Column>
          <PostCarousel posts={posts} tenant={data} />
        </Column>
      )}
      <Mailchimp />
    </Column>
  );
}

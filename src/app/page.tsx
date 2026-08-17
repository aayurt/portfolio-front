import { Mailchimp } from "@/components";
import { PostCarousel } from "@/components/blog/PostCarousel";
import PatienceImage from "@/components/patienceImage";
import { ProductCarousel } from "@/components/work/ProductCarousel";
import type { ProductCardData } from "@/components/work/ProductSlide";
import { baseURL, home, routes } from "@/resources";
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

  const projectCards: ProductCardData[] = projects.map((project) => ({
    title: project.title,
    image: project.images?.[0] ? getImageUrl(project.images[0]) : undefined,
    subtitle: project.role || project.client || undefined,
    shortDescription: project.description || undefined,
    metrics: project.metrics || undefined,
    features: project.features || undefined,
    benefits: project.benefits || undefined,
    techStack: project.techStack || undefined,
    links: project.links || undefined,
    href: project.slug ? `/work/${project.slug}` : undefined,
  }));

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
          {/* {data?.intro && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{data.intro.intro || ""}</Row>
              </Badge>
            </RevealFx>
          )} */}
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
          </RevealFx>
        </Column>
      </Column>

      <Column fillWidth gap="xl">
        <Column fillWidth gap="s">
          <Heading variant="heading-strong-xl" align="center">
            Products
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-weak" align="center" wrap="balance">
            Things I have designed, built, and shipped — from mobile apps to multi-tenant platforms.
          </Text>
        </Column>
        {projectCards.length > 0 ? (
          <ProductCarousel items={projectCards} ariaLabel="Products carousel" />
        ) : (
          <Text variant="body-default-m" onBackground="neutral-weak" align="center">
            No products yet.
          </Text>
        )}
      </Column>

      <Column fillWidth gap="xl">
        <Column fillWidth gap="s">
          <Heading variant="heading-strong-xl" align="center">
            Solutions
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-weak" align="center" wrap="balance">
            How I apply those products — capabilities and services. More coming soon.
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

import { AfnoPipeline } from "@/components/pipeline/AfnoPipeline";
import { AstroPipeline } from "@/components/pipeline/AstroPipeline";
import { HermesPipeline } from "@/components/pipeline/HermesPipeline";
import { SyasyahPipeline } from "@/components/pipeline/SyasyahPipeline";
import { ProductCarousel } from "@/components/work/ProductCarousel";
import type { ProductCardData } from "@/components/work/ProductSlide";
import { about, baseURL, person } from "@/resources";
import { getImageUrl, getProjects, getSolutions, getTenantBySlug } from "@/utils/payload";
import { Column, Heading, Meta, Row, Schema, Text } from "@once-ui-system/core";

export async function generateMetadata() {
  const tenant = await getTenantBySlug();
  return Meta.generate({
    title: `Products & Solutions – ${tenant?.name}`,
    description: `Products and solutions by ${tenant?.name}`,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(`Products & Solutions – ${tenant?.name}`)}`,
    path: "/work",
  });
}

export default async function Work() {
  const [tenant, projects, solutions] = await Promise.all([
    getTenantBySlug(),
    getProjects(),
    getSolutions(),
  ]);

  const projectCards: ProductCardData[] = projects.map((project) => ({
    title: project.title,
    image: project.images?.[0] ? getImageUrl(project.images[0]) : undefined,
    pipeline:
      project.slug === "hermes" ? (
        <HermesPipeline />
      ) : project.slug === "afno-events" || project.slug === "afno" ? (
        <AfnoPipeline />
      ) : project.slug === "syasyah-samaj" ? (
        <SyasyahPipeline />
      ) : project.slug === "astro-guru" ? (
        <AstroPipeline />
      ) : undefined,
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
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={"/work"}
        title={`${tenant?.name}'s Products & Solutions`}
        description={`Products and solutions by ${tenant?.name}`}
        image={`/api/og/generate?title=${encodeURIComponent(`${tenant?.name}'s Work`)}`}
        author={{
          name: tenant?.name || person.name,
          url: `${baseURL}${about.path}`,
          image: getImageUrl(tenant?.avatar) || `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="s" variant="heading-strong-xl" align="center">
        Products
      </Heading>
      <Text variant="body-default-m" onBackground="neutral-weak" align="center" marginBottom="xl" wrap="balance">
        Things I have designed, built, and shipped — from mobile apps to multi-tenant platforms.
      </Text>

      {projectCards.length > 0 ? (
        <ProductCarousel items={projectCards} ariaLabel="Products carousel" />
      ) : (
        <Text variant="body-default-m" onBackground="neutral-weak" align="center">
          No products yet.
        </Text>
      )}

      <Row marginY="xl">
        <Column fillWidth>
          <Heading marginBottom="s" variant="heading-strong-xl" align="center">
            Solutions
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-weak" align="center" marginBottom="xl" wrap="balance">
            How I apply those products — capabilities and services. More coming soon.
          </Text>
        </Column>
      </Row>

      {solutionCards.length > 0 ? (
        <ProductCarousel items={solutionCards} ariaLabel="Solutions carousel" />
      ) : (
        <Text variant="body-default-m" onBackground="neutral-weak" align="center" marginBottom="xl">
          Solutions coming soon.
        </Text>
      )}
    </Column>
  );
}

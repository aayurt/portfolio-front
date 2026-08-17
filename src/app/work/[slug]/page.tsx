import { RichText, ScrollToHash } from "@/components";
import { Projects } from "@/components/work/Projects";
import { about, baseURL, person, work } from "@/resources";
import { getImageUrl, getProjectBySlug, getProjects, getTenantBySlug } from "@/utils/payload";
import {
  Column,
  Grid,
  Heading,
  Line,
  List,
  ListItem,
  Media,
  Meta,
  Row,
  Schema,
  SmartLink,
  Tag,
  Text
} from "@once-ui-system/core";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug || "",
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

  const project = await getProjectBySlug(slugPath);

  if (!project) return {};

  const imageUrl = project.images?.[0] ? getImageUrl(project.images[0]) : null;

  return Meta.generate({
    title: project.title,
    description: project.description || "",
    baseURL: baseURL,
    image: imageUrl || `/api/og/generate?title=${project.title}`,
    path: `${work.path}/${project.slug}`,
  });
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const [project, tenant, allProjects] = await Promise.all([
    getProjectBySlug(slugPath),
    getTenantBySlug(),
    getProjects(),
  ]);

  if (!project) {
    notFound();
  }

  const imageUrl = project.images?.[0] ? getImageUrl(project.images[0]) : null;

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${project.slug}`}
        title={project.title}
        description={project.description || ""}
        datePublished={project.createdAt}
        dateModified={project.updatedAt}
        image={
          imageUrl || `/api/og/generate?title=${encodeURIComponent(project.title)}`
        }
        author={{
          name: tenant?.name || person.name,
          url: `${baseURL}${about.path}`,
          image: getImageUrl(tenant?.avatar) || `${baseURL}${person.avatar}`,
        }}
      />
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href="/work">
          <Text variant="label-strong-m">Projects</Text>
        </SmartLink>
        {project.timeframe && (
          <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
            {new Date(project.timeframe).toLocaleString("en-us", { month: "long", year: "numeric" })}
          </Text>
        )}
        <Heading variant="display-strong-m">{project.title}</Heading>
        {project.description && (
          <Text variant="body-default-l" onBackground="neutral-weak" align="center">
            {project.description}
          </Text>
        )}
      </Column>
      <Row marginBottom="16" horizontal="center" wrap>
        <Row gap="16" vertical="center" wrap>
          {project.client && (
            <Text variant="label-default-m" onBackground="brand-weak">
              Client: {project.client}
            </Text>
          )}
          {project.role && (
            <Tag variant="primary" radius="m">
              <Text variant="label-default-m" onBackground="neutral-weak">
                Role: {project.role}
              </Text>
            </Tag>
          )}
        </Row>
        {project.techStack && project.techStack.length > 0 && (
          <Row gap="8" wrap vertical="center">
            {project.techStack.map((t) => (
              <Tag key={t.id} variant="tertiary" radius="m">
                <Text variant="label-strong-s" onBackground="neutral-weak">
                  {t.tech}
                </Text>
              </Tag>
            ))}
          </Row>
        )}
      </Row>
      {(project.links?.liveUrl || project.links?.repoUrl) && (
        <Row marginBottom="32" horizontal="center" gap="16" wrap>
          {project.links.liveUrl && (
            <SmartLink
              suffixIcon="arrowUpRightFromSquare"
              style={{ width: "fit-content", margin: "0" }}
              href={project.links.liveUrl}
              target="_blank"
            >
              <Text variant="label-strong-m">Live demo</Text>
            </SmartLink>
          )}
          {project.links.repoUrl && (
            <SmartLink
              suffixIcon="arrowUpRightFromSquare"
              style={{ width: "fit-content", margin: "0" }}
              href={project.links.repoUrl}
              target="_blank"
            >
              <Text variant="label-strong-m">Source code</Text>
            </SmartLink>
          )}
        </Row>
      )}
      {imageUrl && (
        <Media priority aspectRatio="16 / 9" radius="m" alt={project.title} src={imageUrl} />
      )}
      {project.metrics && project.metrics.length > 0 && (
        <Column
          fillWidth
          horizontal="center"
          paddingY="24"
          marginY="16"
          style={{ borderRadius: "12px", background: "rgba(128, 128, 128, 0.08)" }}
        >
          <Grid
            columns={String(project.metrics.length > 3 ? 4 : project.metrics.length) as "1" | "2" | "3" | "4"}
            s={{ columns: 1 }}
            fillWidth
            gap="24"
            paddingX="24"
          >
            {project.metrics.map((metric) => (
              <Column key={metric.id} horizontal="center" gap="4" fillWidth>
                <Heading variant="display-strong-m" align="center">
                  {metric.value}
                </Heading>
                <Text variant="label-default-s" onBackground="neutral-weak" align="center">
                  {metric.label}
                </Text>
              </Column>
            ))}
          </Grid>
        </Column>
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        {project.content && <RichText content={project.content} />}
      </Column>
      {project.features && project.features.length > 0 && (
        <Column fillWidth marginTop="32">
          <Heading as="h2" variant="heading-strong-xl" marginBottom="16">
            Key features
          </Heading>
          <Grid columns="2" s={{ columns: 1 }} fillWidth gap="16">
            {project.features.map((feature) => (
              <Column
                key={feature.id}
                fillWidth
                padding="l"
                gap="4"
                style={{ borderRadius: "12px", background: "rgba(128, 128, 128, 0.08)" }}
              >
                <Heading as="h3" variant="heading-strong-m">
                  {feature.title}
                </Heading>
                {feature.description && (
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {feature.description}
                  </Text>
                )}
              </Column>
            ))}
          </Grid>
        </Column>
      )}
      {project.benefits && project.benefits.length > 0 && (
        <Column fillWidth marginTop="32">
          <Heading as="h2" variant="heading-strong-xl" marginBottom="16">
            Impact
          </Heading>
          <List as="ul">
            {project.benefits.map((b) => (
              <ListItem key={b.id} marginTop="4" marginBottom="8">
                <Text variant="body-default-m" onBackground="neutral-medium">
                  {b.benefit}
                </Text>
              </ListItem>
            ))}
          </List>
        </Column>
      )}
      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
          Related projects
        </Heading>
        <Projects projects={allProjects} range={[2]} exclude={[project.slug || ""]} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}

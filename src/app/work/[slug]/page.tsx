import { RichText, ScrollToHash } from "@/components";
import { Projects } from "@/components/work/Projects";
import { about, baseURL, person, work } from "@/resources";
import { getImageUrl, getProjectBySlug, getProjects } from "@/utils/payload";
import {
  Column,
  Heading,
  Line,
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
  return projects.docs.map((project) => ({
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

  const project = await getProjectBySlug(slugPath);

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
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href="/work">
          <Text variant="label-strong-m">Projects</Text>
        </SmartLink>
        {project.timeframe && (
          <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
            {project.timeframe}
          </Text>
        )}
        <Heading variant="display-strong-m">{project.title}</Heading>
        {project.description && (
          <Text variant="body-default-l" onBackground="neutral-weak" align="center">
            {project.description}
          </Text>
        )}
      </Column>
      <Row marginBottom="32" horizontal="center">
        <Row gap="16" vertical="center">
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
      </Row>
      {imageUrl && (
        <Media priority aspectRatio="16 / 9" radius="m" alt={project.title} src={imageUrl} />
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        {project.content && <RichText content={project.content} />}
      </Column>
      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
          Related projects
        </Heading>
        <Projects range={[2]} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}

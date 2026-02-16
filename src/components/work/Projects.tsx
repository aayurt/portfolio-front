import { getProjects, getImageUrl } from "@/utils/payload";
import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
}

export async function Projects({ range, exclude }: ProjectsProps) {
  const allProjects = await getProjects();

  let filteredProjects = allProjects;

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    filteredProjects = allProjects.filter((project) =>
      project.slug ? !exclude.includes(project.slug) : true
    );
  }

  // Sort by createdAt (assuming newer first) - Payload returns recent first usually, but let's sort to be safe if needed
  // MDX was using publishedAt. Payload has createdAt/updatedAt.
  const sortedProjects = filteredProjects.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((project, index) => (
        <ProjectCard
          priority={index < 2}
          key={project.slug || index}
          href={`/work/${project.slug}`}
          images={
            project.images?.map((img) => getImageUrl(img)).filter(Boolean) || []
          }
          title={project.title}
          description={project.description || ""}
          content={project.content}
          avatars={[]} // Payload Project doesn't have team/avatars yet
          link={""} // Payload Project doesn't have external link field in the interface we saw?
        />
      ))}
    </Column>
  );
}

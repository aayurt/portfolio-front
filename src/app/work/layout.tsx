import WorkSidebar from "@/components/work/WorkSidebar";
import { getProjects } from "@/utils/payload";

export default async function WorkLayout({ children }: { children: React.ReactNode }) {
  const projects = await getProjects();

  return (
    <>
      <WorkSidebar projects={projects} />
      {children}
    </>
  );
}

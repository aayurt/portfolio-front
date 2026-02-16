import { Projects } from "@/components/work/Projects";
import { about, baseURL, person, } from "@/resources";
import { getImageUrl, getTenantBySlug } from "@/utils/payload";
import { Column, Heading, Meta, Schema } from "@once-ui-system/core";

export async function generateMetadata() {
  const tenant = await getTenantBySlug()
  return Meta.generate({
    title: `Projects – ${tenant?.name}`,
    description: `Design and dev projects by ${tenant?.name}`,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(`Projects – ${tenant?.name}`)}`,
    path: "/work",
  });
}

export default async function Work() {
  const tenant = await getTenantBySlug()
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={"/work"}
        title={`${tenant?.name}'s Work`}
        description={`Design and dev projects by ${tenant?.name}`}
        image={`/api/og/generate?title=${encodeURIComponent(`${tenant?.name}'s Work`)}`}
        author={{
          name: tenant?.name || person.name,
          url: `${baseURL}${about.path}`,
          image: getImageUrl(tenant?.avatar) || `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {`My Work`}
      </Heading>
      <Projects />
    </Column>
  );
}

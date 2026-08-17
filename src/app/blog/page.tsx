import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import PatienceImage from "@/components/patienceImage";
import { baseURL, person } from "@/resources";
import { getImageUrl, getPosts, getTenantBySlug, resolveMediaIds, API } from "@/utils/payload";
import { Column, Heading, Meta, Schema } from "@once-ui-system/core";

export async function generateMetadata() {
  const tenant = await getTenantBySlug()
  return Meta.generate({
    title: `${tenant?.name}'s Blog` || "Blog",
    description: `Read what ${tenant?.name} has been up to recently` || "Blog description",
    baseURL: "https://aayurtshrestha.com",
    image: `/api/og/generate?title=${encodeURIComponent("Writing about design and tech...")}`,
    path: "/blog",
  });
}

export default async function Blog() {
  const tenant = await getTenantBySlug()
  const posts = await getPosts();

  // Resolve hero image IDs to URLs
  const heroImageIds = [...new Set(
    posts.map(p => p.heroImage).filter((id): id is number => typeof id === 'number'),
  )];
  const mediaMap = await resolveMediaIds(heroImageIds);
  const heroImageUrls = new Map<number, string>();
  for (const [id, filename] of mediaMap) {
    heroImageUrls.set(id, (API + "/admin/media/" + encodeURIComponent(filename)).replace(/([^:]\/)\/+/g, "$1"));
  }
  if (posts.length === 0) {
    return <Column fillWidth flex={1} gap="40">

      <PatienceImage width="12rem" height="12rem" />
      <Heading style={{
        display: "flex",
        justifyContent: "center"
      }}>
        No Posts Yet!
      </Heading>
    </Column>
  }
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={`${tenant?.name}'s Blog` || "Blog"}
        description={`Read what ${tenant?.name} has been up to recently` || "Blog description"}
        path={"/blog"}
        image={`/api/og/generate?title=${encodeURIComponent("Writing about design and tech...")}`}
        author={{
          name: tenant?.name || person.name,
          url: `${baseURL}/blog`,
          image: getImageUrl(tenant?.avatar) || `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" marginLeft="24">
        {`${tenant?.name}'s Blog`}
      </Heading>

      <Column fillWidth flex={1} gap="40">
        <Posts posts={posts} tenant={tenant} range={[1, 1]} thumbnail heroImageUrls={heroImageUrls} />
        <Posts posts={posts} tenant={tenant} range={[2, 3]} columns="2" thumbnail direction="column" heroImageUrls={heroImageUrls} />
        <Mailchimp marginBottom="l" />
        {posts.length > 3 && <><Heading as="h2" variant="heading-strong-xl" marginLeft="l">
          Earlier posts
        </Heading>
          <Posts posts={posts} tenant={tenant} range={[4]} columns="2" heroImageUrls={heroImageUrls} /></>}
      </Column>

    </Column>
  );
}

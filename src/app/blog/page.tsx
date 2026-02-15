import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL, blog, person, newsletter } from "@/resources";
import PatienceImage from "@/components/patienceImage";
import { getPosts } from "@/utils/payload";

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: blog.path,
  });
}

export default async function Blog() {
  const posts = await getPosts();
  console.log(posts);
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
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" marginLeft="24">
        {blog.title}
      </Heading>

      <Column fillWidth flex={1} gap="40">
        <Posts range={[1, 1]} thumbnail />
        <Posts range={[2, 3]} columns="2" thumbnail direction="column" />
        <Mailchimp marginBottom="l" />
        {posts.length > 3 && <><Heading as="h2" variant="heading-strong-xl" marginLeft="l">
          Earlier posts
        </Heading>
          <Posts range={[4]} columns="2" /></>}
      </Column>

    </Column>
  );
}

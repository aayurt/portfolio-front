import { Grid } from "@once-ui-system/core";
import Post from "./Post";
import { Tenant, Post as PostType } from "../../../payload-types";

interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: "row" | "column";
  posts: PostType[];
  tenant: Tenant | null;
  heroImageUrls?: Map<number, string>;
}

export async function Posts({
  range,
  columns = "1",
  thumbnail = false,
  direction,
  posts,
  tenant,
  heroImageUrls,
}: PostsProps) {
  if (posts.length === 0) {
    return <>No Posts</>;
  }
  const sortedBlogs = posts.sort((a, b) => {
    return new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime();
  });

  const displayedBlogs = range
    ? sortedBlogs.slice(range[0] - 1, range.length === 2 ? range[1] : sortedBlogs.length)
    : sortedBlogs;

  return (
    <>
      {displayedBlogs.length > 0 && (
        <Grid columns={columns} s={{ columns: 1 }} fillWidth marginBottom="40" gap="16">
          {displayedBlogs.map((post) => (
            <Post key={post.slug} post={post} thumbnail={thumbnail} direction={direction} tenant={tenant} heroImageUrl={
              post.heroImage != null && typeof post.heroImage === 'number' ? heroImageUrls?.get(post.heroImage) : undefined
            } />
          ))}
        </Grid>
      )}
    </>
  );
}

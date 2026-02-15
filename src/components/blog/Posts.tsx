import { Grid } from "@once-ui-system/core";
import Post from "./Post";
import { getPosts } from "@/utils/payload";

interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: "row" | "column";
  exclude?: string[];
}

export async function Posts({
  range,
  columns = "1",
  thumbnail = false,
  direction,
}: PostsProps) {
  const posts = await getPosts();
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
            <Post key={post.slug} post={post} thumbnail={thumbnail} direction={direction} />
          ))}
        </Grid>
      )}
    </>
  );
}

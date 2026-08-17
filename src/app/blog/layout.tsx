import BlogSidebar from "@/components/blog/BlogSidebar";
import { getPosts } from "@/utils/payload";

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  const posts = await getPosts();

  return (
    <>
      <BlogSidebar posts={posts} />
      {children}
    </>
  );
}

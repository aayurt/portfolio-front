import { NextRequest, NextResponse } from "next/server";
import { getImageUrl, getPosts, getProjects } from "@/utils/payload";

export const dynamic = "force-dynamic";

export type SearchResult = {
  type: "project" | "post";
  title: string;
  subtitle?: string;
  href: string;
  image?: string;
};

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") || "").trim().toLowerCase();
  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const [projects, posts] = await Promise.all([
    getProjects().catch(() => []),
    getPosts().catch(() => []),
  ]);

  const matches = (...texts: Array<string | null | undefined>) =>
    texts.some((t) => (t || "").toLowerCase().includes(q));

  const results: SearchResult[] = [];

  for (const p of projects) {
    const tech = (p.techStack || [])
      .map((t) => (t && typeof t === "object" ? t.tech : ""))
      .join(" ");
    if (matches(p.title, p.role, p.client, p.description, tech)) {
      results.push({
        type: "project",
        title: p.title,
        subtitle: p.role || p.client || "Project",
        href: p.slug ? `/work/${p.slug}` : "/work",
        image: p.images?.[0] ? getImageUrl(p.images[0]) : undefined,
      });
    }
  }

  for (const post of posts) {
    if (matches(post.title, post.meta?.description)) {
      results.push({
        type: "post",
        title: post.title,
        subtitle: "Blog post",
        href: post.slug ? `/blog/${post.slug}` : "/blog",
        image: post.heroImage ? getImageUrl(post.heroImage) : undefined,
      });
    }
  }

  return NextResponse.json({ results: results.slice(0, 12) });
}

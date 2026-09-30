import { NextResponse } from "next/server";
import { getPosts } from "@/utils/payload";

export const dynamic = "force-dynamic";

// Server-side publications feed backed directly by Payload (portfolio-admin).
// Replaces the old `POST /api/posts` call that pointed at the deleted
// portfolio-admin-connector proxy (which treated POST as createPost).
export async function GET() {
  try {
    const posts = await getPosts().catch(() => []);
    const pubs = posts
      .filter((p) => (p as unknown as Record<string, unknown>).isPublication === true)
      .map((p) => {
        const raw = p as unknown as Record<string, unknown>;
        const populated = (p.populatedAuthors || []) as { name?: string | null }[];
        const authors =
          populated.length > 0
            ? populated.map((a) => a.name || "").filter(Boolean).join(", ")
            : "";
        const publishedAt = p.publishedAt ? new Date(p.publishedAt) : null;
        const year =
          typeof raw.year === "number"
            ? raw.year
            : publishedAt && !isNaN(publishedAt.getTime())
              ? publishedAt.getFullYear()
              : new Date().getFullYear();
        return {
          title: p.title,
          authors,
          venue: (raw.venue as string) || "",
          year,
          type: (raw.type as string) || "Working Paper",
          abstract: (raw.abstract as string) || p.meta?.description || "",
          slug: p.slug || "",
        };
      });
    return NextResponse.json({ docs: pubs });
  } catch {
    return NextResponse.json({ docs: [] });
  }
}

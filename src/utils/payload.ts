import { About, Gallery, Media, Post, Project, Solution, Tenant } from "../../payload-types";
import { getSlug } from "./getSlug";

export const API = (process.env.NEXT_PUBLIC_API || "http://localhost:3000").replace(/\/admin$/, "");
export const PAYLOAD_API_URL = API + "/admin/api";

type CollectionResponse<T> = {
    docs: T[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
};

export async function getAbouts(): Promise<About[]> {
    const res = await fetch(`${PAYLOAD_API_URL}/abouts/by-slug/${await getSlug()}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch about data: ${res.statusText}`);
    }
    return res.json();
}

export async function getAbout(): Promise<About | null> {
    const abouts = await getAbouts();
    return abouts && abouts.length > 0 ? abouts[0] : null;
}

const EXCLUDED_PROJECT_SLUGS = ["macImpetusNutri", "banking-app"];

const HERMES_PROJECT: Project = {
    id: 9999,
    title: "Hermes — Multi-Agent Autonomous Engineering System",
    slug: "hermes",
    description: "Multi-agent autonomous software engineering system designed for executing end-to-end development workflows. Features DAG-based task planning, parallel containerized worker execution, MCP protocol integration, and automated verification feedback loops.",
    client: "Autonomous Systems & MLOps",
    role: "Lead Systems Architect & AI Engineer",
    timeframe: "2025 – Present",
    createdAt: "2026-03-01T00:00:00.000Z",
    updatedAt: "2026-09-25T00:00:00.000Z",
    metrics: [
        { value: "10K+", label: "Tasks executed", id: "m1" },
        { value: "< 50ms", label: "Agent dispatch", id: "m2" },
        { value: "99.9%", label: "Test pass gate", id: "m3" },
    ],
    features: [
        { title: "DAG Multi-Agent Planner", description: "Decomposes high-level specs into parallel worker tasks with skill injection.", id: "f1" },
        { title: "Sandboxed Docker Containers", description: "Worker environments operate with zero host pollution and strict security bounds.", id: "f2" },
        { title: "Model Context Protocol (MCP)", description: "Standard tool interfaces for AST parsers, language servers, and Git CLI.", id: "f3" },
        { title: "Self-Correction Eval Loop", description: "Deterministic test and lint gates with automated error feedback healing.", id: "f4" },
    ],
    benefits: [
        { benefit: "Converts ambiguous prompts into verified, production-ready code with atomic commits.", id: "b1" },
        { benefit: "Iteratively self-heals syntax, type, and test failures with bounded retry loops.", id: "b2" },
    ],
    techStack: [
        { tech: "TypeScript", id: "t1" },
        { tech: "Docker", id: "t2" },
        { tech: "MCP Protocol", id: "t3" },
        { tech: "Next.js", id: "t4" },
        { tech: "Node.js", id: "t5" },
    ],
    content: {
        root: {
            type: "root",
            format: "",
            indent: 0,
            version: 1,
            direction: "ltr",
            children: [
                {
                    type: "heading",
                    tag: "h2",
                    format: "",
                    indent: 0,
                    version: 1,
                    children: [
                        {
                            type: "text",
                            text: "Autonomous Multi-Agent Engineering Architecture",
                            format: 1,
                            version: 1,
                            detail: 0,
                            mode: "normal",
                            style: ""
                        }
                    ]
                },
                {
                    type: "paragraph",
                    format: "",
                    indent: 0,
                    version: 1,
                    children: [
                        {
                            type: "text",
                            text: "Hermes is a research-grade and production-ready multi-agent framework built to eliminate repetitive software engineering bottlenecks. Rather than relying on simple, single-turn LLM generation, Hermes orchestrates an autonomous directed acyclic graph (DAG) of specialized subagents running in sandboxed Docker containers.",
                            format: 0,
                            version: 1,
                            detail: 0,
                            mode: "normal",
                            style: ""
                        }
                    ]
                },
                {
                    type: "heading",
                    tag: "h3",
                    format: "",
                    indent: 0,
                    version: 1,
                    children: [
                        {
                            type: "text",
                            text: "Key Architectural Highlights",
                            format: 1,
                            version: 1,
                            detail: 0,
                            mode: "normal",
                            style: ""
                        }
                    ]
                },
                {
                    type: "paragraph",
                    format: "",
                    indent: 0,
                    version: 1,
                    children: [
                        {
                            type: "text",
                            text: "1. Orchestrator-Worker Decomposition: High-level requirements are decomposed into discrete, verified tasks with strict acceptance criteria and explicit file scopes.\n2. Sandboxed Execution: Isolated execution trees with dedicated network egress and ephemeral worktrees prevent host pollution.\n3. Deterministic Verification Gate: Every change is tested against compilation, lint rules, and unit test suites before being eligible for merge.\n4. Bounded Self-Correction: In the event of a test failure, runtime stack traces and AST diagnostics are looped back into worker context for iterative refinement.",
                            format: 0,
                            version: 1,
                            detail: 0,
                            mode: "normal",
                            style: ""
                        }
                    ]
                }
            ]
        }
    }
};

export async function getProjects(): Promise<Project[]> {
    try {
        const res = await fetch(`${PAYLOAD_API_URL}/projects/by-slug/${await getSlug()}`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            return [HERMES_PROJECT];
        }

        const data: Project[] = await res.json();
        const filtered = data.filter(
            (p) => p.slug && !EXCLUDED_PROJECT_SLUGS.includes(p.slug)
        );

        // Ensure Hermes is featured in projects list if not present in remote DB
        if (!filtered.some((p) => p.slug === "hermes")) {
            return [HERMES_PROJECT, ...filtered];
        }

        return filtered;
    } catch {
        return [HERMES_PROJECT];
    }
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
    if (EXCLUDED_PROJECT_SLUGS.includes(slug)) {
        return undefined;
    }

    if (slug === "hermes") {
        return HERMES_PROJECT;
    }

    try {
        const res = await fetch(`${PAYLOAD_API_URL}/projects/by-slug/${await getSlug()}/${slug}`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            return undefined;
        }

        return res.json();
    } catch {
        return undefined;
    }
}

export async function getMedia(id: number | Media): Promise<Media | null> {
    if (typeof id === "object") {
        return id;
    }

    const res = await fetch(`${PAYLOAD_API_URL}/media/${id}`, {
        next: { revalidate: 3600 }, // Cache media longer
    });

    if (!res.ok) {
        console.error(`Failed to fetch media ${id}: ${res.statusText}`);
        return null;
    }

    return res.json();
}

// Helper to get image URL from Media object or ID
export function getImageUrl(media: number | Media | null | undefined, size?: string): string {
    if (!media) return "";
    if (typeof media === "number") return "";

    const sizes = media.sizes as Record<string, { filename?: string | null } | undefined> | null;
    const filename = size && sizes?.[size]?.filename
        ? sizes[size].filename!
        : media.filename || "";

    if (!filename) return "";

    return (API + "/admin/api/media/file/" + encodeURIComponent(filename)).replace(/([^:]\/)\/+/g, "$1");
}

export async function resolveMediaIds(ids: number[]): Promise<Map<number, string>> {
    if (ids.length === 0) return new Map();
    const res = await fetch(
        `${PAYLOAD_API_URL}/media?where[id][in]=${ids.join(",")}&limit=${ids.length}&depth=0`,
        { next: { revalidate: 60 } },
    );
    if (!res.ok) return new Map();
    const data: CollectionResponse<Media> = await res.json();
    const map = new Map<number, string>();
    for (const item of data.docs) {
        if (item.id && item.filename) {
            map.set(Number(item.id), item.filename);
        }
    }
    return map;
}

export function getTenant(tenant: number | Tenant | null | undefined): Tenant | null {
    if (!tenant) return null;
    if (typeof tenant === "number") return null; // Cannot resolve from ID synchronously
    return tenant;
}

export async function getTenantBySlug(): Promise<Tenant | null> {
    try {
        const res = await fetch(
            `${PAYLOAD_API_URL}/tenants/by-slug/${await getSlug()}`,
            {
                next: { revalidate: 3600 }, // Cache tenant data for 1 hour
            }
        );

        if (!res.ok) {
            console.error(`Failed to fetch tenant ${await getSlug()}: ${res.statusText}`);
            return null;
        }

        const data: Tenant = await res.json();
        return data || null;
    } catch {
        return null;
    }
}

export async function getPosts(): Promise<Post[]> {
    try {
        const res = await fetch(`${PAYLOAD_API_URL}/posts/by-slug/${await getSlug()}`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            return [];
        }
        return res.json();
    } catch {
        return [];
    }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const res = await fetch(`${PAYLOAD_API_URL}/posts/by-slug/${await getSlug()}/${slug}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        return null;
    }

    return res.json();
}


export async function getSolutions(): Promise<Solution[]> {
    const res = await fetch(`${PAYLOAD_API_URL}/solutions/by-slug/${await getSlug()}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        console.error(`Failed to fetch solutions: ${res.statusText}`);
        return [];
    }
    return res.json();
}

export async function getGallery(): Promise<Gallery[]> {
    const res = await fetch(`${PAYLOAD_API_URL}/galleries/by-slug/${await getSlug()}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch galleries: ${res.statusText}`);
    }
    return res.json();
}
import { About, Gallery, Media, Post, Project, Tenant } from "../../payload-types";

export const PAYLOAD_API_URL = process.env.NEXT_PUBLIC_API + "/api" || "http://localhost:3000/api";
export const PAYLOAD_SLUG = process.env.NEXT_PUBLIC_SLUG || "aayurt"

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

export async function getAbout(): Promise<About> {
    const res = await fetch(`${PAYLOAD_API_URL}/abouts/1`);

    if (!res.ok) {
        throw new Error(`Failed to fetch about data: ${res.statusText}`);
    }

    return res.json();
}

export async function getProjects(
    page: number = 1,
    limit: number = 100
): Promise<CollectionResponse<Project>> {
    const res = await fetch(`${PAYLOAD_API_URL}/projects?page=${page}&limit=${limit}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch projects: ${res.statusText}`);
    }

    return res.json();
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
    const projects = await getProjects();
    const project = projects.docs.find((project) => project.slug === slug);
    return project;
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
export function getImageUrl(media: number | Media | null | undefined): string {
    if (!media) return "";
    if (typeof media === "number") return ""; // Cannot resolve URL from ID synchronously without fetching

    return ((process.env.NEXT_PUBLIC_API || "http://localhost:3000") + (media.url || ""))
        .replace("/admin", "")
        .replace(/([^:]\/)\/+/g, "$1");
}

export function getTenant(tenant: number | Tenant | null | undefined): Tenant | null {
    if (!tenant) return null;
    if (typeof tenant === "number") return null; // Cannot resolve from ID synchronously
    return tenant;
}

export async function getTenantBySlug(slug: string = PAYLOAD_SLUG): Promise<Tenant | null> {
    const res = await fetch(
        `${PAYLOAD_API_URL}/tenants/by-slug/${slug}`,
        {
            next: { revalidate: 3600 }, // Cache tenant data for 1 hour
        }
    );

    if (!res.ok) {
        console.error(`Failed to fetch tenant ${slug}: ${res.statusText}`);
        return null;
    }

    const data: Tenant = await res.json();
    return data || null;
}

export async function getPosts(): Promise<Post[]> {
    const res = await fetch(`${PAYLOAD_API_URL}/posts/by-slug/${PAYLOAD_SLUG}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch posts: ${res.statusText}`);
    }
    return res.json();
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const posts = await getPosts();
    const post = posts.find((post) => post.slug === slug);
    return post || null;
}


export async function getGallery(): Promise<Gallery[]> {
    const res = await fetch(`${PAYLOAD_API_URL}/galleries/by-slug/${PAYLOAD_SLUG}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch galleries: ${res.statusText}`);
    }
    return res.json();
}
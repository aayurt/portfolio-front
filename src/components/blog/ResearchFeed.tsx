"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./ResearchFeed.module.scss";
import type { Post as PostType, Tenant } from "../../../payload-types";
import { formatDate } from "@/utils/formatDate";

interface ResearchFeedProps {
  posts: PostType[];
  tenant?: Tenant | null;
}

interface EnrichedArticle {
  slug: string;
  title: string;
  category: string;
  categoryKey: string;
  dateStr: string;
  readTime: string;
  abstract: string;
  author: string;
}

// Map real slugs and titles to academic categories & abstracts
function enrichPost(post: PostType, defaultAuthor: string): EnrichedArticle {
  const postSlug = post.slug || "";
  const titleLower = (post.title || "").toLowerCase();
  const slugLower = postSlug.toLowerCase();

  let category = "Engineering Dispatch";
  let categoryKey = "systems";
  let readTime = "6 min read";
  let abstract = post.meta?.description || "Technical analysis and architecture retrospective on distributed systems, full-stack pipelines, and production engineering.";

  if (titleLower.includes("clinic") || titleLower.includes("agentic") || slugLower.includes("agentic") || slugLower.includes("clinic")) {
    category = "AI Research";
    categoryKey = "ai";
    readTime = "11 min read";
    abstract = "Investigating closed-loop autonomous agent architectures, AST verification gates, and deterministic reliability in mission-critical decision-making environments.";
  } else if (titleLower.includes("nepse") || slugLower.includes("nepse")) {
    category = "Fintech & Quantitative AI";
    categoryKey = "ai";
    readTime = "8 min read";
    abstract = "Automating daily floor-sheet ingestion from NEPSE, computing timeseries technical momentum indicators (EMA/MACD/RSI), and prompting local Ollama + Gemini for buy/sell/hold signal synthesis.";
  } else if (titleLower.includes("multi-language") || titleLower.includes("i18n") || slugLower.includes("i18n")) {
    category = "Systems & i18n";
    categoryKey = "systems";
    readTime = "5 min read";
    abstract = "Architectural patterns for zero-latency runtime language switching, dictionary fallback trees, and offline IndexedDB persistent localization across English, Nepali, and Nepal Bhasa.";
  } else if (titleLower.includes("server") || titleLower.includes("nginx") || titleLower.includes("vps") || slugLower.includes("nginx")) {
    category = "DevOps & Infrastructure";
    categoryKey = "infra";
    readTime = "6 min read";
    abstract = "Complete production deployment handbook for hosting high-throughput Next.js standalone builds with zero-downtime symlink deploys and Nginx reverse proxy management.";
  } else if (titleLower.includes("capacitor") || slugLower.includes("capacitor")) {
    category = "Mobile Engineering";
    categoryKey = "mobile";
    readTime = "7 min read";
    abstract = "Structuring hybrid cross-platform apps with Vite, React, and Tailwind CSS, leveraging Capacitor plugins for native device bridge APIs and camera door scanning.";
  } else if (titleLower.includes("plesk") || slugLower.includes("plesk")) {
    category = "Cloud Systems";
    categoryKey = "infra";
    readTime = "5 min read";
    abstract = "Configuring multi-tenant virtual hosting, automatic SSL certificates, and isolated application pool containers on production cloud VPS instances.";
  }

  const dateStr = post.publishedAt
    ? formatDate(post.publishedAt, false).toUpperCase()
    : "RECENT";

  return {
    slug: postSlug,
    title: post.title || "Untitled Publication",
    category,
    categoryKey,
    dateStr,
    readTime,
    abstract,
    author: defaultAuthor,
  };
}

export const ResearchFeed: React.FC<ResearchFeedProps> = ({ posts, tenant }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const authorName = tenant?.name || "Aayurt Shrestha";

  const enriched = posts.map((p) => enrichPost(p, authorName));

  const filtered = activeCategory === "all"
    ? enriched
    : enriched.filter((a) => a.categoryKey === activeCategory);

  return (
    <div className={styles.container}>
      <div className={styles.filterBar}>
        <button
          className={`${styles.filterPill} ${activeCategory === "all" ? styles.filterPillActive : ""}`}
          onClick={() => setActiveCategory("all")}
        >
          All Publications ({enriched.length})
        </button>
        <button
          className={`${styles.filterPill} ${activeCategory === "ai" ? styles.filterPillActive : ""}`}
          onClick={() => setActiveCategory("ai")}
        >
          🤖 AI & Autonomous Agents
        </button>
        <button
          className={`${styles.filterPill} ${activeCategory === "infra" ? styles.filterPillActive : ""}`}
          onClick={() => setActiveCategory("infra")}
        >
          ⚡ DevOps & Cloud Infra
        </button>
        <button
          className={`${styles.filterPill} ${activeCategory === "systems" ? styles.filterPillActive : ""}`}
          onClick={() => setActiveCategory("systems")}
        >
          🌐 Systems & i18n
        </button>
      </div>

      <div className={styles.feed}>
        {filtered.map((item) => (
          <Link
            key={item.slug}
            href={`/blog/${item.slug}`}
            className={styles.feedItem}
          >
            <div className={styles.feedHeader}>
              <span className={styles.feedCategory}>{item.category}</span>
              <span className={styles.feedDate}>
                {item.dateStr} · {item.readTime}
              </span>
            </div>

            <h3 className={styles.feedTitle}>{item.title}</h3>
            <p className={styles.feedAbstract}>{item.abstract}</p>

            <div className={styles.feedFooter}>
              <span className={styles.feedAuthor}>Author: {item.author}</span>
              <span className={styles.feedAction}>Read Publication →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Column, Row, Text } from "@once-ui-system/core";
import { Post } from "../../../payload-types";

interface BlogSidebarProps {
  posts: Post[];
}

export default function BlogSidebar({ posts }: BlogSidebarProps) {
  const router = useRouter();
  const params = useParams();
  const currentSlug = params?.slug as string | undefined;

  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [navigatingSlug, setNavigatingSlug] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ text: string; y: number } | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.publishedAt || "").getTime() - new Date(a.publishedAt || "").getTime(),
  );

  useEffect(() => {
    setNavigatingSlug(null);
  }, [currentSlug]);

  const handleRowEnter = useCallback(
    (index: number, title: string, e: React.MouseEvent) => {
      setHoveredIndex(index);
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (containerRect) {
        setTooltip({ text: title, y: rect.top - containerRect.top + rect.height / 2 });
      }
    },
    [],
  );

  const handleRowLeave = useCallback(() => {
    setHoveredIndex(null);
    setTooltip(null);
  }, []);

  const handleClick = useCallback(
    (slug: string | undefined | null) => {
      if (slug) {
        setNavigatingSlug(slug);
        setIsMobileOpen(false);
        router.push(`/blog/${slug}`);
      }
    },
    [router],
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsMobileOpen((v) => !v)}
        aria-label={isMobileOpen ? "Close blog posts" : "Toggle blog posts"}
        style={{
          position: "fixed",
          left: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 60,
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "1px solid var(--neutral-alpha-weak)",
          background: "var(--neutral-background-medium)",
          backdropFilter: "blur(8px)",
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "var(--neutral-strong)",
          fontSize: "16px",
          padding: 0,
        }}
        className="blog-sidebar-toggle"
      >
        {isMobileOpen ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="2" width="14" height="2" rx="1" fill="currentColor" />
            <rect x="1" y="7" width="14" height="2" rx="1" fill="currentColor" />
            <rect x="1" y="12" width="14" height="2" rx="1" fill="currentColor" />
          </svg>
        )}
      </button>

      <div
        ref={containerRef}
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => {
          setIsSidebarHovered(false);
          setHoveredIndex(null);
          setTooltip(null);
        }}
        style={{
          position: "fixed",
          left: "24px",
          top: "50%",
          transform: isMobileOpen ? "translateY(-50%) translateX(0)" : "translateY(-50%)",
          zIndex: 50,
        }}
        className={`blog-sidebar-container${isMobileOpen ? " blog-sidebar-open" : ""}`}
      >
        {/* Mobile backdrop */}
        {isMobileOpen && (
          <div
            onClick={() => setIsMobileOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: -1,
            }}
            className="blog-sidebar-backdrop"
          />
        )}

        <style>{`
          .glass-sidebar {
            position: relative;
            background: linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.12) 0%,
              rgba(255, 255, 255, 0.04) 50%,
              rgba(255, 255, 255, 0.02) 100%
            );
            backdrop-filter: blur(16px) saturate(180%);
            -webkit-backdrop-filter: blur(16px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-top: 1px solid rgba(255, 255, 255, 0.25);
            border-left: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 1.5rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08),
                        inset 0 1px 0 rgba(255, 255, 255, 0.15);
            max-height: calc(100vh - 160px);
            overflow: hidden;
            transition: width 0.3s ease;
          }
          .glass-sidebar::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 45%;
            background: linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.1) 0%,
              transparent 100%
            );
            border-radius: inherit;
            pointer-events: none;
            z-index: 1;
          }
          .glass-sidebar::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.04);
            border-radius: inherit;
            backdrop-filter: blur(1px);
            opacity: 0.5;
            z-index: -1;
            pointer-events: none;
          }
          .skeleton-bar {
            height: 12px;
            border-radius: var(--radius-m);
            background: var(--neutral-alpha-weak);
            position: relative;
            overflow: hidden;
          }
          .skeleton-bar::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(
              90deg,
              transparent,
              var(--neutral-alpha-medium),
              transparent
            );
            animation: shimmer 1.2s ease-in-out infinite;
          }
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }

          @media (max-width: 768px) {
            .blog-sidebar-container {
              left: 2.5rem !important;
              transform: translateY(-50%) translateX(-120%) !important;
              transition: transform 0.3s ease, opacity 0.3s ease !important;
              opacity: 0;
              pointer-events: none;
            }
            .blog-sidebar-container.blog-sidebar-open {
              transform: translateY(-50%) translateX(0) !important;
              opacity: 1;
              pointer-events: auto;
            }
            .blog-sidebar-toggle {
              display: flex !important;
            }
            .glass-sidebar {
              margin-left: 1rem;
            }
          }
        `}</style>

        <Column
          gap="4"
          padding="8"
          radius="xl"
          className="glass-sidebar"
          style={{
            width: isSidebarHovered || isMobileOpen ? "280px" : "86px",
          }}
        >
          {sortedPosts.map((post, index) => {
            const isCurrent = post.slug === currentSlug;
            const isHovered = hoveredIndex === index;
            const isLoading = navigatingSlug === post.slug;

            return (
              <Row
                key={post.slug || index}
                onClick={() => handleClick(post.slug)}
                fillWidth
                paddingY="4"
                paddingX="4"
                radius="m"
                vertical="center"
                style={{
                  cursor: "pointer",
                  transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transform: isHovered ? "scale(1.08)" : "scale(1)",
                  background: isCurrent
                    ? "rgba(255, 255, 255, 0.08)"
                    : isHovered
                      ? "rgba(255, 255, 255, 0.05)"
                      : "transparent",
                  borderLeft: isCurrent ? "2px solid var(--accent-brand-weak)" : "2px solid transparent",
                }}
                onMouseEnter={(e: React.MouseEvent) => handleRowEnter(index, post.title, e)}
                onMouseLeave={handleRowLeave}
              >
                <Text
                  variant="body-default-xs"
                  onBackground={isCurrent ? "brand-weak" : "neutral-weak"}
                  style={{ whiteSpace: "nowrap", flexShrink: 0 }}
                >
                  {formatPostDate(post.publishedAt)}
                </Text>
                {isLoading ? (
                  <div
                    className="skeleton-bar"
                    style={{
                      flex: 1,
                      marginLeft: isSidebarHovered || isMobileOpen ? "12px" : "0px",
                      opacity: isSidebarHovered || isMobileOpen ? 1 : 0,
                      transition: "opacity 0.2s ease, margin-left 0.3s ease",
                    }}
                  />
                ) : (
                  <Text
                    variant="body-default-s"
                    onBackground={isCurrent ? "brand-weak" : "neutral-strong"}
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      flex: 1,
                      minWidth: 0,
                      maxWidth: isSidebarHovered || isMobileOpen ? "200px" : "0px",
                      marginLeft: isSidebarHovered || isMobileOpen ? "12px" : "0px",
                      opacity: isSidebarHovered || isMobileOpen ? 1 : 0,
                      transition: "max-width 0.3s ease, opacity 0.2s ease, margin-left 0.3s ease",
                    }}
                  >
                    {post.title}
                  </Text>
                )}
              </Row>
            );
          })}
        </Column>

        {tooltip && isSidebarHovered && !isMobileOpen && (
          <div
            style={{
              position: "absolute",
              left: "calc(100% + 8px)",
              top: tooltip.y,
              transform: "translateY(-50%)",
              background: "rgba(0, 0, 0, 0.85)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              color: "#fff",
              padding: "6px 12px",
              borderRadius: "8px",
              fontSize: "13px",
              lineHeight: "1.4",
              minWidth: "20rem",
              maxWidth: "24rem",
              whiteSpace: "normal",
              wordBreak: "break-word",
              pointerEvents: "none",
              zIndex: 100,
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {tooltip.text}
          </div>
        )}
      </div>
    </>
  );
}

function formatPostDate(date: string | undefined | null): string {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-us", { month: "short", day: "numeric", year: "2-digit" });
}

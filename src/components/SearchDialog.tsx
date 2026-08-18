"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@once-ui-system/core";
import type { SearchResult } from "@/app/api/search/route";

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  // Global shortcut: Cmd/Ctrl+K toggles; Escape closes; custom event from the
  // header search button opens it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpenSearch = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-search", onOpenSearch);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-search", onOpenSearch);
    };
  }, []);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 20);
      return () => clearTimeout(t);
    }
    setQuery("");
    setResults([]);
    setActive(0);
  }, [open]);

  // Debounced fetch from /api/search.
  useEffect(() => {
    if (!open) return;
    if (timer.current) clearTimeout(timer.current);
    if (query.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    timer.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch {
        setResults([]);
      }
      setLoading(false);
    }, 200);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [query, open]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, Math.max(results.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      go(results[active].href);
    }
  };

  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "12vh",
        padding: "12vh 16px 16px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search projects and posts"
        style={{
          width: "100%",
          maxWidth: 560,
          background: "var(--page-background)",
          border: "1px solid var(--neutral-alpha-medium)",
          borderRadius: 14,
          boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderBottom: "1px solid var(--neutral-alpha-weak)" }}>
          <span style={{ opacity: 0.6, display: "inline-flex" }}>
            <Icon name="search" size="m" />
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search projects and posts…"
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              color: "currentColor",
              fontSize: "1rem",
              padding: "6px 0",
            }}
          />
          <kbd style={{ opacity: 0.5, fontSize: "0.7rem", border: "1px solid var(--neutral-alpha-medium)", borderRadius: 6, padding: "2px 7px", fontFamily: "inherit" }}>
            ESC
          </kbd>
        </div>

        <div style={{ maxHeight: "46vh", overflowY: "auto", padding: 8 }}>
          {query.trim().length < 2 && (
            <p style={{ margin: 0, padding: "18px 12px", fontSize: "0.85rem", opacity: 0.6 }}>
              Type at least 2 characters…
            </p>
          )}
          {query.trim().length >= 2 && loading && (
            <p style={{ margin: 0, padding: "18px 12px", fontSize: "0.85rem", opacity: 0.6 }}>Searching…</p>
          )}
          {!loading && query.trim().length >= 2 && results.length === 0 && (
            <p style={{ margin: 0, padding: "18px 12px", fontSize: "0.85rem", opacity: 0.6 }}>
              No matches for “{query}”.
            </p>
          )}
          {results.map((r, i) => (
            <button
              key={`${r.type}-${r.href}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => go(r.href)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
                textAlign: "left",
                padding: "10px 12px",
                borderRadius: 10,
                border: "none",
                background: i === active ? "var(--brand-alpha-weak)" : "transparent",
                color: "currentColor",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {r.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={r.image} alt="" style={{ width: 44, height: 30, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} />
              ) : (
                <span style={{ width: 44, height: 30, borderRadius: 6, flexShrink: 0, background: "var(--neutral-alpha-weak)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.04em", opacity: 0.7 }}>
                  {r.type}
                </span>
              )}
              <span style={{ minWidth: 0 }}>
                <span style={{ display: "block", fontWeight: 600, fontSize: "0.92rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {r.title}
                </span>
                <span style={{ display: "block", fontSize: "0.78rem", opacity: 0.65 }}>
                  {r.subtitle}
                </span>
              </span>
            </button>
          ))}
        </div>

        <div style={{ padding: "8px 16px", borderTop: "1px solid var(--neutral-alpha-weak)", fontSize: "0.72rem", opacity: 0.55, display: "flex", gap: 14 }}>
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>⌘K toggle</span>
        </div>
      </div>
    </div>
  );
}

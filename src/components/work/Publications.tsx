"use client";

import React from "react";
import { useEffect, useState } from "react";

interface Pub {
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: "Working Paper" | "Engineering Dispatch" | "Peer-Reviewed" | "Preprint";
  abstract: string;
  slug: string;
  links: { label: string; url: string }[];
}

export async function getPublications() {
  const res = await fetch(`/api/publications`, {
    method: "GET",
  });
  if (!res.ok) throw new Error("Failed to fetch publications");
  const data = await res.json();
  // Server already maps to display shape; keep link building client-side.
  return data.docs.map((doc: any) => ({
    title: doc.title,
    authors: doc.authors,
    venue: doc.venue || "",
    year: doc.year,
    type: doc.type as Pub["type"],
    abstract: doc.abstract,
    slug: doc.slug,
    links: [
      { label: "Read", url: `/blog/${doc.slug}` },
    ],
  }));
}

export function Publications() {
  const [publications, setPublications] = useState<Pub[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPublications()
      .then((pubs) => {
        setPublications(pubs);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading publications…</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div
      style={{
        width: "100%",
        background: "var(--neutral-background-weak, rgba(0,0,0,0.03))",
        border: "1px solid var(--neutral-border-weak, rgba(128,128,128,0.15))",
        borderRadius: "14px",
        padding: "24px",
        fontFamily: "var(--font-mono, monospace)",
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 800,
            margin: "0 0 6px",
            letterSpacing: "0.03em",
          }}
        >
          Publications & Research Outputs
        </h3>
        <p
          style={{
            fontSize: 11,
            color: "var(--neutral-on-background-weak)",
            margin: 0,
            lineHeight: 1.55,
          }}
        >
          Working papers, engineering dispatches, preprints, and system specifications. Ordered by date; peer-reviewed status labeled explicitly.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {publications.map((pub) => (
          <article
            key={pub.title}
            style={{
              padding: 14,
              borderRadius: 10,
              border: "1px solid var(--neutral-border-weak, rgba(128,128,128,0.12))",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  padding: "2px 7px",
                  borderRadius: 4,
                  border: "1px solid rgba(0,180,216,0.3)",
                  color:
                    pub.type === "Peer-Reviewed"
                      ? "#0891b2"
                      : pub.type === "Working Paper"
                      ? "#7c3aed"
                      : pub.type === "Preprint"
                      ? "#f59e0b"
                      : "#4b5563",
                  background:
                    pub.type === "Peer-Reviewed"
                      ? "rgba(8,145,178,0.1)"
                      : pub.type === "Working Paper"
                      ? "rgba(124,58,237,0.08)"
                      : pub.type === "Preprint"
                      ? "rgba(245,158,11,0.08)"
                      : "rgba(75,85,99,0.08)",
                }}
              >
                {pub.type.toUpperCase()}
              </span>
              <span
                style={{
                  fontSize: 9,
                  color: "var(--neutral-on-background-weak)",
                  fontWeight: 500,
                }}
              >
                {pub.venue} · {pub.year}
              </span>
            </div>

            <h4
              style={{
                fontSize: 13,
                fontWeight: 700,
                margin: "0 0 3px",
                lineHeight: 1.35,
              }}
            >
              {pub.title}
            </h4>
            <p
              style={{
                fontSize: 10.5,
                color: "var(--neutral-on-background-weak)",
                margin: "0 0 8px",
                fontWeight: 500,
              }}
            >
              {pub.authors}
            </p>
            <p
              style={{
                fontSize: 11,
                color: "var(--neutral-on-background-medium, #4b5563)",
                margin: "0 0 10px",
                lineHeight: 1.5,
              }}
            >
              {pub.abstract}
            </p>

            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              {pub.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 9999,
                    border: "1.5px solid rgba(8,145,178,0.3)",
                    color: "#0891b2",
                    textDecoration: "none",
                    background: "rgba(255,255,255,0.06)",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "#0891b2";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "#0891b2";
                  }}
                >
                  {link.label} ↗
                </a>
              ))}
              {pub.title === "Autonomy in the Clinic: The Research Frontier of Agentic AI" && (
                <a
                  href="https://docs.google.com/document/d/1cQ6DEYC3DMluBoo80e-245HNk7SOjNvvqKFxINxXrBM/edit?tab=t.0#heading=h.kzobgexilpy5"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 9999,
                    border: "1.5px solid rgba(8,145,178,0.3)",
                    color: "#0891b2",
                    textDecoration: "none",
                    background: "rgba(255,255,255,0.06)",
                    transition: "all 0.15s ease",
                    marginLeft: 8,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "#0891b2";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "#0891b2";
                  }}
                >
                  Google Doc ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
export default Publications;

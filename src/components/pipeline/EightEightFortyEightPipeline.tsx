"use client";

import React, { useState } from "react";

const TOKEN_GROUPS = [
  { label: "Color", tokens: ["alpine-blue", "sunrise-orange", "slate-50..950", "forest", "earth"], color: "#3b82f6" },
  { label: "Elevation", tokens: ["basecamp", "trail", "ridge", "summit", "expedition"], color: "#0ea5e9" },
  { label: "Type", tokens: ["Inter (sans)", "JetBrains Mono"], color: "#7c3aed" },
  { label: "Radii", tokens: ["sm: 6px", "md: 8px", "lg: 12px", "full"], color: "#0891b2" },
];

const COMPONENTS = [
  { name: "Button", type: "Primitive", detail: "hiker → summit variants\n28–44px · 1px border · hover lift" },
  { name: "ExecutionCard", type: "Agentic", detail: "Agent run states\nstatus · elapsed · output" },
  { name: "ToolCallInspector", type: "Agentic", detail: "MCP call trace viewer\nname · args · result diff" },
  { name: "MountainContour", type: "Agentic", detail: "SVG terrain chart\nprogress topology" },
  { name: "Form (RHF+Zod)", type: "Form", detail: "FormField · FormItem\nclient-side validation" },
  { name: "Table", type: "Data", detail: "Sortable · paginated\nshadcn + 8848 tokens" },
];

type PackageId = "@aayurt/8848-ui-react" | "@aayurt/8848-ui-core" | "@aayurt/8848-ui-mcp";

const PACKAGES: { id: PackageId; label: string; version: string; desc: string; color: string }[] = [
  { id: "@aayurt/8848-ui-react", label: "react", version: "0.2.1", desc: "40+ React 19 components", color: "#3b82f6" },
  { id: "@aayurt/8848-ui-core", label: "core", version: "0.1.2", desc: "OKLCH tokens + Tailwind v4", color: "#0891b2" },
  { id: "@aayurt/8848-ui-mcp", label: "mcp", version: "0.2.1", desc: "MCP server for AI assistants", color: "#7c3aed" },
];

export function EightEightFortyEightPipeline() {
  const [activeComponent, setActiveComponent] = useState(0);
  const [activePackage, setActivePackage] = useState<PackageId>("@aayurt/8848-ui-react");
  const [copied, setCopied] = useState(false);

  const comp = COMPONENTS[activeComponent];

  const handleCopy = () => {
    navigator.clipboard.writeText(`pnpm add @aayurt/8848-ui-react @aayurt/8848-ui-core`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      width: "100%",
      background: "var(--neutral-background-weak, rgba(0,0,0,0.03))",
      border: "1px solid var(--neutral-border-weak, rgba(128,128,128,0.15))",
      borderRadius: "12px",
      overflow: "hidden",
      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    }}>
      {/* Title bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 12px",
        background: "rgba(0,0,0,0.04)",
        borderBottom: "1px solid var(--neutral-border-weak, rgba(128,128,128,0.1))",
        flexWrap: "wrap",
        gap: "8px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
          <span style={{ fontSize: 11, color: "var(--neutral-on-background-weak)", marginLeft: 6 }}>
            8848 UI — DESIGN SYSTEM REGISTRY
          </span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#3b82f6",
            background: "rgba(59,130,246,0.1)",
            border: "1px solid rgba(59,130,246,0.25)",
            padding: "2px 7px",
            borderRadius: 4,
            letterSpacing: "0.05em",
          }}>
            ▲ /\ 8848m
          </span>
          <a
            href="https://github.com/aayurt/8848-ui"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 10, color: "#3b82f6", textDecoration: "none", padding: "2px 6px",
              background: "rgba(59,130,246,0.08)", borderRadius: 4, border: "1px solid rgba(59,130,246,0.2)" }}
          >
            GitHub ↗
          </a>
        </div>
      </div>

      <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: 12 }}>

        {/* Architecture: token groups */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
          {TOKEN_GROUPS.map((g) => (
            <div key={g.label} style={{
              background: "var(--neutral-background-medium, rgba(128,128,128,0.05))",
              border: `1px solid ${g.color}30`,
              borderRadius: 8,
              padding: "8px 10px",
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: g.color, letterSpacing: "0.07em", marginBottom: 4 }}>
                {g.label.toUpperCase()}
              </div>
              {g.tokens.map(t => (
                <div key={t} style={{ fontSize: 9.5, color: "var(--neutral-on-background-weak)", lineHeight: 1.5 }}>
                  · {t}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Package selector */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--neutral-on-background-weak)", letterSpacing: "0.06em", marginBottom: 6 }}>
            PACKAGES
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {PACKAGES.map(p => (
              <button
                key={p.id}
                onClick={() => setActivePackage(p.id)}
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  padding: "3px 9px",
                  borderRadius: 5,
                  border: `1px solid ${activePackage === p.id ? p.color : "rgba(128,128,128,0.2)"}`,
                  background: activePackage === p.id ? `${p.color}18` : "transparent",
                  color: activePackage === p.id ? p.color : "var(--neutral-on-background-weak)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {p.label} <span style={{ opacity: 0.7 }}>v{p.version}</span>
              </button>
            ))}
          </div>
          <div style={{ fontSize: 10.5, color: "var(--neutral-on-background-weak)", marginTop: 5 }}>
            {PACKAGES.find(p => p.id === activePackage)?.desc} · npm · MIT
          </div>
        </div>

        {/* Component browser */}
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 8 }}>
          {/* list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {COMPONENTS.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setActiveComponent(i)}
                style={{
                  textAlign: "left",
                  fontSize: 10,
                  fontWeight: activeComponent === i ? 700 : 400,
                  padding: "3px 8px",
                  borderRadius: 5,
                  border: `1px solid ${activeComponent === i ? "#3b82f680" : "transparent"}`,
                  background: activeComponent === i ? "rgba(59,130,246,0.1)" : "transparent",
                  color: activeComponent === i ? "#3b82f6" : "var(--neutral-on-background-weak)",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {c.name}
              </button>
            ))}
          </div>
          {/* detail */}
          <div style={{
            background: "var(--neutral-background-medium, rgba(128,128,128,0.05))",
            border: "1px solid rgba(59,130,246,0.2)",
            borderRadius: 8,
            padding: "10px 12px",
            minHeight: 80,
          }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 6, alignItems: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--neutral-on-background-strong)" }}>{comp.name}</span>
              <span style={{
                fontSize: 9, fontWeight: 700, letterSpacing: "0.06em",
                padding: "2px 6px", borderRadius: 3,
                background: comp.type === "Agentic" ? "rgba(124,58,237,0.15)" : "rgba(59,130,246,0.12)",
                color: comp.type === "Agentic" ? "#7c3aed" : "#3b82f6",
                border: `1px solid ${comp.type === "Agentic" ? "rgba(124,58,237,0.3)" : "rgba(59,130,246,0.25)"}`,
              }}>
                {comp.type.toUpperCase()}
              </span>
            </div>
            <div style={{ fontSize: 10, color: "var(--neutral-on-background-weak)", lineHeight: 1.6, whiteSpace: "pre-line" }}>
              {comp.detail}
            </div>
          </div>
        </div>

        {/* Install strip */}
        <div
          onClick={handleCopy}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(0,0,0,0.06)",
            border: "1px solid rgba(128,128,128,0.18)",
            borderRadius: 7,
            padding: "6px 12px",
            cursor: "pointer",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 10.5, color: "var(--neutral-on-background-weak)" }}>
            <span style={{ color: "#22c55e" }}>$</span> pnpm add @aayurt/8848-ui-react @aayurt/8848-ui-core
          </span>
          <span style={{
            fontSize: 9, fontWeight: 600, letterSpacing: "0.05em", color: copied ? "#22c55e" : "#3b82f6",
            background: copied ? "rgba(34,197,94,0.12)" : "rgba(59,130,246,0.1)",
            border: `1px solid ${copied ? "rgba(34,197,94,0.3)" : "rgba(59,130,246,0.25)"}`,
            padding: "2px 7px", borderRadius: 4, transition: "all 0.15s",
          }}>
            {copied ? "COPIED ✓" : "COPY"}
          </span>
        </div>

      </div>
    </div>
  );
}

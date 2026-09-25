"use client";

import React, { useState } from "react";

interface NodeDetail {
  title: string;
  role: string;
  desc: string;
  tech: string[];
  metrics: string;
}

const AFNO_NODES: Record<string, NodeDetail> = {
  marketing: {
    title: "1. Discovery & Marketing Engine",
    role: "Multi-channel Fan Acquisition",
    desc: "Next.js 15 Web catalog + Flutter mobile app with FCM topic notifications (afno-app-tenant) driving instant community reach across 8+ UK cities.",
    tech: ["Next.js 15", "Flutter", "FCM Push", "SEO Marquee"],
    metrics: "8+ UK Cities · 0% Listing Fee",
  },
  checkout: {
    title: "2. Multi-Tier Stripe Ticketing",
    role: "Secure Payment & Tier Management",
    desc: "High-throughput checkout supporting General Admission, VIP tables, Early Bird, and Door entry tiers with automated tax and organiser commission calculation.",
    tech: ["Stripe Connect", "Payload Hooks", "PostgreSQL", "Atomic Locks"],
    metrics: "Sub-second Transaction · Zero Duplicate Tix",
  },
  issuance: {
    title: "3. Dynamic QR Code Ticket Issuing",
    role: "Cryptographic Ticket Delivery",
    desc: "Instant generation of HMAC-SHA256 tamper-proof QR code passes, delivered via Resend transactional emails, Apple Wallet pass links, and in-app offline tickets.",
    tech: ["HMAC-SHA256", "Resend API", "PDF Generator", "Apple PassKit"],
    metrics: "100% Deliverability · Anti-counterfeit",
  },
  scanner: {
    title: "4. Venue Door Scanner PWA",
    role: "Real-time Access Control",
    desc: "Dedicated organiser gate scanner (/organiser/door-scanner) enabling camera-based ticket validation with sub-second barcode decoding and offline caching.",
    tech: ["Camera Barcode API", "Zebra / Laser support", "PWA Cache", "WebSocket"],
    metrics: "< 0.8s Gate Scan · Double-entry Prevention",
  },
  dashboard: {
    title: "5. Promoter Studio & Analytics",
    role: "Multi-Tenant Organiser Insights",
    desc: "Self-service promoter portal with live attendance meters, real-time ticket sales tracking, tier capacity limits, and marketing campaign performance.",
    tech: ["Payload Multi-tenant", "Tailwind CSS", "Recharts", "Role Access"],
    metrics: "Real-time Capacity · Promoter Autonomy",
  },
};

export function AfnoPipeline() {
  const [selectedNode, setSelectedNode] = useState<string>("checkout");
  const [simStep, setSimStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activePlatform, setActivePlatform] = useState<"web" | "mobile" | "scanner">("web");

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(1);

    const steps = [
      { step: 1, node: "marketing", delay: 1000 },
      { step: 2, node: "checkout", delay: 2400 },
      { step: 3, node: "issuance", delay: 3800 },
      { step: 4, node: "scanner", delay: 5200 },
      { step: 5, node: "dashboard", delay: 6600 },
    ];

    steps.forEach(({ step, node, delay }) => {
      setTimeout(() => {
        setSimStep(step);
        setSelectedNode(node);
      }, delay);
    });

    setTimeout(() => {
      setIsSimulating(false);
      setSimStep(0);
    }, 7800);
  };

  const currentNode = AFNO_NODES[selectedNode] || AFNO_NODES.checkout;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        background: "var(--neutral-background-weak, rgba(128,128,128,0.04))",
        border: "1px solid var(--neutral-border-weak, rgba(128,128,128,0.15))",
        borderRadius: "16px",
        overflow: "hidden",
        fontSize: "13px",
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 18px",
          borderBottom: "1px solid var(--neutral-border-weak, rgba(128,128,128,0.12))",
          background: "var(--neutral-background-medium, rgba(128,128,128,0.06))",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              width: "9px",
              height: "9px",
              borderRadius: "50%",
              backgroundColor: "#e11d48",
              boxShadow: "0 0 10px #e11d48",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontWeight: 700,
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--neutral-on-background-strong)",
            }}
          >
            AFNO EVENTS · TICKETING & MARKETING ECOSYSTEM
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Platform View Switcher */}
          <div
            style={{
              display: "flex",
              background: "var(--neutral-background-weak, rgba(128,128,128,0.1))",
              borderRadius: "8px",
              padding: "2px",
              gap: "2px",
            }}
          >
            {(["web", "mobile", "scanner"] as const).map((platform) => (
              <button
                key={platform}
                onClick={() => {
                  setActivePlatform(platform);
                  if (platform === "web") setSelectedNode("marketing");
                  if (platform === "mobile") setSelectedNode("issuance");
                  if (platform === "scanner") setSelectedNode("scanner");
                }}
                style={{
                  padding: "4px 9px",
                  fontSize: "11px",
                  fontWeight: 600,
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  background:
                    activePlatform === platform
                      ? "#e11d48"
                      : "transparent",
                  color: activePlatform === platform ? "#ffffff" : "var(--neutral-on-background-weak)",
                  transition: "all 0.2s ease",
                }}
              >
                {platform === "web"
                  ? "🌐 Web App"
                  : platform === "mobile"
                  ? "📱 Mobile App"
                  : "🎟️ Door Scanner"}
              </button>
            ))}
          </div>

          <button
            onClick={runSimulation}
            disabled={isSimulating}
            style={{
              padding: "5px 12px",
              fontSize: "11px",
              fontWeight: 700,
              borderRadius: "7px",
              border: "1px solid rgba(225, 29, 72, 0.4)",
              background: isSimulating
                ? "rgba(225, 29, 72, 0.2)"
                : "rgba(225, 29, 72, 0.12)",
              color: "#e11d48",
              cursor: isSimulating ? "default" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              transition: "all 0.2s ease",
            }}
          >
            {isSimulating ? (
              <>
                <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⚙</span>
                Simulating Step {simStep}/5...
              </>
            ) : (
              <>▶ Run Ticket Flow</>
            )}
          </button>
        </div>
      </div>

      {/* SVG Pipeline Canvas */}
      <div style={{ padding: "16px 12px 6px", position: "relative" }}>
        <svg
          viewBox="0 0 860 210"
          style={{ width: "100%", height: "auto", overflow: "visible" }}
        >
          <defs>
            <linearGradient id="afnoLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e11d48" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
            </linearGradient>

            <filter id="afnoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Interconnecting flow lines */}
          <path
            d="M 140 75 L 205 75"
            stroke="var(--neutral-border-weak, rgba(128,128,128,0.3))"
            strokeWidth="2"
          />
          <path
            d="M 325 75 L 390 75"
            stroke="var(--neutral-border-weak, rgba(128,128,128,0.3))"
            strokeWidth="2"
          />
          <path
            d="M 510 75 L 575 75"
            stroke="var(--neutral-border-weak, rgba(128,128,128,0.3))"
            strokeWidth="2"
          />
          <path
            d="M 695 75 L 750 75"
            stroke="var(--neutral-border-weak, rgba(128,128,128,0.3))"
            strokeWidth="2"
          />

          {/* Active Flow Pulse Line */}
          {isSimulating && (
            <path
              d="M 75 75 L 265 75 L 450 75 L 635 75 L 805 75"
              stroke="url(#afnoLineGrad)"
              strokeWidth="3.5"
              fill="none"
              strokeDasharray="14 8"
              filter="url(#afnoGlow)"
              style={{
                strokeDashoffset: 100 - simStep * 25,
                transition: "stroke-dashoffset 0.8s ease-in-out",
              }}
            />
          )}

          {/* Return Feedback / Analytics Arc */}
          <path
            d="M 805 105 C 805 175, 450 175, 265 105"
            stroke="#8b5cf6"
            strokeWidth="1.5"
            strokeDasharray="5 4"
            fill="none"
            opacity="0.6"
          />
          <text
            x="535"
            y="172"
            fill="var(--neutral-on-background-weak)"
            fontSize="10"
            fontFamily="monospace"
            textAnchor="middle"
          >
            ↺ Real-time Sales & Capacity Telemetry to Promoter Dashboard
          </text>

          {/* NODE 1: Marketing & Discovery */}
          <g
            onClick={() => setSelectedNode("marketing")}
            style={{ cursor: "pointer" }}
            transform="translate(15, 30)"
          >
            <rect
              width="125"
              height="90"
              rx="12"
              fill={
                selectedNode === "marketing" || simStep === 1
                  ? "rgba(225, 29, 72, 0.12)"
                  : "var(--neutral-background-weak, rgba(128,128,128,0.06))"
              }
              stroke={
                selectedNode === "marketing" || simStep === 1
                  ? "#e11d48"
                  : "var(--neutral-border-weak, rgba(128,128,128,0.2))"
              }
              strokeWidth={selectedNode === "marketing" || simStep === 1 ? "2" : "1"}
            />
            <text x="62" y="28" fill="#e11d48" fontSize="18" textAnchor="middle">
              🌐 📱
            </text>
            <text
              x="62"
              y="50"
              fill="var(--neutral-on-background-strong)"
              fontSize="11"
              fontWeight="700"
              textAnchor="middle"
            >
              Discovery
            </text>
            <text
              x="62"
              y="68"
              fill="var(--neutral-on-background-weak)"
              fontSize="9"
              textAnchor="middle"
            >
              Web + Mobile App
            </text>
            <rect x="25" y="76" width="75" height="15" rx="4" fill="rgba(225, 29, 72, 0.2)" />
            <text x="62" y="87" fill="#e11d48" fontSize="8.5" fontWeight="600" textAnchor="middle">
              8+ UK Cities
            </text>
          </g>

          {/* NODE 2: Stripe Checkout */}
          <g
            onClick={() => setSelectedNode("checkout")}
            style={{ cursor: "pointer" }}
            transform="translate(205, 30)"
          >
            <rect
              width="120"
              height="90"
              rx="12"
              fill={
                selectedNode === "checkout" || simStep === 2
                  ? "rgba(99, 102, 241, 0.14)"
                  : "var(--neutral-background-weak, rgba(128,128,128,0.06))"
              }
              stroke={
                selectedNode === "checkout" || simStep === 2
                  ? "#6366f1"
                  : "var(--neutral-border-weak, rgba(128,128,128,0.2))"
              }
              strokeWidth={selectedNode === "checkout" || simStep === 2 ? "2" : "1"}
            />
            <text x="60" y="28" fill="#6366f1" fontSize="18" textAnchor="middle">
              💳
            </text>
            <text
              x="60"
              y="50"
              fill="var(--neutral-on-background-strong)"
              fontSize="11"
              fontWeight="700"
              textAnchor="middle"
            >
              Checkout
            </text>
            <text
              x="60"
              y="68"
              fill="var(--neutral-on-background-weak)"
              fontSize="9"
              textAnchor="middle"
            >
              Stripe Multi-Tier
            </text>
            <rect x="22" y="76" width="76" height="15" rx="4" fill="rgba(99, 102, 241, 0.2)" />
            <text x="60" y="87" fill="#6366f1" fontSize="8.5" fontWeight="600" textAnchor="middle">
              Zero Locking
            </text>
          </g>

          {/* NODE 3: Dynamic QR Ticket Issuance */}
          <g
            onClick={() => setSelectedNode("issuance")}
            style={{ cursor: "pointer" }}
            transform="translate(390, 30)"
          >
            <rect
              width="120"
              height="90"
              rx="12"
              fill={
                selectedNode === "issuance" || simStep === 3
                  ? "rgba(16, 185, 129, 0.14)"
                  : "var(--neutral-background-weak, rgba(128,128,128,0.06))"
              }
              stroke={
                selectedNode === "issuance" || simStep === 3
                  ? "#10b981"
                  : "var(--neutral-border-weak, rgba(128,128,128,0.2))"
              }
              strokeWidth={selectedNode === "issuance" || simStep === 3 ? "2" : "1"}
            />
            <text x="60" y="28" fill="#10b981" fontSize="18" textAnchor="middle">
              🎟️
            </text>
            <text
              x="60"
              y="50"
              fill="var(--neutral-on-background-strong)"
              fontSize="11"
              fontWeight="700"
              textAnchor="middle"
            >
              QR Ticket Issue
            </text>
            <text
              x="60"
              y="68"
              fill="var(--neutral-on-background-weak)"
              fontSize="9"
              textAnchor="middle"
            >
              HMAC Cryptographic
            </text>
            <rect x="22" y="76" width="76" height="15" rx="4" fill="rgba(16, 185, 129, 0.2)" />
            <text x="60" y="87" fill="#10b981" fontSize="8.5" fontWeight="600" textAnchor="middle">
              Resend + PDF
            </text>
          </g>

          {/* NODE 4: Door Scanner PWA */}
          <g
            onClick={() => setSelectedNode("scanner")}
            style={{ cursor: "pointer" }}
            transform="translate(575, 30)"
          >
            <rect
              width="120"
              height="90"
              rx="12"
              fill={
                selectedNode === "scanner" || simStep === 4
                  ? "rgba(245, 158, 11, 0.14)"
                  : "var(--neutral-background-weak, rgba(128,128,128,0.06))"
              }
              stroke={
                selectedNode === "scanner" || simStep === 4
                  ? "#f59e0b"
                  : "var(--neutral-border-weak, rgba(128,128,128,0.2))"
              }
              strokeWidth={selectedNode === "scanner" || simStep === 4 ? "2" : "1"}
            />
            <text x="60" y="28" fill="#f59e0b" fontSize="18" textAnchor="middle">
              📷
            </text>
            <text
              x="60"
              y="50"
              fill="var(--neutral-on-background-strong)"
              fontSize="11"
              fontWeight="700"
              textAnchor="middle"
            >
              Door Scanner
            </text>
            <text
              x="60"
              y="68"
              fill="var(--neutral-on-background-weak)"
              fontSize="9"
              textAnchor="middle"
            >
              Sub-second Access
            </text>
            <rect x="25" y="76" width="70" height="15" rx="4" fill="rgba(245, 158, 11, 0.2)" />
            <text x="60" y="87" fill="#f59e0b" fontSize="8.5" fontWeight="600" textAnchor="middle">
              &lt; 0.8s Check-in
            </text>
          </g>

          {/* NODE 5: Promoter Studio */}
          <g
            onClick={() => setSelectedNode("dashboard")}
            style={{ cursor: "pointer" }}
            transform="translate(750, 30)"
          >
            <rect
              width="95"
              height="90"
              rx="12"
              fill={
                selectedNode === "dashboard" || simStep === 5
                  ? "rgba(139, 92, 246, 0.14)"
                  : "var(--neutral-background-weak, rgba(128,128,128,0.06))"
              }
              stroke={
                selectedNode === "dashboard" || simStep === 5
                  ? "#8b5cf6"
                  : "var(--neutral-border-weak, rgba(128,128,128,0.2))"
              }
              strokeWidth={selectedNode === "dashboard" || simStep === 5 ? "2" : "1"}
            />
            <text x="47" y="28" fill="#8b5cf6" fontSize="18" textAnchor="middle">
              📊
            </text>
            <text
              x="47"
              y="50"
              fill="var(--neutral-on-background-strong)"
              fontSize="11"
              fontWeight="700"
              textAnchor="middle"
            >
              Analytics
            </text>
            <text
              x="47"
              y="68"
              fill="var(--neutral-on-background-weak)"
              fontSize="9"
              textAnchor="middle"
            >
              Live Capacity
            </text>
            <rect x="15" y="76" width="65" height="15" rx="4" fill="rgba(139, 92, 246, 0.2)" />
            <text x="47" y="87" fill="#8b5cf6" fontSize="8.5" fontWeight="600" textAnchor="middle">
              Multi-Tenant
            </text>
          </g>
        </svg>
      </div>

      {/* Selected Node Details Drawer */}
      <div
        style={{
          borderTop: "1px solid var(--neutral-border-weak, rgba(128,128,128,0.12))",
          background: "var(--neutral-background-medium, rgba(128,128,128,0.03))",
          padding: "14px 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div style={{ flex: "1 1 340px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontWeight: 700, color: "var(--neutral-on-background-strong)" }}>
              {currentNode.title}
            </span>
            <span
              style={{
                fontSize: "11px",
                padding: "2px 8px",
                borderRadius: "4px",
                background: "rgba(225, 29, 72, 0.12)",
                color: "#e11d48",
                fontWeight: 600,
              }}
            >
              {currentNode.role}
            </span>
          </div>
          <p
            style={{
              margin: 0,
              color: "var(--neutral-on-background-weak)",
              fontSize: "12px",
              lineHeight: 1.5,
            }}
          >
            {currentNode.desc}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
            {currentNode.tech.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: "10.5px",
                  padding: "2px 7px",
                  borderRadius: "4px",
                  border: "1px solid var(--neutral-border-weak, rgba(128,128,128,0.2))",
                  color: "var(--neutral-on-background-strong)",
                  fontFamily: "monospace",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#10b981" }}>
            ⚡ {currentNode.metrics}
          </span>
        </div>
      </div>
    </div>
  );
}

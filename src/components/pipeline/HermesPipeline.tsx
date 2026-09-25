"use client";

import React, { useState } from "react";

interface NodeDetail {
  title: string;
  desc: string;
  tags: string[];
}

const NODE_DETAILS: Record<string, NodeDetail> = {
  task: {
    title: "1. Task Intake & Analysis",
    desc: "Analyzes user request, repository AST, and project dependencies into an actionable specification.",
    tags: ["Issue", "Spec", "AST Analysis"],
  },
  planner: {
    title: "2. Hermes Planner (Brain)",
    desc: "Decomposes complex requests into a directed acyclic graph (DAG) of parallel subtasks with skill injection.",
    tags: ["DAG Planner", "Skills", "Memory"],
  },
  worker1: {
    title: "3a. Worker 01 (Dev & Test)",
    desc: "Executes test-driven development (TDD), generating tests and fixing code against failure outputs.",
    tags: ["TDD", "Jest / Vitest", "Logic"],
  },
  worker2: {
    title: "3b. Worker 02 (API Contract)",
    desc: "Updates schemas, Payload collections, GraphQL/REST endpoints, and type declarations.",
    tags: ["Payload CMS", "Types", "Contracts"],
  },
  worker3: {
    title: "3c. Worker 03 (Refactor)",
    desc: "Performs AST-level refactors, code deduplication, and dependency cleanups.",
    tags: ["Refactoring", "Clean Code", "AST"],
  },
  tools: {
    title: "4. Sandboxed Tool Integration",
    desc: "Runs operations inside isolated Docker containers using MCP (Model Context Protocol) and Git CLI.",
    tags: ["Docker Sandbox", "MCP Protocol", "Git"],
  },
  eval: {
    title: "5. Review & Evaluation Gate",
    desc: "Automated gate enforcing zero linter errors, passing test suites, and clean builds before merge.",
    tags: ["Lint Gate", "E2E Tests", "Typecheck"],
  },
  done: {
    title: "6. Production Merge (Done)",
    desc: "Atomic commit with work log verification, pushed to main branch with automated notification.",
    tags: ["Atomic Commit", "Origin Main", "Telegram Alert"],
  },
  retry: {
    title: "Self-Correction Loop",
    desc: "When verification fails, captures error stack traces and loops back to workers for automated healing.",
    tags: ["Self-Correction", "Feedback Loop", "Max Retries"],
  },
};

export function HermesPipeline() {
  const [activeNode, setActiveNode] = useState<string>("planner");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState<number>(0);

  const triggerSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(1);
    setActiveNode("task");

    const steps = [
      { step: 1, node: "task", delay: 700 },
      { step: 2, node: "planner", delay: 1400 },
      { step: 3, node: "worker1", delay: 2200 },
      { step: 4, node: "tools", delay: 3000 },
      { step: 5, node: "eval", delay: 3700 },
      { step: 6, node: "done", delay: 4500 },
    ];

    steps.forEach(({ step, node, delay }) => {
      setTimeout(() => {
        setSimStep(step);
        setActiveNode(node);
        if (step === 6) {
          setTimeout(() => {
            setIsSimulating(false);
            setSimStep(0);
          }, 1500);
        }
      }, delay);
    });
  };

  const selected = NODE_DETAILS[activeNode] || NODE_DETAILS.planner;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        borderRadius: "14px",
        overflow: "hidden",
        border: "1px solid var(--neutral-border-weak, rgba(128, 128, 128, 0.2))",
        background: "var(--neutral-background-weak, rgba(128, 128, 128, 0.04))",
        fontFamily: "var(--font-sans, inherit)",
      }}
    >
      {/* Top Controls Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 16px",
          borderBottom: "1px solid var(--neutral-border-weak, rgba(128, 128, 128, 0.15))",
          background: "var(--neutral-background-weak, rgba(128, 128, 128, 0.02))",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#06b6d4",
              boxShadow: "0 0 8px #06b6d4",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              fontFamily: "var(--font-code, monospace)",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--neutral-on-background-weak, #888)",
            }}
          >
            Multi-Agent Orchestration DAG
          </span>
        </div>

        <button
          onClick={triggerSimulation}
          disabled={isSimulating}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 10px",
            fontSize: "11px",
            fontWeight: 600,
            borderRadius: "6px",
            border: "1px solid var(--neutral-border-weak, rgba(128, 128, 128, 0.25))",
            background: isSimulating
              ? "rgba(6, 182, 212, 0.15)"
              : "var(--neutral-background-medium, rgba(128, 128, 128, 0.08))",
            color: isSimulating ? "#06b6d4" : "var(--neutral-on-background-strong, inherit)",
            cursor: isSimulating ? "default" : "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <span>{isSimulating ? "⚡ Simulating Run..." : "▶ Simulate Flow"}</span>
        </button>
      </div>

      {/* Main SVG Graph */}
      <div style={{ position: "relative", width: "100%", padding: "12px 8px" }}>
        <svg
          viewBox="0 0 540 270"
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          <defs>
            <linearGradient id="hermesGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
            </linearGradient>
            <filter id="hermesGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Connection Lines */}
          {/* Task -> Planner */}
          <path
            d="M 270 32 L 270 56"
            stroke="var(--neutral-border-strong, #06b6d4)"
            strokeWidth="2"
            strokeDasharray={isSimulating && simStep === 1 ? "4 3" : "none"}
            style={{ transition: "stroke 0.3s" }}
          />

          {/* Planner -> Workers (branching) */}
          <path
            d="M 270 94 L 110 120"
            stroke={simStep >= 3 ? "#06b6d4" : "var(--neutral-border-weak, rgba(128,128,128,0.3))"}
            strokeWidth="1.5"
            strokeDasharray={isSimulating && simStep === 2 ? "4 3" : "none"}
          />
          <path
            d="M 270 94 L 270 120"
            stroke={simStep >= 3 ? "#06b6d4" : "var(--neutral-border-weak, rgba(128,128,128,0.3))"}
            strokeWidth="1.5"
            strokeDasharray={isSimulating && simStep === 2 ? "4 3" : "none"}
          />
          <path
            d="M 270 94 L 430 120"
            stroke={simStep >= 3 ? "#06b6d4" : "var(--neutral-border-weak, rgba(128,128,128,0.3))"}
            strokeWidth="1.5"
            strokeDasharray={isSimulating && simStep === 2 ? "4 3" : "none"}
          />

          {/* Workers -> Tools (merging) */}
          <path
            d="M 110 156 L 270 178"
            stroke={simStep >= 4 ? "#8b5cf6" : "var(--neutral-border-weak, rgba(128,128,128,0.3))"}
            strokeWidth="1.5"
          />
          <path
            d="M 270 156 L 270 178"
            stroke={simStep >= 4 ? "#8b5cf6" : "var(--neutral-border-weak, rgba(128,128,128,0.3))"}
            strokeWidth="1.5"
          />
          <path
            d="M 430 156 L 270 178"
            stroke={simStep >= 4 ? "#8b5cf6" : "var(--neutral-border-weak, rgba(128,128,128,0.3))"}
            strokeWidth="1.5"
          />

          {/* Tools -> Eval */}
          <path
            d="M 270 206 L 270 220"
            stroke={simStep >= 5 ? "#10b981" : "var(--neutral-border-weak, rgba(128,128,128,0.3))"}
            strokeWidth="2"
          />

          {/* Eval -> Done (Right) */}
          <path
            d="M 330 236 L 415 236"
            stroke={simStep >= 6 ? "#10b981" : "var(--neutral-border-weak, rgba(128,128,128,0.3))"}
            strokeWidth="2"
          />

          {/* Eval -> Retry Loopback (Left to Planner) */}
          <path
            d="M 210 236 C 30 236, 30 75, 205 75"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            fill="none"
            opacity={activeNode === "retry" ? "1" : "0.5"}
          />
          <text
            x="48"
            y="155"
            fill="#f59e0b"
            fontSize="9"
            fontFamily="var(--font-code, monospace)"
            fontWeight="600"
          >
            ↺ Self-Correct Loop
          </text>

          {/* NODES */}

          {/* Node 1: Task Intake */}
          <g
            onClick={() => setActiveNode("task")}
            style={{ cursor: "pointer" }}
            transform="translate(200, 10)"
          >
            <rect
              width="140"
              height="24"
              rx="12"
              fill={activeNode === "task" ? "rgba(6, 182, 212, 0.2)" : "var(--neutral-background-medium, rgba(128,128,128,0.1))"}
              stroke={activeNode === "task" ? "#06b6d4" : "var(--neutral-border-weak, rgba(128,128,128,0.25))"}
              strokeWidth="1.5"
            />
            <text
              x="70"
              y="16"
              textAnchor="middle"
              fill="var(--neutral-on-background-strong, #fff)"
              fontSize="10"
              fontWeight="600"
              fontFamily="var(--font-code, monospace)"
            >
              Task: "Refactor API"
            </text>
          </g>

          {/* Node 2: Planner (Brain) */}
          <g
            onClick={() => setActiveNode("planner")}
            style={{ cursor: "pointer" }}
            transform="translate(195, 56)"
          >
            <rect
              width="150"
              height="38"
              rx="8"
              fill={activeNode === "planner" ? "rgba(6, 182, 212, 0.25)" : "var(--neutral-background-medium, rgba(128,128,128,0.1))"}
              stroke={activeNode === "planner" ? "#06b6d4" : "var(--neutral-border-weak, rgba(128,128,128,0.3))"}
              strokeWidth="1.5"
            />
            <text
              x="75"
              y="20"
              textAnchor="middle"
              fill="var(--neutral-on-background-strong, #fff)"
              fontSize="11"
              fontWeight="700"
            >
              🧠 Hermes Planner
            </text>
            <text
              x="75"
              y="32"
              textAnchor="middle"
              fill="var(--neutral-on-background-weak, #888)"
              fontSize="9"
              fontFamily="var(--font-code, monospace)"
            >
              DAG Decomposition
            </text>
          </g>

          {/* Node 3a: Worker 1 */}
          <g
            onClick={() => setActiveNode("worker1")}
            style={{ cursor: "pointer" }}
            transform="translate(45, 120)"
          >
            <rect
              width="130"
              height="36"
              rx="6"
              fill={activeNode === "worker1" ? "rgba(6, 182, 212, 0.2)" : "var(--neutral-background-medium, rgba(128,128,128,0.08))"}
              stroke={activeNode === "worker1" ? "#06b6d4" : "var(--neutral-border-weak, rgba(128,128,128,0.25))"}
              strokeWidth="1.2"
            />
            <text
              x="65"
              y="18"
              textAnchor="middle"
              fill="var(--neutral-on-background-strong, #fff)"
              fontSize="10"
              fontWeight="600"
            >
              Worker 01: Dev
            </text>
            <text
              x="65"
              y="30"
              textAnchor="middle"
              fill="var(--neutral-on-background-weak, #888)"
              fontSize="8.5"
              fontFamily="var(--font-code, monospace)"
            >
              Tests & Logic
            </text>
          </g>

          {/* Node 3b: Worker 2 */}
          <g
            onClick={() => setActiveNode("worker2")}
            style={{ cursor: "pointer" }}
            transform="translate(205, 120)"
          >
            <rect
              width="130"
              height="36"
              rx="6"
              fill={activeNode === "worker2" ? "rgba(139, 92, 246, 0.2)" : "var(--neutral-background-medium, rgba(128,128,128,0.08))"}
              stroke={activeNode === "worker2" ? "#8b5cf6" : "var(--neutral-border-weak, rgba(128,128,128,0.25))"}
              strokeWidth="1.2"
            />
            <text
              x="65"
              y="18"
              textAnchor="middle"
              fill="var(--neutral-on-background-strong, #fff)"
              fontSize="10"
              fontWeight="600"
            >
              Worker 02: API
            </text>
            <text
              x="65"
              y="30"
              textAnchor="middle"
              fill="var(--neutral-on-background-weak, #888)"
              fontSize="8.5"
              fontFamily="var(--font-code, monospace)"
            >
              Payload Contracts
            </text>
          </g>

          {/* Node 3c: Worker 3 */}
          <g
            onClick={() => setActiveNode("worker3")}
            style={{ cursor: "pointer" }}
            transform="translate(365, 120)"
          >
            <rect
              width="130"
              height="36"
              rx="6"
              fill={activeNode === "worker3" ? "rgba(6, 182, 212, 0.2)" : "var(--neutral-background-medium, rgba(128,128,128,0.08))"}
              stroke={activeNode === "worker3" ? "#06b6d4" : "var(--neutral-border-weak, rgba(128,128,128,0.25))"}
              strokeWidth="1.2"
            />
            <text
              x="65"
              y="18"
              textAnchor="middle"
              fill="var(--neutral-on-background-strong, #fff)"
              fontSize="10"
              fontWeight="600"
            >
              Worker 03: AST
            </text>
            <text
              x="65"
              y="30"
              textAnchor="middle"
              fill="var(--neutral-on-background-weak, #888)"
              fontSize="8.5"
              fontFamily="var(--font-code, monospace)"
            >
              Refactor & Clean
            </text>
          </g>

          {/* Node 4: Tools (MCP / Docker) */}
          <g
            onClick={() => setActiveNode("tools")}
            style={{ cursor: "pointer" }}
            transform="translate(195, 178)"
          >
            <rect
              width="150"
              height="28"
              rx="6"
              fill={activeNode === "tools" ? "rgba(139, 92, 246, 0.25)" : "var(--neutral-background-medium, rgba(128,128,128,0.1))"}
              stroke={activeNode === "tools" ? "#8b5cf6" : "var(--neutral-border-weak, rgba(128,128,128,0.25))"}
              strokeWidth="1.2"
            />
            <text
              x="75"
              y="18"
              textAnchor="middle"
              fill="var(--neutral-on-background-strong, #fff)"
              fontSize="9.5"
              fontWeight="600"
              fontFamily="var(--font-code, monospace)"
            >
              ⚡ Docker + MCP Tools
            </text>
          </g>

          {/* Node 5: Evaluation Gate */}
          <g
            onClick={() => setActiveNode("eval")}
            style={{ cursor: "pointer" }}
            transform="translate(210, 220)"
          >
            <rect
              width="120"
              height="32"
              rx="6"
              fill={activeNode === "eval" ? "rgba(16, 185, 129, 0.25)" : "var(--neutral-background-medium, rgba(128,128,128,0.1))"}
              stroke={activeNode === "eval" ? "#10b981" : "var(--neutral-border-weak, rgba(128,128,128,0.25))"}
              strokeWidth="1.5"
            />
            <text
              x="60"
              y="16"
              textAnchor="middle"
              fill="var(--neutral-on-background-strong, #fff)"
              fontSize="10"
              fontWeight="700"
            >
              Eval Gate
            </text>
            <text
              x="60"
              y="27"
              textAnchor="middle"
              fill="var(--neutral-on-background-weak, #888)"
              fontSize="8"
              fontFamily="var(--font-code, monospace)"
            >
              Lint · Test · Build
            </text>
          </g>

          {/* Node 6: Done (Pass) */}
          <g
            onClick={() => setActiveNode("done")}
            style={{ cursor: "pointer" }}
            transform="translate(415, 220)"
          >
            <rect
              width="105"
              height="32"
              rx="6"
              fill={activeNode === "done" ? "rgba(16, 185, 129, 0.3)" : "rgba(16, 185, 129, 0.1)"}
              stroke="#10b981"
              strokeWidth="1.5"
            />
            <text
              x="52"
              y="20"
              textAnchor="middle"
              fill="#10b981"
              fontSize="10"
              fontWeight="700"
            >
              ✓ Done (Main)
            </text>
          </g>
        </svg>
      </div>

      {/* Interactive Node Inspector Drawer */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          padding: "10px 16px",
          borderTop: "1px solid var(--neutral-border-weak, rgba(128, 128, 128, 0.15))",
          background: "var(--neutral-background-weak, rgba(128, 128, 128, 0.02))",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--neutral-on-background-strong, inherit)",
            }}
          >
            {selected.title}
          </span>
          <div style={{ display: "flex", gap: "4px" }}>
            {selected.tags.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: "9px",
                  fontFamily: "var(--font-code, monospace)",
                  padding: "1px 6px",
                  borderRadius: "4px",
                  background: "var(--neutral-background-medium, rgba(128, 128, 128, 0.1))",
                  border: "1px solid var(--neutral-border-weak, rgba(128, 128, 128, 0.2))",
                  color: "var(--neutral-on-background-weak, #888)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <p
          style={{
            margin: 0,
            fontSize: "11.5px",
            lineHeight: "1.4",
            color: "var(--neutral-on-background-weak, #888)",
          }}
        >
          {selected.desc}
        </p>
      </div>
    </div>
  );
}

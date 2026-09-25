"use client";

import React, { useState } from "react";

interface NodeDetail {
  title: string;
  desc: string;
  tags: string[];
}

const NODE_DETAILS: Record<string, NodeDetail> = {
  task: {
    title: "Task Specification",
    desc: "Autonomous prompt intake parsed from issues or chat with context and verification criteria.",
    tags: ["Goal Decomposition", "Context Injection"],
  },
  planner: {
    title: "Hermes Orchestrator",
    desc: "Central planner engine that analyzes repo structure and splits tasks into a parallel DAG.",
    tags: ["Task Tree", "Dependency Graph", "OpenClaw"],
  },
  worker1: {
    title: "Worker 01: Dev + Tests",
    desc: "Isolated container implementing feature logic and accompanying unit tests.",
    tags: ["TDD", "Nemotron-3.5", "TypeScript"],
  },
  worker2: {
    title: "Worker 02: API Contract",
    desc: "Handles payload schemas, REST/RPC endpoints, and database migrations.",
    tags: ["Payload CMS", "PostgreSQL", "TypeCheck"],
  },
  worker3: {
    title: "Worker N: Refactor & Docs",
    desc: "Parallel cleanup, code style enforcement, and architecture documentation.",
    tags: ["Linter", "AST Clean", "Docs"],
  },
  tools: {
    title: "Tool & Sandbox Layer",
    desc: "Isolated execution environment ensuring zero host pollution with standard tool protocols.",
    tags: ["MCP Protocol", "Docker Sandboxing", "Git CLI"],
  },
  eval: {
    title: "Evaluation & Verification Gate",
    desc: "Deterministic verification running builds, test suites, and strict lint checks before commit.",
    tags: ["Automated Review", "Self-Correction", "CI Pass"],
  },
  done: {
    title: "Merged Artifact",
    desc: "Clean git commit pushed to main with verified pass@1 criteria and benchmark metrics.",
    tags: ["Production Ready", "Git Push"],
  },
  retry: {
    title: "Self-Correction Feedback Loop",
    desc: "Captures error logs, AST diagnostics, and stack traces to feed back into workers for iteration.",
    tags: ["Error Recovery", "Max 3 Retries"],
  },
};

export function HermesPipeline() {
  const [activeNode, setActiveNode] = useState<string>("planner");
  const [isSimulating, setIsSimulating] = useState(false);

  const activeDetail = NODE_DETAILS[activeNode] || NODE_DETAILS.planner;

  const triggerSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 2400);
  };

  return (
    <div className="w-full flex flex-col items-center bg-[#0d1117] rounded-xl border border-white/10 p-3 text-xs select-none overflow-hidden relative shadow-2xl">
      {/* Background Subtle Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(#38bdf8 0.75px, transparent 0.75px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Top Controls Header */}
      <div className="w-full flex items-center justify-between pb-2 mb-1 border-b border-white/10 z-10">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
            Agentic Pipeline Loop
          </span>
        </div>
        <button
          onClick={triggerSimulation}
          className="px-2 py-0.5 rounded bg-sky-500/10 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 font-mono text-[10px] transition-all flex items-center gap-1"
        >
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${isSimulating ? "bg-amber-400 animate-ping" : "bg-sky-400"}`} />
          {isSimulating ? "Running..." : "Simulate"}
        </button>
      </div>

      {/* Main SVG Architecture Diagram */}
      <svg
        viewBox="0 0 380 240"
        className="w-full h-auto max-h-[230px] z-10 overflow-visible"
      >
        <defs>
          <linearGradient id="hermesBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Dynamic Connection Lines with Flowing Dash Animation */}
        <g stroke="currentColor" fill="none" className="text-white/20">
          {/* Task -> Planner */}
          <line x1="190" y1="28" x2="190" y2="48" stroke="#38bdf8" strokeWidth="1.5" />
          
          {/* Planner -> 3 Workers */}
          <path d="M190 74 L190 85 L70 85 L70 98" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray={isSimulating ? "4 4" : "none"} className={isSimulating ? "animate-[dash_1s_linear_infinite]" : ""} />
          <path d="M190 74 L190 98" stroke="#818cf8" strokeWidth="1.2" strokeDasharray={isSimulating ? "4 4" : "none"} className={isSimulating ? "animate-[dash_1s_linear_infinite]" : ""} />
          <path d="M190 74 L190 85 L310 85 L310 98" stroke="#a855f7" strokeWidth="1.2" strokeDasharray={isSimulating ? "4 4" : "none"} className={isSimulating ? "animate-[dash_1s_linear_infinite]" : ""} />

          {/* 3 Workers -> Tools */}
          <path d="M70 126 L70 138 L190 138" stroke="#38bdf8" strokeWidth="1.2" />
          <path d="M190 126 L190 148" stroke="#818cf8" strokeWidth="1.2" />
          <path d="M310 126 L310 138 L190 138" stroke="#a855f7" strokeWidth="1.2" />

          {/* Tools -> Evaluation */}
          <line x1="190" y1="168" x2="190" y2="182" stroke="#60a5fa" strokeWidth="1.5" />

          {/* Evaluation -> Done */}
          <line x1="240" y1="195" x2="285" y2="195" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Evaluation -> Retry Feedback Loop */}
          <path
            d="M140 195 L25 195 L25 60 L140 60"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            className="animate-[pulse_2s_ease-in-out_infinite]"
          />
        </g>

        {/* 1. Task Intake Node */}
        <g 
          onClick={() => setActiveNode("task")}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <rect x="125" y="8" width="130" height="20" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth={activeNode === "task" ? "2" : "1"} />
          <text x="190" y="22" fill="#93c5fd" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
            Task: "Refactor & Tests"
          </text>
        </g>

        {/* 2. Planner / Brain (Hermes) */}
        <g 
          onClick={() => setActiveNode("planner")}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <rect x="135" y="48" width="110" height="26" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth={activeNode === "planner" ? "2" : "1"} filter={activeNode === "planner" ? "url(#glow)" : ""} />
          <text x="190" y="65" fill="#e0e7ff" fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="sans-serif">
            🧠 Planner / Brain
          </text>
        </g>

        {/* 3. Parallel Workers */}
        {/* Worker 1 */}
        <g 
          onClick={() => setActiveNode("worker1")}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <rect x="15" y="98" width="110" height="28" rx="5" fill="#0f172a" stroke="#38bdf8" strokeWidth={activeNode === "worker1" ? "2" : "1"} />
          <text x="70" y="111" fill="#7dd3fc" fontSize="9" textAnchor="middle" fontWeight="bold">
            Worker 1 (Dev)
          </text>
          <text x="70" y="121" fill="#94a3b8" fontSize="7.5" textAnchor="middle">
            Unit Tests + Logic
          </text>
        </g>

        {/* Worker 2 */}
        <g 
          onClick={() => setActiveNode("worker2")}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <rect x="135" y="98" width="110" height="28" rx="5" fill="#0f172a" stroke="#818cf8" strokeWidth={activeNode === "worker2" ? "2" : "1"} />
          <text x="190" y="111" fill="#c7d2fe" fontSize="9" textAnchor="middle" fontWeight="bold">
            Worker 2 (API)
          </text>
          <text x="190" y="121" fill="#94a3b8" fontSize="7.5" textAnchor="middle">
            Payload Contracts
          </text>
        </g>

        {/* Worker 3 */}
        <g 
          onClick={() => setActiveNode("worker3")}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <rect x="255" y="98" width="110" height="28" rx="5" fill="#0f172a" stroke="#a855f7" strokeWidth={activeNode === "worker3" ? "2" : "1"} />
          <text x="310" y="111" fill="#e9d5ff" fontSize="9" textAnchor="middle" fontWeight="bold">
            Worker N (Refactor)
          </text>
          <text x="310" y="121" fill="#94a3b8" fontSize="7.5" textAnchor="middle">
            AST + Typings
          </text>
        </g>

        {/* 4. Tool & Sandbox Layer */}
        <g 
          onClick={() => setActiveNode("tools")}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <rect x="110" y="148" width="160" height="20" rx="4" fill="#090d16" stroke="#64748b" strokeWidth={activeNode === "tools" ? "2" : "1"} />
          <text x="190" y="162" fill="#cbd5e1" fontSize="8.5" textAnchor="middle" fontFamily="monospace">
            Tools: MCP · Docker · Git
          </text>
        </g>

        {/* 5. Evaluation Gate */}
        <g 
          onClick={() => setActiveNode("eval")}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <rect x="140" y="182" width="100" height="26" rx="6" fill="#172554" stroke="#60a5fa" strokeWidth={activeNode === "eval" ? "2" : "1"} />
          <text x="190" y="198" fill="#bfdbfe" fontSize="9" textAnchor="middle" fontWeight="bold">
            Review & Eval
          </text>
        </g>

        {/* 6. Success (Done) */}
        <g 
          onClick={() => setActiveNode("done")}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <rect x="290" y="182" width="75" height="26" rx="13" fill="#064e3b" stroke="#34d399" strokeWidth={activeNode === "done" ? "2" : "1"} />
          <text x="327" y="198" fill="#a7f3d0" fontSize="9" textAnchor="middle" fontWeight="bold">
            ✓ Done
          </text>
        </g>

        {/* 7. Retry Badge on Feedback Loop */}
        <g 
          onClick={() => setActiveNode("retry")}
          className="cursor-pointer"
        >
          <rect x="10" y="125" width="46" height="15" rx="3" fill="#451a03" stroke="#f59e0b" strokeWidth="1" />
          <text x="33" y="136" fill="#fde68a" fontSize="7.5" textAnchor="middle" fontWeight="bold">
            ↺ Retry
          </text>
        </g>
      </svg>

      {/* Interactive Tooltip Inspector Bar */}
      <div className="w-full mt-2 pt-2 border-t border-white/10 z-10 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-white/90 text-[11px]">
            {activeDetail.title}
          </span>
          <div className="flex gap-1">
            {activeDetail.tags.map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 rounded bg-white/5 text-[9px] font-mono text-white/60 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="text-[10px] text-white/60 leading-relaxed">
          {activeDetail.desc}
        </p>
      </div>
    </div>
  );
}

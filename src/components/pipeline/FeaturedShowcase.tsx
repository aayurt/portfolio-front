"use client";

import React from "react";
import Link from "next/link";
import { HermesPipeline } from "./HermesPipeline";
import { SyasyahPipeline } from "./SyasyahPipeline";
import { AstroPipeline } from "./AstroPipeline";

interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
}

interface MetricItem {
  val: string;
  label: string;
}

interface ShowcaseProject {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  tags: string[];
  description: string;
  component: React.ReactNode;
  features: FeatureItem[];
  metrics: MetricItem[];
  highlights: string[];
  caseStudyUrl: string;
  specUrl?: string;
  specLabel?: string;
}

const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: "astro-guru",
    slug: "astro-guru",
    title: "Astro Guru",
    subtitle: "AI-powered astrology assistant for personalized birth chart insights and guidance.",
    tags: ["AI Product", "Full-Stack", "Astrology"],
    description:
      "Astro Guru generates accurate Vedic natal charts and planetary profiles from birth coordinates. It transforms complex astrological calculations into intuitive, human-friendly insights and provides a context-grounded AI conversational companion for life decisions.",
    component: <AstroPipeline />,
    features: [
      {
        icon: "📊",
        title: "Personalized Natal Charts",
        desc: "Vedic D1 calculation with planetary houses & aspects.",
      },
      {
        icon: "💬",
        title: "Conversational AI",
        desc: "Ask life questions contextualized to your exact chart.",
      },
      {
        icon: "🪐",
        title: "Planetary Reasoning",
        desc: "Context-aware interpretations across transits & houses.",
      },
      {
        icon: "✨",
        title: "Human-friendly Insights",
        desc: "Actionable, clear guidance without arcane jargon.",
      },
    ],
    metrics: [
      { val: "5K+", label: "Active users" },
      { val: "< 2s", label: "Response time" },
      { val: "99.9%", label: "Uptime" },
    ],
    highlights: [
      "Translates complex celestial data into clear, human-friendly insights.",
      "Guides users across relationships, career, and personal growth.",
    ],
    caseStudyUrl: "/work/astro-guru",
  },
  {
    id: "syasyah-samaj",
    slug: "syasyah-samaj",
    title: "Syasyah Samaj",
    subtitle: "Digital platform for the Newar community in Nepal.",
    tags: ["Community Platform", "Systems", "Web"],
    description:
      "A high-availability platform designed for the Newar community in Yala, Nepal. Featuring an offline-first SPA architecture with IndexedDB caching, full trilingual localization, and a comprehensive ledger for community accounting, civic records, and heritage archives.",
    component: <SyasyahPipeline />,
    features: [
      {
        icon: "🌐",
        title: "Trilingual Localization",
        desc: "Native English, Nepali (नेपाली), and Newari support.",
      },
      {
        icon: "⚡",
        title: "Offline-First SPA",
        desc: "IndexedDB cache-first architecture with zero-delay reads.",
      },
      {
        icon: "🏛️",
        title: "Digital Heritage Archive",
        desc: "Community history, guthi lineage, and cultural preservation.",
      },
      {
        icon: "📜",
        title: "Accounting & Member Ledger",
        desc: "Civic organization, dual-entry records, and engagement.",
      },
    ],
    metrics: [
      { val: "1K+", label: "Community members" },
      { val: "3", label: "Languages supported" },
      { val: "99.9%", label: "Uptime" },
    ],
    highlights: [
      "Preserves cultural heritage and digitizes ancestral community records.",
      "Reliable offline access for areas with intermittent network connectivity.",
    ],
    caseStudyUrl: "/work/syasyah-samaj",
  },
  {
    id: "hermes",
    slug: "hermes",
    title: "Hermes",
    subtitle: "Multi-agent engineering system for autonomous development workflows.",
    tags: ["Agentic AI", "Research", "Developer Infrastructure"],
    description:
      "An autonomous software engineering framework with multi-agent orchestration. A central planner decomposes tasks into parallel worker pipelines operating in isolated Docker sandboxes, verified by automated evaluation gates and self-correcting retry loops.",
    component: <HermesPipeline />,
    features: [
      {
        icon: "🧠",
        title: "Multi-Agent Orchestration",
        desc: "DAG-based planner with parallel execution workers.",
      },
      {
        icon: "📦",
        title: "Sandboxed Execution",
        desc: "Isolated container environments with strict security bounds.",
      },
      {
        icon: "🔌",
        title: "Standard Tool Protocols",
        desc: "MCP, language server AST parsers, Git, and Docker CLI.",
      },
      {
        icon: "🔄",
        title: "Evaluation & Retry Loop",
        desc: "Deterministic test/lint gate with self-correcting feedback.",
      },
    ],
    metrics: [
      { val: "10K+", label: "Requests/day" },
      { val: "< 50ms", label: "Latency" },
      { val: "99.9%", label: "Uptime" },
    ],
    highlights: [
      "Converts high-level specs into verified, production-ready code.",
      "Self-corrects compilation and test failures with bounded retry loops.",
    ],
    caseStudyUrl: "/work/hermes",
    specUrl: "https://github.com/aayurt",
    specLabel: "Architecture Spec ↗",
  },
];

export function FeaturedShowcase() {
  return (
    <section className="w-full flex flex-col gap-8 py-8">
      {/* Section Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold">
            Featured Systems & Products
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white/95">
          Engineered for Reliability & Scale
        </h2>
        <p className="text-sm text-white/60 max-w-2xl leading-relaxed">
          Production systems spanning autonomous agentic infrastructure, offline-first civic platforms, and domain-specific generative AI engines.
        </p>
      </div>

      {/* 3-Column Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-stretch">
        {SHOWCASE_PROJECTS.map((project) => (
          <div
            key={project.id}
            className="flex flex-col justify-between bg-[#12161f] border border-white/10 hover:border-white/20 transition-all rounded-2xl overflow-hidden p-5 gap-5 shadow-xl group"
          >
            {/* Top Half: Visual Pipeline + Headers */}
            <div className="flex flex-col gap-4">
              {/* Interactive Visual Header */}
              <div className="w-full overflow-hidden rounded-xl">
                {project.component}
              </div>

              {/* Pill Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-white/5 border border-white/10 text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title & Subtitle */}
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-white/95 tracking-tight group-hover:text-sky-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-white/60 leading-snug">
                  {project.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-white/70 leading-relaxed font-sans">
                {project.description}
              </p>

              {/* 2x2 Capabilities Matrix */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                {project.features.map((feat) => (
                  <div
                    key={feat.title}
                    className="flex flex-col gap-1 p-2.5 rounded-lg bg-white/[0.03] border border-white/5"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs">{feat.icon}</span>
                      <span className="text-[11px] font-semibold text-white/90 truncate">
                        {feat.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-white/50 leading-tight">
                      {feat.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Half: Metrics + Value Points + CTA */}
            <div className="flex flex-col gap-4 pt-3 border-t border-white/10">
              {/* 3 Metrics Row */}
              <div className="grid grid-cols-3 gap-2 py-1 text-center bg-white/[0.02] border border-white/5 rounded-xl p-2">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="flex flex-col">
                    <span className="text-sm font-bold font-mono text-white/95 tracking-tight">
                      {metric.val}
                    </span>
                    <span className="text-[9px] text-white/50 leading-tight">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bullet Highlights */}
              <ul className="flex flex-col gap-1.5 text-[11px] text-white/70 list-disc list-inside leading-snug">
                {project.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>

              {/* Actions & Links */}
              <div className="flex items-center justify-between pt-1">
                <Link
                  href={project.caseStudyUrl}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors group/link"
                >
                  <span>
                    {project.id === "hermes" ? "Research / Case study" : "Case study"}
                  </span>
                  <span className="transition-transform group-hover/link:translate-x-1">
                    →
                  </span>
                </Link>

                {project.specUrl && (
                  <a
                    href={project.specUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-mono text-white/50 hover:text-white/80 transition-colors underline underline-offset-4"
                  >
                    {project.specLabel || "Spec ↗"}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

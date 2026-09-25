"use client";

import React, { useState } from "react";

export function SyasyahPipeline() {
  const [selectedLang, setSelectedLang] = useState<"en" | "ne" | "new">("ne");
  const [activeLayer, setActiveLayer] = useState<string>("cache");

  const langStrings = {
    en: {
      headline: "Syasyah Samaj",
      sub: "Newar Community Platform",
      badge: "Community Accounting & Archives",
      action: "Offline Ready",
    },
    ne: {
      headline: "स्यस्यः समाज",
      sub: "नेवार समुदायको डिजिटल मञ्च",
      badge: "सामुदायिक लेखा र अभिलेख",
      action: "अफलाइन सक्षम",
    },
    new: {
      headline: "स्यस्यः गुथि",
      sub: "नेवाः समाजया डिजिटलाइजेसन",
      badge: "दँया ल्याखं व अभिलेख",
      action: "इन्टरनेट म्वाय्कं ज्या जुइगु",
    },
  };

  const current = langStrings[selectedLang];

  return (
    <div className="w-full flex flex-col items-center bg-[#0d1117] rounded-xl border border-white/10 p-3 text-xs select-none overflow-hidden relative shadow-2xl">
      {/* Background Subtle Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(#ec4899 0.75px, transparent 0.75px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Top Header & Language Switcher */}
      <div className="w-full flex items-center justify-between pb-2 mb-1 border-b border-white/10 z-10">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="font-mono text-[11px] font-semibold text-rose-400 uppercase tracking-wider">
            Offline-First Architecture
          </span>
        </div>
        <div className="flex gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10">
          {(["en", "ne", "new"] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLang(lang)}
              className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition-all ${
                selectedLang === lang
                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                  : "text-white/40 hover:text-white/80"
              }`}
            >
              {lang === "en" ? "EN" : lang === "ne" ? "नेपाली" : "Newari"}
            </button>
          ))}
        </div>
      </div>

      {/* SVG System Architecture & Mobile Mockup */}
      <svg
        viewBox="0 0 380 230"
        className="w-full h-auto max-h-[220px] z-10 overflow-visible"
      >
        <defs>
          <linearGradient id="syasyahGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
        </defs>

        {/* Connectors */}
        <g stroke="currentColor" fill="none" className="text-white/20">
          <path d="M70 110 L100 110" stroke="#f43f5e" strokeWidth="1.5" />
          <path d="M190 70 L210 70 L210 110 L230 110" stroke="#fb7185" strokeWidth="1.2" />
          <path d="M190 110 L230 110" stroke="#ec4899" strokeWidth="1.2" />
          <path d="M190 150 L210 150 L210 110 L230 110" stroke="#d946ef" strokeWidth="1.2" />
        </g>

        {/* 1. Client / User Node */}
        <g 
          onClick={() => setActiveLayer("client")}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <rect x="10" y="85" width="60" height="50" rx="8" fill="#18181b" stroke="#f43f5e" strokeWidth={activeLayer === "client" ? "2" : "1"} />
          <text x="40" y="107" fill="#fda4af" fontSize="14" textAnchor="middle">👥</text>
          <text x="40" y="124" fill="#fecdd3" fontSize="8" textAnchor="middle" fontWeight="bold">Users</text>
        </g>

        {/* 2. Middle Stack: Next.js + IndexedDB + Payload */}
        <g 
          onClick={() => setActiveLayer("nextjs")}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <rect x="100" y="55" width="90" height="28" rx="6" fill="#1c1917" stroke="#fb7185" strokeWidth={activeLayer === "nextjs" ? "2" : "1"} />
          <text x="145" y="72" fill="#fff" fontSize="8.5" textAnchor="middle" fontWeight="bold">
            Next.js Frontend
          </text>
        </g>

        <g 
          onClick={() => setActiveLayer("cache")}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <rect x="100" y="96" width="90" height="28" rx="6" fill="#271c24" stroke="#ec4899" strokeWidth={activeLayer === "cache" ? "2" : "1"} />
          <text x="145" y="113" fill="#f472b6" fontSize="8.5" textAnchor="middle" fontWeight="bold">
            ⚡ IndexedDB Cache
          </text>
        </g>

        <g 
          onClick={() => setActiveLayer("backend")}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <rect x="100" y="136" width="90" height="28" rx="6" fill="#1c1917" stroke="#d946ef" strokeWidth={activeLayer === "backend" ? "2" : "1"} />
          <text x="145" y="153" fill="#e879f9" fontSize="8.5" textAnchor="middle" fontWeight="bold">
            Payload CMS 3.75
          </text>
        </g>

        {/* 3. Database Node */}
        <g 
          onClick={() => setActiveLayer("db")}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <rect x="100" y="174" width="90" height="24" rx="4" fill="#090d16" stroke="#64748b" strokeWidth={activeLayer === "db" ? "2" : "1"} />
          <text x="145" y="189" fill="#cbd5e1" fontSize="8" textAnchor="middle" fontFamily="monospace">
            PostgreSQL DB
          </text>
        </g>

        {/* 4. Phone Mockup Displaying Live i18n */}
        <g transform="translate(235, 15)">
          {/* Phone Shell */}
          <rect x="0" y="0" width="130" height="195" rx="14" fill="#121214" stroke="#3f3f46" strokeWidth="2" />
          <rect x="5" y="5" width="120" height="185" rx="10" fill="#18181b" />
          {/* Notch */}
          <rect x="42" y="8" width="46" height="5" rx="2.5" fill="#27272a" />
          
          {/* Screen Content */}
          <rect x="12" y="24" width="106" height="42" rx="6" fill="#271b26" stroke="#f43f5e" strokeWidth="0.75" />
          <text x="65" y="42" fill="#fda4af" fontSize="9" textAnchor="middle" fontWeight="bold">
            {current.headline}
          </text>
          <text x="65" y="55" fill="#fecdd3" fontSize="6.5" textAnchor="middle">
            {current.sub}
          </text>

          {/* Member Card */}
          <rect x="12" y="74" width="106" height="32" rx="4" fill="#27272a" />
          <circle cx="26" cy="90" r="7" fill="#fb7185" />
          <rect x="38" y="85" width="60" height="4" rx="2" fill="#a1a1aa" />
          <rect x="38" y="92" width="40" height="3" rx="1.5" fill="#71717a" />

          {/* Badge */}
          <rect x="12" y="114" width="106" height="20" rx="4" fill="#1e293b" />
          <text x="65" y="127" fill="#38bdf8" fontSize="6.5" textAnchor="middle" fontWeight="bold">
            {current.action}
          </text>

          {/* Languages pill bar */}
          <rect x="12" y="142" width="106" height="16" rx="3" fill="#090d16" />
          <text x="65" y="153" fill="#cbd5e1" fontSize="6" textAnchor="middle">
            EN · नेपाली · Newari
          </text>
        </g>
      </svg>

      {/* Info bar */}
      <div className="w-full mt-2 pt-2 border-t border-white/10 z-10 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-white/90 text-[11px]">
            {activeLayer === "cache"
              ? "Cache-First Architecture (useCachedList)"
              : activeLayer === "client"
              ? "Localized PWA & Civic Members"
              : activeLayer === "nextjs"
              ? "Next.js SSR + Client Routing"
              : activeLayer === "db"
              ? "PostgreSQL Relational Storage"
              : "Payload CMS 3.75 Multi-tenant"}
          </span>
          <span className="px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-300 text-[9px] font-mono border border-rose-500/20">
            0ms Latency on Cached Read
          </span>
        </div>
        <p className="text-[10px] text-white/60 leading-relaxed">
          {activeLayer === "cache"
            ? "Offline-first SPA reads instantly from IndexedDB before syncing with remote Postgres in the background."
            : "Multi-tenant system serving community management, accounting ledger, and cultural archives in three languages."}
        </p>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";

interface Ilaka {
  id: number;
  name: string;
  nameNe: string;
  wards: string;
  center: string;
  activeMembers: number;
}

const ILAKAS: Ilaka[] = [
  { id: 1, name: "Ilaka 1", nameNe: "इलाका १ (मंगलबजार / दरबार)", wards: "Ward 1, 2", center: "Mangal Bazaar", activeMembers: 420 },
  { id: 2, name: "Ilaka 2", nameNe: "इलाका २ (पुल्चोक / दमकल)", wards: "Ward 3, 4", center: "Pulchowk", activeMembers: 380 },
  { id: 3, name: "Ilaka 3", nameNe: "इलाका ३ (जावलाखेल / लगनखेल)", wards: "Ward 5, 12", center: "Jawalakhel", activeMembers: 510 },
  { id: 4, name: "Ilaka 4", nameNe: "इलाका ४ (पाटनढोका / पिम्बहाल)", wards: "Ward 6, 7", center: "Patandhoka", activeMembers: 340 },
  { id: 5, name: "Ilaka 5", nameNe: "इलाका ५ (सुन्धारा / च्यासल)", wards: "Ward 8, 9", center: "Sundhara", activeMembers: 460 },
  { id: 6, name: "Ilaka 6", nameNe: "इलाका ६ (कुपोण्डोल / सानेपा)", wards: "Ward 10, 11", center: "Kupondole", activeMembers: 290 },
  { id: 7, name: "Ilaka 7", nameNe: "इलाका ७ (ल्होँसा / तंगः)", wards: "Ward 13, 14", center: "Tangal", activeMembers: 310 },
  { id: 8, name: "Ilaka 8", nameNe: "इलाका ८ (गबहाल / सौगल)", wards: "Ward 15, 16", center: "Gabahal", activeMembers: 390 },
  { id: 9, name: "Ilaka 9", nameNe: "इलाका ९ (महालक्ष्मी / इमाडोल)", wards: "Ward 17, 18", center: "Mahalaxmi", activeMembers: 260 },
  { id: 10, name: "Ilaka 10", nameNe: "इलाका १० (भैसेपाटी / नख्खु)", wards: "Ward 19, 20", center: "Bhaisepati", activeMembers: 330 },
];

export function SyasyahPipeline() {
  const [selectedLang, setSelectedLang] = useState<"en" | "ne" | "new">("ne");
  const [activeTab, setActiveTab] = useState<"billing" | "ilaka">("billing");
  const [activeLayer, setActiveLayer] = useState<string>("cache");
  const [selectedIlaka, setSelectedIlaka] = useState<Ilaka>(ILAKAS[0]);

  const langStrings = {
    en: {
      headline: "Syasyah Samaj",
      sub: "Civic Governance & Newar Heritage Platform",
      badge: "10 Ilakas · Offline-First Accounting",
      action: "Verified Offline Sync",
      ilakaTitle: "10 Territorial Ilakas (Lalitpur/Yala)",
      eventsBadge: "Community Calendar",
      eventsDesc: "Central AGMs, Guthi rituals, and welfare coordination in Yala",
    },
    ne: {
      headline: "स्यस्यः समाज",
      sub: "नागरिक शासन तथा नेवाः सांस्कृतिक मञ्च",
      badge: "१० इलाका · अफलाइन लेखा प्रणाली",
      action: "इन्टरनेट बिना नै रसिद जारी",
      ilakaTitle: "१० क्षेत्रीय इलाकाहरू (ललितपुर / यल)",
      eventsBadge: "सामुदायिक क्यालेन्डर",
      eventsDesc: "केन्द्रीय साधारण सभा, गुठी परम्परा तथा स्वास्थ्य शिविर",
    },
    new: {
      headline: "स्यस्यः समाज",
      sub: "नागरिक प्रशासन व नेवाः सम्पदा मञ्च",
      badge: "१० इलाका · इन्टरनेट म्वाय्कं ज्या",
      action: "दँया ल्याखं व भौचर",
      ilakaTitle: "१० गू क्षेत्रीय इलाका (यल देय्)",
      eventsBadge: "समाजया ज्याझ्वः",
      eventsDesc: "मंकाः मुँज्या, समेबजि नकेगु व हिदान ज्याझ्वः",
    },
  };

  const current = langStrings[selectedLang];

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
        fontSize: "13px",
      }}
    >
      {/* Top Header & Navigation Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 16px",
          borderBottom: "1px solid var(--neutral-border-weak, rgba(128, 128, 128, 0.15))",
          background: "var(--neutral-background-medium, rgba(128, 128, 128, 0.06))",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#ec4899",
              boxShadow: "0 0 8px #ec4899",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--neutral-on-background-strong)",
            }}
          >
            SYASYAH SAMAJ · {current.headline.toUpperCase()}
          </span>
        </div>

        {/* Tab & Language Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          {/* View Mode Toggle */}
          <div
            style={{
              display: "flex",
              background: "var(--neutral-background-weak, rgba(128, 128, 128, 0.1))",
              borderRadius: "6px",
              padding: "2px",
              gap: "2px",
            }}
          >
            <button
              onClick={() => setActiveTab("billing")}
              style={{
                padding: "3px 8px",
                fontSize: "10.5px",
                fontWeight: 600,
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                background: activeTab === "billing" ? "#ec4899" : "transparent",
                color: activeTab === "billing" ? "#fff" : "var(--neutral-on-background-weak)",
                transition: "all 0.15s ease",
              }}
            >
              ⚡ Offline Billing SPA
            </button>
            <button
              onClick={() => setActiveTab("ilaka")}
              style={{
                padding: "3px 8px",
                fontSize: "10.5px",
                fontWeight: 600,
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                background: activeTab === "ilaka" ? "#ec4899" : "transparent",
                color: activeTab === "ilaka" ? "#fff" : "var(--neutral-on-background-weak)",
                transition: "all 0.15s ease",
              }}
            >
              🏛️ 10 Ilakas & Events
            </button>
          </div>

          {/* Trilingual Switcher */}
          <div
            style={{
              display: "flex",
              gap: "2px",
              padding: "2px",
              borderRadius: "6px",
              background: "var(--neutral-background-weak, rgba(128, 128, 128, 0.1))",
            }}
          >
            {(["en", "ne", "new"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                style={{
                  padding: "3px 7px",
                  fontSize: "10px",
                  fontWeight: 600,
                  borderRadius: "4px",
                  border: "none",
                  background:
                    selectedLang === lang ? "rgba(236, 72, 153, 0.25)" : "transparent",
                  color:
                    selectedLang === lang
                      ? "#ec4899"
                      : "var(--neutral-on-background-weak)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {lang === "en" ? "EN" : lang === "ne" ? "नेपाली" : "नेवाः"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === "billing" ? (
        /* TAB 1: Offline Billing & Sync Architecture */
        <div>
          <div style={{ position: "relative", width: "100%", padding: "14px 10px 6px" }}>
            <svg
              viewBox="0 0 540 240"
              style={{ width: "100%", height: "auto", overflow: "visible" }}
            >
              <defs>
                <linearGradient id="syasyahSyncGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>

              {/* Connecting lines */}
              <line
                x1="130"
                y1="60"
                x2="175"
                y2="60"
                stroke="var(--neutral-border-weak, rgba(128,128,128,0.3))"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <line
                x1="295"
                y1="60"
                x2="340"
                y2="60"
                stroke="var(--neutral-border-weak, rgba(128,128,128,0.3))"
                strokeWidth="2"
              />
              <line
                x1="410"
                y1="95"
                x2="410"
                y2="135"
                stroke="var(--neutral-border-weak, rgba(128,128,128,0.3))"
                strokeWidth="2"
              />

              {/* LAYER 1: Client Device / Street Volunteer */}
              <g
                onClick={() => setActiveLayer("client")}
                style={{ cursor: "pointer" }}
                transform="translate(15, 20)"
              >
                <rect
                  width="115"
                  height="80"
                  rx="10"
                  fill={
                    activeLayer === "client"
                      ? "rgba(236, 72, 153, 0.15)"
                      : "var(--neutral-background-weak, rgba(128, 128, 128, 0.05))"
                  }
                  stroke={
                    activeLayer === "client"
                      ? "#ec4899"
                      : "var(--neutral-border-weak, rgba(128, 128, 128, 0.2))"
                  }
                  strokeWidth={activeLayer === "client" ? "2" : "1"}
                />
                <text x="57" y="24" fill="#ec4899" fontSize="14" textAnchor="middle">
                  📱
                </text>
                <text
                  x="57"
                  y="42"
                  fill="var(--neutral-on-background-strong)"
                  fontSize="11"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  Volunteer Device
                </text>
                <text
                  x="57"
                  y="57"
                  fill="var(--neutral-on-background-weak)"
                  fontSize="9"
                  textAnchor="middle"
                >
                  React 19 + Vite SPA
                </text>
                <text x="57" y="70" fill="#ec4899" fontSize="8" fontWeight="600" textAnchor="middle">
                  Zero Network Dep
                </text>
              </g>

              {/* LAYER 2: Local IndexedDB (useCachedList) */}
              <g
                onClick={() => setActiveLayer("cache")}
                style={{ cursor: "pointer" }}
                transform="translate(175, 20)"
              >
                <rect
                  width="120"
                  height="80"
                  rx="10"
                  fill={
                    activeLayer === "cache"
                      ? "rgba(6, 182, 212, 0.15)"
                      : "var(--neutral-background-weak, rgba(128, 128, 128, 0.05))"
                  }
                  stroke={
                    activeLayer === "cache"
                      ? "#06b6d4"
                      : "var(--neutral-border-weak, rgba(128, 128, 128, 0.2))"
                  }
                  strokeWidth={activeLayer === "cache" ? "2" : "1"}
                />
                <text x="60" y="24" fill="#06b6d4" fontSize="14" textAnchor="middle">
                  ⚡
                </text>
                <text
                  x="60"
                  y="42"
                  fill="var(--neutral-on-background-strong)"
                  fontSize="11"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  IndexedDB Cache
                </text>
                <text
                  x="60"
                  y="57"
                  fill="var(--neutral-on-background-weak)"
                  fontSize="9"
                  textAnchor="middle"
                >
                  useCachedList hook
                </text>
                <text x="60" y="70" fill="#06b6d4" fontSize="8" fontWeight="600" textAnchor="middle">
                  Optimistic Balance
                </text>
              </g>

              {/* LAYER 3: Payload CMS 3 Backend */}
              <g
                onClick={() => setActiveLayer("payload")}
                style={{ cursor: "pointer" }}
                transform="translate(340, 20)"
              >
                <rect
                  width="140"
                  height="75"
                  rx="10"
                  fill={
                    activeLayer === "payload"
                      ? "rgba(16, 185, 129, 0.15)"
                      : "var(--neutral-background-weak, rgba(128, 128, 128, 0.05))"
                  }
                  stroke={
                    activeLayer === "payload"
                      ? "#10b981"
                      : "var(--neutral-border-weak, rgba(128, 128, 128, 0.2))"
                  }
                  strokeWidth={activeLayer === "payload" ? "2" : "1"}
                />
                <text x="70" y="24" fill="#10b981" fontSize="14" textAnchor="middle">
                  🏢
                </text>
                <text
                  x="70"
                  y="42"
                  fill="var(--neutral-on-background-strong)"
                  fontSize="11"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  Payload CMS 3.75
                </text>
                <text
                  x="70"
                  y="57"
                  fill="var(--neutral-on-background-weak)"
                  fontSize="9"
                  textAnchor="middle"
                >
                  Next.js 15 Monorepo
                </text>
              </g>

              {/* LAYER 4: Remote PostgreSQL */}
              <g
                onClick={() => setActiveLayer("db")}
                style={{ cursor: "pointer" }}
                transform="translate(340, 135)"
              >
                <rect
                  width="140"
                  height="75"
                  rx="10"
                  fill={
                    activeLayer === "db"
                      ? "rgba(139, 92, 246, 0.15)"
                      : "var(--neutral-background-weak, rgba(128, 128, 128, 0.05))"
                  }
                  stroke={
                    activeLayer === "db"
                      ? "#8b5cf6"
                      : "var(--neutral-border-weak, rgba(128, 128, 128, 0.2))"
                  }
                  strokeWidth={activeLayer === "db" ? "2" : "1"}
                />
                <text x="70" y="24" fill="#8b5cf6" fontSize="14" textAnchor="middle">
                  🗄️
                </text>
                <text
                  x="70"
                  y="42"
                  fill="var(--neutral-on-background-strong)"
                  fontSize="11"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  PostgreSQL DB
                </text>
                <text
                  x="70"
                  y="57"
                  fill="var(--neutral-on-background-weak)"
                  fontSize="9"
                  textAnchor="middle"
                >
                  Ledger, Members, Wards
                </text>
              </g>

              {/* Offline Sync Cycle Arc */}
              <path
                d="M 235 100 C 235 170, 340 170, 340 170"
                stroke="url(#syasyahSyncGrad)"
                strokeWidth="2"
                strokeDasharray="5 3"
                fill="none"
              />
              <text
                x="285"
                y="180"
                fill="var(--neutral-on-background-weak)"
                fontSize="9"
                textAnchor="middle"
                fontFamily="monospace"
              >
                ⚡ Background Reconciliation & Serial Numbers
              </text>
            </svg>
          </div>

          {/* Interactive Info Footer */}
          <div
            style={{
              padding: "10px 16px",
              borderTop: "1px solid var(--neutral-border-weak, rgba(128, 128, 128, 0.15))",
              background: "var(--neutral-background-medium, rgba(128, 128, 128, 0.03))",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <div>
              <span style={{ fontWeight: 700, color: "var(--neutral-on-background-strong)" }}>
                {activeLayer === "client" && "Volunteer Collector PWA: "}
                {activeLayer === "cache" && "Local IndexedDB (Cache-First): "}
                {activeLayer === "payload" && "Payload CMS 3 Accounting Core: "}
                {activeLayer === "db" && "PostgreSQL Financial Ledger: "}
              </span>
              <span style={{ color: "var(--neutral-on-background-weak)" }}>
                {activeLayer === "client" && "Optimistic UI renders receipts immediately without blocking on network latency."}
                {activeLayer === "cache" && "Caches all members, annual fees, and Guthi records locally via useCachedList."}
                {activeLayer === "payload" && "Validates voucher sequences, calculates balance totals, and handles PDF receipt generation."}
                {activeLayer === "db" && "Maintains immutable double-entry records with automatic reconciliation on reconnect."}
              </span>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              <span
                style={{
                  fontSize: "10.5px",
                  padding: "2px 7px",
                  borderRadius: "4px",
                  background: "rgba(236, 72, 153, 0.15)",
                  color: "#ec4899",
                  fontWeight: 600,
                }}
              >
                {current.action}
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* TAB 2: 10 Territorial Ilakas & Cultural Calendar */
        <div style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
            <div>
              <span style={{ fontWeight: 700, fontSize: "14px", color: "var(--neutral-on-background-strong)" }}>
                {current.ilakaTitle}
              </span>
              <p style={{ margin: "2px 0 0", fontSize: "11.5px", color: "var(--neutral-on-background-weak)" }}>
                {current.eventsDesc}
              </p>
            </div>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: "6px",
                background: "rgba(236, 72, 153, 0.15)",
                color: "#ec4899",
              }}
            >
              Total Registered: 3,420+
            </span>
          </div>

          {/* Ilaka Pills Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(95px, 1fr))", gap: "6px", marginBottom: "14px" }}>
            {ILAKAS.map((ilaka) => (
              <button
                key={ilaka.id}
                onClick={() => setSelectedIlaka(ilaka)}
                style={{
                  padding: "6px 8px",
                  borderRadius: "8px",
                  border: `1px solid ${selectedIlaka.id === ilaka.id ? "#ec4899" : "var(--neutral-border-weak, rgba(128,128,128,0.2))"}`,
                  background: selectedIlaka.id === ilaka.id ? "rgba(236, 72, 153, 0.15)" : "var(--neutral-background-weak, rgba(128,128,128,0.04))",
                  color: selectedIlaka.id === ilaka.id ? "#ec4899" : "var(--neutral-on-background-strong)",
                  cursor: "pointer",
                  fontSize: "11px",
                  fontWeight: selectedIlaka.id === ilaka.id ? 700 : 500,
                  textAlign: "center",
                  transition: "all 0.15s ease",
                }}
              >
                <div>{ilaka.name}</div>
                <div style={{ fontSize: "9px", opacity: 0.8 }}>{ilaka.center}</div>
              </button>
            ))}
          </div>

          {/* Selected Ilaka Details & Cultural Events Preview */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "10px",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid var(--neutral-border-weak, rgba(128,128,128,0.15))",
              background: "var(--neutral-background-medium, rgba(128,128,128,0.03))",
            }}
          >
            <div>
              <div style={{ fontWeight: 700, color: "var(--neutral-on-background-strong)", fontSize: "12.5px", marginBottom: "3px" }}>
                📍 {selectedIlaka.nameNe}
              </div>
              <div style={{ fontSize: "11px", color: "var(--neutral-on-background-weak)", lineHeight: 1.4 }}>
                <strong>Center:</strong> {selectedIlaka.center} · <strong>Coverage:</strong> {selectedIlaka.wards}
              </div>
              <div style={{ fontSize: "11px", color: "#ec4899", fontWeight: 600, marginTop: "4px" }}>
                👥 {selectedIlaka.activeMembers} Families Enrolled
              </div>
            </div>

            <div style={{ borderLeft: "1px solid var(--neutral-border-weak, rgba(128,128,128,0.15))", paddingLeft: "12px" }}>
              <div style={{ fontWeight: 700, color: "var(--neutral-on-background-strong)", fontSize: "12px", marginBottom: "3px" }}>
                📅 Upcoming Gatherings:
              </div>
              <div style={{ fontSize: "11px", color: "var(--neutral-on-background-weak)", lineHeight: 1.4 }}>
                • <strong>Oct 10:</strong> 24th Annual General Assembly & Scholarships (Mangal Bazaar)<br />
                • <strong>Oct 15:</strong> Yenya (Indra Jatra) Samay Baji Procession (Durbar Square)<br />
                • <strong>Nov 02:</strong> Open Blood Donation & Senior Health Camp (Pulchowk)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

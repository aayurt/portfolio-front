import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { readVisits, type VisitRecord } from "@/lib/visits";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Analytics",
  robots: { index: false, follow: false },
};

function countBy<T>(items: T[], key: (item: T) => string): Array<{ key: string; count: number }> {
  const map = new Map<string, number>();
  for (const item of items) {
    const k = key(item) || "(unknown)";
    map.set(k, (map.get(k) || 0) + 1);
  }
  return [...map.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count);
}

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const expected = process.env.ANALYTICS_TOKEN;
  if (expected && token !== expected) {
    notFound();
  }

  const visits = readVisits();
  const total = visits.length;
  const uniqueIps = new Set(visits.map((v) => v.ip)).size;

  const today = new Date().toDateString();
  const todayCount = visits.filter((v) => new Date(v.ts).toDateString() === today).length;

  const last7 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const last7Count = visits.filter((v) => new Date(v.ts) >= last7).length;

  const origins = countBy(visits, (v) => v.originLabel);
  const paths = countBy(visits, (v) => v.path);
  const countries = countBy(visits, (v) => (v.geo?.country && v.geo.country !== "Local" ? v.geo.country : "Local"));
  const devices = countBy(visits, (v) => v.device);
  const browsers = countBy(visits, (v) => v.browser);

  const recent = [...visits].reverse().slice(0, 100);

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const card: CSSProperties = {
    border: "1px solid rgba(128,128,128,0.3)",
    borderRadius: "12px",
    padding: "16px 20px",
    background: "rgba(128,128,128,0.06)",
  };
  const num: CSSProperties = { fontSize: "1.6rem", fontWeight: 700, margin: 0 };
  const label: CSSProperties = {
    fontSize: "0.78rem",
    opacity: 0.65,
    margin: 0,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  };
  const cell: CSSProperties = {
    padding: "6px 10px",
    borderBottom: "1px solid rgba(128,128,128,0.15)",
    fontSize: "0.82rem",
    textAlign: "left",
    verticalAlign: "top",
  };
  const th: CSSProperties = { ...cell, fontWeight: 600, opacity: 0.7, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.05em" };

  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "24px 20px 80px", color: "currentColor", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
        <h1 style={{ fontSize: "1.6rem", margin: 0 }}>Visitors</h1>
        {!expected && (
          <p style={{ margin: 0, fontSize: "0.8rem", opacity: 0.7 }}>
            ⚠️ No ANALYTICS_TOKEN set — this page is public. Set it in the server .env to gate access with ?token=…
          </p>
        )}
      </div>
      <p style={{ opacity: 0.6, fontSize: "0.85rem", marginTop: 4 }}>
        Recorded from the /api/track beacon · referrer origin, IP + geo, device
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, margin: "20px 0" }}>
        {[
          ["Total visits", String(total)],
          ["Unique IPs", String(uniqueIps)],
          ["Today", String(todayCount)],
          ["Last 7 days", String(last7Count)],
        ].map(([l, v]) => (
          <div key={l} style={card}>
            <p style={num}>{v}</p>
            <p style={label}>{l}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, margin: "20px 0" }}>
        {[
          ["Where they came from", origins],
          ["Pages", paths],
          ["Countries", countries],
          ["Devices", devices],
        ].map(([title, rows]) => {
          const data = rows as Array<{ key: string; count: number }>;
          return (
            <div key={title as string} style={card}>
              <p style={{ fontWeight: 600, margin: "0 0 10px", fontSize: "0.9rem" }}>{title as string}</p>
              {data.length === 0 && <p style={label}>No data yet</p>}
              {data.slice(0, 8).map((row) => {
                const pct = total ? Math.round((row.count / total) * 100) : 0;
                return (
                  <div key={row.key} style={{ marginBottom: 6 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: "0.82rem" }}>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.key}</span>
                      <span style={{ opacity: 0.7 }}>{row.count}</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 2, background: "rgba(128,128,128,0.15)", marginTop: 3 }}>
                      <div style={{ height: 4, borderRadius: 2, width: `${pct}%`, background: "currentColor", opacity: 0.6 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <h2 style={{ fontSize: "1.1rem", margin: "28px 0 12px" }}>Recent visits</h2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 860 }}>
          <thead>
            <tr>
              {["Time", "Origin", "Referrer", "Page", "IP", "Location", "Device", "Browser / OS", "Screen"].map((h) => (
                <th key={h} style={th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recent.map((v: VisitRecord, i) => (
              <tr key={i}>
                <td style={cell}>{fmt(v.ts)}</td>
                <td style={cell}>
                  <b>{v.originLabel}</b>
                </td>
                <td style={{ ...cell, maxWidth: 220 }}>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "inline-block", maxWidth: "100%" }} title={v.referrer}>
                    {v.referrer || "—"}
                  </span>
                </td>
                <td style={cell}>{v.path}</td>
                <td style={cell}>{v.ip || "—"}</td>
                <td style={cell}>
                  {[v.geo?.flag, v.geo?.country, v.geo?.city].filter(Boolean).join(" ") || "—"}
                </td>
                <td style={cell}>{v.device}</td>
                <td style={cell}>{v.browser} / {v.os}</td>
                <td style={cell}>{v.screen || "—"}</td>
              </tr>
            ))}
            {recent.length === 0 && (
              <tr>
                <td style={cell} colSpan={9}>
                  No visits recorded yet. Open the site in a browser and come back.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

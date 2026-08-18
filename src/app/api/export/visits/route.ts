import { NextRequest, NextResponse } from "next/server";
import { readVisits, type VisitRecord } from "@/lib/visits";

export const dynamic = "force-dynamic";

const COLS: Array<{ key: keyof VisitRecord; label: string }> = [
  { key: "ts", label: "time" },
  { key: "originLabel", label: "origin" },
  { key: "referrer", label: "referrer" },
  { key: "path", label: "page" },
  { key: "sessionId", label: "session" },
  { key: "utmSource", label: "utm_source" },
  { key: "utmMedium", label: "utm_medium" },
  { key: "utmCampaign", label: "utm_campaign" },
  { key: "duration", label: "duration_s" },
  { key: "ip", label: "ip" },
  { key: "geo", label: "location" },
  { key: "device", label: "device" },
  { key: "browser", label: "browser" },
  { key: "os", label: "os" },
  { key: "screen", label: "screen" },
  { key: "lang", label: "lang" },
  { key: "tz", label: "tz" },
];

function csvEscape(value: unknown): string {
  const s = String(value ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET(req: NextRequest) {
  const expected = process.env.ANALYTICS_TOKEN;
  const token = req.nextUrl.searchParams.get("token");
  if (expected && token !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const visits = readVisits();
  const header = COLS.map((c) => c.label).join(",");
  const rows = visits.map((v) =>
    COLS.map((c) => {
      const val = c.key === "geo" ? [v.geo?.flag, v.geo?.country, v.geo?.region, v.geo?.city].filter(Boolean).join(" ") : v[c.key];
      return csvEscape(val);
    }).join(","),
  );
  const csv = [header, ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="visits-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}

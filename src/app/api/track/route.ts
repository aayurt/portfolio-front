import { NextRequest, NextResponse } from "next/server";
import {
  appendVisit,
  clientIp,
  geoFromIp,
  isBot,
  isRateLimited,
  originLabel,
  parseUa,
  type VisitRecord,
} from "@/lib/visits";

export const dynamic = "force-dynamic";

type TrackBody = {
  path?: string;
  referrer?: string;
  ua?: string;
  screen?: string;
  lang?: string;
  tz?: string;
  title?: string;
  sessionId?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  duration?: number;
};

export async function POST(req: NextRequest) {
  try {
    // sendBeacon posts text/plain, so read the raw body and parse manually.
    const raw = await req.text();
    let body: TrackBody = {};
    try {
      body = JSON.parse(raw || "{}");
    } catch {
      /* ignore malformed body */
    }

    const ua = (body.ua || req.headers.get("user-agent") || "").slice(0, 500);
    if (isBot(ua)) {
      return NextResponse.json({ ok: true, skipped: "bot" });
    }

    const ip = clientIp(req.headers).slice(0, 64);
    if (isRateLimited(ip)) {
      return NextResponse.json({ ok: true, skipped: "rate-limited" });
    }

    const referrer = (body.referrer || req.headers.get("referer") || "").slice(0, 500);
    const geo = await geoFromIp(ip);
    const uaInfo = parseUa(ua);

    const record: VisitRecord = {
      ts: new Date().toISOString(),
      path: (body.path || "/").slice(0, 500),
      origin: referrer,
      originLabel: originLabel(referrer),
      referrer,
      ip,
      geo,
      ua,
      browser: uaInfo.browser,
      os: uaInfo.os,
      device: uaInfo.device,
      screen: (body.screen || "").slice(0, 32),
      lang: (body.lang || "").slice(0, 32),
      tz: (body.tz || "").slice(0, 64),
      title: (body.title || "").slice(0, 300),
      sessionId: (body.sessionId || "").slice(0, 64) || undefined,
      utmSource: (body.utmSource || "").slice(0, 64) || undefined,
      utmMedium: (body.utmMedium || "").slice(0, 64) || undefined,
      utmCampaign: (body.utmCampaign || "").slice(0, 64) || undefined,
      duration: typeof body.duration === "number" ? Math.max(0, Math.round(body.duration)) : undefined,
    };

    appendVisit(record);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("track error", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "use POST to record a visit" });
}

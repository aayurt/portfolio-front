"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const BOT_RE =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|whatsapp|telegrambot|headless|curl|wget|python-requests|python-urllib|go-http-client/i;

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem("visit-session");
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      sessionStorage.setItem("visit-session", id);
    }
    return id;
  } catch {
    return "";
  }
}

function getUtm(): { utmSource?: string; utmMedium?: string; utmCampaign?: string } {
  try {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source") || undefined;
    const utmMedium = params.get("utm_medium") || undefined;
    const utmCampaign = params.get("utm_campaign") || undefined;
    return { utmSource, utmMedium, utmCampaign };
  } catch {
    return {};
  }
}

function beacon(payload: Record<string, unknown>): void {
  try {
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", body);
    } else {
      fetch("/api/track", { method: "POST", body, keepalive: true }).catch(() => {});
    }
  } catch {
    /* tracking must never break the page */
  }
}

/**
 * Fires a beacon to /api/track on each page view (with session + UTM) and
 * reports time-on-page when the tab is hidden or unloaded.
 */
export default function VisitTracker() {
  const pathname = usePathname();
  const last = useRef<{ path: string; at: number }>({ path: "", at: 0 });
  const startedAt = useRef<number>(Date.now());
  const trackedPath = useRef<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ua = navigator.userAgent || "";
    if (BOT_RE.test(ua) || (navigator as Navigator & { webdriver?: boolean }).webdriver) {
      return;
    }

    const sendView = () => {
      const path = pathname || "/";
      const now = Date.now();
      if (last.current.path === path && now - last.current.at < 3000) return;
      last.current = { path, at: now };
      startedAt.current = now;
      trackedPath.current = path;

      beacon({
        path,
        referrer: document.referrer || "",
        ua,
        screen: `${window.screen.width}x${window.screen.height}`,
        lang: navigator.language || "",
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
        title: document.title?.slice(0, 300) || "",
        sessionId: getSessionId(),
        ...getUtm(),
      });
    };

    const sendExit = () => {
      const elapsed = Math.round((Date.now() - startedAt.current) / 1000);
      if (elapsed < 2) return; // skip sub-2s blips
      beacon({ path: trackedPath.current || pathname || "/", duration: elapsed });
    };

    sendView();

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") sendExit();
    });
    window.addEventListener("pagehide", sendExit);

    return () => {
      document.removeEventListener("visibilitychange", sendExit);
      window.removeEventListener("pagehide", sendExit);
    };
  }, [pathname]);

  return null;
}

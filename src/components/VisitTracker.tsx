"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const BOT_RE =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|whatsapp|telegrambot|headless|curl|wget|python-requests|python-urllib|go-http-client/i;

/**
 * Fires a beacon to /api/track on each page view so the portfolio can log
 * where visitors came from (referrer origin), device, and location.
 */
export default function VisitTracker() {
  const pathname = usePathname();
  const last = useRef<{ path: string; at: number }>({ path: "", at: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ua = navigator.userAgent || "";
    if (BOT_RE.test(ua) || (navigator as Navigator & { webdriver?: boolean }).webdriver) {
      return;
    }

    const path = pathname || "/";
    const now = Date.now();
    if (last.current.path === path && now - last.current.at < 3000) return;
    last.current = { path, at: now };

    const payload = JSON.stringify({
      path,
      referrer: document.referrer || "",
      ua,
      screen: `${window.screen.width}x${window.screen.height}`,
      lang: navigator.language || "",
      tz: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
      title: document.title?.slice(0, 300) || "",
    });

    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/track", payload);
      } else {
        fetch("/api/track", { method: "POST", body: payload, keepalive: true }).catch(() => {});
      }
    } catch {
      /* tracking must never break the page */
    }
  }, [pathname]);

  return null;
}

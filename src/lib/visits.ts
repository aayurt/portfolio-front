import fs from "fs";
import path from "path";

export type VisitGeo = {
  country: string;
  region: string;
  city: string;
  isp: string;
  flag: string;
};

export type VisitRecord = {
  ts: string;
  path: string;
  origin: string; // raw referrer, "" if direct
  originLabel: string; // "LinkedIn", "Instagram", "Direct", ...
  referrer: string;
  ip: string;
  geo: VisitGeo;
  ua: string;
  browser: string;
  os: string;
  device: string;
  screen: string;
  lang: string;
  tz: string;
  title: string;
};

/** Where visit records are appended. Override with VISITS_DIR env var. */
export function visitsFile(): string {
  const dir = process.env.VISITS_DIR || path.resolve(process.cwd(), "data");
  return path.join(dir, "visits.jsonl");
}

export function appendVisit(record: VisitRecord): void {
  try {
    const file = visitsFile();
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.appendFileSync(file, JSON.stringify(record) + "\n", "utf8");
  } catch (e) {
    console.error("visit tracking: failed to append", e);
  }
}

export function readVisits(): VisitRecord[] {
  try {
    const file = visitsFile();
    if (!fs.existsSync(file)) return [];
    return fs
      .readFileSync(file, "utf8")
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line) as VisitRecord;
        } catch {
          return null;
        }
      })
      .filter((v): v is VisitRecord => v !== null);
  } catch {
    return [];
  }
}

const ORIGIN_LABELS: Array<[RegExp, string]> = [
  [/linkedin\.com/, "LinkedIn"],
  [/instagram\.com/, "Instagram"],
  [/facebook\.com/, "Facebook"],
  [/messenger\.com|m\.me/, "Messenger"],
  [/wa\.me|whatsapp\.com/, "WhatsApp"],
  [/x\.com|twitter\.com/, "X / Twitter"],
  [/t\.me|telegram\.me/, "Telegram"],
  [/discord\.com/, "Discord"],
  [/github\.com/, "GitHub"],
  [/google\./, "Google"],
  [/bing\.com/, "Bing"],
  [/duckduckgo\.com/, "DuckDuckGo"],
  [/youtube\.com/, "YouTube"],
  [/reddit\.com/, "Reddit"],
  [/mail\.google\.com|gmail\.com/, "Gmail"],
  [/outlook\.com|office\.com/, "Outlook"],
  [/proton\.me|protonmail\.com/, "Proton Mail"],
  [/yahoo\.com/, "Yahoo Mail"],
  [/pinterest\./, "Pinterest"],
  [/quora\.com/, "Quora"],
  [/medium\.com/, "Medium"],
  [/dev\.to/, "Dev.to"],
  [/hashnode\.com/, "Hashnode"],
  [/news\.ycombinator\.com/, "Hacker News"],
  [/vercel\.app/, "Vercel preview"],
  [/netlify\.app/, "Netlify preview"],
];

/** Map a referrer URL to a friendly origin label (or its bare host). */
export function originLabel(referrer: string): string {
  if (!referrer) return "Direct";
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    for (const [re, label] of ORIGIN_LABELS) {
      if (re.test(host)) return label;
    }
    return host;
  } catch {
    return "Direct";
  }
}

const geoCache = new Map<string, VisitGeo>();

function isPrivateIp(ip: string): boolean {
  if (!ip || ip === "::1" || ip === "127.0.0.1") return true;
  if (ip.startsWith("10.") || ip.startsWith("192.168.")) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(ip)) return true;
  return false;
}

/** Best-effort geolocation via ipwho.is, cached per IP to avoid rate limits. */
export async function geoFromIp(ip: string): Promise<VisitGeo> {
  const empty: VisitGeo = { country: "", region: "", city: "", isp: "", flag: "" };
  if (isPrivateIp(ip)) return { ...empty, country: "Local" };
  if (geoCache.has(ip)) return geoCache.get(ip)!;
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 3000);
    const res = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    if (res.ok) {
      const j = await res.json();
      const geo: VisitGeo = {
        country: j.country || "",
        region: j.region || "",
        city: j.city || "",
        isp: j.isp || "",
        flag: j.flag?.emoji || "",
      };
      geoCache.set(ip, geo);
      return geo;
    }
  } catch {
    /* offline / blocked: fall through */
  }
  return empty;
}

export function clientIp(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return headers.get("x-real-ip") || "";
}

export function parseUa(ua: string): { browser: string; os: string; device: string } {
  let browser = "Unknown";
  if (/edg\//i.test(ua)) browser = "Edge";
  else if (/opr\//i.test(ua)) browser = "Opera";
  else if (/chrome\//i.test(ua) && !/chromium/i.test(ua)) browser = "Chrome";
  else if (/firefox\//i.test(ua)) browser = "Firefox";
  else if (/safari\//i.test(ua)) browser = "Safari";

  let os = "Unknown";
  if (/windows/i.test(ua)) os = "Windows";
  else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
  else if (/android/i.test(ua)) os = "Android";
  else if (/mac os x|macintosh/i.test(ua)) os = "macOS";
  else if (/linux/i.test(ua)) os = "Linux";

  let device = "Desktop";
  if (/mobile/i.test(ua)) device = "Mobile";
  else if (/tablet|ipad/i.test(ua)) device = "Tablet";

  return { browser, os, device };
}

const BOT_RE =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|whatsapp|telegrambot|headless|curl|wget|python-requests|python-urllib|go-http-client/i;

export function isBot(ua: string): boolean {
  return BOT_RE.test(ua || "");
}

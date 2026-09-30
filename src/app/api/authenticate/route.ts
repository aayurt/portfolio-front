import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Local password-gate login (replaces deleted admin-connector endpoints).
// Password is set via PAGE_ACCESS_PASSWORD env var (see .env.example).
export async function POST(req: NextRequest) {
  const expected = process.env.PAGE_ACCESS_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { error: "PAGE_ACCESS_PASSWORD is not configured" },
      { status: 500 }
    );
  }
  let password = "";
  try {
    password = ((await req.json()) as { password?: string }).password || "";
  } catch {
    password = "";
  }
  if (!password || password !== expected) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }
  const res = NextResponse.json({ authenticated: true });
  res.cookies.set("page_auth", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

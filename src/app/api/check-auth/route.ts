import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Local password-gate session check (replaces deleted admin-connector endpoints).
export async function GET(req: NextRequest) {
  if (req.cookies.get("page_auth")?.value === "1") {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}

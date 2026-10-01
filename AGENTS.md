# Agent Instructions — portfolio-front

Rules for AI agents (Jules, Claude, OpenCode, Hermes) working in this
repo. Read this file first, alongside `docs/ARCHITECTURE.md`.

## Setup commands (Jules + local)

- Install deps: `pnpm install` (Node >= 20, pnpm 10; Jules VM has Node preinstalled — see `scripts/setup-jules.sh`)
- Dev server: `pnpm dev` (http://localhost:3000)
- Format: `pnpm biome-write`
- Lint: `pnpm lint` — must pass
- Build: `pnpm build` — must pass (standalone output)
- Env: `cp .env.example .env`; never commit `.env*` (forbidden by `mcp-rules.json`)

Jules setup: paste `scripts/setup-jules.sh` into the Jules repo
Configuration → Initial Setup box, then Run & Snapshot.

## Non-negotiables (kritikka)

1. **Read before write.** Fetch `get_architecture_rules`,
   `get_conventions`, and `get_current_adrs` (via the `kritikka` MCP
   server) before proposing or making any change.
2. **Validate every change.** Pass the change set through
   `validate_change` before writing files. Do not land `error`-severity
   violations.
3. **Respect the boundary.** Never write outside the repo root. Never
   touch `.env*`, `.next/`, `node_modules/`, `out/`. Use
   `check_repository_boundary` when ambiguous.
4. **ADR-first.** `src/app/api/**` is governed by ADR-0001 — reference
   it in the PR/change description.
5. **Scan for secrets.** Run `detect_secrets` on any change touching
   env handling or API routes.

## Working style

- Keep diffs minimal; do not reformat unrelated code (Biome: double
  quotes, 2-space, 100-col).
- App Router: server components by default, `"use client"` only where
  needed. SCSS modules for styles.
- Payload CMS is the content source (`NEXT_PUBLIC_API`); degrade to
  empty on fetch failure, never crash the route.
- `pnpm build` pins `outputFileTracingRoot` to this dir — do not remove
  (prevents broken standalone builds from a parent lockfile).
- If a tool returns `{ "found": false }`, report and stop — do not invent.

## Before finishing (Jules + human PRs)

```
pnpm biome-write && pnpm lint && pnpm build
```

Title format: `[front] <Title>`. Reference ADR-0001 when touching
`src/app/api/**`. Deploy is out of scope (see `DEPLOY.md`).

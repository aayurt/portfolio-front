# portfolio-front — public portfolio site

Next.js 16 + Once UI. Content comes from Payload (`portfolio-admin`);
this app also serves its own `/api/*` routes.

Live: https://aayurtshrestha.com.np

## Develop

```sh
pnpm install
cp .env.example .env
pnpm dev            # http://localhost:3000
```

Env: `NEXT_PUBLIC_API` (Payload base, default `http://localhost:3000/admin`),
`NEXT_PUBLIC_SLUG`, `NEXT_PUBLIC_DOMAIN_LIST`, `PAGE_ACCESS_PASSWORD`.
Without the backend, pages degrade to empty — expected (ADR-0001).

## Checks

```sh
pnpm biome-write    # format
pnpm lint           # next lint — must pass
pnpm build          # next build (standalone) — must pass
```

## Deploy

See [DEPLOY.md](./DEPLOY.md): `sh scripts/deploy-standalone.sh PersonalVPS`.

## Agent governance

This repo is governed by [kritikka-mcp](https://www.npmjs.com/package/kritikka-mcp)
(`mcp-rules.json`) and is Google Jules ready (`AGENTS.md` +
`scripts/setup-jules.sh`). Agents: read `AGENTS.md` first.

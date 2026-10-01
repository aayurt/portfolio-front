# Contributing — portfolio-front

How humans (and Jules) contribute. Code style is in
`docs/CONVENTIONS.md`; workflow for agents is in `AGENTS.md`.

## Setup

```bash
pnpm install
cp .env.example .env
pnpm dev
```

## Pull requests

1. Branch from `main`, keep diffs minimal and focused.
2. Run before pushing:
   ```bash
   pnpm biome-write
   pnpm lint
   pnpm build
   ```
3. If you touched `src/app/api/**`, reference ADR-0001 in the PR body.
4. Never commit `.env`, `.env.prod`, `.next/`, or `node_modules/`.

## Reviews

- Architecture changes need an ADR (copy
  `docs/adr/0000-template.md`, `proposed` → `accepted`).
- `validate_change` (kritikka MCP) must show no `error` violations.

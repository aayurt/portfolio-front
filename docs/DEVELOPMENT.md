# Development — portfolio-front

Day-to-day workflow. Policy in `CONTRIBUTING.md`; ops in `RUNBOOK.md`.

## Setup

```bash
pnpm install
cp .env.example .env   # set PAGE_ACCESS_PASSWORD, NEXT_PUBLIC_* as needed
pnpm dev               # http://localhost:3002 (or Next-assigned port)
```

Env (`NEXT_PUBLIC_API`, `NEXT_PUBLIC_SLUG`, `NEXT_PUBLIC_DOMAIN_LIST`)
points at the Payload backend (default `http://localhost:3000/admin`).
Without the backend, pages degrade to empty — this is expected.

## Daily loop

1. Pick an issue; check `mcp-rules.json` for ADR-governed paths.
2. Branch, implement, verify.
3. Run `validate_change` (via the `kritikka` MCP server) on your change set.
4. Open a PR per `CONTRIBUTING.md`.

## Common tasks

| Task | How |
|---|---|
| Add an ADR | Copy `docs/adr/0000-template.md`, set `status: proposed` |
| Add an API route | `src/app/api/<name>/route.ts`, governed by ADR-0001 |
| Edit site config | `src/resources/once-ui.config.ts`, `content.tsx` |
| Format | `pnpm biome-write` |
| Lint | `pnpm lint` (`next lint`) |
| Build | `pnpm build` (`next build`, standalone output) |

## MCP server

Read-only advisor over this repo. Root resolves from `--root`, then
`KRITTIKA_MCP_ROOT`, then cwd. Rules come from `mcp-rules.json`.

```json
{
  "mcpServers": {
    "kritikka": {
      "command": "npx",
      "args": ["-y", "kritikka-mcp", "--root", "."]
    }
  }
}
```

# Runbook — portfolio-front

Operational procedures. Dev workflow in `docs/DEVELOPMENT.md`.

## Daily operations

- **Health check.** `pnpm build && pnpm start`, curl `/` and
  `/api/search?q=test`. Investigate error-rate drift before deploying.
- **Log triage.** Render failures → check Payload reachability first
  (`NEXT_PUBLIC_API`); API failures → ADR-0001 context.

## Deployment

Follow `DEPLOY.md` (`scripts/deploy-standalone.sh`). Roll back by
redeploying the previous known-good standalone bundle.

Key gotchas (see `DEPLOY.md`):

- `ecosystem.config.cjs` pins Node 24 `interpreter` — never remove it.
- Server `.env` preserves `PAGE_ACCESS_PASSWORD`; never overwrite it.
- nginx must proxy `/api/` to the front (`:3002`).

## Escalation

1. Reproduce with `pnpm build`.
2. Check `DEPLOY.md` troubleshooting table.
3. If CMS-side, escalate to `portfolio-admin` runbook.

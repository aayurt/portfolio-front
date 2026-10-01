# Deployment — portfolio-front

Public site at <https://aayurtshrestha.com.np>. Data comes from Payload
(`portfolio-admin`); this app also serves its own `/api/*` routes
(search, track, publications, password gate).

## Servers

| Alias (ssh)   | Role  | Deploy dir          | pm2 app     | Port |
|---------------|-------|---------------------|-------------|------|
| `PersonalVPS` | prod  | `/var/www/portfolio` | `portfolio` | 3002 |

Admin lives at `/var/www/portfolio-admin` (see `portfolio-admin/DEPLOY.md`).
SSH entry: `ssh PersonalVPS`.

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) is the primary path:
push to `main` builds on the runner (linux-x64, correct sharp binaries),
rsyncs `.next/standalone/` to the VPS, rewrites the server `.env` from
secrets (preserving `PAGE_ACCESS_PASSWORD` when the secret is empty), and
restarts pm2. Manual trigger via Actions → Deploy → Run workflow.

Local fallback, ship the standalone bundle to the selected server:

```sh
sh scripts/deploy-standalone.sh                 # interactive server picker
sh scripts/deploy-standalone.sh PersonalVPS     # direct
sh scripts/deploy-standalone.sh --local-only    # build only, no sync
```

What it does:

1. `next build` with production `NEXT_PUBLIC_*` baked in.
2. Assembles `.next/standalone/` (+ `public/`, `.next/static`).
3. Fetches linux-x64 native binaries (sharp) so the macOS build runs on the VPS.
4. rsyncs the bundle to `<server>:/var/www/portfolio/.next/standalone/`.
5. Rewrites the server `.env`, **preserving `PAGE_ACCESS_PASSWORD`**
   (local `.env.prod` override wins, otherwise the on-server value is kept).
6. Copies `ecosystem.config.cjs` to the deploy root.
7. `pm2 delete + start` the `portfolio` app and saves the process list.

## Environment

* Build-time (baked into the bundle): `NEXT_PUBLIC_API`,
  `NEXT_PUBLIC_SLUG`, `NEXT_PUBLIC_DOMAIN_LIST` — set via `PROD_API` and the
  `.env` block inside `scripts/deploy-standalone.sh`.
* Runtime (server `/var/www/portfolio/.env`, loaded via `--env-file`):
  `VISITS_DIR`, `ANALYTICS_TOKEN`, `PAGE_ACCESS_PASSWORD`.
  Never commit secrets — `.env`, `.env.prod`, `.env.production` are gitignored.

## Verify

```sh
curl -sk -o /dev/null -w "%{http_code}\n" https://aayurtshrestha.com.np/
curl -sk "https://aayurtshrestha.com.np/api/search?q=test"
ssh PersonalVPS "pm2 describe portfolio | grep -E 'status|uptime|restarts'"
```

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| `node: bad option: --env-file=.env`, instant restarts | App spawned under Node 18. `ecosystem.config.cjs` pins `interpreter` to Node 24 — never remove it. |
| Page shows "Server Components render" error | Payload admin (`:3001`) unreachable. Data fetchers degrade to empty, except paths that still throw — check `pm2 logs multi-tenant-portfolio` on the server. |
| `/api/*` returns 502 | nginx must proxy `/api/` to the front (`:3002`), not to the deleted admin-connector (`:3003`). |
| Password gate always rejects | `PAGE_ACCESS_PASSWORD` missing from server `.env`; redeploy preserves it, or set it manually. |

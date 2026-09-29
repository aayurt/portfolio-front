# Local Deployment Guide

Deploy the portfolio from your local machine to the VPS without GitHub Actions.

## Prerequisites

- SSH access to the VPS (`root@aayurtshrestha.com.np`)
- PM2 installed on VPS
- Node.js 20+ on VPS
- Local `.env` configured for production

## Quick Deploy

```bash
cd /Users/aayurtshrestha/Projects/self/porfolio/portfolio-front
./deploy-local.sh
```

## What It Does

1. **Validates** - Checks for uncommitted changes
2. **Builds** - Runs `pnpm install && pnpm run build` locally
3. **Packages** - Creates tarball of `.next/standalone/` + `public/` + `.next/static/`
4. **Deploys** - SCP to `/var/www/portfolio` on VPS
5. **Configures** - Copies local `.env` to server
6. **Reloads** - PM2 zero-downtime reload
7. **Verifies** - Health checks `http://localhost:3002/work`

## Requirements on VPS

```bash
# On VPS (run once)
mkdir -p /var/www/portfolio
cd /var/www/portfolio

# PM2 ecosystem config (already in repo)
# ecosystem.config.cjs points to .next/standalone/server.js

# Install PM2 globally if not present
npm install -g pm2
```

## Environment Variables

The local `.env` is copied to the server. Ensure it has:

```env
NEXT_PUBLIC_API=https://your-payload-cms.com/admin
NEXT_PUBLIC_SLUG=aayurtshrestha
NEXT_PUBLIC_DOMAIN_LIST='[{"domain":"aayurtshrestha.com.np","slug":"aayurtshrestha"}]'
```

## Manual Steps (if needed)

```bash
# SSH to server
ssh root@aayurtshrestha.com.np

# Check PM2 status
pm2 status

# View logs
pm2 logs portfolio

# Manual reload
cd /var/www/portfolio && pm2 reload ecosystem.config.cjs --update-env

# Check build output
ls -la .next/standalone/
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "Permission denied" | Ensure SSH key is loaded: `ssh-add ~/.ssh/id_ed25519` |
| Build fails | Run `pnpm run build` locally first to see errors |
| Health check fails | Check `pm2 logs portfolio` on VPS |
| Port 3002 busy | `pm2 kill && pm2 start ecosystem.config.cjs` |

## GitHub Actions (Disabled)

The `.github/workflows/deployer.yml` exists but is no longer needed. You can delete it:

```bash
rm .github/workflows/deployer.yml
```
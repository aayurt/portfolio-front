#!/bin/bash
# Local deployment script for portfolio-front
# Usage: ./deploy-local.sh [environment]
# Environments: production (default), staging

set -e

ENVIRONMENT="${1:-production}"
PROJECT_DIR="/Users/aayurtshrestha/Projects/self/porfolio/portfolio-front"
DEPLOY_DIR="/var/www/portfolio"
SERVER="82.165.181.153"
USER="root"

echo "🚀 Starting local deployment for $ENVIRONMENT..."

# 1. Ensure we're on main and clean
echo "📋 Checking git status..."
cd "$PROJECT_DIR"
if [[ -n $(git status --porcelain) ]]; then
    echo "⚠️  Working directory has uncommitted changes. Commit or stash first."
    exit 1
fi

# 2. Build locally
echo "🏗️  Building Next.js application..."
pnpm install
pnpm run build

# 3. Prepare standalone bundle
echo "📦 Assembling standalone bundle..."
# Clean previous standalone
rm -rf .next/standalone
pnpm run build
if [ -d "public" ]; then
    cp -r public .next/standalone/
fi
if [ -d ".next/static" ]; then
    cp -r .next/static .next/standalone/.next/
fi

# 4. Create deploy package (only standalone)
echo "📦 Creating deploy package..."
DEPLOY_PACKAGE="/tmp/portfolio-deploy-$(date +%s).tar.gz"
tar -czf "$DEPLOY_PACKAGE" -C .next/standalone .

# 5. Deploy to server
echo "🚀 Deploying to $SERVER..."
ssh "$USER@$SERVER" "rm -rf $DEPLOY_DIR && mkdir -p $DEPLOY_DIR"
scp "$DEPLOY_PACKAGE" "$USER@$SERVER:$DEPLOY_DIR/app.tar.gz"
ssh "$USER@$SERVER" "cd $DEPLOY_DIR && tar -xzf app.tar.gz && rm app.tar.gz"

# 6. Copy environment file
echo "🔐 Copying environment config..."
scp "$PROJECT_DIR/.env" "$USER@$SERVER:$DEPLOY_DIR/.env"

# 7. Reload PM2
echo "🔄 Reloading PM2..."
ssh "$USER@$SERVER" "
    cd $DEPLOY_DIR
    if pm2 list | grep -q 'portfolio'; then
        pm2 reload ecosystem.config.cjs --update-env
    else
        pm2 start ecosystem.config.cjs
    fi
    pm2 save
"

# 8. Health check
echo "🏥 Health check..."
sleep 3
HEALTH=$(ssh "$USER@$SERVER" "curl -s -o /dev/null -w '%{http_code}' http://localhost:3002/work" || echo "000")
if [[ "$HEALTH" == "200" ]]; then
    echo "✅ Deployment successful! Site is healthy."
else
    echo "⚠️  Health check returned: $HEALTH"
    echo "📋 Check logs: ssh $USER@$SERVER 'pm2 logs portfolio'"
fi

# Cleanup
rm -f "$DEPLOY_PACKAGE"
echo "✨ Deployment complete!"
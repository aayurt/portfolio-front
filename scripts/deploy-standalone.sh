#!/bin/bash
set -e

HOST="PersonalVPS"
REMOTE_DIR="/var/www/portfolio"
LOCAL_DIR="$(dirname "$0")/.."
PROD_API="https://aayurtshrestha.com.np/admin"

echo "=== Step 1: Building Next.js standalone (production env) ==="
cd "$LOCAL_DIR"
NEXT_PUBLIC_API="$PROD_API" NODE_OPTIONS=--no-deprecation npx next build

echo ""
echo "=== Step 2: Preparing standalone folder ==="
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
cp ecosystem.config.cjs .next/standalone/
cp package.json .next/standalone/

echo ""
echo "=== Step 3: Creating remote directory on VPS ==="
ssh "$HOST" "mkdir -p $REMOTE_DIR/.next/standalone"

echo ""
echo "=== Step 4: Syncing to VPS ==="
rsync -avz --delete --progress \
  .next/standalone/ \
  "$HOST:$REMOTE_DIR/.next/standalone/"

echo ""
echo "=== Step 5: Setting up .env on VPS ==="
ssh "$HOST" "cat > $REMOTE_DIR/.env << 'EOF'
NEXT_PUBLIC_API=$PROD_API
NEXT_PUBLIC_SLUG=aayurt
NEXT_PUBLIC_DOMAIN_LIST='[{\"domain\": \"rujamaharjan.com.np\", \"slug\": \"ruja\"}, {\"domain\": \"aayushshrestha.com\", \"slug\": \"aayush\"}]'
EOF"

echo ""
echo "=== Step 6: Copying ecosystem.config.cjs to remote root ==="
ssh "$HOST" "cp $REMOTE_DIR/.next/standalone/ecosystem.config.cjs $REMOTE_DIR/"

echo ""
echo "=== Step 7: Restarting PM2 ==="
ssh "$HOST" "source ~/.nvm/nvm.sh && cd $REMOTE_DIR && \
  pm2 reload ecosystem.config.cjs --update-env && pm2 save"

echo ""
echo "Done. Deployed frontend standalone build to $HOST:$REMOTE_DIR"

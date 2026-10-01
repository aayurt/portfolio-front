#!/usr/bin/env bash
# Jules Initial Setup — portfolio-front
# Paste this file's contents into Jules repo Configuration → Initial Setup,
# then click Run & Snapshot.
set -euo pipefail

echo "--- environment checks ---"
node -v
npm -v
pnpm -v || npm install -g pnpm@10

echo "--- install (lockfile-aware) ---"
if [ -f pnpm-lock.yaml ]; then
  pnpm install --frozen-lockfile
else
  pnpm install
fi

echo "--- lint ---"
pnpm lint || true

echo "--- build ---"
pnpm build

echo "--- smoke ---"
(pnpm start --port 3000 & SERVER_PID=$!; sleep 8; curl -sf -o /dev/null -w "GET / -> %{http_code}\n" http://localhost:3000/ || true; curl -sf "http://localhost:3000/api/search?q=test" -o /dev/null -w "GET /api/search -> %{http_code}\n" || true; kill $SERVER_PID || true)

echo "JULES_SETUP_OK"

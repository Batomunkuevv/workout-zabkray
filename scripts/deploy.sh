#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/workout-federation.ru"
BRANCH="${DEPLOY_BRANCH:-main}"
APP_NAME="workout-federation"

cd "$APP_DIR"

if [[ ! -f .env ]]; then
  echo "Missing $APP_DIR/.env" >&2
  exit 1
fi

echo "==> Fetch $BRANCH"
git fetch --prune origin
git checkout "$BRANCH"
git reset --hard "origin/$BRANCH"

echo "==> Load env"
set -a
# shellcheck disable=SC1091
source .env
set +a

echo "==> Install deps"
# Нужны devDependencies (typescript и т.д.) для next build
npm ci --include=dev

echo "==> Build"
# NEXT_PUBLIC_* подхватываются из .env на этапе сборки
npm run build

echo "==> Prepare standalone assets"
mkdir -p .next/standalone/.next
rm -rf .next/standalone/public .next/standalone/.next/static
cp -a public .next/standalone/public
cp -a .next/static .next/standalone/.next/static

echo "==> Reload PM2"
if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  pm2 reload ecosystem.config.js --update-env
else
  pm2 start ecosystem.config.js
fi

pm2 save

echo "==> Done"
pm2 describe "$APP_NAME" | sed -n '1,25p'

#!/usr/bin/env bash
# Deploy dist/ to Hostinger via FTP using lftp
# Usage: ./scripts/deploy-ftp.sh
set -euo pipefail

# Load .env
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT_DIR"

FTP_REMOTE_DIR_OVERRIDE="${FTP_REMOTE_DIR:-}"

if [ -f .env ]; then
  set -o allexport
  # shellcheck disable=SC1091
  source .env
  set +o allexport
fi

if [ -n "$FTP_REMOTE_DIR_OVERRIDE" ]; then
  FTP_REMOTE_DIR="$FTP_REMOTE_DIR_OVERRIDE"
fi

: "${FTP_HOST:?FTP_HOST not set}"
: "${FTP_USER:?FTP_USER not set}"
: "${FTP_PASSWORD:?FTP_PASSWORD not set}"
: "${FTP_PORT:=21}"
: "${FTP_REMOTE_DIR:=public_html}"

echo "→ Running fresh build..."
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
# shellcheck disable=SC1091
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"
nvm use 20
npm run build

echo "→ Deploying dist/ to ftp://$FTP_HOST:$FTP_PORT/$FTP_REMOTE_DIR ..."

lftp -u "$FTP_USER","$FTP_PASSWORD" -p "$FTP_PORT" "ftp://$FTP_HOST" <<EOF
set ftp:ssl-allow no
set ssl:verify-certificate no
set net:max-retries 3
set net:timeout 30
mirror --reverse --delete --verbose --parallel=4 \
  --exclude-glob .DS_Store \
  --exclude-glob .git/ \
  dist/ "$FTP_REMOTE_DIR/"
bye
EOF

echo "✓ Deploy complete"

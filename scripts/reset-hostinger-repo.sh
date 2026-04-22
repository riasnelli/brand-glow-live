#!/usr/bin/env bash
set -euo pipefail

REPO_URL="${REPO_URL:-https://github.com/riasnelli/brand-glow-live.git}"
BRANCH="${BRANCH:-main}"
TARGET_PATH="${1:-${TARGET_PATH:-}}"

if [ -z "$TARGET_PATH" ]; then
  echo "Usage: TARGET_PATH=/absolute/path npm run hostinger:reset"
  echo "   or: npm run hostinger:reset -- /absolute/path"
  exit 1
fi

case "$TARGET_PATH" in
  /|"")
    echo "Refusing to operate on an empty path or root directory."
    exit 1
    ;;
esac

echo "Resetting Hostinger checkout..."
echo "Repository: $REPO_URL"
echo "Branch: $BRANCH"
echo "Target path: $TARGET_PATH"

rm -rf "$TARGET_PATH"
git clone --branch "$BRANCH" --single-branch "$REPO_URL" "$TARGET_PATH"

echo "Done. Fresh clone created at $TARGET_PATH"
#!/usr/bin/env bash
set -euo pipefail

DIST_DIR="dist"
OUTPUT_FILE="${DIST_DIR}/build-info.txt"

APP_NAME="${APP_NAME:-demo-app}"
APP_VERSION="${APP_VERSION:-1.0.0}"
BUILD_NUMBER="${BUILD_NUMBER:-local}"
BUILD_TIME="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"

echo "==> Building ${APP_NAME} v${APP_VERSION} (#${BUILD_NUMBER})"

mkdir -p "${DIST_DIR}"

cat > "${OUTPUT_FILE}" <<EOF
Application  : ${APP_NAME}
Version      : ${APP_VERSION}
Build Number : ${BUILD_NUMBER}
Build Time   : ${BUILD_TIME}
EOF

echo "==> Build completed."
echo "    Output file: ${OUTPUT_FILE}"

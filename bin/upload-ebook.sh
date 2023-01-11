#!/usr/bin/env bash

set -euo pipefail
IFS=$'\n\t'

DIR=$(mktemp -d)

BOOK="$1"

unzip -d "$DIR" "$BOOK"
aws --endpoint-url=http://localhost:4566 s3 sync "$DIR" "s3://bucket/$BOOK"
